import { claimVisibilityType } from "@/lib/validations/claims";
import { claimDB } from "@/types/dashboard/contributor/claimDB.types";
import { useState } from "react";
import { ButtonComp } from "@/component/ui/button";
import { updateVisibility } from "@/services/dashboard/updateVisibility";
import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export function ClaimCard({ claim }: { claim: claimDB }) {
  const [claim_visibility, setClaim_Visibility] = useState<claimVisibilityType>(
    claim.visibility_level,
  );
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isVerified = claim.verifier_count >= 0;

  const toggleClaimVisibility = () => {
    if (claim_visibility === "PUBLIC") {
      setClaim_Visibility("PRIVATE");
    } else if (claim_visibility === "PRIVATE") {
      setClaim_Visibility("PUBLIC");
    }
    setIsChange(!isChange);
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const updateRes = await updateVisibility(claim.id, claim_visibility);
      if (!updateRes) {
        toast.error("Something went wrong.");
        return;
      }
      toast.success("Updated Successfull");
      setIsSubmitting(false);
    } catch (error) {
      toast.error(`Update Failed ${error}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-950 p-2 rounded border border-gray-600">
      <h2 className="text-center text-white font-bold text-lg">
        Claims Details:
      </h2>
      <div>
        <div className="flex flex-row gap-5 justify-center items-center py-3">
          <div className="h-8 w-30 px-3 font-semibold uppercase bg-zinc-800 text-zinc-400  rounded flex items-center justify-center">
            <span>{claim.claim_type}</span>
          </div>

          <span
            className={`px-3 py-1 rounded font-semibold  ${isVerified ? " text-amber-400 bg-amber-950 border-amber-800" : "bg-emerald-950 text-emerald-400 border border-emerald-800"}`}
          >
            {isVerified ? "Awaiting Vertfication" : "Verified ✓"}
          </span>
        </div>
      </div>

      <div className="flex flex-row  gap-3 py-3">
        <label className="text-gray-500">Title:</label>
        <p className="text-gray-300">{claim.claim_title}</p>
      </div>

      <div className="border-t border-zinc-800" />

      <div className="flex flex-row gap-3 py-3">
        {/* <label className="text-gray-500">PR Url:</label> */}
        <FaGithub size={23} />
        <a
          href={`${claim.pr_url}`}
          className="text-blue-600 underline"
          target="_blank"
        >
          {claim.pr_url}
        </a>
      </div>

      <div className="border-t border-zinc-800" />

      <div className="flex flex-row gap-3 py-3">
        <label className="text-gray-500">Verifier Count:</label>
        <p>{claim.verifier_count}</p>
      </div>

      <div className="border-t border-zinc-800" />

      <div className="flex flex-col gap-3 py-3">
        <div className="flex flex-row gap-3">
          <label className="">{claim_visibility}:</label>
          <button
            type="button"
            onClick={() => toggleClaimVisibility()}
            className={`w-10 h-6 rounded-full transition-color relative ${claim_visibility === "PUBLIC" ? "bg-black" : "bg-gray-200"} cursor-pointer`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white border border-gray-400 rounded-full transition-colors  ${claim_visibility === "PUBLIC" ? "bg-black" : "bg-gray-200 left-1"}`}
            />
          </button>
        </div>
      </div>

      <div className="py-4 flex itmes-center gap-3">
        <ButtonComp
          text="Evidence"
          className="flex-1 py-2 text-sm font-semibold rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white hover:bg-zinc-950  transition-colors cursor-pointer"
        />
        <ButtonComp
          text="Send Verification"
          className="flex-1 py-2 text-sm font-semibold rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white hover:bg-zinc-950 cursor-pointer transition-colors"
        />
      </div>
      {isChange ? (
        <div className="flex  items-center justify-end  border border-transparent px-4 py-2 bg-zinc-900">
          <ButtonComp
            text={!isSubmitting ? "SAVE" : "Saving..."}
            onClick={() => handleSave()}
            disabled={!isChange}
            className={`p-1 ${isChange ? "bg-blue-600 border border-blue-400 hover:bg-blue-500 cursor-pointer" : "bg-blue-800 border border-blue-400"} rounded`}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
