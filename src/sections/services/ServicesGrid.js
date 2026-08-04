"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";
import { useStaggeredGrid } from "@/hooks/useStaggeredGrid";

/**
 * ServicesGrid — "The system". The twelve capabilities that make up the
 * complete growth system. These are informational cards (no per-item
 * detail route), so they render as static chamfered cells rather than
 * links, with the same column-cascade entrance as the home grids.
 */
const SYSTEM = [
  {
    n: "01",
    title: "Growth System Strategy",
    body: "We map your offer, audience, customer journey, lead sources, conversion points, funnel structure, ad needs, CRM setup, and automation path before anything is built.",
  },
  {
    n: "02",
    title: "Conversion-Focused Website",
    body: "We build a professional website designed to explain your offer, build trust, and move visitors toward inquiries, bookings, quote requests, and sales conversations.",
  },
  {
    n: "03",
    title: "Landing Pages and Funnels",
    body: "We create focused pages for services, paid ads, promotions, lead magnets, consultations, and campaign-specific offers.",
  },
  {
    n: "04",
    title: "Lead Capture Setup",
    body: "We build forms, CTAs, booking paths, quote requests, and inquiry flows that make it easier for visitors to become leads.",
  },
  {
    n: "05",
    title: "CRM and Lead Organization",
    body: "We help structure the way leads are collected, categorized, tracked, and handed off so opportunities do not get lost.",
  },
  {
    n: "06",
    title: "Follow-Up Automation",
    body: "We create automated responses and nurture flows that help your business follow up faster and stay in front of interested prospects.",
  },
  {
    n: "07",
    title: "Meta Ads Support",
    body: "We support Facebook and Instagram campaigns with landing pages, messaging, creative direction, and lead-generation structure.",
  },
  {
    n: "08",
    title: "Google Ads Support",
    body: "We support search-based campaigns with conversion-focused landing pages, offer messaging, and lead capture paths for people actively looking for your services.",
  },
  {
    n: "09",
    title: "Conversion-Focused Copy",
    body: "We write messaging that makes your offer clear, builds trust, and gives people a reason to take the next step.",
  },
  {
    n: "10",
    title: "SEO-Ready Foundation",
    body: "We structure your pages with search visibility in mind, including headings, metadata, internal flow, and content organization.",
  },
  {
    n: "11",
    title: "Social and Campaign Assets",
    body: "We create digital assets your business can use to promote services, drive traffic, support campaigns, and keep the brand active.",
  },
  {
    n: "12",
    title: "Website Redesign and Automation Upgrade",
    body: "If your current website is outdated or disconnected from your sales process, we rebuild it into a stronger lead-generation and follow-up system.",
  },
];

export default function ServicesGrid() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();
  const gridRef = useStaggeredGrid();

  return (
    <SectionShell
      id="services-list"
      ref={revealRef}
      className="py-24 md:py-32"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div ref={scrubRef} className="mb-14 flex flex-col gap-6 md:mb-20">
        <MaskedLine className="text-[11px] uppercase tracking-[0.32em] text-accent">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            Services
          </span>
        </MaskedLine>
        <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-foreground">
          <ScrubText>The system.</ScrubText>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="chamfer chamfer-md grid grid-cols-1 gap-px bg-muted/40 md:grid-cols-2 lg:grid-cols-3"
        style={{
          "--chamfer-border-color":
            "color-mix(in srgb, var(--muted) 40%, transparent)",
          "--chamfer-bg": "color-mix(in srgb, var(--muted) 40%, transparent)",
        }}
      >
        {SYSTEM.map((s, i) => (
          <ServiceCard key={s.n} {...s} col={i % 3} />
        ))}
      </div>
    </SectionShell>
  );
}

function ServiceCard({ n, title, body, col = 0 }) {
  // Outer wrapper is the ONLY element useStaggeredGrid touches (via
  // data-stagger-item). The inner article is a static informational cell.
  return (
    <div data-stagger-item data-col={col} className="h-full">
      <article
        className="group relative flex h-full flex-col gap-6 bg-background p-8 md:p-10"
        style={{ backgroundImage: "var(--card-pinstripe)" }}
      >
        <div className="flex items-center gap-4">
          <span
            data-reveal="icon"
            className="font-display text-3xl font-semibold leading-none tracking-[-0.02em] text-foreground/85 md:text-4xl"
          >
            {n}
          </span>
          <span
            data-reveal="icon"
            className="h-px flex-1 bg-muted/50 transition-colors duration-500 group-hover:bg-accent"
          />
        </div>

        <div className="flex flex-col gap-3">
          <MaskedLine
            as="h3"
            className="text-lg font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-xl"
          >
            {title}
          </MaskedLine>
          <p className="text-base font-medium leading-relaxed text-foreground/60">
            <MaskedLine>{body}</MaskedLine>
          </p>
        </div>
      </article>
    </div>
  );
}
