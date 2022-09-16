import { doc, getDoc } from 'firebase/firestore';

import { db } from '../database/config';
import { getUserId } from '../util/helpFunction';

export const fetchCryptInventory = async (): Promise<[] | any> => {
  try {
    const result = window.localStorage.getItem('cryptInventory');
    if (result !== null) {
      return JSON.parse(result);
    }
    const uid = getUserId();
    if (uid) {
      const docRef = doc(db, `cryptInventory/${uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = docSnap.data();
        window.localStorage.setItem('cryptInventory', JSON.stringify(result.inventoryData));
        return result.inventoryData;
      } else {
        console.log('No data for this user');
        return null;
      }
    }
  } catch (error) {
    console.log(`%c Error: ${error}`, 'color:red');
    throw (error);
  }
};
