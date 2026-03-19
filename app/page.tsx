"use client";
import { motion } from "framer-motion";
import { Button } from "@/component/ui/button";

export default function Home() {
  return (
    <div className="flex flex-row    min-w-screen min-h-screen  bg-zinc-50 font-sans  ">
      <motion.div
        className="bg-radial from bg-gray-800 to bg-black flex justify-center items-center flex-1 p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div>
          <h1 className="text-white text-4xl font-bold">BUGHIVE</h1>
          <h4 className="text-gray-300 mt-4">
            BugHive is a structured open source contribution portfolio where
            every claimed contribution is backed by alive GitHub pull request
            and reviewed by a project maintainer or senior peer through a
            structured impact rubric
          </h4>
        </div>
      </motion.div>
      <div className="flex flex-1 flex-col gap-3 justify-center items-center">
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 3, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="text-black text-4xl font-sans"
        >
          Select your Role:
        </motion.p>
        <Button
          text="I'm a Developer/Contributor"
          url="/register"
          role="CONTRIBUTOR"
        />
        <Button
          text="I'm a Verifier/Project Manager"
          url="/register"
          role="VERIFIER"
        />
        <Button
          text="I'm a Maintainer/Hiring Manager"
          url="/register"
          role="MAINTAINER"
        />
      </div>
    </div>
  );
}
