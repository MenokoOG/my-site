import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Career } from "@/components/Career";
import { Links } from "@/components/Links";
import { DigitalTwinChat } from "@/components/DigitalTwinChat";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Career />
      <DigitalTwinChat />
      <Links />
    </>
  );
}
