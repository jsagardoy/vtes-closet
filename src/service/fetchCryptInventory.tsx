import { doc, getDoc } from 'firebase/firestore';
import { db } from '../database/config';
import { getUserId } from '../util/helpFunction';


export const fetchCryptInventory = async (): Promise<[] | any> => {
  try {
    
    const uid = getUserId();
    if (uid) {
      const docRef = doc(db, `cryptInventory/${uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = docSnap.data();

        return result.inventoryData;
      } else {
        console.log('No data for this user');
        return null;
      }
    }
  } catch (error) {
    console.log(`%c Error: ${error}`, 'color:red')
    return null;
  }
    
};
