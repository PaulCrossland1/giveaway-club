import {
  createClientComponentClient,
  createServerComponentClient
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase environment variables are not set. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are configured."
    );
  }

  return { supabaseUrl, supabaseKey: supabaseAnonKey } as const;
}

export function getSupabaseServerClient() {
  return createServerComponentClient({ cookies }, getSupabaseConfig());
}

export function getSupabaseBrowserClient() {
  return createClientComponentClient(getSupabaseConfig());
}
