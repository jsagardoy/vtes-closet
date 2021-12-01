import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicMain from './components/main/components/PublicMain';
import PrivateMain from './components/main/components/PrivateMain';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './components/PrivateRoute';
import CryptContainer from './components/main/containers/CryptContainer';
import LibraryContainer from './components/main/containers/LibraryContainer';

function App() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = React.useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });

  useEffect(() => {}, []);

  return (
    <div className='App'>
      {/*  <Login /> */}
      <div className='main__header'>

      <Header />
      </div>
      <div className='mainApp'>
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path={'/'} component={PublicMain} />
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
