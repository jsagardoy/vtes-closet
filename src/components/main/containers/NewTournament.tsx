import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import { TournamentType } from '../../../types/tournament_type';
import { createNewTournament } from '../../../service/createNewTournament';
import { getUserId } from '../../../util';
import { uuidv4 } from '@firebase/util';

const NewTournament = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const userId = getUserId();
  const name = useRef<HTMLInputElement | null>(null);
  //const eventDate = useRef<HTMLInputElement | null>(null);
  const startingTime = useRef<HTMLInputElement | null>(null);
  const organizer = useRef<HTMLInputElement | null>(null);
  const city = useRef<HTMLInputElement | null>(null);
  const format = useRef<HTMLInputElement | null>(null);
  const level = useRef<HTMLInputElement | null>(null);
  const maxNumberOfPlayers = useRef<HTMLInputElement | null>(null);
  const numberOfRounds = useRef<HTMLInputElement | null>(null);
  const multiJudge = useRef<HTMLInputElement | null>(null);
  const headJudge = useRef<HTMLInputElement | null>(null);
  const cost = useRef<HTMLInputElement | null>(null);
  const location = useRef<HTMLInputElement | null>(null);
  const details = useRef<HTMLInputElement | null>(null);
  const aJudge = useRef<HTMLInputElement | null>(null);

  const history = useHistory();
  const [eventDate, setEventDate] = React.useState<Date>(new Date());
  const [assistantJudges, setAssistanJudges] = React.useState<string[]>([]);
  const [openSB, setOpenSB] = React.useState<{
    value: boolean;
    message: string;
    severity: AlertColor | undefined;
  }>({ value: false, message: '', severity: undefined });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTournament: TournamentType = {
      id: tournamentId,
      name: name.current?.value ?? '',
      eventDate: eventDate,
      startingTime: startingTime.current?.value ?? '',
      owner: userId ?? '',
      organizer: organizer.current?.value ?? '',
      city: city.current?.value ?? '',
      format: format.current?.value ?? 'constructed',
      level: level.current?.value ?? 'normal',
      numberOfPlayers: 0,
      maxNumberOfPlayers: Number(maxNumberOfPlayers.current?.value) ?? 0,
      numberOfRounds: Number(numberOfRounds.current?.value) ?? 4,
      multiJudge: multiJudge.current?.value === 'true' ? true : false ?? true,
      headJudge: headJudge.current?.value ?? '',
      assistantJudges: assistantJudges,
      cost: cost.current?.value ?? '',
      location: location.current?.value ?? '',
      details: details.current?.value ?? '',
    };
    try {
      const result = await createNewTournament(newTournament);
      setOpenSB({
        value: result,
        message: result
          ? 'Tournament created'
          : 'Failed to create tournament. Please try again.',
        severity: result ? 'success' : 'error',
      });
      history.push('/tournaments');
    } catch (error) {
      throw error;
    }
  };

  const addJudge = (name: string) => {
    if (name.trim() !== '') {
      setAssistanJudges((prev) => [...prev, name]);
      if (aJudge && aJudge.current) {
        aJudge.current.value = '';
      }
    }
  };

  const removeJudge = (judge: string) => {
    const newJudges: string[] = assistantJudges.filter(
      (elem) => elem !== judge
    );
    setAssistanJudges(newJudges);
  };

  const handleCloseSB = () => {
    setOpenSB((prev) => ({ ...prev, value: false }));
  };

  const handleCancel = () => {
    history.push('/tournaments');
  };
  
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography variant='h4'>Tournament Information</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '50%',
        }}
        component='form'
        onSubmit={(e: React.FormEvent) => handleSubmit(e)}
      >
        <TextField inputRef={name} label='Name' fullWidth required />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={eventDate}
            label='Event Date'
            renderInput={(params: any) => <TextField {...params} />}
            onChange={(value) => {
              setEventDate(value ?? new Date());
            }}
            inputFormat='DD-MM-YYYY'
          />
        </LocalizationProvider>
        <TextField
          ref={startingTime}
          required
          label='Starting time'
          fullWidth
        />
        <TextField inputRef={organizer} required label='Organizer' fullWidth />
        <TextField inputRef={city} required label='City' fullWidth />
        <TextField inputRef={location} label='Location' fullWidth />
        <FormControl>
          <InputLabel id='format-id'>Format</InputLabel>
          <Select
            inputRef={format}
            defaultValue={'limited'}
            required
            labelId='format-id'
            label='Format'
          >
            <MenuItem value={'limited'}>Limited</MenuItem>
            <MenuItem value={'constructed'}>Constructed</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='level-id'>Level</InputLabel>
          <Select
            inputRef={level}
            defaultValue={'normal'}
            labelId='level-id'
            label='Level'
          >
            <MenuItem value={'normal'}>Normal</MenuItem>
            <MenuItem value={'qualifier'}>Qualifier</MenuItem>
            <MenuItem value={'championship'}>Championship</MenuItem>
            <MenuItem value={'nationals'}>Nationals</MenuItem>
          </Select>
        </FormControl>
        <TextField
          inputRef={maxNumberOfPlayers}
          label='Maximum number of Players'
          type='number'
        />
        <TextField
          inputRef={numberOfRounds}
          label='Number of Rounds (including Final)'
          type='number'
          required
        />
        <FormControl>
          <InputLabel id='multijudge-id'>Multi Judge</InputLabel>
          <Select
            defaultValue={'true'}
            inputRef={multiJudge}
            labelId='multijudge-id'
            label='Multi judge'
          >
            <MenuItem value={'true'}>Yes</MenuItem>
            <MenuItem value={'false'}>No</MenuItem>
          </Select>
        </FormControl>
        <TextField inputRef={headJudge} label='Head judge' />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              m: 0,
              p: 0,
              justifyContent: 'flex-start',
            }}
          >
            <TextField inputRef={aJudge} label='Assistant judges' fullWidth />
            <Button
              sx={{ border: '1px solid' }}
              onClick={() => addJudge(aJudge.current?.value ?? '')}
            >
              <AddIcon />
            </Button>
          </Box>

          <List
            sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}
          >
            {assistantJudges.map((judge) => (
              <ListItem alignItems='flex-start' key={uuidv4()}>
                <Typography variant='body1'>{judge}</Typography>{' '}
                <Button onClick={() => removeJudge(judge)}>
                  <RemoveIcon />
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
        <TextField inputRef={cost} label='Inscription cost' />
        <TextField inputRef={details} label='Details' multiline rows={5} />
        <Box id='buttons' sx={{display:'flex',justifyContent:'space-between'}}>
          <Button
            onClick={handleCancel}
            color='primary'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <CancelIcon color='secondary' />
            Cancel
          </Button>
          <Button
            type='submit'
            color='primary'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <SaveIcon color='secondary' />
            Save
          </Button>
          
        </Box>
      </Box>
      <Snackbar
        open={openSB.value}
        autoHideDuration={3000}
        onClose={handleCloseSB}
      >
        <Alert
          onClose={handleCloseSB}
          severity={openSB.severity}
          sx={{ width: '100%' }}
        >
          {openSB.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewTournament;
