import React from 'react';
import './Header.css';
import Login from './Login';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getLogo } from '../util/helpFunction';
import { Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  handleClickLogo:() => void;
}
const Header = (props: Props) => {
  const { handleClickLogo } = props;

  const defaultAvatarURL = getLogo();
  const auth = getAuth();
  const [photoURL, setPhotoURL] = React.useState<string>(defaultAvatarURL);
  const [userName, setUserName] = React.useState<string>('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setPhotoURL(user.photoURL ? user.photoURL : defaultAvatarURL);
      setUserName(user.displayName ? user.displayName : '');
    } else {
      setPhotoURL(defaultAvatarURL);
      setUserName('');
    }
  });

  return (
    <div className='header'>
      <div className='header__left'>
        <MenuIcon
          fontSize='large'
          sx={{ fill: 'darkcyan' }}
          onClick={() => handleClickLogo()}
        />
        <img
          className='logoWeb'
          src='https://sites.google.com/site/ausnzvteschampionship/_/rsrc/1361307183822/home/2013/Casino-Playing-Cards-icon%20VTESlogo.jpg?height=320&width=320'
          alt='logo'
        />
      </div>
      <div className='header__center'>
        <h3 className='siteName'>Vtes Closet</h3>
      </div>
      <div className='header__right'>
        <Login />
        <div className='userInfo'>
          <Avatar id='avatar' variant='circular' alt='avatar' src={photoURL} />
          <h5 className='userName'>{userName}</h5>
        </div>
      </div>
    </div>
  );
};

export default Header;
