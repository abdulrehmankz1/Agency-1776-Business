"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";
import { useStaggeredGrid } from "@/hooks/useStaggeredGrid";

/**
 * Services — "What we build". Ten capability cards that make up the
 * complete business automation system: website, funnels, capture, CRM,
 * follow-up, ads, copy, creative, and SEO. These are informational
 * cards (no per-item detail route), so they render as static chamfered
 * cells rather than links — same column-cascade entrance as the rest of
 * the home grids via `useStaggeredGrid`.
 */
const SERVICES = [
  {
    n: "01",
    title: "Website Built for Conversion",
    body:
      "A professional business website designed to explain your offer clearly, build trust, and guide visitors toward action.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect x="5" y="7" width="30" height="26" stroke="currentColor" />
        <path d="M5 13h30" stroke="currentColor" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <path d="M9 19h13" stroke="currentColor" strokeLinecap="round" />
        <rect x="9" y="24" width="10" height="5" stroke="currentColor" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Landing Pages and Funnels",
    body:
      "Focused pages and funnel paths for specific services, offers, campaigns, ads, promotions, or lead magnets.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <path
          d="M6 8h28L23 22v9l-6 4V22L6 8z"
          stroke="currentColor"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Lead Capture Forms",
    body:
      "Forms and contact paths built to collect inquiries, quote requests, bookings, consultations, and customer information.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect x="7" y="5" width="26" height="30" stroke="currentColor" />
        <path d="M12 13h16M12 19h16M12 25h8" stroke="currentColor" strokeLinecap="round" />
        <path
          d="M24 27l2.5 2.5L31 25"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    n: "04",
    title: "CRM / Lead Organization Support",
    body:
      "A simple structure to help your business track leads, understand where they came from, and manage next steps.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect x="5" y="7" width="8" height="26" stroke="currentColor" />
        <rect x="16" y="7" width="8" height="18" stroke="currentColor" />
        <rect x="27" y="7" width="8" height="22" stroke="currentColor" />
      </svg>
    ),
  },
  {
    n: "05",
    title: "Follow-Up Automation",
    body:
      "Automated email or message flows designed to respond faster, nurture interest, and keep leads from going cold.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect x="5" y="9" width="24" height="18" stroke="currentColor" />
        <path d="M5 9l12 9 12-9" stroke="currentColor" strokeLinejoin="round" />
        <path
          d="M33 31a5 5 0 1 1-1.4-3.4"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M33 24v3.6h-3.6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    n: "06",
    title: "Meta Ads",
    body:
      "Campaign support for Facebook and Instagram ads designed to drive traffic, generate leads, and support business growth campaigns.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect x="6" y="6" width="28" height="28" rx="6" stroke="currentColor" />
        <path
          d="M20 27V14M15 19l5-5 5 5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    n: "07",
    title: "Google Ads",
    body:
      "Search-focused ad support designed to help businesses capture demand from people actively looking for their services.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <circle cx="17" cy="17" r="10" stroke="currentColor" />
        <path d="M24.5 24.5L32 32" stroke="currentColor" strokeLinecap="round" />
        <path
          d="M13 17h8M17 13v8"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    n: "08",
    title: "Conversion-Focused Copy",
    body:
      "Clear messaging that explains what you do, why people should trust you, and what action they should take.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <path
          d="M8 11h24M8 17h24M8 23h15"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M21 30h11M28 27l4 3-4 3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    n: "09",
    title: "Social and Marketing Assets",
    body:
      "Digital content your business can use to promote services, drive traffic, and support campaigns.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect x="6" y="9" width="28" height="22" stroke="currentColor" />
        <circle cx="14" cy="16" r="2.5" stroke="currentColor" />
        <path
          d="M6 27l8-7 6 5 5-4 9 8"
          stroke="currentColor"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    n: "10",
    title: "SEO-Ready Foundation",
    body:
      "Website structure, headings, metadata, and page flow built with search visibility and discoverability in mind.",
    Icon: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <path
          d="M9 5h13l9 9v21H9z"
          stroke="currentColor"
          strokeLinejoin="round"
        />
        <path d="M22 5v9h9" stroke="currentColor" strokeLinejoin="round" />
        <circle cx="17" cy="24" r="4" stroke="currentColor" />
        <path d="M20 27l4 4" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Services() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();
  // Column-scrub staggered grid for the capability cards — cards rise
  // from below as the section crosses the viewport, middle columns lead,
  // outer columns delay.
  const gridRef = useStaggeredGrid();

  return (
    <SectionShell
      id="services"
      ref={revealRef}
      className="py-32 md:py-48"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div ref={scrubRef} className="flex max-w-[64rem] flex-col gap-8">
        <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            What we build
          </span>
        </MaskedLine>

        <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.01em] text-foreground">
          <ScrubText>A complete business automation system</ScrubText>{" "}
          <span className="text-foreground/60">
            <ScrubText>built like a growth system.</ScrubText>
          </span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="chamfer chamfer-md mt-14 grid grid-cols-1 gap-px bg-muted/40 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 xl:grid-cols-5"
        style={{
          "--chamfer-border-color":
            "color-mix(in srgb, var(--muted) 40%, transparent)",
          "--chamfer-bg": "color-mix(in srgb, var(--muted) 40%, transparent)",
        }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.n} {...s} col={i % 5} />
        ))}
      </div>
    </SectionShell>
  );
}

function ServiceCard({ n, title, body, Icon, col = 0 }) {
  // Outer wrapper is the ONLY element useStaggeredGrid touches (via
  // data-stagger-item) — it owns the yPercent/autoAlpha rise-from-below
  // tween. The inner article is a static informational cell (no detail
  // route), so hover only shifts the glyph to accent.
  return (
    <div data-stagger-item data-col={col} className="h-full">
      <article
        className="group relative flex h-full flex-col gap-6 bg-background p-8 md:p-10"
        style={{ backgroundImage: "var(--card-pinstripe)" }}
      >
        <div className="flex items-start justify-between">
          <Icon
            data-reveal="icon"
            className="h-10 w-10 text-foreground transition-colors group-hover:text-accent"
          />
          <span
            data-reveal="icon"
            className="text-[11px] uppercase tracking-[0.28em] text-foreground/40"
          >
            {n}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <MaskedLine
            as="h3"
            className="text-lg md:text-xl font-medium leading-[1.2] tracking-[0.03em] text-foreground"
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
