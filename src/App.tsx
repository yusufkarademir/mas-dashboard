import { Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { ActivityFeed } from './components/ActivityFeed';
import { ActionCenter } from './components/AI/ActionCenter';
import { StatCards } from './components/StatCards';
import { MapSection } from './components/Map/MapSection';
// import { MemorySearch } from './components/MemorySearch'; // Removed unused
// import { Dashboard } from './pages/Dashboard'; // Removed unused
import { FieldManagement } from './pages/FieldManagement';
import { Team } from './pages/Team';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { Settings } from './pages/Settings';

import { usePocketBase } from './hooks/usePocketBase';
import { useSimulation } from './hooks/useSimulation';
import { Bell, ShieldCheck, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  usePocketBase();
  useSimulation();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-mas-base text-mas-text overflow-hidden font-sans selection:bg-mas-primary/30 selection:text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-gradient-to-br from-mas-base to-[#0a0a0a]">
        
        {/* Top Header - Daha zarif ve minimal */}
        <header className="h-16 border-b border-border-subtle bg-mas-base/80 backdrop-blur-xl flex items-center justify-between px-6 z-20 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative w-full max-w-md group">
               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-mas-text-muted group-focus-within:text-mas-primary transition-colors" />
               </div>
               <input 
                  type="text" 
                  placeholder="Global Arama (Parsel, Rapor, Personel)..." 
                  className="w-full bg-mas-surface border border-border-subtle rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-mas-primary/50 focus:ring-1 focus:ring-mas-primary/50 transition-all placeholder:text-mas-text-muted/50"
               />
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="relative p-2 text-mas-text-muted hover:text-white transition-all hover:bg-mas-surface rounded-lg">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-mas-danger rounded-full border-2 border-mas-base" />
             </button>
             
             <div className="h-6 w-px bg-border-subtle mx-1" />

             <button className="flex items-center gap-3 p-1 rounded-lg hover:bg-mas-surface transition-all">
               <div className="w-8 h-8 rounded-lg bg-mas-primary/10 border border-mas-primary/20 flex items-center justify-center text-mas-primary font-bold text-sm">
                 AD
               </div>
               <div className="flex flex-col items-start mr-2">
                 <span className="text-xs font-medium text-white leading-none">Admin User</span>
                 <span className="text-[10px] text-mas-text-muted leading-none mt-1">Sistem Yöneticisi</span>
               </div>
             </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              
              {/* ANA DASHBOARD */}
              <Route path="/" element={
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                    className="h-full p-6 overflow-y-auto scrollbar-hide"
                 >
                    <div className="max-w-[1800px] mx-auto h-full flex flex-col gap-6">
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-light text-white tracking-tight">Merkezi Kontrol Paneli</h2>
                          <p className="text-sm text-mas-text-muted mt-1">Saha operasyonlarının anlık durum özeti</p>
                        </div>
                        <div className="flex gap-2">
                           <span className="badge badge-success flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> Sistem Online
                           </span>
                        </div>
                      </div>

                      <StatCards />

                      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-6 min-h-0">
                        {/* Sol Panel: AI Action Center */}
                        <div className="xl:col-span-1 h-full min-h-[400px]">
                          <ActionCenter />
                        </div>

                        {/* Orta Panel: Harita */}
                        <div className="xl:col-span-2 h-full min-h-[500px] relative rounded-2xl overflow-hidden border border-border-subtle shadow-2xl">
                          <MapSection />
                          <div className="absolute top-4 left-4 z-10 bg-mas-surface/90 backdrop-blur px-3 py-1.5 rounded-md border border-border-subtle shadow-lg">
                             <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-mas-primary" />
                                <span className="text-xs font-medium text-mas-text">GÜVENLİ BAĞLANTI</span>
                             </div>
                          </div>
                        </div>

                        {/* Sağ Panel: Akış */}
                        <div className="xl:col-span-1 h-full min-h-[400px]">
                          <ActivityFeed />
                        </div>
                      </div>
                    </div>
                 </motion.div>
              } />

              {/* DİĞER SAYFALAR */}
              <Route path="/fields" element={<FieldManagement />} />
              <Route path="/team" element={<Team />} />
              <Route path="/knowledge" element={<KnowledgeBase />} />
              <Route path="/settings" element={<Settings />} />

            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;
