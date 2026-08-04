import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import CTAButton from "@/components/CTAButton";
import ServicesGrid from "@/sections/services/ServicesGrid";
import ServicesProcess from "@/sections/services/ServicesProcess";
import ServicesFAQ from "@/sections/services/ServicesFAQ";

export const metadata = {
  title: "Services · Agency 1776 Business",
  description:
    "The complete system behind modern growth: website, landing pages, funnels, lead capture, CRM setup, follow-up automation, Meta Ads, Google Ads, copy, SEO, and campaign assets.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        showMeta={false}
        backdrop="scan"
        heading={{
          lead: "Services for your",
          tail: "business",
          accent: "growth.",
        }}
        description={[
          "Agency 1776 gives business owners the system behind modern growth:",
          "website, landing pages, funnels, lead capture, CRM setup, marketing automation, Meta Ads, Google Ads, messaging, and campaign assets.",
        ]}
      >
        <CTAButton href="/contact" size="lg">
          Build my automation system
        </CTAButton>
      </PageHero>
      <ServicesGrid />
      <ServicesProcess />
      <ServicesFAQ />
      <PageCTA
        eyebrow="Get started"
        heading="Build the system behind"
        accent="your next customer."
      >
        <CTAButton href="/contact" variant="solid" size="lg">
          Build my automation system
        </CTAButton>
        <CTAButton href="/contact" size="lg">
          Contact us
        </CTAButton>
      </PageCTA>
    </>
  );
}
