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
  ArrowRight,
  ShieldCheck,
  Heart,
  Droplets,
  Smile,
  Waves,
  Sun,
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
        return <Sparkles className="w-4 h-4 text-white" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4 text-white" />;
      case 'Waves':
        return <Waves className="w-4 h-4 text-white" />;
      case 'Sun':
        return <Sun className="w-4 h-4 text-white" />;
      case 'Heart':
        return <Heart className="w-4 h-4 text-white" />;
      case 'Smile':
        return <Smile className="w-4 h-4 text-white" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-white" />;
      default:
        return <Sparkles className="w-4 h-4 text-white" />;
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
    <section id="pricing" className="py-16 lg:py-20 bg-[#efe0cd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8096bb] text-white text-xs font-semibold uppercase tracking-wider mb-3 border border-white/30 shadow-xs">
            <Droplets className="w-3.5 h-3.5 text-white" />
            Specialist Bathing • Skin & Coat Care • Spa Treatments
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#af8967] tracking-tight">
            Dog Spa Menu & Starting Prices
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2b2520] font-sans leading-relaxed">
            A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We are coat & skin specialists focusing on professional bathing, therapeutic bath and blow out, alongside luxury spa treatments using carefully selected professional products.
          </p>
        </div>

        {/* Dog Size Selector Card in #8096bb */}
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#13253b]">
              Step 1: Choose Your Dog's Size Bracket
            </span>
          </div>

          <div className="max-w-3xl mx-auto bg-[#8096bb] p-2.5 rounded-2xl border border-white/40 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                        ? 'bg-white text-[#13253b] shadow-sm font-bold ring-2 ring-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span className="font-serif-title font-bold text-base sm:text-lg">
                      {def.label}
                    </span>
                    <span className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#13253b]/80 font-medium' : 'text-white/80'}`}>
                      {def.weight}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Examples Line */}
          <div className="max-w-3xl mx-auto px-4 py-1.5 text-center text-xs text-[#2b2520] flex items-center justify-center gap-1.5 flex-wrap font-medium">
            <span className="font-bold text-[#13253b]">Common {currentSizeDef.label}:</span>
            <span>{currentSizeDef.examples}</span>
          </div>
        </div>

        {/* 🫧 CATEGORY 1: BATH & BLOW-DRY CARDS in #8096bb */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#af8967]/30 pb-3 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#13253b]">
                Core Hydration & Cleansing
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#af8967] mt-0.5 flex items-center gap-2">
                <span>🫧</span> Bath & Blow-Dry
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#2b2520] font-medium">
              Showing starting rates for <strong className="text-[#13253b]">{currentSizeDef.label}</strong> ({currentSizeDef.weight})
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
                  className={`relative bg-[#8096bb] rounded-2xl flex flex-col justify-between transition-shadow duration-300 border border-white/40 shadow-sm text-white ${
                    isPopular ? 'ring-4 ring-white/30 shadow-lg' : ''
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-xs whitespace-nowrap inline-flex items-center justify-center leading-none bg-white text-[#13253b] ring-2 ring-[#8096bb]">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <h4 className="text-2xl font-serif-title font-bold text-white mb-1">
                      {pkg.name}
                    </h4>
                    <p className="text-xs text-[#13253b] font-bold mb-4 min-h-[30px]">
                      {pkg.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="mb-4 pb-4 border-b border-white/20 flex items-baseline gap-1.5">
                      <span className="text-xs text-white/80 font-medium">from</span>
                      <span className="text-4xl font-extrabold text-white tracking-tight">
                        £{price}
                      </span>
                      <span className="text-xs text-white/80 font-normal">
                        / {currentSizeDef.label.toLowerCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#13253b] font-medium mb-4 bg-white/25 px-2.5 py-1.5 rounded-lg border border-white/20">
                      <Clock className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>Est. Duration: ~{pkg.durationEstimate}</span>
                    </div>

                    <p className="text-xs text-[#13253b] font-medium mb-4 leading-relaxed font-sans">
                      {pkg.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] uppercase font-bold text-white tracking-wider block">
                        Included in treatment:
                      </span>
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#13253b] font-medium">
                          <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquireForPackage(pkg)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white text-[#13253b] hover:bg-[#efe0cd] shadow-xs"
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

        {/* 👑 CATEGORY 2: SIGNATURE SPA EXPERIENCES in #8096bb */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#af8967]/30 pb-3 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#13253b]">
                All-Inclusive Pampering
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#af8967] mt-0.5 flex items-center gap-2">
                <span>👑</span> Signature Spa Experiences
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#2b2520] font-medium">
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
                  className={`relative bg-[#8096bb] rounded-2xl flex flex-col justify-between transition-shadow duration-300 border border-white/40 shadow-sm text-white ${
                    isPopular ? 'ring-4 ring-white/30 shadow-lg' : ''
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-xs whitespace-nowrap inline-flex items-center justify-center leading-none bg-white text-[#13253b] ring-2 ring-[#8096bb]">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <h4 className="text-2xl font-serif-title font-bold text-white mb-1">
                      {pkg.name}
                    </h4>
                    <p className="text-xs text-[#13253b] font-bold mb-4 min-h-[30px]">
                      {pkg.tagline}
                    </p>

                    <div className="mb-4 pb-4 border-b border-white/20 flex items-baseline gap-1.5">
                      <span className="text-xs text-white/80 font-medium">from</span>
                      <span className="text-4xl font-extrabold text-white tracking-tight">
                        £{price}
                      </span>
                      <span className="text-xs text-white/80 font-normal">
                        / {currentSizeDef.label.toLowerCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#13253b] font-medium mb-4 bg-white/25 px-2.5 py-1.5 rounded-lg border border-white/20">
                      <Clock className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>Est. Duration: ~{pkg.durationEstimate}</span>
                    </div>

                    <p className="text-xs text-[#13253b] font-medium mb-4 leading-relaxed font-sans">
                      {pkg.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] uppercase font-bold text-white tracking-wider block">
                        Included in experience:
                      </span>
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#13253b] font-medium">
                          <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquireForPackage(pkg)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white text-[#13253b] hover:bg-[#efe0cd] shadow-xs"
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

        {/* 🌿 CATEGORY 3: SPECIALIST SPA TREATMENTS in #8096bb */}
        <div className="bg-[#8096bb] rounded-3xl p-6 sm:p-10 border border-white/40 shadow-sm space-y-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/20">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 mb-1">
                <span>🌿</span>
                Specialist Spa Treatments
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
                Upgrade Your Dog’s Bath Experience
              </h3>
              <p className="text-xs sm:text-sm text-[#13253b] font-medium mt-1">
                Upgrade your dog’s bath with one of our specialist coat-care experiences. Select treatments below to calculate your personalized estimate.
              </p>
            </div>

            {selectedAddOns.length > 0 && (
              <div className="bg-white/95 border border-white px-4 py-2.5 rounded-xl text-xs flex items-center gap-4 shrink-0 shadow-sm">
                <div>
                  <span className="text-[#13253b] font-bold block">
                    {selectedAddOns.length} Spa Upgrade{selectedAddOns.length > 1 ? 's' : ''} Selected
                  </span>
                  <span className="text-[#8096bb] font-bold text-[11px]">
                    +£{totalAddOnCost} added to estimate
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAddOns([])}
                  className="text-[#13253b] underline hover:text-[#8096bb] text-xs font-bold cursor-pointer"
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
                      ? 'border-white bg-white/30 ring-2 ring-white shadow-xs'
                      : 'border-white/30 bg-white/15 hover:bg-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{addon.flagEmoji || '✨'}</span>
                        <h4 className="font-semibold text-white text-sm leading-tight font-serif-title">
                          {addon.name}
                        </h4>
                      </div>
                      <span className="font-bold text-xs text-[#13253b] bg-white px-2 py-0.5 rounded-md border border-white shrink-0">
                        {addon.priceNote}
                      </span>
                    </div>

                    {addon.subtitle && (
                      <div className="text-[11px] font-bold text-white/90 mb-2 pl-7">
                        {addon.subtitle}
                      </div>
                    )}

                    <p className="text-xs text-[#13253b] font-medium pl-7 mb-3 leading-relaxed">
                      {addon.description}
                    </p>
                  </div>

                  <div className="pl-7 pt-2 border-t border-white/20 flex items-center justify-between text-[11px]">
                    <span className="text-white/80 capitalize">Specialist Care</span>
                    <span className={`font-bold ${isChecked ? 'text-white' : 'text-white/90'}`}>
                      {isChecked ? '✓ Added to Inquiry' : '+ Tap to select'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 🌟 GOOD TO KNOW IMPORTANT INFO CARDS: bg #8096bb, white heading, dark blue paragraph text */}
        <div className="bg-[#8096bb] rounded-3xl p-6 sm:p-10 border border-white/40 shadow-md">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white text-[#13253b] flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-[#8096bb]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Transparency & Care Philosophy
              </span>
              <h3 className="text-2xl font-serif-title font-bold text-white">
                Good to know
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOD_TO_KNOW.points.map((pt, i) => (
              <div key={i} className="bg-[#8096bb] p-5 rounded-2xl border border-white/40 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <span className="w-6 h-6 rounded-full bg-white text-[#13253b] flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="font-serif-title">{pt.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans">
                  {pt.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#13253b] font-medium">
              Have questions about your dog's coat type, sensitivities, or shedding volume? We're happy to advise.
            </p>
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-white hover:bg-[#efe0cd] text-[#13253b] rounded-full text-xs font-bold transition-colors shrink-0 shadow-xs"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
