// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGJZ7rsdN1q9KLu3VY67EtiQFWyOb0XCQ",
  authDomain: "estrella-movil-c238d.firebaseapp.com",
  projectId: "estrella-movil-c238d",
  storageBucket: "estrella-movil-c238d.appspot.com",
  messagingSenderId: "59605501589",
  appId: "1:59605501589:web:f1ac364bc79850bce07d9c"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig); // Cambia 'app' a 'appFirebase'
export default appFirebase; // Exporta 'appFirebase'
