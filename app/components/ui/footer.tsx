import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPinHouse,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="inline  text-[#FF8C42]" />,
      url: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: <Instagram className="inline  text-[#FF8C42]" />,
      url: "https://instagram.com",
    },
    {
      name: "Twitter",
      icon: <Twitter className="inline  text-[#FF8C42]" />,
      url: "https://twitter.com",
    },
    {
      name: "LinkedIn",
      icon: <MapPinHouse className="inline  text-[#FF8C42]" />,
      url: "https://linkedin.com",
    },
    {
      name: "YouTube",
      icon: <Mail className="inline  text-[#FF8C42]" />,
      url: "https://youtube.com",
    },
  ];

  const footerLinks = [
    { title: "Produk", items: ["Features", "Pricing", "FAQ", "Blog"] },
    { title: "Perusahaan", items: ["About", "Careers", "Press", "Partners"] },
    {
      title: "Sumber Daya",
      items: ["Documentation", "API", "Support", "Community"],
    },
    {
      title: "Legal",
      items: [
        "Privacy Policy",
        "Terms of Service",
        "Cookie Policy",
        "Disclaimer",
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#2D1C0F] to-[#1a0f07] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-[#f87108]/30 px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-6">
            <img
              src="/assets/jamu-logo.png"
              alt="Newsletter"
              className="object-cover mx-auto mb-4 h-20"
            />
            <h2 className="text-3xl font-bold mb-2">Berlangganan dengan Kami</h2>
            <p className="text-gray-300">
              Dapatkan berita terbaru tentang produk Jamu kami disini!
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-[#3B2A1A] border border-[#f87108]/50 focus:border-[#f87108] focus:outline-none text-white placeholder-gray-400 transition"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#f87108] to-[#ff9d4a] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f87108]/50 transition-all duration-300"
            >
              {subscribed ? "✓ Diikuti!" : "Ikuti"}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Brand Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/assets/jamu-logo.png"
                alt="Jamu Logo"
                className="h-15 mr-3"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Jamu adalah minuman tradisional Indonesia yang terbuat dari
              bahan-bahan alami seperti rempah-rempah, akar, dan daun.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3B2A1A] border border-[#f87108]/30 hover:border-[#f87108] hover:bg-[#f87108]/20 transition-all duration-300 text-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <span className="w-1 h-1 bg-[#f87108] rounded-full mr-2"></span>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 text-sm hover:text-[#f87108] transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#f87108]/30 my-8"></div>

        {/* Contact Info & Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start">
            <Phone className="text-[#f87108] mr-3 w-5 h-5" />
            <div>
              <p className="text-gray-400 text-sm">Telepon Kami</p>
              <p className="font-semibold">(021) 456-7890</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPinHouse className="text-[#f87108] mr-3 w-5 h-5" />
            <div>
              <p className="text-gray-400 text-sm">Alamat Kami</p>
              <p className="font-semibold">Jln. Jamu 123, Banten, Indonesia</p>
            </div>
          </div>
          <div className="flex items-start">
            <Mail className="text-[#f87108] mr-3 w-5 h-5" />
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="font-semibold">Jamu@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#f87108]/30 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Jamu!. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Dibuat Oleh <span className="text-[#f87108]">Nexora</span> untuk
            kesehatan dan kenyamananmu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
