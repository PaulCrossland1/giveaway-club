import Link from "next/link";
import type { SVGProps } from "react";

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M5 12h14m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-5.5-2.12 2.12M8.62 15.88 6.5 18m11 0-2.12-2.12M8.62 8.12 6.5 6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  );
}

const stats = [
  { label: "Creator setups", value: "3-step magic" },
  { label: "Realtime entries", value: "< 15s to launch" },
  { label: "Audience delight", value: "92% stay for reveal" }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12">
      <div className="absolute inset-0 -z-10 bg-grid-glow" aria-hidden />
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand/80">
            <SparklesIcon className="h-4 w-4 text-neon" />
            Stream-ready in minutes
          </span>
          <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
            Giveaways that feel like part of your show, not an afterthought.
          </h1>
          <p className="text-lg text-sand/80">
            Giveaway.club gives creators a plug-and-play experience with cinematic reveals, flexible branding, and effortless onboarding so every reward moment feels electric.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/dashboard" className="btn-primary">
              Launch your next giveaway
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link href="/login" className="btn-secondary">
              Explore the setup flow
            </Link>
          </div>
        </div>
        <dl className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-5 text-center">
              <dt className="text-xs uppercase tracking-[0.3em] text-sand/60">
                {stat.label}
              </dt>
              <dd className="mt-3 font-display text-xl text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
