import { doc, getDoc } from 'firebase/firestore';
import { db } from '../database/config';
import { libraryInventoryType } from '../types/inventory_type';

export const fetchLibraryInventory = async (
  id: string
): Promise<libraryInventoryType[] | any> => {
  const docRef = doc(db, 'libraryInventory', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const result = docSnap.data();
    return result.inventory;
  } else {
    console.log('Error in DB');
  }
};
