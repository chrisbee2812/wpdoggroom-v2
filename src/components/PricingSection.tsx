import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  BATH_BLOWDRY_PACKAGES,
  SIGNATURE_SPA_EXPERIENCES,
  SPECIALIST_SPA_TREATMENTS,
  DEEP_CLEAN_UPGRADE,
  DOG_SIZE_DEFINITIONS,
  GOOD_TO_KNOW,
  SHORT_COAT_INCLUDED_ADDON_IDS,
  ULTIMATE_INCLUDED_ADDON_IDS,
  ULTIMATE_SPECIALIST_CHOICE_IDS,
  PRICING_DISCLAIMER
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
  Info,
  CheckCircle2,
  Sliders,
  Sparkle
} from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage?: (pkg: PricingPackage, size: DogSize) => void;
  onSelectConfig?: (config: {
    package: PricingPackage;
    size: DogSize;
    addOns: string[];
    deepClean: boolean;
    totalEstimate: number;
  }) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage, onSelectConfig }) => {
  const [selectedSize, setSelectedSize] = useState<DogSize>('medium');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('fresh-and-fluffy');
  const [includeDeepClean, setIncludeDeepClean] = useState<boolean>(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [ultimateIncludedTreatment, setUltimateIncludedTreatment] = useState<string>('japanese-marshmallow-foam');
  const navigate = useNavigate();

  const sizes: DogSize[] = ['small', 'medium', 'large'];
  const allPackages: PricingPackage[] = [...BATH_BLOWDRY_PACKAGES, ...SIGNATURE_SPA_EXPERIENCES];

  const currentSizeDef = DOG_SIZE_DEFINITIONS[selectedSize];
  const activePackage = allPackages.find(p => p.id === selectedPackageId) || BATH_BLOWDRY_PACKAGES[0];

  const isBathAndBlowDryPackage =
    activePackage.category === 'bath-blowdry' ||
    activePackage.id === 'fresh-and-fluffy' ||
    activePackage.id === 'therapeutic-bath-blowout';

  const isShortCoatSpa = activePackage.id === 'the-short-coat-spa';
  const isUltimateSpa = activePackage.id === 'the-ultimate-dog-spa';

  const toggleAddOn = (id: string) => {
    // If Short Coat Spa, fresh-face and luxury-paw-spa are included and unselectable
    if (isShortCoatSpa && SHORT_COAT_INCLUDED_ADDON_IDS.includes(id)) {
      return;
    }
    // If Ultimate Dog Spa, fresh-face and luxury-paw-spa are included and unselectable
    if (isUltimateSpa && ULTIMATE_INCLUDED_ADDON_IDS.includes(id)) {
      return;
    }
    // If Ultimate Dog Spa and clicked one of the 4 specialist treatments:
    // It sets that treatment as the customer's 1 included treatment!
    if (isUltimateSpa && ULTIMATE_SPECIALIST_CHOICE_IDS.includes(id)) {
      setUltimateIncludedTreatment(id);
      return;
    }

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

  // Pricing calculations
  const basePackagePrice = activePackage.prices[selectedSize];
  const deepCleanPrice = isBathAndBlowDryPackage && includeDeepClean ? DEEP_CLEAN_UPGRADE.price : 0;

  // Paid add-ons (filters out free inclusions)
  const paidAddOnIds = selectedAddOns.filter(id => {
    if (isShortCoatSpa && SHORT_COAT_INCLUDED_ADDON_IDS.includes(id)) return false;
    if (isUltimateSpa && (ULTIMATE_INCLUDED_ADDON_IDS.includes(id) || id === ultimateIncludedTreatment)) return false;
    return true;
  });

  const totalAddOnCost = paidAddOnIds.reduce((sum, id) => {
    const item = SPECIALIST_SPA_TREATMENTS.find(a => a.id === id);
    return sum + (item ? item.basePrice : 0);
  }, 0);

  const totalEstimate = basePackagePrice + deepCleanPrice + totalAddOnCost;

  const ultimateTreatmentObj = SPECIALIST_SPA_TREATMENTS.find(a => a.id === ultimateIncludedTreatment);

  // Selected treatment names for passing to form
  const getEffectiveAddOnsList = () => {
    const paidNames = paidAddOnIds
      .map(id => SPECIALIST_SPA_TREATMENTS.find(a => a.id === id)?.name)
      .filter((n): n is string => Boolean(n));

    if (isShortCoatSpa) {
      return [
        'Fresh Face (Included in Short Coat Spa)',
        'Luxury Paw Spa (Included in Short Coat Spa)',
        ...paidNames
      ];
    }
    if (isUltimateSpa) {
      return [
        'Fresh Face (Included in Ultimate Dog Spa)',
        'Luxury Paw Spa (Included in Ultimate Dog Spa)',
        `${ultimateTreatmentObj?.name || 'Japanese Marshmallow Foam Spa'} (Included Choice in Ultimate Dog Spa)`,
        ...paidNames
      ];
    }
    return selectedAddOns
      .map(id => SPECIALIST_SPA_TREATMENTS.find(a => a.id === id)?.name)
      .filter((n): n is string => Boolean(n));
  };

  const selectedTreatmentNames = getEffectiveAddOnsList();

  const handleProceedToInquiry = () => {
    const customSummaryLines = [
      `Package: ${activePackage.name} for ${currentSizeDef.label} (${selectedSize.toUpperCase()}) - from £${basePackagePrice}`,
      isShortCoatSpa ? `• Inclusions: Fresh Face & Luxury Paw Spa (Included in Short Coat Spa package at £0)` : null,
      isUltimateSpa ? `• Inclusions: Fresh Face, Luxury Paw Spa, and ${ultimateTreatmentObj?.name} (Included in Ultimate Dog Spa package at £0)` : null,
      isBathAndBlowDryPackage && includeDeepClean ? `• Deep Clean Clarifying Wash upgrade (+£${DEEP_CLEAN_UPGRADE.price})` : null,
      paidAddOnIds.length > 0 ? `• Extra Specialist Upgrades: ${paidAddOnIds.map(id => SPECIALIST_SPA_TREATMENTS.find(a => a.id === id)?.name).join(', ')} (+£${totalAddOnCost})` : null,
      `Estimated Starting Total: from £${totalEstimate}`
    ].filter(Boolean).join('\n');

    if (onSelectConfig) {
      onSelectConfig({
        package: activePackage,
        size: selectedSize,
        addOns: selectedTreatmentNames,
        deepClean: isBathAndBlowDryPackage && includeDeepClean,
        totalEstimate
      });
      return;
    }

    if (onSelectPackage) {
      onSelectPackage(activePackage, selectedSize);
      return;
    }

    navigate('/contact', {
      state: {
        prefilledPackage: activePackage.name,
        prefilledSize: selectedSize,
        prefilledUpgrades: selectedTreatmentNames,
        prefilledDeepClean: isBathAndBlowDryPackage && includeDeepClean,
        prefilledNotes: `Hi! I configured this spa package on your website:\n${customSummaryLines}`
      }
    });
  };

  const handleSelectSpecificPackage = (pkg: PricingPackage) => {
    setSelectedPackageId(pkg.id);
  };

  return (
    <section id="pricing" className="py-12 lg:py-16 bg-[#efe0cd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8096bb] text-white text-xs font-semibold uppercase tracking-wider mb-3 border border-white/30 shadow-xs">
            <Droplets className="w-3.5 h-3.5 text-white" />
            Specialist Bathing • Skin & Coat Care • Spa Treatments
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#af8967] tracking-tight">
            Dog Spa Menu & Starting Prices
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#2b2520] font-sans leading-relaxed">
            A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We specialise in coat & skin care, therapeutic bathing, deshedding and restorative spa rituals.
          </p>
          <div className="mt-3 inline-block px-4 py-2 rounded-xl bg-[#8096bb]/20 border border-[#8096bb]/30 text-xs sm:text-sm text-[#13253b] font-medium max-w-2xl">
            <span className="font-bold text-[#13253b]">Please Note: </span>
            {PRICING_DISCLAIMER}
          </div>
        </div>

        {/* 🌟 3-STEP INTERACTIVE FLOW PROGRESS BAR */}
        <div className="max-w-4xl mx-auto bg-[#8096bb] rounded-2xl p-4 sm:p-5 border border-white/40 shadow-sm text-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
            {/* Step 1 Indicator */}
            <div className="bg-white/15 rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Step 1</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-sm font-bold text-white font-serif-title">
                {currentSizeDef.label}
              </div>
              <div className="text-[11px] text-white/80">{currentSizeDef.weight}</div>
            </div>

            {/* Step 2 Indicator */}
            <div className="bg-white/15 rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Step 2</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-sm font-bold text-white font-serif-title truncate">
                {activePackage.name}
              </div>
              <div className="text-[11px] text-white/80">
                from £{basePackagePrice} {isBathAndBlowDryPackage && includeDeepClean ? '(+£5 Deep Clean)' : ''}
              </div>
            </div>

            {/* Step 3 Indicator */}
            <div className="bg-white/15 rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Step 3</span>
                <span className={`w-2 h-2 rounded-full ${selectedAddOns.length > 0 ? 'bg-emerald-400' : 'bg-white/40'}`}></span>
              </div>
              <div className="text-sm font-bold text-white font-serif-title">
                {selectedAddOns.length > 0 ? `${selectedAddOns.length} Upgrade${selectedAddOns.length > 1 ? 's' : ''}` : 'Optional Add-Ons'}
              </div>
              <div className="text-[11px] text-white/80">
                {selectedAddOns.length > 0 ? `+£${totalAddOnCost} added` : 'Tap to add below'}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 1: CHOOSE YOUR DOG'S SIZE BRACKET                   */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#af8967]/15 text-[#af8967] text-xs font-bold uppercase tracking-wider mb-1">
              Step 1 of 3
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#af8967]">
              Choose Your Dog's Size Bracket
            </h3>
          </div>

          <div className="max-w-3xl mx-auto bg-[#8096bb] p-2.5 rounded-2xl border border-white/40 shadow-sm">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
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
                        ? 'bg-white text-[#13253b] shadow-md font-bold ring-2 ring-white scale-[1.02]'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span className="font-serif-title font-bold text-base sm:text-lg">
                      {def.label}
                    </span>
                    <span className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#13253b]/80 font-medium' : 'text-white/80'}`}>
                      {def.weight}
                    </span>
                    {isSelected && (
                      <span className="mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        ✓ Selected
                      </span>
                    )}
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

        {/* ======================================================== */}
        {/* STEP 2: CHOOSE YOUR SPA PACKAGE                         */}
        {/* ======================================================== */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#af8967]/15 text-[#af8967] text-xs font-bold uppercase tracking-wider mb-1">
              Step 2 of 3
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#af8967]">
              Choose Your Spa Package
            </h3>
            <p className="text-xs sm:text-sm text-[#2b2520] mt-1 font-medium">
              Click any package card to select it. Prices automatically adjust for <strong className="text-[#13253b]">{currentSizeDef.label}</strong> ({currentSizeDef.weight}).
            </p>
          </div>

          {/* 🫧 CATEGORY 2A: BATH & BLOW-DRY PACKAGES */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#af8967]/30 pb-2.5 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#13253b]">
                  Core Hydration & Cleansing
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-title font-bold text-[#af8967] mt-0.5 flex items-center gap-2">
                  <span>🫧</span> Bath & Blow-Dry
                </h4>
              </div>
              <p className="text-xs text-[#2b2520] font-medium">
                Standard cleansing, deshedding blow-out & conditioning
              </p>
            </div>

            {/* 2 Core Bath & Blow-Dry Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BATH_BLOWDRY_PACKAGES.map((pkg, idx) => {
                const price = pkg.prices[selectedSize];
                const isSelected = selectedPackageId === pkg.id;

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    onClick={() => handleSelectSpecificPackage(pkg)}
                    className={`relative bg-[#8096bb] rounded-3xl p-6 sm:p-7 pb-8 sm:pb-8 flex flex-col justify-between transition-all duration-200 border cursor-pointer text-white ${
                      isSelected
                        ? 'ring-4 ring-white shadow-xl scale-[1.01] border-white'
                        : 'border-white/40 shadow-sm hover:shadow-md hover:border-white/80 opacity-95'
                    }`}
                  >
                    {/* Selected or Category Badge */}
                    <div className="flex items-center justify-between mb-2">
                      {pkg.badge && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-[#13253b] shadow-2xs">
                          {pkg.badge}
                        </span>
                      )}
                      {isSelected ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#13253b] flex items-center gap-1 shadow-xs ring-2 ring-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Package Selected
                        </span>
                      ) : (
                        <span className="text-xs text-white/80 font-medium">
                          Click to select
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-2xl font-serif-title font-bold text-white mb-1">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-[#13253b] font-bold mb-4">
                        {pkg.tagline}
                      </p>

                      {/* Price Block */}
                      <div className="mb-4 pb-4 border-b border-white/20">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs text-white/80 font-medium">from</span>
                          <span className="text-4xl font-extrabold text-white tracking-tight">
                            £{price}
                          </span>
                          <span className="text-xs text-white/80 font-normal">
                            / {currentSizeDef.label.toLowerCase()}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/95 font-medium mt-1 leading-snug">
                          {PRICING_DISCLAIMER}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#13253b] font-medium mb-3 bg-white/25 px-2.5 py-1.5 rounded-lg border border-white/20">
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

                    <div className="pt-6 mt-4 border-t border-white/20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectSpecificPackage(pkg);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[#13253b] shadow-xs'
                            : 'bg-white/20 text-white hover:bg-white hover:text-[#13253b]'
                        }`}
                      >
                        {isSelected ? '✓ Selected for Estimate' : `Select ${pkg.name}`}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 🧼 SPECIAL DEEP CLEAN CLARIFYING UPGRADE TOGGLE BOX (+£5 to Bath & Blow-Dry) */}
            <div
              onClick={() => {
                if (isBathAndBlowDryPackage) {
                  setIncludeDeepClean(!includeDeepClean);
                } else {
                  // Switch to Fresh & Fluffy and turn on Deep clean
                  setSelectedPackageId('fresh-and-fluffy');
                  setIncludeDeepClean(true);
                }
              }}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                includeDeepClean && isBathAndBlowDryPackage
                  ? 'bg-[#8096bb] text-white border-white ring-2 ring-white shadow-md'
                  : 'bg-[#8096bb]/90 text-white border-white/40 hover:bg-[#8096bb]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={includeDeepClean && isBathAndBlowDryPackage}
                    onChange={() => {
                      if (isBathAndBlowDryPackage) {
                        setIncludeDeepClean(!includeDeepClean);
                      } else {
                        setSelectedPackageId('fresh-and-fluffy');
                        setIncludeDeepClean(true);
                      }
                    }}
                    className="w-5 h-5 rounded text-[#8096bb] focus:ring-white border-white cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold font-serif-title text-white">
                      Deep Clean Clarifying Wash Upgrade
                    </span>
                    <span className="text-xs font-bold bg-white text-[#13253b] px-2.5 py-0.5 rounded-full">
                      Add £5 to Bath & Blow-Dry
                    </span>
                  </div>
                  <p className="text-xs text-[#13253b] font-medium mt-1 leading-relaxed">
                    {DEEP_CLEAN_UPGRADE.description}
                  </p>
                  <p className="text-[11px] text-white font-medium mt-1 leading-relaxed bg-white/15 px-2.5 py-1 rounded-lg border border-white/20 inline-block">
                    The additional £5 is for an extra deep-cleansing stage, using specialist products to help remove excess dirt, grease and product build-up from the coat.
                  </p>
                  {!isBathAndBlowDryPackage && (
                    <p className="text-[11px] text-white/90 font-medium mt-1">
                      (Selecting this will automatically choose Fresh & Fluffy as your base package)
                    </p>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                  includeDeepClean && isBathAndBlowDryPackage
                    ? 'bg-white text-[#13253b] border-white'
                    : 'bg-white/20 text-white border-white/30'
                }`}>
                  {includeDeepClean && isBathAndBlowDryPackage ? '✓ +£5 Included' : '+ Add Deep Clean (£5)'}
                </span>
              </div>
            </div>
          </div>

          {/* 👑 CATEGORY 2B: SIGNATURE SPA EXPERIENCES */}
          <div className="space-y-5 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#af8967]/30 pb-2.5 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#13253b]">
                  All-Inclusive Pampering & Puppy Care
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-title font-bold text-[#af8967] mt-0.5 flex items-center gap-2">
                  <span>👑</span> Signature Spa Experiences & Puppy Intro
                </h4>
              </div>
              <p className="text-xs text-[#2b2520] font-medium">
                Complete head-to-paw restorative wellness rituals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SIGNATURE_SPA_EXPERIENCES.map((pkg, idx) => {
                const price = pkg.prices[selectedSize];
                const isSelected = selectedPackageId === pkg.id;

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    onClick={() => handleSelectSpecificPackage(pkg)}
                    className={`relative bg-[#8096bb] rounded-3xl p-6 sm:p-7 pb-8 sm:pb-8 flex flex-col justify-between transition-all duration-200 border cursor-pointer text-white ${
                      isSelected
                        ? 'ring-4 ring-white shadow-xl scale-[1.01] border-white'
                        : 'border-white/40 shadow-sm hover:shadow-md hover:border-white/80 opacity-95'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      {pkg.badge && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-[#13253b] shadow-2xs">
                          {pkg.badge}
                        </span>
                      )}
                      {isSelected ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#13253b] flex items-center gap-1 shadow-xs ring-2 ring-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Package Selected
                        </span>
                      ) : (
                        <span className="text-xs text-white/80 font-medium">
                          Click to select
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-2xl font-serif-title font-bold text-white mb-1">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-[#13253b] font-bold mb-4">
                        {pkg.tagline}
                      </p>

                      <div className="mb-4 pb-4 border-b border-white/20">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs text-white/80 font-medium">from</span>
                          <span className="text-4xl font-extrabold text-white tracking-tight">
                            £{price}
                          </span>
                          <span className="text-xs text-white/80 font-normal">
                            / {currentSizeDef.label.toLowerCase()}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/95 font-medium mt-1 leading-snug">
                          {PRICING_DISCLAIMER}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#13253b] font-medium mb-3 bg-white/25 px-2.5 py-1.5 rounded-lg border border-white/20">
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

                    <div className="pt-6 mt-4 border-t border-white/20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectSpecificPackage(pkg);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[#13253b] shadow-xs'
                            : 'bg-white/20 text-white hover:bg-white hover:text-[#13253b]'
                        }`}
                      >
                        {isSelected ? '✓ Selected for Estimate' : `Select ${pkg.name.split(' ')[0]}`}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 3: SPECIALIST SPA TREATMENTS & ADD-ONS              */}
        {/* ======================================================== */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#af8967]/15 text-[#af8967] text-xs font-bold uppercase tracking-wider mb-1">
              Step 3 of 3
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#af8967]">
              Choose Specialist Add-Ons & Upgrades
            </h3>
            <p className="text-xs sm:text-sm text-[#2b2520] mt-1 font-medium">
              Elevate your dog’s treatment with restorative Japanese and South Korean spa rituals. Tap any add-on below to customize your live estimate and inquiry.
            </p>
          </div>

          <div className="bg-[#8096bb] rounded-3xl p-6 sm:p-10 border border-white/40 shadow-sm space-y-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/20">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2 border border-white/20">
                  ✨ Specialist Spa Treatments • Imported from Japan & South Korea
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
                  Upgrade Your Dog’s Bath Experience
                </h4>
                <p className="text-xs sm:text-sm text-[#13253b] font-medium mt-1">
                  Upgrade your dog’s bath with one of our specialist coat-care experiences, featuring authentic formulas imported directly from Japan and South Korea for exceptional skin care and coat restoration. Select treatments below to customize your live estimate. All selected add-ons transfer directly into your inquiry!
                </p>
              </div>

            {paidAddOnIds.length > 0 && (
              <div className="bg-white/95 border border-white px-4 py-2.5 rounded-xl text-xs flex items-center gap-4 shrink-0 shadow-sm">
                <div>
                  <span className="text-[#13253b] font-bold block">
                    {paidAddOnIds.length} Extra Upgrade{paidAddOnIds.length > 1 ? 's' : ''} Selected
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
                  Reset Extras
                </button>
              </div>
            )}
          </div>

          {/* 🌟 SHORT COAT SPA INCLUSION BANNER */}
          {isShortCoatSpa && (
            <div className="p-4 rounded-2xl bg-white/20 border-2 border-white/40 text-white flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif-title font-bold text-base text-white">
                  Package Inclusions: Fresh Face & Luxury Paw Spa Included
                </h4>
                <p className="text-xs text-[#13253b] font-medium mt-0.5">
                  The Short-Coat Spa already includes both <strong>Fresh Face</strong> and <strong>Luxury Paw Spa</strong> in your package price at no extra charge. They are automatically applied and unselectable below. You may optionally select any additional specialist treatments below!
                </p>
              </div>
            </div>
          )}

          {/* 👑 ULTIMATE DOG SPA INCLUSION & 1-OF-4 SELECTOR BANNER */}
          {isUltimateSpa && (
            <div className="p-5 rounded-2xl bg-white/20 border-2 border-white/40 text-white space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#13253b] text-[11px] font-bold uppercase tracking-wider mb-1">
                    👑 All-Inclusive Luxury Inclusions
                  </div>
                  <h4 className="font-serif-title font-bold text-lg text-white">
                    Fresh Face, Luxury Paw Spa + 1 Specialist Treatment of Your Choice Included
                  </h4>
                  <p className="text-xs text-[#13253b] font-medium mt-1 leading-relaxed">
                    The Ultimate Dog Spa includes <strong>Fresh Face</strong> and <strong>Luxury Paw Spa</strong>, plus your choice of <strong>either Japanese Marshmallow Foam Spa, Thalassotherapy Sea Mud Spa, Japanese Bamboo Charcoal Deep Clean, or Korean Carbonated Spa Bath</strong> at no additional cost! Please choose which one you would like included:
                  </p>
                </div>
              </div>

              {/* 1 of 4 Interactive Selector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                {ULTIMATE_SPECIALIST_CHOICE_IDS.map(choiceId => {
                  const choiceItem = SPECIALIST_SPA_TREATMENTS.find(t => t.id === choiceId);
                  if (!choiceItem) return null;
                  const isChosen = ultimateIncludedTreatment === choiceId;

                  return (
                    <button
                      key={choiceId}
                      type="button"
                      onClick={() => setUltimateIncludedTreatment(choiceId)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isChosen
                          ? 'bg-white text-[#13253b] border-white ring-2 ring-white shadow-md'
                          : 'bg-white/15 border-white/30 text-white hover:bg-white/25'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-lg">{choiceItem.flagEmoji}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isChosen ? 'bg-[#13253b] text-white' : 'bg-white/25 text-white'
                          }`}>
                            {isChosen ? '✓ Included (£0)' : 'Included Option'}
                          </span>
                        </div>
                        <h5 className={`font-serif-title font-bold text-xs leading-tight mb-1 ${
                          isChosen ? 'text-[#13253b]' : 'text-white'
                        }`}>
                          {choiceItem.name}
                        </h5>
                        <p className={`text-[11px] leading-snug line-clamp-2 ${
                          isChosen ? 'text-[#13253b]/80' : 'text-[#13253b] font-medium'
                        }`}>
                          {choiceItem.subtitle || choiceItem.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-current/15 flex items-center justify-between text-[11px] font-bold">
                        <span>{isChosen ? 'Selected for Package' : 'Tap to Choose'}</span>
                        <span>{isChosen ? '✓ £0' : 'Included'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPECIALIST_SPA_TREATMENTS.map((addon, aIdx) => {
              const isIncludedInShortCoat = isShortCoatSpa && SHORT_COAT_INCLUDED_ADDON_IDS.includes(addon.id);
              const isIncludedInUltimateFixed = isUltimateSpa && ULTIMATE_INCLUDED_ADDON_IDS.includes(addon.id);
              const isChosenSpecialistInUltimate = isUltimateSpa && addon.id === ultimateIncludedTreatment;
              const isAlternativeSpecialistInUltimate = isUltimateSpa && ULTIMATE_SPECIALIST_CHOICE_IDS.includes(addon.id) && addon.id !== ultimateIncludedTreatment;

              const isUnselectable = isIncludedInShortCoat || isIncludedInUltimateFixed;
              const isChecked = isUnselectable || isChosenSpecialistInUltimate || paidAddOnIds.includes(addon.id);

              const handleCardClick = () => {
                if (isUnselectable) {
                  return; // Unselectable as requested
                }
                if (isAlternativeSpecialistInUltimate) {
                  // Switch chosen 1-of-4 included treatment
                  setUltimateIncludedTreatment(addon.id);
                  return;
                }
                if (isChosenSpecialistInUltimate) {
                  return; // Already the included choice
                }
                toggleAddOn(addon.id);
              };

              return (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10px' }}
                  transition={{ duration: 0.35, delay: aIdx * 0.04 }}
                  whileHover={!isUnselectable ? { y: -3, transition: { duration: 0.15 } } : {}}
                  onClick={handleCardClick}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isUnselectable
                      ? 'border-white/60 bg-white/25 cursor-not-allowed opacity-90 shadow-xs'
                      : isChosenSpecialistInUltimate
                      ? 'border-white bg-white/35 ring-2 ring-white shadow-md cursor-pointer'
                      : isChecked
                      ? 'border-white bg-white/30 ring-2 ring-white shadow-md cursor-pointer'
                      : 'border-white/30 bg-white/15 hover:bg-white/25 cursor-pointer'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{addon.flagEmoji || '✨'}</span>
                        <h4 className="font-semibold text-white text-sm leading-tight font-serif-title">
                          {addon.name}
                        </h4>
                      </div>

                      {/* Badge / Price Note */}
                      {isIncludedInShortCoat ? (
                        <span className="font-bold text-[11px] text-[#13253b] bg-white px-2 py-0.5 rounded-md border border-white shrink-0">
                          Included in Short Coat Spa
                        </span>
                      ) : isIncludedInUltimateFixed ? (
                        <span className="font-bold text-[11px] text-[#13253b] bg-white px-2 py-0.5 rounded-md border border-white shrink-0">
                          Included in Ultimate Spa
                        </span>
                      ) : isChosenSpecialistInUltimate ? (
                        <span className="font-bold text-[11px] text-[#13253b] bg-white px-2 py-0.5 rounded-md border border-white shrink-0">
                          ✓ Included Choice (£0)
                        </span>
                      ) : isAlternativeSpecialistInUltimate ? (
                        <span className="font-bold text-[11px] text-white bg-white/25 px-2 py-0.5 rounded-md border border-white/30 shrink-0">
                          1 of 4 Included Options
                        </span>
                      ) : (
                        <span className="font-bold text-xs text-[#13253b] bg-white px-2 py-0.5 rounded-md border border-white shrink-0">
                          {addon.priceNote}
                        </span>
                      )}
                    </div>

                    {addon.subtitle && (
                      <div className="text-[11px] font-bold text-white/90 mb-2 pl-7">
                        {addon.subtitle}
                      </div>
                    )}

                    <p className="text-xs text-[#13253b] font-medium pl-7 mb-3 leading-relaxed">
                      {addon.description}
                    </p>

                    {/* Explanatory Note on Included / Unselectable options */}
                    {isIncludedInShortCoat && (
                      <div className="ml-7 mb-2 text-[11px] font-bold text-white bg-white/20 px-2.5 py-1 rounded-lg border border-white/25 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>Included in short coat spa package</span>
                      </div>
                    )}

                    {isIncludedInUltimateFixed && (
                      <div className="ml-7 mb-2 text-[11px] font-bold text-white bg-white/20 px-2.5 py-1 rounded-lg border border-white/25 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>Included in ultimate dog spa package</span>
                      </div>
                    )}

                    {isChosenSpecialistInUltimate && (
                      <div className="ml-7 mb-2 text-[11px] font-bold text-white bg-white/20 px-2.5 py-1 rounded-lg border border-white/25 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>Included in ultimate dog spa package (Your chosen specialist treatment)</span>
                      </div>
                    )}
                  </div>

                  <div className="pl-7 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px]">
                    <span className="text-white/80">
                      {isUnselectable
                        ? 'Package Inclusion'
                        : isChosenSpecialistInUltimate
                        ? 'Included Treatment'
                        : isAlternativeSpecialistInUltimate
                        ? 'Alternative Included Choice'
                        : 'Specialist Treatment'}
                    </span>

                    <span className={`font-bold flex items-center gap-1 ${
                      isChecked ? 'text-white bg-white/30 px-2 py-0.5 rounded' : 'text-white/90'
                    }`}>
                      {isIncludedInShortCoat ? (
                        '✓ Included (Unselectable)'
                      ) : isIncludedInUltimateFixed ? (
                        '✓ Included (Unselectable)'
                      ) : isChosenSpecialistInUltimate ? (
                        '✓ Included Choice (£0)'
                      ) : isAlternativeSpecialistInUltimate ? (
                        '★ Tap to Choose This Instead'
                      ) : isChecked ? (
                        '✓ Added (+£' + addon.basePrice + ')'
                      ) : (
                        '+ Tap to select'
                      )}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

        {/* ======================================================== */}
        {/* 🌟 LIVE ESTIMATE & BOOKING SUMMARY BAR (Populates Form)  */}
        {/* ======================================================== */}
        <div className="sticky bottom-4 z-30 max-w-4xl mx-auto bg-[#8096bb] text-white p-4 sm:p-5 rounded-2xl border-2 border-white shadow-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                  Your Custom Package:
                </span>
                <span className="px-2 py-0.5 bg-white text-[#13253b] text-xs font-bold rounded-md">
                  {currentSizeDef.label}
                </span>
                <span className="px-2 py-0.5 bg-white text-[#13253b] text-xs font-bold rounded-md">
                  {activePackage.name}
                </span>
                {isShortCoatSpa && (
                  <span className="px-2 py-0.5 bg-white/25 text-white text-xs font-bold rounded-md border border-white/30">
                    ✓ Fresh Face & Paw Spa Included
                  </span>
                )}
                {isUltimateSpa && (
                  <span className="px-2 py-0.5 bg-white/25 text-white text-xs font-bold rounded-md border border-white/30">
                    ✓ Face, Paw Spa & {ultimateTreatmentObj?.name.split(' ')[0]} Included
                  </span>
                )}
                {isBathAndBlowDryPackage && includeDeepClean && (
                  <span className="px-2 py-0.5 bg-white text-[#13253b] text-xs font-bold rounded-md">
                    + Deep Clean
                  </span>
                )}
                {paidAddOnIds.length > 0 && (
                  <span className="px-2 py-0.5 bg-white text-[#13253b] text-xs font-bold rounded-md">
                    +{paidAddOnIds.length} Extra Add-on{paidAddOnIds.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              <div className="text-xs text-[#13253b] font-bold">
                Starting Estimate: <strong className="text-2xl text-white font-extrabold tracking-tight">£{totalEstimate}</strong>
                <span className="text-white/80 font-normal text-[11px] ml-1">
                  (Base £{basePackagePrice} {deepCleanPrice > 0 ? `+ Deep Clean £${deepCleanPrice}` : ''} {isShortCoatSpa || isUltimateSpa ? '+ Inclusions £0' : ''} {totalAddOnCost > 0 ? `+ Extras £${totalAddOnCost}` : ''})
                </span>
              </div>
              <p className="text-[11px] text-white/95 font-medium mt-0.5 leading-snug">
                {PRICING_DISCLAIMER}
              </p>
            </div>

            <button
              type="button"
              onClick={handleProceedToInquiry}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#efe0cd] text-[#13253b] rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 shrink-0"
            >
              <span>Book / Enquire with this Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
              <div key={i} className="bg-[#8096bb] p-5 sm:p-6 pb-10 sm:pb-6 rounded-2xl border border-white/40 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <span className="w-6 h-6 rounded-full bg-white text-[#13253b] flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="font-serif-title">{pt.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans pr-2 sm:pr-0">
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
