import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDecks } from '../../../service/fetchDecks';
import { DeckType } from '../../../types/deck_type';
import { getUserId } from '../../../util/helpFunction';
import { Spinner } from '../components/global/Spinner';
import './DecksContainer.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { uuidv4 } from '@firebase/util';
import { createNewDeck } from '../../../service/createNewDeck';
import { deleteDeck } from '../../../service/deleteDeck';

const DecksContainer = () => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [deckList, setDeckList] = React.useState<DeckType[]>([]);
  const history = useHistory();

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

  const handleRemoveDeck = (id: string) => {
    const newDekList: DeckType[] = deckList.filter(
      (elem: DeckType) => elem.id !== id
    );
    deleteDeck(id);
    setDeckList(newDekList);
  };

  const tableOfContent = (
    <TableContainer component={Paper}>
      <Table size='small' aria-label='Decks list'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }} align='left'>
              #
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align='left'>
              Deck name
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align='left'>
              Type
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} variant='head' align='left'>
              Description
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} variant='head' align='left'>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deckList.map((deck: DeckType, index: number) => (
            <TableRow key={index}>
              <TableCell
                onClick={() => {
                  handleSelectedDeck(deck.id);
                }}
                sx={{}}
              >
                {index + 1}
              </TableCell>
              <TableCell
                onClick={() => {
                  handleSelectedDeck(deck.id);
                }}
                sx={{}}
              >
                {deck.name}
              </TableCell>
              <TableCell
                onClick={() => {
                  handleSelectedDeck(deck.id);
                }}
                sx={{}}
              >
                {deck.deckType}
              </TableCell>
              <TableCell
                onClick={() => {
                  handleSelectedDeck(deck.id);
                }}
                sx={{}}
              >
                {deck.description}
              </TableCell>
              <TableCell sx={{}}>
                <IconButton onClick={() => handleRemoveDeck(deck.id)}>
                  <DeleteIcon />
                </IconButton>
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

  const handleCreateDeck = () => {
    const newDeck: DeckType = {
      id: uuidv4(),
      name: '',
      description: '',
      deckType: 'undefined',
      crypt: [],
      library: [],
    };
    createNewDeck(newDeck);
    setDeckList((prev) => [...prev, newDeck]);
    const userId = getUserId();
    history.push(`/private/${userId}/decks/${newDeck.id}`);
  };

  const titleStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const response = (
    <Box className='decks__container'>
      <Box sx={titleStyle}>
        <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
          Decks List
        </Typography>
      </Box>
      <IconButton sx={{}} onClick={() => handleCreateDeck()}>
        Create new deck <AddCircleIcon />
      </IconButton>
      {loader && <Spinner />}
      {deckList && deckList.length > 0 && tableOfContent}
      {(!deckList || deckList.length === 0) && !loader && (
        <Typography align='center' variant='h6'>
          No result
        </Typography>
      )}
    </Box>
  );

  return response;
};
export default DecksContainer;
