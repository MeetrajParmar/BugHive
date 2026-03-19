import { createClient } from "@/lib/supabase/client";
type OAuthProvider = "github" | "google";

// export async function oGitHub() {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "github",
//     options: {
//       redirectTo: "http://localhost:3000/api/auth/github/callback",
//       scopes: "read:user user:email repo",
//     },
//   });

//   if (data.url) {
//     window.location.href = data.url;
//   }
// }

// export async function oGoogle() {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: "http://localhost:3000/api/auth/github/callback",
//       scopes: "email profile",
//     },
//   });

//   if (data.url) {
//     window.location.href = data.url;
//   }
// }

export async function oAuth(
  providerAuth: OAuthProvider,
  role: string,
  action: string,
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: providerAuth,
    options: {
      redirectTo: `http://localhost:3000/api/auth/oAuth/callback?role=${role}&action=${action}`,
      scopes:
        providerAuth === "github"
          ? "read:user user:email repo"
          : "email profile",
    },
  });
  if (error) {
    console.error("OAuth error:", error.message);
    return;
  }

  if (data.url) {
    window.location.href = data.url;
  }
}
