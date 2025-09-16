import Link from "next/link";

export function ClosingCTA() {
  return (
    <section className="card flex flex-col gap-6 bg-gradient-to-r from-neon/30 via-mint/20 to-sky/20 p-8 text-center sm:p-12">
      <h2 className="font-display text-3xl text-white sm:text-4xl">
        Giveaway.club turns rewards into a signature moment.
      </h2>
      <p className="text-base text-sand/80">
        Lead with taste in UX and UI, and give your community something to talk about long after the stream ends.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/dashboard" className="btn-primary">
          Build your giveaway
        </Link>
        <Link href="/login" className="btn-secondary">
          Sign in with Supabase
        </Link>
      </div>
    </section>
  );
}
