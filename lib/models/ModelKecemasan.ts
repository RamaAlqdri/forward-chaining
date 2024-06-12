import { Gejala } from "./ModelGejala";

export type Kecemasan = {
  id: string;
  name: string;
  keterangan: string;
  solusi: string;
  rule: Gejala[]; 
  // persentase?: number;
};
