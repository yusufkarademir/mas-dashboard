import { ROLES } from '../constants/schema';
import { LayoutDashboard, Users, Leaf, Database, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Kontrol Paneli', active: true },
    { icon: Leaf, label: 'Tarla Yönetimi' },
    { icon: Users, label: 'Gems Ekibi' },
    { icon: Database, label: 'Hafıza (RAG)' },
    { icon: Settings, label: 'Ayarlar' },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/10 h-screen p-6 flex flex-col z-30">
      <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
        <div className="relative">
          <div className="w-8 h-8 rounded bg-mas-light shadow-[0_0_15px_rgba(57,255,20,0.5)] group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-mas-light rounded animate-ping opacity-20" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-white font-mono">
          MAS<span className="text-mas-light text-glow-green">.Ai</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
              item.active 
                ? "bg-mas-light/10 text-mas-light neon-border-green" 
                : "text-mas-muted hover:text-white hover:bg-white/5"
            )}
          >
            {item.active && (
              <motion.div 
                layoutId="active-pill"
                className="absolute left-0 w-1 h-6 bg-mas-light rounded-r-full"
                transition={{ type: "spring", stiffness: 300, damping: 300 }}
              />
            )}
            <item.icon className={cn("w-5 h-5 transition-transform duration-200 group-hover:scale-110", item.active ? "text-mas-light" : "text-mas-muted")} />
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/5 pt-6">
        <h3 className="text-[10px] font-bold text-mas-muted mb-4 px-2 uppercase tracking-[0.2em]">SİSTEM DURUMU</h3>
        <div className="space-y-4">
          {Object.entries(ROLES).map(([key, role]) => (
            <div key={key} className="flex items-center justify-between px-2 text-[11px] text-mas-muted group cursor-help">
              <span className="capitalize font-medium group-hover:text-white transition-colors">{role.replace('_', ' ')}</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mas-light animate-pulse" />
                <span className="text-mas-light/50 font-mono">ONLINE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
