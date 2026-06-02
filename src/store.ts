import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  sharesCount: number;
  whatsappSharesCount: number;
  instagramSharesCount: number;
  unlockedCount: number;
  bookmarks: string[];
  history: string[];
  
  incrementShare: () => void;
  incrementWhatsAppShare: () => void;
  incrementInstagramShare: () => void;
  toggleBookmark: (id: string) => void;
  addToHistory: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sharesCount: 0,
      whatsappSharesCount: 0,
      instagramSharesCount: 0,
      unlockedCount: 20,
      bookmarks: [],
      history: [],
      
      incrementShare: () => set((state) => {
        const currentWhatsApp = state.whatsappSharesCount !== undefined ? state.whatsappSharesCount : state.sharesCount;
        const currentInstagram = state.instagramSharesCount || 0;
        const newWhatsApp = currentWhatsApp + 1;
        const newTotal = newWhatsApp + currentInstagram;
        const extraUnlocks = Math.floor(newTotal / 5) * 100;
        const newTotalUnlocks = Math.min(1000, 20 + extraUnlocks);
        return {
          whatsappSharesCount: newWhatsApp,
          sharesCount: newTotal,
          unlockedCount: newTotalUnlocks
        };
      }),

      incrementWhatsAppShare: () => set((state) => {
        const currentWhatsApp = state.whatsappSharesCount !== undefined ? state.whatsappSharesCount : state.sharesCount;
        const currentInstagram = state.instagramSharesCount || 0;
        const newWhatsApp = currentWhatsApp + 1;
        const newTotal = newWhatsApp + currentInstagram;
        const extraUnlocks = Math.floor(newTotal / 5) * 100;
        const newTotalUnlocks = Math.min(1000, 20 + extraUnlocks);
        return {
          whatsappSharesCount: newWhatsApp,
          sharesCount: newTotal,
          unlockedCount: newTotalUnlocks
        };
      }),

      incrementInstagramShare: () => set((state) => {
        const currentWhatsApp = state.whatsappSharesCount !== undefined ? state.whatsappSharesCount : state.sharesCount;
        const currentInstagram = state.instagramSharesCount || 0;
        const newInstagram = currentInstagram + 1;
        const newTotal = currentWhatsApp + newInstagram;
        const extraUnlocks = Math.floor(newTotal / 5) * 100;
        const newTotalUnlocks = Math.min(1000, 20 + extraUnlocks);
        return {
          instagramSharesCount: newInstagram,
          sharesCount: newTotal,
          unlockedCount: newTotalUnlocks
        };
      }),
      
      toggleBookmark: (id) => set((state) => ({
        bookmarks: state.bookmarks.includes(id) 
          ? state.bookmarks.filter(b => b !== id)
          : [...state.bookmarks, id]
      })),
      
      addToHistory: (id) => set((state) => {
        const filtered = state.history.filter(h => h !== id);
        return {
          history: [id, ...filtered].slice(0, 20) // Keep last 20
        };
      })
    }),
    {
      name: 'earning-ideas-storage',
    }
  )
);
