import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, MessageCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1D120C] text-[#E5D7CC] pt-16 pb-12 border-t border-[#382317]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B5A2B] flex items-center justify-center text-white shadow-sm">
                <Coffee className="w-5 h-5 text-[#FAF7F2]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                BrewBean <span className="text-[#D4A373] italic font-normal">Café</span>
              </span>
            </Link>
            <p className="text-sm text-[#BDB0A4] leading-relaxed">
              "Fresh Coffee. Good Food. Better Moments."
            </p>
            <p className="text-xs text-[#9E8E81] leading-relaxed">
              Your neighbourhood artisanal café in Sector 62, Noida. Handcrafted single-origin coffee, stone-baked pizzas, freshly baked desserts, and an inspiring work-friendly environment with free high-speed Wi-Fi.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2E1E15] hover:bg-[#8B5A2B] text-[#D4A373] hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2E1E15] hover:bg-[#8B5A2B] text-[#D4A373] hover:text-white flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2E1E15] hover:bg-[#8B5A2B] text-[#D4A373] hover:text-white flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876542180"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2E1E15] hover:bg-[#8B5A2B] text-[#D4A373] hover:text-white flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider font-sans mb-4 border-b border-[#382317] pb-2">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#D4A373] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#D4A373] transition-colors">
                  Artisanal Menu
                </Link>
              </li>
              <li>
                <Link to="/book-table" className="hover:text-[#D4A373] transition-colors">
                  Book a Table
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D4A373] transition-colors">
                  Our Story & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D4A373] transition-colors">
                  Location & Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#D4A373] transition-colors">
                  Online Order Cart
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-[#D4A373]/80 hover:text-[#D4A373] transition-colors font-medium">
                  Staff / Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider font-sans mb-4 border-b border-[#382317] pb-2">
              Favorites
            </h3>
            <ul className="space-y-2.5 text-sm text-[#BDB0A4]">
              <li>
                <Link to="/menu?category=Coffee" className="hover:text-[#D4A373] transition-colors">
                  Hazelnut & Cold Coffee
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Breakfast" className="hover:text-[#D4A373] transition-colors">
                  English Breakfast & Pancakes
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Pizza" className="hover:text-[#D4A373] transition-colors">
                  Wood-fired Margherita & Tikka Pizza
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Pasta" className="hover:text-[#D4A373] transition-colors">
                  Creamy Alfredo & Fiery Arrabbiata
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Burgers" className="hover:text-[#D4A373] transition-colors">
                  Crispy Chicken & Veg Burgers
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Desserts" className="hover:text-[#D4A373] transition-colors">
                  Belgian Chocolate Truffle Cake
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Hours & Contact */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider font-sans mb-4 border-b border-[#382317] pb-2">
              Café Details
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-1" />
                <span className="text-[#BDB0A4]">
                  Sector 62, Noida, Uttar Pradesh 201309, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span className="text-[#BDB0A4]">
                  Mon - Sun: 8:00 AM - 11:00 PM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href="tel:+919876542180" className="text-[#BDB0A4] hover:text-white transition-colors">
                  +91 98765 42180
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href="mailto:hello@brewbeancafe.in" className="text-[#BDB0A4] hover:text-white transition-colors">
                  hello@brewbeancafe.in
                </a>
              </li>
              <li className="pt-2 text-xs text-[#9E8E81]">
                Average spend: <span className="text-[#D4A373] font-semibold">₹150 - ₹500</span> per person
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#332015] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F7F73]">
          <p>© {new Date().getFullYear()} BrewBean Café. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#D4A373] fill-[#D4A373]" />
            <span>for coffee lovers in Noida, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
