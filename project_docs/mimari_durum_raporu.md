# Proje Mimari Durum Raporu (29 Ocak 2026)

## 1. Genel Bakış
MAS-Kontrol projesi, merkezi bir operasyonel kontrol paneli olarak modern web teknolojileri ve otonom simülasyon yetenekleri ile kurgulanmıştır. Mevcut mimari yapı, reaktif bir kullanıcı arayüzü ile gerçek zamanlı veri senkronizasyonu üzerine inşa edilmiştir.

## 2. Teknoloji Yığını (Tech Stack)
*   **Frontend Framework:** React 19 + TypeScript 5
*   **Build Tool:** Vite 7
*   **Durum Yönetimi (State Management):** Zustand 5
*   **Styling:** TailwindCSS 4 + Framer Motion (Animasyonlar)
*   **Backend & DB:** PocketBase (BaaS - SQLite tabanlı)
*   **GIS & Harita:** Mapbox GL + React Map GL
*   **Ikon Kütüphanesi:** Lucide React

## 3. Mimari Bileşenler ve Veri Akışı
### A. Merkezi Durum Yönetimi (`useStore.ts`)
Uygulama genelinde `Zustand` kullanılarak merkezi bir "Source of Truth" oluşturulmuştur.
*   **Interactions:** AI ile yapılan etkileşimlerin geçmişi.
*   **Metrics:** CPU kullanımı, vektör verileri ve işlenen alan metrikleri.
*   **Memory Mode:** Vektör tabanlı hafıza araması için global bayrak.

### B. Bileşen Yapısı
*   **ActionCenter:** AI tabanlı karar destek ve analiz merkezi.
*   **MapSection & GisOverlay:** Coğrafi verilerin görselleştirildiği ana alan.
*   **ActivityFeed:** Sistem kayıtları ve etkileşimlerin gerçek zamanlı akışı.
*   **MemorySearch:** Karar destek mekanizması için semantik arama arayüzü.

### C. Veri Entegrasyonu (`usePocketBase.ts` & `useSimulation.ts`)
*   **PocketBase:** Gerçek zamanlı abonelik (`Real-time subscription`) modeli ile veritabanındaki değişimler anında UI'a yansıtılır.
*   **Simulation Engine:** Otonom veri üretimi (`Ghost in the Shell`) için arka planda çalışan simülasyon kancaları entegre edilmiştir.

## 4. Mevcut Durum ve Teknik Notlar
*   **Modülerlik:** Bileşenler mikro-mimari prensiplerine göre ayrıştırılmıştır; GIS, AI ve UI katmanları bağımsızdır.
*   **Yüksek Performans:** Karar anında `Zustand` ve `Framer Motion` optimizasyonları ile akıcı bir kullanıcı deneyimi hedeflenmektedir.
*   **Bütünlük:** Son yapılan disk temizliği sonrası kod tabanı, bağımlılıklar ve veritabanı bütünlüğü (Data Integrity) tam olarak doğrulanmıştır.

## 5. Gelecek Planlaması / Teknik Borçlar
*   **Edge Cases:** Veri kopmalarında `PocketBase` için otomatik yeniden bağlanma stratejileri güçlendirilmeli.
*   **Optimization:** Büyük ölçekli GIS verileri için istemci tarafında kümeleme (clustering) entegrasyonu planlanabilir.

---
**Hazırlayan:** Antigravity (Senior Full Stack Developer AI)
**Rapor Durumu:** Güncel - Stabil
