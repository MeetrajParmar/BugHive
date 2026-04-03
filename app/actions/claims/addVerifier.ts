import { createClient } from "@/lib/supabase/client";

export async function addVerifier(email: string, claimId: string) {
  const supabase = await createClient();
  const { data: verifier_email, error: existingVerifierError } = await supabase
    .from("claims")
    .select("verifier_email")
    .eq("id", claimId)
    .maybeSingle();
  if (existingVerifierError) {
    console.log("Error in Fetching Existing Verifier", existingVerifierError);
    throw new Error("Error in Fetching Existing Verifier.");
  }
  console.log("VERIFIER EMAIL:", verifier_email);

  if (!verifier_email?.verifier_email.includes(email)) {
    const { data, error } = await supabase
      .from("claims")
      .insert({ verifier_email: [...verifier_email?.verifier_email, email] })
      .eq("id", claimId)
      .select()
      .maybeSingle();

    if (error) {
      console.log(`Error in Adding Verifier:${error}`);
      throw new Error("Error in Adding Verifier");
    }
    return data;
  }
}
