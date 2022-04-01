import React from 'react';
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./adminapp.css";
import UserList from "./pages/User/UserList";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home";
import UserEdit from "./pages/User/UserEdit";
import CreateUser from "./pages/User/CreateUser";
import CategoryList from "./pages/category/CategoryList";

function AdminApp() {
    return(
        <>
        <Topbar/>
        <div className="container">
            <Sidebar/>
            <Routes>


                // Default path Home
                <Route path='/admin/' element={<Home/>}/>
                // Home path son

                //For users route
                <Route path='/admin/users' element={<UserList/>}/>
                <Route path='/admin/user/:userId' element={<UserEdit/>}/>
                <Route path="/admin/newUser" element={<CreateUser/>}/>
                // Users route son

                // Category route
                <Route path="/admin/categories" element={<CategoryList/>}/>
                //Categry route son
            </Routes>
        </div>
        </>
        )
}
export default AdminApp;