"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { StencilFill } from "@/components/StencilFill";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

/**
 * Audience — "Who we serve". A deliberately simple, skimmable section:
 * eyebrow + heading, an audience chip grid, and a closing line. (The
 * earlier version wrapped this in a pinned scroll "tear/dissolve" reveal
 * over an orbiting SolarSystem graphic — removed as over-designed and
 * hard to skim.)
 */
const AUDIENCE = [
  { id: "services",     label: "Service-based businesses" },
  { id: "local",        label: "Local businesses" },
  { id: "contractors",  label: "Contractors" },
  { id: "consultants",  label: "Consultants" },
  { id: "professional", label: "Professional service providers" },
  { id: "coaches",      label: "Coaches and experts" },
  { id: "startups",     label: "Startups" },
  { id: "growth",       label: "Growing companies" },
  { id: "ads",          label: "Businesses running ads" },
  { id: "followup",     label: "Businesses losing leads from slow follow-up" },
  { id: "automate",     label: "Organizations ready to automate their lead flow" },
];

export default function Audience() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();

  return (
    <SectionShell
      id="audience"
      ref={revealRef}
      className="py-32 md:py-48"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div ref={scrubRef} className="flex max-w-[64rem] flex-col gap-8">
        <MaskedLine className="text-[10px] uppercase tracking-[0.32em] text-accent">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            Who we serve
          </span>
        </MaskedLine>

        <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
          <ScrubText>We support business owners</ScrubText>{" "}
          <span className="text-foreground/70">
            <ScrubText>who need</ScrubText>
          </span>{" "}
          <StencilFill className="text-accent">more than a website.</StencilFill>
        </h2>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-2 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {AUDIENCE.map((a) => (
          <li key={a.id}>
            <span
              data-reveal="icon"
              className="chamfer chamfer-xs relative flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-foreground/85"
              style={{
                "--chamfer-border-color":
                  "color-mix(in srgb, var(--muted) 45%, transparent)",
                "--chamfer-bg": "var(--surface)",
                backgroundImage: "var(--card-pinstripe)",
              }}
            >
              <span className="inline-block h-1.5 w-1.5 shrink-0 bg-accent" />
              <span className="leading-tight">{a.label}</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-12 max-w-xl text-base font-medium leading-relaxed text-foreground/70 md:mt-16">
        <MaskedLine>
          If your business is still relying on a basic website and manual
          follow-up, you are leaving opportunities behind.
        </MaskedLine>
      </p>
    </SectionShell>
  );
}
