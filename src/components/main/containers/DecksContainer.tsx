import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import './DecksContainer.css';

const DecksContainer = () => {
  /* <div className='deck__container'>
      <div className='containers'>
        <div className='headers'>decks</div>
        <div className='content'>
          <div>crypt</div>
          <div>library</div>
        </div>
      </div>
      <div className='containers'>
        <div className='headers'>Search area</div>
        <div className='content'>
          <div>content</div>
        </div>
      </div>
    </div> */
  const response = (
    <div className='decks__container'>
      <div className='decks__title'>
        <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
          Decks List
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table size='small' aria-label='Decks list'>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: 'darkcyan', fontWeight: 'bold' }}
                align='left'
              >
                #
              </TableCell>
              <TableCell
                sx={{ color: 'darkcyan', fontWeight: 'bold' }}
                align='left'
              >
                Deck name
              </TableCell>
              <TableCell
                sx={{ color: 'darkcyan', fontWeight: 'bold' }}
                variant='head'
                align='left'
              >
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ color: 'darkcyan' }}>1</TableCell>
              <TableCell sx={{ color: 'darkcyan' }}>Nombre mazo</TableCell>
              <TableCell sx={{ color: 'darkcyan' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return response;
};
export default DecksContainer;
