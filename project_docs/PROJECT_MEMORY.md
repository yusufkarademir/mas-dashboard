# Şeker Pancarı MAS Dashboard - Proje Hafızası

Son Güncelleme: 28 Ocak 2026
Durum: 🏗️ Phase 3 Uygulanıyor - Ağır Sanayi GIS & AI Pipeline

## 🎯 Proje Özeti
Şeker Pancarı verimini artırmak amacıyla geliştirilen, drone ve yapay zeka destekli Multi-Agent System (MAS) için Tarım-İstihbarat Platformu'dur. 5 farklı uzman ajanın saha verilerini (SAVI, NDRE, Ortofoto) işleyip stratejik reçeteler üretmesini sağlar.

## 🏗️ Mimari Yapı (Faz 3 Güncel)
- **Frontend:** React + Vite, Mapbox GL JS (GisOverlay), Framer Motion (Action Center Glitch)
- **Backend:** PocketBase (v0.22+) + PostGIS (Spatial Veri)
- **Worker:** Python 3.11 Engine (PyODM, Rasterio, GDAL, Torch)
- **Kuyruk:** Redis / BullMQ (Asenkron Görevler)

## 🧩 Modüller ve Durumları
| Modül | Durum | Açıklama |
| :--- | :--- | :--- |
| **Agro-Engine** | 🏗️ İnşa | SAVI, NDRE, %15 Stres Kontrolü (processor.py hazır). |
| **GIS Pipeline** | 🏗️ İnşa | COG (Lazy Loading) ve Martin (Vector Tile) altyapısı. |
| **AI Vision** | 🏗️ İnşa | 640x640 Tiling ve TensorRT entegrasyonu planlandı. |

## 🔑 Restart Sonrası Adımlar (Elimizin Altında)
Sistem açıldığında sırasıyla çalıştırılacak komutlar:
1. **Docker Servisleri:** `docker-compose -f docker-compose.gis.yml up -d --build`
2. **Şema Güncelleme:** `python scripts/setup_pb_blueprint.py` (PocketBase Analysis & Strategy tabloları)
3. **Frontend Bağımlılıklar:** `npm install` (mapbox-gl ve react-map-gl yüklendi)

## 📝 Teknik Notlar (Blueprint)
- **SAVI:** Dinamik $L$ katsayılı ($0.5/0.25$).
- **NDRE:** Azot/Klorofil takibi için aktif.
- **Tiling:** 640x640 %20 overlap.
- **Critical Threshold:** %15 lokal stres -> `action_required: true`.
