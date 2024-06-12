'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center">
      <div className="mt-48 flex items-center justify-center w-[80%] h-[30rem] bg-[#272B2F]  rounded-3xl">
        <div className="flex flex-col items-center space-y-5">
          <p className="text-2xl font-semibold">Diagnosa Kecemasan Anda</p>
          <button
            onClick={() => router.push("/konsultasi")}
            className="btn bg-[#1FC2AD]/10 border-0 text-[#1FC2AD] rounded-2xl drop-shadow-[0_0px_10px_rgba(31,194,173,0.4)] text-lg w-28"
          >
            Mulai
          </button>
        </div>
      </div>
    </div>
  );
}
