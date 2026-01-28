import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { COLLECTIONS as SCHEMA_COLLECTIONS } from '../constants/schema';

export function usePocketBase() {
  const { pb, addInteraction, setInteractions, updateMetrics } = useStore();

  useEffect(() => {
    // 1. Fetch initial interactions
    const fetchInitialData = async () => {
      try {
        const records = await pb.collection(SCHEMA_COLLECTIONS.INTERACTIONS).getList(1, 50, {
          sort: '-created',
        });
        setInteractions(records.items as any);
      } catch (err) {
        console.error('Failed to fetch initial interactions:', err);
      }
    };

    fetchInitialData();

    // 2. Real-time subscription
    // 3. Field Analytics subscription
    pb.collection('field_analytics').subscribe('*', (e) => {
      if (e.action === 'update' || e.action === 'create') {
        updateMetrics(e.record as any);
      }
    });

    return () => {
      pb.collection(SCHEMA_COLLECTIONS.INTERACTIONS).unsubscribe('*');
      pb.collection('field_analytics').unsubscribe('*');
    };
  }, [pb, addInteraction, setInteractions]);
}
