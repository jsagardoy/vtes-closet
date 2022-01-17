import React from 'react';
import { getLibrary, LibraryType } from '../../../types/library_type';
import LibraryList from '../components/library/LibraryList';
import LibraryNavbarList from '../components/library/LibraryNavbarList';
import './LibraryContainer.css';

const LibraryContainer = () => {
  const libratyList: LibraryType[] = getLibrary();
  const [list, setList] = React.useState<LibraryType[]>(libratyList);
  const handleSearch = (name: string) => {
//TODO: add the remaining filters
    const resp = libratyList.filter((item) =>
      item.name.toLowerCase().includes(name)
    );
    setList(resp);
  };
  return (
    <div className='library__container'>
      <LibraryNavbarList
        list={list}
        searchList={(name: string) => handleSearch(name)}
      />
      <LibraryList list={list} />
    </div>
  );
};

export default LibraryContainer;
