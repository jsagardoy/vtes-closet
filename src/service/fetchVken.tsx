import { getDoc, doc } from 'firebase/firestore';

import { db } from '../database/config';
import { getUserId } from '../util';

export const fetchSelectedVken = async (): Promise<string[] | any> => {
  const userId = getUserId();
  const taskDocRef = doc(db, `/profile/${userId}`);
  if (taskDocRef) {
    try {
      const docSnap = await getDoc(taskDocRef);
      const result = docSnap.data();
      return result;
    } catch (error) {
      throw error;
    }
  }
};
