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
import { useLocation } from "react-router-dom"

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

const CreateNoteFieldDetail = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const labelName = searchParams.get("name")!

    const [content, setContent] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const [selectedPrior, setSelectedPrior] = useState<Priority>()
    const [selectedColor, setSelectedColor] = useState<BackgroundColor>()

    const {
        togglefieldMode,
        addNote,
        currentLabel,
        clearCurrentLabel,
        addLabelsToNote,
    } = useNoteStore()
    const { openAddModal } = useModalStore()

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
                    {currentLabel.length > 0 ? (
                        <>
                            <p>Labels</p>
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
                    ) : (
                        <></>
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
                        onClick={() => {
                            if (!content) {
                                alert("내용이 없습니다!!")
                                return
                            }

                            const newNote: Note = {
                                id: getId(),
                                title: title,
                                content: content ?? "",
                                backgroundColor:
                                    selectedColor ?? BackgroundColor.WHITE,
                                labelId: currentLabel,
                                archived: false,
                                pinned: false,
                                trashed: false,
                                priority: selectedPrior ?? Priority.LOW,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            }
                            addNote(newNote)
                            togglefieldMode()
                            clearCurrentLabel()
                        }}
                        type="submit"
                        label="Save"
                        className={styles.editor_save_button}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateNoteFieldDetail
