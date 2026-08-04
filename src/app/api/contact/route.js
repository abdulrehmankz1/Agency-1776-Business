// Contact form → GHL (LeadConnector) webhook bridge.
//
// The form POSTs here (never straight to GHL) so the webhook URLs stay
// server-side. We validate, split the single "Full Name" field into
// first/last, normalize the phone number, build a flat string payload, and
// fan it out to the primary + compliance webhooks.
// See .claude/Rule Guide/ghl-forms-webhooks.md and forms-compliance-pattern.md.

import { normalizePhoneForSubmit } from "@/lib/phone";

const PRIMARY_WEBHOOK_URL =
  process.env.CONTACT_WEBHOOK_URL ||
  "https://services.leadconnectorhq.com/hooks/KvwzhkNDpjKzayUu7tgo/webhook-trigger/pJwEd123jojECVKqd9MV";

// Shared across every form that collects a phone number (forms-compliance
// pattern § 1) — drives the A2P consent / subscription workflow. Same URL
// site-wide; env override supported.
const COMPLIANCE_WEBHOOK_URL =
  process.env.COMPLIANCE_WEBHOOK_URL ||
  "https://services.leadconnectorhq.com/hooks/KvwzhkNDpjKzayUu7tgo/webhook-trigger/qBuglNdE7S62ru2wDWcB";

const WEBHOOK_URLS = [
  PRIMARY_WEBHOOK_URL,
  ...(COMPLIANCE_WEBHOOK_URL ? [COMPLIANCE_WEBHOOK_URL] : []),
];

function splitName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  return { firstName, lastName };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const help = (body.help || "").trim();
  const leads = (body.leads || "").trim();
  const budget = (body.budget || "").trim();
  const timeline = (body.timeline || "").trim();

  // Mirror the form's required fields (name, email, help, budget, timeline,
  // message). Phone stays optional — never rejected when omitted.
  if (!name || !email || !message || !help || !budget || !timeline) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { firstName, lastName } = splitName(name);
  const phone = normalizePhoneForSubmit(body.phone);

  // Consent only counts when a phone number actually made it through
  // normalization — guards against stale consent flags with no number.
  const hasPhone = phone.length > 0;

  const payload = {
    type: "Contact_Form",
    firstName,
    lastName,
    email,
    phone,
    business: (body.business || "").trim(),
    website: (body.website || "").trim(),
    help,
    leads,
    budget,
    timeline,
    message,
    sms_updates: hasPhone && body.smsConsent ? "Yes" : "No",
    sms_promo: hasPhone && body.promoConsent ? "Yes" : "No",
    source: "src_contact",
    submitted_at: new Date().toISOString(),
  };

  try {
    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => {
          console.error("[Contact API] webhook error:", err);
          return { ok: false };
        })
      )
    );

    // 502 only when every webhook fails. A partial failure (primary up,
    // compliance down, or vice versa) still succeeds for the client.
    if (!results.some((r) => r.ok)) {
      return Response.json(
        { error: "Webhook delivery failed" },
        { status: 502 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API] unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
