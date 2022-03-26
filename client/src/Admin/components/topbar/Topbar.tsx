import React from 'react';
import "./topbar.css";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';

function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWraper">
                <div className="topLeft">
                    <span className="logo">Admin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsIcon/>
                        <span className="topIconBadge">2</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;