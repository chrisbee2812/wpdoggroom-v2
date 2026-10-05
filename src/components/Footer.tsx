import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Phone, Mail, MapPin, Shield, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#192D21] text-stone-300 pt-16 pb-12 border-t border-[#2A4736]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-20 h-20 md:w-30 md:h-30 flex items-center justify-center">
                <img
                  src="/wpds-logo-sm-lbg.png"
                  alt="Pampered dog enjoying specialist bathing treatment"
                  className="w-full h-full object-cover rounded-lg"
                  loading="eager"
                />
              </div>
              {/* <div>
                <span className="font-serif-title text-xl font-bold tracking-tight text-white block">
                  West Park
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-400 block">
                  Dog Spa
                </span>
              </div> */}
            </Link>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans max-w-md">
              A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We specialise in short-haired breeds, professional bathing, deshedding and specialist skin & coat care, alongside luxury spa treatments using carefully selected professional products.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-[11px] text-stone-300 border border-stone-700">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Garden Studio Sanctuary
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-[11px] text-stone-300 border border-stone-700">
                <Shield className="w-3 h-3 text-emerald-400" />
                Product Safety Pledged
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-[11px] text-stone-300 border border-stone-700">
                <Award className="w-3 h-3 text-amber-400" />
                Short-Coat Specialists
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-serif-title font-bold text-white text-sm tracking-wide uppercase">
              Explore Pages
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  Spa Transformations Gallery
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Bathing & Spa Packages
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Spa Policies & Guidelines
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Consultation & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Studio Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="font-serif-title font-bold text-white text-sm tracking-wide uppercase">
              Dedicated Garden Studio
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dedicated Garden Studio, West Park, Leeds LS16 (Private Residential Setting)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:01133208492" className="hover:text-white font-medium">
                  0113 320 8492
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:hello@westparkdogspa.co.uk" className="hover:text-white">
                  hello@westparkdogspa.co.uk
                </a>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-stone-400 bg-stone-900/60 p-3 rounded-xl border border-stone-800 space-y-1">
              <span className="text-stone-300 font-semibold block">Good to Know:</span>
              <p>We specialise in bathing, coat care and spa treatments rather than clipping or breed styling. All appointments are 1-on-1 private sessions.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} West Park Dog Spa. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/pricing" className="hover:text-stone-300">
              Spa Menu
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-stone-300">
              Product Safety & Terms
            </Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-stone-300">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
