import { useStore } from '../store/useStore';
import { Cpu, Combine, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function StatCards() {
  const metrics = useStore((state) => state.metrics);

  const stats = [
    { 
      label: 'CPU Kullanımı', 
      value: `%${metrics.cpu_usage}`, 
      icon: Cpu, 
      color: 'text-rose-500',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.2)]',
      trend: '+2.4%' 
    },
    { 
      label: 'Vektör Hafıza', 
      value: metrics.total_vectors.toLocaleString(), 
      icon: Database, 
      color: 'text-mas-cyan',
      glow: 'shadow-[0_0_15px_rgba(0,245,255,0.2)]',
      trend: '+12'
    },
    { 
      label: 'İşlenen Dönüm', 
      value: metrics.processed_acres, 
      icon: Combine, 
      color: 'text-mas-light',
      glow: 'shadow-[0_0_15px_rgba(57,255,20,0.2)]',
      trend: 'Sabit'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="glass-panel rounded-2xl p-5 hover:border-white/20 transition-all duration-300 relative overflow-hidden group cursor-default"
        >
          {/* Subtle background glow */}
          <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity", stat.color.replace('text-', 'bg-'))} />
          
          <div className="flex justify-between items-start mb-4">
            <div className={cn("p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors", stat.color, stat.glow)}>
              <stat.icon className="w-6 h-6" />
            </div>
            {stat.trend && (
               <span className="text-[10px] font-bold bg-white/5 text-mas-muted px-2.5 py-1 rounded-full border border-white/5 uppercase tracking-wider group-hover:text-mas-light group-hover:border-mas-light/30 transition-all">
                 {stat.trend}
               </span>
            )}
          </div>
          <div className="mt-3 relative z-10">
            <h4 className={cn("text-3xl font-black text-white font-mono tracking-tight", stat.color === 'text-mas-light' ? 'text-glow-green' : stat.color === 'text-mas-cyan' ? 'text-glow-cyan' : '')}>
              {stat.value}
            </h4>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-3 bg-white/10 rounded-full" />
              <p className="text-[10px] text-mas-muted font-bold uppercase tracking-[0.15em]">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
