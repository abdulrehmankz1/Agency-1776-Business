import Link from "next/link";
import PageHero from "@/components/PageHero";
import LegalDocument from "@/sections/legal/LegalDocument";

export const metadata = {
  title: "Privacy Policy · Agency 1776",
  description:
    "How Agency 1776 collects, uses, discloses, and safeguards the information you share with us — including inquiries and SMS communications.",
};

// Inline link treatment shared by the interlink + contact links below.
const linkClass =
  "text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-foreground";

const SECTIONS = [
  {
    heading: "Information we collect",
    blocks: [
      "We may collect information you voluntarily provide, including:",
      {
        type: "list",
        items: [
          "Full name",
          "Email address",
          "Phone number",
          "Company or organization name",
          "Project details or inquiry information",
          "SMS communication preferences",
          "Any additional information you choose to share with us",
        ],
      },
      "We may also automatically collect certain technical information, including:",
      {
        type: "list",
        items: [
          "IP address",
          "Browser and device information",
          "Website usage data",
          "Pages visited",
          "Cookies and analytics information",
        ],
      },
    ],
  },
  {
    heading: "How we use your information",
    blocks: [
      "We may use your information to:",
      {
        type: "list",
        items: [
          "Respond to inquiries and consultation requests",
          "Discuss branding, website, marketing, or creative projects",
          "Provide requested services and project updates",
          "Improve our website and customer experience",
          "Send account, appointment, or service-related communications",
          "Send promotional communications where you have provided consent",
          "Meet legal and regulatory obligations",
        ],
      },
    ],
  },
  {
    heading: "SMS communications",
    blocks: [
      "If you choose to opt in to SMS communications, you may receive informational text messages regarding your inquiry, appointments, project updates, account notifications, or requested services.",
      "If you separately opt in to promotional SMS communications, you may receive updates about Agency 1776, announcements, special offers, or marketing communications.",
      {
        type: "list",
        items: [
          "Message frequency varies.",
          "Message and data rates may apply.",
          "Reply STOP to unsubscribe.",
          "Reply HELP for assistance.",
        ],
      },
      "Consent to receive SMS messages is voluntary and is not a condition of purchasing services.",
    ],
  },
  {
    heading: "SMS privacy",
    blocks: [
      "SMS opt-in data and consent are used solely to provide the messaging services you request. Agency 1776 does not sell, rent, share, or disclose SMS opt-in information or consent with third parties or affiliates for their own marketing purposes.",
    ],
  },
  {
    heading: "Information sharing",
    blocks: [
      "We may share information only when necessary to:",
      {
        type: "list",
        items: [
          "Deliver requested services",
          "Work with trusted vendors or service providers supporting our business operations",
          "Comply with legal requirements",
          "Protect our legal rights and business interests",
        ],
      },
      "We do not sell personal information.",
    ],
  },
  {
    heading: "Cookies & analytics",
    blocks: [
      "We may use cookies and similar technologies to understand website performance, improve functionality, and enhance your browsing experience.",
      "You can manage or disable cookies through your browser settings.",
    ],
  },
  {
    heading: "Data retention",
    blocks: [
      "We retain personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy or as required by applicable law.",
    ],
  },
  {
    heading: "Data security",
    blocks: [
      "We maintain reasonable administrative, technical, and organizational safeguards to protect your personal information.",
    ],
  },
  {
    heading: "Children's privacy",
    blocks: [
      "Our website is not intended for children under the age of 13, and we do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "Third-party links",
    blocks: [
      "Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.",
    ],
  },
  {
    heading: "Changes to this Privacy Policy",
    blocks: [
      "We may update this Privacy Policy periodically. Updates will be posted on this page with a revised effective date.",
      {
        type: "paragraph",
        content: (
          <>
            For additional information about your use of our website and
            services, please review our{" "}
            <Link href="/terms-and-conditions" data-cursor="link" className={linkClass}>
              Terms &amp; Conditions
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    heading: "Contact us",
    blocks: [
      "Agency 1776",
      "2325 E Camelback Rd, Suite 400, Phoenix, AZ 85016, USA",
      {
        type: "paragraph",
        content: (
          <>
            Email:{" "}
            <a
              href="mailto:outdevelopment@op1776.com"
              data-cursor="link"
              className={linkClass}
            >
              outdevelopment@op1776.com
            </a>
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Phone:{" "}
            <a href="tel:+18446201776" data-cursor="link" className={linkClass}>
              +1 (844) 620-1776
            </a>
          </>
        ),
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        showMeta={false}
        backdrop="scan"
        heading={{
          lead: "Privacy",
          accent: "Policy.",
        }}
        description={[
          "How we collect, use, and protect the information",
          "you share with Agency 1776.",
        ]}
      />
      <LegalDocument
        lastUpdated="August 2026"
        intro="Agency 1776 values your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit an inquiry, or communicate with us."
        sections={SECTIONS}
      />
    </>
  );
}
