import { getAuth, signInWithPopup } from 'firebase/auth';
import {initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCWJ0PHARm4HTGJJ_Ijav8X3Y8iHlyby0c',
  authDomain: 'vtes-closet-backend.firebaseapp.com',
  projectId: 'vtes-closet-backend',
  storageBucket: 'vtes-closet-backend.appspot.com',
  messagingSenderId: '400873311764',
  appId: '1:400873311764:web:2c5812f59576189ddda101',
  measurementId: 'G-ZF824Q4QJX',
};

//initialize firabase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
auth.useDeviceLanguage();

const socialMediaAuth = (provider) => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
};

export default socialMediaAuth;