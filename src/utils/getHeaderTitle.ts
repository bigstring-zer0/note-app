import Page from "models/page"

export default function getHeaderTitle(page: Page) {
    switch (page.path) {
        case "/":
            return "Keep"
        case "/notifications":
            return "Notifications"
        case "/archive":
            return "Archive"
        case "/delete":
            return "Trash"

        default:
            return page.name
    }
}
