import { Box } from '@mui/material';
import React from 'react';
import './PageDeniedAccess.css';

function PageDeniedAccess() {
  const imgURL =
      'https://usercontent.one/wp/www.blackchantry.com/wp-content/uploads/2020/04/Erica-Danell-VTES-SchreckNET.jpg';
  const homeURL = 'http://localhost:3000';
  
  return (
    <Box className='page__denied__access'>
      <h1 className='denied__access__title'>Access Denied </h1>
      <span className='denied__access__span'>
              You do not have enough privileges to enter this site.<br />
              Please go back to our <a href={homeURL}>home page</a>. <br />
              Thank you.<br/>
              Kind regards, Schreck.net<br/>
      </span>
          <img
              className='denied__access__image'
        src= {imgURL}
        alt='schrecknet'
      />
    </Box>
  );
}

export default PageDeniedAccess;
