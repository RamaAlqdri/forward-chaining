"use client";
import { Gejala } from "@/lib/models/ModelGejala";
import { Kecemasan } from "@/lib/models/ModelKecemasan";
import { KecemasanMatch, Konsultasi } from "@/lib/models/ModelKonsultasi";
import { serviceGejala } from "@/lib/services/ServiceGejala";
import { serviceKecemasan } from "@/lib/services/ServiceKecemasan";
import { Select, SelectItem } from "@tremor/react";
import { randomUUID } from "crypto";
import { set } from "firebase/database";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Home() {
  const [dataGejala, setDataGejala] = useState<Gejala[]>([]);
  const [dataKecemasan, setDataKecemasan] = useState<Kecemasan[]>([]);
  const [hasilKonsultasi, setHasilKonsultasi] = useState<Konsultasi>({
    kecemasan: [],
  } as Konsultasi);
  const [rule, setRule] = useState<Gejala[]>([]);
  console.log(rule);

  useEffect(() => {
    const fetchData = async () => {
      const response = await serviceGejala.getGejalaList();
      const fetchKecemasan = await serviceKecemasan.getKecemasanList();
      setDataGejala(response);
      setDataKecemasan(fetchKecemasan);
    };
    fetchData();
  }, []);

  const [showKonsultasi, setShowKonsultasi] = useState(true);
  const [showResultKonsultasi, setShowResultKonsultasi] = useState(false);

  return (
    <div className="w-full flex justify-center mt-16">
      <div className="w-full flex flex-col items-center mt-8">
        <p className="text-2xl text-white/80 font-semibold text-start mb-2">
          Konsultasi
        </p>
        <DoKonsultasi
          rule={rule}
          setRule={setRule}
          visible={showKonsultasi}
          setVisible={setShowKonsultasi}
          dataGejala={dataGejala}
          dataKecemasan={dataKecemasan}
          setVisibleResult={setShowResultKonsultasi}
          setHasilKonsultasi={setHasilKonsultasi}
        />
        <ResultKonsultasi
          setRule={setRule}
          rule={rule}
          setShowKonsultasi={setShowKonsultasi}
          visible={showResultKonsultasi}
          setVisible={setShowResultKonsultasi}
          hasilKonsultasi={hasilKonsultasi}
        />
      </div>
    </div>
  );
}

