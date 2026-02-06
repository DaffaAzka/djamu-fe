import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Sparkles, Leaf, Droplet, HeartPlus } from "lucide-react";

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: Leaf, title: "100% Asli", desc: "Bahan herbal asli" },
    {
      icon: Droplet,
      title: "Resep Asli",
      desc: "Formula tradisional",
    },
    { icon: HeartPlus, title: "Peningkatan Kesehatan", desc: "Manfaat kesejahteraan" },
  ];

  return (
    <section className="relative w-screen h-[90vh] md:-mx-8 lg:mx-0 overflow-hidden mt-15">
      <div className="relative overflow-hidden shadow-2xl group">
        <img
          src="./assets/jamu-assets4.jpg"
          alt="Features Image"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70"></div>

        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Content */}
        <div
          className={`h-[90vh] absolute inset-0 flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full backdrop-blur">
            <Sparkles className="w-4 h-4 text-[#f87108] animate-spin" />
            <span className="text-sm text-white font-semibold">
              Jelajahi Keajaiban Jamu
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Kenapa Pilih <span className="text-[#f87108]">Jamu?</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl drop-shadow leading-relaxed">
            Jamu adalah ramuan tradisional Indonesia yang telah digunakan selama
            berabad-abad untuk mempromosikan kesehatan dan kesejahteraan. Dibuat
            dari bahan alami seperti akar, daun, bunga, dan rempah-rempah, Jamu
            menawarkan pendekatan holistik terhadap penyembuhan dan pencegahan
            penyakit.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-2xl">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur border border-orange-500/30 rounded-lg p-4 transform hover:scale-110 hover:bg-orange-500/20 hover:border-orange-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <feature.icon className="w-6 h-6 text-[#f87108] mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="inline-flex items-center px-8 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm hover:from-green-700 hover:to-green-800"
          >
           Pelajari Lebih Lanjut
            <Sparkles className="w-5 h-5 ms-2" />
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
