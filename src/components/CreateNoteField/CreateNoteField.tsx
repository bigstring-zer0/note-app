import React, { useEffect, useState } from "react"

import { Editor } from "primereact/editor"
import { Button as ButtonPrime } from "primereact/button"
import { Dropdown } from "primereact/dropdown"

import styles from "./createnotefield.module.css"
import useNoteStore from "apps/noteStore"
import { TextField } from "@mui/material"
import Priority from "models/priority"
import Note from "models/note"

import { v4 as getId } from "uuid"
import BackgroundColor from "models/backgroundColor"
import useModalStore from "apps/modalStore"

const PriorityItems = [
    { name: "HIGH", value: Priority.HIGH },
    { name: "LOW", value: Priority.LOW },
]

const BackgroundItems = [
    { name: "White", value: BackgroundColor.WHITE },
    { name: "Red", value: BackgroundColor.RED },
    { name: "Green", value: BackgroundColor.GREEN },
    { name: "Blue", value: BackgroundColor.BLUE },
]

const CreateNoteField = () => {
    const [content, setContent] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const [selectedPrior, setSelectedPrior] = useState<Priority>()
    const [selectedColor, setSelectedColor] = useState<BackgroundColor>()
    const [labels, setLabels] = useState<string[]>([])

    const {
        editingNote,
        togglefieldMode,
        addNote,
        currentLabel,
        clearCurrentLabel,
        updateNote,
        setEditingNote,
    } = useNoteStore()
    const { openAddModal } = useModalStore()

    const handleSave = () => {
        if (!content) {
            alert("내용이 없습니다!!")
            return
        }

        if (editingNote) {
            const updatedNote = {
                ...editingNote,
                title: title,
                content: content,
                backgroundColor: selectedColor ?? BackgroundColor.WHITE,
                labelId: labels,
                priority: selectedPrior ?? Priority.LOW,
                updatedAt: new Date(),
            }

            updateNote(updatedNote)
        } else {
            const newNote: Note = {
                id: getId(),
                title: title,
                content: content ?? "",
                backgroundColor: selectedColor ?? BackgroundColor.WHITE,
                labelId: currentLabel,
                archived: false,
                pinned: false,
                trashed: false,
                priority: selectedPrior ?? Priority.LOW,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            addNote(newNote)
        }

        setEditingNote(null)
        togglefieldMode()
        clearCurrentLabel()
    }

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title)
            setContent(editingNote.content)
            setSelectedPrior(editingNote.priority)
            setSelectedColor(editingNote.backgroundColor)
            setLabels(editingNote.labelId)
        }
    }, [editingNote])

    return (
        <div>
            <div
                className={styles.editor_container}
                style={{ backgroundColor: selectedColor }}
            >
                <p>Create Note</p>
                <TextField
                    id="standard-required"
                    value={title}
                    variant="standard"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title"
                    style={{
                        marginBottom: "10px",
                        width: "99%",
                    }}
                />
                <Editor
                    value={content}
                    onTextChange={(e) => setContent(e.htmlValue!)}
                    style={{
                        textAlign: "center",
                        height: "320px",
                        backgroundColor: selectedColor,
                    }}
                />
                <div className={styles.editor_labels_container}>
                    {editingNote ? (
                        <>
                            <p>labels</p>
                            {labels.map((label) => (
                                <span
                                    key={label}
                                    className={styles.editor_labels_item}
                                    style={{ marginRight: "10px" }}
                                >
                                    {label}
                                </span>
                            ))}
                        </>
                    ) : (
                        <>
                            <p>labels</p>
                            {currentLabel.map((label) => (
                                <span
                                    key={label}
                                    className={styles.editor_labels_item}
                                    style={{ marginRight: "10px" }}
                                >
                                    {label}
                                </span>
                            ))}
                        </>
                    )}
                </div>
                <div className={styles.editor_option_container}>
                    <ButtonPrime
                        onClick={openAddModal}
                        type="submit"
                        label="Add labels"
                        className={`${styles.editor_save_button} ${styles.editor_options}`}
                    />
                    <Dropdown
                        value={selectedPrior}
                        onChange={(e) => setSelectedPrior(e.value)}
                        options={PriorityItems}
                        optionLabel="name"
                        placeholder="Priority"
                        className={`${styles.editor_prior_dropdown} ${styles.editor_options}`}
                    />
                    <Dropdown
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.value)}
                        options={BackgroundItems}
                        optionLabel="name"
                        placeholder="Background Color"
                        className={`${styles.editor_prior_dropdown} ${styles.editor_options}`}
                    />
                </div>
                <div className={styles.editor_button_container}>
                    <ButtonPrime
                        onClick={() => handleSave()}
                        type="submit"
                        label="Save"
                        className={styles.editor_save_button}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateNoteField
