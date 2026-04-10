"use client";

import { InfoField } from "@/component/ui/InfoField";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FiUser, FiFileText, FiTag, FiMail } from "react-icons/fi";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="min-h-full p-5">
      <h2 className="text-2xl font-bold text-white">My Profile</h2>
      <p className="text-zinc-400 text-sm ">
        View your public profile information
      </p>

      <div className=" p-2">
        <div className="relative">
          <div className="p-1 rounded bg-linear-to-tr  from-green-900 to-green-600 shadow-lg shadow-emerald-900/40">
            <Image
              src={user?.github_avatar_url ?? "/profile.png"}
              width={150}
              height={150}
              alt="Profile photo"
              className="rounded-full border-2 border-zinc-900 object-cover hover:ring hover:ring-emerald-400 cursor-pointer"
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-10">
            <InfoField
              icon={<FiUser size={15} />}
              label={"Username"}
              value={user?.username}
            />
            <InfoField
              icon={<FiMail size={15} />}
              label={"Email"}
              value={user?.email}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-6">
            <InfoField
              icon={<FiTag size={15} />}
              label={"Headline"}
              value={user?.headline}
            />
            <InfoField
              icon={<FiFileText size={15} />}
              label={"Bio"}
              value={user?.bio}
            />
          </div>

          {user?.github_connected ? (
            <div className="flex items-center gap-4 rounded  border border-emerald-800 p-2 mt-10">
              <div>
                <FaGithub size={42} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white truncate">
                  {user.github_username}
                </p>
                <p>Github account Linked</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 rounded  border border-emerald-800 p-2">
              <div>
                <FaGithub size={42} />
              </div>
              <div className="flex-1">
                <p>Git Not Connected</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Link your GitHub account to enable contributions
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
