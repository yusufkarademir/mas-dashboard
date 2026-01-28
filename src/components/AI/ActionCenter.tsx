import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, CheckCircle2, Terminal } from 'lucide-react';

interface ActionItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
}

const mockActions: ActionItem[] = [
  {
    id: 'action-1',
    type: 'critical',
    title: 'KRİTİK STRES TESPİTİ',
    description: 'Tarla 42 bölgesinde NDVI değerlerinde %18 ani düşüş. Sulama arızası şüpheli.',
    timestamp: '2dk önce'
  },
  {
    id: 'action-2',
    type: 'warning',
    title: 'BOŞLUK YOĞUNLUĞU',
    description: 'Güney segmentte bitki çıkışı beklenen eşiğin altında (%12 açık).',
    timestamp: '15dk önce'
  }
];

export function ActionCenter() {
  return (
    <div className="flex flex-col h-full glass-panel rounded-3xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-agri-cyan" />
          <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Action Intelligence Center</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-agri-red animate-pulse" />
          <span className="text-[8px] font-bold text-agri-red uppercase tracking-tighter">Live Monitor</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        <AnimatePresence>
          {mockActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-4 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                action.type === 'critical' 
                  ? 'bg-agri-red/5 border-agri-red/20 hover:border-agri-red/40' 
                  : 'bg-agri-violet/5 border-agri-violet/20 hover:border-agri-violet/40'
              }`}
            >
              {/* Glitch Background Effect for Critical */}
              {action.type === 'critical' && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-agri-red animate-glitch pointer-events-none" />
              )}

              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl border ${
                  action.type === 'critical' ? 'bg-agri-red/10 border-agri-red/20' : 'bg-agri-violet/10 border-agri-violet/20'
                }`}>
                  {action.type === 'critical' ? (
                    <AlertTriangle className="w-4 h-4 text-agri-red" />
                  ) : (
                    <Zap className="w-4 h-4 text-agri-violet" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      action.type === 'critical' ? 'text-agri-red animate-pulse' : 'text-agri-violet'
                    }`}>
                      {action.title}
                    </span>
                    <span className="text-[8px] font-bold text-mas-muted uppercase">{action.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-mas-muted leading-relaxed font-medium">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Action Button Label */}
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-end gap-2 text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                <span>Detaylı Reçete</span>
                <CheckCircle2 className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Status */}
      <div className="p-4 bg-mas-black/20 border-t border-white/5">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-mas-muted uppercase tracking-tighter">AI Confidence</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[94%] h-full bg-agri-green shadow-[0_0_8px_#39ff14]" />
              </div>
              <span className="text-[9px] font-black text-agri-green">94%</span>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-agri-cyan/10 border border-agri-cyan/20 text-agri-cyan text-[9px] font-black uppercase tracking-[0.2em] hover:bg-agri-cyan/20 transition-all">
            ARŞİV
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionCenter;
