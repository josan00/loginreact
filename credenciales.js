// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFfutNZZOJZV_Kiga4-LNkr1PAegg7vYE",
  authDomain: "loginfirebaseauth-66e17.firebaseapp.com",
  projectId: "loginfirebaseauth-66e17",
  storageBucket: "loginfirebaseauth-66e17.firebasestorage.app",
  messagingSenderId: "843031611638",
  appId: "1:843031611638:web:cc4db9dd5c49a9621544d7",
  measurementId: "G-5VD9VZTX9H"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default appFirebase