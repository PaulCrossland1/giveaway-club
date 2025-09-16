const loops = [
  {
    title: "Viral on-screen moments",
    description:
      "Every animated reveal turns into a clip worth sharing. Viewers instantly ask what tool powered the hype.",
    stat: "+38% organic referrals"
  },
  {
    title: "Creators stick around",
    description:
      "Saved presets, branded overlays, and subscriber sync make giveaways part of the permanent toolkit.",
    stat: "4x repeat campaigns"
  },
  {
    title: "Minimal support cost",
    description:
      "A wizard-style setup keeps creators moving without docs or hand-holding. You focus on growth, not tickets.",
    stat: "< 2% setup drop-off"
  }
];

export function GrowthLoop() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {loops.map((loop) => (
        <article key={loop.title} className="card flex flex-col gap-6 p-6">
          <header className="space-y-2">
            <p className="text-sm uppercase tracking-[0.25em] text-mint">{loop.stat}</p>
            <h3 className="font-display text-xl text-white">{loop.title}</h3>
          </header>
          <p className="text-sm text-sand/70">{loop.description}</p>
        </article>
      ))}
    </div>
  );
}
