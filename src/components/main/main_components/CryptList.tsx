import React from 'react';
import './CryptList.css';
import NavbarList from '../NavbarList';
import CryptCardList from '../CardList';
import { CryptType, PropType } from '../../../types/crypt_type';
import { getTitle } from '../../../util';

const CryptList = () => {
  const cryptList: CryptType[] = require('../../../mock/cryptCards.json');
  const [list, setList] = React.useState<CryptType[]>(cryptList);

  const handleSearch = (
    name: string,
    discList: string[],
    clan: string,
    sect: string,
    title: string,
    props: PropType
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
      .filter((item) => findInText(item, title))
      .filter((item) => filterProps(item, props))
      ;

    setList(resp);
  };

  const filterProps = (crypt: CryptType, props: any) => {
    const elements: string[] = Object.keys(props).filter((elem: string) =>
      props[elem] === true 
    );
    return (elements.every((elem) => findInText(crypt, elem)));
  };

  const findInText = (crypt: CryptType, text: string) => {
    let aux = null;
    let textFixed = text;
    if (text !== '') {
      
      if (text === 'red_list' || 'enter_combat' || 'black_hand') {
        textFixed = text.replace('_', ' ');
      }
      if (text === 'No Title') {
        //in case filter is no title
        const temp = getTitle().map((title) => crypt.card_text.indexOf(title));
        aux = temp.every((elem) => elem === -1) ? crypt : null;
      }
      if (text === 'Titled') {
        //in case filter is no title
        const temp = getTitle().map((title) => crypt.card_text.indexOf(title));
        aux = temp.some((elem) => elem !== -1) ? crypt : null;
      }
      
      console.log(textFixed);
      if (crypt.card_text.toLowerCase().includes(textFixed)) {
        aux = crypt;
      }
    } else {
      aux = crypt;
    }
    return aux;
  };

  const compareArrays = (vampDisc: string[], selectedDisc: string[]) => {
    return selectedDisc.every((selected) => selected === '')
      ? true
      : selectedDisc
          .map((selected) =>
            selected.toLowerCase() === selected
              ? vampDisc.includes(selected) ||
                vampDisc.includes(selected.toUpperCase())
              : vampDisc.includes(selected)
          )
          .find((elem: boolean) => elem === true);
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
          title: string,
          props: PropType
        ) => handleSearch(name, discList, clan, sect, title, props)}
      />
      <CryptCardList cardType='Crypt' list={list} />
    </div>
  );
};

export default CryptList;
