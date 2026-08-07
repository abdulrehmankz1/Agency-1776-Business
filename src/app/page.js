import Hero from "@/sections/Hero";
import Overview from "@/sections/Overview";
import ValueGrid from "@/sections/ValueGrid";
import Services from "@/sections/Services";
import Audience from "@/sections/Audience";
import Pricing from "@/sections/Pricing";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <Services />
      <ValueGrid />
      <Audience />
      <Pricing />
      <Contact />
    </>
  );
}
