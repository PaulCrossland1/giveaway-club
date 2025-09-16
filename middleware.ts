import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { getSupabaseConfig } from "@/lib/supabaseClient";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res }, getSupabaseConfig());

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (session && req.nextUrl.pathname.startsWith("/login")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.searchParams.delete("redirect");
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"]
};
