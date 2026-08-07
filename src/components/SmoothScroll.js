"use client";

import { useLayoutEffect, useRef } from "react";
import {
  gsap,
  registerGsap,
  ScrollSmoother,
  ScrollTrigger,
} from "@/animations/register";

/**
 * GSAP-only smooth scrolling wrapper.
 *
 * Structure:
 *   #smooth-wrapper > #smooth-content > (children)
 *
 * Fixed elements (top-bar, nav, cursor) must live OUTSIDE this wrapper so
 * their `position: fixed` isn't affected by the transformed content.
 *
 * We expose the smoother on `window.__smoother__` so anchor clicks can call
 * `smoother.scrollTo(el, true, 'top 100px')`.
 */
export default function SmoothScroll({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;
    registerGsap();

    // Bail on reduced-motion or touch devices — native scroll is preferable.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia?.("(hover: none)").matches;

    if (prefersReduced || isTouch) return;

    let smoother;
    const ctx = gsap.context(() => {
      smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.1,
        effects: false,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
      if (typeof window !== "undefined") {
        window.__smoother__ = smoother;
      }
      // Refresh any pre-existing ScrollTriggers so they use the new scroll proxy.
      ScrollTrigger.refresh();
    });

    // Route in-page hash-anchor clicks (e.g. the contact page's "#brief"
    // CTAs) through the smoother. Under ScrollSmoother a native anchor jump
    // does nothing — the transform-based scroll ignores it — and the desynced
    // scrollTop lets the user scroll past the footer. We only attach this
    // while the smoother exists; on touch / reduced-motion there is no
    // smoother and native anchor scrolling works as-is. A `defaultPrevented`
    // check yields to any nearer handler (e.g. Nav's own link handler).
    const onAnchorClick = (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const link = e.target.closest?.("a[href]");
      if (!link || link.target === "_blank") return;
      const href = link.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      smoother?.scrollTo(el, true, "top 100px");
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      if (typeof window !== "undefined") delete window.__smoother__;
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
