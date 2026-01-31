# [UI/UX Modernizasyonu ve Navigasyon Yapılandırması]

Kullanıcı arayüzünün karmaşıklığını gidermek, karanlık/neon temasını daha profesyonel bir tarım teknolojisi (AgriTech) görünümüne kavuşturmak ve çalışmayan menüleri aktif hale getirmek için yapılacak değişiklikleri kapsar.

## User Review Required
> [!IMPORTANT]
> Mevcut "Karanlık/Neon" tema tamamen değiştirilerek daha yumuşak, kurumsal ve modern bir "Profesyonel Koyu Tema" (Lacivert/Zümrüt Yeşili) yapısına geçilecektir.

## Proposed Changes

### Dependencies
- `react-router-dom` paketi projeye eklenecek.

### Styling (TailwindCSS & CSS)
#### [MODIFY] [index.css](file:///d:/Code/MAS-Kontrol/src/index.css)
- Neon renkler (`--color-mas-light`, `--color-mas-cyan` vb.) yerine daha dengeli renk paleti tanımlanacak.
- `glass-panel` ve diğer efektler sadeleştirilecek.
- Yazı tipleri korunacak ancak okunabilirlik artırılacak.

### Components
#### [MODIFY] [App.tsx](file:///d:/Code/MAS-Kontrol/src/App.tsx)
- Mevcut içerik `Dashboard` sayfasına taşınacak.
- Router (`<Routes>`, `<Route>`) yapısı kurulacak.
- Layout düzeni (Sidebar + Main Content) Router ile uyumlu hale getirilecek.

#### [MODIFY] [Sidebar.tsx](file:///d:/Code/MAS-Kontrol/src/components/Sidebar.tsx)
- Butonlar `Link` veya `NavLink` bileşenine dönüştürülecek.
- Aktif link stili yeni temaya uygun hale getirilecek.

### Pages (New)
#### [NEW] [Dashboard.tsx](file:///d:/Code/MAS-Kontrol/src/pages/Dashboard.tsx)
- Mevcut `App.tsx` içeriğini barındıracak.

#### [NEW] [FieldManagement.tsx](file:///d:/Code/MAS-Kontrol/src/pages/FieldManagement.tsx)
- Tarla yönetimi için demo içerik ve placeholder.

#### [NEW] [Team.tsx](file:///d:/Code/MAS-Kontrol/src/pages/Team.tsx)
- Ekip yönetimi için demo içerik.

#### [NEW] [KnowledgeBase.tsx](file:///d:/Code/MAS-Kontrol/src/pages/KnowledgeBase.tsx)
- RAG/Hafıza arayüzü için demo içerik.

#### [NEW] [Settings.tsx](file:///d:/Code/MAS-Kontrol/src/pages/Settings.tsx)
- Ayarlar sayfası için demo içerik.

## Verification Plan

### Automated Tests
- `npm run dev` ile projenin hatasız kalktığı doğrulanacak.
- `npm run build` ile TypeScript hatası olmadığı doğrulanacak.

### Manual Verification
- **Navigasyon Testi:** Sidebar'daki her linke tıklanarak ilgili sayfanın (demo bile olsa) açıldığı ve URL'in değiştiği görülecek.
- **Tema Kontrolü:** "Neon" parlamaların azaldığı, daha profesyonel ve göz yormayan bir renk paletinin aktif olduğu gözlemlenecek.
- **Responsive:** Sidebar ve ana içerik alanının yerleşimi kontrol edilecek.
