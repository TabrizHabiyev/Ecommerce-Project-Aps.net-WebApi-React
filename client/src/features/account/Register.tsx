import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Paper} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import agent from "../../App/api/agent";
import {useForm} from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {toast} from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import {useState} from "react";
import Avatar from '@mui/material/Avatar';

export default function Register() {
    const [loading,setLoading] = useState(false);
  function Loading(){
      setLoading(true);
  }
    const navigate = useNavigate();
    const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid}} = useForm({mode:'all'});
    function handleApiErrors(errors:any){
      if (errors){
          errors.forEach((error:string) => {
             if (error.includes('Password')){
                 setError('password',{message: error})
             }else if (error.includes('Email')){
                 setError('email',{message: error})
             }else if (error.includes('Gender')){
                 setError('gender',{message: error})
             }
          });
      }
    }
    return (
            <Container component={Paper} maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom:8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h3" variant="h5">
                    Register
                </Typography>
                <Box component="form"
                onSubmit={handleSubmit(
                    (data) =>
                        agent.Account.register(data).then(()=>{
                            Loading();
                            toast.success('Registration successful - you can now login');
                            navigate('/login');
                        }).catch(error => handleApiErrors(error)
                        ))}
                     noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        {...register('email',{
                         required:'Email is required',
                         pattern:{
                             value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                             message: 'Not a valid email address'
                         }
                        })}
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password',{
                            required:'Password is required',
                            pattern:{
                                value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                message: 'Password does not meet complexity requirements'
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        {...register('confirmpassword',{required:'Username is required'})}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    />

                    <FormControl sx={{ minWidth: 120,mt: 2 }}>
                        <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
                        <Select
                            id="demo-controlled-open-select"
                            label="Gender"
                            {...register('gender',{required:'Username is required'})}
                            error={!!errors.gender}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl><br/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2,p:2,width:160}}
                    >
                        {loading && <CircularProgress color="success" size={20} />}
                        {!loading && 'Register'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link  to='/login'>
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
    );
}