import React, { useState } from "react"

import "./App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import useMenuStore from "apps/menuStore"

import EditLabelModal from "modal/EditLabelModal/EditLabelModal"

import NoticePage from "pages/NoticePage/NoticePageNothing"

import MainSideBar from "containers/SideBar/MainSideBar"
import Header from "containers/Header/Header"
import useBarStore from "apps/sidebarStore"
import NotePage from "pages/NotePage/NotePage"
import AddLabelModal from "modal/AddLabelModal/AddLabelModal"
import LabelDetailPage from "pages/LabelPage/LabelDetailPage"
import ArchivePage from "pages/ArchivePage/ArchivePage"
import TrashPage from "pages/TrashPage.tsx/TrashPage"

function App() {
    const { isBarOpen } = useBarStore()

    return (
        <BrowserRouter>
            <Header />
            <hr />
            <div
                className="app-container"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                }}
            >
                <div
                    className="sidebar"
                    style={{
                        width: isBarOpen ? "50px" : "250px",
                        transition: "width 0.3s",
                    }}
                >
                    <MainSideBar />
                </div>
                <div
                    className="main-content"
                    style={{
                        flexGrow: 1,
                        transition: "margin-left 0.3s",
                    }}
                >
                    <EditLabelModal />
                    <AddLabelModal />
                    <Routes>
                        <Route path="/" element={<NotePage />} />
                        <Route path="/notifications" element={<NoticePage />} />
                        <Route path="/archive" element={<ArchivePage />} />
                        <Route path="/delete" element={<TrashPage />} />
                        <Route path="/label" element={<LabelDetailPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
