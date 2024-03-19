import Page from "models/page"
import PageType from "models/pageType"
import { create } from "zustand"

type BarState = {
    currentPage: Page
    isBarOpen: boolean
    isMouseOpen: boolean
    setCurrentPage: (page: Page) => void
    toggleBar: () => void
    toggleMouseBar: () => void
}

const useBarStore = create<BarState>((set) => ({
    currentPage: {
        id: "main",
        name: PageType.NOTES,
        path: "/",
        type: PageType.NOTES,
    },
    isBarOpen: false,
    isMouseOpen: true,
    setCurrentPage: (page) => set(() => ({ currentPage: page })),
    toggleBar: () => set((state) => ({ isBarOpen: !state.isBarOpen })),
    toggleMouseBar: () => set((state) => ({ isMouseOpen: !state.isMouseOpen })),
}))

export default useBarStore
