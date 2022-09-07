import React from 'react';
import socialMediaAuth from '../service/auth';
import { /* facebookProvider ,*/ googleProvider } from '../config/authMethods';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const Login = () => {
  let history = useHistory();
  const auth = getAuth();
  const [showLogout, setShowLogout] = React.useState<boolean>(
    auth.currentUser !== null
  );

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setShowLogout(true);
    } else {
      setShowLogout(false);
    }
  });

  const handleProvider = async (provider: string) => {
    const res = await socialMediaAuth(googleProvider);
    res !== null ? setShowLogout(true) : setShowLogout(false);
    if (res && auth) {
      window.localStorage.setItem('auth', JSON.stringify(res));
      history.push('/private');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowLogout(false);
    window.localStorage.removeItem('auth');
    history.push('/');
  };
  return (
    <Box className='login'>
      <Button
        id='loginId'
        style={{ display: showLogout ? 'none' : 'inline' }}
        onClick={() => handleProvider('google')}
      >
        Login
      </Button>
      <Button
        id='logoutId'
        disabled={!showLogout}
        style={{ display: !showLogout ? 'none' : 'inline' }}
        onClick={() => handleLogout()} //handle logout
      >
        Logout
      </Button>
    </Box>
  );
};

export default Login;
