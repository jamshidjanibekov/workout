import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAviZ4Q9oMsYCTZC9mM-JFctVCYar5jo8k",
  authDomain: "workout-eb148.firebaseapp.com",
  projectId: "workout-eb148",
  storageBucket: "workout-eb148.appspot.com",
  messagingSenderId: "925108964407",
  appId: "1:925108964407:web:b238e080c9322210bc03b2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}