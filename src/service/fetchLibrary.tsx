import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/config';
import { LibraryType } from '../types/library_type';

export const fetchLibrary = async (): Promise<LibraryType[] | any> => {
  try {
    const data = await getDocs(collection(db, 'library'));
    const result: LibraryType[] = data.docs.map(
      (doc) => doc.data() as LibraryType
    );
    window.localStorage.setItem('libraryList', JSON.stringify(result));
    return result;
  } catch (error) {
    console.log(error);
  }
};
