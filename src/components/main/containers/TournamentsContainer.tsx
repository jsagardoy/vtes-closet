import { Button, Container, Typography } from '@mui/material';
import { compareDates, getUser } from '../../../util';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ProfileType } from '../../../types/profile_type';
import React from 'react';
import TournamentTable from '../components/tournaments/TournamentTable';
import { TournamentType } from '../../../types/tournament_type';
import { User } from 'firebase/auth';
import { fetchSelectedVken } from '../../../service/fetchVken';
import fetchTournaments from '../../../service/fetchTournaments';
import { useHistory } from 'react-router-dom';
import { uuidv4 } from '@firebase/util';

const TournamentsContainer = () => {
  const [data, setData] = React.useState<TournamentType[]>([]);
  const history = useHistory();
  const user: User = getUser();
  const [userData, setUserData] = React.useState<ProfileType>({
    name: user.displayName ?? '',
    email: user.email ?? '',
    uid: user.uid,
    vken: '',
    rol: 'user',
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const newData: TournamentType[] = await fetchTournaments();
        
        setData(newData);
      } catch (error) {
        throw error;
      }
    };
    const fetchProfileData = async () => {
      const profile: ProfileType = await fetchSelectedVken();
      setUserData(profile);
    };
    fetchData();
    fetchProfileData();
  }, []);

  const handleCreateNewTournament = () => {
    const id = uuidv4();
    history.push(`/tournament/${id}`);
  };

  return (
    <Container sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      {userData.rol === 'prince' ? (
        <Button
          sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
          onClick={() => handleCreateNewTournament()}
        >
          <AddCircleOutlineIcon />
          Create new Tournament
        </Button>
      ) : null}
      <Typography variant='h5'>Active Tournaments</Typography>
      <TournamentTable
        data={data.filter(
          (elem) => compareDates(new Date(), elem.eventDate) === false && elem.active
        )}
        userData={userData}
      />
      <Typography variant='h5'>Finished Tournaments</Typography>
      <TournamentTable
        data={data.filter(
          (elem) => compareDates(new Date(), elem.eventDate) || !elem.active
        )}
        userData={userData}
      />
    </Container>
  );
};

export default TournamentsContainer;
