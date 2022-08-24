import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useInventory } from '../../../../hooks/useInventory';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardType } from '../../../../types/deck_type';

interface Props {
  initialQuantity: number;
  id: number;
  cardType: 'library' | 'crypt';
  updateQuantity: (
    newQuantity: number,
    id: number,
    cardType: CardType
  ) => void;
  handleRemoveCard:(id: number, cardType:CardType)=>void;
}

const QuantityButtonComponent = (props: Props) => {
  const { initialQuantity, updateQuantity, id, cardType, handleRemoveCard } = props;
  const { increment, decrement, counter,set } = useInventory(initialQuantity);
  const handleDisabledButton = (): boolean => counter <= 0;

  React.useEffect(()=>{set(initialQuantity)},[initialQuantity,set])
  return (
    <Box
      sx={{
        display: 'flex',
        width: '10em',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <IconButton
        aria-label='decrement'
        onClick={() => {
          decrement();
          updateQuantity((counter - 1), id, cardType);
        }}
        disabled={handleDisabledButton()}
      >
        <RemoveCircleIcon />
      </IconButton>
      <Typography sx={{ fontSize: '15px' }} variant='body1'>
        {counter}
      </Typography>
      <IconButton aria-label='increment' onClick={() => {
        increment();
        updateQuantity((counter + 1), id, cardType);
      }}>
        <AddCircleIcon />
      </IconButton>
      <IconButton aria-label='remove' onClick={()=>handleRemoveCard(id,cardType)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default QuantityButtonComponent;
