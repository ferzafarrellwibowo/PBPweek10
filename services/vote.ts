import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const submitVote = async (voterId: string, candidateId: string, candidateName: string) => {
  try {
    await addDoc(collection(db, "votes"), {
      voterId,
      candidateId,
      candidateName,
      createdAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(`Error submitting vote: ${error.message}`);
  }
};
