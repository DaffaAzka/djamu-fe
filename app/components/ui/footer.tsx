import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2D1C0F] text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <img src="/path/to/jamu-logo.png" alt="Jamu Logo" className="h-12 mr-4" />
          <div>
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p>Call: (123) 456-7890</p>
            <p>Address: 123 Jamu St, City, Country</p>
            <p>Email: info@jamu.com</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
          <h2 className="text-lg font-bold mr-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f87108]">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f87108]">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f87108]">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f87108]">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f87108]">YouTube</a>
          </div>
        </div>
      </div>
      <div className="bg-[#3B2A1A] py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} Jamu. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="/privacy-policy" className="hover:text-[#f87108]">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-[#f87108]">Terms of Service</a>
            <a href="/faq" className="hover:text-[#f87108]">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;