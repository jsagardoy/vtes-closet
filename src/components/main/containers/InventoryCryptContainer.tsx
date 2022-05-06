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
   groupType as GroupType,
 } from '../../../util';

 import { Spinner } from '../components/global/Spinner';
 import { fetchCrypt } from '../../../service/fetchCrypt';

 import { useSessionStorage } from '../../../hooks/useSessionStorage';
import InventoryCryptList from '../components/crypt/InventoryCryptList';
import { typeCryptInventory } from '../../../types/inventory_type';
  interface Props {
   toogle: boolean;
  }
 
const InventoryCryptContainer = (props: Props) => {
   const { toogle } = props;
   const [loader, setLoader] = React.useState<boolean>(false);
   const [sessionStorage, setSessionStorage] = useSessionStorage<typeCryptInventory[]>(
     'cryptInventoryList',
     []
   );
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

   React.useEffect(() => {
     if (sessionStorage && sessionStorage !== [] && sessionStorage.length > 0) {
       setList(sessionStorage);
     } else {
       setLoader(true);
       //si no hay valores para el usuario. Hay que implementar si ya tiene
       fetchCrypt()
         .then((data: CryptType[]) => {
           const newData: CryptType[] = [...data];
           const resultData: typeCryptInventory[] = newData.map((elem: CryptType) => {
             return {
               ...elem,
               have: 0,
               want: 0,
               trade: 0,
               used: 0,
             };
}) 
           setList(resultData);
           setSessionStorage(resultData);
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
       <InventoryCryptList list={list} />
     </div>
   );
 };


export default InventoryCryptContainer;