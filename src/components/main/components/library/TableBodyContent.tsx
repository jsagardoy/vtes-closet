import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import React from 'react';
import {
  getCardTypesIcon,
  getBurnOption,
  getDiscIcon,
  getClanIcon,
  getCardCost,
} from '../../../../util';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { CryptType } from '../../../../types/crypt_type';
import { CardType } from '../../../../types/deck_type';
import { LibraryType } from '../../../../types/library_type';
import { uuidv4 } from '@firebase/util';
interface Props {
  items: LibraryType[];
  deckMode: boolean;
  handleAddCardToDeck: (
    card: CryptType | LibraryType,
    cardType: CardType
  ) => void;
  handleItemToOpen: (library: LibraryType) => void;
}

const TableBodyContent = (props: Props) => {
  const { handleAddCardToDeck, handleItemToOpen, items, deckMode } = props;
  
  return (
    <TableBody >
      {items.map((library) => (
        <TableRow key={uuidv4()}>
          {deckMode ? (
            <TableCell align='center'>
              <IconButton
                onClick={(e) => handleAddCardToDeck(library, 'library')}
              >
                <AddCircleRoundedIcon />
              </IconButton>
            </TableCell>
          ) : null}
          <TableCell align='center' onClick={() => handleItemToOpen(library)}>
            <Typography color='secondary'>{library.name}</Typography>
          </TableCell>
          <TableCell align='center'>
            {getCardTypesIcon(library.types).map(
              (type: string, index: number) => (
                <ListItemAvatar
                  className='list__avatar__icons'
                  key={library.id && type}
                >
                  <Avatar
                    sx={{ backgroundColor: 'white' }}
                    variant='rounded'
                    key={type && library.id && index}
                    src={type}
                    alt={type}
                  />
                </ListItemAvatar>
              )
            )}
          </TableCell>

          <TableCell align='center'>
            {library.burn_option ? (
              <Avatar
                sx={{ backgroundColor: 'white' }}
                variant='rounded'
                src={getBurnOption()}
                alt='Burn option'
              />
            ) : null}
          </TableCell>
          <TableCell sx={{ flexDirection: 'row' }}>
            {library.disciplines
              ? getDiscIcon(library.disciplines).map(
                  (disc: string, index: number) => (
                    <ListItemAvatar
                      className='list__avatar__icons'
                      key={library.id && disc}
                    >
                      <Avatar
                        sx={{ backgroundColor: 'white' }}
                        variant='rounded'
                        src={disc}
                        alt={disc}
                      />
                    </ListItemAvatar>
                  )
                )
              : null}
          </TableCell>
          <TableCell align='center'>
            {library.clans
              ? getClanIcon(library.clans).map(
                  (clan: string, index: number) => (
                    <ListItemAvatar
                      className='list__avatar__icons'
                      key={library.id && clan}
                    >
                      <Avatar
                        sx={{ backgroundColor: 'white' }}
                        variant='rounded'
                        key={clan && library.id && index}
                        src={clan}
                        alt={clan}
                      />
                    </ListItemAvatar>
                  )
                )
              : null}
          </TableCell>
          <TableCell align='center'>
            {library.blood_cost || library.pool_cost ? (
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
              ) : null
            ) : null}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyContent;
