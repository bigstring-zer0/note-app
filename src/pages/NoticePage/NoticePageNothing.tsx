import React from "react"

import styles from "pages/styles/pagenothing.module.css"
import CreateNoteButton from "components/Button/CreateNoteButton/CreateNoteButton"

const NoticePageNothing = () => {
    return (
        <div className={styles.content_box}>
            <CreateNoteButton />
            <span className={`material-symbols-outlined ${styles.nothingIcon}`}>
                notifications
            </span>
            <div className={styles.description}>
                예정된 알림의 메모가 여기에 표시됩니다.
            </div>
        </div>
    )
}

export default NoticePageNothing
