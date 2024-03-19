import { create } from "zustand"

type ModalState = {
    isModalOpen: boolean
    isAddModalOpen: boolean
    openModal: () => void
    closeModal: () => void
    openAddModal: () => void
    closeAddModal: () => void
}

const useModalStore = create<ModalState>((set) => ({
    isModalOpen: false,
    isAddModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    openAddModal: () => set({ isAddModalOpen: true }),
    closeAddModal: () => set({ isAddModalOpen: false }),
}))

export default useModalStore
