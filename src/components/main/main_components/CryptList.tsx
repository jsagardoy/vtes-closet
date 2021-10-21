import React from 'react'
import './CryptList.css';
import NavbarList from '../NavbarList';
import CardList from '../CardList';
//import * as list from '../../../mock/cryptCards.json';
import { CryptType } from '../../../types/crypt_type';

const CryptList = () => {
    const crytlist:[CryptType] = require('../../../mock/cryptCards.json');
    return (
      <div className='crypt__list'>
            <NavbarList cardType='Crypt' />
            <CardList cardType='Crypt' list={crytlist}/>
      </div>
    );
}

export default CryptList
