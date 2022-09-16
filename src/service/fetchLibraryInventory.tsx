import { doc, getDoc } from 'firebase/firestore';

import { db } from '../database/config';
import { getUserId } from '../util';
import { libraryInventoryType } from '../types/inventory_type';

export const fetchLibraryInventory = async (): Promise<
  libraryInventoryType[] | any
> => {
  try {
    const result = window.sessionStorage.getItem('libraryInventory');
    if (result !== null) {
      return JSON.parse(result);
    }
    const uid = getUserId();
    if (uid) {
      const docRef = doc(db, `libraryInventory/${uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = docSnap.data();
        window.sessionStorage.setItem(
          'libraryInventory',
          JSON.stringify(result.inventoryData)
        );
        return result.inventoryData;
      } else {
        console.log('Error in DB');
      }
    }
  } catch (error) {
    throw error;
  }
};
