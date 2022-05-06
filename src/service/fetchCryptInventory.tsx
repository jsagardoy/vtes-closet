import { doc, getDoc } from 'firebase/firestore';
import { db } from '../database/config';
import { typeCryptInventory } from '../types/inventory_type';

export const fetchCryptInventory = async (id:string): Promise<typeCryptInventory[] | any> => {

    
    const docRef = doc(db, 'cryptInventory', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = docSnap.data();
      return result.inventory;
    } else {
      console.log('Error in DB');
    }
    
};
