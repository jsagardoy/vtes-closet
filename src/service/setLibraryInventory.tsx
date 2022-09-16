import {
  SavedInventoryType,
  libraryInventoryType,
} from '../types/inventory_type';
import { doc, setDoc } from 'firebase/firestore';

import { db } from '../database/config';
import { getUserId } from '../util';

export const setLibraryInventory = async (
  libraryList: libraryInventoryType[]
) => {
  const uid = getUserId();

  const taskDocRef = doc(db, `/libraryInventory/${uid}/`);
  const inventory: SavedInventoryType[] = libraryList.map((elem) => {
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
      window.localStorage.setItem(
        'libraryInventory',
        JSON.stringify(inventory)
      );
      console.log('%cData successfully added. ', 'color:green');
      return 'Data successfully added.';
    } catch (error) {
       throw error;
    }
  }
};
