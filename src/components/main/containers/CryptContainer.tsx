import React from 'react';
import './CryptContainer.css';
import NavbarCryptList from '../components/NavbarCryptList';

import { CryptType, PropType } from '../../../types/crypt_type';
import { capacityType, getTitle, groupType as GroupType } from '../../../util';
import CryptList from '../components/CryptList';


const CryptContainer = () => {
  const cryptList: CryptType[] = require('../../../mock/cryptCards.json');
  const [list, setList] = React.useState<CryptType[]>(cryptList);

  const handleSearch = (
    name: string,
    discList: string[],
    clan: string,
    sect: string,
    title: string,
    props: PropType,
    group: GroupType,
    maxCap: capacityType,
    minCap: capacityType
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
      .filter((item) => filterGroup(item, group))
      .filter((item) => filterMaxCapacity(item, maxCap))
      .filter((item) => filterMinCapacity(item, minCap));
    setList(resp);
  };

  const filterMaxCapacity = (item: CryptType, maxCap: capacityType) =>
    maxCap.value === 0 ? item : item.capacity <= maxCap.value;

  const filterMinCapacity = (item: CryptType, minCap: capacityType) =>
    minCap.value === 0 ? item : item.capacity >= minCap.value;

  const filterGroup = (item: CryptType, group: GroupType) => {
    if (group.value % 1 === 0) {
      return item.group === group.value.toString();
    } else {
      return group?.label === 'Any'
        ? item
        : item.group === Math.floor(group.value).toString() ||
            item.group === Math.ceil(group.value).toString();
    }
  };

  const filterProps = (crypt: CryptType, props: any) => {
    const elements: string[] = Object.keys(props).filter(
      (elem: string) => props[elem] === true
    );
    return elements.every((elem) => findInText(crypt, elem));
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
      <NavbarCryptList
        cardType='Crypt'
        list={list}
        searchList={(
          name: string,
          discList: string[],
          clan: string,
          sect: string,
          title: string,
          props: PropType,
          group: GroupType,
          maxCap: capacityType,
          minCap: capacityType
        ) =>
          handleSearch(
            name,
            discList,
            clan,
            sect,
            title,
            props,
            group,
            maxCap,
            minCap
          )
        }
      />
      <CryptList list={list} />
    </div>
  );
};

export default CryptContainer;
