import { Container, Grid, IconButton, TextField } from "@mui/material"
import React, { useState } from "react"

import Modal from "react-modal"
import styles from "./editlabelmodal.module.css"

import { useNavigate } from "react-router-dom"
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

const EditLabelModal = () => {
    const navigate = useNavigate()
    const { isModalOpen, closeModal } = useModalStore()
    const { pageList, addLabelPage, getLabelList, editLabelName, deleteLabel } =
        useMenuStore()
    const { editLabelInNotes, deleteLabelInNotes } = useNoteStore()

    const [labelName, setLabelName] = useState("")
    const [mode, setMode] = useState(true)

    const [editingLabel, setEditingLabel] = useState<string | null>(null)
    const [editingLabelName, setEditingLabelName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleEditLabel = (item: string) => {
        if (!editingLabelName) {
            return
        }

        if (editingLabelName === item) {
            // setErrorMessage("이건 뭐여")
            setEditingLabel(null)
            return
        }

        const labelExists = pageList.some(
            (page) =>
                page.name === editingLabelName && page.type === PageType.LABEL
        )

        if (labelExists) {
            setErrorMessage("A label with this name already exists.")
            return
        }

        editLabelInNotes(item, editingLabelName)
        editLabelName(item, editingLabelName)
        setEditingLabel(null)
        setErrorMessage("")
    }

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

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => {
                setMode(true)
                closeModal()
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
                    레이블 수정
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
                            {errorMessage && (
                                <div className={styles.error_message}>
                                    {errorMessage}
                                </div>
                            )}
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
                        const isEditing = editingLabel === item

                        return (
                            <li key={item} className={styles.li_value}>
                                {!isEditing ? (
                                    <>
                                        <div
                                            onClick={() => {
                                                setEditingLabel(item)
                                                setEditingLabelName(item)
                                            }}
                                            className={styles.label_container}
                                        >
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
                                                deleteLabelInNotes(item)
                                                deleteLabel(item)
                                            }}
                                            style={{ fontSize: "15px" }}
                                        >
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <IconButton
                                                onClick={() => setMode(!mode)}
                                                style={{ fontSize: "15px" }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    label
                                                </span>
                                            </IconButton>
                                            <TextField
                                                required
                                                id="standard-required"
                                                variant="standard"
                                                value={editingLabelName}
                                                onChange={(e) =>
                                                    setEditingLabelName(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Make a New Label"
                                            />
                                        </div>
                                        <IconButton
                                            onClick={() => {
                                                handleEditLabel(item)
                                                navigate(
                                                    `/label?name=${editingLabelName}`
                                                )
                                            }}
                                            style={{ fontSize: "15px" }}
                                        >
                                            <span className="material-symbols-outlined">
                                                check
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
                        closeModal()
                    }}
                    style={{ fontSize: "15px" }}
                >
                    완료
                </IconButton>
            </div>
        </Modal>
    )
}

export default EditLabelModal
