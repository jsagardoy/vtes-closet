import { collection, getDocs } from 'firebase/firestore';

import { TournamentType } from '../types/tournament_type';
import { db } from '../database/config';

const fetchTournaments = async (): Promise<TournamentType[] | any> => {
  try {
    const data = await getDocs(collection(db, `/tournaments`));
    const result = data.docs.map((doc) => doc.data());
    const newResult: TournamentType[] = result.map(
      (elem) =>
        ({ ...elem, eventDate: elem.eventDate.toDate() } as TournamentType)
    );
    return newResult;
  } catch (error) {
    throw error;
  }
};

export default fetchTournaments;
