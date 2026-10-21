import React, { useState, useEffect } from 'react';
import { DogSize, InquiryFormData } from '../types';
import {
  DOG_SIZE_DEFINITIONS,
  SPECIALIST_SPA_TREATMENTS,
  DEEP_CLEAN_UPGRADE,
  PRICING_PACKAGES,
  SHORT_COAT_INCLUDED_ADDON_NAMES,
  ULTIMATE_INCLUDED_ADDON_NAMES,
  ULTIMATE_SPECIALIST_CHOICE_NAMES,
  PRICING_DISCLAIMER
} from '../data/pricing';
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock, Droplets, Heart, Sparkles, Check, Info } from 'lucide-react';

interface InquiryFormProps {
  prefilledPackage?: string;
  prefilledSize?: DogSize;
  prefilledBreed?: string;
  prefilledNotes?: string;
  prefilledUpgrades?: string[];
  prefilledDeepClean?: boolean;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  prefilledPackage,
  prefilledSize,
  prefilledBreed,
  prefilledNotes,
  prefilledUpgrades,
  prefilledDeepClean
}) => {
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState(prefilledBreed || '');
  const [dogAge, setDogAge] = useState('');
  const [weightCategory, setWeightCategory] = useState<DogSize>(prefilledSize || 'medium');
  const [packageInterest, setPackageInterest] = useState<string>(prefilledPackage || 'Fresh & Fluffy');
  const [includeDeepClean, setIncludeDeepClean] = useState<boolean>(Boolean(prefilledDeepClean));
  const [selectedSpaUpgrades, setSelectedSpaUpgrades] = useState<string[]>(prefilledUpgrades || []);
  const [ultimateChoice, setUltimateChoice] = useState<string>('Japanese Marshmallow Foam Spa');
  const [coatCondition, setCoatCondition] = useState<'good' | 'heavy-shedding' | 'dry-skin' | 'sensitive' | 'unsure'>('good');
  const [temperament, setTemperament] = useState<string[]>([]);
  const [preferredContact, setPreferredContact] = useState<'phone' | 'text' | 'email'>('text');
  const [preferredDays, setPreferredDays] = useState<string[]>(['Tue', 'Thu']);
  const [message, setMessage] = useState(prefilledNotes || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InquiryFormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isShortCoat = packageInterest === 'The Short-Coat Spa';
  const isUltimate = packageInterest === 'The Ultimate Dog Spa';
  const isBathAndBlowDry =
    packageInterest === 'Fresh & Fluffy' ||
    packageInterest === 'Therapeutic Bath & Blow-Out';

  useEffect(() => {
    if (prefilledPackage) setPackageInterest(prefilledPackage);
    if (prefilledSize) setWeightCategory(prefilledSize);
    if (prefilledBreed) setBreed(prefilledBreed);
    if (prefilledNotes) setMessage(prefilledNotes);
    if (prefilledUpgrades && prefilledUpgrades.length > 0) {
      const matchedChoice = ULTIMATE_SPECIALIST_CHOICE_NAMES.find(choiceName =>
        prefilledUpgrades.some(u => u.includes(choiceName))
      );
      if (matchedChoice) {
        setUltimateChoice(matchedChoice);
      }
      const cleanUpgrades = prefilledUpgrades.map(u => u.replace(/\s*\([^)]*\)/g, '').trim());
      setSelectedSpaUpgrades(cleanUpgrades);
    }
    if (typeof prefilledDeepClean === 'boolean') {
      setIncludeDeepClean(prefilledDeepClean);
    }
  }, [prefilledPackage, prefilledSize, prefilledBreed, prefilledNotes, prefilledUpgrades, prefilledDeepClean]);

  const temperamentOptions = [
    'Friendly & Relaxed',
    'Nervous with loud blowers',
    'Sensitive around paws/feet',
    'Shy with new environments',
    'Elderly / Needs gentle pace',
    'Young puppy / first bath'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleTemperament = (trait: string) => {
    setTemperament(prev =>
      prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]
    );
  };

  const toggleSpaUpgrade = (treatmentName: string) => {
    // If Short Coat Spa, Fresh Face and Luxury Paw Spa are included & unselectable
    if (isShortCoat && SHORT_COAT_INCLUDED_ADDON_NAMES.includes(treatmentName)) {
      return;
    }
    // If Ultimate Dog Spa, Fresh Face and Luxury Paw Spa are included & unselectable
    if (isUltimate && ULTIMATE_INCLUDED_ADDON_NAMES.includes(treatmentName)) {
      return;
    }
    // If Ultimate Dog Spa and clicked one of the 4 specialist choices:
    if (isUltimate && ULTIMATE_SPECIALIST_CHOICE_NAMES.includes(treatmentName)) {
      setUltimateChoice(treatmentName);
      return;
    }

    setSelectedSpaUpgrades(prev =>
      prev.includes(treatmentName)
        ? prev.filter(t => t !== treatmentName)
        : [...prev, treatmentName]
    );
  };

  const toggleDay = (day: string) => {
    setPreferredDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  // Price estimate calculation
  const foundPkg = PRICING_PACKAGES.find(p => p.name === packageInterest);
  const basePrice = foundPkg ? foundPkg.prices[weightCategory] : 0;
  const deepCleanAdd = (isBathAndBlowDry && includeDeepClean) ? DEEP_CLEAN_UPGRADE.price : 0;

  // Paid upgrades (excluding free inclusions)
  const paidUpgrades = selectedSpaUpgrades.filter(name => {
    if (isShortCoat && SHORT_COAT_INCLUDED_ADDON_NAMES.includes(name)) return false;
    if (isUltimate && (ULTIMATE_INCLUDED_ADDON_NAMES.includes(name) || name === ultimateChoice)) return false;
    return true;
  });

  const upgradesCost = paidUpgrades.reduce((sum, name) => {
    const item = SPECIALIST_SPA_TREATMENTS.find(t => t.name === name);
    return sum + (item ? item.basePrice : 0);
  }, 0);

  const estimatedTotal = basePrice + deepCleanAdd + upgradesCost;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!ownerName.trim()) newErrors.ownerName = 'Please enter your name.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email address is required.';
    if (!phone.trim() || phone.length < 7) newErrors.phone = 'Valid phone number is required.';
    if (!dogName.trim()) newErrors.dogName = 'Please enter your dog’s name.';
    if (!breed.trim()) newErrors.breed = 'Please tell us your dog’s breed or mix.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const inclusionsList = isShortCoat
      ? ['Fresh Face (Included in Short Coat Spa)', 'Luxury Paw Spa (Included in Short Coat Spa)']
      : isUltimate
      ? ['Fresh Face (Included in Ultimate Dog Spa)', 'Luxury Paw Spa (Included in Ultimate Dog Spa)', `${ultimateChoice} (Included Choice in Ultimate Dog Spa)`]
      : [];

    const finalRecordedUpgrades = [
      ...inclusionsList,
      ...paidUpgrades
    ];

    setTimeout(() => {
      const newInquiry: InquiryFormData = {
        id: `WPS-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        ownerName,
        email,
        phone,
        dogName,
        breed,
        dogAge,
        weightCategory,
        packageInterest,
        includeDeepClean: isBathAndBlowDry && includeDeepClean,
        selectedSpaUpgrades: finalRecordedUpgrades,
        coatCondition,
        temperament,
        preferredContact,
        preferredDays,
        message,
        status: 'new'
      };

      try {
        const stored = JSON.parse(localStorage.getItem('west_park_spa_inquiries') || '[]');
        localStorage.setItem('west_park_spa_inquiries', JSON.stringify([newInquiry, ...stored]));
      } catch (err) {
        console.error('Storage error', err);
      }

      setSubmittedData(newInquiry);
      setIsSubmitting(false);
    }, 800);
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setOwnerName('');
    setEmail('');
    setPhone('');
    setDogName('');
    setBreed('');
    setDogAge('');
    setMessage('');
    setSelectedSpaUpgrades([]);
    setIncludeDeepClean(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Important Info Cards in #8096bb */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Card */}
          <div className="bg-[#8096bb] rounded-3xl p-6 sm:p-8 border border-white/40 shadow-sm text-white space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-2 border border-white/20">
                <Droplets className="w-3.5 h-3.5 text-white" />
                Garden Studio
              </div>
              <h3 className="font-serif-title font-bold text-2xl sm:text-3xl text-white">
                West Park Luxury Dog Spa
              </h3>
              <p className="text-xs text-white/90 font-medium">
                Specialist Bathing • Skin & Coat Care • Spa Treatments
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans">
              A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We specialise in coat & skin care, therapeutic bathing, deshedding and specialist spa treatments.
            </p>

            <div className="space-y-3 pt-2 border-t border-white/20 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Location</strong>
                  <span className="text-[#13253b] font-medium">Private Garden Studio, Spen Lane area, West Park, Leeds LS16</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Opening Hours</strong>
                  <span className="text-[#13253b] font-medium">Tuesday – Saturday • 8:30am – 4:30pm (Strictly by appointment)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Telephone / Text</strong>
                  <span className="text-[#13253b] font-medium">0113 320 8492 • 07842 918 204</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Direct Email</strong>
                  <span className="text-[#13253b] font-medium">hello@westparkdogspa.co.uk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Transparency Card */}
          <div className="bg-[#8096bb] rounded-3xl p-6 border border-white/40 shadow-sm text-white space-y-3">
            <h4 className="font-serif-title font-bold text-lg text-white">
              Starting Price Policy
            </h4>
            <p className="text-xs text-[#13253b] font-medium leading-relaxed">
              {PRICING_DISCLAIMER}
            </p>
            <p className="text-xs text-[#13253b] font-medium leading-relaxed">
              We specialise in bathing, coat care and spa treatments rather than clipping or breed styling.
            </p>
          </div>

          {/* Live Custom Package Preview Card */}
          {basePrice > 0 && (
            <div className="bg-[#8096bb] rounded-3xl p-6 pb-7 border-2 border-white shadow-md text-white space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-title font-bold text-lg text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-white" />
                  Your Estimated Package
                </h4>
                <span className="text-xs font-bold bg-white text-[#13253b] px-2.5 py-0.5 rounded-full">
                  Live Estimate
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#13253b] font-medium bg-white/20 p-3.5 pb-4 rounded-xl border border-white/25">
                <div className="flex justify-between items-center text-white font-bold">
                  <span>{packageInterest} ({DOG_SIZE_DEFINITIONS[weightCategory].label})</span>
                  <span>£{basePrice}</span>
                </div>

                {isBathAndBlowDry && includeDeepClean && (
                  <div className="flex justify-between items-center text-white">
                    <span>+ Deep Clean Wash Upgrade</span>
                    <span>+£{DEEP_CLEAN_UPGRADE.price}</span>
                  </div>
                )}

                {selectedSpaUpgrades.map(name => {
                  const tr = SPECIALIST_SPA_TREATMENTS.find(t => t.name === name);
                  return (
                    <div key={name} className="flex justify-between items-center text-white">
                      <span>+ {name}</span>
                      <span>+£{tr ? tr.basePrice : 0}</span>
                    </div>
                  );
                })}

                <div className="pt-2 mt-2 border-t border-white/30 flex justify-between items-center text-sm font-extrabold text-white">
                  <span>Estimated Starting Total:</span>
                  <span className="text-xl font-black">from £{estimatedTotal}</span>
                </div>

                <p className="text-[10px] text-white/90 font-medium pt-1 leading-snug">
                  {PRICING_DISCLAIMER}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Inquiry Form in #8096bb card */}
        <div className="lg:col-span-7">
          <div className="bg-[#8096bb] rounded-3xl p-6 sm:p-8 border border-white/40 shadow-sm text-white">
            {submittedData ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white text-[#13253b] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="font-serif-title text-2xl font-bold text-white">
                  Consultation Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#13253b] font-medium max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{submittedData.ownerName}</strong>. We have logged your request for <strong className="text-white">{submittedData.dogName}</strong> ({submittedData.packageInterest}). Reference: <span className="font-mono font-bold text-white bg-white/20 px-2 py-0.5 rounded">{submittedData.id}</span>.
                </p>

                <div className="max-w-md mx-auto bg-white/20 rounded-2xl p-4 text-left text-xs space-y-2 border border-white/30 text-white">
                  <div className="font-bold border-b border-white/20 pb-1 text-white">
                    Confirmed Selections:
                  </div>
                  <div className="text-[#13253b] font-bold">
                    • Dog: {submittedData.dogName} ({submittedData.breed}, {submittedData.weightCategory})
                  </div>
                  <div className="text-[#13253b] font-bold">
                    • Base Package: {submittedData.packageInterest}
                  </div>
                  {submittedData.includeDeepClean && (
                    <div className="text-[#13253b] font-bold">
                      • Optional Upgrade: Deep Clean Clarifying Wash (+£5)
                    </div>
                  )}
                  {submittedData.selectedSpaUpgrades && submittedData.selectedSpaUpgrades.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-white/20">
                      <div className="text-white font-bold">
                        • Spa Inclusions & Upgrades:
                      </div>
                      <div className="text-[#13253b] font-medium pl-2 space-y-0.5">
                        {submittedData.selectedSpaUpgrades.map((item, idx) => (
                          <div key={idx}>✓ {item}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-[#13253b] font-bold">
                    • Coat Condition: {submittedData.coatCondition}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-6 py-2.5 bg-white text-[#13253b] rounded-full text-xs font-bold hover:bg-[#efe0cd] transition-all cursor-pointer shadow-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif-title font-bold text-2xl sm:text-3xl text-white">
                    Spa Consultation & Booking Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#13253b] font-medium mt-1 font-sans">
                    Tell us about your dog. We evaluate every dog individually to ensure suitable products and a calm, 1-on-1 environment.
                  </p>
                </div>

                {/* Owner Information */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                    1. Owner Contact Details
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-white mb-1">
                        Your Full Name <span className="text-rose-300">*</span>
                      </label>
                      <input
                        type="text"
                        value={ownerName}
                        onChange={e => setOwnerName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-3.5 py-2.5 bg-white rounded-xl border text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white ${
                          errors.ownerName ? 'border-rose-400 ring-1 ring-rose-400' : 'border-white/40'
                        }`}
                      />
                      {errors.ownerName && (
                        <p className="text-[11px] text-rose-200 mt-1">{errors.ownerName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Email Address <span className="text-rose-300">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className={`w-full px-3.5 py-2.5 bg-white rounded-xl border text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white ${
                          errors.email ? 'border-rose-400 ring-1 ring-rose-400' : 'border-white/40'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-200 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Phone Number (UK) <span className="text-rose-300">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="07123 456789 or 0113 320 8492"
                        className={`w-full px-3.5 py-2.5 bg-white rounded-xl border text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white ${
                          errors.phone ? 'border-rose-400 ring-1 ring-rose-400' : 'border-white/40'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-200 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-white mb-1">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['text', 'phone', 'email'] as const).map(method => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPreferredContact(method)}
                            className={`py-2 px-2 rounded-xl text-xs capitalize font-bold border transition-all cursor-pointer ${
                              preferredContact === method
                                ? 'bg-white text-[#13253b] border-white shadow-2xs'
                                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                            }`}
                          >
                            {method === 'text' ? 'SMS / Text' : method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dog Details */}
                <div className="space-y-4 pt-4 border-t border-white/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                    2. Dog Details & Size Bracket
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Dog's Name <span className="text-rose-300">*</span>
                      </label>
                      <input
                        type="text"
                        value={dogName}
                        onChange={e => setDogName(e.target.value)}
                        placeholder="e.g. Buster"
                        className={`w-full px-3.5 py-2.5 bg-white rounded-xl border text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white ${
                          errors.dogName ? 'border-rose-400 ring-1 ring-rose-400' : 'border-white/40'
                        }`}
                      />
                      {errors.dogName && (
                        <p className="text-[11px] text-rose-200 mt-1">{errors.dogName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Breed or Mix <span className="text-rose-300">*</span>
                      </label>
                      <input
                        type="text"
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                        placeholder="e.g. French Bulldog, Pug, Lab..."
                        className={`w-full px-3.5 py-2.5 bg-white rounded-xl border text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white ${
                          errors.breed ? 'border-rose-400 ring-1 ring-rose-400' : 'border-white/40'
                        }`}
                      />
                      {errors.breed && (
                        <p className="text-[11px] text-rose-200 mt-1">{errors.breed}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Age / Puppy
                      </label>
                      <input
                        type="text"
                        value={dogAge}
                        onChange={e => setDogAge(e.target.value)}
                        placeholder="e.g. 2 years or 5 months"
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-white/40 text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      Dog Size Bracket
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['small', 'medium', 'large'] as DogSize[]).map(size => {
                        const def = DOG_SIZE_DEFINITIONS[size];
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setWeightCategory(size)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              weightCategory === size
                                ? 'bg-white text-[#13253b] border-white shadow-2xs font-bold ring-2 ring-white'
                                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                            }`}
                          >
                            <div className="font-semibold text-xs">{def.label}</div>
                            <div className={`text-[10px] truncate ${weightCategory === size ? 'text-[#13253b]/80' : 'text-white/80'}`}>
                              {def.weight}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Service of Interest & Upgrades */}
                <div className="space-y-4 pt-4 border-t border-white/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                    3. Spa Package & Specialist Upgrades
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Package of Interest
                      </label>
                      <select
                        value={packageInterest}
                        onChange={e => setPackageInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-white/40 text-sm text-[#13253b] focus:outline-none focus:ring-2 focus:ring-white font-medium"
                      >
                        <optgroup label="🫧 Bath & Blow-Dry Packages">
                          <option value="Fresh & Fluffy">Fresh & Fluffy (from £25)</option>
                          <option value="Therapeutic Bath & Blow-Out">Therapeutic Bath & Blow-Out (from £35)</option>
                        </optgroup>
                        <optgroup label="👑 Signature Spa Experiences">
                          <option value="The Short-Coat Spa">The Short-Coat Spa (from £40)</option>
                          <option value="The Ultimate Dog Spa">The Ultimate Dog Spa (from £50)</option>
                        </optgroup>
                        <optgroup label="🐶 Puppy Care">
                          <option value="Puppy’s First Spa 🐶">Puppy’s First Spa 🐶 (from £25)</option>
                        </optgroup>
                        <option value="General Consultation / Advice">General Consultation / Advice</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Current Coat & Skin Condition
                      </label>
                      <select
                        value={coatCondition}
                        onChange={e => setCoatCondition(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-white/40 text-sm text-[#13253b] focus:outline-none focus:ring-2 focus:ring-white font-medium"
                      >
                        <option value="good">Well-maintained coat / regular upkeep</option>
                        <option value="heavy-shedding">Heavy shedding / loose dead coat</option>
                        <option value="dry-skin">Dry, itchy, or flaky skin</option>
                        <option value="sensitive">Sensitive skin / facial fold redness</option>
                        <option value="unsure">Unsure / would like specialist evaluation</option>
                      </select>
                    </div>
                  </div>

                  {/* 🧼 DEDICATED OPTIONAL EXTRA: DEEP CLEAN WASH UPGRADE (+£5 to Bath & Blow-Dry) */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    isBathAndBlowDry
                      ? includeDeepClean
                        ? 'bg-white/30 border-white ring-2 ring-white'
                        : 'bg-white/15 border-white/30 hover:bg-white/20 cursor-pointer'
                      : 'bg-white/10 border-white/20 opacity-75'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <input
                          type="checkbox"
                          id="deepCleanOption"
                          disabled={!isBathAndBlowDry}
                          checked={includeDeepClean && isBathAndBlowDry}
                          onChange={e => setIncludeDeepClean(e.target.checked)}
                          className="w-4 h-4 rounded text-[#8096bb] focus:ring-white border-white cursor-pointer disabled:cursor-not-allowed"
                        />
                      </div>
                      <label htmlFor="deepCleanOption" className="cursor-pointer block text-xs">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-sm">
                            Deep Clean Clarifying Wash Upgrade
                          </span>
                          <span className="font-bold bg-white text-[#13253b] text-[11px] px-2 py-0.5 rounded-full">
                            Add £5 to Bath & Blow-Dry
                          </span>
                        </div>
                        <p className="text-xs text-[#13253b] font-medium mt-1 leading-relaxed">
                          The additional £5 is for an extra deep-cleansing stage, using specialist products to help remove excess dirt, grease and product build-up from the coat before conditioning and blow-dry.
                        </p>
                        {!isBathAndBlowDry && (
                          <p className="text-[11px] text-white/80 font-medium mt-1 italic">
                            (Optional extra available when a Bath & Blow-Dry package is selected above)
                          </p>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* 🌟 SHORT COAT SPA INCLUSION BANNER IN FORM */}
                  {isShortCoat && (
                    <div className="p-3.5 rounded-2xl bg-white/20 border border-white/40 text-white flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">
                          Fresh Face & Luxury Paw Spa Included
                        </div>
                        <p className="text-[11px] text-[#13253b] font-medium mt-0.5 leading-snug">
                          The Short-Coat Spa already includes both <strong>Fresh Face</strong> and <strong>Luxury Paw Spa</strong> at no extra cost. They are automatically applied and unselectable below.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 👑 ULTIMATE DOG SPA INCLUSION BANNER & 1-OF-4 SELECTOR */}
                  {isUltimate && (
                    <div className="p-4 rounded-2xl bg-white/20 border border-white/40 text-white space-y-3">
                      <div className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white text-[#13253b] text-[10px] font-bold uppercase tracking-wider mb-1">
                            👑 Included with Ultimate Dog Spa
                          </div>
                          <div className="text-xs font-bold text-white">
                            Fresh Face, Luxury Paw Spa + 1 Specialist Treatment of Your Choice Included
                          </div>
                          <p className="text-[11px] text-[#13253b] font-medium mt-0.5 leading-snug">
                            Please choose which specialist treatment you would like included in your Ultimate Dog Spa:
                          </p>
                        </div>
                      </div>

                      {/* 1 of 4 Interactive Selector */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ULTIMATE_SPECIALIST_CHOICE_NAMES.map(choiceName => {
                          const item = SPECIALIST_SPA_TREATMENTS.find(t => t.name === choiceName);
                          const isChosen = ultimateChoice === choiceName;

                          return (
                            <button
                              key={choiceName}
                              type="button"
                              onClick={() => setUltimateChoice(choiceName)}
                              className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                                isChosen
                                  ? 'bg-white text-[#13253b] border-white font-bold ring-2 ring-white shadow-xs'
                                  : 'bg-white/15 border-white/30 text-white hover:bg-white/25 font-medium'
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <span>{item?.flagEmoji || '✨'}</span>
                                <span className="leading-tight">{choiceName}</span>
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ml-1.5 ${
                                isChosen ? 'bg-[#13253b] text-white' : 'bg-white/20 text-white'
                              }`}>
                                {isChosen ? '✓ Included (£0)' : 'Select'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Specialist Spa Upgrades Checkboxes */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-white">
                        Specialist Spa Treatments & Upgrades
                      </label>
                      {paidUpgrades.length > 0 && (
                        <span className="text-[11px] text-white/90 font-bold">
                          {paidUpgrades.length} extra selected (+£{upgradesCost})
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SPECIALIST_SPA_TREATMENTS.map(upgrade => {
                        const isIncludedInShortCoat = isShortCoat && SHORT_COAT_INCLUDED_ADDON_NAMES.includes(upgrade.name);
                        const isIncludedInUltimateFixed = isUltimate && ULTIMATE_INCLUDED_ADDON_NAMES.includes(upgrade.name);
                        const isChosenSpecialistInUltimate = isUltimate && upgrade.name === ultimateChoice;
                        const isAlternativeSpecialistInUltimate = isUltimate && ULTIMATE_SPECIALIST_CHOICE_NAMES.includes(upgrade.name) && upgrade.name !== ultimateChoice;

                        const isUnselectable = isIncludedInShortCoat || isIncludedInUltimateFixed;
                        const isSelected = isUnselectable || isChosenSpecialistInUltimate || paidUpgrades.includes(upgrade.name);

                        // If unselectable (Fresh Face & Paw Spa in Short Coat or Ultimate)
                        if (isUnselectable) {
                          return (
                            <button
                              key={upgrade.id}
                              type="button"
                              disabled={true}
                              className="p-2.5 rounded-xl border text-left flex flex-col gap-1 text-xs bg-white/25 border-white/50 text-white cursor-not-allowed opacity-90 shadow-2xs"
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="flex items-center gap-1.5 font-bold">
                                  <span>{upgrade.flagEmoji}</span>
                                  <span>{upgrade.name}</span>
                                </span>
                                <span className="font-bold text-[10px] bg-white text-[#13253b] px-2 py-0.5 rounded">
                                  Included (£0)
                                </span>
                              </div>
                              <div className="text-[10px] text-white/90 font-medium flex items-center gap-1">
                                <Check className="w-3 h-3 text-white" />
                                <span>
                                  {isIncludedInShortCoat
                                    ? 'Included in short coat spa package'
                                    : 'Included in ultimate dog spa package'}
                                </span>
                              </div>
                            </button>
                          );
                        }

                        // If chosen specialist treatment in Ultimate Dog Spa
                        if (isChosenSpecialistInUltimate) {
                          return (
                            <button
                              key={upgrade.id}
                              type="button"
                              onClick={() => {}}
                              className="p-2.5 rounded-xl border text-left flex flex-col gap-1 text-xs bg-white text-[#13253b] border-white ring-2 ring-white shadow-xs font-bold cursor-default"
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="flex items-center gap-1.5">
                                  <span>{upgrade.flagEmoji}</span>
                                  <span>{upgrade.name}</span>
                                </span>
                                <span className="font-bold text-[10px] bg-[#13253b] text-white px-2 py-0.5 rounded">
                                  ✓ Included Choice (£0)
                                </span>
                              </div>
                              <div className="text-[10px] text-[#13253b]/80 font-medium flex items-center gap-1">
                                <Check className="w-3 h-3 text-[#13253b]" />
                                <span>Included in ultimate dog spa package</span>
                              </div>
                            </button>
                          );
                        }

                        // If alternative specialist treatment in Ultimate Dog Spa (clickable to switch)
                        if (isAlternativeSpecialistInUltimate) {
                          return (
                            <button
                              key={upgrade.id}
                              type="button"
                              onClick={() => setUltimateChoice(upgrade.name)}
                              className="p-2.5 rounded-xl border text-left flex flex-col gap-1 text-xs bg-white/15 border-white/30 text-white hover:bg-white/25 cursor-pointer font-medium transition-all"
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="flex items-center gap-1.5">
                                  <span>{upgrade.flagEmoji}</span>
                                  <span>{upgrade.name}</span>
                                </span>
                                <span className="font-bold text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded">
                                  1 of 4 Included
                                </span>
                              </div>
                              <div className="text-[10px] text-white/80">
                                Tap to choose this as your included treatment
                              </div>
                            </button>
                          );
                        }

                        // Regular add-ons (or other packages)
                        return (
                          <button
                            key={upgrade.id}
                            type="button"
                            onClick={() => toggleSpaUpgrade(upgrade.name)}
                            className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white text-[#13253b] border-white font-bold ring-2 ring-white shadow-xs'
                                : 'bg-white/20 border-white/30 text-white hover:bg-white/30 font-medium'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span>{upgrade.flagEmoji}</span>
                              <span>{upgrade.name}</span>
                            </span>
                            <span className={`font-bold text-[11px] shrink-0 ml-1.5 px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-[#13253b] text-white' : 'bg-white/30 text-white'
                            }`}>
                              {isSelected ? '✓ ' + upgrade.priceNote : upgrade.priceNote}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sensitivities & Notes */}
                <div className="space-y-4 pt-4 border-t border-white/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                    4. Temperament & Notes
                  </span>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      Temperament / Handling Notes (select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {temperamentOptions.map(trait => {
                        const isSelected = temperament.includes(trait);
                        return (
                          <button
                            key={trait}
                            type="button"
                            onClick={() => toggleTemperament(trait)}
                            className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white text-[#13253b] font-bold ring-2 ring-white'
                                : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                            }`}
                          >
                            {trait}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Preferred Days of the Week
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {daysOfWeek.map(day => {
                        const isSelected = preferredDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white text-[#13253b] font-bold ring-2 ring-white'
                                : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 🌟 INQUIRY SUMMARY SECTION (Dedicated White Box with Zero Text Clipping) */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-white/60 shadow-sm text-[#13253b] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#8096bb]/20 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#8096bb]/15 flex items-center justify-center text-[#8096bb]">
                          <Sparkles className="w-4 h-4 text-[#8096bb]" />
                        </div>
                        <span className="font-serif-title font-bold text-sm sm:text-base text-[#13253b]">
                          Inquiry Selection Summary
                        </span>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#8096bb]/15 text-[#13253b]">
                        {DOG_SIZE_DEFINITIONS[weightCategory].label} ({weightCategory.toUpperCase()})
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#13253b]">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-stone-700">Selected Package: <strong>{packageInterest}</strong></span>
                        <span className="font-bold text-[#13253b]">£{basePrice}</span>
                      </div>

                      {isBathAndBlowDry && includeDeepClean && (
                        <div className="flex justify-between items-center text-stone-700">
                          <span>• Deep Clean Clarifying Wash (+£5 stage):</span>
                          <span className="font-bold text-[#13253b]">+£{DEEP_CLEAN_UPGRADE.price}</span>
                        </div>
                      )}

                      {paidUpgrades.map(name => {
                        const tr = SPECIALIST_SPA_TREATMENTS.find(t => t.name === name);
                        return (
                          <div key={name} className="flex justify-between items-center text-stone-700">
                            <span>• {name}:</span>
                            <span className="font-bold text-[#13253b]">+£{tr ? tr.basePrice : 0}</span>
                          </div>
                        );
                      })}

                      {(isShortCoat || isUltimate) && (
                        <div className="text-[11px] text-emerald-800 font-semibold pt-0.5">
                          {isShortCoat
                            ? '✓ Fresh Face & Luxury Paw Spa included in package (£0)'
                            : `✓ Fresh Face, Luxury Paw Spa & ${ultimateChoice} included in package (£0)`}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#8096bb]/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1">
                      <span className="text-xs sm:text-sm font-bold text-[#13253b]">
                        Estimated Starting Total:
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#13253b] tracking-tight">
                        £{estimatedTotal}
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-stone-200">
                      <p className="text-[11px] text-stone-600 font-medium leading-relaxed">
                        {PRICING_DISCLAIMER}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Additional Details, Sensitivities, or Questions
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Share any sensitivities, coat history, or questions..."
                      className="w-full px-3.5 py-3 bg-white rounded-xl border border-white/40 text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white font-medium min-h-30 resize-y leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-[#efe0cd] text-[#13253b] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                  >
                    <Send className="w-4 h-4 text-[#13253b]" />
                    <span>{isSubmitting ? 'Submitting Inquiry...' : `Submit Spa Consultation Request (Est. £${estimatedTotal})`}</span>
                  </button>
                  <p className="text-[11px] text-[#13253b] font-medium text-center mt-2.5">
                    We review each inquiry individually and will contact you via your preferred method ({preferredContact}) with tailored recommendations.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
