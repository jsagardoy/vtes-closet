import { Button } from '@material-ui/core';
import React from 'react';
import socialMediaAuth from '../service/auth';
import {facebookProvider,googleProvider } from '../config/authMethods';
import './Login.css';

const Login = () => {
    const [isHidden, setIsHidden] = React.useState<boolean>(true);

  const handleProvider = async (provider: string) => {
    const newProvider = provider === 'google' ? googleProvider : facebookProvider;
        const res = await socialMediaAuth(newProvider);
        console.log(res);
  };

    const handleOnClick = (value: boolean) => {
        setIsHidden(!value);
  };
  return (
    <div className='login'>
      <Button
        id='loginId'
        style={{ color: 'darkcyan' }}
        onClick={() => handleOnClick(isHidden)}
      >
        Login
          </Button>
      <Button
        id='logoutId'
        style={{ color: 'darkcyan' }}
        onClick={() => console.log('adios')}//handle logout
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

        <Button
          style={{ color: 'darkcyan' }}
          onClick={() => handleProvider('facebook')}
        >
          Facebook
        </Button>
      </div>
    </div>
  );
};

export default Login;
