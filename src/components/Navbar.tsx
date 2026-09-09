import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Scissors, Menu, X, Phone, Sparkles } from 'lucide-react';

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
    { name: 'Pricing Packages', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Terms & Policies', path: '/terms' },
    { name: 'Contact & Inquiry', path: '/contact' }
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#1F372A] text-stone-200 text-xs py-2 px-4 border-b border-[#2A4736]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-[11px] sm:text-xs">
              West Park, Leeds • 1-on-1 Gentle Grooming Consultations Open
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-stone-300">
            <span>Hours: Mon–Sat 8:30 am – 5:00 pm</span>
            <span>•</span>
            <a href="tel:01133208492" className="hover:text-white flex items-center gap-1 font-semibold">
              <Phone className="w-3 h-3" /> 0113 320 8492
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-3'
            : 'bg-[#FAF8F5] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#2A4736] text-white flex items-center justify-center shadow-xs group-hover:bg-[#1f3629] transition-colors">
              <Scissors className="w-5 h-5 text-stone-100" />
            </div>
            <div>
              <span className="font-serif-title text-lg sm:text-xl font-bold tracking-tight text-stone-900 block leading-tight">
                West Park
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#2A4736] block">
                Dog Grooming
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
                      ? 'bg-[#2A4736] text-white shadow-2xs font-semibold'
                      : 'text-stone-700 hover:text-[#2A4736] hover:bg-stone-100'
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
              className="px-5 py-2.5 rounded-full bg-[#2A4736] hover:bg-[#1a3325] text-white text-xs lg:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Book an Inquiry
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-base font-serif-title font-medium transition-colors ${
                    isActive
                      ? 'bg-[#2A4736] text-white'
                      : 'text-stone-800 hover:bg-stone-100'
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
                className="w-full py-3 text-center block rounded-xl bg-[#2A4736] text-white font-semibold text-sm shadow-xs cursor-pointer"
              >
                Send Styling Inquiry
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
