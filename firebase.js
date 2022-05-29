// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase, ref} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA_cS264fnfaxMJvSaCoeC2-odkm57BBw",
  authDomain: "linetime-c6e02.firebaseapp.com",
  databaseURL: "https://linetime-c6e02-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "linetime-c6e02",
  storageBucket: "linetime-c6e02.appspot.com",
  messagingSenderId: "1075377844207",
  appId: "1:1075377844207:web:b8327bcaa6dea2e8afd01a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// get the users collection
export const habitsRef = ref(db, "habits");