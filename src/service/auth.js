import app from '../config/firebase.config.js';
import {Auth, signInWithPopup} from 'firebase/auth';


const socialMediaAuth = (provider) => {
  return signInWithPopup(provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
    /*
  return app
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    }); */
};

export default socialMediaAuth;