import AboutSection from "@/components/AboutSection/AboutSection";
import FAQSection from "../components/FAQSection/FAQSection";
import HeroSection from "../components/HeroSection/HeroSection";
import ProjectsSection from "../components/ProjectsSection/ProjectsSection";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import CTASection from "@/components/CTASection/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FAQSection />
      <ProjectsSection />
      <AboutSection />
      <CTASection />
    </>
  );
}
