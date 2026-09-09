import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Phone, Mail, MapPin, Shield, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#192D21] text-stone-300 pt-16 pb-12 border-t border-[#2A4736]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white text-[#192D21] flex items-center justify-center font-bold shadow-xs">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif-title text-xl font-bold tracking-tight text-white block">
                  West Park
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-400 block">
                  Dog Grooming
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans max-w-sm">
              A private, calm grooming salon dedicated to gentle 1-on-1 pet care, breed-specific scissoring, and undercoat restoration in West Park, Leeds.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-[11px] text-stone-300 border border-stone-700">
                <Shield className="w-3 h-3 text-emerald-400" />
                Fear-Free Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-[11px] text-stone-300 border border-stone-700">
                <Award className="w-3 h-3 text-amber-400" />
                Pet First Aid Trained
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
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
                  Transformation Gallery
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Pricing Packages
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-serif-title font-bold text-white text-sm tracking-wide uppercase">
              Salon Location
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>72 Latchmere View, Leeds LS16 5DT</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:01133208492" className="hover:text-white">
                  0113 320 8492
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:hello@westparkdoggrooming.co.uk" className="hover:text-white">
                  hello@westparkdoggrooming.co.uk
                </a>
              </li>
            </ul>
          </div>

          {/* Salon Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-serif-title font-bold text-white text-sm tracking-wide uppercase">
              Studio Hours
            </h5>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li className="flex justify-between">
                <span>Monday – Friday:</span>
                <span className="text-white font-medium">8:30 am – 5:00 pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white font-medium">9:00 am – 4:30 pm</span>
              </li>
              <li className="flex justify-between text-stone-500">
                <span>Sunday:</span>
                <span className="italic">Closed (Deep Sanitisation)</span>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-stone-400 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
              <span className="text-stone-300 font-semibold block">Notice:</span>
              We do not accept walk-in baths. All visits are scheduled via prior consultation and inquiry.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} West Park Dog Grooming. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-stone-300">
              Grooming Agreement
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-stone-300">
              Matting Policy
            </Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-stone-300">
              Vaccine Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
