import { create } from "zustand";

const useModalStore = create((set) => ({
    isAddModalOpen: false,
    setAddModalOpen: (value) => set({ isAddModalOpen: value }),

    isEditModalOpen: false,
    setEditModalOpen: (value) => set({ isEditModalOpen: value }),
    currentTransaction: null,
    setCurrentTransaction: (value) => set({ currentTransaction: value }),
}));

export default useModalStore;