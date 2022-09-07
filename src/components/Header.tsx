import React from 'react';
import './Header.css';
import Login from './Login';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { Avatar, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getUser } from '../util';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface Props {
  paletteMode: string;
  handleClickLogo: () => void;
  handleColorMode: () => void;
}
const Header = (props: Props) => {
  const { handleClickLogo,paletteMode,handleColorMode } = props;
  const auth = getAuth();
  const [photoURL, setPhotoURL] = React.useState<string>(auth.currentUser?.photoURL||'');
  const [userName, setUserName] = React.useState<string>('');

 
  React.useEffect(() => {
    
    const user = getUser();
    if (user) {
      setPhotoURL(user.photoURL);
      setUserName(user.displayName);
    }
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const picURL = user.photoURL ? user.photoURL:'';
          const displayName = user.displayName ? user.displayName:'';
          setPhotoURL(picURL);
          setUserName(displayName);
        } else {
          setPhotoURL('');
          setUserName('');
        }
      });
    }

    
  }, [auth]);

    
  return (
    <Box className='header'>
      <Box className='header__left'>
        <MenuIcon fontSize='large' onClick={() => handleClickLogo()} />
        <img
          className='logoWeb'
          src='https://sites.google.com/site/ausnzvteschampionship/_/rsrc/1361307183822/home/2013/Casino-Playing-Cards-icon%20VTESlogo.jpg?height=320&width=320'
          alt='logo'
        />
      <IconButton
        sx={{ ml: 1 }}
        onClick={()=>handleColorMode()}
        color='inherit'
      >
        {paletteMode=== 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton></Box>
      <Box className='header__center'>
        <h3 className='siteName'>Vtes Closet</h3>
      </Box>
      <Box className='header__right'>
        <Login />
        <Box className='userInfo'>
          <Avatar id='avatar' variant='circular' alt='avatar' src={photoURL} />
          <h5 className='userName'>{userName}</h5>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
