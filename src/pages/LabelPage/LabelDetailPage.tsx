import React from "react"
import useNoteStore from "apps/noteStore"
import { useLocation } from "react-router-dom"

import styles from "pages/styles/pagenothing.module.css"
import CreateNoteField from "components/CreateNoteField/CreateNoteField"
import CreateNoteButton from "components/Button/CreateNoteButton/CreateNoteButton"
import LabelDetailPageNothing from "./LabelDetailPageNothing"
import NoteComponent from "components/Note/NoteComponent"

const LabelDetailPage = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const labelName = searchParams.get("name")!
    const { textfieldMode } = useNoteStore()

    const { noteList } = useNoteStore()
    const labeledNote = noteList.filter((note) =>
        note.labelId.includes(labelName!)
    )
    const pinnedNotes = labeledNote.filter((note) => note.pinned)
    const otherNotes = labeledNote.filter((note) => !note.pinned)

    return (
        <div>
            <div className={styles.content_box}>
                <div>
                    {textfieldMode ? <CreateNoteField /> : <CreateNoteButton />}
                </div>
            </div>
            {labeledNote.length === 0 ? (
                <LabelDetailPageNothing />
            ) : pinnedNotes.length === 0 ? (
                <div>
                    <ul>
                        {labeledNote.map((note) => {
                            return (
                                <li key={note.id}>
                                    <NoteComponent note={note} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>FIXED</h2>
                    <ul>
                        {pinnedNotes.map((note) => (
                            <li key={note.id}>
                                <NoteComponent note={note} />
                            </li>
                        ))}
                    </ul>
                    <h2>ETC</h2>
                    <ul>
                        {otherNotes.map((note) => (
                            <li key={note.id}>
                                <NoteComponent note={note} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default LabelDetailPage
