import { collection, getDocs } from 'firebase/firestore';

import { LibraryType } from '../types/library_type';
import { db } from '../database/config';

export const fetchLibrary = async (): Promise<LibraryType[] | any> => {
  try {
    const data = await getDocs(collection(db, 'library'));
    const result: LibraryType[] = data.docs.map(
      (doc) => doc.data() as LibraryType
    );
    return result;
  } catch (error) {
    throw error;
  }
};
