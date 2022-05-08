import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8Aiu-L3e8Yd6iMcU6DNJnvc_HSZ-zSVo",
  authDomain: "cricket-prediction-46486.firebaseapp.com",
  projectId: "cricket-prediction-46486",
  storageBucket: "cricket-prediction-46486.appspot.com",
  messagingSenderId: "10191348877",
  appId: "1:10191348877:web:26e200f34c2fef62d9aec4",
  measurementId: "G-YH65B8JLXM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}
