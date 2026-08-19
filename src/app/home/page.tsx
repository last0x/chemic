import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Contact } from "@/components/site/contact";
import { HomeHero } from "@/components/home/home-hero";
import { PoeSolution } from "@/components/home/poe-solution";
import { SmartHomeApproach } from "@/components/home/smart-home-approach";
import { ModularPricing } from "@/components/home/modular-pricing";
import { HomeProjects } from "@/components/home/home-projects";

export default function ChemicHomePage() {
  return (
    <>
      <Header active="home" />
      <main className="flex-1">
        <HomeHero />
        {/* <PoeSolution />
        <SmartHomeApproach />
        <ModularPricing />
        <HomeProjects />
        <Contact variant="home" /> */}
      </main>
      <Footer />
    </>
  );
}
