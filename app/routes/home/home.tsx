import type { Route } from "./+types/home";
import AboutSection from "./sections/about";
import CarouselSection from "./sections/carousel";
import FeaturesSection from "./sections/features";
import HeroSection from "./sections/hero";
import KeluhanSection from "./sections/keluhan";
import ContactSection from "./sections/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Jamu!" },
    { name: "description", content: "Welcome to Jamu!" },
  ];
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection/>
      <CarouselSection />
      <KeluhanSection/>
      <ContactSection />
    </>
  );
}
