import PageHero from "@/components/PageHero";
import PricingTiers from "@/sections/pricing/PricingTiers";
import PricingCustom from "@/sections/pricing/PricingCustom";

export const metadata = {
  title: "Pricing · Agency 1776 Business",
  description:
    "Three ways to work with the studio — Sprint, Retainer, or a bespoke Systems build.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        showMeta={false}
        backdrop="pulse"
        heading={{
          lead: "Automation plans",
          tail: "for your",
          accent: "business.",
        }}
        description={[
          "Most business growth partnerships are expected to range from $1,000–$2,000 per month,",
          "depending on scope, automation needs, ad support, campaign volume, and ongoing optimization.",
        ]}
      />
      <PricingTiers />
      <PricingCustom />
    </>
  );
}
