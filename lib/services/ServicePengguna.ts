import { cache } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  limit,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { set } from "firebase/database";
import { get } from "http";
import { db } from "../firebase";
import { Pengguna } from "../models/ModelPengguna";

async function createUser(pengguna: Pengguna) {
  try {
    const userRef = doc(db, "pengguna", pengguna.id as string);
    await setDoc(userRef, {
      id: pengguna.id,
      name: pengguna.name,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export const servicePengguna = {
  createUser,
};
