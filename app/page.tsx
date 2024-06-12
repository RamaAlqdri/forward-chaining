import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center justify-center w-[80%] h-[30rem] bg-[#201E2A] border border-gray-700 mt-20 rounded-3xl">
        <div className="flex flex-col items-center space-y-5">
          <p className="text-2xl font-semibold">
            Diagnosa Kecemasan Anda
          </p>
          <button className="btn bg-[#1FC2AD] text-white rounded-2xl drop-shadow-[0_0px_10px_rgba(31,194,173,0.4)] text-lg w-28">
            Mulai
          </button>
        </div>
      </div>
    </div>
  );
}
