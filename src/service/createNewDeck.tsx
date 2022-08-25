import {
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../database/config';
import { DeckType } from '../types/deck_type';
import { getUserId } from '../util';

/* function to update new task to firestore */
export const createNewDeck = async (data: DeckType) => {
  const uid = getUserId();
  const taskDocRef = doc(db, `/decks/${uid}/deck/${data.id}`);
  if (taskDocRef) {
    try {
        const elem = {
          id:data.id,
        crypt: data.crypt,
        deckType: data.deckType,
        description: data.description,
        library: data.library,
        name: data.name,
      };
      await setDoc(taskDocRef, elem);
      console.log('%cData successfully added. ', 'color:green');
    } catch (err) {
      console.log('%cError while saving data', 'color:red');
      console.log(err);
    }
  }
};
