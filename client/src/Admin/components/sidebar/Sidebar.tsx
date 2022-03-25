import React from 'react';
import "./sidebar.css";
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from "react-router-dom";
import AdminApp from "../../AdminApp";
export default function  Sidebar() {
    return (
        <div  className="sidebar">
           <div className="sidebarWrapper">
               <div className="sidebarMenu">
                       <h3 className="sidebarTitle">Dashboard</h3>
                   <ul className="sidebarList">
                       <li className="sidebarListItem active">
                           <HomeIcon className="sidebarIcon"/>
                           Home
                       </li>
                       <li className="sidebarListItem">
                           <HomeIcon className="sidebarIcon"/>
                           Orders
                       </li>

                       <li className="sidebarListItem">
                          <ViewListIcon className="sidebarIcon"/>
                           Category
                       </li>

                       <li className="sidebarListItem">
                          <LocalMallIcon className="sidebarIcon"/>
                           Product
                       </li>
                       <li className="sidebarListItem">
                           <MenuIcon className="sidebarIcon"/>
                           Brand
                       </li>
                       <li className="sidebarListItem">
                           <MenuIcon className="sidebarIcon"/>
                           Coupons
                       </li>
                       <li className="sidebarListItem">
                          <GroupIcon className="sidebarIcon"/>
                           Users
                       </li>
                       <li className="sidebarListItem">
                           <SettingsIcon className="sidebarIcon"/>
                           Settings
                       </li>
                   </ul>
               </div>
           </div>
        </div>
    );
}