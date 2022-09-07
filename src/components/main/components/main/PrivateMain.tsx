import { Box } from '@mui/material';
import React from 'react';
import MediaCard from '../MediaCard';
import './content.css';

const PrivateMain: React.FC = () => (
  <Box className='main__content'>
    <MediaCard title='Crypt' imageCardType='crypt' />
    <MediaCard title='Library' imageCardType='library' />
    <MediaCard title='Collection - Crypt' imageCardType='crypt' />
    <MediaCard title='Collection - Library' imageCardType='library' />
    <MediaCard title='Decks' imageCardType='deck' />
  </Box>
);

export default PrivateMain;
