# Şeker Pancarı MAS Dashboard - Proje Hafızası

Son Güncelleme: 26 Ocak 2026
Durum: Phase 1 Tamamlandı (Frontend) - Phase 2 (Backend) Beklemede

## 🎯 Proje Özeti
Şeker Pancarı verimini artırmak amacıyla geliştirilen, drone ve yapay zeka destekli Multi-Agent System (MAS) için kontrol paneli projesidir. Sistem, 5 farklı uzman ajanın saha verilerini analiz edip ortak bir hafızada (PocketBase/ChromaDB) işlemesine olanak tanır.

## 🏗️ Mimari Yapı
- **Frontend:** React + Vite (TypeScript), Tailwind CSS v4, Framer Motion
- **State:** Zustand (Global State Management)
- **Backend:** PocketBase (Docker / Port 8095) - *Henüz aktif değil*
- **Tema:** Agri-Tech Dark Mode (Deep Forest Green & Neon Green)

## 🧩 Modüller ve Durumları
| Modül | Durum | Açıklama |
| :--- | :--- | :--- |
| **Activity Feed** | ✅ Hazır | Ajanlar arası canlı mesajlaşma arayüzü. |
| **Stat Cards** | ✅ Hazır | Sistem metrikleri gösterge paneli. |
| **Memory Search** | ✅ Hazır | RAG hafıza arama barı. |
| **Sidebar** | ✅ Hazır | Rol bazlı navigasyon. |
| **Map Placeholder** | ✅ Hazır | Gelecekteki GIS entegrasyon alanı. |
| **PocketBase** | ⚠️ Hata | Docker bağlantı sorunu nedeniyle başlatılamadı. |

## 📝 Sonraki Adımlar (Next Actions)
1. Docker Desktop sorununun giderilmesi.
2. PocketBase servisinin başlatılması (Port 8095).
3. Veri tohumlama (Seed) scriptinin çalıştırılması.
4. "Ghost in the Shell" simülasyonunun aktifleştirilmesi.

## 🔑 Önemli Komutlar
- **Geliştirme Sunucusu:** `npm run dev`
- **Build (Üretim):** `npm run build`
- **Docker Başlat:** `docker-compose up -d`
