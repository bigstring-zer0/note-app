import { Container, Grid, IconButton, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"

import Modal from "react-modal"
import styles from "./adddlabelmodal.module.css"

import useModalStore from "apps/modalStore"
import useMenuStore from "apps/menuStore"
import PageType from "models/pageType"

import "primereact/resources/themes/lara-light-indigo/theme.css"
import useNoteStore from "apps/noteStore"

Modal.setAppElement("#root")

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
}

const AddLabelModal = () => {
    const { isAddModalOpen, closeAddModal } = useModalStore()

    const { pageList, addLabelPage, getLabelList } = useMenuStore()
    const {
        addLabelsToNoteEdit,
        deleteLabelsFromNoteEdit,
        addLabelsToNote,
        currentLabel,
        deleteLabelsFromNote,
        editingNote,
    } = useNoteStore()

    const [labelName, setLabelName] = useState("")
    const [mode, setMode] = useState(true)

    const [errorMessage, setErrorMessage] = useState("")
    const [labels, setLabels] = useState<string[]>([])

    const handleAddLabel = () => {
        if (!labelName) {
            return
        }
        const labelExists = pageList.some(
            (page) => page.name === labelName && page.type === PageType.LABEL
        )

        if (labelExists) {
            setErrorMessage("A label with this name already exists.")
            return
        }

        addLabelPage(labelName)
        setLabelName("")
        setErrorMessage("")
    }

    const addLabelToEditingNote = (label: string) => {
        if (editingNote && !labels.includes(label)) {
            setLabels([...labels, label])
            addLabelsToNoteEdit(label)
        }
    }

    const removeLabelFromEditingNote = (label: string) => {
        if (editingNote && labels.includes(label)) {
            setLabels(labels.filter((l) => l !== label))
            deleteLabelsFromNoteEdit(label)
        }
    }

    useEffect(() => {
        if (editingNote) {
            setLabels(editingNote.labelId)
        }
    }, [editingNote])

    return (
        <Modal
            isOpen={isAddModalOpen}
            onRequestClose={() => {
                setMode(true)
                closeAddModal()
            }}
            style={customStyles}
        >
            <Container
                component="main"
                maxWidth="xl"
                style={{ marginTop: "5%" }}
            >
                <Grid
                    item
                    xs={12}
                    style={{
                        fontSize: "20px",
                        margin: "20px",
                        marginTop: 0,
                        marginLeft: 0,
                    }}
                >
                    레이블 추가
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        width: "250px",
                        margin: "20px",
                        marginLeft: 0,
                        marginRight: 0,
                    }}
                >
                    {mode ? (
                        <>
                            <IconButton
                                onClick={() => setMode(!mode)}
                                style={{ fontSize: "15px" }}
                            >
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                            </IconButton>
                            <div style={{ display: "inline" }}>
                                Make a New Label
                            </div>
                        </>
                    ) : (
                        <>
                            <IconButton
                                onClick={() => {
                                    setLabelName("")
                                    setErrorMessage("")
                                    setMode(!mode)
                                }}
                                style={{ fontSize: "15px" }}
                            >
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </IconButton>
                            <TextField
                                required
                                id="standard-required"
                                variant="standard"
                                value={labelName}
                                onChange={(e) => setLabelName(e.target.value)}
                                placeholder="Make a New Label"
                            />
                            <IconButton
                                onClick={handleAddLabel}
                                style={{ fontSize: "15px" }}
                            >
                                <span className="material-symbols-outlined">
                                    check
                                </span>
                            </IconButton>
                            {errorMessage && (
                                <div className={styles.error_message}>
                                    {errorMessage}
                                </div>
                            )}
                        </>
                    )}
                </Grid>
            </Container>
            <div>
                <ul className={styles.list_value}>
                    {getLabelList().map((item) => {
                        return (
                            <li key={item} className={styles.li_value}>
                                {editingNote ? (
                                    !labels.includes(item) ? (
                                        <>
                                            <div
                                                className={
                                                    styles.label_container
                                                }
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        setMode(!mode)
                                                    }
                                                    style={{ fontSize: "15px" }}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        label
                                                    </span>
                                                </IconButton>
                                                <div
                                                    className={
                                                        styles.label_name
                                                    }
                                                >
                                                    {item}
                                                </div>
                                            </div>
                                            <IconButton
                                                onClick={() => {
                                                    addLabelToEditingNote(item)
                                                }}
                                                style={{ fontSize: "15px" }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    add
                                                </span>
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className={
                                                    styles.label_container
                                                }
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        setMode(!mode)
                                                    }
                                                    style={{ fontSize: "15px" }}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        label
                                                    </span>
                                                </IconButton>
                                                <div
                                                    className={
                                                        styles.label_name
                                                    }
                                                >
                                                    {item}
                                                </div>
                                            </div>
                                            <IconButton
                                                onClick={() => {
                                                    removeLabelFromEditingNote(
                                                        item
                                                    )
                                                }}
                                                style={{ fontSize: "15px" }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    close
                                                </span>
                                            </IconButton>
                                        </>
                                    )
                                ) : !currentLabel.includes(item) ? (
                                    <>
                                        <div className={styles.label_container}>
                                            <IconButton
                                                onClick={() => setMode(!mode)}
                                                style={{ fontSize: "15px" }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    label
                                                </span>
                                            </IconButton>
                                            <div className={styles.label_name}>
                                                {item}
                                            </div>
                                        </div>
                                        <IconButton
                                            onClick={() => {
                                                addLabelsToNote(item)
                                            }}
                                            style={{ fontSize: "15px" }}
                                        >
                                            <span className="material-symbols-outlined">
                                                add
                                            </span>
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.label_container}>
                                            <IconButton
                                                onClick={() => setMode(!mode)}
                                                style={{ fontSize: "15px" }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    label
                                                </span>
                                            </IconButton>
                                            <div className={styles.label_name}>
                                                {item}
                                            </div>
                                        </div>
                                        <IconButton
                                            onClick={() => {
                                                deleteLabelsFromNote(item)
                                            }}
                                            style={{ fontSize: "15px" }}
                                        >
                                            <span className="material-symbols-outlined">
                                                close
                                            </span>
                                        </IconButton>
                                    </>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div style={{ textAlign: "right", fontSize: "10px" }}>
                <IconButton
                    onClick={() => {
                        if (editingNote) {
                        }
                        closeAddModal()
                    }}
                    style={{ fontSize: "15px" }}
                >
                    완료
                </IconButton>
            </div>
        </Modal>
    )
}

export default AddLabelModal
