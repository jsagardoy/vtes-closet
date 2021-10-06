import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import React from 'react';

const PublicMain: React.FC = () => (
  <>
    <Card className='card'>
      <CardMedia
        component='img'
        height='140'
        image='https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Vtes_Tanlarge.gif/180px-Vtes_Tanlarge.gif'
        alt='vtes crypt back'
      />
      <CardContent>
        <Typography variant='h6' component='div'>
          Crypt
        </Typography>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='small'>Show Crypt</Button>
      </CardActions>
    </Card>
    <Card className='card'>
      <CardMedia
        component='img'
        height='140'
        image='https://assets.cardgamegeek.com/public/images/card_backs/vtes_back.jpg'
        alt='vtes library back'
      />
      <CardContent>
        <Typography variant='h6' component='div'>
          Library
        </Typography>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='small'>Show Library</Button>
      </CardActions>
    </Card>
  </>
);

export default PublicMain;
