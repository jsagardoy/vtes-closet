import { Button } from '@material-ui/core';
import React from 'react';
import socialMediaAuth from '../service/auth';
import { /* facebookProvider ,*/ googleProvider } from '../config/authMethods';
import { getAuth,signOut } from '@firebase/auth';
import './Login.css';

const Login = () => {
  const auth = getAuth();
  const [isHidden, setIsHidden] = React.useState<boolean>(true);
  const [showLogout, setShowLogout] = React.useState<boolean>(auth.currentUser!==null);
  const handleProvider = async (provider: string) => {
    //const newProvider = provider === 'google' ? googleProvider : facebookProvider;
    const res = await socialMediaAuth(googleProvider);
    console.log(res);
    setIsHidden(true);
    res !== null ? setShowLogout(true) : setShowLogout(false);
  };

  const handleOnClick = (value: boolean) => {
    setIsHidden(!value);
  };
  const handleLogout = () => {
    signOut(auth);
    console.log('bye!', auth);
    setShowLogout(false);
  }
  return (
    <div className='login'>
      <Button
        id='loginId'
        style={{ color: 'darkcyan', display: showLogout ? 'none' : 'inline' }}
        onClick={() => handleOnClick(isHidden)}
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
      <div id='providers' hidden={isHidden}>
        <Button
          style={{ color: 'darkcyan' }}
          onClick={() => handleProvider('google')}
        >
          Google
        </Button>

        {/*  <Button
          style={{ color: 'darkcyan' }}
          onClick={() => handleProvider('facebook')}
        >
          Facebook
        </Button> */}
      </div>
    </div>
  );
};

export default Login;
