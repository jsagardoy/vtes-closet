import React, { useMemo } from 'react';
import '../global/CardDetail.css';
import { libraryInventoryType } from '../../../../types/inventory_type';
import { LibraryType } from '../../../../types/library_type';
import InventoryLibraryComponent from './InventoryLibraryComponent';
import LibraryModal from './LibraryModal';

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

  const handleOpen = (library: LibraryType, index: number) => {
    setOpenedLibrary(library);
    setOpen(true);
    setLibraryIndex(index);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenedLibrary(undefined);
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

  const updateInventory = useMemo(
    () => (newInventory: libraryInventoryType) => {
      const index = list.findIndex((elem) => elem.id === newInventory.id);
      if (index !== -1) {
        const newList = [...list];
        newList[index] = newInventory;
        updateList(newList);
      }
    },
    [list, updateList]
  );

  React.useEffect(() => {
    setInventoryList(list);
  }, [list]);

  return (
    <>
      {open && openedLibrary ? (
        <LibraryModal
          open={open}
          list={list}
          library={openedLibrary}
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
    </>
  );
};

export default InventoryLibraryList;
