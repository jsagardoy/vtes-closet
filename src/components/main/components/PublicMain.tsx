import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import React from 'react';
import './content.css';

const PublicMain: React.FC = () => (
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
        <Button style={{ color: 'darkcyan' }} size='small'>
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
        <Button style={{ color: 'darkcyan' }} size='small'>
          Show
        </Button>
      </CardActions>
    </Card>
  </div>
);

export default PublicMain;
