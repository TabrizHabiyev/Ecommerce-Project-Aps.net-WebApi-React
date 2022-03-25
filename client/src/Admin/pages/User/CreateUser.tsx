import './createuser.css'
import React from 'react';
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupIcon from '@mui/icons-material/Group';
import {Link} from "react-router-dom";
function CreateUser() {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <PersonAddAltIcon className="createUserIcon"/>
                <h1 className="userTitle"> Create User</h1>
                <Link to="/admin/users">
                    <Button  variant="outlined" startIcon={<GroupIcon/>}>
                       User List
                    </Button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userCreate">
                            <div className="userCreateItem">
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
                                    <Button variant="contained">Create</Button>
                                </Grid>
                            </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;