import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Coffee, ShoppingBag, Calendar, User as UserIcon, Menu, X, Shield, Phone, Clock, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAdmin, logout, openAuthModal } = useAuth();
  const { totalCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Book a Table', path: '/book-table' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#21120B] text-[#E0D3C9] text-xs py-2 px-4 border-b border-[#3D261B]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#D4A373]">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon-Sun: 8:00 AM - 11:00 PM</span>
            </span>
            <span className="hidden sm:inline-block text-[#5C4538]">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <span>Sector 62, Noida</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+919876542180"
              className="hover:text-[#D4A373] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>+91 98765 42180</span>
            </a>
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-[#D4A373] text-[#21120B] font-bold px-2 py-0.5 rounded-full text-[11px] flex items-center gap-1 hover:bg-[#E5B586] transition-colors"
              >
                <Shield className="w-3 h-3" /> Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD8] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#8B5A2B] to-[#4A2E1B] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Coffee className="w-6 h-6 text-[#F6E8DC]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-black tracking-tight text-[#2C1810]">
                  BrewBean <span className="text-[#8B5A2B] italic font-normal">Café</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7A70]">
                  Artisanal Coffee & Bakery • Noida
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive(link.path)
                      ? 'bg-[#EFE9E1] text-[#2C1810] shadow-xs'
                      : 'text-[#5C4D44] hover:text-[#2C1810] hover:bg-[#F4EFEA]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions: Cart, Book table CTA, User Account */}
            <div className="flex items-center gap-3">
              {/* Quick Table Reserve CTA button */}
              <Link
                to="/book-table"
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#8B5A2B] border border-[#8B5A2B]/40 hover:border-[#8B5A2B] hover:bg-[#8B5A2B]/5 rounded-xl transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve</span>
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl text-[#2C1810] bg-[#EFE9E1] hover:bg-[#E4DBD0] transition-colors flex items-center justify-center"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#2C1810]" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#8B5A2B] text-white text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center shadow-xs animate-scale-in">
                    {totalCount}
                  </span>
                )}
              </Link>

              {/* User Account / Login */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white border border-[#DDD3C9] text-xs font-semibold text-[#2C1810] hover:bg-[#F4EFEA] transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[90px] truncate hidden sm:inline">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#8C7A70]" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E8DFD8] py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-[#F0EAE4]">
                        <p className="text-xs font-bold text-[#2C1810]">{user.name}</p>
                        <p className="text-[11px] text-[#7D6E66] truncate">{user.email}</p>
                        {isAdmin && (
                          <span className="mt-1 inline-block text-[10px] uppercase tracking-wider font-extrabold bg-[#F3E8DC] text-[#8B5A2B] px-2 py-0.5 rounded-full">
                            Admin Access
                          </span>
                        )}
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#2C1810] hover:bg-[#FAF7F2] font-semibold"
                        >
                          <Shield className="w-4 h-4 text-[#8B5A2B]" />
                          Admin Dashboard
                        </Link>
                      )}

                      <Link
                        to="/cart"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#2C1810] hover:bg-[#FAF7F2]"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#7D6E66]" />
                        My Cart ({totalCount})
                      </Link>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-700 hover:bg-rose-50 border-t border-[#F0EAE4] mt-1 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2C1810] text-[#FAF7F2] text-xs font-bold hover:bg-[#432619] transition-all shadow-xs"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-[#2C1810] hover:bg-[#EFE9E1]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8DFD8] px-4 pt-2 pb-6 space-y-2 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold ${
                  isActive(link.path)
                    ? 'bg-[#EFE9E1] text-[#2C1810]'
                    : 'text-[#5C4D44] hover:bg-[#F4EFEA]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-[#8B5A2B] bg-[#F4EFEA]"
              >
                Admin Dashboard
              </Link>
            )}
            <div className="pt-2 border-t border-[#E8DFD8] flex items-center justify-between">
              <span className="text-xs text-[#7D6E66]">Open daily 8:00 AM - 11:00 PM</span>
              <a
                href="tel:+919876542180"
                className="text-xs font-bold text-[#8B5A2B] flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" /> Call Cafe
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
