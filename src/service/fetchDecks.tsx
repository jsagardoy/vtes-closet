import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/config';
import { DeckType } from '../types/deck_type';

export const fetchDecks = async (): Promise<DeckType[] | any> => {
  try {
    const data = await getDocs(collection(db, 'decks'));
    const result: DeckType[] = data.docs.map((doc) => doc.data() as DeckType);
    return result;
  } catch (error: any) {
    console.log(error);
  }
};
