import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBjm5Rdo8looxeoULceatVgrlJPnWbB9WE",
  authDomain: "book-iaas.firebaseapp.com",
  projectId: "book-iaas",
  storageBucket: "book-iaas.appspot.com",
  messagingSenderId: "187603931070",
  appId: "1:187603931070:web:e1905f2e9f64eb6a3633ef"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);