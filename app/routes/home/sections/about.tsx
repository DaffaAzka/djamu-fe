import {useState} from "react";
import {Link} from "react-router";

export default function AboutSection() {
    const [activeTab, setActiveTab] = useState("mission");

    const testimonials = [
        { name: "Siti Rahman", role: "Penggiat Kesehatan", text: "Jamu mengubah hidup saya sepenuhnya!, saya merasa menjadi lebih berenergi dan lebih sehat dari sebelumnya!", rating: 5 },
        { name: "Budi Santoso", role: "Gym Coach", text: "Kualitas dan Rasanya sangat tidak tertandingi. Sangat rekomen!", rating: 5 },
        { name: "Dewi Lestari", role: "Instruktur Yoga", text: "Minuman yang sangat cocok untuk membuat diriku menjadi lebih sehat!", rating: 5 }
    ];

    const timeline = [
        { year: "1900", event: "Jamu mulai diproduksi sebagai minuman yang dijual Djamoe" },
        { year: "1980", event: "Komersial pertama yang menjual Jamu" },
        { year: "2010", event: "Menjual ke penjuru international" },
        { year: "2026", event: "Dapat dijangkau hanya dengan mengunjungi Website Jamu!" }
    ];

    return (
        <section className="relative w-full bg-gradient-to-b from-white to-orange-50 py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero Section with Cube Image and Description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Side - Cube Image */}
                    <div className="flex justify-center">
                        <div className="relative w-80 h-80 perspective">
                            <div className="w-full h-full relative" style={{
                                transformStyle: 'preserve-3d',
                                transform: 'rotateX(10deg) rotateY(-20deg)'
                            }}>
                                {/* Cube effect with shadows */}
                                <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-[#f87108]">
                                    <img
                                        src="./assets/jamu-hero.jpg"
                                        alt="About Jamu"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Cube depth effect */}
                                <div className="absolute -bottom-2 -right-2 w-80 h-80 bg-[#f87108]/20 rounded-2xl"></div>
                                <div className="absolute -bottom-4 -right-4 w-80 h-80 bg-[#f87108]/10 rounded-2xl"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Description */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
                            Tentang <span className="text-[#f87108]">Jamu</span> 
                        </h2>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Jamu adalah ramuan tradisional Indonesia yang telah digunakan selama berabad-abad untuk mempromosikan kesehatan dan kesejahteraan. Dibuat dari bahan alami seperti akar, daun, bunga, dan rempah-rempah, Jamu menawarkan pendekatan holistik terhadap penyembuhan dan pencegahan penyakit.
                        </p>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            komitmen kami adalah untuk melestarikan warisan budaya yang kaya ini sambil menyediakan produk Jamu berkualitas tinggi yang sesuai dengan gaya hidup modern.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center px-8 py-4 bg-[#f87108] text-white font-bold font-poppins rounded-lg hover:bg-orange-600 transition shadow-lg"
                        >
                            Jelajahi Produk kami →
                        </Link>
                    </div>
                </div>

                {/* Mission & Vision Tabs */}
                <div className="mb-16">
                    <div className="flex gap-4 mb-8 border-b-2 border-gray-200 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("mission")}
                            className={`px-6 py-3 font-semibold font-poppins transition whitespace-nowrap ${
                                activeTab === "mission"
                                    ? "text-white bg-[#f87108] rounded-t-lg"
                                    : "text-gray-600 hover:text-[#f87108]"
                            }`}
                        >
                            Misi Kami
                        </button>
                        <button
                            onClick={() => setActiveTab("vision")}
                            className={`px-6 py-3 font-semibold font-poppins transition whitespace-nowrap ${
                                activeTab === "vision"
                                    ? "text-white bg-[#f87108] rounded-t-lg"
                                    : "text-gray-600 hover:text-[#f87108]"
                            }`}
                        >
                            Visi Kami
                        </button>
                        <button
                            onClick={() => setActiveTab("values")}
                            className={`px-6 py-3 font-semibold font-poppins transition whitespace-nowrap ${
                                activeTab === "values"
                                    ? "text-white bg-[#f87108] rounded-t-lg"
                                    : "text-gray-600 hover:text-[#f87108]"
                            }`}
                        >
                            Keunggulan Kami
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-[#f87108]">
                        {activeTab === "mission" && (
                            <div className="animate-fadeIn">
                                <h3 className="text-2xl font-bold font-poppins text-[#f87108] mb-4">Misi Kami</h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Misi kami adalah melestarikan warisan budaya yang kaya ini sambil menyediakan produk Jamu berkualitas tinggi yang sesuai dengan gaya hidup modern. Kami berkomitmen untuk membawa manfaat dari obat herbal tradisional Indonesia kepada orang-orang di seluruh dunia, mempromosikan penyembuhan alami dan kesejahteraan bagi semua.
                                </p>
                            </div>
                        )}
                        {activeTab === "vision" && (
                            <div className="animate-fadeIn">
                                <h3 className="text-2xl font-bold font-poppins text-[#f87108] mb-4">Visi Kami</h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Visi kami adalah menjadi pemimpin dunia dalam obat herbal tradisional, dikenal karena keaslian, kualitas, dan komitmen kami terhadap keberlanjutan. Kami bertujuan untuk menciptakan komunitas global yang menghargai dan memanfaatkan kekuatan penyembuhan alami Jamu, sambil mendukung petani lokal dan praktik ramah lingkungan.
                                </p>
                            </div>
                        )}
                        {activeTab === "values" && (
                            <div className="animate-fadeIn">
                                <h3 className="text-2xl font-bold font-poppins text-[#f87108] mb-4">Keunggulan Kami</h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Kami menawarkan produk Jamu berkualitas tinggi yang dibuat dari bahan alami 100%. Setiap produk kami dirancang untuk memberikan manfaat kesehatan alami tanpa efek samping berbahaya. Kami juga berkomitmen terhadap keberlanjutan lingkungan dan mendukung petani lokal dalam memproduksi bahan baku berkualitas tinggi.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Journey Timeline */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold font-poppins text-center text-[#f87108] mb-12">
                        <span className="text-gray-800">Perjalanan</span> Kami
                    </h3>
                    <div className="relative">
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#f87108] to-orange-300"></div>
                        <div className="space-y-8">
                            {timeline.map((item, index) => (
                                <div key={index} className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className="w-full md:w-1/2 md:px-8">
                                        <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-[#f87108] ${index % 2 === 1 ? 'md:border-l-0 md:border-r-4 md:border-r-[#f87108]' : ''}`}>
                                            <h4 className="text-2xl font-bold font-poppins text-[#f87108] mb-2">{item.year}</h4>
                                            <p className="text-gray-700">{item.event}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex w-full md:w-1/2 justify-center items-start pt-6">
                                        <div className="w-4 h-4 bg-[#f87108] rounded-full border-4 border-white shadow-lg"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Customer Testimonials */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold font-poppins text-center text-gray-800 mb-12">
                        Apa Kata <span className="text-[#f87108]">Pelanggan Kami</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl border-t-4 border-t-[#f87108] transition">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-[#f87108] text-xl">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                                <div className="border-t-2 border-gray-200 pt-4">
                                    <p className="font-bold font-poppins text-gray-800">{testimonial.name}</p>
                                    <p className="text-sm text-[#f87108]">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-gradient-to-r from-[#f87108] to-orange-500 rounded-lg p-12 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
                        <div>
                            <h4 className="text-4xl font-bold font-poppins mb-2">50K+</h4>
                            <p className="text-lg">Pelanggan Senang</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold font-poppins mb-2">20+</h4>
                            <p className="text-lg">Tipe Produk</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold font-poppins mb-2">15+</h4>
                            <p className="text-lg">Negara yang sudah dilayani</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold font-poppins mb-2">100%</h4>
                            <p className="text-lg">Bahan Alami</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-white border-2 border-[#f87108] rounded-lg p-12 text-center">
                    <h3 className="text-3xl font-bold font-poppins text-[#8B5A3C] mb-4">Rasakan sensasi jamu dengan rasa yang enak dan juga sehat</h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Bergabung kedalam komunitas kami yang berkembang dan rasakan manfaat dari Jamu tradisional hari ini. Apakah Anda siap memulai perjalanan menuju kesehatan alami dan kesejahteraan?
                    </p>
                    <Link
                        to="/about"
                        className="inline-flex items-center px-8 py-4 bg-[#f87108] text-white font-bold font-poppins rounded-lg hover:bg-orange-600 transition shadow-lg"
                    >
                        Mulai Hidup Sehatmu →
                    </Link>
                </div>
            </div>
        </section>
    );
}