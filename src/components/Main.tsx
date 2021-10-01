import React from 'react'
import './Main.css';
import CardList from './main/CardList';
import NavbarList from './main/NavbarList';


const Main = () => {
    return (
      <div className='main'>
        <div className='navbarList'>
          <NavbarList cardType='Library' />
        </div>
        <div className='content'>
          <CardList cardData='.44 Magnum' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
          <CardList cardData='419 Operation' cardType='Library' />
        </div>
      </div>
    );
}

export default Main
