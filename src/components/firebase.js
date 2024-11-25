// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATTg_iVdQoxvDN95ZbqJ4Eqrh_3ncEC1I",
  authDomain: "timesheet-cbc5a.firebaseapp.com",
  projectId: "timesheet-cbc5a",
  storageBucket: "timesheet-cbc5a.appspot.com",
  messagingSenderId: "856079680362",
  appId: "1:856079680362:web:c0d5b19e2b8b8d877d9b13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
// export const db = getFirestore(app);
export default app;
