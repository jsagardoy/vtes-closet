import React, { useMemo, useRef } from 'react';
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
import InventoryCryptList from '../components/crypt/InventoryCryptList';
import { cryptInventoryType } from '../../../types/inventory_type';
import { fetchCryptInventory } from '../../../service/fetchCryptInventory';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { setCryptInventory } from '../../../service/setCryptInventory';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/material';

interface Props {
  toogle: boolean;
}

const InventoryCryptContainer = (props: Props) => {
  const { toogle } = props;
  const [loader, setLoader] = React.useState<boolean>(false);
  const [list, setList] = React.useState<cryptInventoryType[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [saving, setSaving] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const initialData = useRef<cryptInventoryType[]>(list);

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
    const resp = initialData.current
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


  const handleReset = async () => {setList(initialData.current)}; 

  const handleSave = (): void => {
    setLoader(true);
    setSaving(true);
    setCryptInventory(list)
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
    () => (newList: cryptInventoryType[]) => {
      setList(newList);
    },
    []
  );
  const handleCloseSnackbar = () => setShowSnackbar(false);

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetchCryptInventory();
        if (!data) {
          //si no hay inventario creado
          const value = window.localStorage.getItem('cryptList');
          let noInventory;
          if (value) {
            noInventory = JSON.parse(value);
          }
          if (noInventory) {
            noInventory = JSON.parse(noInventory);
            window.localStorage.setItem('cryptInventory', JSON.stringify(noInventory));
          } else {
            noInventory = await fetchCrypt();
          }
          if (noInventory) {
            const newData: CryptType[] = noInventory;
            const resultData: cryptInventoryType[] = newData.map(
              (elem: CryptType) => ({
                ...elem,
                want:0,
                have:0,
                used:0,
                trade:0
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
            window.localStorage.getItem('cryptList') ?? (await fetchCrypt());
          const newData: cryptInventoryType[] = data.map(
            (elem: cryptInventoryType) => {
              const invent = noInventory.find(
                (inventory: CryptType) => inventory.id === elem.id
              );
              if (invent) {
                const newInventory: cryptInventoryType = {
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
  }, []);

  return (
    <Box className={toogle ? 'menu__crypt__container' : 'crypt__container'}>
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
        handleReset={() => handleReset()}
      />
      {loader && <Spinner />}
      <InventoryCryptList list={list} updateList={handleUpdateList} />
      <Fab
        
        color='secondary'
        sx={{
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
    </Box>
  );
};

export default InventoryCryptContainer;
