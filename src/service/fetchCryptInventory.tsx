import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/config';
import { CryptType } from '../types/crypt_type';

export const fetchCryptInventory = async (): Promise<CryptType[] | any> => {
  try {
    const data = await getDocs(collection(db, 'cryptInventory'));
    const result: CryptType[] = data.docs.map((doc) => doc.data() as CryptType);
    return result;
  } catch (error: any) {
    console.log(error);
  }
};
