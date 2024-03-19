import BackgroundColor from "./backgroundColor"
import Priority from "./priority"

interface Note {
    id: string
    title: string
    content: string
    backgroundColor: BackgroundColor
    labelId: string[]
    pinned: boolean
    archived: boolean
    trashed: boolean
    priority: Priority
    createdAt: Date
    updatedAt: Date
}

export default Note
