import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

export const auth = app.auth();
export const storage = app.storage();
const fireStore = app.firestore();
export const database = {
  folders: fireStore.collection('folders'),
  files: fireStore.collection('files'),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,

  // ? Function to make folder or file in association with parent file
  formattedDoc: (doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  },

  // ? Function to format folder tree
  formattedTree: (doc, type) => {
    return {
      id: doc.id,
      type: type,
      ...doc.data(),
    };
  },
};
export default app;
