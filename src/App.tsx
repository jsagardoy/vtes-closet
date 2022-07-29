import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './components/PrivateRoute';
import CryptContainer from './components/main/containers/CryptContainer';
import LibraryContainer from './components/main/containers/LibraryContainer';
import PublicMain from './components/main/components/main/PublicMain';
import PrivateMain from './components/main/components/main/PrivateMain';
import InventoryCryptContainer from './components/main/containers/InventoryCryptContainer';
import InventoryLibraryContainer from './components/main/containers/InventoryLibraryContainer';
import DecksContainer from './components/main/containers/DecksContainer';


function App() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [toogleSidebar, setToogleSidebar] = React.useState<boolean>(false);
  const history = useHistory();
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      history.push('/');
    }
  });


  const handleClickMenuIcon = () => setToogleSidebar(!toogleSidebar);

  useEffect(() => {}, []);

  return (
    <div className='app'>
      <div className='main__header'>
        <Header handleClickLogo={handleClickMenuIcon} />
      </div>
      <div className='mainApp'>
        <Sidebar toogle={toogleSidebar} handleToogle={handleClickMenuIcon} />
        <Switch>
          <Route exact path={'/'}>
            {isLogged && window.localStorage.getItem('auth') ? (
              <Redirect to='private' />
            ) : (
              <PublicMain toogle={toogleSidebar} />
            )}
          </Route>
          <Route exact path={'/crypt'}>
            <CryptContainer toogle={toogleSidebar} />
          </Route>
          <Route exact path={'/library'} component={LibraryContainer} />
          <PrivateRoute
            isLogged={isLogged}
            component={PrivateMain}
            exact
            path='/private'
          />
          {/* Decks */}
          <PrivateRoute
            isLogged={isLogged}
            component={DecksContainer}
            exact
            path='/private/:userId/decks'
          />
          {/* inventario */}

          <PrivateRoute
            isLogged={isLogged}
            component={InventoryCryptContainer}
            exact
            path='/private/:userId/inventory/crypt'
          />
          <PrivateRoute
            isLogged={isLogged}
            component={InventoryLibraryContainer}
            exact
            path='/private/:userId/inventory/library'
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
