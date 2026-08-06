"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { StencilFill } from "@/components/StencilFill";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

/**
 * PageCTA — shared closing conversion moment for non-home pages. Mirrors
 * the home Contact section: centered eyebrow + particle-materialized H2
 * (with an optional stencil-filled accent tail) + a CTA row. Pass one or
 * more <CTAButton> children.
 */
export default function PageCTA({ eyebrow, index, heading, accent, children }) {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();

  return (
    <SectionShell
      as="section"
      ref={revealRef}
      className="py-32 md:py-48"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div
        ref={scrubRef}
        className="mx-auto flex max-w-[64rem] flex-col items-center gap-10 text-center md:gap-14"
      >
        {eyebrow && (
          <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
            <span className="inline-flex items-center gap-3">
              <span
                data-reveal="icon"
                className="inline-block h-1.5 w-1.5 bg-accent"
              />
              {eyebrow}
              {index && (
                <>
                  {" "}
                  / <span>{index}</span>
                </>
              )}
            </span>
          </MaskedLine>
        )}

        <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-foreground">
          <ScrubText>{heading}</ScrubText>
          {accent && (
            <>
              {" "}
              <StencilFill className="text-accent">{accent}</StencilFill>
            </>
          )}
        </h2>

        {children && (
          <div
            data-reveal="icon"
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {children}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
