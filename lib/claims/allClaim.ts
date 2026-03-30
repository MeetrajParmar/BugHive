export async function allClaim() {
  const res = await fetch("/api/getClaims");
  if (!res.ok) {
    throw new Error("Fetching Claims");
  }
  return res.json();
}
