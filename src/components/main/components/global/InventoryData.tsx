import React from 'react';
import { TextField, Box, Tooltip } from '@mui/material';
import { useInventory } from '../../../../hooks/useInventory';

interface Props {
  label: string;
  initialValue: number;
  getCounter: (label: string, counter: number) => void;
}

const InventoryData = (props: Props) => {
  const { label, initialValue, getCounter } = props;
  const { counter, increment, set, decrement } = useInventory(
    initialValue || 0
  );

  if (label === 'Used') {
    return (
      <Tooltip title='Cards already used in your decks' placement='top' arrow>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '0.5rem',
          }}
        >
          <TextField
            sx={{
              paddingLeft: '1rem',
              marginLeft: '0.5rem',
              width: '2.5rem',
            }}
            InputProps={{ disableUnderline: true }}
            type='number'
            size='small'
            aria-disabled={true}
            disabled
            label={label}
            onChange={(e) => set(Number(e.target.value))}
            value={counter}
            variant='standard'
          />
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '0.5rem',
      }}
    >
      <button
        disabled={counter <= 0}
        style={{
          display: 'flex',
          height: '100%',
          color: 'black',
          padding: '0.3rem',
          alignItems: 'center',
        }}
        onClick={() => {
          decrement();
          getCounter(label, counter - 1);
        }}
      >
        -
      </button>
      <TextField
        sx={{
          paddingLeft: '0.1rem',
          width: '2.5rem',
          marginLeft: '0.5rem',
        }}
        InputProps={{ disableUnderline: true }}
        variant='standard'
        type='number'
        size='small'
        aria-disabled={true}
        label={label}
        onChange={(e) => {
          set(Number(e.target.value));
          getCounter(label, Number(e.target.value));
        }}
        value={counter}
      />
      <button
        style={{
          display: 'flex',
          height: '100%',
          color: 'black',
          padding: '0.3rem',
          alignItems: 'center',
        }}
        onClick={() => {
          increment();
          getCounter(label, counter + 1);
        }}
      >
        +
      </button>
    </Box>
  );
};

export default InventoryData;
