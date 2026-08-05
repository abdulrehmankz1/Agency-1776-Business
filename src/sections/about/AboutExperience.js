"use client";

import SectionShell from "@/components/SectionShell";
import CTAButton from "@/components/CTAButton";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { StencilFill } from "@/components/StencilFill";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

/**
 * AboutExperience — centered statement of what working with Agency 1776
 * brings together, closing on a "view our work" CTA.
 */
export default function AboutExperience() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();

  return (
    <SectionShell
      id="experience"
      ref={revealRef}
      className="py-32 md:py-48"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div
        ref={scrubRef}
        className="mx-auto flex max-w-[68rem] flex-col items-center gap-10 text-center md:gap-12"
      >
        <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            The experience
          </span>
        </MaskedLine>

        <h2 className="text-[clamp(2rem,5.5vw,4.25rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-foreground">
          <ScrubText>The Agency 1776</ScrubText>{" "}
          <StencilFill className="text-accent">experience.</StencilFill>
        </h2>

        <p className="max-w-2xl text-base font-medium leading-relaxed text-foreground/75">
          <MaskedLine>
            We bring together strategy, messaging, design, and execution to
            build digital systems that support real outcomes: leads, voters,
            donors, supporters, inquiries, bookings, and momentum.
          </MaskedLine>
        </p>

        <div data-reveal="icon">
          <CTAButton href="/work" size="lg">
            View our work
          </CTAButton>
        </div>
      </div>
    </SectionShell>
  );
}
