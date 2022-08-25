import React from 'react';
import './Header.css';
import Login from './Login';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getUser } from '../util';

interface Props {
  handleClickLogo:() => void;
}
const Header = (props: Props) => {
  const { handleClickLogo } = props;
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
