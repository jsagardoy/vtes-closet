import { Box, Typography } from '@mui/material';
import React from 'react';
import { fetchSelectedCard } from '../../../../service/fetchSelectedCard';
import { CryptType } from '../../../../types/crypt_type';
import {
  CardType,
  DeckType,
  ExtendedDeckType,
  ListType,
} from '../../../../types/deck_type';
import { LibraryType } from '../../../../types/library_type';
import { HEADER_COLOR } from '../../../../util/helpFunction';
import DeckCryptComponent from './DeckCryptComponent';

interface Props {
  deck: DeckType;
  updateDeck: (
    extendedLibrary: ExtendedDeckType[],
    extendedCrypt: ExtendedDeckType[]
  ) => void;
  handleRemoveCard: (id: number, cardType: CardType) => void;
}

const DeckListComponent = (props: Props) => {
  const { deck, updateDeck, handleRemoveCard } = props;
  const [extendedLibrary, setExtendedLibrary] = React.useState<
    ExtendedDeckType[]
  >([]);
  const [extendedCrypt, setExtendedCrypt] = React.useState<ExtendedDeckType[]>(
    []
  );

  const updateQuantity = (
    newValue: number,
    id: number,
    cardType: 'library' | 'crypt'
  ): void => {
    let selectedItem;
    if (cardType === 'library') {
      selectedItem = extendedLibrary.find(
        (elem: ExtendedDeckType) => elem.data.id === id
      );
    }

    if (cardType === 'crypt') {
      selectedItem = extendedCrypt.find(
        (elem: ExtendedDeckType) => elem.data.id === id
      );
    }

    if (selectedItem) {
      const newItem: ExtendedDeckType = { ...selectedItem, quantity: newValue };
      if (cardType === 'library') {
        const newExtendedLibrary: ExtendedDeckType[] = extendedLibrary.map(
          (elem) => (elem.data.id === id ? newItem : elem)
        );
        updateDeck(newExtendedLibrary, extendedCrypt);
        setExtendedLibrary(newExtendedLibrary);
      }

      if (cardType === 'crypt') {
        const newExtendedCrypt: ExtendedDeckType[] = extendedCrypt.map((elem) =>
          elem.data.id === id ? newItem : elem
        );
        updateDeck(extendedLibrary, newExtendedCrypt);
        setExtendedCrypt(newExtendedCrypt);
      }
    }
  };

  React.useEffect(() => {
    const getQuantityCurrentCard = (
      id: string,
      cardType: 'library' | 'crypt'
    ): number => {
      const response: ListType | undefined =
        cardType === 'library'
          ? deck.library.find((elem: ListType) => elem.id === id)
          : deck.crypt.find((elem: ListType) => elem.id === id);
      if (response) {
        return response.quantity;
      } else return 0;
    };
    const buildExtendedData = (
      list: LibraryType[] | CryptType[],
      cardType: CardType
    ) => {
      if (list) {
        const newData: ExtendedDeckType[] = list?.map(
          (elem: LibraryType | CryptType) => {
            return {
              data: elem,
              quantity: getQuantityCurrentCard(elem.id.toString(), cardType),
              cardType: cardType,
            };
          }
        );
        if (cardType === 'library') {
          setExtendedLibrary(newData);
        }
        if (cardType === 'crypt') {
          setExtendedCrypt(newData);
        }
      }
    };
    const fetchLibraryData = async () => {
      const fetchArray = await deck?.library?.map((elem) =>
        fetchSelectedCard(elem.id, 'library')
      );
      const resultPromisePromise = await Promise.all<any>(fetchArray);
      const result = await resultPromisePromise;

      if (result) {
        buildExtendedData(result, 'library');
      }
    };
    fetchLibraryData();
    const fetchCryptData = async () => {
      const fetchArray: Promise<any>[] = await deck?.crypt?.map((elem) =>
        fetchSelectedCard(elem.id, 'crypt')
      );
      const resultPromisePromise = await Promise.all<any>(fetchArray);
      const result = await resultPromisePromise;

      if (result) {
        buildExtendedData(result, 'crypt');
      }
    };
    fetchCryptData();
  }, [deck]);

  return (
    <Box className='deck'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: HEADER_COLOR,
        }}
      >
        <Typography variant='h6'>Deck</Typography>
      </Box>
      <Box className='deck__crypt'>
        <Box
          sx={{
            width: '100',
            backgroundColor: HEADER_COLOR,
            borderBottom: '3px solid darkcyan',
            paddingLeft: '1rem',
            paddingRight:'1rem',
            borderTop: '1px solid darkcyan',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='subtitle1'>Crypt</Typography>
          <Typography variant='subtitle1'>{extendedCrypt.length}</Typography>
        </Box>
        <DeckCryptComponent
          data={extendedCrypt}
          updateQuantity={(
            newQuantity: number,
            id: number,
            cardType: CardType
          ) => updateQuantity(newQuantity, id, cardType)}
          handleRemoveCard={(id: number, cardType: CardType) =>
            handleRemoveCard(id, cardType)
          }
        />
      </Box>
      <Box className='deck__library'>
        <Typography
          variant='subtitle1'
          sx={{
            backgroundColor: HEADER_COLOR,
            paddingLeft: '1rem',
            borderBottom: '3px solid darkcyan',
            borderTop: '3px solid darkcyan',
          }}
        >
          Library
        </Typography>
        {/* <DeckComponent
          data={extendedLibrary}
          updateQuantity={(
            newQuantity: number,
            id: number,
            cardType: CardType
          ) => updateQuantity(newQuantity, id, cardType)}
          handleRemoveCard={(id:number,cardType:CardType)=>handleRemoveCard(id,cardType)}
        /> */}
      </Box>
    </Box>
  );
};
export default DeckListComponent;
