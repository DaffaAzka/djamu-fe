import { useEffect, useState, useCallback } from "react";
// import { Button } from "~/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";


const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // particles init
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <img
          src="/assets/jamu-hero.jpg"
          alt="Herbal Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-[#f87108]" />
      </div>

      {/* Particles Layer */}
      <Particles
        id="tsparticles-hero"
        className="absolute inset-0 z-10"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          particles: {
            color: { value: ["#D97706", "#FF8C42", "#ffffff"] },
            move: {
              enable: true,
              speed: 1,
              direction: "top",
              outModes: { default: "out" },
            },
            number: { value: 50 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: 4 },
          },
          detectRetina: true,
        }}
      />
      {/* Content */}
      <div
        className={`relative z-10 text-white max-w-3xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
        <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <Sparkles className="inline w-4 h-4 mr-2 text-[#FF8C42]" />
          <span className="font-poppins text-sm font-semibold uppercase tracking-widest">
            100% Bahan Alami
          </span>
        </div>

        <h1 className="font-yusei text-5xl md:text-6xl mb-6 font-black leading-tight">
          Jamu Sehat dari Dapur
          <br />
          Kami untuk Keluarga Anda
        </h1>

        <p className="font-poppins text-lg md:text-xl mb-10 opacity-90 font-light max-w-2xl mx-auto">
          Minuman tradisi yang menyehatkan, dibuat dengan cinta dan rempah
          pilihan
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
