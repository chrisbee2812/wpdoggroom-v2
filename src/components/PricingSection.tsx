import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  BATH_BLOWDRY_PACKAGES,
  SIGNATURE_SPA_EXPERIENCES,
  SPECIALIST_SPA_TREATMENTS,
  DOG_SIZE_DEFINITIONS,
  GOOD_TO_KNOW
} from '../data/pricing';
import { DogSize, PricingPackage, AddOnItem } from '../types';
import {
  Check,
  Sparkles,
  Clock,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Heart,
  Droplets,
  Smile,
  Waves,
  Sun,
  Shield,
  Info
} from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage?: (pkg: PricingPackage, size: DogSize) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const [selectedSize, setSelectedSize] = useState<DogSize>('medium');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const navigate = useNavigate();

  const sizes: DogSize[] = ['small', 'medium', 'large', 'xl'];

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getAddOnIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'Waves':
        return <Waves className="w-4 h-4 text-sky-600" />;
      case 'Sun':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Heart':
        return <Heart className="w-4 h-4 text-rose-600" />;
      case 'Smile':
        return <Smile className="w-4 h-4 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-stone-700" />;
      default:
        return <Sparkles className="w-4 h-4 text-stone-500" />;
    }
  };

  const currentSizeDef = DOG_SIZE_DEFINITIONS[selectedSize];
  const totalAddOnCost = selectedAddOns.reduce((sum, id) => {
    const item = SPECIALIST_SPA_TREATMENTS.find(a => a.id === id);
    return sum + (item ? item.basePrice : 0);
  }, 0);

  const handleInquireForPackage = (pkg: PricingPackage) => {
    const selectedTreatments = selectedAddOns
      .map(id => SPECIALIST_SPA_TREATMENTS.find(a => a.id === id)?.name)
      .filter(Boolean);

    const upgradeNote = selectedTreatments.length > 0
      ? ` Included upgrades: ${selectedTreatments.join(', ')}.`
      : '';

    if (onSelectPackage) {
      onSelectPackage(pkg, selectedSize);
    } else {
      navigate('/contact', {
        state: {
          prefilledPackage: pkg.name,
          prefilledSize: selectedSize,
          prefilledNotes: `Hi! I'm interested in ${pkg.name} for my ${currentSizeDef.label.toLowerCase()} (${selectedSize.toUpperCase()}).${upgradeNote}`
        }
      });
    }
  };

  return (
    <section id="pricing" className="py-16 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider mb-3">
            <Droplets className="w-3.5 h-3.5 text-[#2A4736]" />
            Specialist Bathing • Skin & Coat Care • Spa Treatments
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight">
            Dog Spa Menu & Starting Prices
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We specialise in short-haired breeds, professional bathing, deshedding and specialist skin & coat care, alongside luxury spa treatments using carefully selected professional products.
          </p>
        </div>

        {/* Dog Size Selector */}
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736]">
              Step 1: Choose Your Dog's Size Bracket
            </span>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-2 rounded-2xl border border-stone-200 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {sizes.map(size => {
                const def = DOG_SIZE_DEFINITIONS[size];
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-3 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#2A4736] text-white shadow-sm'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className="font-serif-title font-bold text-base sm:text-lg">
                      {def.label}
                    </span>
                    <span className={`text-[11px] mt-0.5 ${isSelected ? 'text-stone-200' : 'text-stone-500'}`}>
                      {def.weight}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Examples Line */}
          <div className="max-w-3xl mx-auto px-4 py-1.5 text-center text-xs text-stone-500 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="font-semibold text-stone-700">Common {currentSizeDef.label}:</span>
            <span>{currentSizeDef.examples}</span>
          </div>
        </div>

        {/* 🫧 CATEGORY 1: BATH & BLOW-DRY */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-3 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736]">
                Core Hydration & Cleansing
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-900 mt-0.5 flex items-center gap-2">
                <span>🫧</span> Bath & Blow-Dry
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-500">
              Showing starting rates for <strong className="text-stone-800">{currentSizeDef.label}</strong> ({currentSizeDef.weight})
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BATH_BLOWDRY_PACKAGES.map((pkg, idx) => {
              const price = pkg.prices[selectedSize];
              const isPopular = pkg.popular;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`relative bg-white rounded-2xl flex flex-col justify-between transition-shadow duration-300 ${
                    isPopular
                      ? 'border-2 border-[#2A4736] shadow-md ring-4 ring-[#2A4736]/10'
                      : 'border border-stone-200 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span
                        className={`px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-xs whitespace-nowrap inline-flex items-center justify-center leading-none ${
                          isPopular
                            ? 'bg-[#2A4736] text-white ring-2 ring-white'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300 ring-2 ring-white'
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <h4 className="text-xl font-serif-title font-bold text-stone-900 mb-1">
                      {pkg.name}
                    </h4>
                    <p className="text-xs text-[#2A4736] font-medium mb-4 min-h-7.5">
                      {pkg.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="mb-4 pb-4 border-b border-stone-100 flex items-baseline gap-1.5">
                      <span className="text-xs text-stone-500 font-medium">from</span>
                      <span className="text-4xl font-extrabold text-stone-900 tracking-tight">
                        £{price}
                      </span>
                      <span className="text-xs text-stone-500 font-normal">
                        / {currentSizeDef.label.toLowerCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Est. Duration: ~{pkg.durationEstimate}</span>
                    </div>

                    <p className="text-xs text-stone-600 mb-4 leading-relaxed font-sans">
                      {pkg.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] uppercase font-bold text-stone-400 tracking-wider">
                        Included in treatment:
                      </span>
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-stone-700">
                          <Check className="w-4 h-4 text-[#2A4736] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquireForPackage(pkg)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isPopular
                          ? 'bg-[#2A4736] hover:bg-[#1a3325] text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      Inquire for {pkg.name}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 👑 CATEGORY 2: SIGNATURE SPA EXPERIENCES & PUPPY */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-3 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                All-Inclusive Pampering
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-900 mt-0.5 flex items-center gap-2">
                <span>👑</span> Signature Spa Experiences
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-500">
              Complete head-to-paw restorative wellness rituals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SIGNATURE_SPA_EXPERIENCES.map((pkg, idx) => {
              const price = pkg.prices[selectedSize];
              const isPopular = pkg.popular;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`relative bg-white rounded-2xl flex flex-col justify-between transition-shadow duration-300 ${
                    isPopular
                      ? 'border-2 border-amber-600/70 shadow-md ring-4 ring-amber-500/10'
                      : 'border border-stone-200 shadow-xs hover:shadow-md'
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span
                        className={`px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-xs whitespace-nowrap inline-flex items-center justify-center leading-none ${
                          isPopular
                            ? 'bg-amber-700 text-white ring-2 ring-white'
                            : 'bg-stone-800 text-white ring-2 ring-white'
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <h4 className="text-xl font-serif-title font-bold text-stone-900 mb-1">
                      {pkg.name}
                    </h4>
                    <p className="text-xs text-amber-800 font-medium mb-4 min-h-7.5">
                      {pkg.tagline}
                    </p>

                    <div className="mb-4 pb-4 border-b border-stone-100 flex items-baseline gap-1.5">
                      <span className="text-xs text-stone-500 font-medium">from</span>
                      <span className="text-4xl font-extrabold text-stone-900 tracking-tight">
                        £{price}
                      </span>
                      <span className="text-xs text-stone-500 font-normal">
                        / {currentSizeDef.label.toLowerCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Est. Duration: ~{pkg.durationEstimate}</span>
                    </div>

                    <p className="text-xs text-stone-600 mb-4 leading-relaxed font-sans">
                      {pkg.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] uppercase font-bold text-stone-400 tracking-wider">
                        Included in experience:
                      </span>
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-stone-700">
                          <Check className="w-4 h-4 text-[#2A4736] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquireForPackage(pkg)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isPopular
                          ? 'bg-[#2A4736] hover:bg-[#1a3325] text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      Inquire for {pkg.name.split(' ')[0]}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 🌿 CATEGORY 3: SPECIALIST SPA TREATMENTS */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
                <span>🌿</span>
                Specialist Spa Treatments
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-900">
                Upgrade Your Dog’s Bath Experience
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Upgrade your dog’s bath with one of our specialist coat-care experiences. Select treatments below to calculate your personalized estimate.
              </p>
            </div>

            {selectedAddOns.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl text-xs flex items-center gap-4 shrink-0">
                <div>
                  <span className="text-emerald-950 font-bold block">
                    {selectedAddOns.length} Spa Upgrade{selectedAddOns.length > 1 ? 's' : ''} Selected
                  </span>
                  <span className="text-emerald-800 text-[11px]">
                    +£{totalAddOnCost} added to estimate
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAddOns([])}
                  className="text-emerald-800 underline hover:text-emerald-950 text-xs font-semibold cursor-pointer"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPECIALIST_SPA_TREATMENTS.map((addon, aIdx) => {
              const isChecked = selectedAddOns.includes(addon.id);
              return (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10px' }}
                  transition={{ duration: 0.35, delay: aIdx * 0.04 }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                    isChecked
                      ? 'border-[#2A4736] bg-[#EBF1ED]/50 ring-2 ring-[#2A4736]/20 shadow-xs'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{addon.flagEmoji || '✨'}</span>
                        <h4 className="font-semibold text-stone-900 text-sm leading-tight">
                          {addon.name}
                        </h4>
                      </div>
                      <span className="font-bold text-xs text-[#2A4736] bg-white px-2 py-0.5 rounded-md border border-stone-200 shrink-0">
                        {addon.priceNote}
                      </span>
                    </div>

                    {addon.subtitle && (
                      <div className="text-[11px] font-semibold text-emerald-800 mb-2 pl-7">
                        {addon.subtitle}
                      </div>
                    )}

                    <p className="text-xs text-stone-600 pl-7 mb-3 leading-relaxed">
                      {addon.description}
                    </p>
                  </div>

                  <div className="pl-7 pt-2 border-t border-stone-200/50 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 capitalize">Specialist Care</span>
                    <span className={`font-semibold ${isChecked ? 'text-[#2A4736]' : 'text-stone-500'}`}>
                      {isChecked ? '✓ Added to Inquiry' : '+ Tap to select'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 🌟 GOOD TO KNOW SECTION */}
        <div className="bg-[#EBF1ED]/80 rounded-3xl p-6 sm:p-10 border border-[#2A4736]/20">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#2A4736] text-white flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736]">
                Transparency & Care Philosophy
              </span>
              <h3 className="text-2xl font-serif-title font-bold text-stone-900">
                Good to know
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-700">
            {GOOD_TO_KNOW.points.map((pt, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-[#2A4736]/15 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <span>{pt.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {pt.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#2A4736]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-600">
              Have questions about your dog's coat type, sensitivities, or shedding volume? We're happy to advise.
            </p>
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-[#2A4736] hover:bg-[#1a3325] text-white rounded-full text-xs font-semibold transition-colors shrink-0 shadow-xs"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
