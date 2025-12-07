import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDF2LcfA6xmLotTAB9up7gczP8jgWftDg",
  authDomain: "votingketua-915fb.firebaseapp.com",
  projectId: "votingketua-915fb",
  storageBucket: "votingketua-915fb.appspot.com",
  messagingSenderId: "950512411290",
  appId: "1:950512411290:web:0d1a793b26f92d9d943523",
};

const app = initializeApp(firebaseConfig);

// Auth dengan persistence AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
