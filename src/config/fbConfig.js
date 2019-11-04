import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  ***your firebase config***
};

firebase.initializeApp(firebaseConfig);

export default firebase;