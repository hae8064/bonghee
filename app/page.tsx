import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { About } from "@/components/sections/About";
import { Cases } from "@/components/sections/Cases";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Cases />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
