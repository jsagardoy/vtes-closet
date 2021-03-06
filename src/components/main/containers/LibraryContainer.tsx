import React from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { fetchLibrary } from '../../../service/fetchLibrary';

import { LibraryPropType, LibraryType } from '../../../types/library_type';
import {
  compareArrays,
  filterProps,
  findInText,
} from '../../../util/helpFunction';
import { Spinner } from '../components/global/Spinner';
import LibraryList from '../components/library/LibraryList';
import LibraryNavbarList from '../components/library/LibraryNavbarList';
import './LibraryContainer.css';

const LibraryContainer = () => {
  const [list, setList] = React.useState<LibraryType[]>([]);
  const [sort, setSort] = React.useState<boolean>(false); //true = asc / false= desc
  const [loader, setLoader] = React.useState<boolean>(false);
  const [sessionStorage, setSessionStorage] = useSessionStorage<LibraryType[]>('libraryList', []);

  const handleSearch = (
    name: string,
    discList: string[],
    libraryCardType: string,
    clan: string,
    sect: string,
    props: LibraryPropType
  ) => {
    const resp = sessionStorage
      .filter((item: LibraryType) =>findInText(item,name))
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
   if (sessionStorage && sessionStorage !== [] && sessionStorage.length > 0) {
     setList(sessionStorage);
   } else {
     setLoader(true);
     fetchLibrary()
       .then((data: LibraryType[]) => {
         setList(data);
         setSessionStorage(data);
         setLoader(false);
       })
       .catch((error) => {
         setLoader(false);
         console.log(error);
       });
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {loader && <Spinner />}
      <LibraryList list={list} />
    </div>
  );
};

export default LibraryContainer;
