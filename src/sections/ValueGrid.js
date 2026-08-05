"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";
import { useStaggeredGrid } from "@/hooks/useStaggeredGrid";

/**
 * ValueGrid — the 5-stage growth playbook (Attract → Capture → Organize
 * → Follow Up → Convert). Five cards laid out as a full-width horizontal
 * filmstrip at xl (3-up at lg, 2-up at md, stacked at sm), each a
 * distinct chamfered cell with a display-face numeral, a bespoke line
 * glyph with a subtle CSS-only idle loop, and a step footer.
 *
 * Assembly effect matches vengenceui's staggered-grid center-out
 * cascade — cards with `data-col={i}` route through `useStaggeredGrid`
 * (columns delayed by |col − middle| × step on a single ScrollTrigger),
 * so inner cards land first and outer cards ripple out. Same maths as
 * the reference (`Math.abs(columnIndex - middleColumnIndex) * 0.2`),
 * running on the studio's shared GSAP context — no new controllers.
 *
 * The H2 rides the studio's particle heading materialisation
 * (`ScrubText mode="word"` + `useScrubReveal`) so the entrance matches
 * every other section on the site.
 */

const CARDS = [
  {
    n: "01",
    title: "Attract",
    body:
      "Your website, funnels, Meta Ads, Google Ads, landing pages, and marketing assets help bring the right people into your business ecosystem.",
    Icon: AttractGlyph,
  },
  {
    n: "02",
    title: "Capture",
    body:
      "Forms, CTAs, booking links, quote requests, lead magnets, and campaign landing pages collect visitor information.",
    Icon: CaptureGlyph,
  },
  {
    n: "03",
    title: "Organize",
    body:
      "CRM setup and lead flow structure help route inquiries into a cleaner system so they are easier to track, manage, and follow up with.",
    Icon: OrganizeGlyph,
  },
  {
    n: "04",
    title: "Follow Up",
    body:
      "Marketing automation helps your business respond faster, nurture interest, send reminders, and stay in front of people after they show interest.",
    Icon: FollowUpGlyph,
  },
  {
    n: "05",
    title: "Convert",
    body:
      "Strong offers, funnels, and consistent follow-up help move leads toward calls, bookings, estimates, and sales conversations.",
    Icon: GrowGlyph,
  },
];

export default function ValueGrid() {
  const revealRef = useSectionReveal({ staggerFrom: "center" });
  const scrubRef = useScrubReveal();
  const gridRef = useStaggeredGrid();

  return (
    <SectionShell
      id="playbook"
      ref={revealRef}
      className="py-28 md:py-40"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div ref={scrubRef} className="flex max-w-[68rem] flex-col items-start gap-8">
        <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            The playbook
          </span>
        </MaskedLine>

        <h2 className="text-[clamp(2rem,4.75vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
          <ScrubText mode="word">
            Help your business grow every day.
          </ScrubText>
        </h2>
      </div>

      <div className="mt-14 flex items-center gap-4 md:mt-20">
        <span
          data-reveal="icon"
          className="h-px w-16 bg-muted/60 md:w-24"
        />
        <MaskedLine className="text-[11px] uppercase tracking-[0.28em] text-foreground/45">
          Five stages · one system
        </MaskedLine>
        <span
          data-reveal="icon"
          aria-hidden
          className="h-px flex-1 bg-muted/40"
        />
      </div>

      <div
        ref={gridRef}
        className="chamfer chamfer-md mt-8 grid grid-cols-1 gap-px bg-muted/40 md:mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        style={{
          "--chamfer-border-color":
            "color-mix(in srgb, var(--muted) 40%, transparent)",
          "--chamfer-bg":
            "color-mix(in srgb, var(--muted) 40%, transparent)",
        }}
      >
        {CARDS.map((c, i) => (
          <ValueCard key={c.n} {...c} col={i} />
        ))}
      </div>
    </SectionShell>
  );
}

