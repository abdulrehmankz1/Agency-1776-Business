"use client";

import SectionShell from "@/components/SectionShell";
import CTAButton from "@/components/CTAButton";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

/**
 * AboutEcosystem — "Part of Ops 1776 Group". Positions Agency 1776 inside
 * the parent group: eyebrow + heading on the left, the ecosystem
 * narrative (with a pulled-out role statement) and a CTA on the right.
 */
export default function AboutEcosystem() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();

  return (
    <SectionShell
      id="ecosystem"
      ref={revealRef}
      className="py-24 md:py-32"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div className="grid gap-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-24">
        <div
          ref={scrubRef}
          className="flex flex-col gap-8 md:sticky md:top-40 md:self-start"
        >
          <MaskedLine className="text-[11px] uppercase tracking-[0.32em] text-accent">
            <span className="inline-flex items-center gap-3">
              <span
                data-reveal="icon"
                className="inline-block h-1.5 w-1.5 bg-accent"
              />
              Part of Ops 1776 Group
            </span>
          </MaskedLine>

          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-foreground">
            <ScrubText>A specialized agency</ScrubText>{" "}
            <span className="text-foreground/60">
              <ScrubText>within a larger ecosystem.</ScrubText>
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          <p className="text-base font-medium leading-relaxed text-foreground/75">
            <MaskedLine>
              Agency 1776 operates under Ops 1776 Group of Companies, a parent
              company built around focused brands serving strategy, e-commerce,
              news, automated growth systems, AI-driven website solutions, and
              digital execution.
            </MaskedLine>
          </p>

          {/* Pulled-out role statement */}
          <div className="flex flex-col gap-3 border-l-2 border-accent pl-6">
            <MaskedLine className="text-[11px] uppercase tracking-[0.28em] text-foreground/50">
              Inside that ecosystem, Agency 1776 has one clear role:
            </MaskedLine>
            <p className="text-xl font-semibold leading-[1.25] tracking-[-0.01em] text-foreground md:text-2xl">
              <MaskedLine>
                Build the digital systems organizations need to move people to
                act.
              </MaskedLine>
            </p>
          </div>

          <p className="text-base font-medium leading-relaxed text-foreground/75">
            <MaskedLine>
              That includes websites, funnels, CRM setup, automation flows, lead
              capture systems, paid ads, campaign assets, supporter pathways,
              and conversion-focused messaging.
            </MaskedLine>
          </p>

          <p className="text-base font-medium leading-relaxed text-foreground/75">
            <MaskedLine>
              That focus keeps our work sharp. It keeps the audience clear. It
              keeps every project tied to a real outcome.
            </MaskedLine>
          </p>

          <div data-reveal="icon" className="mt-2">
            <CTAButton
              href="https://op1776groupofcompanies.vercel.app/"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Ops 1776 Group
            </CTAButton>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
