import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRICING_PACKAGES, ADD_ON_SERVICES, DOG_SIZE_DEFINITIONS } from '../data/pricing';
import { DogSize, PricingPackage } from '../types';
import { Check, Sparkles, Clock, HelpCircle, ArrowRight, ShieldCheck, Heart, Droplets, Smile, Bug } from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage?: (pkg: PricingPackage, size: DogSize) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const [selectedSize, setSelectedSize] = useState<DogSize>('medium');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const navigate = useNavigate();

  const sizes: DogSize[] = ['small', 'medium', 'large', 'giant'];

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getAddOnIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'Smile':
        return <Smile className="w-4 h-4 text-blue-600" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'Heart':
        return <Heart className="w-4 h-4 text-rose-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'Bug':
        return <Bug className="w-4 h-4 text-orange-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-stone-500" />;
    }
  };

  const currentSizeDef = DOG_SIZE_DEFINITIONS[selectedSize];
  const totalAddOnCost = selectedAddOns.reduce((sum, id) => {
    const item = ADD_ON_SERVICES.find(a => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  return (
    <section id="pricing" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2A4736]" />
            Transparent & Honest Rates
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight">
            Current Grooming Packages
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            All services are 1-on-1 private appointments with gentle handling and certified organic botanical shampoos. Select your dog’s size bracket below to see instant pricing estimates.
          </p>
        </div>

        {/* Dog Size Switcher */}
        <div className="mb-14">
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
                    className={`py-3 px-3 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-center ${
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

          {/* Size Details Banner */}
          <div className="max-w-3xl mx-auto mt-3 px-4 py-2 text-center text-xs text-stone-500 flex items-center justify-center gap-1.5">
            <span className="font-semibold text-stone-700">Common {currentSizeDef.label} Breeds:</span>
            <span>{currentSizeDef.examples}</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PRICING_PACKAGES.map((pkg, idx) => {
            const price = pkg.prices[selectedSize];
            const isPopular = pkg.popular;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`relative bg-white rounded-2xl flex flex-col justify-between transition-shadow duration-300 ${
                  isPopular
                    ? 'border-2 border-[#2A4736] shadow-lg ring-4 ring-[#2A4736]/10'
                    : 'border border-stone-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular / Special Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <span
                      className={`px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm whitespace-nowrap inline-flex items-center justify-center leading-none ${
                        isPopular
                          ? 'bg-[#2A4736] text-white ring-2 ring-white'
                          : 'bg-amber-100 text-amber-900 border border-amber-300 ring-2 ring-white'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Card Top */}
                <div className="p-6">
                  <h3 className="text-xl font-serif-title font-bold text-stone-900 mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#2A4736] font-medium mb-4 min-h-8">
                    {pkg.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-stone-100 flex items-baseline gap-1">
                    <span className="text-xs text-stone-500 font-medium">from</span>
                    <span className="text-4xl font-extrabold text-stone-900 tracking-tight">
                      £{price}
                    </span>
                    <span className="text-xs text-stone-500 font-normal">
                      / {selectedSize}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Duration: ~{pkg.durationEstimate}</span>
                  </div>

                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] uppercase font-bold text-stone-400 tracking-wider">
                      Included in service:
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-[#2A4736] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="p-6 pt-0">
                  <div className="mb-3 text-[11px] text-stone-400 italic">
                    Best for: {pkg.recommendedFor}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPackage) {
                        onSelectPackage(pkg, selectedSize);
                      } else {
                        navigate('/contact', {
                          state: {
                            prefilledPackage: pkg.name,
                            prefilledSize: selectedSize,
                            prefilledNotes: `Hi! I'm interested in the ${pkg.name} package for my ${selectedSize}-sized dog.`
                          }
                        });
                      }
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isPopular
                        ? 'bg-[#2A4736] hover:bg-[#1a3325] text-white shadow-sm'
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

        {/* A La Carte & Spa Add-Ons Menu */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Tailored Enhancements
              </div>
              <h3 className="text-2xl font-serif-title font-bold text-stone-900">
                A La Carte Spa Treatments & Coat Upgrades
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Add special therapeutic treatments to any grooming package during your consultation.
              </p>
            </div>

            {selectedAddOns.length > 0 && (
              <div className="bg-amber-50 border border-amber-200/80 px-4 py-2 rounded-xl text-xs flex items-center gap-3">
                <div>
                  <span className="text-amber-900 font-semibold">
                    {selectedAddOns.length} Add-on{selectedAddOns.length > 1 ? 's' : ''} Selected
                  </span>
                  <span className="block text-amber-700 text-[11px]">
                    +£{totalAddOnCost} added to estimate
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAddOns([])}
                  className="text-amber-800 underline hover:text-amber-950 text-[11px]"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADD_ON_SERVICES.map((addon, aIdx) => {
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
                      ? 'border-[#2A4736] bg-[#EBF1ED]/40 ring-2 ring-[#2A4736]/20 shadow-xs'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-2xs">
                        {getAddOnIcon(addon.iconName)}
                      </div>
                      <h4 className="font-semibold text-stone-900 text-sm">
                        {addon.name}
                      </h4>
                    </div>
                    <span className="font-bold text-sm text-[#2A4736] shrink-0">
                      +£{addon.price}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 pl-10 mb-3 leading-relaxed">
                    {addon.description}
                  </p>

                  <div className="pl-10 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 capitalize">Category: {addon.category}</span>
                    <span className={`font-medium ${isChecked ? 'text-[#2A4736]' : 'text-stone-500'}`}>
                      {isChecked ? '✓ Added' : '+ Tap to add'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pricing Policy Disclaimer Notice */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-start gap-3 text-xs text-stone-500 bg-stone-50 p-4 rounded-xl">
            <HelpCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-700 block mb-0.5">Please note regarding baseline prices:</strong>
              The prices listed above reflect well-maintained coats and standard temperament. Severely matted coats requiring extended humane scissoring, or pets requiring two stylists for safe handling, will be discussed and quoted transparently prior to starting the groom. See our{' '}
              <Link to="/terms" className="text-[#2A4736] underline hover:text-[#183123]">
                Terms & Policies
              </Link>{' '}
              for matting guidelines.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
