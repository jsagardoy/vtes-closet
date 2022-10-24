import { Box, Typography } from '@mui/material';
import {
  PlayerResultsType,
  TournamentTable,
} from '../../../../types/archon_type';
import React, { useEffect, useState } from 'react';

import TablesResultTable from './TablesResultTable';

interface Props {}
const TablesPerRoundResult = (props: Props) => {
  /* const { tournamentId } = useParams<{
   tournamentId: string;
   round: string;
 }>();  */
  const [round, setRound] = useState<TournamentTable[]>([]);
  useEffect(() => {
    setRound(JSON.parse(window.localStorage.getItem('round') ?? ''));
  }, []);

  const handleTable = (tableId: string, players: PlayerResultsType[]) => {
    const newRound = round.map((elem) => {
      if (elem.id === tableId) {
        return { ...elem, players: players };
      } else {
        return { ...elem };
      }
    });
    setRound(newRound);
    window.localStorage.setItem('round', JSON.stringify(newRound));
  };

  return (
    <>
      <Typography variant='h5'>Tables:</Typography>
      {round.map((elem, index) => (
        <Box key={index}>
          <Typography variant='h6'>Table: {elem.id}</Typography>
          <TablesResultTable
            data={elem.players}
            tableId={elem.id}
            updateTable={(tableId: string, players: PlayerResultsType[]) =>
              handleTable(tableId, players)
            }
          />
        </Box>
      ))}
    </>
  );
};

export default TablesPerRoundResult;
