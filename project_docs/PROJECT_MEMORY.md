# Şeker Pancarı MAS Dashboard - Proje Hafızası

Son Güncelleme: 29 Ocak 2026
Durum: ✅ Phase 3 Ar-Ge Entegrasyonu Tamamlandı - Stabil Build

## 🎯 Proje Özeti
Şeker Pancarı verimini artırmak amacıyla geliştirilen, drone ve yapay zeka destekli Multi-Agent System (MAS) için Tarım-İstihbarat Platformu'dur. Sistem; BBCH evre takibi, NDVI/NDRE analizi, stres tespiti ve GIS katmanları ile tam entegre çalışmaktadır.

## 🏗️ Mimari Yapı (Güncel)
- **Frontend:** React 19 + Vite 7, Mapbox GL JS (Multi-layer GIS), Zustand 5 (Agri-Metrics State)
- **Backend:** PocketBase (v0.22+) - `field_analytics` ve `interactions` koleksiyonları.
- **AI/RAG:** `MemorySearch` bileşeni üzerinden fenolojik evre (BBCH) bağlamlı semantik sorgulama.

## 🧩 Modüller ve Durumları
| Modül | Durum | Açıklama |
| :--- | :--- | :--- |
| **Agro-Metrics** | ✅ Tamam | BBCH, NDVI, Stres, Bitki Sayımı ve Verim Projeksiyonu entegre edildi. |
| **GIS Katmanları** | ✅ Tamam | COG Raster, Isı Haritası (Hastalık) ve Segmentasyon desteği eklendi. |
| **Karar Destek** | ✅ Tamam | `ActionCenter` reçete (prescription) ve müdahale talimatları aktif. |

## 🔑 Restart Sonrası Adımlar (Elimizin Altında)
Sistem açıldığında sırasıyla çalıştırılacak komutlar:
1. **Yerel PocketBase:** `pocketbase serve --http=0.0.0.0:8095` (D: sürücüsünde pb_data mevcut)
2. **Frontend Dev:** `npm run dev`
3. **Build Kontrol:** `npm run build` (TypeScript hataları giderildi)

## 📝 Teknik Notlar (Blueprint)
- **Deployment:** Coolify exit code 255 hatası sunucu kaynaklıdır (C: 0 byte sorunu). Kod tabanı sabittir.
- **Zustand:** `StatMetrics` ve `SystemMetrics` ayrıştırıldı, mimari daha temiz hale getirildi.
- **RAG Context:** Hafıza aramalarında otomatik olarak mevcut `bbch_stage` verisi sorguya eklenir.
