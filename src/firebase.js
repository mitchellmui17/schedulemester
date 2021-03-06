/* istanbul ignore file */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import "firebase/auth";



var app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});
class Fire {
    

    getCollection = (collection) => {
        return firebase.firestore().collection(collection);
    }

    // Used for realtime database
    getRef = (reference) => {
        return firebase.database().ref(reference);
    }

    getStorage = () =>{
        return firebase.storage().ref();
    }

    off() {
        this.ref.off();
    }
    getTime = () =>{
      return firebase.firestore.Timestamp.now();
  }
}

Fire.db = new Fire();
export const auth= app.auth();
export default Fire;