
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add your own Firebase configuration from your web app's Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyD88Krye2Wua7ha2AXAVThHAS-bndA7myM",
  authDomain: "planea-2e853.firebaseapp.com",
  projectId: "planea-2e853",
  storageBucket: "planea-2e853.firebasestorage.app",
  messagingSenderId: "365342710546",
  appId: "1:365342710546:web:2e6a4442d3d1bc1cd2b1cb",
  measurementId: "G-N84562RRMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
