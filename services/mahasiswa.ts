import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getMahasiswa = async () => {
  try {
    const snap = await getDocs(collection(db, "mahasiswa"));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.log("Error getMahasiswa:", error);
    return [];
  }
};
