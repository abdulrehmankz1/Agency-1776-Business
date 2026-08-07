"use client";

import { motion } from "motion/react";
import SectionShell from "@/components/SectionShell";
import CTAButton from "@/components/CTAButton";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";
import { useStaggeredGrid } from "@/hooks/useStaggeredGrid";

// Two monthly growth partnership plans. Price is expressed once as a
// shared range in the section header rather than per-card.
const TIERS = [
  {
    id: "starter",
    name: "Starter Growth System",
    tagline:
      "Built for businesses that need a professional digital foundation and lead-capture system.",
    lede: "The Starter Growth System is for businesses that need a clear online presence, better messaging, basic CRM structure, lead capture, and simple follow-up automation.",
    bestFor: [
      "New businesses",
      "Local service businesses",
      "Small teams",
      "Businesses with outdated websites",
      "Owners who need a stronger digital foundation",
      "Businesses that need basic lead capture",
      "Businesses preparing for future ad campaigns",
    ],
    includes: [
      "Growth system strategy",
      "Core website pages",
      "Clear brand messaging",
      "Custom website design",
      "Mobile-responsive build",
      "Contact form setup",
      "Quote or inquiry path",
      "Basic CRM / lead organization setup",
      "Basic follow-up automation",
      "Basic SEO foundation",
      "Launch support",
      "Monthly system support",
    ],
    cta: "Start with Starter",
  },
  {
    id: "automated",
    name: "Automated Growth System",
    tagline:
      "Built for businesses that need websites, funnels, automation, ads, and stronger follow-up.",
    lede: "The Automated Growth System is for businesses that need more than a basic website. It is built around lead generation, landing pages, funnels, automation flows, CRM-style organization, paid ad support, and conversion-focused marketing.",
    bestFor: [
      "Growing businesses",
      "Service-based companies",
      "Businesses running Meta Ads",
      "Businesses running Google Ads",
      "Businesses needing more leads and customers",
      "Businesses losing leads from slow follow-up",
      "Companies ready for ongoing marketing support",
      "Companies ready to automate parts of their sales process",
    ],
    includes: [
      "Everything in Starter",
      "Expanded website structure",
      "Landing pages and funnels",
      "Lead capture setup",
      "CRM / lead flow setup",
      "Follow-up automation",
      "Conversion-focused copy",
      "Service page strategy",
      "Stronger CTA structure",
      "Campaign asset support",
      "Meta Ads support",
      "Google Ads support",
      "SEO-ready page setup",
      "Lead organization support",
      "Monthly optimization support",
      "Launch support",
    ],
    cta: "Choose Automated Growth",
    featured: true,
  },
];

export default function PricingTiers() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();
  const gridRef = useStaggeredGrid();

  return (
    <SectionShell
      id="tiers"
      ref={revealRef}
      className="py-24 md:py-32"
      innerClassName="mx-auto max-w-[1600px] px-6 md:px-16"
    >
      <div ref={scrubRef} className="mb-14 flex max-w-[64rem] flex-col gap-6 md:mb-20">
        <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
          <span className="inline-flex items-center gap-3">
            <span
              data-reveal="icon"
              className="inline-block h-1.5 w-1.5 bg-accent"
            />
            Plans
          </span>
        </MaskedLine>

        <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-[0.02em] text-foreground">
          <ScrubText>Choose the plan that matches</ScrubText>{" "}
          <span className="text-foreground/60">
            <ScrubText>the stage of your business.</ScrubText>
          </span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="chamfer chamfer-md grid grid-cols-1 gap-2 bg-background md:grid-cols-2 md:grid-rows-[auto_auto_1fr]"
        style={{
          // Border + interior fill both ride the theme background. The muted
          // outline used to read as a faint white diagonal at the chamfered
          // corners (amplified when a card lifts on hover); matching it to the
          // background removes that seam while the cards + gap carry the shape.
          "--chamfer-border-color": "var(--background)",
          // Gap between the cards shows the chamfer interior fill — keep it
          // on the theme background (black in dark, light bg in light) so the
          // channel reads as empty space rather than a grey muted band.
          "--chamfer-bg": "var(--background)",
        }}
      >
        {TIERS.map((t, i) => (
          <div
            key={t.id}
            data-stagger-item
            data-col={i}
            className="h-full md:row-span-3 md:grid md:grid-rows-subgrid"
          >
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className={
                (t.featured ? "bg-surface " : "bg-background ") +
                "relative flex h-full flex-col gap-5 p-7 md:row-span-3 md:grid md:grid-rows-subgrid md:p-10"
              }
              style={{ backgroundImage: "var(--card-pinstripe)" }}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <MaskedLine className="text-xs uppercase tracking-[0.32em] text-accent font-bold">
                    {t.name}
                  </MaskedLine>
                  {/* The badge is always rendered so both cards' name rows are
                      the SAME height — otherwise the featured card's badge made
                      its row taller, pushing its tagline + paragraph down and
                      out of alignment with the other card. On the non-featured
                      card it is `invisible` (reserves space, paints nothing)
                      and carries no data-reveal so the section reveal can't
                      un-hide it. */}
                  <span
                    aria-hidden={!t.featured}
                    data-reveal={t.featured ? "icon" : undefined}
                    className={
                      "chamfer chamfer-xs inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-accent" +
                      (t.featured ? "" : " invisible")
                    }
                    style={{
                      "--chamfer-border-color": "var(--accent)",
                      "--chamfer-bg": "var(--surface)",
                    }}
                  >
                    <span className="relative z-10 h-1 w-1 bg-accent" />
                    <span className="relative z-10">Most complete</span>
                  </span>
                </div>
                <MaskedLine
                  as="h3"
                  className="text-2xl font-medium leading-[1.2] tracking-[0.02em] text-foreground md:text-[1.75rem]"
                >
                  {t.tagline}
                </MaskedLine>
                <p className="text-lg font-medium leading-relaxed text-foreground/70">
                  <MaskedLine>{t.lede}</MaskedLine>
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-muted/50 pt-5">
                <MaskedLine className="text-xs uppercase tracking-[0.28em] text-foreground/40">
                  Best for
                </MaskedLine>
                <ul className="flex flex-col gap-2">
                  {t.bestFor.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-lg font-medium text-foreground/80"
                    >
                      <span
                        data-reveal="icon"
                        className="mt-2 h-1 w-1 shrink-0 bg-accent"
                      />
                      <MaskedLine>{b}</MaskedLine>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-5 md:h-full">
                <div className="flex flex-col gap-3 border-t border-muted/50 pt-5">
                  <MaskedLine className="text-xs uppercase tracking-[0.28em] text-foreground/40">
                    Includes
                  </MaskedLine>
                  <ul className="flex flex-col gap-2">
                    {t.includes.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-lg font-medium text-foreground/80"
                      >
                        <CheckGlyph
                          data-reveal="icon"
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        />
                        <MaskedLine>{b}</MaskedLine>
                      </li>
                    ))}
                  </ul>
                </div>

                <CTAButton
                  href="/contact"
                  variant={t.featured ? "solid" : "primary"}
                  className="mt-auto"
                >
                  {t.cta}
                </CTAButton>
              </div>
            </motion.article>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function CheckGlyph(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M3 8.5l3 3 7-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
