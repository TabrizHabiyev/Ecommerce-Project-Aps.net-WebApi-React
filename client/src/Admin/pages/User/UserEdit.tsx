import "./useredit.css";
import React from 'react';
import {Button} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {CalendarToday, LocationSearching, MailOutline, PhoneAndroid} from "@mui/icons-material";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import {Link} from "react-router-dom";

function UserEdit() {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/admin/newUser">
                    <Button  variant="outlined" startIcon={<PersonAddAltIcon/>}>
                        Create User
                    </Button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="https://source.unsplash.com/random/200x200?sig=1" alt="" className="userShowImg"/>
                    </div>
                    <div className="userShowTopTitle">
                        <span className="userUsername">Tabriz Habiyev</span>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PersonOutlineIcon className="userShowIcon"/>
                            <span className="userShowInfoTitle">tabriz321</span>
                        </div>
                        <div className="userShowInfo">
                         <CalendarToday className="userShowIcon"/>
                        <span className="userShowInfoTitle">04.01.1996</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon"/>
                            <span className="userShowInfoTitle">+994 50 555 55 55</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon"/>
                            <span className="userShowInfoTitle">tabriz@gmail.com</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon"/>
                            <span className="userShowInfoTitle">Baku</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                     <span className="userUpdateTitle">Edit</span>
                     <form className="userUpdateForm">
                         <div className="userUpdateLeft">
                             <div className="userUpdateItem">
                                 <Grid container spacing={3}>
                                     <Grid item xs={12} sm={6}>
                                         <TextField
                                             required
                                             id="firstName"
                                             name="firstName"
                                             label="First name"
                                             fullWidth
                                             autoComplete="given-name"
                                             variant="standard"
                                         />
                                     </Grid>
                                     <Grid item xs={12} sm={6}>
                                         <TextField
                                             required
                                             id="lastName"
                                             name="lastName"
                                             label="Last name"
                                             fullWidth
                                             autoComplete="family-name"
                                             variant="standard"
                                         />
                                     </Grid>
                                     <Grid item xs={12} sm={6}>
                                         <TextField
                                             required
                                             id="email"
                                             name="email"
                                             label="Email"
                                             fullWidth
                                             autoComplete="Email Adres"
                                             variant="standard"
                                         />
                                     </Grid>
                                     <Grid item xs={12} sm={6}>
                                         <TextField
                                             id="username"
                                             name="username"
                                             label="Username"
                                             fullWidth
                                             autoComplete="User Name"
                                             variant="standard"
                                         />
                                     </Grid>
                                     <Grid item xs={12}>
                                         <FormControl sx={{ minWidth: 120,mt: 2 }}>
                                             <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
                                             <Select
                                                 id="demo-controlled-open-select"
                                                 label="Gender"
                                             >
                                                 <MenuItem value="Male">Male</MenuItem>
                                                 <MenuItem value="Female">Female</MenuItem>
                                             </Select>
                                         </FormControl>
                                     </Grid>
                                     <Grid item xs={12} sm={6}>
                                         <TextField
                                             id="state"
                                             name="state"
                                             label="State/Province/Region"
                                             fullWidth
                                             variant="standard"
                                         />
                                     </Grid>
                                     <Grid item xs={12} sm={6}>
                                         <TextField
                                             required
                                             id="zip"
                                             name="zip"
                                             label="Zip / Postal code"
                                             fullWidth
                                             autoComplete="shipping postal-code"
                                             variant="standard"
                                         />
                                     </Grid>
                                     <Grid item xs={12} sm={6}>
                                         <TextField
                                             required
                                             id="country"
                                             name="country"
                                             label="Country"
                                             fullWidth
                                             autoComplete="shipping country"
                                             variant="standard"
                                         />
                                     </Grid>
                                 </Grid>
                                 <Grid item xs={12} sx={{mt:10}}>
                                     <Button variant="contained">Update</Button>
                                 </Grid>
                             </div>
                         </div>
                         <div className="userUpdateRight"></div>
                     </form>
                </div>
            </div>
        </div>
    );
}

export default UserEdit;