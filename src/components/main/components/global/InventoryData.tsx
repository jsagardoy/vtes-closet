import React from 'react';
import { TextField, Box, Tooltip, IconButton } from '@mui/material';
import { useInventory } from '../../../../hooks/useInventory';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  cryptInventoryType,
  libraryInventoryType,
} from '../../../../types/inventory_type';
interface Props {
  card: cryptInventoryType | libraryInventoryType;
  label: string;
  initialValue: number;
  updateInventory: (card: cryptInventoryType | libraryInventoryType) => void;
}

const InventoryData = (props: Props) => {
  const { label, initialValue, updateInventory, card } = props;
  const { counter, set } = useInventory(initialValue ?? 0);

  const generateInventory = React.useMemo(
    () => (value: number) => {
      const newInventory: cryptInventoryType | libraryInventoryType = {
        ...card,
        [label.toLowerCase()]: value,
      };
      updateInventory(newInventory);
    },
    [card, label, updateInventory]
  );

  const handleClick = React.useMemo(
    () => (value: number) => {
      set(value);
      generateInventory(value);
    },
    [generateInventory, set]
  );

  React.useEffect(() => {}, []);

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
      <IconButton
        disabled={counter <= 0}
        sx={{
          display: 'flex',
          height: '100%',
          color: 'black',
          padding: '0.3rem',
          alignItems: 'center',
        }}
        onClick={() => {
          handleClick(counter - 1);
        }}
      >
        <RemoveCircleIcon />
      </IconButton>
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
        value={counter < 0 ? 0 : counter}
      />
      <IconButton
        sx={{
          display: 'flex',
          height: '100%',
          color: 'black',
          padding: '0.3rem',
          alignItems: 'center',
        }}
        onClick={() => handleClick(counter + 1)}
      >
        <AddCircleIcon />
      </IconButton>
    </Box>
  );
};

export default InventoryData;
