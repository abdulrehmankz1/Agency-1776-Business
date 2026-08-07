"use client";

import { motion } from "motion/react";
import SectionShell from "@/components/SectionShell";
import CTAButton from "@/components/CTAButton";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";
import { useStaggeredGrid } from "@/hooks/useStaggeredGrid";

// Two monthly growth partnership tiers. Pricing itself is expressed once,
// as a shared investment range below the tiers, rather than per-card.
const TIERS = [
  {
    id: "starter",
    name: "Starter Growth System",
    tag: "Foundations",
    lede:
      "Built for businesses that need a professional website, clear messaging, lead capture, CRM foundation, and basic follow-up automation.",
  },
  {
    id: "automated",
    name: "Automated Growth System",
    tag: "Full system",
    lede:
      "Built for businesses that need a fuller lead-generation system with landing pages, funnels, automation flows, stronger CTAs, campaign assets, Meta Ads, Google Ads support, and lead organization.",
    featured: true,
  },
];

const INVESTMENT = {
  label: "Monthly Investment Range",
  range: "$1,000–$2,000",
  unit: "/ month",
  note:
    "Most business growth partnerships are expected to fall around $1,000–$2,000 per month, depending on scope, advertising needs, automation complexity, and ongoing support.",
};

export default function Pricing() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();
  // Column-scrub grid: the two partnership tiers rise from below as the
  // section crosses the viewport.
  const gridRef = useStaggeredGrid();

  return (
    <SectionShell
      id="pricing"
      ref={revealRef}
      className="py-32 md:py-48"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div className="mb-20 flex flex-col gap-6 md:mb-28">
        <div ref={scrubRef} className="flex flex-col gap-6">
          <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
            <span className="inline-flex items-center gap-3">
              <span
                data-reveal="icon"
                className="inline-block h-1.5 w-1.5 bg-accent"
              />
              Monthly growth partnerships
            </span>
          </MaskedLine>

          <h2 className="max-w-3xl text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground">
            <ScrubText>Know what you are getting before you start.</ScrubText>
          </h2>
        </div>
      </div>

      <div
        ref={gridRef}
        className="chamfer chamfer-md grid grid-cols-1 gap-px bg-muted/40 md:grid-cols-2"
        style={{
          "--chamfer-border-color":
            "color-mix(in srgb, var(--muted) 40%, transparent)",
          "--chamfer-bg": "color-mix(in srgb, var(--muted) 40%, transparent)",
        }}
      >
        {TIERS.map((t, i) => (
          <PricingCard key={t.id} tier={t} col={i} />
        ))}
      </div>

      <InvestmentPanel />
    </SectionShell>
  );
}

function PricingCard({ tier, col = 0 }) {
  // GSAP animates the wrapper; motion animates the inner article.
  return (
    <div data-stagger-item data-col={col} className="h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className={
          (tier.featured ? "bg-surface " : "bg-background ") +
          "relative flex h-full flex-col gap-6 p-8 md:p-10"
        }
        style={{ backgroundImage: "var(--card-pinstripe)" }}
      >
        {tier.featured && (
          <span
            data-reveal="icon"
            className="chamfer chamfer-xs absolute right-8 top-8 inline-flex items-center gap-2 px-2 py-1 text-[9px] uppercase tracking-[0.28em] text-accent"
            style={{ "--chamfer-border-color": "var(--accent)" }}
          >
            <span className="relative z-10 h-1 w-1 bg-white" />
            <span className="relative z-10 text-white">Most complete</span>
          </span>
        )}

        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-foreground/40">
          <span data-reveal="icon" className="h-1 w-1 bg-accent" />
          {tier.tag}
        </div>

        <MaskedLine
          as="h3"
          className="text-2xl font-medium tracking-[0.02em] text-foreground"
        >
          {tier.name}
        </MaskedLine>

        <p className="max-w-md text-base font-medium leading-relaxed text-foreground/70">
          <MaskedLine>{tier.lede}</MaskedLine>
        </p>
      </motion.article>
    </div>
  );
}

function InvestmentPanel() {
  return (
    <div
      className="chamfer chamfer-md relative mt-12 flex flex-col gap-8 p-8 md:mt-16 md:flex-row md:items-center md:justify-between md:gap-12 md:p-12"
      style={{
        "--chamfer-border-color":
          "color-mix(in srgb, var(--muted) 55%, transparent)",
        "--chamfer-bg": "var(--surface)",
        backgroundImage: "var(--card-pinstripe)",
      }}
    >
      <div className="relative z-10 flex flex-col gap-4">
        <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            {INVESTMENT.label}
          </span>
        </MaskedLine>

        <div className="flex items-baseline gap-3">
          <MaskedLine
            innerClassName="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-medium tracking-[-0.02em] text-foreground"
            className="leading-[1]"
          >
            {INVESTMENT.range}
          </MaskedLine>
          <span className="text-sm uppercase tracking-[0.2em] text-foreground/45">
            {INVESTMENT.unit}
          </span>
        </div>

        <p className="max-w-2xl text-base font-medium leading-relaxed text-foreground/70">
          <MaskedLine>{INVESTMENT.note}</MaskedLine>
        </p>
      </div>

      <div data-reveal="icon" className="relative z-10 shrink-0">
        <CTAButton href="/pricing" size="lg">
          View pricing
        </CTAButton>
      </div>
    </div>
  );
}
