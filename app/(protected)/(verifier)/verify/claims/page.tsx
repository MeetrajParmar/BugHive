"use client";

import { DeclineModal } from "@/component/dashboard/verifier/DeclineModal";
import { ButtonComp } from "@/component/ui/button";
import { useAuth } from "@/context/authContext";
import { getVerifierClaims } from "@/services/dashboard/verifier/getVerifierClaim";
import { jwtSign } from "@/utils/jwt/jwt";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyClaim() {
  const { user } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ["verifierClaims"],
    queryFn: () => getVerifierClaims(user?.email!),
  });
  const router = useRouter();

  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectClaim, setSelectClaim] = useState<string | null>(null);

  const handleReview = async (claimId: string) => {
    const token = await jwtSign(claimId);
    router.push(`/verify/claims/${token}`);
  };

  return (
    <>
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-3 gap-5 p-2 ">
          {data?.data?.map((i) => (
            <div
              key={i.claim_Id}
              className="border border-gray-600 p-2 shadow shadow-green-700 bg-mauve-950"
            >
              <div className="text-white font-bold text-center flex flex-row justify-between">
                <h2 className="text-lg">Review Claim</h2>
                <p
                  className={`${i.status.toString() === "ACCEPT" ? "bg-green-500 text-green-950" : i.status.toString() === "PENDING" ? "bg-yellow-200 text-orange-600" : i.status.toString() === "DECLINED" ? "bg-red-400 text-red-600" : "text-white"} rounded-full p-1`}
                >{`${i.status}`}</p>
              </div>

              <div className="flex flex-col">
                <p className="uppercase text-gray-400 text-sm">Title:</p>
                <p className="font-semibold text-lg">{i.claims.claim_title}</p>
              </div>

              <div className="border-t border-zinc-800" />

              <div className="flex flex-col">
                <p className="uppercase text-gray-400 text-sm">Submitted By</p>
                <p className="font-semibold text-lg">{i.users.username}</p>
              </div>
              <div className="border-t border-zinc-800" />

              <div className="border-t border-zinc-800" />

              <div className="flex flex-col">
                <p className="uppercase text-gray-400 text-sm">Sent On</p>
                <p className="font-semibold text-lg">{i.sent_at}</p>
              </div>

              <div className="flex justify-between">
                <ButtonComp
                  text="Review"
                  className="rounded border p-2 border-amber-50 mt-2 cursor-pointer"
                  onClick={() => handleReview(i.claim_Id)}
                />
                <ButtonComp
                  text="Decline"
                  className=" p-2 bg-red-700 rounded border  hover:bg-red-500 border-red-400 mt-2 cursor-pointer"
                  onClick={() => {
                    setSelectClaim(i.claim_Id);
                    setIsModal((prev) => !prev);
                  }}
                />
              </div>
              {isModal && selectClaim === i.claim_Id && (
                <DeclineModal
                  close={() => setIsModal((prev) => !prev)}
                  claimId={i.claim_Id}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
