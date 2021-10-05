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
const app = initializeApp(firebaseConfig);
//const analytics =getAnalytics();

export default app;




