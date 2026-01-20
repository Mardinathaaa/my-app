
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
console.log("🔥 firebase.js loaded");
const firebaseConfig = {
  apiKey: "AIzaSyDd213dylJJoiaGDxrsxizZeULELXqA58s",
  authDomain: "cv-app-73913.firebaseapp.com",
  projectId: "cv-app-73913",
  storageBucket: "cv-app-73913.appspot.com",
  messagingSenderId: "1063583855261",
  appId: "1:1063583855261:web:adecd54da2f9ddfb999a74",
  measurementId: "G-RT7DD83XK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("🔥 firebase initialized");
export const db = getFirestore(app);
export const storage = getStorage(app);