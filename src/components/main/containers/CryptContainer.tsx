import React from 'react';
import './CryptContainer.css';
import NavbarCryptList from '../components/crypt/NavbarCryptList';

import { CryptType, PropType } from '../../../types/crypt_type';
import {
  capacityType,
  compareArrays,
  filterProps,
  findInText,
  getCrypt,
  getLocalStorageCrypt,
  groupType as GroupType,
} from '../../../util';

import CryptList from '../components/crypt/CryptList';
import { Spinner } from '../components/global/Spinner';

const CryptContainer = () => {
  const [list, setList] = React.useState<CryptType[]>(getLocalStorageCrypt());
  const [loader, setLoader] = React.useState<boolean>(false);
  const [sortAZ, setSortAZ] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<boolean>(false);

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
    const resp = getLocalStorageCrypt()
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

  const handleSortAZ = (): void => {
    sortAZ
      ? list.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
      : list.sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0));
    setSortAZ(!sortAZ);
  };

  const handleSort = (): void => {
    sort
      ? list.sort((a, b) =>
          a.capacity < b.capacity ? -1 : a.capacity > b.capacity ? 1 : 0
        )
      : list.sort((a, b) =>
          a.capacity < b.capacity ? 1 : a.capacity > b.capacity ? -1 : 0
        );
    setSort(!sort);
  };

  const handleReset = (): void => setList(getLocalStorageCrypt());

  React.useEffect(() => {
    if (
      localStorage.getItem('cryptList') === null ||
      localStorage.getItem('cryptList')?.length === 0
    ) {
      localStorage.clear();
      setLoader(true);
      getCrypt().then((elem: CryptType[]) => {
        localStorage.setItem('cryptList', JSON.stringify(elem));
        setLoader(false);
      });
    }
    setList(getLocalStorageCrypt());
  }, []);

  return (
    <div className='crypt__list'>
      <NavbarCryptList
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
        handleSort={() => handleSort()}
        handleSortAZ={() => handleSortAZ()}
        handleReset={() => handleReset()}
      />
      {loader && <Spinner />}
      <CryptList list={list} />
    </div>
  );
};

export default CryptContainer;
