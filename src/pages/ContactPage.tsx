import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { InquiryForm } from '../components/InquiryForm';
import { ChevronRight, Droplets, Phone } from 'lucide-react';
import { DogSize, InquiryServiceType } from '../types';

interface LocationState {
  prefilledServiceType?: InquiryServiceType;
  prefilledPackage?: string;
  prefilledSize?: DogSize;
  prefilledBreed?: string;
  prefilledNotes?: string;
  prefilledUpgrades?: string[];
  prefilledDeepClean?: boolean;
  prefilledFertilityServices?: string[];
}

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const state = (location.state as LocationState) || {};

  return (
    <div className="min-h-screen py-8 bg-[#efe0cd]">
      {/* Page Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-[#2b2520] mb-4 font-medium">
          <Link to="/" className="hover:text-[#13253b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#13253b]" />
          <span className="font-bold text-[#13253b]">Studio Consultation & Inquiries</span>
        </div>

        {/* Header Card in #8096bb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-[#8096bb] rounded-3xl p-8 sm:p-10 border border-white/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/30">
              <Droplets className="w-3.5 h-3.5 text-white" />
              1-on-1 Garden Studio Consultation
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-white">
              Studio Inquiries & Consultation
            </h1>
            <p className="text-[#13253b] font-medium text-sm sm:text-base leading-relaxed font-sans">
              Welcome to West Park Dog Spa in West Park, Leeds. Choose either <strong>Dog Spa & Coat Care</strong> or <strong>Canine Fertility & Microchipping</strong> below to tailor your inquiry so we can schedule the ideal 1-on-1 studio session.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="tel:01133208492"
              className="px-5 py-2.5 rounded-full border border-white/60 text-white hover:bg-white/20 text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              Call 0113 320 8492
            </a>
          </div>
        </motion.div>
      </div>

      {/* Inquiry Form Component */}
      <InquiryForm
        prefilledServiceType={state.prefilledServiceType}
        prefilledPackage={state.prefilledPackage}
        prefilledSize={state.prefilledSize}
        prefilledBreed={state.prefilledBreed}
        prefilledNotes={state.prefilledNotes}
        prefilledUpgrades={state.prefilledUpgrades}
        prefilledDeepClean={state.prefilledDeepClean}
        prefilledFertilityServices={state.prefilledFertilityServices}
      />
    </div>
  );
};
