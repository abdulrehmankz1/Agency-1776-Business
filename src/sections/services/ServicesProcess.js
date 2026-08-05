"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { StencilFill } from "@/components/StencilFill";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

const PROCESS = [
  {
    step: "01",
    label: "Diagnose",
    body: "We identify what is missing from your current digital setup: website clarity, lead capture, follow-up, automation, CRM structure, campaign assets, or conversion flow.",
  },
  {
    step: "02",
    label: "Map",
    body: "We map the customer journey from first visit to inquiry, booking, quote request, or sales conversation.",
  },
  {
    step: "03",
    label: "Build",
    body: "We create the website, landing pages, funnels, forms, CTAs, lead paths, CRM structure, and automation flows your business needs.",
  },
  {
    step: "04",
    label: "Launch",
    body: "We prepare the site, funnels, forms, automations, tracking structure, creative assets, and ad-ready pages for launch.",
  },
  {
    step: "05",
    label: "Optimize",
    body: "As your business grows, the system can be improved with stronger pages, better follow-ups, new ads, new funnels, and additional automation.",
  },
];

const OUTCOMES = [
  "A clearer offer",
  "A stronger first impression",
  "A professional website",
  "Better lead capture",
  "Faster follow-up",
  "Cleaner lead organization",
  "More useful landing pages",
  "A stronger foundation for ads",
  "Campaign assets ready to use",
  "A better path from visitor to inquiry",
  "A digital system built around growth",
];

export default function ServicesProcess() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();

  return (
    <SectionShell
      id="process"
      ref={revealRef}
      className="py-32 md:py-48"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div className="grid gap-16 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-24">
        <div ref={scrubRef} className="flex flex-col gap-8 md:sticky md:top-40 md:self-start">
          <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
            <span className="inline-flex items-center gap-3">
              <span
                data-reveal="icon"
                className="inline-block h-1.5 w-1.5 bg-accent"
              />
              Our process
            </span>
          </MaskedLine>

          <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
            <ScrubText>We build the system around how your business</ScrubText>{" "}
            <StencilFill className="text-accent">gets leads.</StencilFill>
          </h2>

          <p className="max-w-md text-base font-medium leading-relaxed text-foreground/60">
            <MaskedLine block>
              We understand that your goal is not just to launch
            </MaskedLine>
            <MaskedLine block>
              a website — it is to launch with direction.
            </MaskedLine>
            <MaskedLine block>
              That is why our work process helps you win.
            </MaskedLine>
          </p>
        </div>

        <ol className="flex flex-col divide-y divide-muted/40 border-y border-muted/40">
          {PROCESS.map((p) => (
            <li key={p.step} className="flex flex-col gap-4 py-10 md:flex-row md:gap-10">
              <span
                data-reveal="icon"
                className="font-display text-4xl font-semibold text-accent md:text-5xl"
              >
                {p.step}
              </span>
              <div className="flex flex-col gap-3">
                <MaskedLine
                  as="h3"
                  className="text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl"
                >
                  {p.label}
                </MaskedLine>
                <p className="max-w-md text-base font-medium leading-relaxed text-foreground/60">
                  <MaskedLine>{p.body}</MaskedLine>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* The outcomes — what the finished system delivers. */}
      <div className="mt-24 md:mt-32">
        <div className="mb-10 flex items-center gap-4 md:mb-14">
          <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
            <span className="inline-flex items-center gap-3">
              <span
                data-reveal="icon"
                className="inline-block h-1.5 w-1.5 bg-accent"
              />
              The outcomes
            </span>
          </MaskedLine>
          <span
            data-reveal="icon"
            aria-hidden
            className="h-px flex-1 bg-muted/40"
          />
        </div>

        <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((o, i) => (
            <li
              key={i}
              className="flex items-center gap-3 border-b border-muted/30 py-4 text-base font-medium text-foreground/80"
            >
              <CheckGlyph
                data-reveal="icon"
                className="h-4 w-4 shrink-0 text-accent"
              />
              <MaskedLine>{o}</MaskedLine>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

function CheckGlyph(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M3 8.5l3 3 7-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
