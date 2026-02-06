import type { Route } from "./+types/home";
import CarouselSection from "./sections/carousel";
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
      <CarouselSection />
    </>
  );
}
