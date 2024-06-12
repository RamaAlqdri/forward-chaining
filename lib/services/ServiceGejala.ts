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
  deleteDoc,
} from "firebase/firestore";
import { set } from "firebase/database";
import { get } from "http";
import { db } from "../firebase";
import { Pengguna } from "../models/ModelPengguna";
import { Gejala } from "../models/ModelGejala";

async function createGejala(gejala: Gejala) {
  try {
    console.log(db)
    console.log(gejala)
    const gejalaRef = collection(db, "gejala");
    const docRef = doc(gejalaRef, gejala.id as string);
    await setDoc(docRef, {
      id: gejala.id,
      name: gejala.name,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
async function updateGejala(gejala: Gejala) {
  try {
    // Dapatkan referensi dokumen
    const gejalaRef = doc(db, "gejala", gejala.id);

    // Cek dulu apakah dokumen dengan ID tersebut ada
    const docSnap = await getDoc(gejalaRef);

    if (docSnap.exists()) {
      // Jika dokumen ada, lakukan update
      await updateDoc(gejalaRef, {
        id: gejala.id,
        name: gejala.name,
      });
      console.log("Gejala updated successfully.");
    } else {
      // Jika tidak ada, bisa throw error atau handle sesuai kebutuhan
      console.error("Gejala not found with id:", gejala.id);
    }
  } catch (error) {
    console.error("Error updating gejala:", error);
  }
}
async function deleteGejala(gejalaId: string) {
  try {
    // Dapatkan referensi dokumen
    const gejalaRef = doc(db, "gejala", gejalaId);

    // Hapus dokumen
    await deleteDoc(gejalaRef);
    console.log("Gejala deleted successfully.");
  } catch (error) {
    console.error("Error deleting gejala:", error);
  }
}
async function getGejala(gejalaId: string) {
  try {
    // Dapatkan referensi dokumen
    const gejalaRef = doc(db, "gejala", gejalaId);

    // Dapatkan data dokumen
    const docSnap = await getDoc(gejalaRef);

    if (docSnap.exists()) {
      // Jika dokumen ada, kembalikan datanya
      return docSnap.data();
    } else {
      // Jika tidak ada, kembalikan null
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting gejala:", error);
    return null;
  }
}
async function getGejalaList(): Promise<Gejala[]> {
  try {
    // Dapatkan semua dokumen di koleksi "gejala"
    const gejalaCol = collection(db, "gejala");
    const gejalaList = await getDocs(gejalaCol);

    // Kembalikan data dalam bentuk array
    return gejalaList.docs.map((doc) => doc.data()) as Gejala[];
  } catch (error) {
    console.error("Error getting gejala list:", error);
    return [];
  }
}

export const serviceGejala = {
  createGejala,
  updateGejala,
  deleteGejala,
  getGejala,
  getGejalaList,
};
