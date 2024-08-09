// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiTKT5dhvNgKnxh9tnD3zYc_M8LuzBZKo",
  authDomain: "shelfsense-7f38f.firebaseapp.com",
  projectId: "shelfsense-7f38f",
  storageBucket: "shelfsense-7f38f.appspot.com",
  messagingSenderId: "58522990124",
  appId: "1:58522990124:web:e137a762f365fe6b930389",
  measurementId: "G-MZFZFMHNS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}