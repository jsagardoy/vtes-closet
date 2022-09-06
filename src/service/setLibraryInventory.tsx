import { doc, setDoc } from 'firebase/firestore';
import { db } from '../database/config';
import { libraryInventoryType, SavedInventoryType } from '../types/inventory_type';
import { getUserId } from '../util';

export const setLibraryInventory = async (libraryList: libraryInventoryType[]) => {
  const uid = getUserId();

  const taskDocRef = doc(db, `/libraryInventory/${uid}/`);
  const inventory: SavedInventoryType[] = libraryList.map((elem) => {
    const newSavedInventoryType: SavedInventoryType = {
      id: elem.id,
      want: elem.want,
      have: elem.have,
      trade: elem.trade,
      used: elem.used,
    };
    return newSavedInventoryType;
  });
  if (taskDocRef) {
    try {
      await setDoc(taskDocRef,{inventoryData:[...inventory]});
      console.log('%cData successfully added. ', 'color:green');
      return 'Data successfully added.';
    } catch (err) {
      console.log('%cError while saving data', 'color:red');
      console.log(err);
      return err;
    }
  }
};
