import { Button, Typography } from '@mui/material';
import { useGoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import GoogleIcon from '@mui/icons-material/Google';


function GoogleLogoutHook() {

  const dispatch = useDispatch();

  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    dispatch(logout());
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <Button onClick={signOut}>
        <Typography textAlign="center">Logout</Typography>
    </Button>
  );
}

export default GoogleLogoutHook;