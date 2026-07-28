// Phone helpers for the forms-compliance pattern.
// See .claude/Rule Guide/forms-compliance-pattern.md § 2.
//
// We own the country code: every value is canonicalized to `+1 (xxx) xxx-xxxx`.
// A user-typed/pasted leading `+1` or `1` is stripped and replaced by our
// pre-set `+1`, so `+1 (555) 555-0100`, `15555550100`, and `+15555550100`
// all normalize to the same value.

function toNationalDigits(raw) {
  let digits = String(raw ?? "").replace(/\D/g, "");
  // Strip the country code we own. Area codes never start with 1, so a
  // leading 1 is always the country code.
  if (digits.startsWith("1")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

/**
 * Live client-side formatter — bind to the phone input's onChange.
 * Formats progressively as the user types; returns "" when empty.
 *
 *   formatPhoneInput('5555550100')        → '+1 (555) 555-0100'
 *   formatPhoneInput('15555550100')       → '+1 (555) 555-0100'
 *   formatPhoneInput('+15555550100')      → '+1 (555) 555-0100'
 *   formatPhoneInput('555')               → '+1 (555'   // partial
 *   formatPhoneInput('+1')                → ''          // strips
 *   formatPhoneInput('')                  → ''
 */
export function formatPhoneInput(raw) {
  const digits = toNationalDigits(raw);
  if (digits.length === 0) return "";

  const area = digits.slice(0, 3);
  const mid = digits.slice(3, 6);
  const last = digits.slice(6, 10);

  let out = `+1 (${area}`;
  if (digits.length > 3) out += `) ${mid}`;
  if (digits.length > 6) out += `-${last}`;
  return out;
}

/**
 * Server-side canonical producer — use in API-route payloads.
 * Partial entries (fewer than 10 national digits) normalize to "".
 *
 *   normalizePhoneForSubmit('5555550100')        → '+1 (555) 555-0100'
 *   normalizePhoneForSubmit('+1 (555) 555-0100') → '+1 (555) 555-0100'
 *   normalizePhoneForSubmit('555555')            → ''
 *   normalizePhoneForSubmit('')                  → ''
 */
export function normalizePhoneForSubmit(raw) {
  const digits = toNationalDigits(raw);
  if (digits.length !== 10) return "";
  return formatPhoneInput(digits);
}
