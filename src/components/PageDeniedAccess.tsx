import './PageDeniedAccess.css';

import { Box, Link, Typography } from '@mui/material';

import { Container } from '@mui/system';
import React from 'react';

function PageDeniedAccess() {
  const imgURL =
      'https://usercontent.one/wp/www.blackchantry.com/wp-content/uploads/2020/04/Erica-Danell-VTES-SchreckNET.jpg';
  const homeURL = 'http://localhost:3000';
  
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography color='error' variant='h3'>
        Access Denied
      </Typography>
      <Typography align='center' color='primary' variant='body1'>
        You do not have enough privileges to enter this site.
        <br />
        Please go back to our{' '}
        <Link color='secondary' href={homeURL}>
          Home page
        </Link>
        , thank you. <br />
        Kind regards, <br />
        Schreck.net
      </Typography>
      <Box>
        <img className='denied__access__image' src={imgURL} alt='schrecknet' />
      </Box>
    </Container>
  );
}

export default PageDeniedAccess;
