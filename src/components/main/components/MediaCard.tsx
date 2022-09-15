import { Button, Card, CardActions, CardMedia } from '@mui/material';

import { CardType } from '../../../types/deck_type';
import { getUserId } from '../../../util';
import { useHistory } from 'react-router-dom';

interface Props {
  title: string;
  imageCardType: CardType | 'deck';
}

const MediaCard = (props: Props) => { 
  const { title, imageCardType: cardType } = props;
  const history: any = useHistory();
  const cryptURL = 'https://static.krcg.org/card/cardbackcrypt.jpg';
  const libraryURL = 'https://static.krcg.org/card/cardbacklibrary.jpg';
  const deckURL = 'https://static.krcg.org/card/cardbacktoken.jpg';
  
  const userId = getUserId();

  const handleGoToCrypt = () => {
    history.push('/crypt');
  };
  const handleGoToLibrary = () => {
    history.push('/library');
  };

  const handleGoToCollectionCrypt = () => {
    history.push(`/private/${userId}/inventory/crypt`);
  };
  const handleGoToCollectionLibrary = () => {
    history.push(`/private/${userId}/inventory/library`);
  };
  const handleGoToDecks = () => {
    history.push(`/private/${userId}/decks`);
  };

  return (
    <Card
      className='card'
      sx={{
        padding: '1rem',
        borderRadius: '25px',
        paddingBottom: '0px',
      }}
    >
      <CardMedia
        component='img'
        height='80%'
        image={
          cardType === 'library'
            ? libraryURL
            : cardType === 'crypt'
            ? cryptURL
            : deckURL
        }
        alt='vtes crypt back'
      />
      <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          size='small'
          onClick={() => {
            if (title.toLowerCase() === 'crypt') {
              handleGoToCrypt();
            }
            if (title.toLowerCase() === 'library') {
              handleGoToLibrary();
            }
            if (title.toLowerCase() === 'Collection - Crypt'.toLowerCase()) {
              handleGoToCollectionCrypt();
            }
            if (title.toLowerCase() === 'Collection - Library'.toLowerCase()) {
              handleGoToCollectionLibrary();
            }
            if (title.toLowerCase() === 'Decks'.toLowerCase()) {
              handleGoToDecks();
            }
          }}
        >
          {title}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
