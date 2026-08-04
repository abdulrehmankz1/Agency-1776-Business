"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";
import { useStaggeredGrid } from "@/hooks/useStaggeredGrid";

/**
 * AboutAudiences — "Who we serve". One standard applied across three
 * audiences (businesses, political campaigns, nonprofits), each rendered
 * as a chamfered card with an accent kicker + description.
 */
const PATHS = [
  {
    n: "01",
    kicker: "For businesses",
    body: "The automated growth system that generates leads, supports follow-up, and helps turn opportunities into customers.",
  },
  {
    n: "02",
    kicker: "For political campaigns",
    body: "It has to communicate priorities, build trust, move voters and supporters, and strengthen campaign momentum.",
  },
  {
    n: "03",
    kicker: "For nonprofits",
    body: "It has to increase donations, attract volunteers, and grow community support.",
  },
];

export default function AboutAudiences() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();
  const gridRef = useStaggeredGrid();

  return (
    <SectionShell
      id="audiences"
      ref={revealRef}
      className="py-24 md:py-32"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div ref={scrubRef} className="mb-14 flex max-w-[64rem] flex-col gap-6 md:mb-20">
        <MaskedLine className="text-[11px] uppercase tracking-[0.32em] text-accent">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            Who we serve
          </span>
        </MaskedLine>

        <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-foreground">
          <ScrubText>Three paths.</ScrubText>{" "}
          <span className="text-foreground/60">
            <ScrubText>One agency standard.</ScrubText>
          </span>
        </h2>

        <p className="max-w-xl text-base font-medium leading-relaxed text-foreground/75">
          <MaskedLine>
            Agency 1776 was built to serve organizations where communication
            matters and action matters even more.
          </MaskedLine>
        </p>
      </div>

      <div
        ref={gridRef}
        className="chamfer chamfer-md grid grid-cols-1 gap-px bg-muted/40 md:grid-cols-3"
        style={{
          "--chamfer-border-color":
            "color-mix(in srgb, var(--muted) 40%, transparent)",
          "--chamfer-bg": "color-mix(in srgb, var(--muted) 40%, transparent)",
        }}
      >
        {PATHS.map((p, i) => (
          <article
            key={p.n}
            data-stagger-item
            data-col={i}
            className="group relative flex h-full flex-col gap-6 bg-background p-8 md:p-10"
            style={{ backgroundImage: "var(--card-pinstripe)" }}
          >
            <div className="flex items-center gap-4">
              <span
                data-reveal="icon"
                className="font-display text-3xl font-semibold leading-none tracking-[-0.02em] text-foreground/85 md:text-4xl"
              >
                {p.n}
              </span>
              <span
                data-reveal="icon"
                className="h-px flex-1 bg-muted/50 transition-colors duration-500 group-hover:bg-accent"
              />
            </div>

            <MaskedLine className="text-[11px] uppercase tracking-[0.28em] text-accent">
              {p.kicker}
            </MaskedLine>

            <p className="text-base font-medium leading-relaxed text-foreground/70">
              <MaskedLine>{p.body}</MaskedLine>
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
