import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className='App'>
     {/*  <Login /> */}
      <Header />
      <div className='app_central'>
        <Sidebar />
        <Main /> 
      </div>
    </div>
  );
}

export default App;
