import { Box, Typography } from '@mui/material';
import React from 'react';
import { DeckType } from '../../../../types/deck_type';
import { HEADER_COLOR } from '../../../../util/helpFunction';

interface Props {
  deck: DeckType;
}

const DeckListComponent = (props: Props) => {
  const { deck } = props;
  return (
    <Box className='deck'>
      <Box sx={{display: 'flex', justifyContent:'center', backgroundColor: HEADER_COLOR }}>
        <Typography variant='h6'>Deck</Typography>
      </Box>
      <Box className='deck__crypt'>
        <Typography variant='subtitle1'>Crypt</Typography>
        {/* TODO: Componente genérico para cargar los datos tanto para crypt como para librería */}
      </Box>
      <Box className='deck__library'>
        <Typography variant='subtitle1'>Library</Typography>
        {/* TODO: incluir la librería */}
      </Box>
    </Box>
  );
};
export default DeckListComponent;
