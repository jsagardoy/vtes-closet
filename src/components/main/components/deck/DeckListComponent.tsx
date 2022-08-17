import { Box, Typography } from '@mui/material';
import React from 'react';
import { fetchSelectedCard } from '../../../../service/fetchSelectedCard';
import { CryptType } from '../../../../types/crypt_type';
import {
  DeckType,
  ExtendedDeckType,
  ListType,
} from '../../../../types/deck_type';
import { LibraryType } from '../../../../types/library_type';
import { HEADER_COLOR } from '../../../../util/helpFunction';
import DeckComponent from './DeckComponent';

interface Props {
  deck: DeckType;
}

const DeckListComponent = (props: Props) => {
  const { deck } = props;
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
      selectedItem = extendedLibrary.find(
        (elem: ExtendedDeckType) => elem.data.id === id
      );
    }

    if (selectedItem) {
      const newItem: ExtendedDeckType = { ...selectedItem, quantity: newValue };
      if (cardType === 'library') {
        const newExtendedLibrary: ExtendedDeckType[] = extendedLibrary.map(
          (elem) => (elem.data.id === id ? newItem : elem)
        );
        setExtendedLibrary(newExtendedLibrary);
      }

      if (cardType === 'crypt') {
        const newExtendedCrypt: ExtendedDeckType[] = extendedCrypt.map((elem) =>
          elem.data.id === id ? newItem : elem
        );
        setExtendedCrypt(newExtendedCrypt);
      }
      console.table(extendedLibrary);
    }
  };

  React.useEffect(() => {
    //console.log(JSON.stringify(deck));
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
      cardType: 'library' | 'crypt'
    ) => {
      const data: ExtendedDeckType[] = list?.map(
        (elem: LibraryType | CryptType) => {
          return {
            data: elem,
            quantity: getQuantityCurrentCard(elem.id.toString(), cardType),
            cardType: cardType,
          };
        }
      );
      if (cardType === 'library') {
        setExtendedLibrary(data);
      }
      if (cardType === 'crypt') {
        setExtendedCrypt(data);
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
      const fetchArray = await deck?.crypt?.map((elem) =>
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
        <Typography
          variant='subtitle1'
          sx={{
            backgroundColor: HEADER_COLOR,
            paddingLeft: '1rem',
            borderBottom: '3px solid darkcyan',
            borderTop: '1px solid darkcyan',
          }}
        >
          Crypt
        </Typography>
        <DeckComponent
          data={extendedCrypt}
          updateQuantity={updateQuantity}
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
        <DeckComponent
          data={extendedLibrary}
          updateQuantity={updateQuantity}
        />
      </Box>
    </Box>
  );
};
export default DeckListComponent;
