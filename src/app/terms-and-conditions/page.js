import Link from "next/link";
import PageHero from "@/components/PageHero";
import LegalDocument from "@/sections/legal/LegalDocument";

export const metadata = {
  title: "Terms and Conditions · Agency 1776",
  description:
    "The terms and conditions that govern your use of the Agency 1776 website.",
};

// Inline link treatment shared by the interlink + contact links below.
const linkClass =
  "text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-foreground";

const SECTIONS = [
  {
    heading: "Website use",
    blocks: [
      "You agree to use this website only for lawful purposes and in a manner that does not interfere with its operation or the experience of other visitors.",
      "You may not:",
      {
        type: "list",
        items: [
          "Submit false or misleading information",
          "Attempt unauthorized access to our systems",
          "Introduce malicious software or harmful code",
          "Use this website for unlawful purposes",
        ],
      },
    ],
  },
  {
    heading: "Intellectual property",
    blocks: [
      "All content on this website, including text, graphics, branding, logos, images, designs, videos, and other creative materials, is the property of Agency 1776 unless otherwise stated.",
      "No content may be reproduced, copied, modified, or distributed without prior written permission.",
    ],
  },
  {
    heading: "Project inquiries",
    blocks: [
      "Submitting a project inquiry or consultation request does not establish a contractual relationship or guarantee that Agency 1776 will accept a project.",
    ],
  },
  {
    heading: "SMS terms",
    blocks: [
      "If you opt in to receive SMS communications:",
      {
        type: "list",
        items: [
          "Message frequency varies.",
          "Message and data rates may apply.",
          "Reply STOP to unsubscribe.",
          "Reply HELP for assistance.",
          "SMS consent is not a condition of purchasing services.",
        ],
      },
      "SMS opt-in information and consent will not be shared, sold, rented, or disclosed to third parties or affiliates for marketing purposes.",
      {
        type: "paragraph",
        content: (
          <>
            Please review our{" "}
            <Link href="/privacy-policy" data-cursor="link" className={linkClass}>
              Privacy Policy
            </Link>{" "}
            to learn how we collect, use, and protect your personal information.
          </>
        ),
      },
    ],
  },
  {
    heading: "Third-party services",
    blocks: [
      "Our website may include links to external websites or services. Agency 1776 is not responsible for the content or practices of those third-party websites.",
    ],
  },
  {
    heading: "Disclaimer",
    blocks: [
      "Information on this website is provided for general informational purposes. While we strive to keep content accurate and up to date, we make no guarantees regarding completeness or accuracy.",
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      "To the fullest extent permitted by law, Agency 1776 shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of this website.",
    ],
  },
  {
    heading: "Changes to these terms",
    blocks: [
      "We reserve the right to update these Terms & Conditions at any time. Any changes will become effective upon publication on this page.",
    ],
  },
  {
    heading: "Governing law",
    blocks: [
      "These Terms & Conditions are governed by the laws of the State of Arizona, without regard to its conflict of law principles.",
    ],
  },
  {
    heading: "Contact",
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

export default function TermsPage() {
  return (
    <>
      <PageHero
        showMeta={false}
        backdrop="scan"
        heading={{
          lead: "Terms and",
          accent: "Conditions.",
        }}
        description={[
          "The terms that govern your use of our",
          "website and services.",
        ]}
      />
      <LegalDocument
        lastUpdated="August 2026"
        intro="These Terms & Conditions govern your use of the Agency 1776 website. By accessing or using this website, you agree to these Terms."
        sections={SECTIONS}
      />
    </>
  );
}
