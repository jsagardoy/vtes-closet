import { Alert, Fab, Snackbar } from '@mui/material';
import React, { useMemo, useRef } from 'react';
import { fetchLibrary } from '../../../service/fetchLibrary';
import { fetchLibraryInventory } from '../../../service/fetchLibraryInventory';
import { libraryInventoryType } from '../../../types/inventory_type';
import { LibraryPropType, LibraryType } from '../../../types/library_type';
import {
  compareArrays,
  filterProps,
  findInText,
} from '../../../util/helpFunction';
import { Spinner } from '../components/global/Spinner';
import InventoryLibraryList from '../components/library/InventoryLibraryList';
import LibraryNavbarList from '../components/library/LibraryNavbarList';
import './LibraryContainer.css';
import SaveIcon from '@mui/icons-material/Save';
import { setLibraryInventory } from '../../../service/setLibraryInventory';

const InventoryLibraryContainer = () => {
  const [list, setList] = React.useState<libraryInventoryType[]>([]);
  const [sort, setSort] = React.useState<boolean>(false); //true = asc / false= desc
  const [loader, setLoader] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [saving, setSaving] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const initialData = useRef<libraryInventoryType[]>(list);

  const handleSearch = (
    name: string,
    discList: string[],
    libraryCardType: string,
    clan: string,
    sect: string,
    props: LibraryPropType
  ) => {
    const resp = initialData.current
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

    const handleSave = (): void => {
      setLoader(true);
      setSaving(true);
      setLibraryInventory(list)
        .then((msg) => {
          setShowSnackbar(true);
          setMessage(JSON.stringify(msg));
          setSaving(false);
          setLoader(false);
        })
        .catch((msg) => {
          setShowSnackbar(true);
          setMessage(msg);
          setSaving(false);
          setLoader(false);
        });
    };

 const handleUpdateList = useMemo(
   () => (newList: libraryInventoryType[]) => {
     setList(newList);
   },
   []
 );

  const handleCloseSnackbar = () => setShowSnackbar(false);
  
  React.useEffect(() => {
     try {
       const fetchData = async () => {
         const data = await fetchLibraryInventory();
         if (!data) {
           //si no hay inventario creado
           const value = window.localStorage.getItem('libraryList');
           let noInventory;
           if (value) {
             noInventory = JSON.parse(value);
           }
           if (noInventory) {
             noInventory = JSON.parse(noInventory);
             window.localStorage.setItem(
               'libraryInventory',
               JSON.stringify(noInventory)
             );
           } else {
             noInventory = await fetchLibrary();
           }
           if (noInventory) {
             const newData: LibraryType[] = noInventory;
             const resultData: libraryInventoryType[] = newData.map(
               (elem: LibraryType) => ({
                 ...elem,
                 want: 0,
                 have: 0,
                 used: 0,
                 trade: 0,
               })
             );
             setList(resultData);
             initialData.current = [...resultData];
             setLoader(false);
           } else {
             setList(data);
             initialData.current = [...data];
             setLoader(false);
           }
         } else {
           //hay datos para el inventario
           const noInventory =
             window.localStorage.getItem('libraryList') ?? (await fetchLibrary());
           const newData: libraryInventoryType[] = data.map(
             (elem: libraryInventoryType) => {
               const invent = noInventory.find(
                 (inventory: LibraryType) => inventory.id === elem.id
               );
               if (invent) {
                 const newInventory: libraryInventoryType = {
                   ...invent,
                   have: elem.have,
                   want: elem.want,
                   trade: elem.trade,
                   used: elem.used,
                 };
                 return newInventory;
               }
               return null;
             }
           );
           const newValue = newData.filter((elem) => elem !== null);
           setList(newValue);
           initialData.current = newValue;
           setLoader(false);
         }
       };

       setLoader(true);
       fetchData();
     } catch (error) {
       console.log(error);
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
      <InventoryLibraryList list={list} updateList={handleUpdateList} />
      <Fab
        sx={{
          backgroundColor: 'darkcyan',
          position: 'fixed',
          right: '20%',
          top: '90%',
          bottom: '10%',
          left: '80%',
          zIndex: '1000',
        }}
        disabled={saving}
        aria-label='Save'
        onClick={() => handleSave()}
      >
        <SaveIcon />
      </Fab>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        {message.toLowerCase().includes('error') ? (
          <Alert
            onClose={handleCloseSnackbar}
            severity='error'
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        ) : (
          <Alert
            onClose={handleCloseSnackbar}
            severity='success'
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default InventoryLibraryContainer;
