import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PricingSection } from '../components/PricingSection';
import { PricingPackage, DogSize } from '../types';
import { PRICING_DISCLAIMER } from '../data/pricing';
import { ChevronRight, Droplets, Sparkles, ShieldCheck } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectConfig = (config: {
    package: PricingPackage;
    size: DogSize;
    addOns: string[];
    deepClean: boolean;
    totalEstimate: number;
  }) => {
    navigate('/contact', {
      state: {
        prefilledPackage: config.package.name,
        prefilledSize: config.size,
        prefilledUpgrades: config.addOns,
        prefilledDeepClean: config.deepClean,
        prefilledNotes: `Custom Spa Package Selected:\n• Dog Size: ${config.size.toUpperCase()}\n• Base Package: ${config.package.name}\n${config.deepClean ? '• Deep Clean Clarifying Wash (+£5 stage)\n' : ''}${config.addOns.length > 0 ? `• Specialist Add-ons: ${config.addOns.join(', ')}\n` : ''}• Estimated Starting Total: £${config.totalEstimate}\n\n*${PRICING_DISCLAIMER}`
      }
    });
  };

  return (
    <div className="min-h-screen py-8 bg-[#efe0cd]">
      {/* Page Breadcrumbs & Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-[#2b2520] mb-4 font-medium">
          <Link to="/" className="hover:text-[#13253b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#13253b]" />
          <span className="font-bold text-[#13253b]">Spa Packages & Pricing</span>
        </div>

        {/* Important Info Header Card in #8096bb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-[#8096bb] rounded-3xl p-8 sm:p-10 border border-white/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/30">
              <Droplets className="w-3.5 h-3.5 text-white" />
              Specialist Bathing • Skin & Coat Care • Spa Treatments
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-white">
              West Park Luxury Dog Spa Menu
            </h1>
            <p className="text-[#13253b] font-medium text-sm sm:text-base leading-relaxed font-sans">
              A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We are coat & skin specialists focusing on professional bathing, therapeutic bath and blow out, alongside luxury spa treatments using carefully selected professional products.
            </p>
            <div className="pt-1 text-xs text-white/95 font-medium">
              <span className="font-bold">Transparent Pricing: </span>
              {PRICING_DISCLAIMER}
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/terms"
              className="px-5 py-2.5 rounded-full border border-white/60 text-white hover:bg-white/20 text-xs font-semibold transition-colors"
            >
              Product Safety & Policies
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full bg-white hover:bg-[#efe0cd] text-[#13253b] text-xs font-bold transition-colors shadow-sm"
            >
              Book a Spa Consultation
            </Link>
          </div>
        </motion.div>

        {/* Imported Japanese & South Korean Products Feature Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-4 bg-[#8096bb] rounded-2xl p-6 border border-white/40 shadow-sm flex flex-col md:flex-row items-center gap-5 text-white"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                🇯🇵 Japan & 🇰🇷 South Korea Imported Care
              </span>
              <span className="text-xs font-bold text-white/90 hidden sm:inline">•</span>
              <span className="text-xs font-bold text-white/90">Dermatologically Gentle Formulations</span>
            </div>
            <h3 className="font-serif-title text-base sm:text-lg font-bold text-white">
              Specialist Spa Treatments Using Products Imported from Japan & South Korea
            </h3>
            <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans">
              To deliver visible coat silkiness and nurture sensitive canine skin, our specialist treatments — including our marshmallow mud foams, clarifying volcanic clays, and carbonated micro-bubble soaks — use authentic formulas imported directly from leading pet wellness artisans in Japan and South Korea.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-xs font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Hypoallergenic & Gentle</span>
          </div>
        </motion.div>
      </div>

      {/* Main Pricing & Calculator Component */}
      <PricingSection onSelectConfig={handleSelectConfig} />
    </div>
  );
};
