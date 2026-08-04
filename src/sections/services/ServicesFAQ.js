"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionShell from "@/components/SectionShell";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";

/**
 * ServicesFAQ — "Service paths". The engagement shapes businesses choose:
 * build the whole system, or fix the single part holding them back. Each
 * path is a title + a "for businesses that…" fit statement, in the same
 * accordion the page has always used.
 */
const PATHS = [
  {
    q: "Full Automation Build",
    a: "For businesses that need a complete system from website to funnels, lead capture, CRM, paid ads, and follow-up automation.",
  },
  {
    q: "Website + Lead Capture Build",
    a: "For businesses that need a professional website with forms, CTAs, quote requests, booking paths, and basic CRM structure.",
  },
  {
    q: "Landing Page + Funnel Build",
    a: "For businesses running ads, promotions, seasonal offers, lead magnets, or service-specific campaigns.",
  },
  {
    q: "Meta Ads / Google Ads Support",
    a: "For businesses that need ad campaigns connected to strong landing pages, clear offers, lead capture, and follow-up systems.",
  },
  {
    q: "Follow-Up Automation Setup",
    a: "For businesses that already get leads but need faster response, better nurturing, and cleaner lead handling.",
  },
  {
    q: "CRM / Lead Flow Setup",
    a: "For businesses that need a better way to organize, track, and manage incoming opportunities.",
  },
  {
    q: "Messaging and Conversion Upgrade",
    a: "For businesses whose website looks decent but fails to explain the offer, build trust, or move people to act.",
  },
];

export default function ServicesFAQ() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();
  const [open, setOpen] = useState(0);

  return (
    <SectionShell
      id="faq"
      ref={revealRef}
      className="py-24 md:py-32"
      innerClassName="mx-auto max-w-[1200px] px-6 md:px-16"
    >
      <div ref={scrubRef} className="mb-14 flex flex-col gap-6 md:mb-20">
        <MaskedLine className="text-[11px] uppercase tracking-[0.32em] text-accent">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            Service paths
          </span>
        </MaskedLine>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-foreground">
          <ScrubText>Build the whole system</ScrubText>{" "}
          <span className="text-foreground/60">
            <ScrubText>or fix the part that is holding you back.</ScrubText>
          </span>
        </h2>
      </div>

      <ul className="flex flex-col divide-y divide-muted/40 border-y border-muted/40">
        {PATHS.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="py-2">
              <button
                type="button"
                data-cursor="link"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left outline-none"
                aria-expanded={isOpen}
              >
                <MaskedLine
                  as="h3"
                  className="max-w-2xl text-lg font-semibold tracking-[-0.01em] text-foreground md:text-xl"
                >
                  {f.q}
                </MaskedLine>
                <span
                  data-reveal="icon"
                  className="chamfer chamfer-xs grid h-9 w-9 shrink-0 place-items-center text-foreground/70 transition-colors group-hover:text-accent"
                  style={{
                    "--chamfer-border-color":
                      "color-mix(in srgb, var(--muted) 50%, transparent)",
                    "--chamfer-bg": "var(--background)",
                  }}
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 26 }}
                    className="relative inline-block h-3 w-3"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
                  </motion.span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-6 pr-14 text-base font-medium leading-relaxed text-foreground/70">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
