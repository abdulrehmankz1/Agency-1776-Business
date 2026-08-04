import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import CTAButton from "@/components/CTAButton";
import AboutEcosystem from "@/sections/about/AboutEcosystem";
import AboutAudiences from "@/sections/about/AboutAudiences";
import AboutExperience from "@/sections/about/AboutExperience";
import AboutValues from "@/sections/about/AboutValues";

export const metadata = {
  title: "About · Agency 1776 Business",
  description:
    "A specialized agency within the Ops 1776 Group, building the digital systems businesses, campaigns, and nonprofits need to move people to act.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        showMeta={false}
        backdrop="beams"
        heading={{
          lead: "Digital systems built to",
          accent: "move people.",
        }}
        description={[
          "Agency 1776 is a systems-focused marketing and creative agency",
          "built for organizations that need measurable outcomes.",
        ]}
      />
      <AboutEcosystem />
      <AboutAudiences />
      <AboutExperience />
      <AboutValues />
      <PageCTA
        eyebrow="Start here"
        heading="Let's build the digital system"
        accent="your mission deserves."
      >
        <CTAButton href="/contact" size="lg">
          Build a business system
        </CTAButton>
        <CTAButton href="/contact" size="lg">
          Launch a campaign
        </CTAButton>
        <CTAButton href="/contact" size="lg">
          Build a nonprofit system
        </CTAButton>
      </PageCTA>
    </>
  );
}
