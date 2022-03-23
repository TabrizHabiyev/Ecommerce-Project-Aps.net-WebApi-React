import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {signOut} from "./accountSlice";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
            <Button onClick={handleClick}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                <Typography sx={{ minWidth: 100 }}> {user?.name} {user?.surname}</Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={()=>dispatch(signOut())}>Logout</MenuItem>
            </Menu>
        </>
    )

}