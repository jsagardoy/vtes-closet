import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Avatar,
  Box,
  Tooltip,
} from '@mui/material';
import { CryptType } from '../../../../types/crypt_type';
import { CardType } from '../../../../types/deck_type';
import { uuidv4 } from '@firebase/util';
import { getDiscIcon, getClanIcon, getCleanedName } from '../../../../util';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

interface Props {
  items: CryptType[];
  deckMode: boolean;
  handleAddCardToDeck: (card: CryptType, cardType: CardType) => void;
  handleItemToOpen: (crypt: CryptType) => void;
}

const TableBodyContentCrypt = (props: Props) => {
  const { handleAddCardToDeck, handleItemToOpen, items, deckMode } = props;

  return (
    <TableBody>
      {items.map((crypt) => (
        <TableRow key={uuidv4()} hover>
          {deckMode ? (
            <TableCell>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                  onClick={(e) => handleAddCardToDeck(crypt, 'crypt')}
                >
                  <AddCircleRoundedIcon />
                </IconButton>
              </Box>
            </TableCell>
          ) : null}

          <TableCell align='center' onClick={() => handleItemToOpen(crypt)}>
            <Typography color='primary'>{getCleanedName(crypt.name)}</Typography>
            <Typography color='secondary'>Group {crypt.group}</Typography>
          </TableCell>

          <TableCell id='clan' onClick={() => handleItemToOpen(crypt)}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {crypt.clans
                ? getClanIcon(crypt.clans).map(
                
                  (clan: string, index: number) => (
                     <Tooltip title={crypt.clans[index]}>
                      <Avatar
                        key={uuidv4()}
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

export default TableBodyContentCrypt;
