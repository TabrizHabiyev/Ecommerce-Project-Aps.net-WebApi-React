import React from 'react';
import "./sidebar.css";
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from "react-router-dom";
import FeedIcon from '@mui/icons-material/Feed';
export default function  Sidebar() {
    return (

        <div className="sidebar">
           <div className="sidebarWrapper">
               <div className="sidebarMenu">
                       <h3 className="sidebarTitle">Dashboard</h3>
                   <ul className="sidebarList">
                       <li className="sidebarListItem active">
                           <Link to="/admin/home/">
                           <HomeIcon className="sidebarIcon"/>
                             Home
                           </Link>
                       </li>
                       <li className="sidebarListItem">
                           <Link to="/admin/orders/">
                           <HomeIcon className="sidebarIcon"/>
                             Orders
                           </Link>
                       </li>
                       <li className="sidebarListItem">
                           <Link to="/admin/Addblogs/">
                               <FeedIcon className="sidebarIcon"/>
                               Blogs
                           </Link>
                       </li>

                       <li className="sidebarListItem">
                           <Link to='/admin/categories/'>
                          <ViewListIcon className="sidebarIcon"/>
                           Category
                           </Link>
                       </li>

                       <li className="sidebarListItem">
                           <Link to='/admin/products/'>
                               <LocalMallIcon className="sidebarIcon"/>
                               Product
                           </Link>
                       </li>
                       <li className="sidebarListItem">
                           <MenuIcon className="sidebarIcon"/>
                           Coupons
                       </li>
                       <li className="sidebarListItem">
                           <Link to='/admin/users/'>
                          <GroupIcon className="sidebarIcon"/>
                           Users
                           </Link>
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