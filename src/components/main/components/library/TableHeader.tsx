import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import React from 'react'

interface Props{
  deckMode: boolean;
  sortBy: string;
  sortOrder: 'desc' | 'asc';
  createSortHandler: (key: string) => void;
}

const TableHeader = (props: Props) => {
    const { deckMode,sortBy,sortOrder,createSortHandler } = props;
  return (
    <TableHead>
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
        <TableCell align='center'>Card Type</TableCell>
        <TableCell align='center'>Burn Option</TableCell>
        <TableCell align='center'>Disciplines</TableCell>
        <TableCell align='center'>Clan</TableCell>
        <TableCell align='center'>Cost</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader