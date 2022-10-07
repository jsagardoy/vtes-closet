import { doc, getDoc } from 'firebase/firestore';

import { TournamentType } from '../types/tournament_type';
import { db } from '../database/config';
import { getUserId } from '../util';

/* function to update new task to firestore */
export const fetchSelectedTournament = async (
  tournamentId: string,
  owner: string
): Promise<TournamentType|null> => {
  const uid = getUserId();

  const taskDocRef = doc(db, `/tournaments/${tournamentId}`);
  if (taskDocRef) {
    try {
      if (uid === owner) {
        const response = await getDoc(taskDocRef);
        console.log('%cData successfully deleted. ', 'color:green');
        return response.data() as TournamentType;
      } else {
        const error = new Error('Not access allowed');
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
    return null;
};
