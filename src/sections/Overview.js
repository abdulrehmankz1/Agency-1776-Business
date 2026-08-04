"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

/**
 * Overview — the positioning statement that sits directly under the Hero.
 * A single large statement (word-mode dust materialization, matching
 * About / ValueGrid) followed by a divider and a supporting paragraph
 * that frames the offer as a monthly growth partnership.
 */
export default function Overview() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();

  return (
    <SectionShell
      id="overview"
      ref={revealRef}
      className="py-28 md:py-40"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div ref={scrubRef} className="flex max-w-[64rem] flex-col gap-10">
        <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            The growth partnership
          </span>
        </MaskedLine>

        <h2 className="text-[clamp(1.6rem,3.4vw,2.9rem)] font-medium leading-[1.14] tracking-[0.02em] text-foreground">
          <ScrubText mode="word">
            Agency 1776 helps businesses build the complete digital system
            behind growth:
          </ScrubText>{" "}
          <span className="text-foreground/55">
            <ScrubText mode="word">
              landing pages, CRM setup, marketing automation, Meta Ads, Google
              Ads, funnels, creative assets, and conversion-focused messaging.
            </ScrubText>
          </span>
        </h2>
      </div>
    </SectionShell>
  );
}
