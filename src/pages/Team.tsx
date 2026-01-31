import { Users } from 'lucide-react';

export function Team() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-light text-white mb-6">Gems Ekibi</h2>
      
      <div className="glass-panel p-8 rounded-2xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-mas-surface border border-border-subtle flex items-center justify-center">
              <Users className="w-8 h-8 text-mas-text-muted" />
          </div>
          <div>
              <h3 className="text-lg font-medium text-white">Saha Operasyon Timi</h3>
              <p className="text-mas-text-muted">Aktif personel listesi ve görev dağılımı şu an entegrasyon aşamasında.</p>
          </div>
      </div>
    </div>
  );
}
