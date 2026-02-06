import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Sparkles, ArrowRight } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
        setIsLoaded(true);
    }, []);

    return (
        <section className="relative w-full h-screen max-w-7xl mx-auto mt-0 mb-0 overflow-hidden">
            {init && <Particles
                id="tsparticles"
                options={{
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    particles: {
                        number: {
                            value: 80,
                            density: {
                                enable: true,
           
                            },
                        },
                        color: {
                            value: "#10b981",
                        },
                        size: {
                            value: { min: 1, max: 4 },
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                
                        },
                        opacity: {
                            value: 0.5,
                            animation: {
                                enable: true,
                                speed: 1,
                            },
                        },
                    },
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                        },
                    },
                }}
            />}
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src="./assets/jamu-hero.jpg"
                    alt="Hero Image"
                    className="w-full h-full object-cover"
                />
                {/* Enhanced overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
                
                {/* Content */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400 rounded-full backdrop-blur">
                        <Sparkles className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-300">Traditional Wellness</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight max-w-3xl drop-shadow-lg">
                        Embrace Tradition, <span className="text-green-400">Embrace Wellness</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow">
                        Discover the natural way to wellness with our traditional herbal remedies passed down through generations.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/about" 
                            className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition transform hover:scale-105 hover:shadow-lg"
                        >
                            Learn More
                            <ArrowRight className="w-5 h-5 ms-2" />
                        </Link>
                        <Link 
                            to="/products" 
                            className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition backdrop-blur border border-white/30"
                        >
                            Explore Products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}