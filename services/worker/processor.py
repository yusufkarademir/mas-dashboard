import os
import json
import asyncio
import httpx
import rasterio
import numpy as np
from rasterio.io import MemoryFile
from pyodm import Node
from .inference import Tiler, InferenceEngine, apply_global_nms

import psycopg2
from psycopg2.extras import execute_values

# Konfigürasyon
POCKETBASE_URL = os.getenv("POCKETBASE_URL", "http://pocketbase:8090") # Compose içi URL
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
DATABASE_URL = os.getenv("DATABASE_URL", "postgres://admin:password123@postgis/mas_gis")

class AgroProcessor:
    def __init__(self, field_id: str):
        self.field_id = field_id
        self.pb_url = POCKETBASE_URL
        self.db_url = DATABASE_URL

    async def calculate_indices(self, nir_path, red_path, red_edge_path, phenology="Early"):
        """
        Kullanıcı Blueprint uyarınca SAVI ve NDRE hesaplamaları.
        """
        # Blueprint: L katsayısı fenolojik evreye göre dinamik
        L = 0.5 if phenology == "Early" else 0.25
        
        with rasterio.open(nir_path) as nir_src, rasterio.open(red_path) as red_src, rasterio.open(red_edge_path) as re_src:
            nir = nir_src.read(1).astype('float32')
            red = red_src.read(1).astype('float32')
            red_edge = re_src.read(1).astype('float32')
            
            # NDVI: (NIR - Red) / (NIR + Red)
            ndvi = (nir - red) / (nir + red)
            
            # SAVI: ((NIR - Red) / (NIR + Red + L)) * (1 + L)
            savi = ((nir - red) / (nir + red + L)) * (1 + L)
            
            # NDRE: (NIR - RedEdge) / (NIR + RedEdge) (Azot takibi için)
            ndre = (nir - red_edge) / (nir + red_edge)
            
            # Maskeleme: NDVI < 0.2 (Yol/Toprak) ve NIR < 0.12 (Gölge) analiz dışı
            mask = (ndvi < 0.2) | (nir < 0.12)
            
            # Maskeyi tüm indekslere uygula
            ndvi[mask] = np.nan
            savi[mask] = np.nan
            ndre[mask] = np.nan
            
            return ndvi, savi, ndre

    def check_thresholds(self, indices_map):
        """
        Blueprint: %15 lokal stres ve su stresi eşiği kontrolü.
        """
        valid_pixels = indices_map[~np.isnan(indices_map)]
        if valid_pixels.size == 0: return False
        
        # Stres eşiği (örneğin 0.3 altı)
        stress_count = np.count_nonzero(valid_pixels < 0.3)
        stress_ratio = stress_count / valid_pixels.size
        
        # Eşik aşılırsa action_required: true (Blueprint: %15)
        return stress_ratio > 0.15

    async def sync_results(self, analysis_data, strategy_data):
        """
        Sonuçları PocketBase'e asenkron olarak yazar.
        """
        async with httpx.AsyncClient() as client:
            try:
                # 1. Analysis_Results tablosuna yaz
                await client.post(f"{self.pb_url}/api/collections/analysis_results/records", json=analysis_data)
                
                # 2. Strategy_Reports tablosuna yaz
                await client.post(f"{self.pb_url}/api/collections/strategy_reports/records", json=strategy_data)
            except Exception as e:
                print(f"PocketBase Sync Hatası: {e}")

    def sync_detections(self, detections):
        """
        Bitki tespitlerini PostGIS tablosuna yazar.
        """
        try:
            conn = psycopg2.connect(self.db_url)
            cur = conn.cursor()
            
            # detections tablosu yoksa oluştur (id, field_id, geom, class_id, confidence)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS detections (
                    id SERIAL PRIMARY KEY,
                    field_id VARCHAR(50),
                    geom GEOMETRY(Point, 4326),
                    class_id INTEGER,
                    confidence FLOAT
                )
            """)
            
            # Tuple hazırlığı (ST_SetSRID(ST_MakePoint(x, y), 4326))
            values = []
            for det in detections:
                # Simülasyon: pixel -> coords (placeholder)
                lon, lat = 32.85 + (det["bbox"][0] / 100000), 39.92 + (det["bbox"][1] / 100000)
                values.append((self.field_id, lon, lat, det["class_id"], det["conf"]))
            
            execute_values(cur, """
                INSERT INTO detections (field_id, geom, class_id, confidence)
                VALUES %s
            """, [(v[0], f"SRID=4326;POINT({v[1]} {v[2]})", v[3], v[4]) for v in values])
            
            conn.commit()
            cur.close()
            conn.close()
        except Exception as e:
            print(f"PostGIS Sync Hatası: {e}")

    def generate_ai_prescription(self, gap_density, health_score, phenology):
        """
        Blueprint: LLM veya Kural tabanlı otonom Müdahale Planı.
        """
        plan = f"### 🛡️ Otonom Müdahale Planı (Phase: {phenology})\n\n"
        
        if gap_density > 0.15:
            plan += "- **⚠️ Boşluk Analizi:** %15 üzerinde boşluk tespit edildi. Sulama rejimi kontrol edilmeli.\n"
        if health_score < 0.8:
            plan += "- **💊 Bitki Sağlığı:** NDVI/NDRE düşüşü. Lokalize gübreleme (RedEdge bazlı) önerilir.\n"
            
        plan += "\n**Tavsiye:** Drone verileri ile zemin doğrulaması (ground-truthing) yapınız."
        return plan

async def process_task(field_id, images_path):
    processor = AgroProcessor(field_id)
    tiler = Tiler(tile_size=640, overlap=0.2)
    engine = InferenceEngine()
    
    # 1. Görüntüleri Yükle (Mock/Simülasyon için rastgele veri)
    # Gerçekte images_path'den rasterio ile okunacak
    mock_image = np.random.randint(0, 255, (2000, 2000, 3), dtype=np.uint8)
    
    # 2. Tiling & Inference
    tiles = tiler.get_tiles(mock_image)
    all_detections = []
    
    for tile in tiles:
        detections = await engine.infer(tile["data"])
        # Global koordinatlara ekle
        x_off, y_off, _, _ = tile["coords"]
        for det in detections:
            det["bbox"][0] += x_off
            det["bbox"][1] += y_off
            all_detections.append(det)
            
    # 3. Stitching & NMS
    final_detections = apply_global_nms(all_detections)
    plant_count = len(final_detections)
    
    # 4. PostGIS Sync
    processor.sync_detections(final_detections)
    
    # Boşluk Analizi: Standart bitki yoğunluğuna göre sapma
    expected_count = 1500 # Tarla büyüklüğüne göre hesaplanır
    gap_density = max(0, (expected_count - plant_count) / expected_count)
    
    # 5. İndeks Hesaplama (Mock Paths)
    # ndvi, savi, ndre = await processor.calculate_indices("nir.tif", "red.tif", "re.tif")
    
    # 6. Sonuçların hazırlanması ve sync
    analysis_results = {
        "field_id": field_id,
        "plant_count": plant_count,
        "gap_density": gap_density,
        "ortho_url": f"/files/analysis/{field_id}/ortho.tif",
        "ndvi_map_url": f"/files/analysis/{field_id}/ndvi.tif"
    }
    
    # 7. Stratejik Karar ve AI Reçeteleme
    action_required = processor.check_thresholds(np.random.rand(100,100))
    health_score = 0.85 # AI modelinden gelecek
    prescription = processor.generate_ai_prescription(gap_density, health_score, "Vegetative")
    
    strategy_report = {
        "field_id": field_id,
        "action_required": action_required,
        "severity_level": "Critical" if gap_density > 0.2 else ("High" if action_required else "Low"),
        "kpis": {
            "yield_estimate": 70 + (1 - gap_density) * 30,
            "health_score": health_score,
            "plant_density": plant_count / 10
        },
        "phenological_phase": "Vegetative",
        "prescription": prescription
    }
    
    await processor.sync_results(analysis_results, strategy_report)
