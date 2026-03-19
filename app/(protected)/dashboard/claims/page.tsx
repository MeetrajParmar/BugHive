"use client";
import { useAuth } from "@/context/authContext";

export default function Claims() {
  const { user, role } = useAuth();

  return (
    <>
      <h1>Claims</h1>
      <h1>{user?.email}</h1>
      <h1>{role}</h1>
    </>
  );
}
