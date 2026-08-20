import { Header } from "@/components/site/header";
import { BlurHero } from "@/components/site/blur-hero";
import { RenderShowcase } from "@/components/site/render-showcase";
import { Projects } from "@/components/site/projects";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Header active="engineering" />
      <main className="flex-1">
        <BlurHero />
        {/* <RenderShowcase /> */}
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
