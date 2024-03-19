import React from "react"
import useNoteStore from "apps/noteStore"
import Note from "models/note"
import { IconButton } from "@mui/material"

import EditNoteIcon from "@mui/icons-material/EditNote"
import DeleteIcon from "@mui/icons-material/Delete"
import UnarchiveIcon from "@mui/icons-material/Unarchive"

import basestyles from "components/Note/notecomponent.module.css"
import styles from "components/Note/TrashNoteComponent/trashnote.module.css"
import formatDate from "utils/formatDate"

import * as DOMPurify from "dompurify"

interface ArcNoteProps {
    note: Note
}

const ArchiveNoteComponent = ({ note }: ArcNoteProps) => {
    const { restoreToNoteListFromArchive, addtoTrash } = useNoteStore()

    return (
        <>
            <div
                className={basestyles.note_container}
                style={{ backgroundColor: note.backgroundColor }}
            >
                <div className={styles.title_container}>
                    {note.title === "" ? "No title" : note.title}
                </div>
                <>
                    <div
                        className={styles.content_container}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(note.content),
                        }}
                    ></div>
                    <div></div>
                    <div
                        className={styles.label_container}
                        style={{ display: "flex" }}
                    >
                        {note.labelId.length === 0
                            ? "No label"
                            : note.labelId.map((lb) => (
                                  <div
                                      key={lb}
                                      className={basestyles.label_item}
                                  >
                                      <span>{lb}</span>
                                  </div>
                              ))}
                    </div>
                </>

                <div className={styles.button_group}>
                    <div className={styles.updatedAt_container}>
                        {formatDate(note.updatedAt)}
                    </div>
                    <IconButton
                        onClick={() => restoreToNoteListFromArchive(note.id)}
                    >
                        <UnarchiveIcon />
                    </IconButton>
                    {/* <IconButton onClick={() => addtoTrash(note.id)}>
                    <EditNoteIcon />
                    </IconButton> */}
                    <IconButton onClick={() => addtoTrash(note.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default ArchiveNoteComponent
