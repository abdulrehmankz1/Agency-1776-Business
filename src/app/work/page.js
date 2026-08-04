import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import CTAButton from "@/components/CTAButton";
import WorkGrid from "@/sections/work/WorkGrid";

export const metadata = {
  title: "Selected work · Agency 1776 Business",
  description:
    "Three engagements we can walk through — the problem, the approach, the numbers.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        showMeta={false}
        backdrop="sweep"
        heading={{
          lead: "Built with a job",
          accent: "to do.",
        }}
        description={[
          "Our work showcases websites, landing pages, lead capture systems, automation flows, and campaign assets",
          "built for businesses that needed more than a basic online presence.",
        ]}
      >
        <CTAButton href="#work-list" size="lg">
          View our projects
        </CTAButton>
      </PageHero>
      <WorkGrid />
      <PageCTA
        eyebrow="Case studies"
        heading="Your project could be the next"
        accent="case study."
      >
        <CTAButton href="/contact" size="lg">
          Contact us about your project
        </CTAButton>
      </PageCTA>
    </>
  );
}
