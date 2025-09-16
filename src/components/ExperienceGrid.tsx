interface Feature {
  title: string;
  description: string;
  points: string[];
}

const creatorFeatures: Feature[] = [
  {
    title: "Dynamic displays",
    description: "Spinning wheels, animated races, and treasure chests that feel like mini-games.",
    points: [
      "Auto-sync overlays with OBS and Streamlabs",
      "Embed ready for Twitch, YouTube, and Kick",
      "Configurable themes with live previews"
    ]
  },
  {
    title: "Brand control",
    description: "Upload logos, set palettes, and script the reveal to match your stream energy.",
    points: [
      "Dynamic typography pairs with your brand",
      "Drop-in emotes and stickers",
      "Reusable templates for recurring shows"
    ]
  },
  {
    title: "Mobile first",
    description: "Launch or edit a giveaway from your phone while chat is still buzzing.",
    points: [
      "Big, tappable controls",
      "Works offline until you reconnect",
      "Adaptive layout for vertical streaming"
    ]
  }
];

const audienceHighlights: Feature[] = [
  {
    title: "Frictionless entry",
    description: "One tap, name + email, and fans are in. No pop-ups, no friction.",
    points: [
      "Auto-fill with Apple/Google sign-in",
      "Localized timezone + translations",
      "Smart re-entry for returning fans"
    ]
  },
  {
    title: "Gamified waiting",
    description: "Entrants stick around for the live reveal with loops that hype the moment.",
    points: [
      "Live countdowns with shareable clips",
      "Extra entries for referrals",
      "Interactive chat prompts"
    ]
  },
  {
    title: "Trust by design",
    description: "Transparent animations make it clear how and why someone won.",
    points: [
      "Publicly verifiable draw logs",
      "Replayable reveal moments",
      "Instant winner notifications"
    ]
  }
];

interface ExperienceGridProps {
  variant: "creator" | "audience";
}

export function ExperienceGrid({ variant }: ExperienceGridProps) {
  const features = variant === "creator" ? creatorFeatures : audienceHighlights;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <article key={feature.title} className="card flex flex-col gap-4 p-6">
          <header className="space-y-2">
            <h3 className="font-display text-xl text-white">{feature.title}</h3>
            <p className="text-sm text-sand/70">{feature.description}</p>
          </header>
          <ul className="space-y-2 text-sm text-sand/60">
            {feature.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-mint" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
