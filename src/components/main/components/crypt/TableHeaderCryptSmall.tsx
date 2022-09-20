import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import React from 'react';

interface Props {
  deckMode: boolean;
  sortBy: string;
  sortOrder: 'desc' | 'asc';
  createSortHandler: (key: string) => void;
}

const TableHeaderCryptSmall = (props: Props) => {
  const { deckMode, sortBy, sortOrder, createSortHandler } = props;


  return (
    <TableHead
      sx={{
        display: 'block',
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
      }}
    >
      <TableRow
        sx={{
          display: 'block',
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          border: '1px solid',
        }}
      >
        {deckMode ? (
          <TableCell align='center' sx={{ display: 'block' }}>
            Action
          </TableCell>
        ) : null}
        <TableCell align='center' sx={{ display: 'block' }}>
          <TableSortLabel
            active={sortBy === 'name'}
            direction={sortOrder}
            onClick={() => createSortHandler('name')}
          >
            Card name
          </TableSortLabel>
        </TableCell>
        <TableCell align='center' sx={{ display: 'block' }}>
          <TableSortLabel
            active={sortBy === 'clan'}
            direction={sortOrder}
            onClick={() => createSortHandler('clan')}
          >
            Clan
          </TableSortLabel>
        </TableCell>
        <TableCell align='center' sx={{ display: 'block' }}>
          Disciplines
        </TableCell>
        <TableCell align='center' sx={{ display: 'block' }}>
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

export default TableHeaderCryptSmall;
