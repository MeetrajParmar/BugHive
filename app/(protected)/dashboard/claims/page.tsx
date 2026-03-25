"use client";
import { useAuth } from "@/context/authContext";
import Navbar from "@/component/dashboard/claims/Navbar";
import { ButtonComp } from "@/component/ui/button";
import { useState } from "react";
import { ClaimsForm } from "@/component/dashboard/claimsForm/ClaimsForm";

export default function Claims() {
  const { user, role } = useAuth();
  const [claims, setClaims] = useState<string | null>(null);
  const [claimForm, setClaimForm] = useState<boolean>(false);
  return (
    <div className="min-w-screen min-h-screen bg-black bg-[radial-gradient(#444_1px,transparent_1px)] bg-size-[16px_16px]">
      <Navbar />
      <div className="relative z-0">
        {!claims ? (
          <div className="flex flex-col justify-center items-center relative h-[calc(100vh-64px)]">
            <ButtonComp
              onClick={() => setClaimForm(true)}
              className="flex items-center justify-center bg-green-800 p-3 border border-green-500 rounded-full cursor-pointer hover:bg-green-900"
              text="Add Your First Contribution Claims"
            />
          </div>
        ) : (
          <></>
        )}

        {claimForm ? (
          <ClaimsForm onClose={() => setClaimForm(false)} />
        ) : (
          <ButtonComp
            type="button"
            text="Add Claims"
            onClick={() => setClaimForm(true)}
            className="bg-green-800 p-3 z-10  border border-green-400 rounded-full fixed bottom-10 right-10 cursor-pointer hover:bg-green-900"
          />
        )}
      </div>
    </div>
  );
}
