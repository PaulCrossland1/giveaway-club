import { NextResponse, type NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/lib/supabaseClient";

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies }, getSupabaseConfig());
  const code = request.nextUrl.searchParams.get("code");
  const redirectPath = request.nextUrl.searchParams.get("redirect") ?? "/dashboard";

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const redirectUrl = new URL(redirectPath, request.url);
  redirectUrl.searchParams.delete("code");
  redirectUrl.searchParams.delete("redirect");

  return NextResponse.redirect(redirectUrl.toString());
}
