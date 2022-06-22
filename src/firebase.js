// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEAL-RTBgYNMLo1hqMAmWdAX2l3mFqQU0",
  authDomain: "family-trip-planner.firebaseapp.com",
  projectId: "family-trip-planner",
  storageBucket: "family-trip-planner.appspot.com",
  messagingSenderId: "53172198216",
  appId: "1:53172198216:web:ccefe6134999a8366df17d",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);


export default firebase;
