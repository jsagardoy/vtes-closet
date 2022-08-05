import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../database/config';

export const fetchSelectedDeck = async (
  userId: string,
  deckId: string
): Promise<string[] | any> => {
  try {
    const q = query(
      collection(db, `decks/${userId}/deck`),
      where('id', '==', deckId)
    );
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs
    return result;
    //return (querySnapshot.forEach((doc) => { return doc.data() }));
  } catch (error) {
    console.log('Error in db: ' + error);
  }
};
