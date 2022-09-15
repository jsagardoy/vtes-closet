import '../global/CardDetail.css';

import React, { useMemo } from 'react';

import { CryptType } from '../../../../types/crypt_type';
import InventoryCryptComponent from './InventoryCryptComponent';
import ModalCrypt from './ModalCrypt';
import { cryptInventoryType } from '../../../../types/inventory_type';

interface listProps {
  list: cryptInventoryType[];
  updateList: (list: cryptInventoryType[]) => void;
}

const InventoryCryptList = (props: listProps) => {
  const { list, updateList } = props;

 const [selectedItem, setSelectedItem] = React.useState<CryptType>();
 const [openModal, setOpenModal] = React.useState<boolean>(false);
 const [index, setIndex] = React.useState<number>(0);

 const handleItemToOpen = (crypt: cryptInventoryType) => {
   const newIndex = list.findIndex((elem) => elem.id === crypt.id);
   setSelectedItem(crypt);
   setOpenModal(true);
   if (newIndex !== -1) {
     setIndex(newIndex);
   }
 };
 const handleCloseModal = () => {
   setOpenModal(false);
   setSelectedItem(undefined);
 };

 const handleNext = () => {
   if (index < list.length - 1) {
     const newIndex: number = index + 1;
     const crypt: cryptInventoryType = list[newIndex];
     handleItemToOpen(crypt);
   }
 };
 const handlePrevious = () => {
   if (index > 0) {
     const newIndex: number = index - 1;
     const crypt: cryptInventoryType = list[newIndex];
     handleItemToOpen(crypt);
   }
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
      {selectedItem && openModal ? (
        <ModalCrypt
          open={openModal}
          list={list}
          openedCrypt={selectedItem}
          cryptIndex={index}
          handleCloseModal={() => handleCloseModal()}
          handleNext={() => handleNext()}
          handlePrevious={() => handlePrevious()}
        />
      ) : null}

      {list && list.length > 0 ? (
        <InventoryCryptComponent
          list={list}
          handleItemToOpen={(crypt: cryptInventoryType) =>
            handleItemToOpen(crypt)
          }
          updateInventory={updateInventory}
        />
      ) : null}
    </>
  );
};

export default InventoryCryptList;
