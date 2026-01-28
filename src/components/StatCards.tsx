import { useStore } from '../store/useStore';
import { Sprout, Activity, TrendingUp, TrendingDown, AlertTriangle, Droplets } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function StatCards() {
  const metrics = useStore((state) => state.metrics);

  const stats = [
    { 
      label: 'Gelişim Skoru', 
      value: metrics.growth_score === 0 ? 'Analiz Ediliyor...' : `${metrics.growth_score}/100`, 
      subValue: metrics.bbch_stage,
      icon: Activity, 
      color: metrics.growth_score < 40 && metrics.growth_score > 0 ? 'text-red-500' : 'text-mas-light',
      glow: 'shadow-[0_0_15px_rgba(57,255,20,0.1)]',
      trend: metrics.growth_score > 50 ? 'up' : 'stable',
      showAction: metrics.growth_score > 0 && metrics.growth_score < 50
    },
    { 
      label: 'Bitki Sayımı (Hedef/Gerçek)', 
      value: metrics.plant_count.target === 0 ? 'Veri Bekleniyor...' : `${metrics.plant_count.actual}/${metrics.plant_count.target}`, 
      subValue: 'Sıra Kapama: %' + metrics.row_closure,
      icon: Sprout, 
      color: 'text-mas-cyan',
      glow: 'shadow-[0_0_15px_rgba(0,245,255,0.1)]',
      trend: 'up'
    },
    { 
      label: 'Fotosentez & Sağlık', 
      value: metrics.ndvi_avg === 0 ? 'Analiz Aşamasında' : `NDVI: ${metrics.ndvi_avg.toFixed(2)}`, 
      subValue: `Stres İndeksi: ${metrics.stress_index.toFixed(2)}`,
      icon: metrics.stress_index > 0.7 ? AlertTriangle : Droplets, 
      isAlert: metrics.ndvi_avg > 0 && (metrics.ndvi_avg < 0.50 || metrics.stress_index > 0.70),
      color: metrics.ndvi_avg > 0 && (metrics.ndvi_avg < 0.50 || metrics.stress_index > 0.70) ? 'text-red-600' : 'text-mas-light',
      glow: 'shadow-[0_0_15px_rgba(57,255,20,0.1)]',
      trend: metrics.ndvi_avg > 0.6 ? 'up' : 'down'
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
          className={cn(
            "glass-panel rounded-2xl p-5 hover:border-white/20 transition-all duration-300 relative overflow-hidden group cursor-default border border-white/5",
            stat.isAlert && "bg-red-50/5 border-red-600/30"
          )}
        >
          {/* Subtle background glow */}
          <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity", stat.isAlert ? "bg-red-600" : stat.color.replace('text-', 'bg-'))} />
          
          <div className="flex justify-between items-start mb-4">
            <div className={cn("p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors", stat.color, stat.glow)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-end gap-1">
              {stat.trend && (
                <span className={cn(
                  "flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full border uppercase tracking-tighter",
                  stat.trend === 'up' ? "bg-agri-green/10 border-agri-green/20 text-agri-green" : "bg-red-500/10 border-red-500/20 text-red-500"
                )}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.trend === 'up' ? 'Yükseliş' : 'Düşüş'}
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 relative z-10">
            <h4 className={cn(
              "text-2xl font-black font-mono tracking-tight",
              stat.isAlert ? "text-red-600" : "text-white"
            )}>
              {stat.value}
            </h4>
            
            <p className="text-[10px] text-mas-muted font-bold mt-1 uppercase tracking-wider min-h-[15px]">
              {stat.subValue}
            </p>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div className={cn("w-1 h-3 rounded-full", stat.isAlert ? "bg-red-600" : "bg-white/10")} />
                <p className="text-[9px] text-mas-muted font-bold uppercase tracking-[0.15em]">{stat.label}</p>
              </div>

              {stat.showAction && (
                <button className="text-[8px] font-black text-white bg-red-600 px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors uppercase tracking-widest animate-pulse">
                  Müdahale Talimatı
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
