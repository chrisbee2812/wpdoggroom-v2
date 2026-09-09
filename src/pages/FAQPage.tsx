import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FAQSection } from '../components/FAQSection';
import { ChevronRight, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      {/* Page Breadcrumb & Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
          <Link to="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="font-semibold text-stone-900">Frequently Asked Questions</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              Client Resource Center
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-stone-900">
              Frequently Asked Questions
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Find clear answers regarding vaccination rules, session timing, anxious or elderly dogs, humane matting care, and our consultation model.
            </p>
          </div>

          <Link
            to="/contact"
            className="shrink-0 px-6 py-3 rounded-full bg-[#2A4736] hover:bg-[#1a3325] text-white text-xs font-semibold transition-colors shadow-sm"
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
