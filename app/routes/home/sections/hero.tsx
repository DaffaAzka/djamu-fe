import {useState } from "react";
import { Link } from "react-router";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative w-full max-w-7xl mx-auto mt-20 mb-10">
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src="./assets/jamu-hero.jpg"
                    alt="Hero Image"
                    className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                       Jamu - Embrace Tradition, Embrace Wellness
                    </h1>
                    <p className="text-lg md:text-2xl text-white mb-6">
                        Discover the natural way to wellness with our traditional herbal remedies.
                    </p>
                    <Link to="/about" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                        Learn More
                        <Sparkles className="w-5 h-5 ms-2" />
                    </Link>
                </div>
            </div>
            </section>
    );
}
