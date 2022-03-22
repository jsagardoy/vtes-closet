import React from 'react';

import { LibraryPropType, LibraryType } from '../../../types/library_type';
import {
  compareArrays,
  filterProps,
  findInText,
  getLibrary,
  getLocalStorageLibrary,
} from '../../../util/helpFunction';
import LibraryList from '../components/library/LibraryList';
import LibraryNavbarList from '../components/library/LibraryNavbarList';
import './LibraryContainer.css';

const LibraryContainer = () => {
  const [list, setList] = React.useState<LibraryType[]>(
    getLocalStorageLibrary()
  );
  const [sort, setSort] = React.useState<boolean>(false); //true = asc / false= desc

  const handleSearch = (
    name: string,
    discList: string[],
    libraryCardType: string,
    clan: string,
    sect: string,
    props: LibraryPropType
  ) => {
    const resp = getLocalStorageLibrary()
      .filter((item: LibraryType) => item.name.toLowerCase().includes(name))
      .filter((item: LibraryType) => compareArrays(item.disciplines, discList))
      .filter((item: LibraryType) =>
        libraryCardType === 'Any' ? item : item.types.includes(libraryCardType)
      )
      .filter((item: LibraryType) =>
        clan.length === 0
          ? item
          : item.clans && item.clans.find((elem) => elem === clan)
      )
      .filter((item) => findInText(item, sect))
      .filter((item) => filterProps(item, props));
    setList(resp);
  };

  const handleSort = (): void => {
    sort
      ? list.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
      : list.sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0));
    setSort(!sort);
  };

  React.useEffect(() => {
    if (
      localStorage.getItem('libraryList') === null ||
      localStorage.getItem('libraryList')?.length === 0
    ) {
      localStorage.clear();
      getLibrary().then((elem: LibraryType[]) =>
        localStorage.setItem('libraryList', JSON.stringify(elem))
      );
    }
    setList(getLocalStorageLibrary());
  }, []);
  return (
    <div className='library__container'>
      <LibraryNavbarList
        searchList={(
          name: string,
          discList: string[],
          libraryCardType: string,
          clan: string,
          sect: string,
          props: LibraryPropType
        ) => handleSearch(name, discList, libraryCardType, clan, sect, props)}
        handleSort={() => handleSort()}
      />
      <LibraryList list={list} />
    </div>
  );
};

export default LibraryContainer;
