import {
  Avatar,
  Box,
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

import InventoryLibrary from './InventoryLibrary';
import React from 'react';
import { libraryInventoryType } from '../../../../types/inventory_type';
import { uuidv4 } from '@firebase/util';

interface Props {
  items: libraryInventoryType[];
  handleItemToOpen: (card: libraryInventoryType) => void;
  updateInventory: (card: libraryInventoryType) => void;
}

const TableBodyContentIventory = (props: Props) => {
  const { handleItemToOpen, items, updateInventory } = props;

  return (
    <TableBody>
      {items.map((library) => (
        <TableRow key={uuidv4()} hover>
          <TableCell align='center'>
            <InventoryLibrary
              card={library}
              updateInventory={(library: libraryInventoryType) =>
                updateInventory(library)
              }
            />
          </TableCell>
          <TableCell align='center' onClick={() => handleItemToOpen(library)}>
            <Typography color='secondary'>{library.name}</Typography>
          </TableCell>
          <TableCell align='center' onClick={() => handleItemToOpen(library)}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
          </TableCell>
          <TableCell align='center' onClick={() => handleItemToOpen(library)}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {library.burn_option ? (
                <Avatar
                  sx={{ backgroundColor: 'white' }}
                  variant='rounded'
                  src={getBurnOption()}
                  alt='Burn option'
                />
              ) : null}
            </Box>
          </TableCell>
          <TableCell
            sx={{ flexDirection: 'row' }}
            onClick={() => handleItemToOpen(library)}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}
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
          </TableCell>
          <TableCell align='center' onClick={() => handleItemToOpen(library)}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
          </TableCell>
          <TableCell align='center' onClick={() => handleItemToOpen(library)}>
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
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyContentIventory;
