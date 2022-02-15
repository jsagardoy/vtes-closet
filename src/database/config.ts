import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../service/auth';


export const db = getFirestore(firebaseApp);


