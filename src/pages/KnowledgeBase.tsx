import { Database } from 'lucide-react';

export function KnowledgeBase() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-light text-white mb-6">Kurumsal Hafıza (RAG)</h2>
       <div className="h-96 glass-panel rounded-2xl flex flex-col items-center justify-center text-center p-8 border-dashed border-2 border-mas-primary/20">
            <Database className="w-16 h-16 text-mas-primary/50 mb-4" />
            <h3 className="text-xl text-white font-medium">Bilgi Bankası İndeksleniyor</h3>
            <p className="text-mas-text-muted max-w-md mt-2">
                Geçmiş sezon verileri, literatür taramaları ve saha raporları yapay zeka tarafından işleniyor.
            </p>
       </div>
    </div>
  );
}
