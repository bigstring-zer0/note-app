import React from "react"
import useNoteStore from "apps/noteStore"
import ArchivePageNothing from "./ArchivePageNothing"
import ArchiveNoteComponent from "components/Note/ArchiveNoteComponent"

const ArchivePage = () => {
    const { archiveList } = useNoteStore()
    return (
        <div>
            {archiveList.length === 0 ? (
                <ArchivePageNothing />
            ) : (
                <ul>
                    {archiveList.map((note) => (
                        <li key={note.id}>
                            <ArchiveNoteComponent note={note} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ArchivePage
