import Navbar from "@/component/dashboard/claims/Navbar";
import SideBar from "@/component/dashboard/claims/Sidebar";

export default function ClaimCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-black bg-[radial-gradient(#444_1px,transparent_1px)] bg-size-[16px_16px]">
      <Navbar />
      <div className="flex flex-1 items-stretch">
        <SideBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
