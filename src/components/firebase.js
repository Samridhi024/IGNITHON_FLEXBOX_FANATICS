// // src/components/firebase.js
// import { initializeApp } from "firebase/app";
// import { 
//   getAuth, 
//   GoogleAuthProvider, 
//   signInWithPopup, 
//   signOut, 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword 
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyAFfILeX83DYiFjuo_It4bgNNU8QzW66q0",
//   authDomain: "quicknotes-app-cd5a1.firebaseapp.com",
//   projectId: "quicknotes-app-cd5a1",
//   storageBucket: "quicknotes-app-cd5a1.appspot.com",
//   messagingSenderId: "211795834746",
//   appId: "1:211795834746:web:bffe46c636331eaf5708c3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // ✅ Setup services
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// const provider = new GoogleAuthProvider();

// // ✅ Export utility functions
// export const signInWithGoogle = () => signInWithPopup(auth, provider);
// export const logOut = () => signOut(auth);
// export const registerWithEmail = (email, password) =>
//   createUserWithEmailAndPassword(auth, email, password);
// export const loginWithEmail = (email, password) =>
//   signInWithEmailAndPassword(auth, email, password);


import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
// Import Firestore functions
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFfILeX83DYiFjuo_It4bgNNU8QzW66q0",
  authDomain: "quicknotes-app-cd5a1.firebaseapp.com",
  projectId: "quicknotes-app-cd5a1",
  storageBucket: "quicknotes-app-cd5a1.appspot.com",
  messagingSenderId: "211795834746",
  appId: "1:211795834746:web:bffe46c636331eaf5708c3"
};

const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- Auth Functions ---

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if user is new and save to DB (optional, but good practice)
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    }, { merge: true }); // merge: true prevents overwriting existing data
    
    return user;
  } catch (error) {
    console.error("Google Sign In Error:", error);
    throw error;
  }
};

export const logOut = () => signOut(auth);

export const loginWithEmail = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

// ✅ THE FIXED REGISTRATION FUNCTION
export const registerWithEmail = async (email, password) => {
  // 1. Create User in Authentication
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  // 2. Create User Document in Firestore Database
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    createdAt: new Date().toISOString(),
    role: "student" // You can add default fields here
  });

  return user;
};
