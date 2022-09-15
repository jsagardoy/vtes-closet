import {
  Avatar,
  Box,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { getClanIcon, getCleanedName, getDiscIcon } from '../../../../util';

import InventoryCrypt from './InventoryCrypt';
import { cryptInventoryType } from '../../../../types/inventory_type';
import { uuidv4 } from '@firebase/util';

interface Props {
  items: cryptInventoryType[];
  handleItemToOpen: (card: cryptInventoryType) => void;
  updateInventory: (card: cryptInventoryType) => void;
}

const TableBodyContentCryptInventory = (props: Props) => {
  const { handleItemToOpen, items,updateInventory } = props;

  return (
    <TableBody>
      {items.map((crypt) => (
        <TableRow key={uuidv4()} hover>
          <TableCell align='center'>
            <InventoryCrypt
              card={crypt}
              updateInventory={(crypt: cryptInventoryType) =>
                updateInventory(crypt)
              }
            />
          </TableCell>

          <TableCell align='center' onClick={() => handleItemToOpen(crypt)}>
            <Typography color='primary'>
              {getCleanedName(crypt.name)}
            </Typography>
            <Typography color='secondary'>Group {crypt.group}</Typography>
          </TableCell>

          <TableCell id='clan' onClick={() => handleItemToOpen(crypt)}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {crypt.clans
                ? getClanIcon(crypt.clans).map(
                    (clan: string, index: number) => (
                      <Tooltip key={uuidv4()} title={crypt.clans[index]}>
                        <Avatar
                          sx={{ backgroundColor: 'white' }}
                          variant='rounded'
                          src={clan}
                          alt={clan}
                        />
                      </Tooltip>
                    )
                  )
                : null}
            </Box>
          </TableCell>

          <TableCell id='disciplines' onClick={() => handleItemToOpen(crypt)}>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}
            >
              {crypt.disciplines
                ? getDiscIcon(crypt.disciplines).map(
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

          <TableCell onClick={() => handleItemToOpen(crypt)}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                id='capacity'
                sx={{
                  display: 'flex',
                  backgroundColor: 'darkred',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  color: 'white',
                  p: 0,
                }}
              >
                {crypt.capacity}
              </Box>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyContentCryptInventory;
