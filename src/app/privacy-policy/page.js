import PageHero from "@/components/PageHero";
import LegalDocument from "@/sections/legal/LegalDocument";

export const metadata = {
  title: "Privacy Policy · Agency 1776 Business",
  description:
    "How Agency 1776 collects, uses, and protects the information you share with us — including contact form submissions and SMS communications.",
};

const SECTIONS = [
  {
    heading: "Information we collect",
    blocks: [
      "We collect information you provide directly to us when you use our website, contact us, or engage our services. This includes:",
      {
        type: "list",
        items: [
          "Contact and project details you submit through our contact form — your name, email address, phone number (optional), business or organization name, website, project focus, budget range, timeline, and any message you send us.",
          "Communications you exchange with us by email, phone, or text message.",
          "Information you provide over the course of a project engagement.",
        ],
      },
      "We also collect limited technical information automatically when you visit the site, such as your browser type, device information, and general usage data. A theme preference (light or dark) is stored locally in your browser and is never transmitted to us.",
    ],
  },
  {
    heading: "How we use your information",
    blocks: [
      "We use the information we collect to:",
      {
        type: "list",
        items: [
          "Respond to your inquiries and provide the services you request.",
          "Prepare proposals, deliver project work, and communicate about active engagements.",
          "Send you transactional and, where you have consented, marketing communications.",
          "Operate, maintain, and improve our website and services.",
          "Comply with legal obligations and enforce our agreements.",
        ],
      },
    ],
  },
  {
    heading: "SMS and text messaging",
    blocks: [
      "If you provide a phone number and opt in, we may send you text messages related to your inquiry or engagement. Message frequency varies. Message and data rates may apply.",
      {
        type: "list",
        items: [
          "You can opt out at any time by replying STOP to any message.",
          "Reply HELP for assistance, or contact us using the details below.",
          "We do not share mobile opt-in data or consent with third parties for their own marketing purposes.",
        ],
      },
      "Consent to receive text messages is not a condition of purchasing any goods or services.",
    ],
  },
  {
    heading: "How we share your information",
    blocks: [
      "We do not sell your personal information. We share information only in the following circumstances:",
      {
        type: "list",
        items: [
          "Service providers. We use trusted third-party platforms to operate our business — including our customer relationship management and messaging provider (HighLevel / LeadConnector) and our website hosting provider. These providers process information on our behalf and are bound to protect it.",
          "Legal requirements. We may disclose information where required by law, regulation, legal process, or governmental request.",
          "Business transfers. Information may be transferred as part of a merger, acquisition, or sale of assets.",
        ],
      },
    ],
  },
  {
    heading: "Data retention",
    blocks: [
      "We retain your information for as long as necessary to fulfill the purposes described in this policy, to maintain our business records, and to comply with our legal obligations. When information is no longer needed, we take reasonable steps to delete or de-identify it.",
    ],
  },
  {
    heading: "Your choices and rights",
    blocks: [
      "You may:",
      {
        type: "list",
        items: [
          "Request access to, correction of, or deletion of the personal information we hold about you.",
          "Unsubscribe from marketing emails using the link in any such message.",
          "Opt out of text messages by replying STOP.",
        ],
      },
      "Depending on where you live, you may have additional rights under applicable privacy laws. To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    heading: "Data security",
    blocks: [
      "We use reasonable administrative, technical, and physical safeguards designed to protect your information. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Children's privacy",
    blocks: [
      "Our website and services are not directed to children under 13, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.",
    ],
  },
  {
    heading: "Changes to this policy",
    blocks: [
      "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date at the top of this page. Your continued use of the site after changes take effect constitutes acceptance of the updated policy.",
    ],
  },
  {
    heading: "Contact us",
    blocks: [
      "If you have questions about this Privacy Policy or how we handle your information, reach us at hello@1776.studio.",
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
        lastUpdated="August 5, 2026"
        intro="Agency 1776 (“we,” “us,” or “our”) respects your privacy. This policy explains what information we collect, how we use it, and the choices you have. It applies to our website and to the services we provide."
        sections={SECTIONS}
      />
    </>
  );
}
