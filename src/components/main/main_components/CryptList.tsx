import React from 'react';
import './CryptList.css';
import NavbarList from '../NavbarList';
import CryptCardList from '../CardList';
import { CryptType } from '../../../types/crypt_type';
import { getClans } from '../../../util';

const CryptList = () => {
  const cryptList: CryptType[] = require('../../../mock/cryptCards.json');
  const [list, setList] = React.useState<CryptType[]>(cryptList);

  const handleSearch = (name: string, discList: string[], clan: string) => {
    
    const resp = cryptList
      .filter((item) => item.name.toLowerCase().includes(name))
      .filter((item) => compareArrays(item.disciplines, discList))
      .filter(
        (item) =>
          clan !== '' ? (item.clans.filter((clanItem) => clanItem === clan).length > 0)
            :
          item.clans.map((clanItem)=>clanItem)
      );

    setList(resp);
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
        searchList={(name: string, discList: string[], clan: string) =>
          handleSearch(name, discList, clan)
        }
      />
      <CryptCardList cardType='Crypt' list={list} />
    </div>
  );
};

export default CryptList;
