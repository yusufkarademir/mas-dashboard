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
*   **Metrics (Ar-Ge):** BBCH skalası, bitki sayımı (hedef/gerçek), NDVI/NDRE ortalamaları, stres indeksi ve hastalık takibi.
*   **System Metrics:** CPU kullanımı, vektör hafıza ve işlenen toplam alan (ayrıştırıldı).
*   **Memory Mode:** Vektör tabanlı hafıza araması için global bayrak (BBCH bağlamı eklendi).

### B. Bileşen Yapısı
*   **ActionCenter:** Akıllı karar destek merkezi; reçete (prescription) türü aksiyonlar ve fenolojik etiketler eklendi.
*   **MapSection & GisOverlay:** Çok katmanlı GIS desteği; NDVI COG raster, yeşil aksam segmentasyon (vektör) ve hastalık ısı haritası (heatmap).
*   **StatCards:** Dinamik renklendirme kuralları; NDVI < 0.50 veya Stres > 0.70 durumunda alarm görselleştirmesi.

### C. Veri Entegrasyonu (`usePocketBase.ts` & `useSimulation.ts`)
*   **PocketBase:** `field_analytics` koleksiyonu üzerinden gerçek zamanlı tarımsal veri aboneliği.
*   **Simulation Engine:** Ar-Ge metriklerini ve gelişim skorlarını rastgele üreten otonom simülasyon kancaları.

## 4. Mevcut Durum ve Teknik Notlar
*   **Bütünlük:** Ar-Ge entegrasyonu sonrası tüm TypeScript tipleri ve build süreçleri doğrulanmıştır.
*   **Ar-Ge Odaklılık:** Sistem artık sadece bir dashboard değil, aktif bir tarımsal karar destek mekanizmasıdır.
*   **Deployment:** Coolify build hatası (code 255) sunucu kaynaklı (disk/RAM) saptanmış, kod seviyesinde stabilizasyon sağlanmıştır.

## 5. Gelecek Planlaması / Teknik Borçlar
*   **GeoJSON Entegrasyonu:** Gerçek saha verileri için dinamik GeoJSON yükleme modülü.
*   **Offline-First:** PWA ve offline veri senkronizasyon stratejileri.
*   **AI Reçete Motoru:** Teşhis edilen hastalıklara göre otomatik ilaçlama reçetesi üreten LLM ajanları.

---
**Hazırlayan:** Antigravity (Senior Full Stack Developer AI)
**Rapor Durumu:** Güncel (Ar-Ge Entegrasyonu Tamamlandı) - Stabil
