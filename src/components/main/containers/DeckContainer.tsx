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
    crypt: [{ id: '', quantity: 0 }],
    library: [{ id: '', quantity: 0 }],
  };

  const { userId, deckId }: any = useParams();
  const [deck, setDeck] = React.useState<DeckType>(initialDeck);

  const handleChange = (field: string, value: string | Archetype) => {
    setDeck({ ...deck, [field]: value });
  };

  React.useEffect(() => {
    fetchSelectedDeck(userId, deckId).then((data) => setDeck(data[0].data()));
  }, [deckId, userId, setDeck]);

  return (
    <div className='container'>
      <DeckInfoComponent
        deck={deck}
        handleChange={(field: string, value: string | Archetype) =>
          handleChange(field, value)
        }
      />
      <div className='deck__container'>
          <DeckListComponent deck={deck}/>
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
