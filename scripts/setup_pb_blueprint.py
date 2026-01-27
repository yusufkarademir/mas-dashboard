import httpx
import asyncio

PB_URL = "http://localhost:8095"

async def setup_blueprint_collections():
    async with httpx.AsyncClient() as client:
        # 1. analysis_results
        analysis_schema = {
            "name": "analysis_results",
            "type": "base",
            "schema": [
                {"name": "field_id", "type": "text", "required": True},
                {"name": "ortho_url", "type": "url"},
                {"name": "ndvi_map_url", "type": "url"},
                {"name": "plant_count", "type": "number"},
                {"name": "gap_density", "type": "number"}
            ]
        }
        
        # 2. strategy_reports
        strategy_schema = {
            "name": "strategy_reports",
            "type": "base",
            "schema": [
                {"name": "field_id", "type": "text", "required": True},
                {"name": "kpis", "type": "json"},
                {"name": "action_required", "type": "bool"},
                {"name": "severity_level", "type": "select", "options": {"values": ["Low", "Medium", "High", "Critical"]}},
                {"name": "phenological_phase", "type": "select", "options": {"values": ["Emergence", "Leaf_Development", "Root_Growth", "Sugar_Accumulation"]}}
            ]
        }
        
        print("Blueprint koleksiyonları hazırlanıyor...")
        # Not: Admin yetkisi gerektirdiği için bu script manuel olarak PB arayüzünden yapılacak işlemleri temsil eder 
        # veya admin login akışı eklenmelidir.

if __name__ == "__main__":
    asyncio.run(setup_blueprint_collections())
