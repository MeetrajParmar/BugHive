import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PROXY_COOKIE = "x-proxy-data";
const COOKIE_MAX_AGE = 60 * 5;

type ProxyCookie = {
  role: string;
  onboarding_complete: boolean;
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  const cached = req.cookies.get(PROXY_COOKIE)?.value;
  let proxyData: ProxyCookie | null = null;

  if (cached) {
    try {
      proxyData = JSON.parse(cached);
    } catch {
      proxyData = null;
    }
  }

  if (!proxyData) {
    const { data: userDB } = await supabase
      .from("users")
      .select("role, onboarding_complete")
      .eq("email", user.email!)
      .maybeSingle();

    if (!userDB) return res;

    proxyData = {
      role: userDB.role,
      onboarding_complete: userDB.onboarding_complete,
    };

    res.cookies.set(PROXY_COOKIE, JSON.stringify(proxyData), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }

  if (!proxyData.onboarding_complete && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  } else if (proxyData.onboarding_complete && pathname!=="/dashboard/claims") {
    return NextResponse.redirect(new URL("/dashboard/claims", req.url));
  }

  if (
    proxyData.role !== "CONTRIBUTOR" &&
    pathname.startsWith("/dashboard/claims")
  ) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  if (proxyData.role !== "ADMIN" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/noAccess", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/onboarding", "/admin", "/dashboard/claims/:path*"],
};
