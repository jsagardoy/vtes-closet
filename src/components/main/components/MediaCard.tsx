import { Button, Card, CardActions, CardMedia } from '@mui/material';
import { useHistory } from 'react-router-dom';

interface Props {
  title: string;
  imageCardType: 'library' | 'crypt' | 'deck';
}

const MediaCard = (props: Props) => {
  const { title, imageCardType: cardType } = props;
  const history: any = useHistory();
  const cryptURL = 'https://static.krcg.org/card/cardbackcrypt.jpg';
  const libraryURL = 'https://static.krcg.org/card/cardbacklibrary.jpg';
  const deckURL = 'https://static.krcg.org/card/cardbacktoken.jpg';

  const handleGoToCrypt = () => {
    history.push('/crypt');
  };
  const handleGoToLibrary = () => {
    history.push('/library');
  };

  return (
    <Card
      className='card'
      sx={{
        padding: '1rem',
        backgroundColor: 'black',
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
          style={{ color: 'darkcyan' }}
          size='small'
          onClick={() => {
            if (title.toLowerCase() === 'crypt') {
              handleGoToCrypt();
            }
            if (title.toLowerCase() === 'library') {
              handleGoToLibrary();
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
