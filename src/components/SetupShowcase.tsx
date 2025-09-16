const steps = [
  {
    title: "Time zone & schedule",
    description:
      "Plan your live moment, lock in entry windows, and sync reminders in a tap-first interface.",
    accent: "01"
  },
  {
    title: "Branding",
    description:
      "Drop in colors, overlays, and emotes so every giveaway looks like it belongs on your channel.",
    accent: "02"
  },
  {
    title: "Prize details",
    description:
      "Add rewards, upload media, and preview animated reveals before you ever go live.",
    accent: "03"
  }
];

export function SetupShowcase() {
  return (
    <section className="card grid gap-6 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-8 sm:grid-cols-3">
      {steps.map((step) => (
        <article key={step.title} className="space-y-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neon/20 font-display text-sm text-neon">
            {step.accent}
          </span>
          <h3 className="font-display text-xl text-white">{step.title}</h3>
          <p className="text-sm text-sand/70">{step.description}</p>
        </article>
      ))}
    </section>
  );
}
