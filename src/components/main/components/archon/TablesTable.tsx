import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { PlayerResultsType } from '../../../../types/archon_type';
import React from 'react';

interface Props {
  data: PlayerResultsType[];
}
const TablesTable = (props: Props) => {
  const { data } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((player: PlayerResultsType, index: number) => (
          <TableRow key={index}>
            <TableCell>{index+1}</TableCell>
            <TableCell>{player.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TablesTable;
