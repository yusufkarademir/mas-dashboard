import { MapPin } from 'lucide-react';

export function FieldManagement() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-light text-white mb-6">Tarla Yönetimi</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl h-64 border-l-4 border-l-mas-primary flex flex-col justify-between card-hover">
             <div className="flex justify-between items-start">
                 <div className="p-3 bg-mas-primary/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-mas-primary" />
                 </div>
                 <span className="badge badge-success">Aktif</span>
             </div>
             <div>
                 <h3 className="text-xl font-medium text-white">Parsel A-45</h3>
                 <p className="text-mas-text-muted text-sm mt-1">Konya Ovası - Kuzey Sektör</p>
             </div>
          </div>
      </div>
    </div>
  );
}
