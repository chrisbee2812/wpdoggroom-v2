import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TERMS_AND_CONDITIONS } from '../data/policies';
import { ShieldCheck, HeartHandshake, FileText, ChevronDown, Check, Droplets, Info } from 'lucide-react';

export const TermsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'product-safety': true,
    'pricing-starting-rates': true,
    'garden-studio-health': true,
    'cancellations': true,
    'gentle-handling': true,
    'collection-pickup': true
  });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    TERMS_AND_CONDITIONS.forEach(item => { next[item.id] = true; });
    setExpandedSections(next);
  };

  const collapseAll = () => {
    const next: Record<string, boolean> = {};
    TERMS_AND_CONDITIONS.forEach(item => { next[item.id] = false; });
    setExpandedSections(next);
  };

  const displayedSections = activeTab === 'all'
    ? TERMS_AND_CONDITIONS
    : TERMS_AND_CONDITIONS.filter(sec => sec.id === activeTab);

  return (
    <section id="terms" className="py-16 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-[#2A4736]" />
            Spa Standards & Policies
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight">
            Terms & Care Guidelines
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Our terms are written to protect pet health, ensure rigorous product suitability, explain transparent starting rates, and preserve a tranquil 1-on-1 garden studio environment.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Foundational Promise Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#2A4736]/20 shadow-xs mb-10 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#EBF1ED] flex items-center justify-center shrink-0 text-[#2A4736]">
              <Droplets className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736]">
                  Our Foundational Ethos
                </span>
              </div>
              <h3 className="text-xl font-serif-title font-bold text-stone-900 mt-1">
                Specialist Bathing & Product Safety First
              </h3>
              <p className="text-sm text-stone-600 mt-1 leading-relaxed font-sans">
                We specialise in bathing, coat care and spa treatments rather than clipping or breed styling. Before introducing products into our spa, we review ingredients, manufacturer guidance and intended use. Treatments are selected with the individual dog and coat in mind.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-[#2A4736] bg-[#EBF1ED] px-4 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
              Safety Reviewed
            </div>
          </motion.div>

          {/* Action Controls & Tab Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#2A4736] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                All Policies
              </button>
              {TERMS_AND_CONDITIONS.map(sec => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveTab(sec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === sec.id
                      ? 'bg-[#2A4736] text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {sec.title.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500 self-end sm:self-auto">
              <button
                type="button"
                onClick={expandAll}
                className="hover:text-stone-900 underline cursor-pointer"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={collapseAll}
                className="hover:text-stone-900 underline cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {displayedSections.map((sec, secIdx) => {
              const isExpanded = expandedSections[sec.id] ?? true;

              return (
                <motion.div
                  key={sec.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10px' }}
                  transition={{ duration: 0.35, delay: secIdx * 0.04 }}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden"
                >
                  <div
                    onClick={() => toggleSection(sec.id)}
                    className="px-6 py-5 flex items-center justify-between cursor-pointer select-none hover:bg-stone-50/70 transition-colors border-b border-stone-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#EBF1ED] text-[#2A4736] font-bold text-xs flex items-center justify-center">
                        {secIdx + 1}
                      </span>
                      <div>
                        <h4 className="text-lg font-serif-title font-bold text-stone-900">
                          {sec.title}
                        </h4>
                        <p className="text-xs text-stone-500">
                          {sec.shortSummary}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 bg-[#EBF1ED] text-[#2A4736]' : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="p-6 space-y-4 bg-white divide-y divide-stone-100">
                      {sec.rules.map((rule, rIdx) => (
                        <div key={rIdx} className={`${rIdx > 0 ? 'pt-4' : ''}`}>
                          <h5 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2A4736]"></span>
                            {rule.heading}
                          </h5>
                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-3.5 font-sans">
                            {rule.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Agreement summary */}
          <div className="mt-10 p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2A4736]" />
              <span>By submitting an inquiry or attending a spa session, owners acknowledge and agree to these standards.</span>
            </div>
            <span className="text-stone-400 font-medium">West Park Dog Spa • Leeds</span>
          </div>
        </div>
      </div>
    </section>
  );
};
