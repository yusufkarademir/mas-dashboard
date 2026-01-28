import { create } from 'zustand'
import PocketBase from 'pocketbase'

// Types
export interface Interaction {
  id: string;
  sender: string;
  message: string;
  role: string;
  created: string;
  related_memory_id?: string;
  is_thinking?: boolean;
}

export interface StatMetrics {
  // Fenolojik ve Gelişim Verileri
  bbch_stage: string;          // BBCH skalası (Örn: "BBCH 14: 4 yaprak")
  growth_score: number;        // Genel gelişim puanı (0-100)
  plant_count: {
    target: number;            // Hedeflenen bitki sıklığı
    actual: number;            // Saptanan canlı bitki sayısı
  };
  row_closure: number;         // Sıra kapama yüzdesi / LAI

  // Sağlık ve Stres Analizi
  ndvi_avg: number;            // Fotosentez gücü
  ndre_avg: number;            // Klorofil yoğunluğu (Gizli stres takibi)
  stress_index: number;        // Su stresi, dolu zararı veya hastalık baskısı (0-1)
  active_diseases: string[];   // Teşhis edilen hastalıklar

  // Verim Projeksiyonu
  yield_projection: number;    // Tahmini tonaj (ton/dekar)
  sugar_rate_projection: number; // Tahmini şeker oranı (%)
}

// Keep CPU and System metrics separate if needed, but for now we follow the user's focus
export interface SystemMetrics {
  cpu_usage: number;
  total_vectors: number;
  processed_acres: number;
}

interface MASState {
  interactions: Interaction[];
  metrics: StatMetrics;
  system: SystemMetrics;
  isMemoryMode: boolean;
  pb: PocketBase;
  
  // Actions
  addInteraction: (interaction: Interaction) => void;
  setInteractions: (interactions: Interaction[]) => void;
  updateMetrics: (metrics: Partial<StatMetrics>) => void;
  updateSystemMetrics: (system: Partial<SystemMetrics>) => void;
  toggleMemoryMode: () => void;
  connectPB: () => void;
}

export const useStore = create<MASState>((set) => ({
  interactions: [],
  metrics: {
    bbch_stage: "Analiz Ediliyor...",
    growth_score: 0,
    plant_count: { target: 0, actual: 0 },
    row_closure: 0,
    ndvi_avg: 0,
    ndre_avg: 0,
    stress_index: 0,
    active_diseases: [],
    yield_projection: 0,
    sugar_rate_projection: 0
  },
  system: {
    cpu_usage: 12,
    total_vectors: 1024,
    processed_acres: 450
  },
  isMemoryMode: false,
  pb: new PocketBase(import.meta.env.VITE_PB_URL || 'http://127.0.0.1:8095'), // Dynamic URL for production

  addInteraction: (interaction) => set((state) => ({ 
    interactions: [interaction, ...state.interactions].slice(0, 50) 
  })),
  
  setInteractions: (interactions) => set({ interactions }),
  
  updateMetrics: (newMetrics) => set((state) => ({ 
    metrics: { ...state.metrics, ...newMetrics } 
  })),

  updateSystemMetrics: (newSystem) => set((state) => ({ 
    system: { ...state.system, ...newSystem } 
  })),
  
  toggleMemoryMode: () => set((state) => ({ isMemoryMode: !state.isMemoryMode })),

  connectPB: () => {}
}))
