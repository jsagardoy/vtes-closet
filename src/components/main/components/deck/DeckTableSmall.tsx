import {
  Avatar,
  ListItemAvatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { CardType, ExtendedDeckType } from '../../../../types/deck_type';
import { getClanIcon, getDiscIcon } from '../../../../util';

import { Box } from '@mui/system';
import { CryptType } from '../../../../types/crypt_type';
import QuantityButtonComponent from './QuantityButtonComponent';
import React from 'react';

interface Props {
  list: ExtendedDeckType[] | null;
  sortBy: string;
  sortOrder: 'desc' | 'asc';
  createSortHandler: (key: string) => void;
  handleRemoveCard: (id: number, cardType: CardType) => void;
  updateQuantity: (newQuantity: number, id: number, cardType: CardType) => void;
  handleOpenModal: (elem: ExtendedDeckType, index: number) => void;
}

const DeckTableSmall = (props: Props) => {
  const {
    list,
    sortBy,
    sortOrder,
    createSortHandler,
    handleOpenModal,
    handleRemoveCard,
    updateQuantity,
  } = props;

  const getDisciplines = (discList: string[]) => (
    <Box className='list__left'>
      {getDiscIcon(discList).map((disc) => (
        <ListItemAvatar className='list__avatar__icons' key={disc}>
          <Avatar
            sx={{ backgroundColor: 'white' }}
            variant='rounded'
            src={disc}
            alt={disc}
          />
        </ListItemAvatar>
      ))}
    </Box>
  );
  const getClan = (crypt: CryptType) =>
    getClanIcon(crypt.clans).map((clan) => (
      <Avatar
        sx={{ backgroundColor: 'white' }}
        variant='rounded'
        className='clan__avatar__icon'
        key={clan}
        src={clan}
        alt={clan}
      />
    ));
  const getCapacity = (crypt: CryptType) => crypt.capacity;

  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ display: 'none' }}>
          <TableRow>
            <TableCell key={'quantity'} sx={{ textAlign: 'center' }}>
              <TableSortLabel
                active={sortBy === 'quantity'}
                direction={sortOrder}
                onClick={() => createSortHandler('quantity')}
              >
                Quantity
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Clan</TableCell>
            <TableCell key={'name'} sx={{ textAlign: 'center' }}>
              <TableSortLabel
                active={sortBy === 'name'}
                direction={sortOrder}
                onClick={() => createSortHandler('name')}
              >
                Card name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Group</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Disciplines</TableCell>
            <TableCell key={'capacity'} sx={{ textAlign: 'center' }}>
              <TableSortLabel
                active={sortBy === 'capacity'}
                direction={sortOrder}
                onClick={() => createSortHandler('capacity')}
              >
                Capacity
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ width: '100%' }}>
          {list?.map((elem: ExtendedDeckType, index: number) => (
            <TableRow
              key={elem.data.id}
              sx={{
                display: 'inline-block',
                width: '100%',
                borderBottom: '2px solid',
              }}
            >
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <QuantityButtonComponent
                  handleRemoveCard={(id: number, cardType: CardType) =>
                    handleRemoveCard(id, cardType)
                  }
                  initialQuantity={elem.quantity}
                  id={elem.data.id}
                  updateQuantity={(
                    newQuantity: number,
                    id: number,
                    cardType: CardType
                  ) => updateQuantity(newQuantity, id, cardType)}
                  cardType={elem.cardType}
                />
              </TableCell>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onClick={() => handleOpenModal(elem, index)}
              >
                {elem.data.clans ? getClan(elem.data as CryptType) : null}
                <Typography
                  color='secondary'
                  onClick={() => handleOpenModal(elem, index)}
                  variant='body1'
                >
                  {elem.data.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    backgroundColor: 'darkred',
                    color: 'white',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='body1'>
                  {getCapacity(elem.data as CryptType)}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell
                sx={{ display: 'flex', justifyContent:'center' }}
                onClick={() => handleOpenModal(elem, index)}
              >
                <Box sx={{ justifyContent: 'center' }} className='list__left'>
                  {elem.data.disciplines
                    ? getDisciplines(elem.data.disciplines)
                    : null}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeckTableSmall;
