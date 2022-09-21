import {
  Avatar,
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { getClanIcon, getDiscIcon } from '../../../../util';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { CardType } from '../../../../types/deck_type';
import { CryptType } from '../../../../types/crypt_type';
import { uuidv4 } from '@firebase/util';

interface Props {
  items: CryptType[];
  deckMode: boolean;
  handleAddCardToDeck: (card: CryptType, cardType: CardType) => void;
  handleItemToOpen: (crypt: CryptType) => void;
}

const TableBodyContentCryptSmall = (props: Props) => {
  const { handleAddCardToDeck, handleItemToOpen, items, deckMode } = props;

  return (
    <TableBody sx={{ display: 'inline-block', width: '100%' }}>
      {items.map((crypt) => (
        <TableRow
          sx={{
            display: 'inline-block',
            width: '100%',
            borderBottom: '2px solid',
          }}
          key={uuidv4()}
          hover
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {deckMode ? (
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  minWidth: 'fit-content',
                  maxWidth: 'fit-content',
                  p: 0,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton
                    onClick={(e) => handleAddCardToDeck(crypt, 'crypt')}
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
                width: '100%',
                minWidth: '90%',
              }}
              onClick={() => handleItemToOpen(crypt)}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                >
                  {crypt.clans &&
                    getClanIcon(crypt.clans).map(
                      (clan: string, index: number) => (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                          }}
                        >
                          <Avatar
                            sx={{ backgroundColor: 'white' }}
                            variant='rounded'
                            src={clan}
                            alt={clan}
                          />
                        </Box>
                      )
                    )}
                  <Typography color='secondary' variant='body1'>
                    {crypt.name}
                  </Typography>
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
                    <Typography variant='body1'>{crypt.capacity}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      gap: '0.2rem',
                    }}
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
                </Box>
              </Box>
            </TableCell>
          </Box>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyContentCryptSmall;

