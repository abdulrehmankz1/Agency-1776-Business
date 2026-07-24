"use client";

import { useEffect, useState } from "react";
import SectionShell from "@/components/SectionShell";
import CTAButton from "@/components/CTAButton";
import { MaskedLine } from "@/components/MaskedLine";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";
import { formatPhoneInput } from "@/lib/phone";

const FIELDS = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email address",
    required: true,
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+1 (555) 555-0100",
    autoComplete: "tel",
  },
  {
    name: "business",
    label: "Business / Organization Name",
    type: "text",
    placeholder: "Enter your business name",
    autoComplete: "organization",
  },
  {
    name: "website",
    label: "Current Website URL",
    type: "url",
    placeholder: "Enter your current website, if you have one",
    autoComplete: "url",
  },
];

const SELECT_FIELDS = [
  {
    name: "help",
    label: "What Do You Need Help With?",
    required: true,
    options: [
      "New business website",
      "Website redesign",
      "Lead generation page",
      "Brand messaging",
      "SEO foundation",
      "Website strategy",
      "Ongoing website support",
      "Not sure yet",
      "Other",
    ],
  },
  {
    name: "budget",
    label: "Budget Range",
    required: true,
    options: [
      "Starter website plan",
      "Growth website plan",
      "Custom / Not sure",
    ],
  },
  {
    name: "timeline",
    label: "Timeline",
    required: true,
    options: [
      "As soon as possible",
      "Within 30 days",
      "Within 60 days",
      "No fixed timeline yet",
    ],
  },
];

export default function ContactForm() {
  const revealRef = useSectionReveal();
  const scrubRef = useScrubReveal();

  // "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Phone + consent are controlled so we can enforce the compliance pattern:
  // live +1 formatting, consent gated on a present phone number, and consent
  // auto-clearing when the phone is emptied.
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [promoConsent, setPromoConsent] = useState(false);

  const hasPhone = phone.trim().length > 0;

  // A user who ticks the boxes with a phone entered and then deletes the
  // phone must not ship stale consent state.
  useEffect(() => {
    if (!hasPhone) {
      setSmsConsent(false);
      setPromoConsent(false);
    }
  }, [hasPhone]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // Controlled fields override the FormData snapshot.
    data.phone = phone;
    data.smsConsent = hasPhone && smsConsent;
    data.promoConsent = hasPhone && promoConsent;

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || "Something went wrong.");
      }

      form.reset();
      setPhone("");
      setSmsConsent(false);
      setPromoConsent(false);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <SectionShell
      id="brief"
      ref={revealRef}
      className="py-24 md:py-32"
      innerClassName="mx-auto max-w-[1400px] px-6 md:px-16"
    >
      <div className="grid gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-24">
        <div ref={scrubRef} className="flex flex-col gap-8">
          <MaskedLine className="text-[10px] uppercase tracking-[0.32em] text-accent">
            <span className="inline-flex items-center gap-3">
              <span
                data-reveal="icon"
                className="inline-block h-1.5 w-1.5 bg-accent"
              />
              Project brief / 02
            </span>
          </MaskedLine>

          <ul className="flex flex-col gap-6 border-y border-muted/40 py-8">
            {[
              "One senior gets back to you personally.",
              "No sales team, no discovery-call funnel.",
              "First reply usually within a working day.",
            ].map((line, i) => (
              <li key={i} className="flex items-start gap-4 text-sm text-foreground/80">
                <span
                  data-reveal="icon"
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-accent"
                />
                <MaskedLine>{line}</MaskedLine>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="chamfer chamfer-md flex flex-col gap-10 p-8 md:p-12"
          style={{
            "--chamfer-border-color":
              "color-mix(in srgb, var(--muted) 50%, transparent)",
            "--chamfer-bg": "var(--surface)",
          }}
        >
          <div
            data-reveal="icon"
            className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-foreground/50"
          >
            <span className="inline-flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent" />
              New project brief
            </span>
            <span>Encrypted in transit</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {FIELDS.map((f) =>
              f.name === "phone" ? (
                <PhoneField
                  key={f.name}
                  {...f}
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhoneInput(e.target.value));
                    if (status === "error") setError("");
                  }}
                />
              ) : (
                <Field key={f.name} {...f} />
              )
            )}
            {SELECT_FIELDS.map((f) => (
              <SelectField key={f.name} {...f} />
            ))}
          </div>

          <label className="flex flex-col gap-3">
            <MaskedLine className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">
              Message
            </MaskedLine>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Tell us what you are working on and what you need help with."
              className="w-full resize-none border-b border-muted/60 bg-transparent py-3 text-sm text-foreground caret-accent outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
            />
          </label>

          <fieldset className="flex flex-col gap-4 border-t border-muted/40 pt-8">
            <MaskedLine className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">
              SMS preferences
            </MaskedLine>

            {!hasPhone && (
              <p className="text-xs italic text-foreground/40">
                Enter a phone number above to opt in to SMS messages.
              </p>
            )}

            <ConsentCheckbox
              checked={smsConsent}
              onChange={(e) => setSmsConsent(e.target.checked)}
              disabled={!hasPhone}
              required={hasPhone}
            >
              I agree to receive account and project-related text messages from
              Agency 1776 Business at the number provided. Message frequency
              varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP
              for help.
            </ConsentCheckbox>

            <ConsentCheckbox
              checked={promoConsent}
              onChange={(e) => setPromoConsent(e.target.checked)}
              disabled={!hasPhone}
              required={hasPhone}
            >
              I agree to receive occasional promotional and marketing text
              messages from Agency 1776 Business. Message frequency varies. Msg
              &amp; data rates may apply. Reply STOP to opt out, HELP for help.
            </ConsentCheckbox>
          </fieldset>

          <div className="flex flex-col gap-4">
            <CTAButton
              type="submit"
              variant="solid"
              size="lg"
              className="mt-2"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </CTAButton>

            {status === "success" && (
              <p
                role="status"
                className="text-xs uppercase tracking-[0.22em] text-accent"
              >
                Thanks — your message is in. One senior will reply within a
                working day.
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                className="text-xs uppercase tracking-[0.22em] text-foreground/60"
              >
                {error} Please try again or email us directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </SectionShell>
  );
}

