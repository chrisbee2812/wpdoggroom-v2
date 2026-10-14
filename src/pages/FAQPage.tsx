import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FAQSection } from '../components/FAQSection';
import { ChevronRight, Droplets, Sparkles } from 'lucide-react';

export const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8 bg-[#efe0cd]">
      {/* Page Breadcrumb & Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-[#2b2520] mb-4 font-medium">
          <Link to="/" className="hover:text-[#13253b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#13253b]" />
          <span className="font-bold text-[#13253b]">Frequently Asked Questions</span>
        </div>

        {/* Header Card in #8096bb with white heading and darker blue paragraph text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-[#8096bb] rounded-3xl p-8 sm:p-10 border border-white/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/30">
              <Droplets className="w-3.5 h-3.5" />
              West Park Luxury Dog Spa Knowledge Base
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-[#13253b] font-medium text-sm sm:text-base leading-relaxed font-sans">
              Learn about our specialist bathing, therapeutic bath and blow out, imported Japanese & South Korean spa products, product safety review, starting rates, and dedicated 1-on-1 garden studio setting.
            </p>
          </div>

          <Link
            to="/contact"
            className="shrink-0 px-6 py-3 rounded-full bg-white hover:bg-[#efe0cd] text-[#13253b] text-xs font-bold transition-colors shadow-sm"
          >
            Ask a Specific Question
          </Link>
        </motion.div>

        {/* Imported Japanese & South Korean Spa Formulation Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-4 bg-[#8096bb] rounded-2xl p-5 border border-white/40 shadow-xs flex flex-col sm:flex-row items-center gap-4 text-white"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 border border-white/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white border border-white/20">
                Product Provenance
              </span>
              <span className="text-xs font-serif-title font-bold text-white">
                Imported Japanese & South Korean Formulas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed">
              We exclusively source our specialist bubble baths, marshmallow mud therapies, volcanic clays, and silk conditioning rinses from premier pet wellness artisans in Japan and South Korea, celebrated globally for gentle dermatological care and luxurious coat hydration.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main FAQ Component */}
      <FAQSection />
    </div>
  );
};
