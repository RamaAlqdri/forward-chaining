'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center">
      <div className="mt-48 flex items-center justify-center w-[80%] h-[30rem] bg-[#272B2F]  rounded-3xl">
        <div className="flex flex-col items-center space-y-5">
          <p className="text-[2rem] font-semibold">Diagnosa Kecemasan Anda</p>
          <button
            onClick={() => router.push("/konsultasi")}
            className=" bg-[#1FC2AD]/10 border-0 text-[#1FC2AD] font-semibold hover:bg-black/50  rounded-3xl drop-shadow-[0_0px_10px_rgba(31,194,173,0.4)] text-[3rem] px-10 py-4  "
          >
            Mulai
          </button>
        </div>
      </div>
    </div>
  );
}
