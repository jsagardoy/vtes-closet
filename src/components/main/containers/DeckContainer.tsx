import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchSelectedDeck } from '../../../service/fetchSelectedDeck';
import { updateDeckService } from '../../../service/updateDeckService';
import { CryptType } from '../../../types/crypt_type';
import {
  Archetype,
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

  const handleChange = (field: string, value: string | Archetype) => {
    setDeckData({ ...deckData, [field]: value });
  };

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
  };

  const handleAddCardToDeck = (
    card: CryptType | LibraryType,
    cardType: CardType
  ) => {
    console.log('estoy aquí');
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
        handleChange={(field: string, value: string | Archetype) =>
          handleChange(field, value)
        }
      />
      <div className='deck__container'>
        <DeckListComponent
          deck={deckData}
          updateDeck={(
            library: ExtendedDeckType[],
            crypt: ExtendedDeckType[]
          ) => updateDeck(library, crypt)}
        />
        <div className='search__container'>
          <SearchDeckContainer
            handleAddCardToDeck={(card:LibraryType|CryptType, cardType:CardType) => handleAddCardToDeck(card,cardType)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeckContainer;