function ValueCard({ n, title, body, Icon, col }) {
  return (
    <article
      data-stagger-item
      data-col={col}
      className="group relative flex h-full flex-col gap-8 bg-background p-8 md:p-10"
      style={{ backgroundImage: "var(--card-pinstripe)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          data-reveal="icon"
          className="font-display text-4xl font-semibold leading-none tracking-[-0.02em] text-foreground/85 md:text-5xl"
        >
          {n}
        </span>
        <Icon
          data-reveal="icon"
          className="h-10 w-10 shrink-0 text-foreground/70 transition-colors duration-500 group-hover:text-accent"
        />
      </div>

      <div className="flex flex-col gap-4">
        <MaskedLine
          as="h3"
          className="text-lg font-semibold uppercase leading-[1.35] tracking-[0.18em] text-foreground"
        >
          {title}
        </MaskedLine>
        <p className="text-base font-medium leading-relaxed text-foreground/60">
          <MaskedLine>{body}</MaskedLine>
        </p>
      </div>

      <div className="mt-auto flex items-center gap-3 pt-2 text-[11px] uppercase tracking-[0.28em] text-foreground/40">
        <span
          data-reveal="icon"
          className="inline-block h-px w-6 bg-foreground/30 transition-all duration-500 group-hover:w-12 group-hover:bg-accent"
        />
        Step {n}
      </div>
    </article>
  );
}

function AttractGlyph(props) {
  // Target rings + crosshairs; center dot pulses via `.glyph-pulse`.
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1" />
      <path
        d="M20 1v5M20 39v-5M1 20h5M39 20h-5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle
        cx="20"
        cy="20"
        r="2"
        fill="currentColor"
        className="glyph-pulse"
      />
    </svg>
  );
}

function CaptureGlyph(props) {
  // Funnel converging to a stem; the captured lead dot pulses via `.glyph-pulse`.
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path
        d="M5 7L35 7L22 22V33H18V22L5 7Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle
        cx="20"
        cy="37"
        r="1.8"
        fill="currentColor"
        className="glyph-pulse"
      />
    </svg>
  );
}

function OrganizeGlyph(props) {
  // Three stacked CRM rows, each led by a marker; the last marker blinks.
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect x="6" y="8" width="28" height="7" stroke="currentColor" strokeWidth="1" />
      <rect x="6" y="17" width="28" height="7" stroke="currentColor" strokeWidth="1" />
      <rect x="6" y="26" width="28" height="7" stroke="currentColor" strokeWidth="1" />
      <path
        d="M22 11.5h8M22 20.5h8M22 29.5h8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="10.5" cy="11.5" r="1.4" fill="currentColor" />
      <circle cx="10.5" cy="20.5" r="1.4" fill="currentColor" />
      <circle
        cx="10.5"
        cy="29.5"
        r="1.4"
        fill="currentColor"
        className="glyph-blink"
      />
    </svg>
  );
}

function FollowUpGlyph(props) {
  // Return-loop arrow for repeated nurture; center dot pulses via `.glyph-pulse`.
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path
        d="M32 20a12 12 0 1 1-3.5-8.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M31 6v6h-6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="20"
        cy="20"
        r="1.8"
        fill="currentColor"
        className="glyph-pulse"
      />
    </svg>
  );
}

function GrowGlyph(props) {
  // Ascending bars + trend line; arrow head rises subtly via `.glyph-rise`.
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path d="M6 34h29" stroke="currentColor" strokeWidth="1" />
      <rect x="8" y="27" width="4" height="7" stroke="currentColor" strokeWidth="1" />
      <rect x="16" y="22" width="4" height="12" stroke="currentColor" strokeWidth="1" />
      <rect x="24" y="16" width="4" height="18" stroke="currentColor" strokeWidth="1" />
      <rect x="32" y="10" width="4" height="24" stroke="currentColor" strokeWidth="1" />
      <path
        d="M5 26l7-6 6 4 8-8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12l6-4M28 8v6M28 8h-6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="glyph-rise"
      />
    </svg>
  );
}
