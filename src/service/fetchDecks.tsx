import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/config';

export const fetchDecks = async (id: string): Promise<string[] | any> => {
try {
    const data = await getDocs(collection(db, `decks/${id}/deck`));
    const result = data.docs.map((doc) => doc.data());
    return result;
  } catch (error: any) {
    console.log(error);
  }
};
