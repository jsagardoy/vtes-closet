import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { FormEvent, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import { TournamentType } from '../../../types/tournament_type';
import { createNewTournament } from '../../../service/createNewTournament';
import { deleteTournament } from '../../../service/deleteTournament';
import fetchTournaments from '../../../service/fetchTournaments';
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
  //const multiJudge = useRef<HTMLInputElement | null>(null);
  const headJudge = useRef<HTMLInputElement | null>(null);
  const cost = useRef<HTMLInputElement | null>(null);
  const location = useRef<HTMLInputElement | null>(null);
  const details = useRef<HTMLInputElement | null>(null);
  const aJudge = useRef<HTMLInputElement | null>(null);

  const history = useHistory();
  const [eventDate, setEventDate] = React.useState<Date>(new Date());
  const [assistantJudges, setAssistanJudges] = React.useState<string[]>([]);
  const [owner, setOwner] = React.useState<string>('');
  const [multiJudge, setMultiJudge] = React.useState<string | undefined>(
    undefined
  );
  const [openSB, setOpenSB] = React.useState<{
    value: boolean;
    message: string;
    severity: AlertColor | undefined;
  }>({ value: false, message: '', severity: undefined });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      maxNumberOfPlayers: Number(maxNumberOfPlayers.current?.value) ?? 0,
      numberOfRounds: Number(numberOfRounds.current?.value) ?? 4,
      multiJudge: multiJudge === 'true' ? true : false,
      headJudge: headJudge.current?.value ?? '',
      assistantJudges: assistantJudges,
      cost: cost.current?.value ?? '',
      location: location.current?.value ?? '',
      details: details.current?.value ?? '',
      active: true,
      participants: [],
      round:[{id:'0',tables:[]}],
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
    } catch (error) {
      throw error;
    }
  };

  const handleCancelTournament = async () => {
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
      maxNumberOfPlayers: Number(maxNumberOfPlayers.current?.value) ?? 0,
      numberOfRounds: Number(numberOfRounds.current?.value) ?? 4,
      multiJudge: multiJudge === 'true' ? true : false,
      headJudge: headJudge.current?.value ?? '',
      assistantJudges: assistantJudges,
      cost: cost.current?.value ?? '',
      location: location.current?.value ?? '',
      details: details.current?.value ?? '',
      active: false,
      participants: [],
      round: [{ id: '0', tables: [] }],
    };

    try {
      const result = await createNewTournament(newTournament);
      setOpenSB({
        value: result,
        message: result
          ? 'Tournament canceled'
          : 'Failed to cancel tournament. Please try again.',
        severity: result ? 'info' : 'error',
      });
      /*      history.push('/tournaments'); */
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

  const handleGoBack = () => {
    history.push('/tournaments');
  };

  const handleMultiJudge = (event: SelectChangeEvent<string | undefined>) => {
    setMultiJudge(event.target.value as string | undefined);
  };

  const handleRemoveTournament = async () => {
    try {
      if (owner !== '') {
        const response = await deleteTournament(tournamentId, owner);
        setOpenSB({
          value: response,
          message: 'Tournament canceled',
          severity: 'success',
        });
      }
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tournaments: TournamentType[] = await fetchTournaments();
        const tournamentInfo = tournaments.find(
          (tournament: TournamentType) =>
            tournament.id === tournamentId && tournament.owner === userId
        );
        if (tournamentInfo) {
          name.current!.value = tournamentInfo.name;
          setEventDate(tournamentInfo.eventDate);
          startingTime.current!.value = tournamentInfo.startingTime;
          organizer.current!.value = tournamentInfo.organizer;
          city.current!.value = tournamentInfo.city;
          format.current!.value = tournamentInfo.format;
          level.current!.value = tournamentInfo.level;
          maxNumberOfPlayers.current!.value =
            tournamentInfo.maxNumberOfPlayers.toString();
          numberOfRounds.current!.value =
            tournamentInfo.numberOfRounds.toString();
          setMultiJudge(() =>
            tournamentInfo.multiJudge === true ? 'true' : 'false'
          );
          headJudge.current!.value = tournamentInfo.headJudge;
          cost.current!.value = tournamentInfo.cost;
          location.current!.value = tournamentInfo.location;
          details.current!.value = tournamentInfo.details;
          setAssistanJudges(tournamentInfo.assistantJudges);
          setOwner(tournamentInfo.owner);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [tournamentId, userId]);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={() => handleGoBack()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h4'>Tournament Information</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '50%',
        }}
        component='form'
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          InputLabelProps={{ shrink: true }}
          inputRef={name}
          label='Name'
          fullWidth
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={eventDate}
            label='Event Date'
            renderInput={(params: any) => <TextField {...params} />}
            minDate={new Date()}
            onChange={(value) => {
              setEventDate(value ?? new Date());
            }}
            inputFormat='DD-MM-YYYY'
          />
        </LocalizationProvider>
        <TextField
          InputLabelProps={{ shrink: true }}
          inputRef={startingTime}
          required
          label='Starting time'
          fullWidth
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          inputRef={organizer}
          required
          label='Organizer'
          fullWidth
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          inputRef={city}
          required
          label='City'
          fullWidth
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          inputRef={location}
          label='Location'
          fullWidth
        />
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
          inputProps={{ min: 0 }}
          InputLabelProps={{ shrink: true }}
          inputRef={maxNumberOfPlayers}
          label='Maximum number of Players'
          type='number'
        />
        <TextField
          inputProps={{ min: 0 }}
          InputLabelProps={{ shrink: true }}
          inputRef={numberOfRounds}
          label='Number of Rounds (including Final)'
          type='number'
          required
        />
        <FormControl>
          <InputLabel id='multijudge-id'>Multi Judge</InputLabel>
          <Select
            defaultValue={''}
            labelId='multijudge-id'
            label='Multi judge'
            onChange={(event: SelectChangeEvent<string | undefined>) =>
              handleMultiJudge(event)
            }
          >
            <MenuItem value={'true'}>Yes</MenuItem>
            <MenuItem value={'false'}>No</MenuItem>
          </Select>
        </FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          inputRef={headJudge}
          label='Head judge'
        />
        {multiJudge === 'true' ? (
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
              <TextField
                InputLabelProps={{ shrink: true }}
                inputRef={aJudge}
                label='Assistant judges'
                fullWidth
              />
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
                <ListItem
                  divider
                  sx={{
                    gap: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  key={uuidv4()}
                >
                  <Typography variant='body1'>{judge}</Typography>{' '}
                  <Button
                    onClick={() => removeJudge(judge)}
                    sx={{ border: '1px solid' }}
                  >
                    <RemoveIcon />
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : null}
        <TextField
          InputLabelProps={{ shrink: true }}
          inputRef={cost}
          label='Inscription cost'
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          inputRef={details}
          label='Details'
          multiline
          rows={5}
        />
        <Box
          id='buttons'
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={handleCancel}
            color='primary'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginBottom: '1rem',
            }}
          >
            <CancelIcon color='secondary' />
            Cancel changes
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
          <Button
            onClick={() => handleCancelTournament()}
            color='primary'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <DoNotDisturbIcon sx={{ fill: 'red' }} />
            Cancel tournament
          </Button>
          <Button
            onClick={() => handleRemoveTournament()}
            color='primary'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <DeleteIcon color='secondary' />
            Remove tournament
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
