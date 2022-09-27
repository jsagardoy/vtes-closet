import { collection, getDocs } from 'firebase/firestore';

import { CryptType } from '../types/crypt_type';
import { db } from '../database/config';

export const fetchCrypt = async ():Promise<CryptType[]|any> => {
  try {
    const data = await getDocs(collection(db, 'crypt'));
    const result: CryptType[] = data.docs.map((doc) => doc.data() as CryptType);
    return result;
  } catch (error: any) {
    throw (error);
  }
};
