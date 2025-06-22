import { Basics } from "./components/Basics";
import SectionTitle from "./components/Basics/SectionTitle";
import DoubleContent from "./components/DoubleContent/DoubleContent";
import FAQSection from "./components/FAQSection/FAQSection";
import HeroSection from "./components/HeroSection/HeroSection";
import { MouseGlow } from "./components/MouseGlow/MouseGlow";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FAQSection />
      <ProjectsSection />
    </>
  );
}
