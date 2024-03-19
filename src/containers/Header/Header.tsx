import React from "react"
import { IconButton } from "@mui/material"
import useBarStore from "apps/sidebarStore"
import styles from "./header.module.css"

import getHeaderTitle from "utils/getHeaderTitle"

const Header = () => {
    const { toggleMouseBar, toggleBar, currentPage } = useBarStore()

    return (
        <div className={styles.navi}>
            <div className={styles.sub_group}>
                <IconButton
                    aria-label="cart"
                    size="large"
                    color="inherit"
                    onClick={() => {
                        toggleBar()
                        toggleMouseBar()
                    }}
                >
                    <span className="material-symbols-outlined">menu</span>
                </IconButton>
                <div className={styles.title_box}>
                    <h1 className={styles.title_text}>
                        {getHeaderTitle(currentPage)}
                    </h1>
                </div>
            </div>
            <div className={styles.sort_button}>
                <IconButton onClick={() => {}}>
                    <span className="material-symbols-outlined">sort</span>
                </IconButton>
            </div>
        </div>
    )
}

export default Header
