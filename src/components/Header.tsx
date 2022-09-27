import './Header.css';

import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Login from './Login';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import UserInfoMenu from './main/components/user/UserInfoMenu';
import { getUser, getUserId } from '../util';
import { signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
  paletteMode: string;
  handleClickLogo: () => void;
  handleColorMode: () => void;
}
const Header = (props: Props) => {
  const { handleClickLogo, paletteMode, handleColorMode } = props;
  const auth = getAuth();
  const [photoURL, setPhotoURL] = React.useState<string>(
    auth.currentUser?.photoURL ?? ''
  );
  const [userName, setUserName] = React.useState<string>('');
  const [openUserMenu, setOpenUserMenu] = React.useState<boolean>(false);
  const [showLogin, setShowLogin] = React.useState<boolean>(
    auth.currentUser === null ? true : false
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setOpenUserMenu(false);
    setAnchorEl(null);
  };

  const history = useHistory();

  const handleLogin = () => {
    setShowLogin((prev) => !prev);
  };
  const handleClickImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenUserMenu((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setOpenUserMenu(false);
      window.localStorage.removeItem('auth');
      history.push('/');
    } catch (error) {
      throw error;
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  });

  const handleGoProfile = () => {
    history.push(`/profile/${getUserId()}`);
    setOpenUserMenu(false);
  };

  React.useEffect(() => {
    const user = getUser();
    if (user) {
      setPhotoURL(user.photoURL);
      setUserName(user.displayName);
    }
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const picURL = user.photoURL ?? '';
          const displayName = user.displayName ?? '';
          setPhotoURL(picURL);
          setUserName(displayName);
        } else {
          setPhotoURL('');
          setUserName('');
        }
      });
    }
    return () => {
      setPhotoURL('');
      setUserName('');
    };
  }, [auth]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        m: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <MenuIcon fontSize='large' onClick={() => handleClickLogo()} />
        <img
          height='50vh'
          id='logo'
          src='https://sites.google.com/site/ausnzvteschampionship/_/rsrc/1361307183822/home/2013/Casino-Playing-Cards-icon%20VTESlogo.jpg?height=320&width=320'
          alt='logo'
        />
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => handleColorMode()}
          color='inherit'
        >
          {paletteMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Box>
        <Typography variant='h3'>Vtes Closet</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Login showLogin={showLogin} handleLogin={() => handleLogin()} />
        <Avatar id='avatar' variant='circular' alt='avatar' src={photoURL} />
        <Typography sx={{ marginLeft: '1rem' }} variant='body1'>
          {userName}
        </Typography>
        {showLogin ? null : (
          <IconButton
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleClickImage(event)
            }
          >
            <MoreVertIcon />
          </IconButton>
        )}
        <UserInfoMenu
          open={openUserMenu}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleGoProfile={handleGoProfile}
          handleLogout={() => handleLogout()}
        />
      </Box>
    </Box>
  );
};

export default Header;
