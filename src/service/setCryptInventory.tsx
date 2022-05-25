import { doc, setDoc } from 'firebase/firestore';
import { db } from '../database/config';
import { getUserId } from '../util';

const splitData = (data: []) => {
  const size = data.length;
  const divider = Math.floor(size / 2);
  const data1 = data.filter((value, index) => index <= divider);
  const data2 = data.filter((value, index) => index > divider);
  const result = { data1: data1, data2: data2 };
  return result;
};
/* function to add new task to firestore */
export const setCryptInventory = async ():Promise<string> => {
  const dataString = window.sessionStorage.getItem('cryptInventoryList');
  if (dataString) {
    const data = JSON.parse(dataString);
    const datas = splitData(data);
    const uid = getUserId();
    const newData1 = { uid: uid, inventory: datas.data1 };
    const newData2 = { uid: uid, inventory: datas.data2 };
    const taskDocRef1 = doc(db, 'cryptInventory', `${uid}-1`);
    const taskDocRef2 = doc(db, 'cryptInventory', `${uid}-2`);

    try {
      await setDoc(taskDocRef1, newData1,{merge:true});
      await setDoc(taskDocRef2, newData2, { merge: true });
      return ('Data successfully added.');
    } catch (err) {
      console.log(err);
      return ('Error while saving data');
    }
  }
  return ('Error');
};
