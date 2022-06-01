// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA_cS264fnfaxMJvSaCoeC2-odkm57BBw",
  authDomain: "linetime-c6e02.firebaseapp.com",
  projectId: "linetime-c6e02",
  storageBucket: "linetime-c6e02.appspot.com",
  messagingSenderId: "1075377844207",
  appId: "1:1075377844207:web:b8327bcaa6dea2e8afd01a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

