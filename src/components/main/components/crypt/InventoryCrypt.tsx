import React, { useEffect } from 'react';

import {
  cryptInventoryType,
  libraryInventoryType,
} from '../../../../types/inventory_type';
import InventoryData from '../global/InventoryData';

interface Props {
  card: cryptInventoryType;
  updateInventory: (inventory: cryptInventoryType) => void;
}

const InventoryCrypt = (props: Props) => {
  const { card, updateInventory } = props;
  const [cardData, setCardData] = React.useState<
    cryptInventoryType | libraryInventoryType
  >(card);
  useEffect(() => {
    setCardData(card);
  }, [card]);

  const generateInventory = (key: string, value: number): void => {
    const newInventory: cryptInventoryType | libraryInventoryType = {
      ...card,
      [key.toLowerCase()]: value,
    };
    setCardData(newInventory);
    if (newInventory !== card) {
      updateInventory(newInventory);
    }
  };

  return (
    <div className='inventory__buttons'>
      <InventoryData
        label='Have'
        initialValue={cardData.have}
        getCounter={(label, counter) => {
          generateInventory(label, counter);
        }}
      />
      <InventoryData
        label='Want'
        initialValue={cardData.want}
        getCounter={(label, counter) => generateInventory(label, counter)}
      />
      <InventoryData
        label='Trade'
        initialValue={cardData.trade}
        getCounter={(label, counter) => generateInventory(label, counter)}
      />
      <InventoryData
        label='Used'
        initialValue={cardData.used}
        getCounter={(label, counter) => generateInventory(label, counter)}
      />
    </div>
  );
};

export default InventoryCrypt;
