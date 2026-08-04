import PageHero from "@/components/PageHero";
import LegalDocument from "@/sections/legal/LegalDocument";

export const metadata = {
  title: "Terms of Service · Agency 1776 Business",
  description:
    "The terms that govern your use of the Agency 1776 website and the services we provide.",
};

const SECTIONS = [
  {
    heading: "Acceptance of terms",
    blocks: [
      "By accessing or using the Agency 1776 website (the “Site”) or engaging our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site or our services.",
    ],
  },
  {
    heading: "Our services",
    blocks: [
      "Agency 1776 provides marketing, creative, and digital systems services, including but not limited to websites, funnels, advertising, and marketing automation. The Site describes our offerings for informational purposes; it does not constitute an offer or contract on its own.",
      "The specific scope, deliverables, fees, and timeline for any engagement are defined in a separate written proposal or agreement (a “Project Agreement”). In the event of a conflict between these Terms and a signed Project Agreement, the Project Agreement controls.",
    ],
  },
  {
    heading: "Proposals and engagements",
    blocks: [
      "Submitting a contact form or inquiry does not create a binding engagement. An engagement begins only when both parties execute a Project Agreement. We reserve the right to decline any inquiry or project at our discretion.",
    ],
  },
  {
    heading: "Client responsibilities",
    blocks: [
      "To deliver our services effectively, we rely on you to:",
      {
        type: "list",
        items: [
          "Provide accurate, complete information and timely feedback, approvals, and materials.",
          "Hold the necessary rights to any content, trademarks, or assets you provide to us for use in your project.",
          "Comply with all applicable laws in connection with your project and business.",
        ],
      },
      "Delays in providing required materials or approvals may affect project timelines.",
    ],
  },
  {
    heading: "Fees and payment",
    blocks: [
      "Fees, payment schedules, and any deposit or retainer requirements are set out in your Project Agreement. Unless otherwise stated, invoices are due on the terms specified there. Late or missed payments may result in suspension of work.",
    ],
  },
  {
    heading: "Intellectual property",
    blocks: [
      "Ownership and licensing of project deliverables are governed by your Project Agreement. Unless otherwise agreed, final deliverables transfer to you upon full payment.",
      "The Site itself — including its design, text, graphics, and code, excluding client-provided materials — is owned by Agency 1776 and protected by intellectual property laws. You may not copy, reproduce, or reuse it without our permission.",
    ],
  },
  {
    heading: "Acceptable use",
    blocks: [
      "You agree not to:",
      {
        type: "list",
        items: [
          "Use the Site for any unlawful purpose or in violation of these Terms.",
          "Attempt to gain unauthorized access to the Site, its systems, or its data.",
          "Interfere with or disrupt the integrity or performance of the Site.",
          "Introduce malware or use automated means to scrape or overload the Site.",
        ],
      },
    ],
  },
  {
    heading: "Third-party services and links",
    blocks: [
      "The Site and our services may rely on or link to third-party platforms and websites. We are not responsible for the content, policies, or practices of third parties, and your use of them is governed by their own terms.",
    ],
  },
  {
    heading: "Disclaimers",
    blocks: [
      "The Site and its content are provided “as is” and “as available,” without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or secure.",
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      "To the fullest extent permitted by law, Agency 1776 will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, arising out of your use of the Site or our services. Where liability cannot be excluded, it is limited to the amount you paid us for the services giving rise to the claim.",
    ],
  },
  {
    heading: "Indemnification",
    blocks: [
      "You agree to indemnify and hold harmless Agency 1776 and its team from any claims, damages, or expenses arising out of your breach of these Terms, your misuse of the Site, or content or materials you provide to us.",
    ],
  },
  {
    heading: "Termination",
    blocks: [
      "We may suspend or terminate your access to the Site at any time for any reason, including violation of these Terms. Termination of a project engagement is governed by your Project Agreement.",
    ],
  },
  {
    heading: "Governing law",
    blocks: [
      "These Terms are governed by the laws of the State of New York, without regard to its conflict-of-laws principles. Any dispute arising under these Terms will be subject to the exclusive jurisdiction of the state and federal courts located in New York.",
    ],
  },
  {
    heading: "Changes to these terms",
    blocks: [
      "We may update these Terms from time to time. When we do, we will revise the “Last updated” date at the top of this page. Your continued use of the Site after changes take effect constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "Contact us",
    blocks: [
      "Questions about these Terms? Reach us at hello@1776.studio.",
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
          lead: "Terms of",
          accent: "Service.",
        }}
        description={[
          "The terms that govern your use of our",
          "website and services.",
        ]}
      />
      <LegalDocument
        lastUpdated="August 5, 2026"
        intro="These Terms of Service govern your access to and use of the Agency 1776 website and the services we provide. Please read them carefully."
        sections={SECTIONS}
      />
    </>
  );
}
