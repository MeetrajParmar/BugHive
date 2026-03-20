"use client";
import { motion } from "motion/react";
import { oAuth } from "@/app/actions/action";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";
import { ButtonComp } from "@/component/ui/button";

export default function SignUp() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  return (
    <>
      <h2 className="text-black text-4xl ">Sign into your account</h2>
      <div className="flex flex-col gap-10 mt-9">
        <ButtonComp
          className="flex items-center  gap-2 bg-white p-3 text-black rounded-4xl cursor-pointer border hover:bg-gray-200"
          icon={<FaGithub size={30} />}
          onClick={() => oAuth("github", role!, "register")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.2 }}
          transition={{ duration: 1 }}
          text="Sign in With Github"
        />
        <ButtonComp
          className="flex items-center  gap-2 bg-white p-3 text-black rounded-4xl cursor-pointer border hover:bg-gray-200"
          icon={<FcGoogle size={30} />}
          onClick={() => oAuth("google", role!, "register")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.2 }}
          transition={{ duration: 1 }}
          text="Sign in With Google"
        />

      </div>
    </>
  );
}
