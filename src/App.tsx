import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicMain from './components/main/main_components/PublicMain';
import PrivateMain from './components/main/main_components/PrivateMain';
function App() {
  return (
    <div className='App'>
      {/*  <Login /> */}
      <Header />
      <div className='main'>
        <Sidebar />
        <Router>
          <Switch>
            <Route exact path={'/'}>
              <PublicMain />
            </Route>
            <Route exact path={'/private'}>
              <PrivateMain />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
