
import React, { useEffect } from 'react';

import { typeCryptInventory } from '../../../../types/inventory_type';
import InventoryData from './InventoryData';

interface Props {
  card: typeCryptInventory;
  updateInventory: (inventory: typeCryptInventory) => void;
}

const Inventory = (props: Props) => {
  const { card, updateInventory } = props;
  useEffect(() => { 
  }, [card]);
  
  const generateInventory = (key: string, value: number): void => {
    const newInventory: typeCryptInventory = {
      ...card,
      [key.toLowerCase()]: value,
    };
    if (newInventory !== card) {
      updateInventory(newInventory);
    }
  };

  return (
    <div className='inventory__buttons'>
        <InventoryData
        label='Have'
        initialValue={card.have}
        getCounter={(label, counter) => {generateInventory(label, counter)}}
      />
      <InventoryData
        label='Want'
        initialValue={card.want}
        getCounter={(label, counter) => generateInventory(label, counter)}
      />
      <InventoryData
        label='Trade'
        initialValue={card.trade}
        getCounter={(label, counter) => generateInventory(label, counter)}
      />
      <InventoryData
        label='Used'
        initialValue={card.used}
        getCounter={(label, counter) => generateInventory(label, counter)}
      />
    </div>
  );
};

export default Inventory;
