# MAS Dashboard (Şeker Pancarı Ar-Ge)

Bu proje, Şeker Pancarı tarımında kullanılan Multi-Agent System (MAS) yapısının görsel kontrol panelidir. 

## 🚀 Özellikler
- **Canlı Ajan Akışı (Live Feed):** 5 farklı uzman ajanın (Agronomist, AI, Strateji Lideri vb.) kararlarını anlık izleme.
- **Mission Control Arayüzü:** Karanlık mod, neon vurgular ve profesyonel veri görselleştirme.
- **RAG Hafıza Modu:** Geçmiş analizlere ve vektör veritabanına erişim.

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v18+)
- Docker (Opsiyonel - Backend için)

### Adımlar
1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Projeyi başlatın:
```bash
npm run dev
```

3. (Opsiyonel) PocketBase Backend'i başlatın:
```bash
docker-compose up -d
```

## 📂 Dosya Yapısı
- `src/components`: UI bileşenleri (Feed, Stats, Sidebar)
- `src/store`: Zustand durum yönetimi
- `src/hooks`: PocketBase bağlantı kancaları
- `project_docs`: Proje dokümantasyonu ve hafıza kayıtları

## 🎨 Tema Renkleri
- **Deep Forest Green:** `#0b2319`
- **Neon Green:** `#39ff14`
- **Memory Cyan:** `#00f5ff`
