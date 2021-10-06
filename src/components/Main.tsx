import React from 'react';
import './Main.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PrivateMain from './main/privateMain/PrivateMain';
import PublicMain from './main/privateMain/PublicMain';

const Main = () => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  });

  return (
    <div className='main'>
      <div className='private'>
        {/*  <div className='navbarList'>
            <NavbarList cardType='Library' />
          </div> */}
        <PrivateMain />
      </div>
      <div className='public'>
        <PublicMain />
      </div>
    </div>
  );
};

export default Main;
