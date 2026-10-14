import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FAQSection } from '../components/FAQSection';
import { ChevronRight, Droplets } from 'lucide-react';

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
              West Park Dog Spa Knowledge Base
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-[#13253b] font-medium text-sm sm:text-base leading-relaxed font-sans">
              Learn about our specialist bathing, therapeutic bath and blow out, product safety review, starting rates, and dedicated 1-on-1 garden studio setting.
            </p>
          </div>

          <Link
            to="/contact"
            className="shrink-0 px-6 py-3 rounded-full bg-white hover:bg-[#efe0cd] text-[#13253b] text-xs font-bold transition-colors shadow-sm"
          >
            Ask a Specific Question
          </Link>
        </motion.div>
      </div>

      {/* Main FAQ Component */}
      <FAQSection />
    </div>
  );
};
