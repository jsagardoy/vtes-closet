import { doc, setDoc } from 'firebase/firestore';

import { ProfileType } from '../types/profile_type';
import { TournamentTable } from '../types/archon_type';
import { db } from '../database/config';
import { fetchSelectedTournament } from './fetchSelectedTournament';
import { fetchSelectedVken } from './fetchVken';
import { getUserId } from '../util';

/* function to update new task to firestore */
export const addRoundToTournament = async (
  tournamentId: string,
  data: TournamentTable[],
  roundData: string,
): Promise<boolean> => {
  const taskDocRef = doc(db, `/tournaments/${tournamentId}`);

  const tournament = await fetchSelectedTournament(tournamentId,getUserId()??'')

  if (taskDocRef && tournament) {
    try {
      const roundElem = [...tournament.round??[], { id:roundData,tables:data }];
      const elem = {
        ...tournament,
        round: roundElem,
      };
      const profile: ProfileType = await fetchSelectedVken();
      if (
        profile.rol === 'prince' &&
        profile.uid === getUserId()
      ) {
        await setDoc(taskDocRef, elem);
        return true;
      } else {
        const error = new Error('Not allow to create a tournament');
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
  return false;
};
