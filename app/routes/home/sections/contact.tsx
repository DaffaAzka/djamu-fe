import React, { useState } from 'react';

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
      icon: '📞',
      title: 'Phone',
      content: '(123) 456-7890',
      description: 'Mon - Fri, 9AM - 6PM',
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'info@jamu.com',
      description: 'We reply within 24 hours',
    },
    {
      icon: '📍',
      title: 'Address',
      content: '123 Jamu Street',
      description: 'City, Country 12345',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about our traditional Jamu products? We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.
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
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Send us a Message</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg">
                <p className="text-green-700 font-semibold flex items-center">
                  <span className="text-xl mr-2">✓</span>
                  Thank you! We'll be in touch soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white text-sm font-semibold mb-2">
                    Full Name *
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
                    Email Address *
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
                    Phone Number
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
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#f87108] focus:bg-white/5 transition"
                  >
                    <option value="" className="bg-[#2D1C0F]">
                      Select a subject
                    </option>
                    <option value="product" className="bg-[#2D1C0F]">
                      Product Inquiry
                    </option>
                    <option value="order" className="bg-[#2D1C0F]">
                      Order Support
                    </option>
                    <option value="feedback" className="bg-[#2D1C0F]">
                      Feedback
                    </option>
                    <option value="partnership" className="bg-[#2D1C0F]">
                      Partnership
                    </option>
                    <option value="other" className="bg-[#2D1C0F]">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-white text-sm font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#f87108] focus:bg-white/5 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#f87108] to-[#ff9d4a] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f87108]/50 disabled:opacity-50 transition-all duration-300"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#2D1C0F] mb-4">
                We're Here to Help
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Whether you have questions about our products, need assistance with an order, or want to discuss a partnership opportunity, our team is ready to assist you.
              </p>
            </div>

            {/* Business Hours */}
            <div className="bg-[#FFF5F0] p-6 rounded-xl border-l-4 border-[#f87108]">
              <h4 className="text-lg font-bold text-[#2D1C0F] mb-3">Business Hours</h4>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM
                </p>
                <p>
                  <span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM
                </p>
                <p>
                  <span className="font-semibold">Sunday:</span> Closed
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-[#FFF5F0] p-6 rounded-xl border-l-4 border-[#f87108]">
              <h4 className="text-lg font-bold text-[#2D1C0F] mb-3">Response Time</h4>
              <p className="text-gray-700">
                We typically respond to all inquiries within <span className="font-semibold">24 hours</span>. For urgent matters, please call us directly.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-bold text-[#2D1C0F] mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: '📘', name: 'Facebook', url: 'https://facebook.com' },
                  { icon: '📷', name: 'Instagram', url: 'https://instagram.com' },
                  { icon: '𝕏', name: 'Twitter', url: 'https://twitter.com' },
                  { icon: '💬', name: 'WhatsApp', url: 'https://wa.me/1234567890' },
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
