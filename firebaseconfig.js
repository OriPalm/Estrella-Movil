// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  
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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence

// Export app and auth for use in other files
export { app, auth };
