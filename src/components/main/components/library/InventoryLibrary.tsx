import { Box } from '@mui/material';
import React from 'react';

import { libraryInventoryType } from '../../../../types/inventory_type';
import InventoryData from '../global/InventoryData';

interface Props {
  card: libraryInventoryType;
  updateInventory: (card: libraryInventoryType) => void;
}

const InventoryLibrary = (props: Props) => {
  const { card, updateInventory } = props;

  return (
    <Box className='inventory__buttons'>
      <InventoryData
        label='Have'
        card={card}
        initialValue={card.have}
        updateInventory={(card) =>
          updateInventory(card as libraryInventoryType)
        }
      />
      <InventoryData
        label='Want'
        card={card}
        initialValue={card.want}
        updateInventory={(card) =>
          updateInventory(card as libraryInventoryType)
        }
      />
      <InventoryData
        label='Trade'
        card={card}
        initialValue={card.trade}
        updateInventory={(card) =>
          updateInventory(card as libraryInventoryType)
        }
      />
      {/* <InventoryData
        label='Used'
        card={card}
        initialValue={card.used}
        updateInventory={(card) => updateInventory(card as libraryInventoryType)}
      /> */}
    </Box>
  );
};

export default InventoryLibrary;
