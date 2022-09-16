import { doc, updateDoc } from 'firebase/firestore';

import { DeckType } from '../types/deck_type';
import { db } from '../database/config';
import { getUserId } from '../util';

/* function to update new task to firestore */
export const updateDeckService = async (data: DeckType) => {
  const uid = getUserId();
  const taskDocRef = doc(db, `/decks/${uid}/deck/${data.id}`);
  if (taskDocRef) {
    try {
      const elem = {
        id: data.id,
        crypt: data.crypt,
        deckType: data.deckType,
        description: data.description,
        library: data.library,
        name: data.name,
      };
      await updateDoc(taskDocRef, elem);
      console.log('%cData successfully added. ', 'color:green');
    } catch (error) {
      throw error;
    }
  }
};
