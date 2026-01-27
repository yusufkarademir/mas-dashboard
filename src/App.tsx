import { Sidebar } from './components/Sidebar';
import { ActivityFeed } from './components/ActivityFeed';
import { ActionCenter } from './components/AI/ActionCenter';
import { StatCards } from './components/StatCards';
import { MemorySearch } from './components/MemorySearch';
import { MapSection } from './components/Map/MapSection';
import { usePocketBase } from './hooks/usePocketBase';
import { useSimulation } from './hooks/useSimulation';
import { Bell, User, LayoutGrid, Settings2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  // Initialize PocketBase connection
  usePocketBase();
  // Start autonomous simulation (Ghost in the Shell)
  useSimulation();

  return (
    <div className="flex h-screen bg-mas-black text-mas-text overflow-hidden font-sans selection:bg-mas-light selection:text-mas-black">
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Animated Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mas-light/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mas-cyan/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-mas-black/40 backdrop-blur-xl flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-6 flex-1">
            <MemorySearch />
          </div>

          <div className="flex items-center gap-6 ml-8">
             <div className="h-8 w-px bg-white/5 mx-2" />
             
             <button className="relative p-2.5 text-mas-muted hover:text-white transition-all bg-white/5 rounded-xl border border-white/5 hover:border-white/10 group">
               <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-mas-light rounded-full border-2 border-mas-black shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
             </button>
             
             <button className="p-2.5 text-mas-muted hover:text-white transition-all bg-white/5 rounded-xl border border-white/5 hover:border-white/10 group">
               <Settings2 className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
             </button>

             <button className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
               <div className="w-9 h-9 rounded-xl bg-mas-light/10 border border-mas-light/20 flex items-center justify-center">
                 <User className="w-5 h-5 text-mas-light" />
               </div>
               <div className="flex flex-col items-start">
                 <span className="text-xs font-bold text-white leading-none">Admin</span>
                 <span className="text-[10px] text-mas-muted font-bold leading-none mt-1">SİSTEM YÖNETİCİSİ</span>
               </div>
             </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1600px] mx-auto h-full flex flex-col"
          >
            
            {/* Header Title Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <LayoutGrid className="w-4 h-4 text-mas-light" />
                <span className="text-[10px] font-black text-mas-light uppercase tracking-[0.3em]">Operational Dashboard</span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight">
                Merkezi Kontrol <span className="text-mas-muted/30 font-light italic">Panel</span>
              </h2>
            </div>

            {/* Stats Row */}
            <StatCards />

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
              
              {/* Left Column: AI Action Center (1 unit) */}
              <div className="lg:col-span-1 h-full min-h-[500px]">
                <ActionCenter />
              </div>

              {/* Middle Column: GIS Map (2 units) */}
              <div className="lg:col-span-2 h-full min-h-[500px] relative">
                <MapSection />
                {/* Tactical Overlay Info */}
                <div className="absolute top-8 left-8 z-30 pointer-events-none">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-agri-cyan animate-pulse" />
                    <span className="text-[10px] font-black text-agri-cyan uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">
                      Secure Agro-Link Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Activity Feed (1 unit) */}
              <div className="lg:col-span-1 h-full min-h-[400px]">
                <ActivityFeed />
              </div>

            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;
