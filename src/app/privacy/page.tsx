export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-midnight px-6 py-16">
      <article className="mx-auto max-w-3xl space-y-6 text-sand/70">
        <h1 className="font-display text-4xl text-white">Privacy Policy</h1>
        <p>
          Giveaway.club collects entrant information strictly for running campaigns and notifying winners. Update this
          placeholder with your final privacy language, including data retention and deletion practices.
        </p>
        <p>
          We rely on Supabase authentication to securely store session data. Creators should configure their Supabase project
          with appropriate row-level security rules and ensure compliance with regional regulations such as GDPR or CCPA.
        </p>
      </article>
    </main>
  );
}
