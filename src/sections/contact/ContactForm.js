"use client";

import { useEffect, useState } from "react";
import SectionShell from "@/components/SectionShell";
import CTAButton from "@/components/CTAButton";
import { MaskedLine } from "@/components/MaskedLine";
import { ScrubText } from "@/components/ScrubText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useScrubReveal } from "@/hooks/useScrubReveal";
import { formatPhoneInput, normalizePhoneForSubmit } from "@/lib/phone";
import ThemedSelect from "@/components/ThemedSelect";

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
    // Deliberately `text`, not `url`: the native `url` type rejects
    // anything without a scheme, so "www.example.com" was blocked (QA).
    // The field is optional and free-form; we accept whatever they type.
    type: "text",
    inputMode: "url",
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
      "Full monthly growth system",
      "New business website",
      "Website redesign",
      "Lead capture setup",
      "Landing pages / funnels",
      "CRM setup / lead organization",
      "Follow-up automation",
      "Meta Ads",
      "Google Ads",
      "Brand messaging",
      "SEO foundation",
      "Social or campaign assets",
      "Not sure yet",
      "Other",
    ],
  },
  {
    name: "leads",
    label: "Where Are Leads Getting Lost?",
    required: false,
    options: [
      "Not enough website visitors",
      "People visit but do not contact us",
      "Forms are weak or confusing",
      "Leads come in but follow-up is slow",
      "We do not have automation",
      "We do not track leads well",
      "We need landing pages for ads",
      "Our ads are not converting",
      "We need better creative assets",
      "We are not sure yet",
    ],
  },
  {
    name: "budget",
    label: "Budget Range",
    required: true,
    options: [
      "Around $1,000/month",
      "Around $1,500/month",
      "Around $2,000/month",
      "Custom / not sure",
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

  // Dropdowns are custom (ThemedSelect), so their values live in state and
  // are validated/serialised manually rather than via native <select>.
  const [selects, setSelects] = useState({ help: "", leads: "", budget: "", timeline: "" });

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
    data.help = selects.help;
    data.leads = selects.leads;
    data.budget = selects.budget;
    data.timeline = selects.timeline;

    // Phone is optional — an empty field submits fine. But a partially
    // typed number must be a complete +1 (xxx) xxx-xxxx. normalizePhoneForSubmit
    // returns "" for anything under 10 national digits, so a non-empty phone
    // that fails to normalize is an incomplete entry we must block. (Native
    // `pattern` is kept as a backstop, but this JS check is the authority.)
    if (phone.trim() && !normalizePhoneForSubmit(phone)) {
      setError("Please enter a complete phone number, or leave the field blank.");
      setStatus("error");
      return;
    }

    // Custom dropdowns can't rely on native `required`, so enforce the
    // required selects here before we attempt to submit.
    const missing = SELECT_FIELDS.find((f) => f.required && !selects[f.name]);
    if (missing) {
      setError(`Please choose an option for "${missing.label}".`);
      setStatus("error");
      return;
    }

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
      setSelects({ help: "", leads: "", budget: "", timeline: "" });
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
          <MaskedLine className="text-[11px] uppercase tracking-[0.32em] text-accent">
            <span className="inline-flex items-center gap-3">
              <span
                data-reveal="icon"
                className="inline-block h-1.5 w-1.5 bg-accent"
              />
              Project brief
            </span>
          </MaskedLine>

          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-foreground">
            <ScrubText>Start the conversation.</ScrubText>
          </h2>

          <p className="max-w-md text-base font-medium leading-relaxed text-foreground/70">
            <MaskedLine>
              Complete the form below so we can understand your business needs
              and your goals.
            </MaskedLine>
          </p>
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
            className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.28em] text-foreground/70 light:text-foreground"
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
              <SelectField
                key={f.name}
                {...f}
                value={selects[f.name]}
                onChange={(val) => setSelects((s) => ({ ...s, [f.name]: val }))}
              />
            ))}
          </div>

          <label className="flex flex-col gap-3">
            <MaskedLine className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground/70 light:text-foreground">
              Message
            </MaskedLine>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Tell us what you are working on and what you need help with."
              className="w-full resize-none border-b border-muted/60 bg-transparent py-3 text-base text-foreground caret-accent outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
            />
          </label>

          <fieldset className="flex flex-col gap-4 border-t border-muted/40 pt-8">
            <MaskedLine className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground/70 light:text-foreground">
              SMS preferences
            </MaskedLine>

            {!hasPhone && (
              <p className="text-base italic text-foreground/60 light:text-foreground/85">
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
                className="text-sm uppercase tracking-[0.22em] text-accent"
              >
                Thanks — your message is in. One senior will reply within a
                working day.
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                className="text-sm uppercase tracking-[0.22em] text-foreground/60 light:text-foreground/85"
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
      <MaskedLine className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground/70 light:text-foreground">
        {label}
      </MaskedLine>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full border-b border-muted/60 bg-transparent py-3 text-base text-foreground caret-accent outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
      />
    </label>
  );
}

function PhoneField({ name, label, placeholder, autoComplete, value, onChange }) {
  return (
    <label className="flex flex-col gap-3">
      <MaskedLine className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground/70 light:text-foreground">
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
        // Optional field: an empty value submits fine. Completeness is
        // enforced in handleSubmit (see normalizePhoneForSubmit) so the
        // "incomplete number" error surfaces as the same inline message as
        // the rest of the form, rather than a browser-native bubble.
        className="w-full border-b border-muted/60 bg-transparent py-3 text-base text-foreground caret-accent outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
      />
    </label>
  );
}

function ConsentCheckbox({ checked, onChange, disabled, required, children }) {
  return (
    <label
      className={`flex items-start gap-3 text-base leading-relaxed ${
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
      <span
        className={
          disabled
            ? "text-foreground/50 light:text-foreground/65"
            : "text-foreground/80 light:text-foreground/95"
        }
      >
        {children}
      </span>
    </label>
  );
}

function SelectField({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <MaskedLine className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground/70 light:text-foreground">
        {label}
      </MaskedLine>
      <ThemedSelect
        value={value}
        onChange={onChange}
        options={options}
        label={label}
      />
    </div>
  );
}
