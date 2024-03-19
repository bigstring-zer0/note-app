import React from "react"

import styles from "pages/styles/pagenothing.module.css"

const ArchivePageNothing = () => {
    return (
        <div className={styles.content_box}>
            <span className={`material-symbols-outlined ${styles.nothingIcon}`}>
                archive
            </span>
            <div className={styles.description}>
                보관처리된 메모가 여기에 표시됩니다.
            </div>
        </div>
    )
}

export default ArchivePageNothing
