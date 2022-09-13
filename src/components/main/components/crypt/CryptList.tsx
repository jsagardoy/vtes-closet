import React from 'react';
import '../global/CardDetail.css';
import { CryptType } from '../../../../types/crypt_type';
import ModalCrypt from './ModalCrypt';
import CryptListComponent from './CryptListComponent';
import { LibraryType } from '../../../../types/library_type';
import { CardType } from '../../../../types/deck_type';

interface listProps {
  list: CryptType[];
  deckMode: boolean;
  handleAddCardToDeck: (
    crypt: CryptType | LibraryType,
    cardType:CardType,
  ) => void;
}

const CryptList = (props: listProps) => {
  const { list, deckMode, handleAddCardToDeck } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<CryptType>();
  const [index, setIndex] = React.useState<number>(0);

  const handleItemToOpen = (crypt: CryptType) => {
    const newIndex = list.findIndex((elem) => elem.id === crypt.id);
    setSelectedItem(crypt);
    setOpen(true);
    if (newIndex !== -1) {
      setIndex(newIndex);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    const newIndex: number = index + 1;
    const crypt: CryptType = list[newIndex];
    handleItemToOpen(crypt);
  };
  const handlePrevious = () => {
    const newIndex: number = index - 1;
    const crypt: CryptType = list[newIndex];
    handleItemToOpen(crypt);
  };

  React.useEffect(() => {}, []);

  return (
    <>
      {open && selectedItem ? (
        <ModalCrypt
          open={open}
          list={list}
          openedCrypt={selectedItem}
          cryptIndex={index}
          handleClose={handleClose}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      ) : null}
      {list && list.length > 0 && (
        <CryptListComponent
          handleAddCardToDeck={(
            card: CryptType | LibraryType,
            cardType: CardType
          ) => handleAddCardToDeck(card, cardType)}
          deckMode={deckMode}
          list={list}
          handleItemToOpen={(crypt: CryptType) => handleItemToOpen(crypt)}
        />
      )}
    </>
  );
};

export default CryptList;
