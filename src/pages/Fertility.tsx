import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FERTILITY_TREATMENTS, FERTILITY_DISCLAIMER } from '../data/fertility';
import { FertilityTreatment } from '../types';
import {
  ChevronRight,
  Microscope,
  FlaskConical,
  HeartPulse,
  ScanLine,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Check,
  Cpu
} from 'lucide-react';

export const FertilityPage: React.FC = () => {
  const navigate = useNavigate();

  // Track selected option IDs (e.g., 'cytology-single', 'ai-two-session', 'ultrasound-initial', 'microchip-single')
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    'vaginal-cytology': 'cytology-single',
    'semen-analysis': 'semen-standard',
    'artificial-insemination': 'ai-single',
    'pregnancy-ultrasound': 'ultrasound-initial',
    'microchipping': 'microchip-single'
  });

  // Track checked treatments for multi-service inquiry
  const [selectedTreatmentIds, setSelectedTreatmentIds] = useState<string[]>([]);

  const getTreatmentIcon = (iconName: FertilityTreatment['iconName']) => {
    switch (iconName) {
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-white" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-white" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-white" />;
      case 'ScanLine':
        return <ScanLine className="w-6 h-6 text-white" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-white" />;
    }
  };

  const toggleTreatmentSelection = (treatmentId: string) => {
    setSelectedTreatmentIds(prev =>
      prev.includes(treatmentId)
        ? prev.filter(id => id !== treatmentId)
        : [...prev, treatmentId]
    );
  };

  const selectSubOption = (treatmentId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [treatmentId]: optionId
    }));
    // Ensure treatment is included when user picks a specific sub-option
    setSelectedTreatmentIds(prev => (prev.includes(treatmentId) ? prev : [...prev, treatmentId]));
  };

  const getChosenOption = (treatment: FertilityTreatment) => {
    if (!treatment.options || treatment.options.length === 0) return null;
    const chosenId = selectedOptions[treatment.id];
    return treatment.options.find(o => o.id === chosenId) || treatment.options[0];
  };

  const buildServiceLabels = (ids: string[]) => {
    return ids
      .map(id => {
        const t = FERTILITY_TREATMENTS.find(item => item.id === id);
        if (!t) return null;
        const opt = getChosenOption(t);
        if (t.options && t.options.length > 1 && opt) {
          return `${t.name} — ${opt.label}`;
        }
        return t.name;
      })
      .filter((label): label is string => Boolean(label));
  };

  const calculateTotal = (ids: string[]) => {
    return ids.reduce((sum, id) => {
      const t = FERTILITY_TREATMENTS.find(item => item.id === id);
      if (!t) return sum;
      const opt = getChosenOption(t);
      return sum + (opt ? opt.price : t.basePrice);
    }, 0);
  };

  const handleBookSingleTreatment = (treatment: FertilityTreatment) => {
    const opt = getChosenOption(treatment);
    const serviceLabel =
      treatment.options && treatment.options.length > 1 && opt
        ? `${treatment.name} — ${opt.label}`
        : treatment.name;
    const price = opt ? opt.price : treatment.basePrice;

    navigate('/contact', {
      state: {
        prefilledServiceType: 'fertility',
        prefilledFertilityServices: [serviceLabel],
        prefilledNotes: `Canine Fertility & Microchipping Inquiry:\n• Service: ${serviceLabel} (${treatment.priceNote})\n• Duration: ${treatment.durationEstimate}\n\nPlease let me know your earliest studio availability.`
      }
    });
  };

  const handleProceedCombinedInquiry = () => {
    const labels = buildServiceLabels(selectedTreatmentIds);
    const total = calculateTotal(selectedTreatmentIds);

    navigate('/contact', {
      state: {
        prefilledServiceType: 'fertility',
        prefilledFertilityServices: labels,
        prefilledNotes: `Canine Fertility & Microchipping Inquiry:\n• Selected Services:\n${labels.map(l => `  - ${l}`).join('\n')}\n• Estimated Starting Total: £${total}\n\n*${FERTILITY_DISCLAIMER}`
      }
    });
  };

  const combinedTotal = calculateTotal(selectedTreatmentIds);

  return (
    <div className="min-h-screen py-8 bg-[#efe0cd]">
      {/* Breadcrumb & Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-2 text-xs text-[#2b2520] mb-4 font-medium">
          <Link to="/" className="hover:text-[#13253b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#13253b]" />
          <span className="font-bold text-[#13253b]">Fertility & Microchipping</span>
        </div>

        {/* Hero Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-[#8096bb] rounded-3xl p-8 sm:p-10 border border-white/40 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-white/90 flex items-center gap-2">
              <Microscope className="w-4 h-4 text-white shrink-0" />
              <span>West Park Dog Spa</span>
              <span aria-hidden="true">·</span>
              <span>Private 1-on-1 Fertility & Microchipping Studio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-white leading-tight">
              Canine Fertility, Ultrasound & Microchipping
            </h1>

            <p className="text-[#13253b] font-medium text-sm sm:text-base leading-relaxed font-sans">
              Calm, hygienic reproductive diagnostics, assisted breeding support, and Defra-compliant microchipping in our quiet, temperature-controlled garden studio in West Park, Leeds. From precision vaginal cytology and stud semen analysis to sterile AI, Day 25–30 pregnancy ultrasound scans, and adult or puppy litter microchipping.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Link
              to="/faq"
              className="px-5 py-2.5 rounded-full border border-white/60 text-white hover:bg-white/20 text-xs font-semibold transition-colors text-center whitespace-nowrap"
            >
              Fertility & Chip FAQs
            </Link>
            <Link
              to="/contact"
              state={{ prefilledServiceType: 'fertility' }}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-[#efe0cd] text-[#13253b] text-xs font-bold transition-colors shadow-sm text-center whitespace-nowrap"
            >
              Book Appointment
            </Link>
          </div>
        </motion.div>

        {/* Studio Standards Highlight Strip */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#8096bb] rounded-2xl p-4 border border-white/40 text-white flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif-title font-bold text-sm text-white">Sterile Single-Use Equipment</h3>
              <p className="text-xs text-[#13253b] font-medium mt-0.5 leading-relaxed">
                Fresh sterile swabs, catheters, collection cones, and microchip implanters for every dog with thorough studio sanitisation between visits.
              </p>
            </div>
          </div>

          <div className="bg-[#8096bb] rounded-2xl p-4 border border-white/40 text-white flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Microscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif-title font-bold text-sm text-white">Diagnostics & Defra Registration</h3>
              <p className="text-xs text-[#13253b] font-medium mt-0.5 leading-relaxed">
                On-site Diff-Quik cytology, warm-stage motility checks, ultrasound scanning, and official UK Defra-compliant microchip registration.
              </p>
            </div>
          </div>

          <div className="bg-[#8096bb] rounded-2xl p-4 border border-white/40 text-white flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif-title font-bold text-sm text-white">Calm 1-on-1 Garden Studio</h3>
              <p className="text-xs text-[#13253b] font-medium mt-0.5 leading-relaxed">
                No noisy waiting rooms or kennel stress—keeping maiden bitches, stud dogs, and young 8-week puppy litters relaxed and comfortable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Treatments Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#af8967]">
            Canine Fertility & Microchipping Services
          </h2>
          <p className="text-xs sm:text-sm text-[#2b2520] mt-1.5 font-medium">
            Select a single service directly to inquire, or tick multiple treatments below to send a combined breeding, scan, or microchipping inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FERTILITY_TREATMENTS.map((treatment, idx) => {
            const isSelected = selectedTreatmentIds.includes(treatment.id);
            const chosenOption = getChosenOption(treatment);
            const hasMultipleOptions = Boolean(treatment.options && treatment.options.length > 1);
            const isOddLastCard =
              idx === FERTILITY_TREATMENTS.length - 1 && FERTILITY_TREATMENTS.length % 2 === 1;

            return (
              <motion.article
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`bg-[#8096bb] rounded-3xl p-6 sm:p-8 pb-9 sm:pb-8 flex flex-col justify-between transition-all duration-200 border text-white ${
                  isOddLastCard ? 'lg:col-span-2' : ''
                } ${
                  isSelected
                    ? 'ring-4 ring-white border-white shadow-xl'
                    : 'border-white/40 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Header Row: Clean Unboxed Metadata + Multi-Select Checkbox */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                        {getTreatmentIcon(treatment.iconName)}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/90 flex items-center gap-1.5">
                          <span>{treatment.number}.</span>
                          <span>{treatment.categoryLabel}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-white leading-snug">
                          {treatment.name}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleTreatmentSelection(treatment.id)}
                      className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-white text-[#13253b] shadow-xs'
                          : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Added</span>
                        </>
                      ) : (
                        <span>+ Add to Inquiry</span>
                      )}
                    </button>
                  </div>

                  {/* Subtitle / Short Name if different */}
                  <div className="text-xs font-semibold text-white/90">
                    {treatment.shortName} · <span className="text-white">{treatment.tagline}</span>
                  </div>

                  {/* Price & Duration Block */}
                  <div className="bg-white/20 rounded-2xl p-4 border border-white/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/85 block">
                        Starting Rate
                      </span>
                      <span className="text-lg sm:text-xl font-black text-white font-sans tabular-nums">
                        {treatment.priceNote}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#13253b] bg-white/90 px-3 py-1.5 rounded-xl self-start sm:self-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#8096bb]" />
                      <span className="tabular-nums">{treatment.durationEstimate}</span>
                    </div>
                  </div>

                  {/* Option Selector for AI (Single vs 2-Session) & Ultrasound (Initial vs Re-scan) */}
                  {hasMultipleOptions && treatment.options && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 block">
                        Choose Option for Your Inquiry:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {treatment.options.map(opt => {
                          const isOptChosen = chosenOption?.id === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => selectSubOption(treatment.id, opt.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                isOptChosen
                                  ? 'bg-white text-[#13253b] border-white font-bold shadow-xs'
                                  : 'bg-white/15 border-white/30 text-white hover:bg-white/25 font-medium'
                              }`}
                            >
                              <div className="text-xs leading-tight">{opt.label}</div>
                              <div className={`text-[11px] mt-0.5 tabular-nums ${isOptChosen ? 'text-[#8096bb] font-extrabold' : 'text-white/85'}`}>
                                £{opt.price}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Full Description */}
                  <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans">
                    {treatment.description}
                  </p>

                  {/* Included in Service List */}
                  <div className="pt-2 space-y-2 border-t border-white/20">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white block">
                      Included in Service:
                    </span>
                    <ul className="space-y-2 text-xs text-[#13253b] font-medium">
                      {treatment.includedInService.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="pt-5 mt-5 border-t border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleBookSingleTreatment(treatment)}
                    className="w-full py-3 px-5 rounded-xl bg-white hover:bg-[#efe0cd] text-[#13253b] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      Inquire About {treatment.name}
                      {hasMultipleOptions && chosenOption ? ` (${chosenOption.label})` : ''}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Combined Fertility Inquiry Bar (Shown when user selects 1 or more treatments) */}
        {selectedTreatmentIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#152438] text-white rounded-3xl p-6 sm:p-8 border border-[#8096bb]/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#af8967]">
                Combined Fertility & Microchipping Inquiry ({selectedTreatmentIds.length} Selected)
              </div>
              <div className="text-base sm:text-lg font-serif-title font-bold text-white">
                {buildServiceLabels(selectedTreatmentIds).join(' + ')}
              </div>
              <div className="text-xs text-stone-300 font-medium">
                Estimated Starting Total: <strong className="text-white text-sm tabular-nums">from £{combinedTotal}</strong> · {FERTILITY_DISCLAIMER}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setSelectedTreatmentIds([])}
                className="px-4 py-2.5 rounded-xl border border-white/30 text-stone-200 hover:bg-white/10 text-xs font-semibold cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleProceedCombinedInquiry}
                className="flex-1 md:flex-initial px-6 py-3 rounded-xl bg-white hover:bg-[#efe0cd] text-[#13253b] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Contact Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Bottom Disclaimer & Guidance Card */}
        <div className="bg-[#8096bb] rounded-3xl p-6 sm:p-8 pb-10 sm:pb-8 border border-white/40 shadow-sm text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif-title font-bold text-xl text-white">
              Booking a breeding consultation, scan, or puppy litter microchipping?
            </h3>
            <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed">
              {FERTILITY_DISCLAIMER} Tell us your bitch’s cycle day, mating dates, stud dog details, or how many puppies need microchipping in our consultation form and we will schedule the ideal 1-on-1 slot.
            </p>
          </div>
          <Link
            to="/contact"
            state={{ prefilledServiceType: 'fertility' }}
            className="shrink-0 px-6 py-3 rounded-full bg-white hover:bg-[#efe0cd] text-[#13253b] text-xs font-bold transition-colors shadow-sm whitespace-nowrap"
          >
            Submit Fertility & Chip Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
};
