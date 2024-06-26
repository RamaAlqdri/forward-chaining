"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="w-full fixed z-50 ">
      <div className="navbar rounded-b-xl flex bg-[#212529] drop-shadow-lg">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-lg hover:text-[#1FC2AD]">
            Expert System
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal space-x-2 ">
            <li className="text-[#78787e] hover:text-[#1FC2AD]">
              <button
              onClick={() => router.push("/konsultasi")}
              >Konsultasi</button>
            </li>
            <li className="text-[#78787e] hover:text-[#1FC2AD]">
              <button
              onClick={() => router.push("/kecemasan")}
              >Kecemasan</button>
            </li>
            <li className="text-[#78787e] hover:text-[#1FC2AD]">
              <button 
              onClick={() => router.push("/gejala")}
              >Gejala</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
