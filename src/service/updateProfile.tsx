import { doc, setDoc } from 'firebase/firestore';

import { db } from '../database/config';
import { getUserId } from '../util';
import { ProfileType } from '../types/profile_type';

/* function to update new task to firestore */
export const updateProfileService = async (data: ProfileType) => {
  const uid = getUserId();
  const taskDocRef = doc(db, `/profile/${uid}`);

    if (taskDocRef) {
    try {
        const elem = data;
      await setDoc(taskDocRef, elem);
      console.log('%cData successfully added. ', 'color:green');
    } catch (error) {
      throw error;
    }
  }
};
