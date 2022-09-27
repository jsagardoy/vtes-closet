import { Button } from '@mui/material';

import { useEffect } from 'react';
import { getAuth } from '@firebase/auth';
import { googleProvider } from '../config/authMethods';
import socialMediaAuth from '../service/auth';
import { useHistory } from 'react-router-dom';

interface Props {
  showLogin: boolean;
  handleLogin: (value: boolean) => void;
}

const Login = (props: Props) => {
  const { showLogin, handleLogin } = props;
  let history = useHistory();
  const auth = getAuth();
  

  const handleProvider = async (provider: string) => {
    try {
      const res = await socialMediaAuth(googleProvider);
      res !== null ? handleLogin(false) : handleLogin(true);
      if (res && auth) {
        window.localStorage.setItem('auth', JSON.stringify(res));
        history.push('/private');
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
  }, []);

  return showLogin ? (
    <Button sx ={{display:'flex'}} id='loginId' onClick={() => handleProvider('google')}>
      Login
    </Button>
  ) : null;
};

export default Login;
