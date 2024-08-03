// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi77oavvSlwE4YyL7V40MOuGo6YoZW2r0",
  authDomain: "prithviapp-7e7ff.firebaseapp.com",
  projectId: "prithviapp-7e7ff",
  storageBucket: "prithviapp-7e7ff.appspot.com",
  messagingSenderId: "772937698513",
  appId: "1:772937698513:web:9f3011ad840dce0aa2c9f0",
  measurementId: "G-0V5X492H27"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
