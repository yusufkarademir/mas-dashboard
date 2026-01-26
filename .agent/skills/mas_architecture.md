---
name: MAS Architecture & Backend Logic
description: Skills related to the Multi-Agent System architecture, PocketBase integration, and simulation logic.
---

# MAS Architecture Skill

## Context
This skill focuses on the backend logic of the MAS Dashboard, including data modeling, database interactions, and agent simulation.

## Capabilities
- **PocketBase Management:** Setup, configure, and manage PocketBase collections (`interactions`, `gems`, `memory_logs`).
- **Data Seeding:** Create and execute scripts (`scripts/seed.js`) to populate the database with mock data.
- **Simulation:** Develop "Ghost in the Shell" scripts to simulate agent interactions and system pulses.
- **Docker Operations:** Manage docker-compose files and container lifecycles for the backend.

## Data Schema (Collections)
- **interactions:** `sender`, `role`, `message`, `related_memory_id`, `is_thinking`
- **gems:** `name`, `role`, `status`, `capabilities`
- **memory_logs:** `vector_id`, `content`, `score`, `timestamp`

## Guidelines
1. Ensure `useStore` (Zustand) is kept in sync with the backend schema.
2. Handle database connection errors gracefully (e.g., fallback to simulation mode).
3. Use the defined role constants (`ROLES`) in all backend operations.
