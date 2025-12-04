import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setItem, removeItem, getItem } from "../storage/mmkv";

export const login = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password);

  setItem("user", {
    uid: user.user.uid,
    email: user.user.email,
  });

  return user;
};

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logout = async () => {
  await auth.signOut();
  removeItem("user");
};

export const getCurrentUser = () => getItem("user");
