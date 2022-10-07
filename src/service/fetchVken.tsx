import { doc, getDoc } from 'firebase/firestore';

import { db } from '../database/config';
import { getUserId } from '../util';

export const fetchSelectedVken = async (): Promise<string[] | any> => {
  try {
    const userId = getUserId();
    const taskDocRef = doc(db, `/profile/${userId}`);
    if (taskDocRef) {
      const docSnap = await getDoc(taskDocRef);
      const result = docSnap.data();
      return result;
    }
  } catch (error) {
    throw error;
  }
};
