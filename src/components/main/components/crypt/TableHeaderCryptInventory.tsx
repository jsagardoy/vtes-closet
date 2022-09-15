import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import React from 'react'

interface Props {
  sortBy: string;
  sortOrder: 'desc' | 'asc';
  createSortHandler: (key: string) => void;
}

const TableHeaderCryptInventory = (props: Props) => {
    const { sortBy, sortOrder, createSortHandler } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell align='center'>Inventory</TableCell>
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
}

export default TableHeaderCryptInventory;