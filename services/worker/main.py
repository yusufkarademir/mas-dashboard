import httpx
from processor import AgroProcessor

app = FastAPI(title="MAS Agro-Intelligence Engine")

# Mimari Konfigürasyon
TILE_SIZE = 640
OVERLAP = 0.20
POCKETBASE_URL = os.getenv("POCKETBASE_URL", "http://localhost:8095")
POSTGIS_URL = os.getenv("DATABASE_URL", "postgres://admin:password123@postgis/mas_gis")

@app.post("/process/analysis")
async def start_analysis(field_id: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(run_full_pipeline, field_id)
    return {"status": "queued", "field_id": field_id}

async def run_full_pipeline(field_id: str):
    """
    Blueprint uyarınca: Ortho -> SAVI/NDRE -> AI Detections -> Strategy -> Sync
    """
    processor = AgroProcessor(field_id)
    try:
        # 1. ODM & Ortho Generation (Placeholder logiği)
        print(f"Propcessing Field: {field_id}")
        
        # 2. İndeks Hesaplama (SAVI & NDRE)
        # Fenolojiye göre dinamik L seçimi (Blueprint kuralı)
        savi, ndre = await processor.calculate_indices("nir.tif", "red.tif", "rededge.tif", stage="Early")
        
        # 3. Kritik Eşik Kontrolü (%15 Lokal Stres)
        action_required = processor.check_thresholds(savi)
        
        # 4. PocketBase Sync (Asenkron)
        analysis_data = {
            "field_id": field_id,
            "plant_count": 0, # Vision aşamasından gelecek
            "gap_density": 0.0
        }
        strategy_data = {
            "field_id": field_id,
            "action_required": action_required,
            "severity_level": "High" if action_required else "Low"
        }
        await processor.sync_results(analysis_data, strategy_data)

    except Exception as e:
        print(f"Pipeline Error: {e}")

async def update_pb(collection: str, record_id: str, data: dict):
    async with httpx.AsyncClient() as client:
        await client.patch(f"{POCKETBASE_URL}/api/collections/{collection}/records/{record_id}", json=data)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