interface KonsultasiProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  dataGejala: Gejala[];
  dataKecemasan: Kecemasan[];
  setVisibleResult: (visible: boolean) => void;

  rule: Gejala[];
  setRule: (rule: Gejala[]) => void;
  setHasilKonsultasi: (hasilKonsultasi: Konsultasi) => void;
}
const DoKonsultasi = ({
  visible,
  setVisible,
  dataGejala,
  dataKecemasan,
  setVisibleResult,

  setHasilKonsultasi,
  setRule,
}: KonsultasiProps) => {
  const [rule, setRuleTemp] = useState<Gejala[]>([]);

  useEffect(() => {
    setRule(rule);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rule]);
  if (!visible) {
    return null;
  }

  const handleCheckboxChange = (gejala: Gejala, isChecked: boolean) => {
    if (isChecked) {
      // Tambahkan gejala ke array jika checkbox dicentang
      setRuleTemp((prev) => [...prev, gejala]);
    } else {
      // Hapus gejala dari array jika checkbox tidak dicentang
      setRuleTemp((prev) => prev.filter((item) => item.id !== gejala.id));
    }
  };
  const calculateMatchPercentages = (
    userRules: Gejala[],
    kecemasanArray: Kecemasan[]
  ): Konsultasi => {
    const kecemasanMatches: KecemasanMatch[] = kecemasanArray.map(
      (kecemasan) => {
        const matchCount = userRules.reduce((count, rule) => {
          return (
            count +
            (kecemasan.rule.some((kRule) => kRule.id === rule.id) ? 1 : 0)
          );
        }, 0);
        const matchPercentage =
          kecemasan.rule.length > 0
            ? (matchCount / kecemasan.rule.length) * 100
            : 0;
        return {
          kecemasan,
          matchPercentage,
        };
      }
    );

    return { kecemasan: kecemasanMatches };
  };
  const handleKonsultasi = () => {
    if (rule.length === 0) {
      alert("Pilih gejala terlebih dahulu");
      return;
    }
    const hasilKonsultasi = calculateMatchPercentages(rule, dataKecemasan);
    setHasilKonsultasi(hasilKonsultasi);
    setVisible(false);
    setVisibleResult(true);
  };
  // console.log(hasilKonsultasi);

  return (
    <div className="flex flex-col w-[80%] py-4 px-6 bg-[#272B2F]   rounded-3xl">
      <div className="overflow-x-auto">
        <table className="w-full mt-2 table-fixed">
          {/* head */}
          <thead className="w-full">
            <tr className="w-full h-10  ">
              <th className="w-[3rem] text-white/80 text-base text-center ">
                Pilih
              </th>
              <th className=" text-white/80 text-base text-center">Gejala</th>
            </tr>
          </thead>
          <tbody className="">
            {dataGejala.map((gejala, index) => (
              <tr key={gejala.id} className=" border-y-[0.2px] border-white/20">
                <td className="flex justify-center h-14 items-center   space-x-2 px-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(gejala, e.target.checked)
                    }
                    checked={rule.some((item) => item.id === gejala.id)}
                  />
                </td>
                <td className="text-base text-wrap  text-white/70 px-2 ">
                  {gejala.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-4 justify-between">
        <div className="flex space-x-3">
          <button
            onClick={handleKonsultasi}
            // onClick={() => setShowPopUpTambahData(true)}
            className="btn bg-[#1FC2AD]/10 border-none text-[#1FC2AD] rounded-xl  text-base px-4 w-fit"
          >
            Analisa
          </button>
        </div>
      </div>
    </div>
  );
};

interface ResultKonsultasiProps {
  hasilKonsultasi: Konsultasi;
  rule: Gejala[];
  setRule: (rule: Gejala[]) => void;
  visible: boolean;
  setShowKonsultasi: (visible: boolean) => void;
  setVisible: (visible: boolean) => void;
}
const ResultKonsultasi = ({
  hasilKonsultasi,
  visible,
  setVisible,
  setShowKonsultasi,
  rule,
  setRule,
}: ResultKonsultasiProps) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="flex flex-col w-[80%] py-4 px-6 bg-[#272B2F]   rounded-3xl">
      <div className="overflow-x-auto">
        <p className="text-center mt-2 text-base   py-2 text-white/70 px-2">
          Gejala Yang Dialami
        </p>
        <table className="w-full mt-2 table-fixed">
          {/* head */}

          <thead className="w-full">
            <tr className="w-full h-10  ">
              <th className="w-10 border-[0.2px] border-white/20 text-white/80 text-base text-center">
                No
              </th>
              <th className=" text-white/80 text-base border-[0.2px] border-white/20 text-center">
                Gejala
              </th>
            </tr>
          </thead>
          <tbody className="">
            {rule.map((gejala, index) => (
              <tr key={gejala.id} className=" border-y-[0.2px] border-white/20">
                <td className="text-base text-wrap border-[0.2px] border-white/20 text-center text-white/70 px-2 ">
                  {index + 1}
                </td>
                <td className="text-base text-wrap  border-[0.2px] border-white/20 py-2 text-white/70 px-2 ">
                  {gejala.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-center mt-5 text-base   py-2 text-white/70 px-2">
          Hasil Konsultasi
        </p>
        <table className="w-full table-fixed">
          {/* head */}
          <thead className="w-full">
            <tr className="w-full h-10  ">
              <th className="w-10 border-[0.2px] border-white/20 text-white/80 text-base text-center">
                No
              </th>

              <th className=" text-white/80 text-base text-center border-[0.2px] border-white/20">
                Kecemasan
              </th>
              <th className=" text-white/80 text-base border-[0.2px] border-white/20 text-center">
                Persentase
              </th>
              <th className=" text-white/80 text-base text-center border-[0.2px] border-white/20">
                Solusi
              </th>
            </tr>
          </thead>
          <tbody className="">
            {hasilKonsultasi.kecemasan.sort((a, b) => b.matchPercentage - a.matchPercentage).map((kecemasan, index) => (
              <tr key={index} className=" border-y-[0.2px] border-white/20">
                <td className="text-base text-wrap border-[0.2px] border-white/20 text-center text-white/70 px-2 ">
                  {index + 1}
                </td>
                <td className="text-base text-wrap text-center border-[0.2px] border-white/20  text-white/70 px-2 ">
                  {kecemasan.kecemasan.name}
                </td>
                <td className="text-base text-wrap text-center  border-[0.2px] border-white/20 text-white/70 px-2 ">
                  {kecemasan.matchPercentage}
                </td>
                <td className="text-base text-wrap py-2 border-[0.2px] border-white/20 text-white/70 px-2 ">
                  {kecemasan.kecemasan.solusi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-4 justify-between">
        <div className="flex space-x-3">
          <button
            onClick={()=>{
              setVisible(false);
              setShowKonsultasi(true);
            }}
            // onClick={() => setShowPopUpTambahData(true)}
            className="btn bg-[#1FC2AD]/10 border-none text-[#1FC2AD] rounded-xl  text-base px-4 w-fit"
          >
            Konsultasi Ulang
          </button>
        </div>
      </div>
    </div>
  );
};
