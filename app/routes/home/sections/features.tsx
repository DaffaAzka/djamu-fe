import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Sparkles, Leaf, Droplet, Heart } from "lucide-react";

export default function FeaturesSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        { icon: Leaf, title: "100% Natural", desc: "Pure herbal ingredients" },
        { icon: Droplet, title: "Authentic Recipe", desc: "Traditional formulation" },
        { icon: Heart, title: "Health Boosting", desc: "Wellness benefits" },
    ];

    return (
        <section className="relative w-full max-w-7xl mx-auto mt-20 mb-10 px-4">
            <div className="relative overflow-hidden rounded-xl shadow-2xl group">
                <img
                    src="./assets/jamu-features.jpg"
                    alt="Features Image"
                    className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70"></div>
                
                {/* Animated background elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

                {/* Content */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400 rounded-full backdrop-blur">
                        <Sparkles className="w-4 h-4 text-green-400 animate-spin" />
                        <span className="text-sm text-green-300 font-semibold">Discover Our Essence</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        Why Choose <span className="text-green-400">Jamu?</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl drop-shadow leading-relaxed">
                        Jamu is a traditional Indonesian herbal medicine that has been used for centuries to promote health and wellness. Made from natural ingredients such as
                        roots, leaves, flowers, and spices, Jamu offers a holistic approach to healing and prevention. Our mission is to preserve this rich cultural heritage
                        while providing high-quality Jamu products that cater to modern lifestyles.
                    </p>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-2xl">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-white/10 backdrop-blur border border-green-400/30 rounded-lg p-4 transform hover:scale-110 hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 animate-fadeInUp"
                                style={{ animationDelay: `${idx * 0.2}s` }}
                            >
                                <feature.icon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                                <p className="text-xs text-gray-300">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <Link 
                        to="/features" 
                        className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 shadow-lg"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Explore Features
                    </Link>
                </div>
            </div>

            {/* Add custom animation */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }
                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </section>
    );
}