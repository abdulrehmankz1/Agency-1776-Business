"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";
import { useStaggeredGrid } from "@/hooks/useStaggeredGrid";

/**
 * AboutValues — the six values that hold the standard: Clarity, Discipline,
 * Trust, Execution, Purpose, and the America First Standard. Rendered as a
 * chamfered card grid with the shared column-cascade entrance.
 */
const VALUES = [
  {
    n: "01",
    title: "Clarity",
    body: "Confusion kills action. We build digital systems that make the message easy to understand and the next step easy to take.",
  },
  {
    n: "02",
    title: "Discipline",
    body: "Strong websites, funnels, ads, and automation systems are not built from random ideas. They are built through structure, focus, and decisions that support the goal.",
  },
  {
    n: "03",
    title: "Trust",
    body: "People act when they believe. Every digital system needs to create confidence through message, proof, design, follow-up, and experience.",
  },
  {
    n: "04",
    title: "Execution",
    body: "Strategy only matters if it gets built. We turn ideas into pages, funnels, forms, automations, assets, copy, design, and launch-ready systems.",
  },
  {
    n: "05",
    title: "Purpose",
    body: "Nothing goes into the system just to fill space. Every page, form, message, CTA, and automation should help the visitor understand, trust, or act.",
  },
  {
    n: "06",
    title: "America First Standard",
    body: "Agency 1776 carries a strong America First identity rooted in responsibility, work ethic, leadership, discipline, and results.",
  },
];

export default function AboutValues() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();
  const gridRef = useStaggeredGrid();

  return (
    <SectionShell
      id="values"
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
            The standard
          </span>
        </MaskedLine>
        <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-foreground">
          <ScrubText>Our values.</ScrubText>
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
        {VALUES.map((v, i) => (
          <article
            key={v.n}
            data-stagger-item
            data-col={i % 3}
            className="group relative flex h-full flex-col gap-6 bg-background p-8 md:p-10"
            style={{ backgroundImage: "var(--card-pinstripe)" }}
          >
            <div className="flex items-center gap-4">
              <span
                data-reveal="icon"
                className="font-display text-3xl font-semibold leading-none tracking-[-0.02em] text-foreground/85 md:text-4xl"
              >
                {v.n}
              </span>
              <span
                data-reveal="icon"
                className="h-px flex-1 bg-muted/50 transition-colors duration-500 group-hover:bg-accent"
              />
            </div>

            <MaskedLine
              as="h3"
              className="text-lg font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-xl"
            >
              {v.title}
            </MaskedLine>
            <p className="text-base font-medium leading-relaxed text-foreground/60">
              <MaskedLine>{v.body}</MaskedLine>
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
