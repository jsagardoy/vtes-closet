import React from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { fetchLibrary } from '../../../service/fetchLibrary';
import { fetchLibraryInventory } from '../../../service/fetchLibraryInventory';
import { libraryInventoryType } from '../../../types/inventory_type';
import { LibraryPropType } from '../../../types/library_type';
import {
  compareArrays,
  filterProps,
  findInText,
  getUserId,
} from '../../../util/helpFunction';
import { Spinner } from '../components/global/Spinner';
import InventoryLibraryList from '../components/library/InventoryLibraryList';
import LibraryNavbarList from '../components/library/LibraryNavbarList';
import './LibraryContainer.css';

const InventoryLibraryContainer = () => {
  const [list, setList] = React.useState<libraryInventoryType[]>([]);
  const [sort, setSort] = React.useState<boolean>(false); //true = asc / false= desc
  const [loader, setLoader] = React.useState<boolean>(false);
  const [sessionStorage, setSessionStorage] = useSessionStorage<
    libraryInventoryType[]
  >('libraryInventoryList', []);

  const handleSearch = (
    name: string,
    discList: string[],
    libraryCardType: string,
    clan: string,
    sect: string,
    props: LibraryPropType
  ) => {
    const resp = sessionStorage
      .filter((item) => findInText(item, name))
      .filter((item) => compareArrays(item.disciplines, discList))
      .filter((item) =>
        libraryCardType === 'Any' ? item : item.types.includes(libraryCardType)
      )
      .filter((item: libraryInventoryType) =>
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
  const handleUpdateList = (newList: libraryInventoryType[]) => {
    //setSessionStorage(newList);
    setList(newList);
  };

  React.useEffect(() => {
    if (sessionStorage && sessionStorage !== [] && sessionStorage.length > 0) {
      setList(sessionStorage);
    } else {
      setLoader(true);
      fetchLibrary()
        .then((data: libraryInventoryType[]) => {
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
  React.useEffect(
    () => {
      if (
        sessionStorage &&
        sessionStorage !== [] &&
        sessionStorage.length > 0 &&
        list === []
      ) {
        setList(sessionStorage);
      } else {
        setLoader(true);
        const uid = getUserId();
        fetchLibraryInventory(`${uid}-1`)
          .then((data: libraryInventoryType[]) => {
            fetchLibraryInventory(`${uid}-2`).then(
              (data2: libraryInventoryType[]) => {
                fetchLibraryInventory(`${uid}-3`).then(
                  (data3: libraryInventoryType[]) => {
                    fetchLibraryInventory(`${uid}-4`).then(
                      (data4: libraryInventoryType[]) => {
                        if (
                          data &&
                          data2 &&
                          data3 &&
                          data4 &&
                          data.length > 0 &&
                          data2.length > 0 &&
                          data3.length > 0 &&
                          data4.length > 0
                        ) {
                          const composedArray = data.concat(
                            data2,
                            data3,
                            data4
                          );
                          setList(composedArray);
                          setSessionStorage(composedArray);
                          setLoader(false);
                        } else {
                          fetchLibrary()
                            .then((data: libraryInventoryType[]) => {
                              const newData: libraryInventoryType[] = [...data];
                              const resultData: libraryInventoryType[] =
                                newData.map((elem: libraryInventoryType) => {
                                  return {
                                    ...elem,
                                    have: 0,
                                    want: 0,
                                    trade: 0,
                                    used: 0,
                                  };
                                });
                              setList(resultData);
                              setSessionStorage(resultData);
                              setLoader(false);
                            })
                            .catch((error) => {
                              setLoader(false);
                              console.log(error);
                            });
                        }
                      }
                    );
                  }
                );
              }
            );
          })

          .catch((error) => {
            console.log('Error Accessing Database');
            setLoader(false);
          });
      }
      //si no hay valores para el usuario. Hay que implementar si ya tiene
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
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
      <InventoryLibraryList list={list} updateList={handleUpdateList} />
    </div>
  );
};

export default InventoryLibraryContainer;
