import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchSelectedDeck } from '../../../service/fetchSelectedDeck';
import { Archetype, DeckType } from '../../../types/deck_type';
import DeckInfoComponent from '../components/deck/DeckInfoComponent';
import DeckListComponent from '../components/deck/DeckListComponent';
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
        <DeckListComponent deck={deckData} />
        <div className='search__container'>
          Search Container
          <div className='crypt__search'>crypt</div>
          <div className='library__search'>library</div>
        </div>
      </div>
    </div>
  );
};

export default DeckContainer;
