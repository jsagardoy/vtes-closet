import React from 'react';
import { Avatar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import './Header.css';
import Login from './Login';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

const Header = () => {
  const defaultAvatarURL =
    'https://api-private.atlassian.com/users/1c084c56463bf985dcc9910ef9573fd1/avatar';
  const auth = getAuth();
  const [photoURL, setPhotoURL] = React.useState<string>(defaultAvatarURL);
  const [userName, setUserName] = React.useState<string>('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setPhotoURL(user.photoURL ? user.photoURL : defaultAvatarURL);
      setUserName(user.displayName ? user.displayName:'');
    } else {
      setPhotoURL(defaultAvatarURL);
      setUserName('');
    }
  });

  return (
    <div className='header'>
      <div className='header__left'>
        <Menu fontSize='large' style={{ fill: 'darkcyan' }} />
        <img
          src='https://sites.google.com/site/ausnzvteschampionship/_/rsrc/1361307183822/home/2013/Casino-Playing-Cards-icon%20VTESlogo.jpg?height=320&width=320'
          alt='logo'
        />
      </div>
      <div className='header__center'>
        <h3>Vtes Closet</h3>
      </div>
      <div className='header__right'>
        <Login />
        <div className='userInfo'>
          <Avatar id='avatar' variant='circular' alt='avatar' src={photoURL} />
          <h5>{ userName }</h5>
        </div>
      </div>
    </div>
  );
};

export default Header;
