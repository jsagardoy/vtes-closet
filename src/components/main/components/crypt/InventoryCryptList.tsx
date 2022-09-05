import React, { useMemo } from 'react';
import '../global/CardDetail.css';
import { CryptType } from '../../../../types/crypt_type';
import ModalCrypt from './ModalCrypt';
import InventoryCryptComponent from './InventoryCryptComponent';
import { cryptInventoryType } from '../../../../types/inventory_type';

interface listProps {
  list: cryptInventoryType[];
  updateList: (list: cryptInventoryType[]) => void;
}

const InventoryCryptList = (props: listProps) => {
  const { list, updateList } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [openedCrypt, setOpenedCrypt] = React.useState<CryptType>();
  const [cryptIndex, setCryptIndex] = React.useState<number>(0);

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

  const updateInventory = useMemo(
    () => (newInventory: cryptInventoryType) => {
      const index = list.findIndex((elem) => elem.id === newInventory.id);
      if (index !== -1) {
        const newList = [...list];
        newList[index] = newInventory;
        updateList(newList);
      }
    },
    [list, updateList]
  );

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

      {list && list.length > 0 ? (
        <InventoryCryptComponent
          list={list}
          initialValue={list.slice(0, 20)}
          handleOpen={(crypt: CryptType, index: number) =>
            handleOpen(crypt, index)
          }
          updateInventory={updateInventory}
        />
      ) : null}
    </>
  );
};

export default InventoryCryptList;
