import { Timestamp, doc, setDoc } from 'firebase/firestore';

import { ProfileType } from '../types/profile_type';
import { TournamentType } from '../types/tournament_type';
import { db } from '../database/config';
import { fetchSelectedVken } from './fetchVken';
import { getUserId } from '../util';

/* function to update new task to firestore */
export const createNewTournament = async (data: TournamentType): Promise<boolean> => {
  const taskDocRef = doc(db, `/tournaments/${data.id}`);
  const eventDate: Timestamp = Timestamp.fromDate(new Date(data.eventDate));

  if (taskDocRef) {
    try {
      const elem = {
        id: data.id,
        name: data.name,
        eventDate: eventDate,
        startingTime: data.startingTime,
        owner: data.owner,
        organizer: data.organizer,
        city: data.city,
        format: data.format,
        level: data.level,
        numberOfPlayers: data.numberOfPlayers,
        maxNumberOfPlayers: data.maxNumberOfPlayers,
        numberOfRounds: data.numberOfRounds,
        multiJudge: data.multiJudge,
        headJudge: data.headJudge,
        assistantJudges: data.assistantJudges,
        cost: data.cost,
        location: data.location,
        details: data.details,
        active: data.active,
      };
      const profile: ProfileType = await fetchSelectedVken();
      if (
        getUserId() === data.owner &&
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
