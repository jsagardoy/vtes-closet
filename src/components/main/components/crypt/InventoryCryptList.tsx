import React from 'react';
import '../global/CardDetail.css';
import { CryptType } from '../../../../types/crypt_type';
import ModalCrypt from './ModalCrypt';
import InventoryCryptComponent from './InventoryCryptComponent';
import { typeCryptInventory } from '../../../../types/inventory_type';
import { Alert, Fab, Snackbar } from '@mui/material';
import { setCryptInventory } from '../../../../service/setCryptInventory';
import SaveIcon from '@mui/icons-material/Save';
import { Spinner } from '../global/Spinner';

interface listProps {
  list: typeCryptInventory[];
  updateList: (list: typeCryptInventory[]) => void;
}

const InventoryCryptList = (props: listProps) => {
  const { list, updateList } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [openedCrypt, setOpenedCrypt] = React.useState<CryptType>();
  const [cryptIndex, setCryptIndex] = React.useState<number>(0);
  const [inventoryList, setInventoryList] =
    React.useState<typeCryptInventory[]>(list);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [saving, setSaving] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);

  const handleOpen = (crypt: CryptType, index: number) => {
    setOpenedCrypt(crypt);
    setOpen(true);
    setCryptIndex(index);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenedCrypt(undefined);
  };

  const handleSave = () => {
    setLoader(true);
    setSaving(true);
    includeInStorage(inventoryList !== [] ? inventoryList : list);
    setCryptInventory()
      .then((msg) => {
        setShowSnackbar(true);
        setMessage(msg);
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
  const handleNext = () => {
    const newIndex: number = cryptIndex + 1;
    const crypt: CryptType = list[newIndex];
    handleOpen(crypt, newIndex);
  };
  const handlePrevious = () => {
    const newIndex: number = cryptIndex - 1;
    const crypt: CryptType = list[newIndex];
    handleOpen(crypt, newIndex);
  };

  const includeInStorage = (inventory: typeCryptInventory[]) => {
    const newValue = JSON.stringify(inventory);
    window.sessionStorage.setItem('cryptInventoryList', newValue);
  };

  const updateInventory = React.useCallback((newInventory: typeCryptInventory) => () =>{
    const newList: typeCryptInventory[] = list.map((elem: typeCryptInventory) =>
      elem.id === newInventory.id ? newInventory : elem
    );
    setInventoryList(newList);
    updateList(newList);
  },[list, updateList]);


  const handleCloseSnackbar = () => setShowSnackbar(false);

  React.useEffect(() => {
    setInventoryList(list);
  }, [list]);

  return (
    <>
      {loader && <Spinner />}
      <Fab
        sx={{
          color: '#ECDBBA',
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
      {open && openedCrypt ? (
        <ModalCrypt
          open={open}
          list={inventoryList}
          openedCrypt={openedCrypt}
          cryptIndex={cryptIndex}
          handleClose={handleClose}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      ) : null}

      {inventoryList && inventoryList.length > 0 ? (
        <InventoryCryptComponent
          list={inventoryList}
          initialValue={inventoryList.slice(0, 20)}
          handleOpen={(crypt: CryptType, index: number) =>
            handleOpen(crypt, index)
          }
          updateInventory={(newInventory:typeCryptInventory)=>updateInventory(newInventory)}
        />
      ) : null}

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
    </>
  );
};

export default InventoryCryptList;
