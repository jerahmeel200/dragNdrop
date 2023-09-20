import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
