import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"

import { getFirestore } from "firebase/firestore"

import { getStorage } from "firebase/storage"

const firebaseConfig = {

  apiKey:
    "AIzaSyBbU__StzXkCGA-rKF8jnqExe0LH2ilu10",

  authDomain:
    "eventsphere-901e2.firebaseapp.com",

  projectId:
    "eventsphere-901e2",

  storageBucket:
    "eventsphere-901e2.appspot.com",

  messagingSenderId:
    "830252416179",

  appId:
    "1:830252416179:web:c03a1f90a3798c721f44c6",

  measurementId:
    "G-G80M14L44L"

}

// INITIALIZE FIREBASE

const app =
  initializeApp(firebaseConfig)

// AUTH

export const auth =
  getAuth(app)

// FIRESTORE DATABASE

export const db =
  getFirestore(app)

// STORAGE

export const storage =
  getStorage(app)

// EXPORT APP

export default app