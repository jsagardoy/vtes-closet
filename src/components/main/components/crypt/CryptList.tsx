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
  const [open, setOpen] = React.useState<boolean>(false);
  const [openedCrypt, setOpenedCrypt] = React.useState<CryptType>();
  const [cryptIndex, setCryptIndex] = React.useState<number>(0);

  const { list, deckMode, handleAddCardToDeck } = props;

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

  React.useEffect(() => {}, []);

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
      {list && list.length > 0 && (
        <CryptListComponent
          handleAddCardToDeck={(
            card: CryptType | LibraryType,
            cardType: CardType
          ) => handleAddCardToDeck(card, cardType)}
          deckMode={deckMode}
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

export default CryptList;
