import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaCf59G06D656j5Vyg1CQQJUb4J6rxzs0",
  authDomain: "hng-project-96085.firebaseapp.com",
  databaseURL: "https://hng-project-96085-default-rtdb.firebaseio.com",
  projectId: "hng-project-96085",
  storageBucket: "hng-project-96085.appspot.com",
  messagingSenderId: "532587848915",
  appId: "1:532587848915:web:84c298cf785911a8a56026",
  measurementId: "G-ST0LKNGMPJ",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const auth = getAuth(app);
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const Provider = new GoogleAuthProvider();

export { storage, db, timestamp, auth };
