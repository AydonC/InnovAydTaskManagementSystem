// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "innovaydtms.firebaseapp.com",
    projectId: "innovaydtms",
    storageBucket: "innovaydtms.firebasestorage.app",
    messagingSenderId: "915414176337",
    appId: "1:915414176337:web:ea3dbd133189f74abd5e70",
    measurementId: "G-GXPHG7TNLD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export { auth,analytics,db };
