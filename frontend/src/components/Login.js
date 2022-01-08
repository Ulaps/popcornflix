import { Alert, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser, setEmail, setRegister } from '../redux/userSlice';
import { useState } from 'react';
import GoogleLoginHook from './GoogleLoginHook';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = () => {

    document.title = 'PopcornFlix';

    const { isLoading, email, errors } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    
        const [values, setValues] = useState({
          password: '',
          showPassword: false,
        });
      
        const handleChange = (prop) => (event) => {
          setValues({ ...values, [prop]: event.target.value });
        };
      
        const handleClickShowPassword = () => {
          setValues({
            ...values,
            showPassword: !values.showPassword,
          });
        };

    const handleSignIn = (e) => {
        e.preventDefault();

        if(!email.length >= 1) return setError("Please Enter Email Address")
        if(!/.+@.+\.[A-Za-z]+$/.test(email)) return setError("Please Enter a VALID EMAIL ADDRESS")

        dispatch(loginUser({email:email}))
    }

    return (
    <>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{p:2}}
        >
            { isLoading &&
                // <Backdrop sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1000 }} open={true}>
                    <CircularProgress color="inherit" />
                // </Backdrop> 
            }

            { error &&
                <Alert severity="error" sx={{m:1}}>{error}</Alert>
            }

            { errors &&
                <Alert severity="error" sx={{m:1}}>{errors.errMessage}</Alert>
            }
        <Grid item>
            <TextField id="email" sx={{ m: 1 }} label="Email" variant="standard" fullWidth value={email} onChange={(e) => { setError(''); dispatch(clearError()); dispatch(setEmail(e.target.value));}} />
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        />
                        </FormControl>
                        <Button variant="outlined" color="primary" fullWidth sx={{mt:2,mb:2}} onClick={handleSignIn}>Log In</Button>
                        </Grid>
                        OR
                        <Grid item sx={{mt:2}}>
                            <GoogleLoginHook />
                            </Grid>
                            </Grid>
                            <Button onClick={() => { dispatch(setRegister(true)) }} size="small">
                                <Typography variant="subtitle1" sx={{display:'flex', justifyContent:'flex-end', textDecoration:'underline'}}>No Account? Register Now</Typography>
                                </Button>
                                </>
    );
}
 
export default LoginForm;