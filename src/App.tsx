import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './components/PrivateRoute';
import CryptContainer from './components/main/containers/CryptContainer';
import LibraryContainer from './components/main/containers/LibraryContainer';
import PublicMain from './components/main/components/main/PublicMain';
import PrivateMain from './components/main/components/main/PrivateMain';
import { getCrypt, getLibrary } from './util/helpFunction';
import { Spinner } from './components/main/components/global/Spinner';

function App() {
  const auth = getAuth();
  const [loader, setLoader] = React.useState<boolean>(false);
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [toogleSidebar, setToogleSidebar] = React.useState<boolean>(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });

  const handleClickLogo = () => setToogleSidebar(!toogleSidebar);

  useEffect(() => {
    if (
      localStorage.getItem('cryptList') === null ||
      localStorage.getItem('cryptList')?.length === 0
    ) {
      setLoader(true);
      getCrypt();
      setLoader(false);
    }
    if (
      localStorage.getItem('libraryList') === null ||
      localStorage.getItem('libraryList')?.length === 0
    ) {
      setLoader(true);
      getLibrary();
      setLoader(false);
    }
  }, []);

  return (
    <Router>
      <div className='App'>
        {/*  <Login /> */}
        <div className='main__header'>
          <Header handleClickLogo={handleClickLogo} />
        </div>
        <div className='mainApp'>
          <Sidebar toogle={toogleSidebar} />
          {loader && <Spinner />}
          <Switch>
            <Route exact path={'/'} >
              <PublicMain toogle={toogleSidebar} />
              </Route>
            <Route exact path={'/crypt'} >
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
