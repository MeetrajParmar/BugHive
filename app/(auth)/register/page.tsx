"use client";
import { motion } from "motion/react";
import { oAuth } from "@/app/actions/action";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

export default function SignUp() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  return (
    <>
      <h2 className="text-black text-4xl ">Sign into your account</h2>
      <div className="flex flex-col gap-10 mt-9">
        <motion.button
          className="flex items-center  gap-2 bg-white p-3 text-black rounded-4xl cursor-pointer border hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.2 }}
          transition={{ duration: 1 }}
          onClick={() => oAuth("github", role!, "register")}
        >
          <FaGithub size={30} />
          Sign in with Github
        </motion.button>

        <motion.button
          className="flex items-center  gap-2 bg-white p-3 text-black rounded-4xl cursor-pointer border hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.2 }}
          transition={{ duration: 1 }}
          onClick={() => oAuth("google", role!, "register")}
        >
          <FcGoogle size={30} />
          Sign in with Google
        </motion.button>
      </div>
    </>
  );
}
