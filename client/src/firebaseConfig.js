import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnpivtvDO0XegoH96q7ncfa9IxoFIpkU8",
  authDomain: "fire-3f3bd.firebaseapp.com",
  projectId: "fire-3f3bd",
  storageBucket: "fire-3f3bd.appspot.com",
  messagingSenderId: "352487235953",
  appId: "1:352487235953:web:8a904eefc1d636f5fa56d0",
  measurementId: "G-L7PM1VZ6MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage()
export const db = getFirestore(app);
export const message = getMessaging(app)





