import { doc, getDoc } from 'firebase/firestore';
import { db } from '../database/config';
import { libraryInventoryType } from '../types/inventory_type';
import { getUserId } from '../util';

export const fetchLibraryInventory = async (): Promise<libraryInventoryType[] | any> => {
  const uid = getUserId();
  if (uid) {
    const docRef = doc(db, 'libraryInventory', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = docSnap.data();
      return result.inventory;
    } else {
      console.log('Error in DB');
    } 
  }
};
