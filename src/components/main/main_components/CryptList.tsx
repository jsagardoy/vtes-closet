import React from 'react';
import './CryptList.css';
import NavbarList from '../NavbarList';
import CryptCardList from '../CardList';
import { CryptType } from '../../../types/crypt_type';

const CryptList = () => {
  const cryptList: CryptType[] = require('../../../mock/cryptCards.json');
  const [list, setList] = React.useState<CryptType[]>(cryptList);

  const handleSearch = (condition: string) => {
    setList(
      cryptList.filter((item) =>
        item.name.toLocaleLowerCase().includes(condition)
      )
    );
  };

  React.useEffect(() => {}, []);
  return (
    <div className='crypt__list'>
      <NavbarList
        cardType='Crypt'
        list={list}
        searchList={(condition) => handleSearch(condition)}
      />
      <CryptCardList cardType='Crypt' list={list} />
    </div>
  );
};

export default CryptList;
