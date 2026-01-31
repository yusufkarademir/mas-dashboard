export function Dashboard() {
  return (
    <div className="flex flex-col h-full">
         {/* Bu bileşen App.tsx'teki eski içeriğin router altına taşınmış halidir */}
         {/* Ancak şimdilik children olarak App.tsx tarafından beslenecek veya outlet kullanılacak */}
         {/* Plan değişikliği: App.tsx ana layout olacak, Dashboard içeriği buraya taşınacak */}
         <div className="flex items-center justify-center h-full text-mas-text-muted">
             Yükleniyor...
         </div>
    </div>
  );
}
