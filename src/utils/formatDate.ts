export default function formatDate(date: Date) {
    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }

    const dateString = date.toLocaleString("en-US", dateOptions)
    const timeString = date.toLocaleString("en-US", timeOptions)

    return `${dateString} ${timeString}`
}
