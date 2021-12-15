import { useGoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { googleLogin, setOnGoogle } from '../redux/userSlice';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

function GoogleLoginHook() {

  const dispatch = useDispatch(state => state.user);

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    localStorage.setItem('googleId',res.profileObj.googleId);
    dispatch(googleLogin(res.profileObj));
    dispatch(setOnGoogle(true));
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <Button onClick={signIn} variant="outlined">
      <GoogleIcon/>Google sign in
    </Button>
  );
}

export default GoogleLoginHook;