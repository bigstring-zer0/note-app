import React from "react"
import PageType from "./pageType"

interface Page {
    id: string
    name: string
    path: string
    type: PageType
    // icon: React.ReactNode
}

export default Page
