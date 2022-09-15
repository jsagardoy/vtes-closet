import '../global/CardDetail.css';

import InventoryLibraryComponent from './InventoryLibraryComponent';
import LibraryModal from './LibraryModal';
import React from 'react';
import { libraryInventoryType } from '../../../../types/inventory_type';

interface listProps {
  list: libraryInventoryType[];
  updateInventory: (card: libraryInventoryType) => void;
}

const InventoryLibraryList = (props: listProps) => {
  const { list, updateInventory } = props;
  const [selectedItem, setSelectedItem] =
    React.useState<libraryInventoryType>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);


  const handleItemToOpen = (library: libraryInventoryType) => {
    const newIndex = list.findIndex((elem) => elem.id === library.id);
    setSelectedItem(library);
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
      const library: libraryInventoryType = list[newIndex];
      handleItemToOpen(library);
    }
  };
  const handlePrevious = () => {
    if (index > 0) {
      const newIndex: number = index - 1;
      const library: libraryInventoryType = list[newIndex];
      handleItemToOpen(library);
    }
  };


  return (
    <>
      {selectedItem && openModal ? (
        <LibraryModal
          open={openModal}
          library={selectedItem}
          list={list}
          index={index}
          handleCloseModal={() => handleCloseModal()}
          handleNext={() => handleNext()}
          handlePrevious={() => handlePrevious()}
        />
      ) : null}
      {list && list.length > 0 ? (
        <InventoryLibraryComponent
          list={list}
          handleItemToOpen={(library: libraryInventoryType) =>
            handleItemToOpen(library)
          }
          updateInventory={(newInventory: libraryInventoryType) =>
            updateInventory(newInventory)
          }
        />
      ) : null}
    </>
  );
};

export default InventoryLibraryList;
