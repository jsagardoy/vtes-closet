import { TextField, Box, Tooltip } from '@mui/material';
import React from 'react';
import { useInventory } from '../../../../hooks/useInventory';

interface Props {
  label: string;
  getValue: (key: string, value: number) => void;
  initialValue: number;
}

const InventoryData = (props: Props) => {
  const { label, getValue,initialValue } = props;
  const { counter, increment, set, decrement } = useInventory(initialValue||0);

  React.useEffect(() => {
    getValue(label, counter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  if (label === 'Used') {
    return (
      <Tooltip title='Cards already in use in your decks' placement='top' arrow>
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
        onClick={decrement}
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
        onChange={(e) => set(Number(e.target.value))}
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
        onClick={increment}
      >
        +
      </button>
    </Box>
  );
};

export default InventoryData;
