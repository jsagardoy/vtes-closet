import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '../database/config';
import { getUserId } from '../util';

/* function to update new task to firestore */
export const deleteTournament = async (tournamentId: string, owner: string): Promise<boolean> => {
  const uid = getUserId();

  const taskDocRef = doc(db, `/tournaments/${tournamentId}`);
  if (taskDocRef) {
    try {
      if (uid === owner) {
        await deleteDoc(taskDocRef);
        console.log('%cData successfully deleted. ', 'color:green');
        return true;
      } else {
        const error = new Error('Not allow to create a tournament');
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  return false;
};
