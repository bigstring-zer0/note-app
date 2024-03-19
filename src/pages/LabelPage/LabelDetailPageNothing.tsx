import React from "react"

import styles from "pages/styles/pagenothing.module.css"

const LabelDetailPageNothing = () => {
    return (
        <div className={styles.content_box}>
            <span className={`material-symbols-outlined ${styles.nothingIcon}`}>
                label
            </span>
            <div className={styles.description}>
                이 라벨이 지정된 메모가 없습니다.
            </div>
        </div>
    )
}

export default LabelDetailPageNothing
