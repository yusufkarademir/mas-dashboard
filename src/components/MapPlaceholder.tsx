import { Map as MapIcon, Layers, Maximize } from 'lucide-react';

export function MapPlaceholder() {
  return (
    <div className="relative w-full h-[300px] md:h-full min-h-[300px] glass-panel rounded-2xl border border-white/5 overflow-hidden group">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.05]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} 
      />
      
      {/* Radiant Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-mas-light/5 via-transparent to-mas-cyan/5 pointer-events-none" />

      {/* Central Message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-mas-muted z-10 p-6">
        <div className="relative mb-6">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-110">
             <MapIcon className="w-12 h-12 text-mas-light text-glow-green" />
          </div>
          <div className="absolute -inset-2 bg-mas-light/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-[.25em] mb-3">GIS Veri Katmanı</h3>
        <p className="text-[11px] text-mas-muted max-w-[220px] text-center leading-relaxed font-medium">
          Uydu görüntüleri ve NDVI analizleri için sistem hazırlandı. Mapbox/Leaflet entegrasyonu komutu bekleniyor.
        </p>
      </div>

      {/* Mock UI Overlay Elements */}
      <div className="absolute top-5 right-5 flex gap-3 z-20">
        <button className="p-2.5 bg-white/[0.03] rounded-xl hover:bg-white/[0.08] border border-white/5 text-mas-muted hover:text-white transition-all">
          <Layers className="w-4 h-4" />
        </button>
        <button className="p-2.5 bg-white/[0.03] rounded-xl hover:bg-white/[0.08] border border-white/5 text-mas-muted hover:text-white transition-all">
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-5 left-5 z-20">
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-mas-black/40 backdrop-blur-md border border-white/5 text-[9px] font-mono text-mas-light neon-border-green uppercase tracking-wider">
          <span className="opacity-50">POS_DATA:</span>
          39.9255 | 32.8662
        </div>
      </div>
    </div>
  );
}
