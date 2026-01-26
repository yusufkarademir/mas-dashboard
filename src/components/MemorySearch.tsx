import { Search, Command } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export function MemorySearch() {
  const { isMemoryMode, toggleMemoryMode } = useStore();

  return (
    <div className="relative flex-1 max-w-2xl group mx-4">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className={cn("w-4 h-4 transition-colors duration-300", isMemoryMode ? "text-mas-cyan" : "text-mas-muted group-focus-within:text-mas-light")} />
      </div>
      <input 
        type="text" 
        placeholder="Sistem hafızasında ara..."
        className={cn(
          "w-full bg-white/[0.03] border border-white/5 text-sm text-mas-text rounded-2xl pl-11 pr-24 py-3 transition-all duration-500",
          "focus:outline-none focus:bg-white/[0.05] focus:border-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.03)]",
          "placeholder:text-mas-muted/50 font-medium tracking-tight",
          isMemoryMode && "border-mas-cyan/20 ring-1 ring-mas-cyan/10"
        )}
      />
      
      <button 
        onClick={toggleMemoryMode}
        className={cn(
          "absolute right-2 top-2 p-1 px-3 rounded-xl text-[10px] font-bold font-mono transition-all duration-300 border",
          isMemoryMode 
            ? "bg-mas-cyan/20 text-mas-cyan border-mas-cyan/30 shadow-[0_0_15px_rgba(0,245,255,0.2)]" 
            : "bg-white/5 text-mas-muted border-white/5 hover:bg-white/10 hover:text-white"
        )}
      >
        <div className="flex items-center gap-2">
          <Command className="w-3 h-3" />
          {isMemoryMode ? 'RAG: ACTIVE' : 'RAG: OFF'}
        </div>
      </button>
    </div>
  );
}
