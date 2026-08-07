"use client";

import SectionShell from "@/components/SectionShell";
import CTAButton from "@/components/CTAButton";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { StencilFill } from "@/components/StencilFill";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

/**
 * Contact — homepage's closing conversion moment. Stripped to a centered
 * eyebrow + heading + primary CTA so the finale reads as a single focused
 * prompt to the dedicated `/contact` page (where the full brief form and
 * studio channels live). Heading rides the studio's particle
 * materialisation (ScrubText per-char + useScrubReveal); CTA button
 * reuses the sitewide `<CTAButton>` primary-outline styling and hover
 * choreography.
 */

export default function Contact() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();

  return (
    <SectionShell
      id="contact"
      ref={revealRef}
      className="py-32 md:py-48"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div
        ref={scrubRef}
        className="mx-auto flex max-w-[64rem] flex-col items-center gap-10 text-center md:gap-14"
      >
        <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            Contact
          </span>
        </MaskedLine>

        <h2 className="text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.02em] text-foreground">
          <ScrubText>Ready to build a growth system that</ScrubText>{" "}
          <StencilFill className="text-accent">works after the click?</StencilFill>
        </h2>

        <div data-reveal="icon">
          <CTAButton href="/contact" size="lg">
            Start a project
          </CTAButton>
        </div>
      </div>
    </SectionShell>
  );
}
