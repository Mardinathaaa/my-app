// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);