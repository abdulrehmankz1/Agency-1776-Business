"use client";

import SectionShell from "@/components/SectionShell";
import CTAButton from "@/components/CTAButton";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

/**
 * PricingCustom — a compact chamfered band between the plans and the FAQ:
 * a prompt for anyone whose needs fall outside the two standard plans,
 * with a single "ask about a custom build" CTA.
 */
export default function PricingCustom() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();

  return (
    <SectionShell
      id="custom"
      ref={revealRef}
      className="py-16 md:py-24"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div
        className="chamfer chamfer-md relative flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:gap-12 md:p-12"
        style={{
          "--chamfer-border-color":
            "color-mix(in srgb, var(--muted) 55%, transparent)",
          "--chamfer-bg": "var(--surface)",
          backgroundImage: "var(--card-pinstripe)",
        }}
      >
        <div ref={scrubRef} className="relative z-10 flex flex-col gap-4">
          <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
            <span className="inline-flex items-center gap-3">
              <span
                data-reveal="icon"
                className="inline-block h-1.5 w-1.5 bg-accent"
              />
              Custom builds
            </span>
          </MaskedLine>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
            <ScrubText>Need something more custom?</ScrubText>
          </h2>
        </div>

        <div data-reveal="icon" className="relative z-10 shrink-0">
          <CTAButton href="/contact" size="lg">
            Ask about a custom build
          </CTAButton>
        </div>
      </div>
    </SectionShell>
  );
}
