// src/components/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAFfILeX83DYiFjuo_It4bgNNU8QzW66q0",
  authDomain: "quicknotes-app-cd5a1.firebaseapp.com",
  projectId: "quicknotes-app-cd5a1",
  storageBucket: "quicknotes-app-cd5a1.appspot.com",
  messagingSenderId: "211795834746",
  appId: "1:211795834746:web:bffe46c636331eaf5708c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Setup services
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ✅ Export utility functions
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logOut = () => signOut(auth);
export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
