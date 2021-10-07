import React, {useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PublicMain from './components/main/main_components/PublicMain';
import PrivateMain from './components/main/main_components/PrivateMain';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = React.useState(false);
  onAuthStateChanged(auth, (user) => {
    console.log('cuando cambio ' + user);
    if (user) {
      console.log('entro');
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });
  
  useEffect(() => {
    
  },[]);
 
  return (
    <div className='App'>
      {/*  <Login /> */}
      <Header />
      <div className='main'>
        <Sidebar />
        <Router>
          <Switch>
            <Route exact path={'/'} component={PublicMain} />
            <PrivateRoute isLogged={isLogged} component={PrivateMain} exact path='/private' />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
