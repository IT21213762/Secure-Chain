import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// INITIALISE FIREBASE INSTANCES
export const app = firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   const app = firebase.initializeApp(firebaseConfig);
// } else {
//   const app = firebase.app();
// }
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// FIREBASE AUTH METHODS
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithRedirect(provider);