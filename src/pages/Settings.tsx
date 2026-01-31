import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-light text-white mb-6">Sistem Ayarları</h2>
      
      <div className="max-w-2xl space-y-6">
          <div className="glass-panel p-6 rounded-xl">
             <div className="flex items-center gap-4 border-b border-border-subtle pb-4 mb-4">
                 <SettingsIcon className="w-5 h-5 text-mas-primary" />
                 <h3 className="font-medium text-white">Genel Yapılandırma</h3>
             </div>
             <div className="space-y-4">
                 <div className="flex justify-between items-center">
                     <span className="text-mas-text-muted text-sm">Dark Mode</span>
                     <div className="w-10 h-6 bg-mas-primary rounded-full relative cursor-pointer">
                         <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                     </div>
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="text-mas-text-muted text-sm">Bildirimler</span>
                      <div className="w-10 h-6 bg-mas-surface-hover border border-border-subtle rounded-full relative cursor-pointer">
                         <div className="absolute left-1 top-1 w-4 h-4 bg-mas-text-muted rounded-full" />
                     </div>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
}
