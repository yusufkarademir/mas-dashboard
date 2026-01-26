import { useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { ROLES, COLLECTIONS } from '../constants/schema';

const SCENARIOS = [
  {
    role: ROLES.REMOTE_SENSING,
    sender: 'Saha Gözlemcisi',
    messages: [
      'X-42 parselinde NDVI değerlerinde %12 düşüş saptandı. Spektral analiz bekliyor.',
      'Drone filosu tarama görevini tamamladı. Yeni koordinatlar buluta yüklendi.',
      'Bulut örtüsü nedeniyle optik analizler askıya alındı, radar verilerine geçiliyor.'
    ]
  },
  {
    role: ROLES.AGRONOMIST,
    sender: 'Bitki Uzmanı',
    messages: [
      'NDVI düşüşü magnezyum eksikliği belirtileriyle örtüşüyor. Toprak nemi kritik seviyede.',
      'Şeker pancarı yaprak lekesi risk analizi: %15. İlaçlama planı optimize edilecek.',
      'Sıcaklık artışı nedeniyle fotosentez hızı yavaşladı. Sulama periyodu güncellendi.'
    ]
  },
  {
    role: ROLES.AGRI_AI,
    sender: 'Agri-Analytics',
    messages: [
      'Geçmiş verilere göre bu verim kaybı %90 ihtimalle yeraltı su seviyesi değişimiyle bağlantılı.',
      'Hasat tahmin modeli güncellendi: Beklenen verim %5 artış gösteriyor.',
      'Vektör veritabanından benzer vakalar tarandı. 2023 Çanakkale vakası ile benzerlik saptandı.'
    ]
  },
  {
    role: ROLES.STRATEGY_LEADER,
    sender: 'Operasyon Şefi',
    messages: [
      'Bitki uzmanı verilerini doğruladı. X-42 parseli için acil eylem planı başlatıldı.',
      'Maliyet analizi tamamlandı. Drone otonomisi %95 seviyesinde tutulacak.',
      'Haftalık verimlilik raporu hazır. Tüm Gems raporlarını konsolide edin.'
    ]
  }
];

export function useSimulation() {
  const { pb, updateMetrics } = useStore();

  const simulateStep = useCallback(async () => {
    // 1. Randomly pick a scenario
    const scenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    const message = scenario.messages[Math.floor(Math.random() * scenario.messages.length)];

    // 2. Initial "Thinking" Post
    try {
      const record = await pb.collection(COLLECTIONS.INTERACTIONS).create({
        sender: scenario.sender,
        role: scenario.role,
        message: 'Analiz yapılıyor...',
        is_thinking: true,
      });

      // 3. Wait for "Thinking"
      setTimeout(async () => {
        try {
          // Update the message and set thinking to false
          await pb.collection(COLLECTIONS.INTERACTIONS).update(record.id, {
            message: message,
            is_thinking: false,
          });

          // 4. Update Metrics occasionally
          updateMetrics({
            cpu_usage: Math.floor(Math.random() * 40) + 20,
            processed_acres: Math.floor(Math.random() * 50) + 500
          });
        } catch (err) {
          console.error('Simulation update error:', err);
        }
      }, 3000);

    } catch (err) {
      console.error('Simulation create error:', err);
    }
  }, [pb, updateMetrics]);

  useEffect(() => {
    // Start simulation after 5 seconds, then every 15-30 seconds
    const initialTimeout = setTimeout(() => {
      simulateStep();
      const interval = setInterval(simulateStep, 25000);
      return () => clearInterval(interval);
    }, 5000);

    return () => clearTimeout(initialTimeout);
  }, [simulateStep]);
}
