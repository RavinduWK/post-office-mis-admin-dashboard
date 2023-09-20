// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
console.log(process.env);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const imageDB = getStorage(app);

export { app, auth, db, imageDB };
