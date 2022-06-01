import { doc, setDoc } from 'firebase/firestore';
import { db } from '../database/config';
import { getUserId } from '../util';

const splitData = (data: []) => {
  const size = data.length;
  const divider = Math.floor(size / 4);
  const data1 = data.filter((value, index) => index <= divider);
  const data2 = data.filter(
    (value, index) => index > divider && index <= divider * 2
  );
  const data3 = data.filter(
    (value, index) => index > divider * 2 && index <= divider * 3
  );
  const data4 = data.filter((value, index) => index > divider * 4);
  const result = { data1: data1, data2: data2, data3: data3, data4: data4 };
  return result;
};
/* function to add new task to firestore */
export const setLibraryInventory = async (): Promise<string> => {
  const dataString = window.sessionStorage.getItem('libraryInventoryList');
  if (dataString) {
    const data = JSON.parse(dataString);
    const datas = splitData(data);
    const uid = getUserId();
    const newData1 = { uid: uid, inventory: datas.data1 };
    const newData2 = { uid: uid, inventory: datas.data2 };
    const newData3 = { uid: uid, inventory: datas.data3 };
    const newData4 = { uid: uid, inventory: datas.data4 };
    const taskDocRef1 = doc(db, 'libraryInventory', `${uid}-1`);
    const taskDocRef2 = doc(db, 'libraryInventory', `${uid}-2`);
    const taskDocRef3 = doc(db, 'libraryInventory', `${uid}-3`);
    const taskDocRef4 = doc(db, 'libraryInventory', `${uid}-4`);

    try {
      await setDoc(taskDocRef1, newData1, { merge: true });
      await setDoc(taskDocRef2, newData2, { merge: true });
      await setDoc(taskDocRef3, newData3, { merge: true });
      await setDoc(taskDocRef4, newData4, { merge: true });

      return 'Data successfully added.';
    } catch (err) {
      console.log(err);
      return 'Error while saving data';
    }
  }
  return 'Error';
};
