import React from 'react';
import { typeCryptInventory } from '../../../../types/inventory_type';
import InventoryData from './InventoryData';

interface Props {
  card: typeCryptInventory;
}

const Inventory = (props: Props) => {
  const { card } = props;
  
  const [inventory, setInventory] = React.useState<typeCryptInventory>(card);
  
  const generateInventory = (key: string, value: number) => {

      const newInventory: typeCryptInventory = {
        ...inventory,
        [key.toLowerCase()]: value,
      };
      setInventory(newInventory);

    console.log('New inventory: ', newInventory);
  };

  //React.useEffect ( () =>{console.log(newInventoryList)} ,[newInventoryList])
  return ( 
     <>
      <div className='inventory__buttons'>
        <InventoryData
          getValue={(key: string, value: number) =>
            generateInventory(key, value)
          }
          label='Have'
        />
        <InventoryData
          getValue={(key: string, value: number) =>
            generateInventory(key, value)
          }
          label='Want'
        />
        <InventoryData
          getValue={(key: string, value: number) =>
            generateInventory(key, value)
          }
          label='Trade'
        />
        <InventoryData
          getValue={(key: string, value: number) =>
            generateInventory(key, value)
          }
          label='Used'
        />
      </div>
    </>
  );
};

export default Inventory;
