import React from 'react';
import { LibraryType } from '../../../../types/library_type';
import LibraryModal from './LibraryModal';
import LibraryListComponent from './LibraryListComponent';
import '../global/CardDetail.css';
interface LibraryListProps {
  list: LibraryType[];
}

const LibraryList = (props: LibraryListProps) => {
  const { list } = props;
  const [selectedItem, setSelectedItem] = React.useState<LibraryType>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  const handleItemToOpen = (library: LibraryType, i: number) => {
    setSelectedItem(library);
    setOpenModal(true);
    setIndex(i);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(undefined);
  };

  const handleNext = () => {
    if (index < list.length - 1) { 
      const newIndex: number = index + 1;
      const library: LibraryType = list[newIndex];
      handleItemToOpen(library, newIndex);
    }
  };
  const handlePrevious = () => {
    if (index > 0) {
      const newIndex: number = index - 1;
      const library: LibraryType = list[newIndex];
      handleItemToOpen(library, newIndex);
    }
  };
  React.useEffect(() => {}, []);
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
      {list && list.length > 0 &&
      <LibraryListComponent
        list={list}
        initialValue={list.slice(0, 20)}
        handleItemToOpen={(library: LibraryType) =>
          handleItemToOpen(library, index)
        }
      />
      }
    </>
  );
};

export default LibraryList;
