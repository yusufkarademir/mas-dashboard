# Faz 3: "Agro-Intelligence" UI Geliştirme Planı

Bu aşamada backend'den gelen coğrafi veriler ve analiz sonuçları, kullanıcının "wow" diyeceği siberpunk bir Dashboard üzerinde görselleştirilecektir.

## Proposed Changes

### 🎨 Global Stil ve Tema (`index.css`) [MODIFY]
- **HSL Renk Paleti:** Daha doygun ve modern tarım teknolojisi renkleri (#39FF14: Toxic Green, #00F5FF: Pulse Cyan).
- **Glassmorphism:** Tüm paneller için `backdrop-filter: blur(20px)` ve ince `white/5` border kullanımı.
- **Glitch Animasyonlar:** Kritik uyarılarda kullanılacak CSS keyframe animasyonları.

### 🗺️ Harita Katmanı (`GisOverlay.tsx` & `MapSection.tsx`) [NEW/MODIFY]
- **Mapbox Entegrasyonu:** `MapPlaceholder` yerine gerçek `react-map-gl` kurulumu.
- **NDVI Raster Katmanı:** COG üzerinden `raster-tiles` ve dinamik `raster-color-ramp` ile ısı haritası görselleştirmesi.
- **Detection Vektör Katmanı:** PostGIS'ten gelen bitki noktalarını gösteren dinamik GeoJSON katmanı.

### ⚠️ Action Center (`ActionCenter.tsx`) [NEW]
- **Kritik Uyanlar:** Backend'den gelen `%15 stres` veya `Critical` şiddet seviyesine sahip raporların glitch efektli sunumu.
- **AI Reçete Gösterimi:** Markdown formatındaki müdahale planlarının okunabilir, şık bir panelde sunulması.

### 📊 Dashboard Cila (`App.tsx` & `StatCards.tsx`) [MODIFY]
- **Micro-Animations:** `framer-motion` ile veri değişimlerinde akıcı geçişler.
- **Siberpunk Detaylar:** Scan-line efektleri, border-glow animasyonları ve gelişmiş tipografi.

## Verification Plan

### Manual Verification
1.  **Harita Görselleştirme:** NDVI katmanının harita üzerinde doğru oturup oturmadığının kontrolü.
2.  **Glitch Testi:** `ActionCenter` bileşeninde `Critical` statüsü elle tetiklenerek animasyonun doğrulanması.
3.  **Mobil Uyumluluk:** Dashboard'un farklı ekran boyutlarında siberpunk estetiğini koruduğunun kontrolü.
