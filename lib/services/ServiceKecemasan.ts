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
import { Kecemasan } from "../models/ModelKecemasan";

async function createKecemasan(kecemasan: Kecemasan) {
  try {
    const kecemasanRef = collection(db, "kecemasan");
    const docRef = doc(kecemasanRef, kecemasan.id as string);
    await setDoc(docRef, {
      id: kecemasan.id,
      name: kecemasan.name,
      keterangan: kecemasan.keterangan,
      solusi: kecemasan.solusi,
      rule: kecemasan.rule,
    });
  } catch (error) {
    console.error("Error creating Kecemasan:", error);
  }
}

async function updateKecemasan(kecemasan: Kecemasan) {
  try {
    // Dapatkan referensi dokumen
    const kecemasanRef = doc(db, "kecemasan", kecemasan.id);

    // Cek dulu apakah dokumen dengan ID tersebut ada
    const docSnap = await getDoc(kecemasanRef);

    if (docSnap.exists()) {
      // Jika dokumen ada, lakukan update
      await updateDoc(kecemasanRef, {
        id: kecemasan.id,
        name: kecemasan.name,
        keterangan: kecemasan.keterangan,
        solusi: kecemasan.solusi,
        rule: kecemasan.rule,
      });
      console.log("Kecemasan updated successfully.");
    } else {
      // Jika tidak ada, bisa throw error atau handle sesuai kebutuhan
      console.error("Kecemasan not found with id:", kecemasan.id);
    }
  } catch (error) {
    console.error("Error updating kecemasan:", error);
  }
}
async function deleteKecemasan(kecemasanId: string) {
  try {
    // Dapatkan referensi dokumen
    const kecemasanRef = doc(db, "kecemasan", kecemasanId);

    // Hapus dokumen
    await deleteDoc(kecemasanRef);
    console.log("Kecemasan deleted successfully.");
  } catch (error) {
    console.error("Error deleting kecemasan:", error);
  }
}

async function getKecemasan(kecemasanId: string) {
  try {
    // Dapatkan referensi dokumen
    const kecemasanRef = doc(db, "kecemasan", kecemasanId);

    // Dapatkan data dokumen
    const docSnap = await getDoc(kecemasanRef);

    if (docSnap.exists()) {
      // Jika dokumen ada, kembalikan datanya
      return docSnap.data();
    } else {
      // Jika tidak ada, kembalikan null
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting kecemasan:", error);
    return null;
  }
}

async function getKecemasanList(): Promise<Kecemasan[]> {
  try {
    // Dapatkan semua dokumen di koleksi "kecemasan"
    const kecemasanCol = collection(db, "kecemasan");
    const kecemasanList = await getDocs(kecemasanCol);

    // Kembalikan data dalam bentuk array
    return kecemasanList.docs.map((doc) => doc.data()) as Kecemasan[];
  } catch (error) {
    console.error("Error getting kecemasan list:", error);
    return [];
  }
}

export const serviceKecemasan = {
  createKecemasan,
  updateKecemasan,
  deleteKecemasan,
  getKecemasan,
  getKecemasanList,
};
