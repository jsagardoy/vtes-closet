import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Archetype, DeckType, getArchetype } from '../../../../types/deck_type';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useHistory } from 'react-router-dom';
import { getUserId } from '../../../../util';

interface Props {
  handleSaveDataInfo: (selectedDeck: DeckType) => void;
  deck: DeckType;
}
const DeckInfoComponent = (props: Props) => {
  const { deck, handleSaveDataInfo } = props;
  const [selectedDeck, setSelectedDeck] = React.useState<DeckType>(deck);
  const history = useHistory();
  const handleChange = (field: string, value: string | Archetype) => {
    const newDeck: DeckType = { ...selectedDeck, [field]: value };
    setSelectedDeck(newDeck);
  };

  const [hideInfo, setHideInfo] = React.useState<boolean>(false);

  React.useEffect(() => {
    setSelectedDeck(deck);
  }, [deck]);

  const handleGoBack = () => {
    const uid = getUserId();
    history.push(`/private/${uid}/decks/`);
  };
  const handleHideInfo = () => {
    setHideInfo((prev) => !prev);
  };

  return (
    <Box>
      <FormControl className='info' fullWidth>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <IconButton onClick={() => handleGoBack()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ alignSelf: 'center' }} variant='h5'>
            Deck Info
          </Typography>
          <IconButton onClick={() => handleHideInfo()}>
            {hideInfo ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
        {hideInfo ?
          <Box sx={{width:'100%'}}>
            <TextField
              name='name'
              sx={{ m: 1, width: '98%' }}
              fullWidth
              variant='standard'
              label='Name'
              placeholder='Deck name'
              value={selectedDeck.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <TextField
              sx={{ m: 1, width: '98%' }}
              name='description'
              variant='standard'
              label='Description'
              placeholder='Description'
              value={selectedDeck.description}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <Box>
              <FormControl fullWidth>
                <InputLabel id='select-label'>Archetype</InputLabel>
                <Select
                  sx={{
                    m: 1,
                    width: 'maxContent',
                    border: '1px solid black',
                    justifyContent: 'flex-end',
                    textTransform: 'capitalize',
                  }}
                  name='deckType'
                  labelId='select-label'
                  id='select'
                  placeholder='Deck archetype'
                  value={selectedDeck.deckType}
                  label='Archetype'
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.value as Archetype)
                  }
                >
                  {getArchetype().map((elem: Archetype) => (
                    <MenuItem className='menu__item' key={elem} value={elem}>
                      {elem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {
              <IconButton onClick={() => handleSaveDataInfo(selectedDeck)}>
                <SaveIcon />
              </IconButton>
            }
          </Box>
:null}
      </FormControl>
    </Box>
          
  );
};
export default DeckInfoComponent;
