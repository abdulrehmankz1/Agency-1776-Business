"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/utils/cn";

/**
 * ThemedSelect — a custom, fully themed dropdown that matches the form's
 * chamfered surface language. Replaces the native <select>, whose OS-drawn
 * option list ignored the site's design (QA: "the dropdown boxes don't look
 * like they're part of the forms' design").
 *
 * Controlled: the parent owns `value` ("" = nothing chosen yet) and receives
 * updates via `onChange(value)`. Fully keyboard accessible (Up/Down/Enter/
 * Space/Esc/Home/End), closes on outside click, and exposes ARIA
 * combobox + listbox semantics. Required-field enforcement is handled by the
 * parent form's submit handler, since a custom control can't use the native
 * `required` constraint.
 */
export default function ThemedSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const btnRef = useRef(null);
  const listboxId = useId();

  const selectedIndex = options.indexOf(value);

  // Close on outside pointer-down.
  useEffect(() => {
    if (!open) return;
    const onDocDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [open]);

  // Open the list and highlight the selected option (or the first one).
  const openList = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  // Keep the highlighted option scrolled into view.
  useEffect(() => {
    if (open && activeIndex >= 0 && listRef.current) {
      listRef.current.children[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, activeIndex]);

  const commit = (i) => {
    if (i < 0 || i >= options.length) return;
    onChange(options[i]);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) commit(activeIndex);
        else openList();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        if (open) setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={label}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-3 border-b border-muted/60 bg-transparent py-3 pr-2 text-left text-base outline-none transition-colors focus:border-accent",
          value ? "text-foreground" : "text-foreground/40"
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <span
          aria-hidden
          className={cn(
            "shrink-0 transition-transform duration-200",
            open ? "rotate-180 text-accent" : "text-foreground/40"
          )}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          className="chamfer chamfer-sm absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-64 overflow-y-auto py-1"
          style={{
            "--chamfer-border-color":
              "color-mix(in srgb, var(--accent) 45%, transparent)",
            "--chamfer-bg": "var(--surface)",
            // drop-shadow (not box-shadow) so the elevation follows the
            // clipped chamfer silhouette instead of being cut away. Uses
            // the theme's dedicated select-shadow token so the panel reads
            // as an elevated, on-brand part of the form.
            filter: "drop-shadow(0 16px 32px var(--themed-select-shadow))",
          }}
        >
          {options.map((opt, i) => {
            const isSelected = opt === value;
            const isActive = i === activeIndex;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(i)}
                // mousedown (not click) so the option commits before the
                // outside-pointer-down handler can close the list.
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(i);
                }}
                className={cn(
                  "cursor-pointer px-4 py-2.5 text-base transition-colors",
                  isActive ? "bg-accent/15 text-foreground" : "text-foreground/75",
                  isSelected && "font-semibold text-accent"
                )}
              >
                {opt}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
