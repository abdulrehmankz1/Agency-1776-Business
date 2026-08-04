import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import CTAButton from "@/components/CTAButton";
import ContactForm from "@/sections/contact/ContactForm";

export const metadata = {
  title: "Contact · Agency 1776 Business",
  description:
    "Tell us what you're building, what is not working, and what website support you need. Agency 1776 will point you toward the right next step.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        showMeta={false}
        backdrop="directional"
        heading={{
          lead: "Tell us where",
          tail: "your lead system",
          accent: "is breaking.",
        }}
        description={[
          "Tell us what you are building, what is not working, and what kind of website support you need.",
          "Agency 1776 will help point you toward the right next step.",
        ]}
      >
        <CTAButton href="#brief" size="lg">
          Submit inquiry
        </CTAButton>
      </PageHero>
      <ContactForm />
      <PageCTA
        eyebrow="Start a project"
        heading="A better growth system starts with"
        accent="a clear conversation."
      >
        <CTAButton href="#brief" size="lg">
          Start a project
        </CTAButton>
      </PageCTA>
    </>
  );
}
