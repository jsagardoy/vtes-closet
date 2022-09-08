import { Box, Container, Typography } from '@mui/material';
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
import DeckCryptComponent from './DeckCryptComponent';
import DeckLibraryComponent from './DeckLibraryComponent';

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

  const [cryptSizeError, setCryptSizeError] = React.useState<boolean>(false);
  const [cryptGroupError, setCryptGroupError] = React.useState<boolean>(false);
  const [cryptBannedError, setCryptBannedError] =
    React.useState<boolean>(false);
  const [librarySizeError, setLibrarySizeError] =
    React.useState<boolean>(false);
  const [libraryExceededSizeError, setLibraryExceededSizeError] =
    React.useState<boolean>(false);
  const [libraryBannedError, setLibraryBannedError] =
    React.useState<boolean>(false);

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

  const calculateLibrary = (): number => {
    const quantity = extendedLibrary.map((elem) => elem.quantity);
    return quantity.length > 0 ? quantity.reduce((acum, a) => acum + a) : 0;
  };

  const calculateCrypt = (): number => {
    const quantity = extendedCrypt.map((elem) => elem.quantity);
    return quantity.length > 0 ? quantity.reduce((acum, a) => acum + a) : 0;
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
  //Validates deckLibrary when changes in the list
  React.useEffect(() => {
    const validateDeckLibrarySize = () => {
      if (calculateLibrary() < 60) {
        setLibrarySizeError(true);
      } else {
        setLibrarySizeError(false);
      }
    };

    const validateDeckLibraryExceededSize = () => {
      if (calculateLibrary() > 90) {
        setLibraryExceededSizeError(true);
      } else {
        setLibraryExceededSizeError(false);
      }
    };

    const validateDeckBannedLibrary = () => {
      if (
        extendedLibrary.map((elem) => elem.data).find((elem) => elem.banned)
      ) {
        setLibraryBannedError(true);
      } else {
        setLibraryBannedError(false);
      }
    };
    validateDeckLibrarySize();
    validateDeckBannedLibrary();
    validateDeckLibraryExceededSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extendedLibrary]);

  //Validates deckCrypt when changes in the list
  React.useEffect(() => {
    const validateDeckBannedCrypt = () => {
      if (extendedCrypt.map((elem) => elem.data).find((elem) => elem.banned)) {
        setCryptBannedError(true);
      } else {
        setCryptBannedError(false);
      }
    };
    const validateDeckCryptSize = (): void => {
      if (calculateCrypt() < 12) {
        setCryptSizeError(true);
      } else setCryptSizeError(false);
    };
    const validateDeckCrytptGroups = (): void => {
      const cryptList = extendedCrypt.map((elem) => elem.data as CryptType);
      const groupList: number[] = cryptList.map((elem) => Number(elem.group));
      const setGroup = new Set(groupList);
      const newArray: number[] = Array.from(setGroup);
      const max = Math.max(...newArray);
      const min = Math.min(...newArray);
      if (max - min > 1) {
        setCryptGroupError(true);
      } else {
        setCryptGroupError(false);
      }
    };
    validateDeckCryptSize();
    validateDeckCrytptGroups();
    validateDeckBannedCrypt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extendedCrypt]);

  return (
    <Container className='deck'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h6'>Deck</Typography>
      </Box>
      <Box className='deck__crypt'>
        <Box
          sx={{
            width: '100',
            borderTop: '3px solid',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='subtitle1'>Crypt</Typography>
          <Typography variant='subtitle1'>{calculateCrypt()}</Typography>
        </Box>
        <Box>
          {cryptSizeError ? (
            <Typography
              sx={{
                color: 'red',
                fontSize: 'smaller',
              }}
            >
              The crypt must contain at least 12 crypt cards
            </Typography>
          ) : null}
          {cryptGroupError ? (
            <Typography
              sx={{
                color: 'red',
                fontSize: 'smaller',
              }}
            >
              Invalid groups. Groups must be consecutives.
            </Typography>
          ) : null}
          {cryptBannedError ? (
            <Typography
              sx={{
                color: 'red',
                fontSize: 'smaller',
              }}
            >
              Your crypt contains a banned card.
            </Typography>
          ) : null}
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
      <Box
        sx={{
          width: '100',

          borderTop: '3px solid',
          paddingLeft: '1rem',
          paddingRight: '1rem',

          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='subtitle1'>Library</Typography>
        <Typography variant='subtitle1'>{calculateLibrary()}</Typography>
      </Box>
      <Box>
        {librarySizeError ? (
          <Typography
            sx={{
              color: 'red',
              fontSize: 'smaller',
            }}
          >
            The library must contain at least 60 library cards.
          </Typography>
        ) : null}
        {libraryExceededSizeError ? (
          <Typography
            sx={{
              color: 'red',
              fontSize: 'smaller',
            }}
          >
            The library exceeded the 90 library cards limitation.
          </Typography>
        ) : null}
        {libraryBannedError ? (
          <Typography
            sx={{
              color: 'red',
              fontSize: 'smaller',
            }}
          >
            Your library contains at least one banned card.
          </Typography>
        ) : null}
      </Box>
      <DeckLibraryComponent
        data={extendedLibrary}
        updateQuantity={(newQuantity: number, id: number, cardType: CardType) =>
          updateQuantity(newQuantity, id, cardType)
        }
        handleRemoveCard={(id: number, cardType: CardType) =>
          handleRemoveCard(id, cardType)
        }
      />
    </Container>
  );
};
export default DeckListComponent;
