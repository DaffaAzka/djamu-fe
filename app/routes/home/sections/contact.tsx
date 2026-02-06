import React, { useState } from 'react';
import { Phone, Mail, MapPinHouse, Facebook, Instagram, Twitter,} from 'lucide-react';
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Phone className="inline mr-2 text-[#FF8C42]"/>,
      title: 'Telepon',
      content: '(021) 456-7890',
      description: 'Senin - Jumat, 9.00 - 18.00 WIB',
    },
    {
      icon: <Mail className="inline mr-2 text-[#FF8C42]"/>,
      title: 'Email',
      content: 'Jamu!@Gmail.com',
      description: 'Kami biasanya merespons dalam 24 jam',
    },
    {
      icon: <MapPinHouse className="inline mr-2 text-[#FF8C42]"/>,
      title: 'Alamat',
      content: 'Jl. Jamu Sehat No.123, Tangerang',
      description: 'Indonesia, Banten 15510',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 ">Terhubung <span className="text-[#FF8C42]">Dengan Kami</span></h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Punya pertanyaan atau butuh bantuan? Tim dukungan kami siap membantu Anda dengan segala kebutuhan terkait produk Jamu kami.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#FFF5F0] to-[#FFF0E6] p-8 rounded-xl border border-[#f87108]/20 hover:border-[#f87108]/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-5xl mb-4">{info.icon}</div>
              <h3 className="text-xl font-bold text-[#2D1C0F] mb-2">{info.title}</h3>
              <p className="text-[#f87108] font-semibold mb-1">{info.content}</p>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <div className="bg-[#2D1C0F] p-8 md:p-12 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Kirim Pesan Kepada Kami</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg">
                <p className="text-green-700 font-semibold flex items-center">
                  <span className="text-xl mr-2">✓</span>
                  Terima kasih! Kami akan segera menghubungi Anda.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white text-sm font-semibold mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#f87108] focus:bg-white/5 transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#f87108] focus:bg-white/5 transition"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-white text-sm font-semibold mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#f87108] focus:bg-white/5 transition"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-white text-sm font-semibold mb-2">
                    Subjek *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#f87108] focus:bg-white/5 transition"
                  >
                    <option value="subjek" className="bg-[#2D1C0F]">
                      Pilih Subjek
                    </option>
                    <option value="produk" className="bg-[#2D1C0F]">
                      Produk Inquiry
                    </option>
                    <option value="pesanan" className="bg-[#2D1C0F]">
                      Bantuan Pesanan
                    </option>
                    <option value="umpanbalik" className="bg-[#2D1C0F]">
                        Umpan Balik
                    </option>
                    <option value="mitra" className="bg-[#2D1C0F]">
                        Kesempatan Kemitraan
                    </option>
                    <option value="lainnya" className="bg-[#2D1C0F]">
                      Lainnya
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="pesan" className="block text-white text-sm font-semibold mb-2">
                  Pesan *
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#f87108] focus:bg-white/5 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#f87108] to-[#ff9d4a] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f87108]/50 disabled:opacity-50 transition-all duration-300"
              >
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#2D1C0F] mb-4">
               Kami Disini Untuk Membantu Anda
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Apakah Anda memiliki pertanyaan tentang produk Jamu kami, butuh bantuan dengan pesanan Anda, atau ingin memberikan umpan balik? Jangan ragu untuk menghubungi kami melalui formulir di sebelah kiri atau menggunakan informasi kontak di bawah ini. Tim dukungan pelanggan kami berdedikasi untuk memberikan layanan terbaik dan memastikan pengalaman Anda dengan Jamu kami menyenangkan dan memuaskan.
              </p>
            </div>

            {/* Business Hours */}
            <div className="bg-[#FFF5F0] p-6 rounded-xl border-l-4 border-[#f87108]">
              <h4 className="text-lg font-bold text-[#2D1C0F] mb-3">Waktu Operasional</h4>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Senin - Jumat:</span> 9:00 - 6:00 WIB
                </p>
                <p>
                  <span className="font-semibold">Sabtu:</span> 10:00 - 4:00 WIB
                </p>
                <p>
                  <span className="font-semibold">Minggu:</span> Tutup
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-[#FFF5F0] p-6 rounded-xl border-l-4 border-[#f87108]">
              <h4 className="text-lg font-bold text-[#2D1C0F] mb-3">Waktu Respon</h4>
              <p className="text-gray-700">
                Kami biasanya merespons semua pertanyaan dalam waktu <span className="font-semibold">24 jam</span>. Untuk masalah mendesak, silakan hubungi kami secara langsung.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-bold text-[#2D1C0F] mb-4">Terhubung dengan Kami</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <Facebook className="inline  text-[#FF8C42]"/>, name: 'Facebook', url: 'https://facebook.com' },
                  { icon: <Instagram className="inline text-[#FF8C42]"/>, name: 'Instagram', url: 'https://instagram.com' },
                  { icon: <Twitter className="inline  text-[#FF8C42]"/>, name: 'Twitter', url: 'https://twitter.com' },
                  { icon: <Phone className="inline  text-[#FF8C42]"/>, name: 'WhatsApp', url: 'https://wa.me/1234567890' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f87108]/10 border border-[#f87108]/30 hover:bg-[#f87108] hover:text-white text-2xl transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
