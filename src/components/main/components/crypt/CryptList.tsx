import React from 'react';
import '../global/CardDetail.css';
import { CryptType } from '../../../../types/crypt_type';
import ModalCrypt from './ModalCrypt';
import CryptListComponent from './CryptListComponent';
import { CardType } from '../../../../types/deck_type';
import { LibraryType } from '../../../../types/library_type';

interface listProps {
  list: CryptType[];
  deckMode: boolean;
  handleAddCardToDeck: (
    crypt: CryptType | CryptType,
    cardType: CardType
  ) => void;
}

const CryptList = (props: listProps) => {
  const { list, deckMode, handleAddCardToDeck } = props;
  const [selectedItem, setSelectedItem] = React.useState<CryptType>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  const handleItemToOpen = (crypt: CryptType) => {
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
      const crypt: CryptType = list[newIndex];
      handleItemToOpen(crypt);
    }
  };
  const handlePrevious = () => {
    if (index > 0) {
      const newIndex: number = index - 1;
      const crypt: CryptType = list[newIndex];
      handleItemToOpen(crypt);
    }
  };

  return (
    <>
      {selectedItem && openModal ? (
        <ModalCrypt
          open={openModal}
          openedCrypt={selectedItem}
          list={list}
          cryptIndex={index}
          handleClose={() => handleCloseModal()}
          handleNext={() => handleNext()}
          handlePrevious={() => handlePrevious()}
        />
      ) : null}
      {list && list.length > 0 && (
        <CryptListComponent
          handleAddCardToDeck={(
            card: CryptType | LibraryType,
            cardType: CardType
          ) => handleAddCardToDeck( card as CryptType, cardType)}
          deckMode={deckMode}
          list={list}
          handleItemToOpen={(crypt: CryptType) => handleItemToOpen(crypt)}
        />
      )}
    </>
  );
};

export default CryptList;
