// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC83fs6cT9AHcwLpIEMJ50DvcN_I-AyKJ0",
  authDomain: "messenger-appy.firebaseapp.com",
  projectId: "messenger-appy",
  storageBucket: "messenger-appy.appspot.com",
  messagingSenderId: "540503689706",
  appId: "1:540503689706:web:00fd75fc25e66340454a93",
  measurementId: "G-3L8YVZ9BZ7"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);
const db = firebaseApp.firestore();
export default db;
