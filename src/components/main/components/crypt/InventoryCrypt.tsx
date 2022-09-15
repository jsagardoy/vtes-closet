import { Box } from '@mui/material';
import InventoryData from '../global/InventoryData';
import React from 'react';
import { cryptInventoryType } from '../../../../types/inventory_type';

interface Props {
  card: cryptInventoryType;
  updateInventory: (card:cryptInventoryType) => void;
}

const InventoryCrypt = (props: Props) => {
  const { card, updateInventory } = props;

  return (
    <Box className='inventory__buttons'>
      <InventoryData
        label='Have'
        card={card}
        initialValue={card.have}
        updateInventory={(card) => updateInventory(card as cryptInventoryType)}
      />
      <InventoryData
        label='Want'
        card={card}
        initialValue={card.want}
        updateInventory={(card) => updateInventory(card as cryptInventoryType)}
      />
      <InventoryData
        label='Trade'
        card={card}
        initialValue={card.trade}
        updateInventory={(card) => updateInventory(card as cryptInventoryType)}
      />
      {/* <InventoryData
        label='Used'
        card={card}
        initialValue={card.used}
        updateInventory={(card) => updateInventory(card as cryptInventoryType)}
      /> */}
    </Box>
  );
};

export default InventoryCrypt;
