"use client";

import SectionShell from "@/components/SectionShell";
import CTAButton from "@/components/CTAButton";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { StencilFill } from "@/components/StencilFill";
import HeroBackdrop from "@/components/HeroBackdrop";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

export default function Hero() {
  const revealRef = useSectionReveal({ start: "top bottom" });
  // Hero is always at the top of the page, so its heading materializes
  // immediately on mount rather than tied to scroll progress. Shorter
  // playDuration keeps the whole heading fully visible within ~0.9 s
  // of page load — no "still animating after load" tail.
  const scrubRef = useScrubReveal({ immediate: true, playDuration: 0.85 });

  return (
    <SectionShell
      as="section"
      id="top"
      ref={revealRef}
      className="min-h-[100svh]"
      innerClassName="mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-6 pt-28 pb-10 md:px-16 md:pt-32 md:pb-14"
      backdrop={<HeroBackdrop />}
    >

      {/*
        Heading + description/CTAs live inside a single flex-1 block so the
        leftover vertical space centers this group as one unit rather than
        splitting into two large gaps above/below the heading. Tight gap-10
        keeps the description hooked to the heading.
      */}
      <div className="flex flex-1 flex-col justify-center gap-10 md:gap-12">
        <div ref={scrubRef} className="max-w-[70rem]">
          <h1 className="font-display text-[clamp(2.25rem,6.5vw,5.75rem)] leading-[0.98] tracking-[-0.01em] text-foreground [word-break:normal]">
            <span className="block">
              <ScrubText>Build an automated growth system</ScrubText>
            </span>
            <span className="block text-foreground/70">
              <ScrubText>that helps your business generate</ScrubText>
            </span>
            <span className="block">
              <StencilFill immediate className="text-accent">
                more leads.
              </StencilFill>
            </span>
          </h1>
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <p className="max-w-lg text-base font-medium leading-relaxed text-foreground/70">
          <MaskedLine>
            It is a monthly growth partnership built to help your business
            attract the right people, capture their information, follow up
            faster, and turn interest into real opportunities.
          </MaskedLine>
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <CTAButton href="/contact" size="lg">
            Get more leads
          </CTAButton>
        </div>
        </div>
      </div>
    </SectionShell>
  );
}