function Field({ name, label, type, placeholder, required, autoComplete }) {
  return (
    <label className="flex flex-col gap-3">
      <MaskedLine className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">
        {label}
      </MaskedLine>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full border-b border-muted/60 bg-transparent py-3 text-sm text-foreground caret-accent outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
      />
    </label>
  );
}

function PhoneField({ name, label, placeholder, autoComplete, value, onChange }) {
  return (
    <label className="flex flex-col gap-3">
      <MaskedLine className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">
        {label}
      </MaskedLine>
      <input
        name={name}
        type="tel"
        inputMode="tel"
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="w-full border-b border-muted/60 bg-transparent py-3 text-sm text-foreground caret-accent outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
      />
    </label>
  );
}

function ConsentCheckbox({ checked, onChange, disabled, required, children }) {
  return (
    <label
      className={`flex items-start gap-3 text-xs leading-relaxed ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="mt-0.5 h-4 w-4 shrink-0 accent-accent disabled:cursor-not-allowed disabled:opacity-40"
      />
      <span className={disabled ? "text-foreground/40" : "text-foreground/70"}>
        {children}
      </span>
    </label>
  );
}

function SelectField({ name, label, options, required }) {
  return (
    <label className="flex flex-col gap-3">
      <MaskedLine className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">
        {label}
      </MaskedLine>
      <div className="relative">
        <select
          name={name}
          required={required}
          defaultValue=""
          className="peer w-full appearance-none border-b border-muted/60 bg-transparent py-3 pr-8 text-sm text-foreground caret-accent outline-none transition-colors invalid:text-foreground/30 focus:border-accent"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-background text-foreground">
              {opt}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-foreground/40 transition-colors peer-focus:text-accent"
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </div>
    </label>
  );
}
