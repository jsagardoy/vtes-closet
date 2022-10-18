import { Box, TableContainer, Typography } from '@mui/material';
import {
  PlayerResultsType,
  TournamentTable,
} from '../../../../types/archon_type';
import React, { useEffect, useRef, useState } from 'react';

import TablesTable from './TablesTable';
import { Tables_Type } from '../../../../types/tables_type';

/* import { useParams } from 'react-router-dom'; */

interface Props {
  participants: PlayerResultsType[];
}
const TablesPerRound = (props: Props) => {
  const { participants } = props;
  const tableNumber = useRef<{ table4: number; table5: number }>();

  const sortedList: PlayerResultsType[] = participants.sort(
    () => Math.random() - 0.5
  );
  const [tables, setTables] = useState<TournamentTable[]>([]);

  const showMessage = () => {
    if (
      tableNumber &&
      tableNumber.current &&
      tableNumber.current.table4 === 0 &&
      tableNumber.current.table5 === 0
    ) {
      return (
        <Typography variant='body1'>
          Not enough players to set up for two tables.
        </Typography>
      );
    } else {
      return (
        <Typography variant='body1'>
          Tables are distributed as {tableNumber.current?.table5} of 5 and{' '}
          {tableNumber.current?.table4} tables of 4.
        </Typography>
      );
    }
  };

  useEffect(() => {
    const item = window.localStorage.getItem('round');
    
    const data: TournamentTable[] = item && JSON.parse(item);
       
    const calculateTables = (): Tables_Type => {
      const length = participants.length;
      if (length > 7) {
        const rest5: number = length % 5;
        if (rest5 === 0) {
          return { table5: Math.trunc(length / 5), table4: 0 };
        }
        if (rest5 === 4) {
          return { table5: Math.trunc(length / 5), table4: 1 };
        }
        if (rest5 === 3) {
          const calculatedTable5 = Math.trunc(length / 5) - 1;
          const calculatedTable4 = (rest5 + 5) / 4;
          const result = {
            table5: calculatedTable5,
            table4: calculatedTable4,
          };
          return result;
        }
        if (rest5 === 2) {
          const calculatedTable5 = Math.trunc(length / 5) - 2;
          const calculatedTable4 = (rest5 + 5 * 2) / 4;
          const result = {
            table5: calculatedTable5,
            table4: calculatedTable4,
          };

          return result;
        }

        if (rest5 === 1) {
          const calculatedTable5 = Math.trunc(length / 5) - 3;
          const calculatedTable4 = (rest5 + 5 * 3) / 4;
          const result = {
            table5: calculatedTable5,
            table4: calculatedTable4,
          };

          return result;
        }
      }
      return { table4: 0, table5: 0 };
    };
    const calculatePlayers = (index: number): PlayerResultsType[] => {
      const { table5 }: Tables_Type = calculateTables();
      const tableCount = table5 >= index ? 5 : 4;
      const data: PlayerResultsType[] = sortedList.slice(
        tableCount === 5
          ? (index - 1) * tableCount
          : (index - 1) * tableCount + 1,
        tableCount === 5 ? index * tableCount : index * tableCount + 1
      );
      return data;
    };
    const generateTables = () => {
      const { table4, table5 }: Tables_Type = calculateTables();

      const newTable: TournamentTable[] = Array(table5 + table4);

      newTable.fill({ id: String(0), players: [] });

      const tour: TournamentTable[] = newTable.map(
        (elem: TournamentTable, index: number) => ({
          id: (index + 1).toString(),
          players: calculatePlayers(index + 1),
        })
      );
      //await addRoundToTournament(tournamentId,round,tour)
      window.localStorage.setItem('round', JSON.stringify(tour));
      setTables(tour);
    };
    if (!data) {
      generateTables();
      tableNumber.current = calculateTables();
    } else {
      setTables(data);
    }
    
  }, [participants.length, sortedList]);

  return (
    <>
      <Typography variant='h5'>Table distribution</Typography>
      {showMessage()}
      <Typography variant='h5'>Tables:</Typography>
      {tables.map((elem, index) => (
        <Box key={index}>
          <Typography variant='h6'>Table: {elem.id}</Typography>
          <TableContainer>
            <TablesTable data={elem.players} />
          </TableContainer>
        </Box>
      ))}
    </>
  );
};

export default TablesPerRound;
