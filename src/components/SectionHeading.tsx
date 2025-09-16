import type { PropsWithChildren } from "react";

interface SectionHeadingProps extends PropsWithChildren {
  eyebrow: string;
  kicker?: string;
}

export function SectionHeading({ eyebrow, kicker, children }: SectionHeadingProps) {
  return (
    <header className="space-y-3 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl text-white sm:text-4xl">{children}</h2>
      {kicker ? <p className="text-base text-sand/70">{kicker}</p> : null}
    </header>
  );
}
