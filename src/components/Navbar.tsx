import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sparkles, Menu, X, Phone, Droplets } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Transformations', path: '/gallery' },
    { name: 'Spa Packages & Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Spa Policies', path: '/terms' },
    { name: 'Contact & Inquiry', path: '/contact' }
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#152438] text-stone-200 text-xs py-2 px-4 border-b border-[#243a57]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#af8967] animate-pulse" />
            <span className="font-medium text-[11px] sm:text-xs text-stone-200">
              West Park, Leeds • Dedicated Garden Studio • Specialist Bathing & Spa Treatments
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-stone-300">
            <span>Coat & Skin Specialists • Therapeutic Bath & Blow-Out</span>
            <span>•</span>
            <a href="tel:01133208492" className="hover:text-white flex items-center gap-1 font-semibold text-[#efe0cd]">
              <Phone className="w-3 h-3 text-[#af8967]" /> 0113 320 8492
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#efe0cd]/95 backdrop-blur-md shadow-sm border-b border-[#af8967]/20 py-3'
            : 'bg-[#efe0cd] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-15 h-15 rounded-xl bg-[#8096bb] text-white flex items-center justify-center shadow-xs group-hover:bg-[#6e84aa] transition-colors">
              {/* <Droplets className="w-5 h-5 text-white" /> */}
              <img
                  src="/colour-bassett-small.webp"
                  alt="Happy pampering dog enjoying bath at West Park Luxury Dog Spa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-xl object-cover object-center"
                />
            </div>
            <div>
              <span className="font-serif-title text-xl sm:text-3xl font-bold tracking-tight text-[#af8967] block leading-tight">
                West Park
              </span>
              <span className="text-[14px] tracking-widest uppercase font-semibold text-[#152438] block">
                Luxury Dog Spa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8096bb] text-white shadow-2xs font-semibold'
                      : 'text-[#2b2520] hover:text-[#13253b] hover:bg-[#8096bb]/20'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-[#8096bb] hover:bg-[#6e84aa] text-white text-xs lg:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border border-white/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              Book Spa Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#2b2520] hover:bg-[#8096bb]/20 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#efe0cd] border-b border-[#af8967]/30 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-base font-serif-title font-medium transition-colors ${
                    isActive
                      ? 'bg-[#8096bb] text-white'
                      : 'text-[#2b2520] hover:bg-[#8096bb]/20'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center block rounded-xl bg-[#8096bb] text-white font-semibold text-sm shadow-xs cursor-pointer"
              >
                Book Spa Consultation
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
