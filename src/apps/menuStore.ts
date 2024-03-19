import Page from "models/page"
import PageType from "models/pageType"
import { create } from "zustand"

import { v4 as getId } from "uuid"

interface MenuStore {
    pageList: Page[]
    addLabelPage: (name: string) => void
    getLabelList: () => string[]
    editLabelName: (currentName: string, newName: string) => void
    deleteLabel: (labelName: string) => void
}

const useMenuStore = create<MenuStore>(
    (set): MenuStore => ({
        pageList: [
            {
                id: "main",
                name: PageType.NOTES,
                path: "/",
                type: PageType.NOTES,
            },
            {
                id: "notice",
                name: PageType.NOTICE,
                path: `/${PageType.NOTICE}`,
                type: PageType.NOTICE,
            },
            {
                id: "edit",
                name: PageType.EDIT,
                path: `/${PageType.EDIT}`,
                type: PageType.EDIT,
            },
            {
                id: "archive",
                name: PageType.ARCHIVE,
                path: `/${PageType.ARCHIVE}`,
                type: PageType.ARCHIVE,
            },
            {
                id: "trash",
                name: PageType.TRASH,
                path: `/${PageType.TRASH}`,
                type: PageType.TRASH,
            },
        ],
        addLabelPage: (name) => {
            set((state) => {
                const newPage = {
                    id: getId(),
                    name: name,
                    path: `/label?name=${name}`,
                    type: PageType.LABEL,
                }

                let insertionIndex = 2
                for (let i = 0; i < state.pageList.length; i++) {
                    if (state.pageList[i].type === PageType.LABEL) {
                        insertionIndex = i + 1
                    }
                }

                const updatedPageList = [
                    ...state.pageList.slice(0, insertionIndex),
                    newPage,
                    ...state.pageList.slice(insertionIndex),
                ]

                return {
                    pageList: updatedPageList,
                }
            })
        },
        getLabelList: () => {
            const state = useMenuStore.getState()
            return state.pageList
                .filter((page) => page.type === PageType.LABEL)
                .map((labelPage) => labelPage.name)
        },
        editLabelName: (currentName, newName) => {
            set((state) => {
                const updatedPageList = state.pageList.map((page) => {
                    if (
                        page.type === PageType.LABEL &&
                        page.name === currentName
                    ) {
                        return {
                            ...page,
                            name: newName,
                            path: `/label?name=${newName}`,
                        }
                    }
                    return page
                })

                return {
                    ...state,
                    pageList: updatedPageList,
                }
            })
        },
        deleteLabel: (labelName) => {
            set((state) => {
                const updatedPageList = state.pageList.filter(
                    (page) => page.name !== labelName
                )

                return {
                    ...state,
                    pageList: updatedPageList,
                }
            })
        },
    })
)

export default useMenuStore
