import { collection, getDocs, query, where } from 'firebase/firestore';

import { CardType } from '../types/deck_type';
import { db } from '../database/config';

export const fetchSelectedCard = async (
  cardId: string,
  cardType: CardType
): Promise<any | undefined> => {
  try {
    const q = query(
      collection(db, `${cardType}/`),
      where('id', '==', Number(cardId))
    );
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs;
    return result[0].data();
  } catch (error) {
    throw error;
  }
};
