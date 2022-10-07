import { arrayRemove, doc, updateDoc } from 'firebase/firestore';

import { ParticipantType } from '../types/tournament_type';
import { db } from '../database/config';

/* function to update new task to firestore */
export const removeParticipant = async (
  tournamentId: string,
  data: ParticipantType
): Promise<boolean> => {
  const taskDocRef = doc(db, `/tournaments/${tournamentId}`);
  if (taskDocRef) {
    try {
      await updateDoc(taskDocRef, { participants: arrayRemove(data) });
      console.log('%cData successfully added. ', 'color:green');
      return true;
    } catch (err) {
      throw err;
    }
  }
  return false;
};
