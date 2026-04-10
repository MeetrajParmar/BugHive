"use client";
import Navbar from "@/component/common/Navbar";
import { ContributorSidebar } from "@/component/contributor/ContributorSidebar";
import { VerifierSidebar } from "@/component/verifier/VerifierSidebar";
import { useAuth } from "@/context/authContext";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-stretch">
        {user?.role === "VERIFIER" ? (
          <VerifierSidebar />
        ) : (
          <ContributorSidebar />
        )}
        <div className="flex-1 ">{children}</div>
      </div>
    </div>
  );
}
