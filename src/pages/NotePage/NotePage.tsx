import React from "react"
import useNoteStore from "apps/noteStore"
import NotePageNothing from "./NotePageNothing"

import styles from "pages/styles/pagenothing.module.css"
import notestyles from "./notepage.module.css"
import CreateNoteField from "components/CreateNoteField/CreateNoteField"
import CreateNoteButton from "components/Button/CreateNoteButton/CreateNoteButton"
import NoteComponent from "components/Note/NoteComponent"

const NotePage = () => {
    const { noteList } = useNoteStore()
    const { textfieldMode } = useNoteStore()

    const pinnedNotes = noteList.filter((note) => note.pinned)
    const otherNotes = noteList.filter((note) => !note.pinned)

    return (
        <div>
            <div className={styles.content_box}>
                <div>
                    {textfieldMode ? <CreateNoteField /> : <CreateNoteButton />}
                </div>
            </div>
            {noteList.length === 0 ? (
                <NotePageNothing />
            ) : pinnedNotes.length === 0 ? (
                <div className={notestyles.note_space}>
                    <ul className={notestyles.list_space}>
                        {noteList.map((note) => (
                            <li key={note.id} className={notestyles.list_style}>
                                <NoteComponent note={note} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className={notestyles.note_space}>
                    <h2>FIXED ({pinnedNotes.length})</h2>
                    <ul className={notestyles.list_space}>
                        {pinnedNotes.map((note) => (
                            <li key={note.id} className={notestyles.list_style}>
                                <NoteComponent note={note} />
                            </li>
                        ))}
                    </ul>
                    <br />
                    <br />
                    <h2>ETC ({otherNotes.length})</h2>
                    <ul className={notestyles.list_space}>
                        {otherNotes.map((note) => (
                            <li key={note.id} className={notestyles.list_style}>
                                <NoteComponent note={note} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default NotePage
