
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../database/config';

export const fetchSelectedCard = async (
  cardId: string,
  cardType:string
): Promise<any|undefined> => {
  try {
    const q = query(
      collection(db, `${cardType}/`),
      where('id', '==', Number(cardId))
    );
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs;
    return result[0].data();
  } catch (error) {
    console.log('Error in db: ' + error);
  }
};
