import PageType from "models/pageType"

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined"

export default function getIconComponent(iconName: string): React.ReactNode {
    switch (iconName) {
        case PageType.NOTES:
            return <LightbulbOutlinedIcon />
        case PageType.NOTICE:
            return (
                <span className={`material-symbols-outlined`}>
                    notifications
                </span>
            )
        case PageType.ARCHIVE:
            return <span className={`material-symbols-outlined`}>archive</span>
        case PageType.EDIT:
            return <span className={`material-symbols-outlined`}>edit</span>
        case PageType.TRASH:
            return <span className={`material-symbols-outlined`}>delete</span>
        default:
            return <span className={`material-symbols-outlined`}>label</span>
    }
}
