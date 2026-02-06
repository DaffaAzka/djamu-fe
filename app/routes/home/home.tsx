import type { Route } from "./+types/home";
import AboutSection from "./sections/about";
import CarouselSection from "./sections/carousel";
import FeaturesSection from "./sections/features";
import HeroSection from "./sections/hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection/>
      <CarouselSection />
    </>
  );
}
