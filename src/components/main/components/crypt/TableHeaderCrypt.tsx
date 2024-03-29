import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import React from 'react';

interface Props {
  deckMode: boolean;
  sortBy: string;
  sortOrder: 'desc' | 'asc';
  createSortHandler: (key: string) => void;
}

const TableHeaderCrypt = (props: Props) => {
  const { deckMode, sortBy, sortOrder, createSortHandler } = props;

  return (
    <TableHead sx={{color:'red'}}>
      <TableRow>
        {deckMode ? <TableCell align='center'>Action</TableCell> : null}
        <TableCell align='center'>
          <TableSortLabel
            active={sortBy === 'name'}
            direction={sortOrder}
            onClick={() => createSortHandler('name')}
          >
            Card name
          </TableSortLabel>
        </TableCell>
        <TableCell align='center'>
          <TableSortLabel
            active={sortBy === 'clan'}
            direction={sortOrder}
            onClick={() => createSortHandler('clan')}
          >
            Clan
          </TableSortLabel>
        </TableCell>
        <TableCell align='center'>Disciplines</TableCell>
        <TableCell align='center'>
          <TableSortLabel
            active={sortBy === 'capacity'}
            direction={sortOrder}
            onClick={() => createSortHandler('capacity')}
          >
            Capacity
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderCrypt;
