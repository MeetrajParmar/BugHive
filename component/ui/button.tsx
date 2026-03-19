"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function Button({
  text,
  url,
  role,
}: {
  text: string;
  url: string;
  role: string;
}) {
  const router = useRouter();
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 4, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        className="p-4 bg-blue-300 text-black rounded-4xl font-semibold"
        onClick={() => router.push(`${url}?role=${encodeURIComponent(role)}`)}
      >
        {text}
      </motion.button>
    </>
  );
}
