import React from 'react';
import '../global/CardDetail.css';
import { CryptType } from '../../../../types/crypt_type';
import ModalCrypt from './ModalCrypt';
import CryptListComponent from './CryptListComponent';

interface listProps {
  list: CryptType[]; //habrá que hacer también la opción para las cartas de librería
}

const CryptList = (props: listProps) => {
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

  React.useEffect(() => { }, []); 
  
  return (
    <>
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
      <CryptListComponent
        list={list}
        initialValue={list.slice(0,20)}
        handleOpen={(crypt: CryptType, index: number) =>
          handleOpen(crypt, index)
        }
      />
    </>
  );
};

export default CryptList;
