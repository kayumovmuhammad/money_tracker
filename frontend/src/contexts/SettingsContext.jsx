import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),
      selectedDate: new Date().toISOString(),
      setSelectedDate: (date) => set({ selectedDate: date }),
    }),
    {
      name: 'settings-storage',
    }
  )
);

export default useSettingsStore;
