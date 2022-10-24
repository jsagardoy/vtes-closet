import React, { useEffect, useState } from 'react';
import {
  TablesRoundType,
  TournamentType,
} from '../../../../types/tournament_type';

import { PlayerResultsType } from '../../../../types/archon_type';
import { fetchSelectedTournament } from '../../../../service/fetchSelectedTournament';
import { getUserId } from '../../../../util';
import { useParams } from 'react-router-dom';

const FinalContainer = () => {
  const [playerList, setPlayerList] = useState<PlayerResultsType[]>([]);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const userId: string | null = getUserId();
  const calculateFinalRanking = () => {};

  useEffect(() => {
    const getData = async () => {
      if (userId) {
        const tournament: TournamentType | null = await fetchSelectedTournament(
          tournamentId,
          userId
        );
        if (tournament) {
          const rounds: TablesRoundType[] = tournament.round.map(
            (round) => round
          );
        }
      }
    };
    getData();
  }, []);

  return <div>FinalContainer</div>;
};

export default FinalContainer;
