import {
  SavedInventoryType,
  cryptInventoryType,
} from '../types/inventory_type';
import { doc, setDoc } from 'firebase/firestore';

import { db } from '../database/config';
import { getUserId } from '../util';

/* function to add new crypt to firestore */
export const setCryptInventory = async (cryptList: cryptInventoryType[]) => {
  const uid = getUserId();

  const taskDocRef = doc(db, `/cryptInventory/${uid}/`);
  const inventory: SavedInventoryType[] = cryptList.map((elem) => {
    const newSavedInventoryType: SavedInventoryType = {
      id: elem.id,
      want: elem.want,
      have: elem.have,
      trade: elem.trade,
      used: elem.used,
    };
    return newSavedInventoryType;
  });

  if (taskDocRef) {
    try {
      await setDoc(taskDocRef, { inventoryData: [...inventory] });
      window.sessionStorage.setItem(
        'cryptInventory',
        JSON.stringify(inventory)
      );
      console.log('%cData successfully added. ', 'color:green');
      return 'Data successfully added.';
    } catch (error) {
      throw error;
    }
  }
};
