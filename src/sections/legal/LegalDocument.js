"use client";

import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { useSectionReveal } from "@/hooks/useSectionReveal";

/**
 * LegalDocument — the shared reading surface for text-heavy legal pages
 * (Privacy Policy, Terms of Service). Keeps the site's premium language —
 * SectionShell chamfered outline, useSectionReveal masked-line entrance,
 * mono section numbers — while dropping the scrub/stencil flourishes that
 * don't suit long-form prose. Content is data-driven so each legal page is
 * just an array of sections.
 *
 * Content model:
 *   sections: Array<{
 *     heading: string,
 *     blocks: Array<
 *       | string                                   // paragraph
 *       | { type: "list", items: string[] }        // bulleted list
 *       | { type: "subheading", text: string }     // inline sub-label
 *     >,
 *   }>
 */
function Block({ block }) {
  if (typeof block === "string") {
    return (
      <p className="text-base leading-relaxed text-foreground/70">
        <MaskedLine block>{block}</MaskedLine>
      </p>
    );
  }

  if (block.type === "subheading") {
    return (
      <MaskedLine
        as="h3"
        className="pt-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/85"
      >
        {block.text}
      </MaskedLine>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="flex flex-col gap-2.5">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-base leading-relaxed text-foreground/70"
          >
            <span
              data-reveal="icon"
              aria-hidden
              className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 bg-accent"
            />
            <MaskedLine block>{item}</MaskedLine>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

export default function LegalDocument({ lastUpdated, intro, sections }) {
  const revealRef = useSectionReveal();

  return (
    <SectionShell
      as="section"
      ref={revealRef}
      className="pb-28 md:pb-40"
      innerClassName="mx-auto max-w-[52rem] px-6 md:px-16"
    >
      <div className="flex flex-col gap-6 border-b border-muted/25 pb-10">
        {lastUpdated && (
          <MaskedLine className="font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/40">
            Last updated · {lastUpdated}
          </MaskedLine>
        )}
        {intro && (
          <p className="text-lg leading-relaxed text-foreground/75">
            <MaskedLine block>{intro}</MaskedLine>
          </p>
        )}
      </div>

      <div className="mt-14 flex flex-col gap-14">
        {sections.map((section, i) => (
          <article key={section.heading} className="flex flex-col gap-5">
            <div className="flex items-baseline gap-4">
              <span
                data-reveal="icon"
                aria-hidden
                className="font-mono text-xs tracking-[0.2em] text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <MaskedLine
                as="h2"
                className="text-xl font-medium leading-[1.2] tracking-[-0.01em] text-foreground md:text-2xl"
              >
                {section.heading}
              </MaskedLine>
            </div>
            <div className="flex flex-col gap-4 md:pl-10">
              {section.blocks.map((block, bi) => (
                <Block key={bi} block={block} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
