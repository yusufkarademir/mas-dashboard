import { ROLES } from '../constants/schema';
import { LayoutDashboard, Users, Leaf, Database, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Kontrol Paneli', path: '/' },
    { icon: Leaf, label: 'Tarla Yönetimi', path: '/fields' },
    { icon: Users, label: 'Gems Ekibi', path: '/team' },
    { icon: Database, label: 'Hafıza (RAG)', path: '/knowledge' },
    { icon: Settings, label: 'Ayarlar', path: '/settings' },
  ];

  return (
    <aside className="w-72 bg-mas-base border-r border-border-subtle h-screen flex flex-col z-30 relative shadow-2xl">
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-border-subtle/50 mb-6">
         <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mas-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/20">
                 <Leaf className="w-4 h-4 text-white" />
             </div>
             <div>
                 <h1 className="text-lg font-bold text-white tracking-tight leading-none">MAS<span className="text-mas-primary">.Pilot</span></h1>
                 <span className="text-[10px] text-mas-text-muted font-mono tracking-wider">v3.1 STABLE</span>
             </div>
         </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                active 
                  ? "bg-mas-primary/10 text-white" 
                  : "text-mas-text-muted hover:text-white hover:bg-mas-surface"
              )}
            >
              {active && (
                <motion.div 
                  layoutId="active-nav-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-mas-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 transition-colors", active ? "text-mas-primary" : "text-mas-text-muted group-hover:text-white")} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Status */}
      <div className="p-4 mt-auto">
        <div className="bg-mas-surface rounded-xl p-4 border border-border-subtle">
           <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-mas-text-muted uppercase">Sistem Durumu</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           </div>
           
           <div className="space-y-2">
             {Object.keys(ROLES).slice(0, 3).map((key) => (
               <div key={key} className="flex items-center gap-2 text-[11px] text-mas-text-muted">
                  <div className="w-1 h-1 rounded-full bg-mas-text-muted/50"></div>
                  <span className="capitalize">{key.toLowerCase().replace('_', ' ')}</span>
               </div>
             ))}
           </div>

           <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-lg bg-mas-base border border-border-subtle text-xs text-mas-text-muted hover:text-mas-danger hover:border-mas-danger/30 transition-colors">
              <LogOut className="w-3 h-3" />
              Çıkış Yap
           </button>
        </div>
      </div>
    </aside>
  );
}
