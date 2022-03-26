import React from 'react';
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./adminapp.css";
import Home from "./pages/home/home";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import UserList from "./pages/userList/UserList";

function AdminApp() {
    return(
        <>
        <Topbar/>
        <div className="container">
            <Sidebar/>
            <Routes>
                <Route path="/admin" element={<Home/>}/>
                <Route path="/product"/>
                <Route path="/category"/>
                <Route path="/brand"/>
                <Route path="/settings"/>
                <Route path="/users" element={<UserList/>}/>
            </Routes>
        </div>
        </>
        )
}
export default AdminApp;