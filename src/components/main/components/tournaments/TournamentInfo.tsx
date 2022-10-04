import { Box, Container } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ParticipantTable from './ParticipantTable';
import React from 'react';
import { TournamentType } from '../../../../types/tournament_type';
import fetchTournaments from '../../../../service/fetchTournaments';
import { getUserId } from '../../../../util';

const TournamentInfo = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const [data, setData] = React.useState<TournamentType | null>(null);
  const history = useHistory();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tournaments: TournamentType[] = await fetchTournaments();
        const tournament: TournamentType | undefined = tournaments.find(
          (elem) => elem.id === tournamentId
        );
        if (tournament) {
          setData(tournament);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [tournamentId]);

  const handleGoBack = () => {
    history.push('/tournaments');
  }

  return (
    <Container sx={{ minWidth: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleGoBack()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h3'>Tournament Info</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant='h4'
            color='secondary'
            sx={{ textDecoration: 'underline', width: '100%' }}
          >
            {data?.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Organizer:{' '}
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.organizer}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            >
              Event Date (dd/mm/yyyy):
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.eventDate.getDate()}/
              {('0' + ((data?.eventDate.getMonth() ?? 0) + 1)).slice(-2)}/
              {data?.eventDate.getFullYear()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Starting time:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.startingTime}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Number of rounds:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.numberOfRounds}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Players:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.participants?.length ? data?.participants?.length : 0} /{' '}
              {data?.maxNumberOfPlayers}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              City:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.city}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Location:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.location}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Level:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.level}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Format:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.format}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Tournament system:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.multiJudge ? 'Multijudge' : 'Main judge'}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Head judge:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.headJudge}
            </Typography>
          </Box>
          {data?.multiJudge
            ? data.assistantJudges.map((judges, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    gap: '1rem',
                  }}
                >
                  <Typography
                    color='secondary'
                    variant='body1'
                    sx={{ display: 'flex', gap: '0.5rem' }}
                  >
                    Assistant judge {index + 1}:
                  </Typography>
                  <Typography color='primary' variant='body1'>
                    {judges}
                  </Typography>
                </Box>
              ))
            : null}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Location:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.location}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography
              color='secondary'
              variant='body1'
              sx={{ display: 'flex', gap: '0.5rem' }}
            >
              Cost:
            </Typography>
            <Typography color='primary' variant='body1'>
              {data?.cost}
            </Typography>
          </Box>
        </Box>
        {data?.owner === getUserId() && data.participants ? (
          <Box id='participants' sx={{ m: '1rem' }}>
            <Typography
              sx={{ m: '1rem', textDecoration: 'underline' }}
              color='secondary'
              variant='h5'
            >
              Participants
            </Typography>
            <ParticipantTable data={data.participants} />
          </Box>
        ) : null}
      </Box>
    </Container>
  );
};

export default TournamentInfo;
