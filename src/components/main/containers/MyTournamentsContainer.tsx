import { Box, Container } from '@mui/system';
import {
  ParticipantType,
  TournamentType,
} from '../../../types/tournament_type';

import { ProfileType } from '../../../types/profile_type';
import React from 'react';
import TournamentTable from '../components/tournaments/TournamentTable';
import { Typography } from '@mui/material';
import { compareDates } from '../../../util';
import { fetchSelectedVken } from '../../../service/fetchVken';
import fetchTournaments from '../../../service/fetchTournaments';

const MyTournamentsContainer = () => {
  const [myTournaments, setMyTournaments] = React.useState<
    TournamentType[] | null
  >(null);
  const [profile, setprofile] = React.useState<ProfileType | null>();

  React.useEffect(() => {
    const fetchData = async (vken: string) => {
      const response: TournamentType[] | null = await fetchTournaments();
      if (response) {
        setMyTournaments(
          response.filter((tournament: TournamentType) =>
            tournament?.participants?.filter(
              (player: ParticipantType) => player.vken === vken
            )
          )
        );
      }
    };

    const fetchProfileData = async () => {
      const prof: ProfileType = await fetchSelectedVken();
      setprofile(prof);
      const vken = await prof.vken;
      fetchData(vken);
    };
    fetchProfileData();
  }, []);

  return (
    <Container sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
      <Typography align='center' variant='h4'>My Tournaments</Typography>
      {myTournaments && profile ? (
        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
          <Typography variant='h5'>Active Tournaments</Typography>
          <TournamentTable
            data={myTournaments.filter(
              (elem) =>
                compareDates(new Date(), elem.eventDate) === false &&
                elem.active
            )}
            userData={profile}
          />
          <Typography variant='h5'>Finished Tournaments</Typography>
          <TournamentTable
            data={myTournaments.filter(
              (elem) => compareDates(new Date(), elem.eventDate) || !elem.active
            )}
            userData={profile}
          />
        </Box>
      ) : null}
    </Container>
  );
};

export default MyTournamentsContainer;
