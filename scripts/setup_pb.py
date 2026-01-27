import httpx
import asyncio

PB_URL = "http://localhost:8095"

async def setup_advanced_collections():
    async with httpx.AsyncClient() as client:
        # 1. analysis_results
        # field_id, ortho_url (COG), ndvi_map_url, plant_count, gap_density
        analysis_schema = {
            "name": "analysis_results",
            "type": "base",
            "schema": [
                {"name": "field_id", "type": "relation", "options": {"collectionId": "fields", "maxSelect": 1}},
                {"name": "ortho_url", "type": "url"},
                {"name": "ndvi_map_url", "type": "url"},
                {"name": "plant_count", "type": "number"},
                {"name": "gap_density", "type": "number"},
                {"name": "raw_data", "type": "json"}
            ]
        }
        
        # 2. strategy_reports
        # kpis (yield, sugar, health), action_required, severity_level, phenological_phase
        strategy_schema = {
            "name": "strategy_reports",
            "type": "base",
            "schema": [
                {"name": "field_id", "type": "relation", "options": {"collectionId": "fields", "maxSelect": 1}},
                {"name": "kpis", "type": "json"},
                {"name": "action_required", "type": "bool"},
                {"name": "severity_level", "type": "select", "options": {"values": ["Low", "Medium", "High", "Critical"]}},
                {"name": "phenological_phase", "type": "select", "options": {"values": ["Emergence", "Leaf_Development", "Root_Growth", "Sugar_Accumulation"]}},
                {"name": "ai_report", "type": "text"}
            ]
        }
        
        print("Şema hazırlanıyor... (Manuel onay/Admin login gerebilir)")

if __name__ == "__main__":
    asyncio.run(setup_advanced_collections())
