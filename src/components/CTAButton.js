"use client";

import { forwardRef, useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/animations/register";
import { cn } from "@/utils/cn";

/**
 * Primary CTA — the site's standardized button.
 *
 * Look (resting):
 *   [ ▪ START A PROJECT ── ]
 *   accent border · transparent bg · accent square dot · uppercase label · trailing hairline
 *
 * Hover choreography (GSAP-driven, no CSS transitions):
 *   1. Accent fill sweeps in from bottom-left with a diagonal clip-path lerp.
 *   2. Whole button lifts (-2px) and gains a soft red drop-shadow.
 *   3. Dot expands from a square into a short horizontal bar.
 *   4. Label rises 1px.
 *   5. Trailing hairline extends and slides to the right.
 *
 * The label color never changes — text stays legible in every state.
 * Variant "solid" ships pre-filled with accent + background-toned text.
 *
 * Renders as <a> (default, uses `href`) or <button> (when `type` is passed).
 */
const CTAButton = forwardRef(function CTAButton(
  {
    children,
    href,
    onClick,
    type,
    className,
    variant = "primary", // "primary" (bordered w/ hover sweep) | "solid" (accent bg from start)
    size = "md",         // "md" | "lg"
    disabled,
    "aria-label": ariaLabel,
    ...rest
  },
  externalRef
) {
  const localRef = useRef(null);

  useLayoutEffect(() => {
    const el = localRef.current;
    if (!el) return;
    registerGsap();

    const glow  = el.querySelector("[data-cta-glow]");
    const shell = el.querySelector("[data-cta-shell]");
    const fill  = el.querySelector("[data-cta-fill]");
    const label = el.querySelector("[data-cta-label]");
    const dot   = el.querySelector("[data-cta-dot]");
    const line  = el.querySelector("[data-cta-line]");

    // On the primary (outline) variant the accent fill sweeps in on hover,
    // so the label must ride from its resting theme color to white to stay
    // legible on the red. Capture the resting color now; restore via
    // clearProps on leave so it always tracks the live theme.
    const isPrimary = variant !== "solid";
    const restLabelColor =
      label && typeof window !== "undefined"
        ? window.getComputedStyle(label).color
        : "";

    // Resting state.
    gsap.set(fill, {
      clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
    });
    // Dot keeps a fixed 6×6 layout box; the hover morph into a bar rides
    // on scaleX/scaleY (transform, not width/height) so it never reflows
    // the nav row — growing width used to widen the button and nudge the
    // whole navbar on hover.
    gsap.set(dot,   { width: 6, height: 6, transformOrigin: "left center" });
    gsap.set(line,  { scaleX: 1, transformOrigin: "left center" });
    gsap.set(label, { y: 0 });
    // Prime the filter/boxShadow tracks so GSAP has a matching structure
    // to interpolate to on hover. drop-shadow rides on [data-cta-glow] —
    // an unclipped wrapper around the shell — so the glow traces the
    // chamfered silhouette without being clipped away AND without the
    // label sitting inside an animating filter (that forces Chrome to
    // re-rasterize the glyphs into the filter surface, which reads as a
    // font-weight shift on hover). The inset accent line rides on the
    // shell (clipped) so it hugs the chamfered edge cleanly.
    if (glow) {
      gsap.set(glow, {
        filter: "drop-shadow(0 0 0 rgba(191,10,48,0))",
      });
    }
    if (shell) {
      gsap.set(shell, {
        boxShadow: "0 0 0 1px rgba(191,10,48,0) inset",
      });
    }

    const ctx = gsap.context(() => {
      const enter = () => {
        if (disabled) return;
        gsap.killTweensOf([el, glow, shell, fill, label, dot, line]);
        // Sweep — invisible on solid variant (fill matches bg), still animates so the
        // resting/leave cycle stays consistent.
        gsap.to(fill, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.55,
          ease: "power3.out",
        });
        gsap.to(el, {
          y: -2,
          duration: 0.45,
          ease: "power3.out",
        });
        if (glow) {
          gsap.to(glow, {
            filter: "drop-shadow(0 12px 30px rgba(191,10,48,0.35))",
            duration: 0.45,
            ease: "power3.out",
          });
        }
        if (shell) {
          gsap.to(shell, {
            boxShadow: "0 0 0 1px rgba(191,10,48,0.4) inset",
            duration: 0.45,
            ease: "power3.out",
          });
        }
        // Dot morphs into a slim horizontal bar via transform only. Bar
        // width is capped so its right edge stays clear of the label —
        // the dot sits 6px wide with a 12px (gap-3) gutter to the text, so
        // a 12px bar leaves ~6px clearance and never runs into the glyphs.
        gsap.to(dot, {
          scaleX: 12 / 6,
          scaleY: 2 / 6,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(label, {
          y: -1,
          duration: 0.4,
          ease: "power3.out",
        });
        if (isPrimary) {
          gsap.to(label, {
            color: "#ffffff",
            duration: 0.45,
            ease: "power3.out",
          });
        }
        gsap.to(line, {
          scaleX: 1.6,
          duration: 0.55,
          ease: "power3.out",
          transformOrigin: "left center",
        });
      };

      const leave = () => {
        gsap.killTweensOf([el, glow, shell, fill, label, dot, line]);
        gsap.to(fill, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(fill, {
              clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
            });
          },
        });
        gsap.to(el, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
        if (glow) {
          gsap.to(glow, {
            filter: "drop-shadow(0 0 0 rgba(191,10,48,0))",
            duration: 0.4,
            ease: "power3.out",
          });
        }
        if (shell) {
          gsap.to(shell, {
            boxShadow: "0 0 0 1px rgba(191,10,48,0) inset",
            duration: 0.4,
            ease: "power3.out",
          });
        }
        gsap.to(dot, {
          scaleX: 1, scaleY: 1,
          duration: 0.4, ease: "power3.out",
        });
        gsap.to(label, {
          y: 0,
          duration: 0.35, ease: "power3.out",
        });
        if (isPrimary) {
          gsap.to(label, {
            color: restLabelColor,
            duration: 0.35,
            ease: "power3.out",
            onComplete: () => gsap.set(label, { clearProps: "color" }),
          });
        }
        gsap.to(line, {
          scaleX: 1,
          duration: 0.4, ease: "power3.out",
          transformOrigin: "right center",
        });
      };

      const down = () => gsap.to(el, { scale: 0.98, duration: 0.12, ease: "power2.out" });
      const up   = () => gsap.to(el, { scale: 1,    duration: 0.25, ease: "power3.out" });

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("focusin",  enter);
      el.addEventListener("focusout", leave);
      el.addEventListener("mousedown", down);
      el.addEventListener("mouseup",   up);
    }, el);

    return () => ctx.revert();
  }, [disabled]);

  const setRef = (node) => {
    localRef.current = node;
    if (typeof externalRef === "function") externalRef(node);
    else if (externalRef && "current" in externalRef) externalRef.current = node;
  };

  const isButton = !!type;
  const Tag = isButton ? "button" : "a";

  const sizes = {
    md: "px-5 py-3 text-xs tracking-[0.24em]",
    lg: "px-7 py-4 text-sm tracking-[0.26em]",
  };

  // Solid: pre-filled accent, dark tokens for text/dot/line.
  // Primary: bordered (chamfered), foreground tokens everywhere so
  // hover-sweep stays legible. Colors flow through `.chamfer`'s CSS
  // variables — the shell's own background paints the border, the
  // pseudo-element paints the interior fill.
  //
  // Layer structure — needed so the previous hover choreography still
  // renders correctly on a chamfered button:
  //
  //   <Tag>                     ← hover listeners + lift/scale transforms
  //     [data-cta-glow]         ← UNCLIPPED; carries the drop-shadow filter
  //       [data-cta-shell]        so the red glow extends past the outline
  //         .chamfer            ← clipped chamfered shell; provides border,
  //           [data-cta-fill]     interior fill, and hosts the inset boxShadow
  //     content (dot/label/line)
  //
  // Because the shell (not the glow layer) carries the clip-path, the
  // `filter: drop-shadow(...)` on [data-cta-glow] traces the shell's
  // chamfered silhouette instead of being clipped away. Keeping that
  // filter off <Tag> matters: text inside an animating filter gets
  // re-rasterized by the compositor and visibly changes weight on hover.
  const isSolid = variant === "solid";
  // Primary interior uses --background so the shell renders as a
  // hairline accent border over a dark fill — matching the previous
  // "bg-transparent" look on the black theme while giving the fill
  // sweep something to paint over on hover. Solid variant fills with
  // accent from the start.
  const shellStyle = {
    "--chamfer-border-color": "var(--accent)",
    "--chamfer-bg": isSolid ? "var(--accent)" : "var(--background)",
  };
  // Solid buttons are red in every theme, so their label/dot/line stay
  // white for legible contrast on the crimson fill. Primary buttons only
  // turn red on hover — their white-on-red handoff is animated below.
  const inkLabel = isSolid ? "text-white" : "text-foreground";
  const inkColor = isSolid ? "bg-white" : "bg-accent";

  return (
    <Tag
      ref={setRef}
      href={isButton ? undefined : href}
      onClick={onClick}
      type={isButton ? type : undefined}
      disabled={isButton ? disabled : undefined}
      aria-label={ariaLabel}
      data-cursor="button"
      data-cta
      data-variant={variant}
      className={cn(
        "group relative inline-flex shrink-0 items-center whitespace-nowrap uppercase outline-none will-change-transform isolate",
        sizes[size] || sizes.md,
        inkLabel,
        disabled && "pointer-events-none opacity-60",
        className
      )}
      {...rest}
    >
      {/* Glow layer — carries the animated drop-shadow. It wraps (but is
          not itself clipped by) the chamfered shell, so the shadow traces
          the chamfered silhouette while keeping the label out of the
          filter's render surface. */}
      <span
        aria-hidden
        data-cta-glow
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Chamfered shell — accent chamfered border + dark interior via
            .chamfer's ::before. Sits behind everything else at z:-10. */}
        <span
          aria-hidden
          data-cta-shell
          className="chamfer chamfer-sm pointer-events-none absolute inset-0"
          style={shellStyle}
        />
      </span>

      {/* Fill sweep, in its OWN chamfered mask so the shell's clip and
          the fill's animated clip don't fight over the same layer. The
          mask (chamfer-shape) clips the sweep to the chamfered outline;
          the fill span's clip-path is what GSAP animates. Painted after
          the shell in doc order so the sweep covers the shell's dark
          interior on hover, restoring the previous accent wipe. */}
      <span
        aria-hidden
        className="chamfer-shape pointer-events-none absolute inset-0 -z-10"
        style={{ "--chamfer-size": "6px" }}
      >
        <span
          aria-hidden
          data-cta-fill
          className="absolute inset-0 bg-accent"
        />
      </span>

      <span className="relative z-10 flex items-center gap-3">
        <span
          aria-hidden
          data-cta-dot
          className={cn("inline-block shrink-0", inkColor)}
        />
        <span
          data-cta-label
          className={cn("inline-block leading-none", inkLabel, isSolid && "font-semibold")}
        >
          {children}
        </span>
        <span
          aria-hidden
          data-cta-line
          className={cn("inline-block h-px w-6 shrink-0", inkColor)}
        />
      </span>
    </Tag>
  );
});

export default CTAButton;
