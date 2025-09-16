import { getSupabaseServerClient } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = getSupabaseServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const creatorName = session.user.user_metadata.full_name ?? session.user.email?.split("@")[0] ?? "Creator";

  const campaigns = [
    {
      id: "1",
      title: "Launch Party Loot Drop",
      status: "Scheduled",
      entries: 1284,
      start: "Today, 6:00 PM"
    },
    {
      id: "2",
      title: "VIP Discord Giveaway",
      status: "Draft",
      entries: 0,
      start: "Pick a time"
    },
    {
      id: "3",
      title: "Season Finale Treasure Run",
      status: "Completed",
      entries: 5234,
      start: "Last week"
    }
  ];

  return (
    <main className="min-h-screen bg-midnight px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-neon">Dashboard</p>
            <h1 className="font-display text-3xl text-white">Welcome back, {creatorName}.</h1>
            <p className="text-sm text-sand/70">
              Ready to spin up something unforgettable? Pick up where you left off or start a new moment of delight.
            </p>
          </div>
          <form action="/api/logout" method="post">
            <button className="btn-secondary">Sign out</button>
          </form>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-white">Your giveaways</h2>
            <a href="/dashboard/new" className="btn-primary">
              Create giveaway
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {campaigns.map((campaign) => (
              <article key={campaign.id} className="card space-y-4 p-6">
                <header className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-sand/40">{campaign.status}</p>
                  <h3 className="font-display text-xl text-white">{campaign.title}</h3>
                </header>
                <dl className="grid grid-cols-2 gap-3 text-sm text-sand/60">
                  <div>
                    <dt className="uppercase tracking-[0.35em] text-xs">Entries</dt>
                    <dd className="text-lg text-white">{campaign.entries.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.35em] text-xs">Start</dt>
                    <dd className="text-white">{campaign.start}</dd>
                  </div>
                </dl>
                <a href={`/dashboard/${campaign.id}`} className="btn-secondary w-full text-center">
                  Manage
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
