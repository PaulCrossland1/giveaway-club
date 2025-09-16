"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const redirectTo = searchParams.get("redirect") ?? "/dashboard";

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`
      }
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      setMessage("Check your inbox for a magic link to continue.");
    }

    setLoading(false);
  }

  async function handleOAuth(provider: "twitch" | "google") {
    setLoading(true);
    setError(null);

    const redirectTo = searchParams.get("redirect") ?? "/dashboard";
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`
      }
    });

    if (authError) {
      setLoading(false);
      setError(authError.message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-midnight px-6 py-16">
      <div className="card w-full max-w-md space-y-8 p-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon">Giveaway.club</p>
          <h1 className="font-display text-3xl text-white">Sign in to continue</h1>
          <p className="text-sm text-sand/70">
            Use a magic link or connect with your favorite platform to manage your giveaways.
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <label className="block text-left text-sm font-medium text-sand/80">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-midnight/60 px-4 py-3 text-sm text-white placeholder:text-sand/40 focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/30"
            />
          </label>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Sending magic link..." : "Send magic link"}
          </button>
        </form>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-sand/40">
            <span className="h-px flex-1 bg-white/10" />
            or continue with
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => handleOAuth("twitch")}
              className="btn-secondary"
              disabled={loading}
            >
              Twitch
            </button>
            <button
              onClick={() => handleOAuth("google")}
              className="btn-secondary"
              disabled={loading}
            >
              Google
            </button>
          </div>
        </div>

        {message ? <p className="text-sm text-mint">{message}</p> : null}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <p className="text-center text-xs text-sand/50">
          By continuing you agree to our <Link href="/terms" className="text-sky underline">terms</Link> &amp;
          <Link href="/privacy" className="text-sky underline"> privacy policy</Link>.
        </p>
      </div>
    </main>
  );
}
