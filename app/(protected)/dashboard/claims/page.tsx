"use client";
import { useAuth } from "@/context/authContext";
import Navbar from "@/component/dashboard/claims/Navbar";
import { ButtonComp } from "@/component/ui/button";
import { useState } from "react";

export default function Claims() {
  const { user, role } = useAuth();
  const [claims, setClaims] = useState<string | null>(null);
  return (
    <div className="min-w-screen min-h-screen bg-black bg-[radial-gradient(#444_1px,transparent_1px)] bg-[size:16px_16px]">
      <Navbar />

      {!claims ? (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
          <ButtonComp
            className="bg-green-800 p-3 border border-green-500 rounded-full cursor-pointer hover:bg-green-900"
            text="Add Your First Contribution Claims"
          />
        </div>
      ) : (
        <></>
      )}

      <ButtonComp
        type="button"
        text="Add Claims"
        className="bg-green-800 p-3 z-10  border border-green-400 rounded-full fixed bottom-10 right-10 cursor-pointer hover:bg-green-900"
      />
    </div>
  );
}
