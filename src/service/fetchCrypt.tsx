import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/config';
import { CryptType } from '../types/crypt_type';

export const fetchCrypt = async ():Promise<CryptType[]|any> => {
  try {
    const data = await getDocs(collection(db, 'crypt'));
    const result: CryptType[] = data.docs.map((doc) => doc.data() as CryptType);
      window.localStorage.setItem('cryptList', JSON.stringify(result));
      return result;
  } catch (error:any) {
      console.log(error);
  }
};
