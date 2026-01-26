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
  cpu_usage: number;
  total_vectors: number;
  processed_acres: number;
}

interface MASState {
  interactions: Interaction[];
  metrics: StatMetrics;
  isMemoryMode: boolean;
  pb: PocketBase;
  
  // Actions
  addInteraction: (interaction: Interaction) => void;
  setInteractions: (interactions: Interaction[]) => void;
  updateMetrics: (metrics: Partial<StatMetrics>) => void;
  toggleMemoryMode: () => void;
  connectPB: () => void;
}

export const useStore = create<MASState>((set) => ({
  interactions: [],
  metrics: {
    cpu_usage: 12, // Mock start
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
  
  toggleMemoryMode: () => set((state) => ({ isMemoryMode: !state.isMemoryMode })),

  connectPB: () => {
    // Subscription logic can be handled in a separate hook or useEffect in App.tsx
    // that calls addInteraction
  }
}))
