import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import { PlayerResultsType } from '../../../../types/archon_type';
import React from 'react';

interface Props {
  players: PlayerResultsType[];
}
const FinalRanking = (props: Props) => {
  const { players } = props;
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ranking</TableCell>
              <TableCell>Vken</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>GW</TableCell>
              <TableCell>VP</TableCell>
              <TableCell>Minipoins</TableCell>
              <TableCell>Coinflip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.vken}>
                <TableCell>{player.roundRank}</TableCell>
                <TableCell>{player.vken}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.GW}</TableCell>
                <TableCell>{player.VP}</TableCell>
                <TableCell>{player.minipoints}</TableCell>
                <TableCell>{player.coinFlip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FinalRanking;
