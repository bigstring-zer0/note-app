import React from "react"

import styles from "./createnotebutton.module.css"
import useNoteStore from "apps/noteStore"
import { useLocation } from "react-router-dom"
import useModalStore from "apps/modalStore"

const CreateNoteButton = () => {
    const { togglefieldMode, addLabelsToNote } = useNoteStore()

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const labelName = searchParams.get("name")!

    return (
        <div>
            <button
                className={styles.create_note_button}
                onClick={() => {
                    if (labelName) {
                        addLabelsToNote(labelName)
                    }
                    togglefieldMode()
                }}
            >
                <div className={styles.create_note_button_text}>
                    메모 작성...
                </div>
            </button>
        </div>
    )
}

export default CreateNoteButton
