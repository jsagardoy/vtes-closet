import { Avatar, Box, ListItemAvatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { CardType, ExtendedDeckType } from '../../../../types/deck_type';
import { getBurnOption, getCardCost, getClanIcon, getCleanedName, getDiscIcon } from '../../../../util';

import { LibraryType } from '../../../../types/library_type';
import QuantityButtonComponent from './QuantityButtonComponent';
import React from 'react'
import { uuidv4 } from '@firebase/util';

interface Props {
  data: ExtendedDeckType[] | null;
  cardType: string;
  handleRemoveCard: (id: number, cardType: CardType) => void;
  updateQuantity: (newQuantity: number, id: number, cardType: CardType) => void;
  handleOpenModal: (elem: ExtendedDeckType, index: number) => void;
}

const DeckLibraryTable = (props: Props) => {
    const {data,cardType, handleRemoveCard,updateQuantity, handleOpenModal }=props;

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

    const getClanLibrary = (library: LibraryType) => {
      if (library && library.clans) {
        return getClanIcon(library.clans).map((clan) => (
          <Avatar
            sx={{ backgroundColor: 'white' }}
            variant='rounded'
            key={clan}
            src={clan}
            alt={clan}
          />
        ));
      }
    };

    const getBurn = (card: LibraryType) => {
      if (card.burn_option) {
        return card.burn_option ? (
          <Avatar
            sx={{ backgroundColor: 'white' }}
            variant='rounded'
            src={getBurnOption()}
            alt='Burn option'
          />
        ) : null;
      }
    };

    const getLibraryCost = (library: LibraryType) =>
      library.blood_cost ? (
        <Avatar
          sx={{ backgroundColor: 'white' }}
          variant='rounded'
          src={getCardCost(library.blood_cost, 'blood')}
          alt='Blood cost'
        />
      ) : library.pool_cost ? (
        <Avatar
          sx={{ backgroundColor: 'white' }}
          variant='rounded'
          src={getCardCost(library.pool_cost, 'pool')}
          alt='Pool cost'
        />
      ) : null;


    const tableHeadContent = (showLabel: boolean) => (
      <TableHead key={uuidv4()}>
        {showLabel ? (
          <TableRow>
            <TableCell sx={{ textAlign: 'center' }}>Quantity</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Card name</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Burn Option</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Disciplines</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Clan</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Cost</TableCell>
          </TableRow>
        ) : (
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        )}
      </TableHead>
    );

const tableBodyContent = (list: ExtendedDeckType[] | undefined) =>
  list ? (
    <TableBody key={uuidv4()}>
      {list?.map((elem: ExtendedDeckType, index: number) => (
        <TableRow
          key={elem.data.id}
          sx={{
            display: 'inline-block',
            width: '100%',
            borderBottom: '2px solid',
          }}
        >
          {/* quantity */}
          <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
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
          {/* Clan */}
          <TableCell
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              alignItems: 'center',
            }}
            onClick={() => handleOpenModal(elem, index)}
          >
            {/* Card Name */}
            <Typography color='secondary' variant='body1'>
              {getCleanedName(elem.data.name)}
            </Typography>
          </TableCell>
          {/* Burn option */}
          <TableCell
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap:'1rem',
            }}
          >
            {getClanLibrary(elem.data as LibraryType)}
            {getBurn(elem.data as LibraryType)}
            <Box>
              {elem.data.disciplines
                ? getDisciplines(elem.data.disciplines)
                : null}
            </Box>
            {getLibraryCost(elem.data as LibraryType)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  ) : null;

  return (
    <TableContainer>
      <Table key={uuidv4()}>
       {/*  {tableHeadContent(true)} */}
        {tableBodyContent(
          data
            ?.filter(
              (elem) => elem.data.types.toString() === cardType?.toString()
            )
            .sort((a: ExtendedDeckType, b: ExtendedDeckType) =>
              a.data.name.localeCompare(b.data.name)
            )
        )}
      </Table>
    </TableContainer>
  );
}

export default DeckLibraryTable