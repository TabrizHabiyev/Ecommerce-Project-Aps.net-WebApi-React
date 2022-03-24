import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Paper} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import {useAppDispatch} from "../../store/configureStore";
import {signInUser} from "./accountSlice";
import Avatar from "@mui/material/Avatar";
import {message} from "antd";

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid}} = useForm({});
    
  async function submitForm(data:FieldValues) {
      await dispatch(signInUser(data));
       if (!errors)
           navigate('/')
  }
    return (
        <ThemeProvider theme={theme}>
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
                       Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            {...register('email',{required:'Email is required'})}
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            type="password"
                            {...register('password',{required:'Username is required'})}
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to='/forgotpassword'>
                                    {"Forgot password?"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link  to='/register'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}