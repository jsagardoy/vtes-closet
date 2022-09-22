import '../global/CardDetail.css';

import { Theme, useMediaQuery, useTheme } from '@mui/material';

import { CardType } from '../../../../types/deck_type';
import { CryptType } from '../../../../types/crypt_type';
import LibraryListComponent from './LibraryListComponent';
import LibraryModal from './LibraryModal';
import LibraryModalSmall from './LibraryModalSmall';
import { LibraryType } from '../../../../types/library_type';
import React from 'react';

interface LibraryListProps {
  list: LibraryType[];
  deckMode: boolean;
  handleAddCardToDeck: (
    card: CryptType | LibraryType,
    cardType: CardType
  ) => void;
}

const LibraryList = (props: LibraryListProps) => {
  const { list, deckMode, handleAddCardToDeck } = props;
  const [selectedItem, setSelectedItem] = React.useState<LibraryType>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));

  const handleItemToOpen = (library: LibraryType) => {
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
      const library: LibraryType = list[newIndex];
      handleItemToOpen(library);
    }
  };
  const handlePrevious = () => {
    if (index > 0) {
      const newIndex: number = index - 1;
      const library: LibraryType = list[newIndex];
      handleItemToOpen(library);
    }
  };

  const ModalContainer = () => {
    if (selectedItem && openModal) {
      return isMobile ? (
        <LibraryModalSmall
          open={openModal}
          library={selectedItem}
          list={list}
          index={index}
          handleCloseModal={() => handleCloseModal()}
          handleNext={() => handleNext()}
          handlePrevious={() => handlePrevious()}
        />
      ) : (
        <LibraryModal
          open={openModal}
          library={selectedItem}
          list={list}
          index={index}
          handleCloseModal={() => handleCloseModal()}
          handleNext={() => handleNext()}
          handlePrevious={() => handlePrevious()}
        />
      );
    }
    return null;
  };

  return (
    <>
      {ModalContainer()}
      {list && list.length > 0 && (
        <LibraryListComponent
          list={list}
          handleItemToOpen={(library: LibraryType) => handleItemToOpen(library)}
          deckMode={deckMode}
          handleAddCardToDeck={(
            card: CryptType | LibraryType,
            cardType: CardType
          ) => handleAddCardToDeck(card, cardType)}
        />
      )}
    </>
  );
};

export default LibraryList;
