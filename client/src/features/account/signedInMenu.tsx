import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {signOut} from "./accountSlice";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {clearBasket} from "../basket/basketSlice";
import {Link} from "react-router-dom";
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
                <Typography sx={{ minWidth: 100 }}> Tabriz Ad qoy bura</Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <Link to="/profile">
                <MenuItem>My account</MenuItem>
                </Link>
                <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearBasket());
                }}>Logout</MenuItem>
            </Menu>
        </>
    )

}