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
import { useHistory } from 'react-router-dom';
import { fetchDecks } from '../../../service/fetchDecks';
import { DeckType } from '../../../types/deck_type';
import { getUserId } from '../../../util/helpFunction';
import { Spinner } from '../components/global/Spinner';
import './DecksContainer.css';

const DecksContainer = () => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [deckList, setDeckList] = React.useState<DeckType[]>([]);
  const history = useHistory();
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

  React.useEffect(() => {
    setLoader(true);
    const uid = getUserId();
    if (uid) {
      fetchDecks(uid)
        .then((data: DeckType[]) => {
          if (data) {
            setDeckList(data);
            setLoader(false);
          } else {
            setLoader(false);
          }
        })
        .catch((error) => {
          setLoader(false);
        });
    }
    //si no hay valores para el usuario. Hay que implementar si ya tiene
  }, []);

  const tableOfContent = (
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
              align='left'
            >
              Type
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
          {deckList.map((deck: DeckType) => (
            <TableRow
              key={deck.id}
              onClick={() => {
                handleSelectedDeck(deck.id);
              }}
            >
              <TableCell sx={{ color: 'darkcyan' }}>{deck.id}</TableCell>
              <TableCell sx={{ color: 'darkcyan' }}>{deck.name}</TableCell>
              <TableCell sx={{ color: 'darkcyan' }}>{deck.deckType}</TableCell>
              <TableCell sx={{ color: 'darkcyan' }}>
                {deck.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const handleSelectedDeck = (id: string) => {
    const selectedDeck = deckList.find((elem: DeckType) => elem.id === id);
    if (selectedDeck) {
      const userId = getUserId();
      if (userId && id) {
        history.push(`/private/${userId}/decks/${id}`);
      }
    }
  };

  const response = (
    <div className='decks__container'>
      <div className='decks__title'>
        <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
          Decks List
        </Typography>
      </div>
      {loader && <Spinner />}
      {deckList && deckList.length > 0 && tableOfContent}
      {(!deckList || deckList.length === 0) && !loader && (
        <Typography align='center' variant='h6'>
          No result
        </Typography>
      )}
    </div>
  );

  return response;
};
export default DecksContainer;
