import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './content.css';


const PublicMain = () => {
  const history: any = useHistory();
    
  const handleGoToCrypt = () => {
    history.push('/crypt');
  };
  const handleGoToLibrary = () => {
    history.push('/library');
  };

  return (
    <div className='main__content'>
      <Card
        className='card'
        style={{ backgroundColor: 'black', borderRadius: '25px' }}
      >
        <CardMedia
          component='img'
          height='140'
          image='https://static.krcg.org/card/cardbackcrypt.jpg '
          alt='vtes crypt back'
        />
        <CardContent>
          <Typography className='card__typography' variant='h6' component='div'>
            Crypt
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{ color: 'darkcyan' }}
            size='small'
            onClick={() => handleGoToCrypt()}
          >
            Show
          </Button>
        </CardActions>
      </Card>
      <Card
        className='card'
        style={{ backgroundColor: 'black', borderRadius: '25px' }}
      >
        <CardMedia
          component='img'
          height='140'
          image='https://static.krcg.org/card/cardbacklibrary.jpg'
          alt='vtes library back'
        />
        <CardContent>
          <Typography className='card__typography' variant='h6' component='div'>
            Library
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{ color: 'darkcyan' }}
            size='small'
            onClick={() => handleGoToLibrary()}
          >
            Show
          </Button>
        </CardActions>
      </Card>
    </div>)
};

export default PublicMain;
