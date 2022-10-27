import { Box, Container } from '@mui/system';
import { Button, Typography } from '@mui/material';
import {
  ParticipantType,
  TournamentType,
} from '../../../types/tournament_type';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import AddNewPlayer from '../components/archon/AddNewPlayer';
import PlayersList from '../components/archon/PlayersList';
import { fetchSelectedTournament } from '../../../service/fetchSelectedTournament';
import { getUserId } from '../../../util';

const ArchonContainer = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const uid = getUserId();
  const [tournament, setTournament] = useState<TournamentType>();
  const [players, setPlayers] = useState<ParticipantType[]>([]);
    const history = useHistory();
  //un open para cada dialogo

  useEffect(() => {
    try {
      const getData = async () => {
        if (uid) {
          const tour: TournamentType | null = await fetchSelectedTournament(
            tournamentId,
            uid
          );
          if (tour) {
            setTournament(tour);
            tour && tour.participants && setPlayers([...tour.participants]);
          }
        }
      };
      getData();
    } catch (error) {
      throw error;
    }
  
  }, [tournamentId, uid]);

  const handleUpdateList = (list: ParticipantType[]) => {
      setPlayers(list);
      //
  };

  const handleAddNewPlayer = (newPlayer: ParticipantType) => {
      setPlayers((prev) => [...prev, newPlayer]);
      //incluir en BBDD
  };

    const roundsArray = Array(tournament?.numberOfRounds).fill(0);
  //const isFirst = (currentIndex: number) => currentIndex === 0;
  const isLast = (currentIndex: number) =>
    currentIndex + 1 === tournament?.numberOfRounds;

  const handleFinal = () => {history.push(`/archon/${tournamentId}/final`);};

  const handleRound = (round: number) => {history.push(`/archon/${tournamentId}/round/${round}`)};

  return (
    <Container>
      <Box>
        <Typography variant='h5'>Players</Typography>
        <AddNewPlayer
          addNewPlayer={(newPlayer: ParticipantType) =>
            handleAddNewPlayer(newPlayer)
          }
        />
        <PlayersList
          isFinal={false}
          players={players}
          updatePlayersList={(newList: ParticipantType[]) =>
            handleUpdateList(newList)
          }
        />
      </Box>
      {roundsArray.map((round, index) => (
        <Button
          key={index}
          onClick={() =>
            isLast(index) ? handleFinal() : handleRound(index + 1)
          }
        >
          {isLast(index) ? 'Final' : `Round ${index + 1}`}
        </Button>
      ))}
    </Container>
  );
};

export default ArchonContainer;
