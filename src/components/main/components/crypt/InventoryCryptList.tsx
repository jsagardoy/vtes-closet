import React from 'react';
import '../global/CardDetail.css';
import { CryptType } from '../../../../types/crypt_type';
import ModalCrypt from './ModalCrypt';
import InventoryCryptComponent from './InventoryCryptComponent';
import { typeCryptInventory } from '../../../../types/inventory_type';
import { Fab } from '@mui/material';
import { setCryptInventory } from '../../../../service/setCryptInventory';
import SaveIcon from '@mui/icons-material/Save';
interface listProps {
  list: typeCryptInventory[]; //habrá que hacer también la opción para las cartas de librería
}

const InventoryCryptList = (props: listProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openedCrypt, setOpenedCrypt] = React.useState<CryptType>();
  const [cryptIndex, setCryptIndex] = React.useState<number>(0);

  const { list } = props;

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
    setCryptInventory();
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

  React.useEffect(() => {}, []);

  return (
    <>
      <Fab
        sx={{
          color: '#ECDBBA',
          backgroundColor: 'darkcyan',
          position: 'fixed',
          right: '20%',
          top: '90%',
          bottom: '10%',
          left:'80%',
          zIndex: '1000'
        }}
        aria-label='Save'
        onClick={() => handleSave()}
      >
        <SaveIcon />
      </Fab>
      {open && openedCrypt ? (
        <ModalCrypt
          open={open}
          list={list}
          openedCrypt={openedCrypt}
          cryptIndex={cryptIndex}
          handleClose={handleClose}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      ) : null}

      {list && list.length > 0 && (
        <InventoryCryptComponent
          list={list}
          initialValue={list.slice(0, 20)}
          handleOpen={(crypt: CryptType, index: number) =>
            handleOpen(crypt, index)
          }
        />
      )}
    </>
  );
};

export default InventoryCryptList;
