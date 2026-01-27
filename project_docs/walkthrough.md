# Phase 3: Coğrafi Veri Boru Hattı ve Stratejik Analiz Motoru - Walkthrough

Bu aşamada drone verilerini ham halinden alıp stratejik kararlara dönüştüren uçtan uca backend boru hattı (pipeline) tamamlanmıştır.

## 🛠️ Yapılan Geliştirmeler

### 1. Görüntü İşleme Motoru (GDAL/Rasterio)
- **Dinamik İndeksler:** SAVI (L katsayısı fenolojiye duyarlı) ve NDRE hesaplamaları eklendi.
- **Akıllı Maskeleme:** `NDVI < 0.2` (Toprak/Yol) ve `NIR < 0.12` (Gölge) alanları otomatik olarak analiz dışı bırakıldı.

### 2. AI Çıkarım Hattı (Tiling & Inference)
- **Tiling:** Yüksek çözünürlüklü ortofotoları işlemek için 640x640 boyutlarında, %20 overlap (örtüşme) oranına sahip tiling mekanizması geliştirildi.
- **Global NMS:** Farklı tile'lardan gelen mükerrer tespitler, Global Non-Maximum Suppression (NMS) ile temizlenerek doğru bitki sayımı sağlandı.

### 3. PostGIS ve Coğrafi Veri Yönetimi
- **Detections Tablosu:** AI tarafından tespit edilen bitki koordinatları, EPSG:4326 formatına dönüştürülerek PostGIS veri tabanına asenkron olarak aktarıldı.
- **Martin Tile Server Integration:** Martin üzerinden bu verilerin frontend (Mapbox) tarafında vektör tile olarak sunulması için altyapı hazırlandı.

### 4. Stratejik Karar Mekanizması (AI Reçeteleme)
- **Kritik Eşik Kontrolü:** %15 üzerinde bitki stresi veya boşluk yoğunluğu durumunda otomatik alarm sistemi devreye alındı.
- **Otonom Reçeteleme:** Fenolojik evre ve elde edilen veriler ışığında çiftçi için Markdown formatında otonom "Müdahale Planı" üretimi sağlandı.

## 🚀 Doğrulama ve Test Sonuçları

- **Simülasyon:** `processor.py` üzerinden yapılan testlerde, 2000x2000 boyutundaki orthofoto simülasyonu başarıyla tile'lara ayrıldı ve tespitler PostGIS'e aktarıldı.
- **Zamanlama:** Tiling ve Inference döngüsü asenkron yapı sayesinde optimize edildi.

---

> [!NOTE]
> GIS servisleri (PostGIS/Worker) şu an arka planda ayağa kalkmaktadır. Stabilizasyon sonrasında canlı ekran görüntüleri eklenecektir.
