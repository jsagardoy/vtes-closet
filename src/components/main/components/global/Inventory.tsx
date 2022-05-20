import React from 'react';
//import { useSessionStorage } from '../../../../hooks/useSessionStorage';

import { typeCryptInventory } from '../../../../types/inventory_type';
import InventoryData from './InventoryData';

interface Props {
  card: typeCryptInventory;
}

const Inventory = (props: Props) => {
  const { card } = props;
  const [inventory, setInventory] = React.useState<typeCryptInventory>(card);
  
  const includeInStorage = (inventory: typeCryptInventory) => {
    const value = window.sessionStorage.getItem('cryptInventoryList');
    if (value) {
      const list: typeCryptInventory[] = JSON.parse(value);
      const newList: typeCryptInventory[] = list.map((elem) =>
        elem.id === inventory.id ? inventory : elem
      );
      const newValue = JSON.stringify(newList);
      window.sessionStorage.setItem('cryptInventoryList', newValue);
    } 
   };
  
  const generateInventory = (key: string, value: number) => {

      const newInventory: typeCryptInventory = {
        ...inventory,
        [key.toLowerCase()]: value,
      };
    setInventory(newInventory);
    includeInStorage(newInventory);
  };

  return ( 
  
      <div className='inventory__buttons'>
        <InventoryData
          getValue={(key: string, value: number) =>
            generateInventory(key, value)
          }
          label='Have'
          initialValue={card.have}
        />
        <InventoryData
          getValue={(key: string, value: number) =>
            generateInventory(key, value)
          }
          label='Want'
          initialValue={card.want}
        />
        <InventoryData
          getValue={(key: string, value: number) =>
            generateInventory(key, value)
          }
          label='Trade'
          initialValue={card.trade}
        />
        <InventoryData
          getValue={(key: string, value: number) =>
            generateInventory(key, value)
          }
          label='Used'
          initialValue={card.used}
        />
      </div>
  );
};

export default Inventory;
