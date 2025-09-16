import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/lib/supabaseClient";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies }, getSupabaseConfig());
  await supabase.auth.signOut();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return NextResponse.redirect(new URL("/", siteUrl), { status: 303 });
}
