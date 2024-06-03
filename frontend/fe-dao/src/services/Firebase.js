// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getStorage,
} from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZh5llwjiJR4uvAwkDgko1G7vFKx27MvM",
  authDomain: "jewelry-production-order.firebaseapp.com",
  projectId: "jewelry-production-order",
  storageBucket: "jewelry-production-order.appspot.com",
  messagingSenderId: "758144358433",
  appId: "1:758144358433:web:ee5046e954e9015df7ab60",
  measurementId: "G-B6TF05FTS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider;

export {auth,provider,storage};