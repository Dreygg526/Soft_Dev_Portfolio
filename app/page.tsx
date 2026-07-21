import WelcomeGate from "@/components/WelcomeGate";
import SiteBackground from "@/components/SiteBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <SiteBackground />
      <WelcomeGate />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Credentials />
      <Contact />
      <Footer />
    </main>
  );
}
