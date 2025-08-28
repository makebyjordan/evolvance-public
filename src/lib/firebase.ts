
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8i-hGFLT_cRk_5F3KKL1d_l2_u3d1iWw",
  authDomain: "evol-vance-landing2.firebaseapp.com",
  projectId: "evol-vance-landing2",
  storageBucket: "evol-vance-landing2.appspot.com",
  messagingSenderId: "203459118563",
  appId: "1:203459118563:web:7f4257c40d95738c3c4cd6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
