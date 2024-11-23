import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfNuE2yEDZQspgrtczjX-m-FMfEleJLzo",
  authDomain: "quest-c4569.firebaseapp.com",
  projectId: "quest-c4569",
  storageBucket: "quest-c4569.appspot.com",
  messagingSenderId: "900838041663",
  appId: "1:900838041663:web:6da02ef8558f591a95308a",
  measurementId: "G-25H02XS2W1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

