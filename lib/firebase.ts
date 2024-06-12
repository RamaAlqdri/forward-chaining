// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHvWWe5w2UosflPqWHMX1VuJr4ps465sA",
  authDomain: "es-anxiety-disorders.firebaseapp.com",
  projectId: "es-anxiety-disorders",
  storageBucket: "es-anxiety-disorders.appspot.com",
  messagingSenderId: "241510233183",
  appId: "1:241510233183:web:3c934a7f2b945588ff57ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);