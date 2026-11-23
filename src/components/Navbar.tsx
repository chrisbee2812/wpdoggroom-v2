import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Phone, Droplets, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryLinks = [
    { name: 'Home', path: '/' },
    { name: 'Spa & Pricing', path: '/pricing' },
    { name: 'Canine Fertility', path: '/fertility' }
  ];

  const studioInfoLinks = [
    { name: 'Transformations Gallery', path: '/gallery', desc: 'Interactive before & after coat results' },
    { name: 'Frequently Asked Questions', path: '/faq', desc: 'Spa, fertility & ultrasound guides' },
    { name: 'Policies & Terms', path: '/terms', desc: 'Product safety, hygiene & booking terms' }
  ];

  const isStudioInfoActive = ['/gallery', '/faq', '/terms'].includes(location.pathname);

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#152438] text-stone-200 text-xs py-2 px-4 border-b border-[#243a57]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="font-medium text-[11px] sm:text-xs text-stone-200 truncate">
            West Park, Leeds · Dedicated Garden Studio · Dog Spa & Canine Fertility
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-stone-300 shrink-0">
            <span>Coat Care & Fertility Diagnostics</span>
            <span aria-hidden="true">·</span>
            <a href="tel:01133208492" className="hover:text-white flex items-center gap-1 font-semibold text-[#efe0cd] whitespace-nowrap">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          {/* Brand Zone */}
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-15 h-15 rounded-xl bg-[#8096bb] text-white flex items-center justify-center group-hover:bg-[#6e84aa] transition-colors">
              {/* <Droplets className="w-5 h-5 text-white" /> */}
              <img
                  src="/colour-bassett-small-on-beige.webp"
                  alt="Happy pampering dog enjoying bath at West Park Luxury Dog Spa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
            </div>
            <div>
              <span className="font-serif-title text-xl font-bold tracking-tight text-[#af8967] block leading-tight">
                West Park
              </span>
              <span className="text-xl tracking-tight uppercase font-semibold text-[#152438] block">
                Dog Spa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {primaryLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#8096bb] text-white shadow-2xs font-semibold'
                      : 'text-[#2b2520] hover:text-[#13253b] hover:bg-[#8096bb]/20'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Studio Info Dropdown (Transformations, FAQ, Policies) */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen(prev => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={`text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-1 ${
                  isStudioInfoActive
                    ? 'bg-[#8096bb] text-white shadow-2xs font-semibold'
                    : 'text-[#2b2520] hover:text-[#13253b] hover:bg-[#8096bb]/20'
                }`}
              >
                <span>Studio Info</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-[#efe0cd] rounded-2xl border border-[#af8967]/35 shadow-xl p-2 space-y-1">
                    {studioInfoLinks.map(item => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setDropdownOpen(false)}
                        className={({ isActive }) =>
                          `block px-3.5 py-2.5 rounded-xl transition-colors ${
                            isActive
                              ? 'bg-[#8096bb] text-white'
                              : 'text-[#13253b] hover:bg-[#8096bb]/20'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <div className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#13253b]'}`}>
                              {item.name}
                            </div>
                            <div className={`text-[11px] mt-0.5 ${isActive ? 'text-white/85' : 'text-[#2b2520]/80'}`}>
                              {item.desc}
                            </div>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#8096bb] text-white shadow-2xs font-semibold'
                    : 'text-[#2b2520] hover:text-[#13253b] hover:bg-[#8096bb]/20'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-[#8096bb] hover:bg-[#6e84aa] text-white text-xs lg:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border border-white/30 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
              <span>Book Consultation</span>
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
            {primaryLinks.map(link => (
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

            {/* Grouped Studio Info Links in Mobile */}
            <div className="pt-2 pb-1 border-t border-[#af8967]/20">
              <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#af8967]">
                Studio Info
              </div>
              {studioInfoLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#8096bb] text-white font-semibold'
                        : 'text-[#2b2520] hover:bg-[#8096bb]/20'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-xl text-base font-serif-title font-medium transition-colors ${
                  isActive
                    ? 'bg-[#8096bb] text-white'
                    : 'text-[#2b2520] hover:bg-[#8096bb]/20'
                }`
              }
            >
              Contact & Inquiry
            </NavLink>

            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center block rounded-xl bg-[#8096bb] text-white font-semibold text-sm shadow-xs cursor-pointer"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};