import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { ROLES, ROLE_COLORS } from '../constants/schema';
import { BrainCircuit, Sprout, Satellite, Server, Bot, Clock, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../utils/formatters';

const iconMap = {
  [ROLES.STRATEGY_LEADER]: BrainCircuit,
  [ROLES.AGRONOMIST]: Sprout,
  [ROLES.REMOTE_SENSING]: Satellite,
  [ROLES.SYSTEM_ARCHITECT]: Server,
  [ROLES.AGRI_AI]: Bot,
};

export function ActivityFeed() {
  const interactions = useStore((state) => state.interactions);
  const isMemoryMode = useStore((state) => state.isMemoryMode);
  
  // Dummy effect to seed some data if empty
  const addInteraction = useStore((state) => state.addInteraction);
  useEffect(() => {
    if (interactions.length === 0) {
      addInteraction({
        id: '1', role: ROLES.STRATEGY_LEADER, sender: 'Koordinatör', message: 'Sistem başlatıldı. Tüm Gems göreve hazır.', created: new Date().toISOString()
      });
      addInteraction({
        id: '2', role: ROLES.AGRONOMIST, sender: 'Agronomist', message: 'X Tarlası NDVI verileri analiz ediliyor...', created: new Date().toISOString(), is_thinking: true
      });
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full glass-panel rounded-2xl border border-white/5 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-mas-light rounded-full shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
            <div className="absolute inset-0 bg-mas-light rounded-full animate-ping opacity-40" />
          </div>
          <h2 className="text-sm font-bold text-white uppercase tracking-[0.15em]">
            Canlı Sistem Akışı
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-mas-light/10 text-mas-light text-[9px] font-bold font-mono border border-mas-light/20">LIVE</span>
          <span className="text-[10px] text-mas-muted font-mono tracking-tighter uppercase">GEMS-MAIN_STREAM</span>
        </div>
      </div>

      {/* Feed Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <AnimatePresence initial={false}>
          {interactions.map((interaction, idx) => {
            const Icon = iconMap[interaction.role as keyof typeof iconMap] || Bot;
            const colorClass = ROLE_COLORS[interaction.role] || "text-mas-muted border-mas-muted";

            return (
              <motion.div
                key={interaction.id}
                initial={{ opacity: 0, x: -10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: Math.min(idx * 0.05, 0.3) }}
                className={cn(
                  "relative group flex gap-5 p-5 rounded-2xl border border-white/[0.03] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 hover:shadow-xl",
                  interaction.related_memory_id && isMemoryMode ? "ring-1 ring-mas-cyan/50 shadow-[0_0_25px_rgba(0,245,255,0.15)] bg-mas-cyan/[0.02]" : ""
                )}
              >
                {/* Visual Accent */}
                <div className={cn("absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity", colorClass.replace('text-', 'bg-'))} />

                {/* Avatar Icon */}
                <div className={cn("relative shrink-0 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-transform group-hover:scale-110", colorClass)}>
                  <Icon className="w-6 h-6" />
                  {interaction.is_thinking && (
                     <div className="absolute -top-1 -right-1 w-3 h-3 bg-mas-cyan rounded-full border-2 border-mas-dark animate-pulse" />
                  )}
                </div>
                
                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", colorClass)}>
                      {interaction.sender}
                    </span>
                    <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-mono">{formatDate(interaction.created)}</span>
                    </div>
                  </div>
                  
                  <p className="text-[14px] text-mas-text/90 leading-relaxed font-normal selection:bg-mas-light selection:text-mas-black">
                    {interaction.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    {interaction.is_thinking && (
                      <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/[0.03] text-[10px] text-mas-cyan font-bold uppercase tracking-widest border border-mas-cyan/10">
                        <span className="flex gap-0.5">
                          <span className="w-0.5 h-0.5 bg-mas-cyan rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-0.5 h-0.5 bg-mas-cyan rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-0.5 h-0.5 bg-mas-cyan rounded-full animate-bounce" />
                        </span>
                        Processing
                      </div>
                    )}

                    {interaction.related_memory_id && (
                      <div className="px-2 py-1 rounded bg-mas-cyan/10 border border-mas-cyan/20 text-[9px] font-bold text-mas-cyan uppercase tracking-tighter flex items-center gap-1.5 hover:bg-mas-cyan/20 cursor-pointer transition-colors">
                        <Database className="w-3 h-3" />
                        Ref: {interaction.related_memory_id}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
