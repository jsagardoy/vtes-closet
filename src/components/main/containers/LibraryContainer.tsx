import React from 'react';
import { LibraryPropType } from '../../../types/crypt_type';
import { LibraryType } from '../../../types/library_type';
import { compareArrays } from '../../../util/helpFunction';
import LibraryList from '../components/library/LibraryList';
import LibraryNavbarList from '../components/library/LibraryNavbarList';
import './LibraryContainer.css';

const LibraryContainer = () => {
  const libraryList: LibraryType[] = require('../../../mock/libraryCards.json');
  const [list, setList] = React.useState<LibraryType[]>(libraryList);
  const handleSearch = (
    name: string,
    discList: string[],
    libraryCardType: string,
    clan: string,
    sect: string,
    props: LibraryPropType
  ) => {
    //TODO: add the remaining filters
    const resp = libraryList
      .filter((item: LibraryType) => item.name.toLowerCase().includes(name))
      .filter((item: LibraryType) => compareArrays(item.disciplines, discList))
      .filter((item: LibraryType) => libraryCardType==='Any'?item : item.types.includes(libraryCardType))
      ;
    
    setList(resp);        
  };
  return (
    <div className='library__container'>
      <LibraryNavbarList
        list={list}
        searchList={(
          name: string,
          discList: string[],
          libraryCardType: string,
          clan: string,
          sect: string,
          props: LibraryPropType
        ) => handleSearch(name, discList, libraryCardType, clan, sect, props)}
      />
      <LibraryList list={list} />
    </div>
  );
};

export default LibraryContainer;
