import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8095');

// BU SCRIPT'i ÇALIŞTIRMADAN ÖNCE:
// 1. Tarayıcıdan http://127.0.0.1:8090/_/ adresine git.
// 2. Admin hesabını oluştur (Email: admin@mas.com, Pass: 1234567890).

const DATA = {
  gems: [
    { role: 'strateji_lideri', name: 'Strateji Lideri', status: 'active', capabilities: ['karar_verme', 'koordinasyon'] },
    { role: 'bitki_fizyologu', name: 'Agronomist', status: 'active', capabilities: ['bitki_sagligi', 'hastalik_teshisi'] },
    { role: 'uzaktan_algilama', name: 'Uzaktan Algılama Uzmanı', status: 'active', capabilities: ['ndvi_analiz', 'fotogrametri'] },
    { role: 'sistem_mimari', name: 'Sistem Mimarı', status: 'idle', capabilities: ['altyapi', 'entegrasyon'] },
    { role: 'agri_ai', name: 'Agri-AI Mühendisi', status: 'processing', capabilities: ['goruntu_isleme', 'rag_sorgulama'] },
  ],
  interactions: [
    { 
      sender: 'Sistem Mimarı', 
      role: 'sistem_mimari', 
      message: 'PocketBase bağlantısı başarılı. Merkezi hafıza aktif.',
      created: new Date().toISOString() 
    }
  ]
};

async function main() {
  try {
    // Admin login
    await pb.admins.authWithPassword('admin@mas.com', '1234567890');
    console.log('✅ Admin girişi başarılı.');

    // 1. Create Collections
    try {
      await pb.collections.create({
        name: 'gems',
        type: 'base',
        schema: [
          { name: 'role', type: 'text', required: true },
          { name: 'name', type: 'text', required: true },
          { name: 'status', type: 'select', options: { values: ['active', 'idle', 'processing', 'offline'] } },
          { name: 'capabilities', type: 'json' }
        ]
      });
      console.log('✅ Gems koleksiyonu oluşturuldu.');
    } catch (e) {
      console.log('ℹ️ Gems koleksiyonu zaten var veya hata:', e.message);
    }

    try {
      await pb.collections.create({
        name: 'interactions',
        type: 'base',
        schema: [
          { name: 'sender', type: 'text', required: true },
          { name: 'role', type: 'text', required: true },
          { name: 'message', type: 'text', required: true },
          { name: 'related_memory_id', type: 'text' },
          { name: 'is_thinking', type: 'bool' }
        ]
      });
      console.log('✅ Interactions koleksiyonu oluşturuldu.');
    } catch (e) {
      console.log('ℹ️ Interactions koleksiyonu zaten var veya hata:', e.message);
    }
    
    // 2. Seed Data
    for (const gem of DATA.gems) {
        try {
            await pb.collection('gems').create(gem);
        } catch (e) { /* ignore duplicate */ }
    }
    
    console.log('🌱 Veri tohumlama tamamlandı!');

  } catch (err) {
    console.error('❌ HATA:', err.originalError || err.message);
    console.error('Lütfen önce Admin panelinden (http://127.0.0.1:8090/_/) admin hesabını oluşturduğundan emin ol.');
  }
}

main();
