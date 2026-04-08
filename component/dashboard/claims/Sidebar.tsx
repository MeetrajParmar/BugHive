"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiCardsThree } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiBadgeCheck } from "react-icons/bi";

export default function SideBar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.includes(path);
  return (
    <div className="flex flex-col w-48 bg-mist-950 px-4 py-6 gap-4 text-center justify-center border-r border-white">
      <div className="flex flex-row gap-2 items-center">
        <BiBadgeCheck
          size={20}
          color={isActive("/dashboard/verifier") ? "#2563eb" : "white"}
        />
        <Link
          href="/dashboard/verifier"
          className={`hover:text-blue-500 ${isActive("/dashboard/verifier") ? "text-blue-600 font-bold" : "text-white"}`}
        >
          Verify Claim
        </Link>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <PiCardsThree
          size={20}
          color={isActive("/dashboard/claims") ? "#2563eb" : "white"}
        />
        <Link
          href="/dashboard/claims"
          className={` hover:text-blue-500 ${isActive("/dashboard/claims") ? "text-blue-600 font-bold" : "text-white"}`}
        >
          My Claims
        </Link>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <FaUser color={isActive("/profile") ? "#2563eb" : "white"} />
        <Link
          href="/profile"
          className={` hover:text-gray-500 ${isActive("/profile") ? "text-blue-600 font-bold" : "text-white"}`}
        >
          Profile
        </Link>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <IoSettingsOutline
          color={isActive("/settings") ? "#2563eb" : "white"}
        />
        <Link href="/settings" className="text-white hover:text-gray-500">
          Settings
        </Link>
      </div>
    </div>
  );
}
