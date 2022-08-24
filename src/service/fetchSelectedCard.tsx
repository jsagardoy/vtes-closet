
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../database/config';
import { CardType } from '../types/deck_type';

export const fetchSelectedCard = async (
  cardId: string,
  cardType:CardType
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
