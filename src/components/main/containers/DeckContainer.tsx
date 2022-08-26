import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchSelectedDeck } from '../../../service/fetchSelectedDeck';
import { updateDeckService } from '../../../service/updateDeckService';
import { CryptType } from '../../../types/crypt_type';
import {
  CardType,
  DeckType,
  ExtendedDeckType,
  ListType,
} from '../../../types/deck_type';
import { LibraryType } from '../../../types/library_type';
import DeckInfoComponent from '../components/deck/DeckInfoComponent';
import DeckListComponent from '../components/deck/DeckListComponent';
import SearchDeckContainer from '../components/deck/searchDeckCards/SearchDeckContainer';
import './deck.css';
const DeckContainer = () => {
  const initialDeck: DeckType = {
    id: '',
    name: '',
    description: '',
    deckType: 'undefined',
    crypt: [],
    library: [],
  };

  const { userId, deckId }: any = useParams();
  const [deckData, setDeckData] = React.useState<DeckType>(
    initialDeck as DeckType
  );
  
/*   const handleChange = (field: string, value: string | Archetype) => {
    const newDeck:DeckType = { ...deckData, [field]: value };
    setDeckData(newDeck);
  }; */

  const handleSaveDataInfo = (deck:DeckType) => {
    updateDeckService(deck);
   }
  /*  const getExtendedCard = (
    card: CryptType | LibraryType,
    cardType: CardType,
    quantity: number
  ): ExtendedDeckType => {
    return { data: card, quantity: quantity, cardType: cardType };
  }; */

  const updateDeck = (
    library: ExtendedDeckType[],
    crypt: ExtendedDeckType[]
  ) => {
    const newLibrary: ListType[] = library.map((elem: ExtendedDeckType) => ({
      id: elem.data.id.toString(),
      quantity: elem.quantity,
    }));

    const newCrypt: ListType[] = crypt.map((elem: ExtendedDeckType) => ({
      id: elem.data.id.toString(),
      quantity: elem.quantity,
    }));

    const newDeck: DeckType = {
      ...deckData,
      library: newLibrary,
      crypt: newCrypt,
    };
    updateDeckService(newDeck);
    setDeckData(newDeck);
  };

  const handleAddCardToDeck = (
    card: CryptType | LibraryType,
    cardType: CardType
  ) => {
    if (cardType === 'crypt') {
      const index = deckData.crypt.findIndex(
        (crypt: ListType) => crypt.id === card.id.toString()
      );

      if (index === -1) {
        const newCryptElem: ListType = { id: card.id.toString(), quantity: 1 };
        const newCryptList: ListType[] = [...deckData.crypt, newCryptElem];
        const newDeck: DeckType = { ...deckData, crypt: newCryptList };
        updateDeckService(newDeck);
        setDeckData({...newDeck});
      } else {
        const list = [...deckData.crypt];
        const newCrypt:ListType[] = list.map((elem:ListType) => {
          if (elem.id === card.id.toString()) {
            return {id:card.id.toString(),quantity:elem.quantity+1}
          }
          return elem;
        })
        const newDeck: DeckType = { ...deckData, crypt: newCrypt }
        updateDeckService(newDeck);
        setDeckData({ ...newDeck });
      }
    }

    if (cardType === 'library') {
      const index = deckData.library.findIndex(
        (library: ListType) => library.id === card.id.toString()
      );

      if (index === -1) {
        const newLibraryElem: ListType = { id: card.id.toString(), quantity: 1 };
        const newLibraryList: ListType[] = [...deckData.library, newLibraryElem];
        const newDeck: DeckType = { ...deckData, library: newLibraryList };
        updateDeckService(newDeck);
        setDeckData({...newDeck});
      } else {
        const list = [...deckData.library];
        const newLibrary: ListType[] = list.map((elem: ListType) => {
          if (elem.id === card.id.toString()) {
            return { id: card.id.toString(), quantity: elem.quantity + 1 };
          }
          return elem;
        });
        const newDeck: DeckType = { ...deckData, library: newLibrary };
        updateDeckService(newDeck);
        setDeckData({ ...newDeck });
      }
    }
  };

  const handleRemoveCard = (id: number, cardType: CardType) => {
    if (cardType === 'crypt') {
        const newList: ListType[] = [...deckData.crypt.filter((elem)=>elem.id!==id.toString())];
        const newDeck:DeckType = {...deckData, crypt: newList };
        updateDeckService(newDeck);
        setDeckData({...newDeck});
    }

    if (cardType === 'library') {
      const newList: ListType[] = [
        ...deckData.library.filter((elem) => elem.id !== id.toString()),
      ];
      const newDeck: DeckType = { ...deckData, library: newList };
      updateDeckService(newDeck);
      setDeckData({ ...newDeck });
    }
  };

  React.useEffect(() => {
    const fetchDecks = async () => {
      const result = await fetchSelectedDeck(userId, deckId);
      setDeckData(result);
    };
    fetchDecks();
  }, [deckId, userId]);

  return (
    <div className='container'>
      <DeckInfoComponent
        deck={deckData}
        handleSaveDataInfo={handleSaveDataInfo}
      />
      <div className='deck__container'>
        
        <DeckListComponent
          deck={deckData}
          updateDeck={(
            library: ExtendedDeckType[],
            crypt: ExtendedDeckType[]
          ) => updateDeck(library, crypt)}
          handleRemoveCard={(id:number, cardType:CardType)=>handleRemoveCard(id, cardType)}
        />
        <div className='search__container'>
          <SearchDeckContainer
            handleAddCardToDeck={(
              card: LibraryType | CryptType,
              cardType: CardType
            ) => handleAddCardToDeck(card, cardType)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeckContainer;
