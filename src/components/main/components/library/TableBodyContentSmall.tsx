import {
  Avatar,
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import {
  getBurnOption,
  getCardCost,
  getCardTypesIcon,
  getClanIcon,
  getDiscIcon,
} from '../../../../util';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { CardType } from '../../../../types/deck_type';
import { CryptType } from '../../../../types/crypt_type';
import { LibraryType } from '../../../../types/library_type';
import React from 'react';
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

const TableBodyContentSmall = (props: Props) => {
  const { handleAddCardToDeck, handleItemToOpen, items, deckMode } = props;

  return (
    <TableBody sx={{ display: 'inline-block', width: '100%' }}>
      {items.map((library) => (
        <TableRow
          key={uuidv4()}
          hover
          sx={{
            display: 'inline-block',
            borderBottom: '2px solid',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {deckMode ? (
              <TableCell sx={{ display: 'flex',m:'0',p:'0' }}>
                <Box sx={{ display: 'flex', p: '0' }}>
                  <IconButton
                    onClick={(e) => handleAddCardToDeck(library, 'library')}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                </Box>
              </TableCell>
            ) : null}
            <TableCell
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
                minWidth: '90%',
                marginRight:'1rem',
              }}
              onClick={() => handleItemToOpen(library)}
            >
              <Box
                id='data'
                sx={{
                  display: 'flex',
                  flexDirection:'row',
                  gap: '1rem',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom:'0.5rem',
                }}
              >
                <Box sx={{display:'flex'}}>
                  {getCardTypesIcon(library.types).map(
                    (type: string, index: number) => (
                      <Avatar
                        sx={{ backgroundColor: 'white' }}
                        variant='rounded'
                        key={uuidv4()}
                        src={type}
                        alt={type}
                      />
                    )
                  )}
                </Box>
                <Typography color='secondary'>{library.name}</Typography>
              </Box>
              <Box id='requirements' sx={{display:'flex',justifyContent:'center',gap:'0.5rem'}}>
                <Box>
                  {library.burn_option ? (
                    <Avatar
                      sx={{ backgroundColor: 'white' }}
                      variant='rounded'
                      src={getBurnOption()}
                      alt='Burn option'
                    />
                  ) : null}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.2rem',
                  }}
                >
                  {library.disciplines
                    ? getDiscIcon(library.disciplines).map(
                        (disc: string, index: number) => (
                          <Avatar
                            key={uuidv4()}
                            sx={{ backgroundColor: 'white' }}
                            variant='rounded'
                            src={disc}
                            alt={disc}
                          />
                        )
                      )
                    : null}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap:'0.5rem' }}>
                  {library.clans
                    ? getClanIcon(library.clans).map(
                        (clan: string, index: number) => (
                          <Avatar
                            sx={{ backgroundColor: 'white' }}
                            variant='rounded'
                            key={uuidv4()}
                            src={clan}
                            alt={clan}
                          />
                        )
                      )
                    : null}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                </Box>
              </Box>
            </TableCell>
          </Box>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyContentSmall;
