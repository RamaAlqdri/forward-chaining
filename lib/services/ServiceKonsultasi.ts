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
import { Konsultasi } from "../models/ModelKonsultasi";

async function createKonsultasi(konsultasi: Konsultasi) {
  try {
    const userRef = doc(db, "konsultasi", konsultasi.id as string);
    await setDoc(userRef, {
      id: konsultasi.id,
      namaPasien: konsultasi.namaPasien,
      kecemasan: konsultasi.kecemasan,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function updateKonsultasi(konsultasi: Konsultasi) {
  try {
    // Dapatkan referensi dokumen
    const konsultasiRef = doc(db, "konsultasi", konsultasi.id);

    // Cek dulu apakah dokumen dengan ID tersebut ada
    const docSnap = await getDoc(konsultasiRef);

    if (docSnap.exists()) {
      // Jika dokumen ada, lakukan update
      await updateDoc(konsultasiRef, {
        id: konsultasi.id,
        namaPasien: konsultasi.namaPasien,
        kecemasan: konsultasi.kecemasan,
      });
      console.log("Konsultasi updated successfully.");
    } else {
      // Jika tidak ada, bisa throw error atau handle sesuai kebutuhan
      console.error("Konsultasi not found with id:", konsultasi.id);
    }
  } catch (error) {
    console.error("Error updating konsultasi:", error);
  }
}

async function deleteKonsultasi(konsultasiId: string) {
  try {
    // Dapatkan referensi dokumen
    const konsultasiRef = doc(db, "konsultasi", konsultasiId);

    // Hapus dokumen
    await deleteDoc(konsultasiRef);
  } catch (error) {
    console.error("Error deleting konsultasi:", error);
  }
}
async function getKonsultasiList(): Promise<Konsultasi[]> {
  const konsultasiList: Konsultasi[] = [];
  try {
    const q = query(collection(db, "konsultasi"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      konsultasiList.push(doc.data() as Konsultasi);
    });
  } catch (error) {
    console.error("Error getting konsultasi list:", error);
  }
  return konsultasiList;
}
async function getKonsultasiListByUserId(
  userId: string
): Promise<Konsultasi[]> {
  const konsultasiList: Konsultasi[] = [];
  try {
    const q = query(
      collection(db, "konsultasi"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      konsultasiList.push(doc.data() as Konsultasi);
    });
  } catch (error) {
    console.error("Error getting konsultasi list:", error);
  }
  return konsultasiList;
}
async function getKonsultasi(konsultasiId: string): Promise<Konsultasi | null> {
  try {
    // Dapatkan referensi dokumen
    const konsultasiRef = doc(db, "konsultasi", konsultasiId);

    // Dapatkan data dokumen
    const docSnap = await getDoc(konsultasiRef);

    if (docSnap.exists()) {
      // Jika dokumen ada, kembalikan datanya
      return docSnap.data() as Konsultasi;
    } else {
      // Jika tidak ada, kembalikan null
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting konsultasi:", error);
    return null;
  }
}

export const serviceKonsultasi = {
  createKonsultasi,
  updateKonsultasi,
  deleteKonsultasi,
  getKonsultasi,
  getKonsultasiList,
  getKonsultasiListByUserId,
};
