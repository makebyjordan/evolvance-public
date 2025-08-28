
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  "projectId": "evol-vance-landing2",
  "appId": "1:203459118563:web:7f4257c40d95738c3c4cd6",
  "storageBucket": "evol-vance-landing2.appspot.com",
  "apiKey": "AIzaSyAE_3XYQsROWwLxmpzUYcjl96FB2JLVFcc",
  "authDomain": "evol-vance-landing2.firebaseapp.com",
  "messagingSenderId": "203459118563"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
