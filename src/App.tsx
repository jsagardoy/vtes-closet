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
import { getCrypt } from './util/helpFunction';
import { CryptType } from './types/crypt_type';

function App() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [toogleSidebar, setToogleSidebar] = React.useState<boolean>(true);
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
      localStorage.clear();
      getCrypt().then((elem: CryptType[]) =>
        localStorage.setItem('cryptList', JSON.stringify(elem))
      );
    }
  }, []);


  return (
    <div className='App'>
      {/*  <Login /> */}
      <div className='main__header'>
        <Header handleClickLogo={handleClickLogo} />
      </div>
      <div className='mainApp'>
        <Router>
          <Sidebar toogle={toogleSidebar}/>
          <Switch>
            <Route exact path={'/'} component={PublicMain} />
            <Route exact path={'/home'} component={PublicMain} />
            <Route exact path={'/crypt'} component={CryptContainer} />
            <Route exact path={'/library'} component={LibraryContainer} />
            <PrivateRoute
              isLogged={isLogged}
              component={PrivateMain}
              exact
              path='/private'
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
