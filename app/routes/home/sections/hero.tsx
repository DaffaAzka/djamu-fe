import { useState } from "react";
import { Link } from "react-router";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-screen h-screen md:-mx-8 lg:mx-0 overflow-hidden mt-15">
      {/* Background Image */}
      <img
        src="./assets/jamu-hero.jpg"
        alt="Hero Image"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/40 to-black/50"></div>

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in font-yusei">
          Jamu - Embrace Tradition, Embrace Wellness
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 md:mb-10 max-w-2xl animate-fade-in-delayed">
          Discover the natural way to wellness with our traditional herbal
          remedies.
        </p>

        {/* CTA Button */}
        <Link
          to="/about"
          className="inline-flex items-center px-8 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm hover:from-green-700 hover:to-green-800">
          Learn More
          <Sparkles className="w-5 h-5 ms-2" />
        </Link>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
