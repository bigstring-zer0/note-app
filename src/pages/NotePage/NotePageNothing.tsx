import React from "react"

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined"
import styles from "pages/styles/pagenothing.module.css"

const NotePageNothing = () => {
    return (
        <div className={styles.content_box}>
            <LightbulbOutlinedIcon
                style={{ width: "350px", height: "350px" }}
                className={styles.nothingIconMui}
            />
            <div className={styles.description}>
                추가한 메모가 여기에 표시됩니다.
            </div>
        </div>
    )
}

export default NotePageNothing
