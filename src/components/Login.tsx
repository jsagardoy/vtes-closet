import { Button } from '@material-ui/core';
import React from 'react';
import socialMediaAuth from '../service/auth';
import { /* facebookProvider ,*/ googleProvider } from '../config/authMethods';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import './Login.css';

const Login = () => {
  const auth = getAuth();
  const [showLogout, setShowLogout] = React.useState<boolean>(
    auth.currentUser !== null
  );

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setShowLogout(true);
    }
  });

  const handleProvider = async (provider: string) => {
    const res = await socialMediaAuth(googleProvider);
    res !== null ? setShowLogout(true) : setShowLogout(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert(`You have been logged out successfully`);
    setShowLogout(false);
  };
  return (
    <div className='login'>
      <Button
        id='loginId'
        style={{ color: 'darkcyan', display: showLogout ? 'none' : 'inline' }}
        onClick={() => handleProvider('google')}
      >
        Login
      </Button>
      <Button
        id='logoutId'
        disabled={!showLogout}
        style={{ color: 'darkcyan', display: !showLogout ? 'none' : 'inline' }}
        onClick={() => handleLogout()} //handle logout
      >
        Logout
      </Button>
      {/*      <div id='providers' hidden={isHidden}>
        <Button
          style={{ color: 'darkcyan' }}
          onClick={() => handleProvider('google')}
        >
          Google
        </Button> */}

      {/*  <Button
          style={{ color: 'darkcyan' }}
          onClick={() => handleProvider('facebook')}
        >
          Facebook
        </Button> 
      </div>*/}
    </div>
  );
};

export default Login;
