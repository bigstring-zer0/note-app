import React from "react"
import useNoteStore from "apps/noteStore"
import Note from "models/note"
import formatDate from "utils/formatDate"

import basestyles from "./notecomponent.module.css"
import { IconButton } from "@mui/material"
import PushPinIcon from "@mui/icons-material/PushPin"
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined"

import DeleteIcon from "@mui/icons-material/Delete"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash"
import ArchiveIcon from "@mui/icons-material/Archive"

import EditNoteIcon from "@mui/icons-material/EditNote"

import * as DOMPurify from "dompurify"

interface NoteProps {
    note: Note
}

const NoteComponent = ({ note }: NoteProps) => {
    const {
        togglePinned,
        togglefieldMode,
        addtoArchive,
        addtoTrash,
        setEditingNote,
    } = useNoteStore()

    return (
        <div
            className={basestyles.note_container}
            style={{ backgroundColor: note.backgroundColor }}
        >
            <div className={basestyles.pin_container}>
                <IconButton onClick={() => togglePinned(note.id)}>
                    {note.pinned ? (
                        <PushPinIcon style={{ color: "red" }} />
                    ) : (
                        <PushPinOutlinedIcon />
                    )}
                </IconButton>
            </div>
            <div className={basestyles.title_container}>
                {note.title === "" ? "No title" : note.title}
            </div>
            <>
                <div
                    className={basestyles.content_container}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(note.content),
                    }}
                ></div>
                {/* <div className={basestyles.content_container}>
                    {note.content}
                </div> */}
                <div></div>
                <div
                    className={basestyles.label_container}
                    style={{ display: "flex" }}
                >
                    {note.labelId.length === 0
                        ? "No label"
                        : note.labelId.map((lb) => (
                              <div key={lb} className={basestyles.label_item}>
                                  <span>{lb}</span>
                              </div>
                          ))}
                </div>
            </>

            <div className={basestyles.button_group}>
                <div className={basestyles.updatedAt_container}>
                    {formatDate(note.updatedAt)}
                </div>
                <IconButton onClick={() => addtoArchive(note.id)}>
                    <ArchiveIcon />
                </IconButton>
                <IconButton onClick={() => addtoTrash(note.id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    onClick={() => {
                        setEditingNote(note)
                        togglefieldMode()
                    }}
                >
                    <EditNoteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default NoteComponent
