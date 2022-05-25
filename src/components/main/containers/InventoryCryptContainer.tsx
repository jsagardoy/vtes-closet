import React from 'react';
import './CryptContainer.css';
import NavbarCryptList from '../components/crypt/NavbarCryptList';

import { CryptType, PropType, TitleType } from '../../../types/crypt_type';
import {
  capacityType,
  compareArrays,
  filterProps,
  filterTitle,
  findInText,
  getUserId,
  groupType as GroupType,
} from '../../../util';

import { Spinner } from '../components/global/Spinner';
import { fetchCrypt } from '../../../service/fetchCrypt';

import { useSessionStorage } from '../../../hooks/useSessionStorage';
import InventoryCryptList from '../components/crypt/InventoryCryptList';
import { typeCryptInventory } from '../../../types/inventory_type';
import { fetchCryptInventory } from '../../../service/fetchCryptInventory';
interface Props {
  toogle: boolean;
}

const InventoryCryptContainer = (props: Props) => {
  const { toogle } = props;
  const [loader, setLoader] = React.useState<boolean>(false);
  const [sessionStorage, setSessionStorage] = useSessionStorage<
    typeCryptInventory[]
  >('cryptInventoryList', []);
  const [list, setList] = React.useState<typeCryptInventory[]>([]);
  const [sortAZ, setSortAZ] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<boolean>(false);

  const handleSearch = (
    name: string,
    discList: string[],
    clan: string,
    sect: string,
    title: TitleType,
    props: PropType,
    group: GroupType,
    maxCap: capacityType,
    minCap: capacityType
  ) => {
    const resp = sessionStorage
      .filter((item) => item.name.toLowerCase().includes(name))
      .filter((item) => compareArrays(item.disciplines, discList))
      .filter((item) =>
        clan !== ''
          ? item.clans.filter((clanItem) => clanItem === clan).length > 0
          : item.clans.map((clanItem) => clanItem)
      )
      .filter((item) => findInText(item, sect))
      .filter((item) => filterTitle(item, title))
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

  const handleReset = async () => setList(sessionStorage);
  const handleUpdateList = (newList: typeCryptInventory[]) => {
    setSessionStorage(newList);
    setList(newList);
  };

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
        fetchCryptInventory(`${uid}-1`)
          .then((data: typeCryptInventory[]) => {
            fetchCryptInventory(`${uid}-2`).then(
              (data2: typeCryptInventory[]) => {
                if (data && data2 && data.length > 0 && data2.length > 0) {
                  const composedArray = data.concat(data2);
                  setList(composedArray);
                  setSessionStorage(composedArray);
                  setLoader(false);
                } else {
                  fetchCrypt()
                    .then((data: CryptType[]) => {
                      const newData: CryptType[] = [...data];
                      const resultData: typeCryptInventory[] = newData.map(
                        (elem: CryptType) => {
                          return {
                            ...elem,
                            have: 0,
                            want: 0,
                            trade: 0,
                            used: 0,
                          };
                        }
                      );
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
          })
          .catch((error) => {
            //TEMPORSAL: en caso de que haya sobrepasadp las peticiones BBDD carga el mock de datos.
            const data: typeCryptInventory[] = [
              {
                capacity: 4,
                group: '2',
                id: 200001,
                name: 'Aabbt Kindred (G2)',
                sets: {
                  'Final Nights': [
                    {
                      rarity: 'Uncommon',
                      release_date: '2001-06-11',
                      frequency: 2,
                    },
                  ],
                  'Print on Demand': [
                    {
                      copies: 1,
                      precon: 'DriveThruCards',
                    },
                  ],
                },
                artists: ['Lawrence Snelly'],

                clans: ['Ministry'],
                url: 'https://static.krcg.org/card/aabbtkindredg2.jpg',

                disciplines: ['for', 'pre', 'ser'],
                card_text:
                  'Independent: Aabbt Kindred cannot perform directed actions unless /Nefertiti/ is ready. Aabbt Kindred can prevent 1 damage each combat. Non-unique.',
                types: ['Vampire'],

                have: 0,
                want: 0,
                trade: 0,
                used: 0,
              },
              {
                types: ['Vampire'],
                clans: ['Nosferatu antitribu'],
                url: 'https://static.krcg.org/card/aaronbathurstg4.jpg',
                name: 'Aaron Bathurst (G4)',
                group: '4',
                id: 200002,
                artists: ['Rik Martin'],

                disciplines: ['for', 'obf', 'pot'],

                sets: {
                  'Third Edition': [
                    {
                      rarity: 'Vampire',
                      release_date: '2006-09-04',
                    },
                  ],
                },
                capacity: 4,

                card_text: 'Sabbat.',
                have: 0,
                want: 0,
                trade: 0,
                used: 0,
              },
            ];
            setList(data);
            setSessionStorage(data);
            setLoader(false);
          });
      }
      //si no hay valores para el usuario. Hay que implementar si ya tiene
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    setList(sessionStorage);
  }, [list, sessionStorage]);

  return (
    <div className={toogle ? 'menu__crypt__container' : 'crypt__container'}> 
      <NavbarCryptList
        searchList={(
          name: string,
          discList: string[],
          clan: string,
          sect: string,
          title: TitleType,
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
      <InventoryCryptList list={list} updateList={handleUpdateList} />
    </div>
  );
};

export default InventoryCryptContainer;
