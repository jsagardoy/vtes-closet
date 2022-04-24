import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './components/PrivateRoute';
import CryptContainer from './components/main/containers/CryptContainer';
import LibraryContainer from './components/main/containers/LibraryContainer';
import PublicMain from './components/main/components/main/PublicMain';
import PrivateMain from './components/main/components/main/PrivateMain';

function App() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [toogleSidebar, setToogleSidebar] = React.useState<boolean>(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });

  const handleClickMenuIcon = () => setToogleSidebar(!toogleSidebar);

  useEffect(() => {
  }, []);

  return (
    <Router>
      <div className='app'>
        <div className='main__header'>
          <Header handleClickLogo={handleClickMenuIcon} />
        </div>
        <div className='mainApp'>
          <Sidebar toogle={toogleSidebar} handleToogle={handleClickMenuIcon} />
          <Switch>
            <Route exact path={'/'}>
              {isLogged && window.sessionStorage.getItem('auth') ? (
                <Redirect to='private'/>
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
