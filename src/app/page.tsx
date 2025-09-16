import { ClosingCTA } from "@/components/ClosingCTA";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { GrowthLoop } from "@/components/GrowthLoop";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { SetupShowcase } from "@/components/SetupShowcase";

export default function HomePage() {
  return (
    <main className="gradient-bg min-h-screen px-6 pb-24 pt-12 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-20">
        <Hero />

        <section className="space-y-12">
          <SectionHeading eyebrow="Onboarding" kicker="A three-step wizard designed for creators on the go.">
            Mobile-first, creator-centric setup
          </SectionHeading>
          <SetupShowcase />
        </section>

        <section className="space-y-12">
          <SectionHeading eyebrow="Creator experience" kicker="Design muscle that turns a utility into a signature moment.">
            UX/UI as the differentiator
          </SectionHeading>
          <ExperienceGrid variant="creator" />
        </section>

        <section className="space-y-12">
          <SectionHeading eyebrow="Entrant journey" kicker="Keep fans entertained between entry and reveal.">
            Audience experience without the friction
          </SectionHeading>
          <ExperienceGrid variant="audience" />
        </section>

        <section className="space-y-12">
          <SectionHeading eyebrow="Growth loops" kicker="Delight drives retention and organic acquisition.">
            Why this matters for growth
          </SectionHeading>
          <GrowthLoop />
        </section>

        <ClosingCTA />
      </div>
    </main>
  );
}
