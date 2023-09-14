// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuYYZazxHt-Kl5vWNfLnfffVrYGDBdgeo",
  authDomain: "pomis-g6.firebaseapp.com",
  projectId: "pomis-g6",
  storageBucket: "pomis-g6.appspot.com",
  messagingSenderId: "64553418375",
  appId: "1:64553418375:web:020ebb3213899307264222",
  measurementId: "G-TQDD31GN0F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
