import React from 'react';
import '../global/CardDetail.css';
import LibraryModal from './LibraryModal';
import { libraryInventoryType } from '../../../../types/inventory_type';
import { Alert, Fab, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Spinner } from '../global/Spinner';
import { LibraryType } from '../../../../types/library_type';
import { setLibraryInventory } from '../../../../service/setLibraryInventory';
import InventoryLibraryComponent from './InventoryLibraryComponent';
import { HEADER_COLOR } from '../../../../util/helpFunction';

interface listProps {
  list: libraryInventoryType[];
  updateList: (list: libraryInventoryType[]) => void;
}

const InventoryLibraryList = (props: listProps) => {
  const { list, updateList } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [openedLibrary, setOpenedLibrary] = React.useState<LibraryType>();
  const [libraryIndex, setLibraryIndex] = React.useState<number>(0);
  const [inventoryList, setInventoryList] =
    React.useState<libraryInventoryType[]>(list);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [saving, setSaving] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);

  const handleOpen = (library: LibraryType, index: number) => {
    setOpenedLibrary(library);
    setOpen(true);
    setLibraryIndex(index);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenedLibrary(undefined);
  };

  const handleSave = () => {
    setLoader(true);
    setSaving(true);
    includeInStorage(inventoryList !== [] ? inventoryList : list);
    setLibraryInventory()
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
    const newIndex: number = libraryIndex + 1;
    const library: LibraryType = list[newIndex];
    handleOpen(library, newIndex);
  };
  const handlePrevious = () => {
    const newIndex: number = libraryIndex - 1;
    const library: LibraryType = list[newIndex];
    handleOpen(library, newIndex);
  };

  const includeInStorage = (inventory: libraryInventoryType[]) => {
    const newValue = JSON.stringify(inventory);
    window.sessionStorage.setItem('libraryInventoryList', newValue);
  };

  const updateInventory = React.useCallback(
    (newInventory: libraryInventoryType) => {
      const newList: libraryInventoryType[] = list.map(
        (elem: libraryInventoryType) =>
          elem.id === newInventory.id ? newInventory : elem
      );
      setInventoryList(newList);
      updateList(newList);
    },
    [list, updateList]
  );

  const handleCloseSnackbar = () => setShowSnackbar(false);

  React.useEffect(() => {
    setInventoryList(list);
  }, [list]);

  return (
    <>
      {loader && <Spinner />}
      <Fab
        sx={{
          color: HEADER_COLOR,
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
      {open && openedLibrary ? (
        <LibraryModal
          open={open}
          library={inventoryList[libraryIndex]}
          list={inventoryList}
          index={libraryIndex}
          handleCloseModal={handleClose}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      ) : null}

      {inventoryList && inventoryList.length > 0 ? (
        <InventoryLibraryComponent
          list={inventoryList}
          initialValue={inventoryList.slice(0, 20)}
          handleOpen={(library: LibraryType, index: number) =>
            handleOpen(library, index)
          }
          updateInventory={(newInventory: libraryInventoryType) =>
            updateInventory(newInventory)
          }
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

export default InventoryLibraryList;
