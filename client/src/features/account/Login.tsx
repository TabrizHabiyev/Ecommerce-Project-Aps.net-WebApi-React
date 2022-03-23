import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Paper} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import agent from "../../App/api/agent";
import {FieldValues, useForm} from "react-hook-form";
import {useAppDispatch} from "../../store/configureStore";
import {signInUser} from "./accountSlice";

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {register,handleSubmit,formState:{isSubmitting,errors,isValid}} = useForm({
        
    });
    
  async function submitForm(data:FieldValues) {
      await dispatch(signInUser(data))
      navigate('/')
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component={Paper} maxWidth="sm">
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            {...register('email',{required:'Username is required'})}
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
            </Container>
        </ThemeProvider>
    );
}