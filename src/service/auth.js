import firebaseApp from '../config/firebase.config';
import { signInWithPopup, getAuth } from 'firebase/auth';

const socialMediaAuth = (provider) => {
     const auth = getAuth();
     signInWithPopup(auth,provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
};

export default socialMediaAuth;