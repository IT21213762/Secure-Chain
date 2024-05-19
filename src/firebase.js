import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSBgdClhHGQPV40B4GUaNG5rUHje9kpjI",
  authDomain: "cloud-storage-solution.firebaseapp.com",
  databaseURL: "https://cloud-storage-solution-default-rtdb.firebaseio.com",
  projectId: "cloud-storage-solution",
  storageBucket: "cloud-storage-solution.appspot.com",
  messagingSenderId: "679645675510",
  appId: "1:679645675510:web:49e53558ddda948f12d1d7",
  measurementId: "G-HW1WL5FV70"
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