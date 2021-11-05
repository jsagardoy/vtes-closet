import React from 'react';
import './CryptList.css';
import NavbarList from '../NavbarList';
import CryptCardList from '../CardList';
import { CryptType } from '../../../types/crypt_type';

const CryptList = () => {
  const cryptList: CryptType[] = require('../../../mock/cryptCards.json');
  const [list, setList] = React.useState<CryptType[]>(cryptList);

  const handleSearch = (
    name: string,
    discList: string[],
    clan: string,
    sect: string,
    title: string
  ) => {
    const resp = cryptList
      .filter((item) => item.name.toLowerCase().includes(name))
      .filter((item) => compareArrays(item.disciplines, discList))
      .filter((item) =>
        clan !== ''
          ? item.clans.filter((clanItem) => clanItem === clan).length > 0
          : item.clans.map((clanItem) => clanItem)
      )
      .filter((item) => findInText(item, sect))
      .filter((item) => findInText(item, title));
    
    setList(resp);
  };

  const findInText = (crypt: CryptType, text: string) => {
    let aux = null;
    if (text !== '') {
      if (crypt.card_text.indexOf(text) !== -1) {
        aux=crypt;
      } 
    } else {
      aux=crypt;
    }
    return aux;
  };

  const compareArrays = (
    disciplines: string[],
    discList: string[]
  ): boolean => {
    const res = disciplines.map((elem) =>
      discList.find((item) =>
        item.toUpperCase() === item
          ? item === elem
          : item === elem || item === elem.toLowerCase()
      )
    );
    const aux = res.map((elem) => elem !== undefined);

    return aux.filter((item) => item === true).length === discList.length;
  };

  React.useEffect(() => {}, []);
  return (
    <div className='crypt__list'>
      <NavbarList
        cardType='Crypt'
        list={list}
        searchList={(
          name: string,
          discList: string[],
          clan: string,
          sect: string,
          title: string
        ) => handleSearch(name, discList, clan, sect, title)}
      />
      <CryptCardList cardType='Crypt' list={list} />
    </div>
  );
};

export default CryptList;
