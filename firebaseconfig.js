// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDGJZ7rsdN1q9KLu3VY67EtiQFWyOb0XCQ",
//   authDomain: "estrella-movil-c238d.firebaseapp.com",
//   projectId: "estrella-movil-c238d",
//   storageBucket: "estrella-movil-c238d.appspot.com",
//   messagingSenderId: "59605501589",
//   appId: "1:59605501589:web:f1ac364bc79850bce07d9c"
// };

// // Initialize Firebase app (only if it's not already initialized)
// //const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Auth with AsyncStorage for persistence
// export default app

// // Initialize Firestore
// const firestore = getFirestore(app);

// // Export app, auth, and firestore for use in other files

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGJZ7rsdN1q9KLu3VY67EtiQFWyOb0XCQ",
  authDomain: "estrella-movil-c238d.firebaseapp.com",
  projectId: "estrella-movil-c238d",
  storageBucket: "estrella-movil-c238d.appspot.com",
  messagingSenderId: "59605501589",
  appId: "1:59605501589:web:f1ac364bc79850bce07d9c"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };