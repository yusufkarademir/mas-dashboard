# MAS-Kontrol UI Modernizasyon Planı

Bu plan, uygulamanın mevcut siberpunk/karanlık mod temasını `ui-ux-pro-max` standartlarına göre daha profesyonel, akıcı ve görsel olarak etkileyici bir seviyeye taşımayı hedefler.

## Önerilen Değişiklikler

### 1. Tasarım Sistemi ve Temeller (Component: Design System)
- **Renk Paleti:** OLED dostu derin siyahlar, gece mavisi ve canlı neon yeşili/camgöbeği vurgular.
- **Tipografi:** Teknik ve hassas bir görünüm için `Fira Code` ve `Fira Sans` fontlarının entegrasyonu.
- **Efektler:** Glassmorphism (arka plan bulanıklığı), yumuşak parlamalar (glow) ve katmanlı gölgeler.

#### [MODIFY] [index.css](file:///d:/Code/MAS-Kontrol/src/index.css)
- Tailwind temasına yeni renk değişkenleri eklenecek.
- Global `base` stilleri güncellenecek.
- Arka plan için siberpunk dokulu gradyanlar tanımlanacak.

### 2. Arayüz Düzeni ve Animasyonlar (Component: Layout)
#### [MODIFY] [App.tsx](file:///d:/Code/MAS-Kontrol/src/App.tsx)
- Header ve Sidebar için modern "floating" (yüzen) ve şeffaf görünüm.
- Ana içerik alanı için `framer-motion` ile giriş animasyonları.

### 3. Bileşen Modernizasyonu (Component: UI Components)
#### [MODIFY] [Sidebar.tsx](file:///d:/Code/MAS-Kontrol/src/components/Sidebar.tsx)
- Menü öğeleri için etkileşimli hover efektleri.
- Aktif öğeler için neon vurgu çizgileri.

#### [MODIFY] [StatCards.tsx](file:///d:/Code/MAS-Kontrol/src/components/StatCards.tsx)
- Kart tasarımları için "Bento Grid" tarzı yapı.
- Sayısal veriler için parlatma efektleri.

#### [MODIFY] [ActivityFeed.tsx](file:///d:/Code/MAS-Kontrol/src/components/ActivityFeed.tsx)
- Liste öğeleri için staggered (kademeli) yüklenme animasyonu.
- Durum göstergeleri için animasyonlu ping efektleri.

## Doğrulama Planı

### Otomatik Testler
- Build sürecinin hatasız tamamlandığının kontrolü: `npm run build`

### Manuel Doğrulama
1. **Görsel Kontrol:** Tarayıcı üzerinden yeni tasarımın renk kontrastı ve tipografi uyumunun incelenmesi.
2. **Animasyon Testi:** Sayfa geçişleri ve hover efektlerinin akıcılığının (duration/timing) test edilmesi.
3. **Responsive Kontrol:** Farklı ekran boyutlarında (Mobil, Tablet, Desktop) yerleşimin bozulmadığının doğrulanması.
