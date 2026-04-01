import { claimDB } from "@/types/dashboard/contributor/claimDB.types";
import { createClient } from "../supabase/client";

export async function allClaim(id?: string): Promise<claimDB[]> {
  // const res = await fetch("/api/getAllClaims");
  // if (!res.ok) {
  //   throw new Error("Fetching Claims");
  // }
  // return res.json();
  const supabase = createClient();
  let query = supabase.from("claims").select(`*,pr_table(*)`);
  if (id) {
    query = query.eq("id", id);
  }
  const { data, error } = await query;
  if (error) throw new Error(`${error}`);
  return data ?? [];
}
