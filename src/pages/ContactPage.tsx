declare module 'react/jsx-runtime';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { InquiryForm } from '../components/InquiryForm';
import { ChevronRight, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { DogSize } from '../types';

interface LocationState {
  prefilledPackage?: string;
  prefilledSize?: DogSize;
  prefilledBreed?: string;
  prefilledNotes?: string;
}

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const state = (location.state as LocationState) || {};

  return (
    <div className="min-h-screen py-8">
      {/* Page Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
          <Link to="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="font-semibold text-stone-900">Contact & Styling Inquiries</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              Direct Salon Consultation
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900">
              Contact & Styling Inquiry
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We review every inquiry individually so we can schedule the optimal amount of time and pair your pup with the ideal styling care.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="tel:01133208492"
              className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#2A4736]" />
              Call 0113 320 8492
            </a>
          </div>
        </motion.div>
      </div>

      {/* Inquiry Form Component */}
      <InquiryForm
        prefilledPackage={state.prefilledPackage}
        prefilledSize={state.prefilledSize}
        prefilledBreed={state.prefilledBreed}
        prefilledNotes={state.prefilledNotes}
      />
    </div>
  );
};
