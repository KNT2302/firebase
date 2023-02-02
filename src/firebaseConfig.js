// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_URDDHNvpH2tMTf05NgVhPNG74pJP5Fo",
  authDomain: "fir-e1453.firebaseapp.com",
  projectId: "fir-e1453",
  storageBucket: "fir-e1453.appspot.com",
  messagingSenderId: "935112740518",
  appId: "1:935112740518:web:acbb29b2a11828b98b2e67"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

