import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../database/config';
import { getUserId } from '../util';

/* function to update new task to firestore */
export const deleteDeck = async (id: string) => {
  const uid = getUserId();
  const taskDocRef = doc(db, `/decks/${uid}/deck/${id}`);
  if (taskDocRef) {
    try {
      await deleteDoc(taskDocRef);
      console.log('%cData successfully deleted. ', 'color:green');
    } catch (err) {
      console.log('%cError while saving data', 'color:red');
      console.log(err);
    }
  }
};
