import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "ISI DARI FIREBASE",
  authDomain: "ISI",
  projectId: "ISI",
  storageBucket: "ISI",
  messagingSenderId: "ISI",
  appId: "ISI",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
