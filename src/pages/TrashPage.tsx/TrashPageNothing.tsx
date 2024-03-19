import React from "react"

import styles from "pages/styles/pagenothing.module.css"

const TrashPageNothing = () => {
    return (
        <div className={styles.content_box}>
            <span className={`material-symbols-outlined ${styles.nothingIcon}`}>
                delete
            </span>
            <div className={styles.description}>휴지통에 메모가 없습니다.</div>
        </div>
    )
}

export default TrashPageNothing
