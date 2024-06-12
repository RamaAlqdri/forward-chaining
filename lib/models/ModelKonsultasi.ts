import { Gejala } from "./ModelGejala";
import { Kecemasan } from "./ModelKecemasan";

export type KecemasanMatch = {
  kecemasan: Kecemasan;
  matchPercentage: number;
};
export type Konsultasi = {
  id?: string;
  namaPasien?: string;
  kecemasan: KecemasanMatch[];
};
