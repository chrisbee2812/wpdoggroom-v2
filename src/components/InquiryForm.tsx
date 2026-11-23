import React, { useState, useEffect } from 'react';
import { DogSize, InquiryFormData, InquiryServiceType } from '../types';
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
import { FERTILITY_TREATMENTS, FERTILITY_DISCLAIMER } from '../data/fertility';
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Droplets,
  Sparkles,
  Check,
  Microscope
} from 'lucide-react';

interface InquiryFormProps {
  prefilledServiceType?: InquiryServiceType;
  prefilledPackage?: string;
  prefilledSize?: DogSize;
  prefilledBreed?: string;
  prefilledNotes?: string;
  prefilledUpgrades?: string[];
  prefilledDeepClean?: boolean;
  prefilledFertilityServices?: string[];
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  prefilledServiceType,
  prefilledPackage,
  prefilledSize,
  prefilledBreed,
  prefilledNotes,
  prefilledUpgrades,
  prefilledDeepClean,
  prefilledFertilityServices
}) => {
  const initialServiceType: InquiryServiceType =
    prefilledServiceType ||
    (prefilledFertilityServices && prefilledFertilityServices.length > 0 ? 'fertility' : 'spa');

  const [serviceType, setServiceType] = useState<InquiryServiceType>(initialServiceType);

  // Shared owner & dog info
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState(prefilledBreed || '');
  const [dogAge, setDogAge] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'text' | 'email'>('text');
  const [preferredDays, setPreferredDays] = useState<string[]>(['Tue', 'Thu']);
  const [message, setMessage] = useState(prefilledNotes || '');

  // Spa-specific state
  const [weightCategory, setWeightCategory] = useState<DogSize>(prefilledSize || 'medium');
  const [packageInterest, setPackageInterest] = useState<string>(prefilledPackage || 'Fresh & Fluffy');
  const [includeDeepClean, setIncludeDeepClean] = useState<boolean>(Boolean(prefilledDeepClean));
  const [selectedSpaUpgrades, setSelectedSpaUpgrades] = useState<string[]>(prefilledUpgrades || []);
  const [ultimateChoice, setUltimateChoice] = useState<string>('Japanese Marshmallow Foam Spa');
  const [coatCondition, setCoatCondition] = useState<'good' | 'heavy-shedding' | 'dry-skin' | 'sensitive' | 'unsure'>('good');
  const [temperament, setTemperament] = useState<string[]>([]);

  // Fertility-specific state
  const [selectedFertilityIds, setSelectedFertilityIds] = useState<string[]>(['vaginal-cytology']);
  const [fertilitySubOptions, setFertilitySubOptions] = useState<Record<string, string>>({
    'artificial-insemination': 'ai-single',
    'pregnancy-ultrasound': 'ultrasound-initial'
  });
  const [dogRole, setDogRole] = useState<'bitch' | 'stud' | 'pair'>('bitch');
  const [breedingStage, setBreedingStage] = useState<string>('Days 5–12 of Season (Cycle Staging)');
  const [semenType, setSemenType] = useState<'fresh' | 'chilled' | 'na'>('fresh');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InquiryFormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isShortCoat = packageInterest === 'The Short-Coat Spa';
  const isUltimate = packageInterest === 'The Ultimate Dog Spa';
  const isBathAndBlowDry =
    packageInterest === 'Fresh & Fluffy' ||
    packageInterest === 'Therapeutic Bath & Blow-Out';

  // Sync incoming prefilled state from Spa or Fertility pages
  useEffect(() => {
    if (prefilledServiceType) {
      setServiceType(prefilledServiceType);
    } else if (prefilledFertilityServices && prefilledFertilityServices.length > 0) {
      setServiceType('fertility');
    }

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

    if (prefilledFertilityServices && prefilledFertilityServices.length > 0) {
      const matchedIds: string[] = [];
      const nextSubOpts: Record<string, string> = {
        'artificial-insemination': 'ai-single',
        'pregnancy-ultrasound': 'ultrasound-initial'
      };

      FERTILITY_TREATMENTS.forEach(t => {
        const matched = prefilledFertilityServices.find(
          s => s.toLowerCase().includes(t.name.toLowerCase()) || s.toLowerCase().includes(t.id.toLowerCase())
        );
        if (matched) {
          matchedIds.push(t.id);
          if (t.options) {
            const matchedOpt = t.options.find(opt =>
              matched.toLowerCase().includes(opt.label.toLowerCase())
            );
            if (matchedOpt) {
              nextSubOpts[t.id] = matchedOpt.id;
            }
          }
        }
      });

      if (matchedIds.length > 0) {
        setSelectedFertilityIds(matchedIds);
        setFertilitySubOptions(prev => ({ ...prev, ...nextSubOpts }));

        // Sensible defaults for role/stage based on prefilled services
        if (matchedIds.length === 1 && matchedIds[0] === 'semen-analysis') {
          setDogRole('stud');
          setBreedingStage('Routine Stud Health Check / Pre-Mating');
        } else if (matchedIds.includes('pregnancy-ultrasound')) {
          setDogRole('bitch');
          setBreedingStage('Post-Mating Day 25–30+ (Pregnancy Scan)');
        }
      }
    }
  }, [
    prefilledServiceType,
    prefilledPackage,
    prefilledSize,
    prefilledBreed,
    prefilledNotes,
    prefilledUpgrades,
    prefilledDeepClean,
    prefilledFertilityServices
  ]);

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
    if (isShortCoat && SHORT_COAT_INCLUDED_ADDON_NAMES.includes(treatmentName)) return;
    if (isUltimate && ULTIMATE_INCLUDED_ADDON_NAMES.includes(treatmentName)) return;
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

  const toggleFertilityService = (id: string) => {
    setSelectedFertilityIds(prev => {
      if (prev.includes(id)) {
        // Keep at least one selected or allow toggling freely (validation handles empty)
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  };

  const selectFertilitySubOption = (treatmentId: string, optionId: string) => {
    setFertilitySubOptions(prev => ({ ...prev, [treatmentId]: optionId }));
    setSelectedFertilityIds(prev => (prev.includes(treatmentId) ? prev : [...prev, treatmentId]));
  };

  const toggleDay = (day: string) => {
    setPreferredDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  // SPA PRICING CALCULATIONS
  const foundPkg = PRICING_PACKAGES.find(p => p.name === packageInterest);
  const basePrice = foundPkg ? foundPkg.prices[weightCategory] : 0;
  const deepCleanAdd = isBathAndBlowDry && includeDeepClean ? DEEP_CLEAN_UPGRADE.price : 0;

  const paidUpgrades = selectedSpaUpgrades.filter(name => {
    if (isShortCoat && SHORT_COAT_INCLUDED_ADDON_NAMES.includes(name)) return false;
    if (isUltimate && (ULTIMATE_INCLUDED_ADDON_NAMES.includes(name) || name === ultimateChoice)) return false;
    return true;
  });

  const upgradesCost = paidUpgrades.reduce((sum, name) => {
    const item = SPECIALIST_SPA_TREATMENTS.find(t => t.name === name);
    return sum + (item ? item.basePrice : 0);
  }, 0);

  const spaEstimatedTotal = basePrice + deepCleanAdd + upgradesCost;

  // FERTILITY PRICING CALCULATIONS
  const selectedFertilitySummaryItems = selectedFertilityIds
    .map(id => {
      const t = FERTILITY_TREATMENTS.find(item => item.id === id);
      if (!t) return null;
      const optId = fertilitySubOptions[id];
      const chosenOpt = t.options?.find(o => o.id === optId) || t.options?.[0];
      const label = t.options && t.options.length > 1 && chosenOpt ? `${t.name} (${chosenOpt.label})` : t.name;
      const price = chosenOpt ? chosenOpt.price : t.basePrice;
      return { id: t.id, label, price, duration: t.durationEstimate };
    })
    .filter((item): item is { id: string; label: string; price: number; duration: string } => Boolean(item));

  const fertilityEstimatedTotal = selectedFertilitySummaryItems.reduce((sum, item) => sum + item.price, 0);

  const activeEstimateTotal = serviceType === 'spa' ? spaEstimatedTotal : fertilityEstimatedTotal;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!ownerName.trim()) newErrors.ownerName = 'Please enter your name.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email address is required.';
    if (!phone.trim() || phone.length < 7) newErrors.phone = 'Valid phone number is required.';
    if (!dogName.trim()) newErrors.dogName = 'Please enter your dog’s name.';
    if (!breed.trim()) newErrors.breed = 'Please tell us your dog’s breed or mix.';
    if (serviceType === 'fertility' && selectedFertilityIds.length === 0) {
      newErrors.fertilityServices = 'Please select at least one fertility treatment.';
    }
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
      ? [
          'Fresh Face (Included in Ultimate Dog Spa)',
          'Luxury Paw Spa (Included in Ultimate Dog Spa)',
          `${ultimateChoice} (Included Choice in Ultimate Dog Spa)`
        ]
      : [];

    const finalRecordedUpgrades = [...inclusionsList, ...paidUpgrades];

    setTimeout(() => {
      const newInquiry: InquiryFormData = {
        id: `${serviceType === 'fertility' ? 'WPF' : 'WPS'}-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        serviceType,
        ownerName,
        email,
        phone,
        dogName,
        breed,
        dogAge,
        weightCategory,
        packageInterest: serviceType === 'spa' ? packageInterest : 'Canine Fertility Services',
        includeDeepClean: serviceType === 'spa' && isBathAndBlowDry && includeDeepClean,
        selectedSpaUpgrades: serviceType === 'spa' ? finalRecordedUpgrades : [],
        coatCondition,
        temperament: serviceType === 'spa' ? temperament : [],
        fertilityServices:
          serviceType === 'fertility' ? selectedFertilitySummaryItems.map(i => i.label) : [],
        dogRole: serviceType === 'fertility' ? dogRole : undefined,
        breedingStage: serviceType === 'fertility' ? breedingStage : undefined,
        semenType: serviceType === 'fertility' ? semenType : undefined,
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
    }, 600);
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
        {/* Left Side: Studio Info Cards + Live Preview Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Card */}
          <div className="bg-[#8096bb] rounded-3xl p-6 sm:p-8 border border-white/40 shadow-sm text-white space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-2 border border-white/20">
                <Droplets className="w-3.5 h-3.5 text-white" />
                Garden Studio
              </div>
              <h3 className="font-serif-title font-bold text-2xl sm:text-3xl text-white">
                West Park Dog Spa
              </h3>
              <p className="text-xs text-white/90 font-medium">
                Specialist Bathing · Skin & Coat Care · Canine Fertility
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans">
              A private, home-based studio situated within our dedicated garden suite in West Park, Leeds. Offering specialist coat & skin spa treatments as well as 1-on-1 canine fertility diagnostics, AI, and ultrasound scanning.
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
                  <span className="text-[#13253b] font-medium">Tuesday – Saturday · 8:30am – 4:30pm (Flexible timing for fertility cycles)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Telephone / Text</strong>
                  <span className="text-[#13253b] font-medium">0113 320 8492 · 07842 918 204</span>
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
              {serviceType === 'spa' ? 'Starting Price Policy' : 'Fertility Studio Standards'}
            </h4>
            <p className="text-xs text-[#13253b] font-medium leading-relaxed">
              {serviceType === 'spa' ? PRICING_DISCLAIMER : FERTILITY_DISCLAIMER}
            </p>
            <p className="text-xs text-[#13253b] font-medium leading-relaxed">
              {serviceType === 'spa'
                ? 'We specialise in bathing, coat care and spa treatments rather than clipping or breed styling.'
                : 'All cytology swabs, AI catheters, and collection equipment are strictly sterile and single-use.'}
            </p>
          </div>

          {/* Live Preview Card (Spa OR Fertility) */}
          {serviceType === 'spa' && basePrice > 0 && (
            <div className="bg-[#8096bb] rounded-3xl p-6 pb-7 border-2 border-white shadow-md text-white space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-title font-bold text-lg text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-white" />
                  Your Estimated Spa Package
                </h4>
                <span className="text-xs font-bold bg-white text-[#13253b] px-2.5 py-0.5 rounded-full">
                  Live Estimate
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#13253b] font-medium bg-white/20 p-3.5 pb-4 rounded-xl border border-white/25">
                <div className="flex justify-between items-center text-white font-bold">
                  <span>{packageInterest} ({DOG_SIZE_DEFINITIONS[weightCategory].label})</span>
                  <span className="tabular-nums">£{basePrice}</span>
                </div>

                {isBathAndBlowDry && includeDeepClean && (
                  <div className="flex justify-between items-center text-white">
                    <span>+ Deep Clean Wash Upgrade</span>
                    <span className="tabular-nums">+£{DEEP_CLEAN_UPGRADE.price}</span>
                  </div>
                )}

                {paidUpgrades.map(name => {
                  const tr = SPECIALIST_SPA_TREATMENTS.find(t => t.name === name);
                  return (
                    <div key={name} className="flex justify-between items-center text-white">
                      <span>+ {name}</span>
                      <span className="tabular-nums">+£{tr ? tr.basePrice : 0}</span>
                    </div>
                  );
                })}

                <div className="pt-2 mt-2 border-t border-white/30 flex justify-between items-center text-sm font-extrabold text-white">
                  <span>Estimated Starting Total:</span>
                  <span className="text-xl font-black tabular-nums">from £{spaEstimatedTotal}</span>
                </div>

                <p className="text-[10px] text-white/90 font-medium pt-1 leading-snug">
                  {PRICING_DISCLAIMER}
                </p>
              </div>
            </div>
          )}

          {serviceType === 'fertility' && (
            <div className="bg-[#8096bb] rounded-3xl p-6 pb-7 border-2 border-white shadow-md text-white space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-title font-bold text-lg text-white flex items-center gap-1.5">
                  <Microscope className="w-4 h-4 text-white" />
                  Selected Fertility Services
                </h4>
                <span className="text-xs font-bold bg-white text-[#13253b] px-2.5 py-0.5 rounded-full">
                  Live Estimate
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#13253b] font-medium bg-white/20 p-3.5 pb-4 rounded-xl border border-white/25">
                {selectedFertilitySummaryItems.length > 0 ? (
                  selectedFertilitySummaryItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-white font-bold gap-2">
                      <span>• {item.label}</span>
                      <span className="tabular-nums shrink-0">£{item.price}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-white/90 italic">Select one or more treatments on the form.</div>
                )}

                <div className="pt-2 mt-2 border-t border-white/30 flex justify-between items-center text-sm font-extrabold text-white">
                  <span>Estimated Starting Total:</span>
                  <span className="text-xl font-black tabular-nums">from £{fertilityEstimatedTotal}</span>
                </div>

                <p className="text-[10px] text-white/90 font-medium pt-1 leading-snug">
                  {FERTILITY_DISCLAIMER}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Dual-Mode Inquiry Form in #8096bb card */}
        <div className="lg:col-span-7">
          <div className="bg-[#8096bb] rounded-3xl p-6 sm:p-8 border border-white/40 shadow-sm text-white">
            {submittedData ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white text-[#13253b] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="font-serif-title text-2xl font-bold text-white">
                  {submittedData.serviceType === 'fertility'
                    ? 'Fertility Inquiry Received!'
                    : 'Spa Consultation Request Received!'}
                </h3>
                <p className="text-xs sm:text-sm text-[#13253b] font-medium max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{submittedData.ownerName}</strong>. We have logged your{' '}
                  {submittedData.serviceType === 'fertility' ? 'fertility' : 'spa'} request for{' '}
                  <strong className="text-white">{submittedData.dogName}</strong>. Reference:{' '}
                  <span className="font-mono font-bold text-white bg-white/20 px-2 py-0.5 rounded">{submittedData.id}</span>.
                </p>

                <div className="max-w-md mx-auto bg-white/20 rounded-2xl p-4 text-left text-xs space-y-2 border border-white/30 text-white">
                  <div className="font-bold border-b border-white/20 pb-1 text-white">
                    Confirmed Selections ({submittedData.serviceType === 'fertility' ? 'Canine Fertility' : 'Dog Spa'}):
                  </div>

                  {submittedData.serviceType === 'fertility' ? (
                    <>
                      <div className="text-[#13253b] font-bold">
                        • Dog: {submittedData.dogName} ({submittedData.breed})
                      </div>
                      <div className="text-[#13253b] font-bold">
                        • Role: {submittedData.dogRole === 'bitch' ? 'Bitch (Dam)' : submittedData.dogRole === 'stud' ? 'Stud Dog (Sire)' : 'Both (Pair)'}
                      </div>
                      <div className="text-[#13253b] font-bold">
                        • Cycle / Stage: {submittedData.breedingStage}
                      </div>
                      {submittedData.fertilityServices && submittedData.fertilityServices.length > 0 && (
                        <div className="space-y-1 pt-1 border-t border-white/20">
                          <div className="text-white font-bold">• Selected Treatments:</div>
                          <div className="text-[#13253b] font-medium pl-2 space-y-0.5">
                            {submittedData.fertilityServices.map((srv, idx) => (
                              <div key={idx}>✓ {srv}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
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
                          <div className="text-white font-bold">• Spa Inclusions & Upgrades:</div>
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
                    </>
                  )}
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
                    Consultation & Booking Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#13253b] font-medium mt-1 font-sans">
                    Select whether you are enquiring about <strong>Dog Spa & Coat Care</strong> or <strong>Canine Fertility & Ultrasound</strong> to reveal tailored options.
                  </p>
                </div>

                {/* 🌟 MAIN 2-WAY SERVICE CATEGORY SELECTOR (SPA vs FERTILITY) */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                    1. Choose Inquiry Department
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setServiceType('spa')}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        serviceType === 'spa'
                          ? 'bg-white text-[#13253b] border-white ring-2 ring-white shadow-md'
                          : 'bg-white/15 text-white border-white/30 hover:bg-white/25'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          serviceType === 'spa' ? 'bg-[#8096bb] text-white' : 'bg-white/20 text-white'
                        }`}
                      >
                        <Droplets className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-serif-title font-bold text-base leading-tight">
                          Dog Spa & Coat Care
                        </div>
                        <div className={`text-[11px] mt-0.5 leading-snug ${serviceType === 'spa' ? 'text-[#13253b]/80 font-medium' : 'text-white/85'}`}>
                          Bathing, deshedding, Japanese & Korean spa rituals
                        </div>
                      </div>
                      {serviceType === 'spa' && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceType('fertility')}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        serviceType === 'fertility'
                          ? 'bg-white text-[#13253b] border-white ring-2 ring-white shadow-md'
                          : 'bg-white/15 text-white border-white/30 hover:bg-white/25'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          serviceType === 'fertility' ? 'bg-[#8096bb] text-white' : 'bg-white/20 text-white'
                        }`}
                      >
                        <Microscope className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-serif-title font-bold text-base leading-tight">
                          Canine Fertility & Ultrasound
                        </div>
                        <div className={`text-[11px] mt-0.5 leading-snug ${serviceType === 'fertility' ? 'text-[#13253b]/80 font-medium' : 'text-white/85'}`}>
                          Cytology, semen analysis, AI & pregnancy scan
                        </div>
                      </div>
                      {serviceType === 'fertility' && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Owner Information */}
                <div className="space-y-4 pt-4 border-t border-white/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                    2. Owner Contact Details
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
                    3. Dog Details
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
                        placeholder="e.g. Bella or Buster"
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
                        placeholder="e.g. French Bulldog, Lab..."
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
                        Age
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

                  {/* Show Dog Size Bracket for Spa */}
                  {serviceType === 'spa' && (
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
                  )}

                  {/* Show Dog Role / Sex for Fertility */}
                  {serviceType === 'fertility' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-white mb-1.5">
                          Dog's Role
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'bitch', label: 'Bitch (Dam)' },
                            { id: 'stud', label: 'Stud (Sire)' },
                            { id: 'pair', label: 'Pair (Both)' }
                          ].map(role => (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() => setDogRole(role.id as 'bitch' | 'stud' | 'pair')}
                              className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                dogRole === role.id
                                  ? 'bg-white text-[#13253b] border-white shadow-2xs ring-2 ring-white'
                                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                              }`}
                            >
                              {role.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1.5">
                          Semen Type (if AI / Analysis)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'fresh', label: 'Fresh' },
                            { id: 'chilled', label: 'Chilled' },
                            { id: 'na', label: 'N/A' }
                          ].map(st => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setSemenType(st.id as 'fresh' | 'chilled' | 'na')}
                              className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                semenType === st.id
                                  ? 'bg-white text-[#13253b] border-white shadow-2xs ring-2 ring-white'
                                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                              }`}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ========================================================== */}
                {/* DEPARTMENT 1 SUB-OPTIONS: DOG SPA & COAT CARE               */}
                {/* ========================================================== */}
                {serviceType === 'spa' && (
                  <>
                    <div className="space-y-4 pt-4 border-t border-white/20">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                        4. Spa Package & Specialist Upgrades
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

                      {/* Deep Clean Wash Upgrade */}
                      <div
                        className={`p-4 rounded-2xl border transition-all ${
                          isBathAndBlowDry
                            ? includeDeepClean
                              ? 'bg-white/30 border-white ring-2 ring-white'
                              : 'bg-white/15 border-white/30 hover:bg-white/20 cursor-pointer'
                            : 'bg-white/10 border-white/20 opacity-75'
                        }`}
                      >
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

                      {/* Short Coat Spa Inclusion Banner */}
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

                      {/* Ultimate Dog Spa Inclusion Banner & 1-of-4 Selector */}
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
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ml-1.5 ${
                                      isChosen ? 'bg-[#13253b] text-white' : 'bg-white/20 text-white'
                                    }`}
                                  >
                                    {isChosen ? '✓ Included (£0)' : 'Select'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Specialist Spa Upgrades */}
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
                            const isIncludedInShortCoat =
                              isShortCoat && SHORT_COAT_INCLUDED_ADDON_NAMES.includes(upgrade.name);
                            const isIncludedInUltimateFixed =
                              isUltimate && ULTIMATE_INCLUDED_ADDON_NAMES.includes(upgrade.name);
                            const isChosenSpecialistInUltimate =
                              isUltimate && upgrade.name === ultimateChoice;
                            const isAlternativeSpecialistInUltimate =
                              isUltimate &&
                              ULTIMATE_SPECIALIST_CHOICE_NAMES.includes(upgrade.name) &&
                              upgrade.name !== ultimateChoice;

                            const isUnselectable = isIncludedInShortCoat || isIncludedInUltimateFixed;
                            const isSelected =
                              isUnselectable ||
                              isChosenSpecialistInUltimate ||
                              paidUpgrades.includes(upgrade.name);

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
                                <span
                                  className={`font-bold text-[11px] shrink-0 ml-1.5 px-1.5 py-0.5 rounded ${
                                    isSelected ? 'bg-[#13253b] text-white' : 'bg-white/30 text-white'
                                  }`}
                                >
                                  {isSelected ? '✓ ' + upgrade.priceNote : upgrade.priceNote}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Temperament */}
                    <div className="space-y-4 pt-4 border-t border-white/20">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                        5. Temperament & Preferred Schedule
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
                    </div>
                  </>
                )}

                {/* ========================================================== */}
                {/* DEPARTMENT 2 SUB-OPTIONS: CANINE FERTILITY & ULTRASOUND     */}
                {/* ========================================================== */}
                {serviceType === 'fertility' && (
                  <div className="space-y-4 pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                        4. Fertility Treatments & Cycle Timing
                      </span>
                      {errors.fertilityServices && (
                        <span className="text-[11px] text-rose-200 font-semibold">
                          {errors.fertilityServices}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2.5">
                      <label className="block text-xs font-bold text-white">
                        Select Fertility Service(s) Required
                      </label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {FERTILITY_TREATMENTS.map(treatment => {
                          const isChecked = selectedFertilityIds.includes(treatment.id);
                          const hasSubOptions = Boolean(treatment.options && treatment.options.length > 1);
                          const activeOptId = fertilitySubOptions[treatment.id] || treatment.options?.[0]?.id;

                          return (
                            <div
                              key={treatment.id}
                              className={`p-3.5 rounded-2xl border transition-all ${
                                isChecked
                                  ? 'bg-white text-[#13253b] border-white ring-2 ring-white shadow-sm'
                                  : 'bg-white/15 border-white/30 text-white hover:bg-white/25'
                              }`}
                            >
                              <div
                                onClick={() => toggleFertilityService(treatment.id)}
                                className="flex items-start justify-between gap-3 cursor-pointer"
                              >
                                <div className="flex items-start gap-2.5">
                                  <div
                                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                                      isChecked
                                        ? 'bg-[#13253b] border-[#13253b] text-white'
                                        : 'border-white/60 bg-white/10'
                                    }`}
                                  >
                                    {isChecked && <Check className="w-3.5 h-3.5" />}
                                  </div>
                                  <div>
                                    <div className={`text-xs sm:text-sm font-bold leading-snug ${isChecked ? 'text-[#13253b]' : 'text-white'}`}>
                                      {treatment.name}
                                    </div>
                                    <div className={`text-[11px] mt-0.5 ${isChecked ? 'text-[#13253b]/80 font-medium' : 'text-white/85'}`}>
                                      {treatment.tagline} · {treatment.durationEstimate}
                                    </div>
                                  </div>
                                </div>

                                <span
                                  className={`text-xs font-extrabold shrink-0 px-2.5 py-1 rounded-lg tabular-nums ${
                                    isChecked ? 'bg-[#8096bb] text-white' : 'bg-white/20 text-white'
                                  }`}
                                >
                                  {treatment.priceNote.split('(')[0].trim()}
                                </span>
                              </div>

                              {/* Sub-options for AI (Single vs 2-session) & Ultrasound (Initial vs Re-scan) */}
                              {hasSubOptions && treatment.options && (
                                <div className="mt-3 pt-2.5 border-t border-current/15 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {treatment.options.map(opt => {
                                    const isSubChosen = isChecked && activeOptId === opt.id;
                                    return (
                                      <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => selectFertilitySubOption(treatment.id, opt.id)}
                                        className={`px-3 py-2 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer border ${
                                          isSubChosen
                                            ? 'bg-[#13253b] text-white border-[#13253b] font-bold'
                                            : isChecked
                                            ? 'bg-[#8096bb]/15 text-[#13253b] border-[#8096bb]/30 hover:bg-[#8096bb]/25 font-medium'
                                            : 'bg-white/15 text-white border-white/25 hover:bg-white/25 font-medium'
                                        }`}
                                      >
                                        <span>{opt.label}</span>
                                        <span className="font-extrabold tabular-nums ml-2">£{opt.price}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Cycle / Breeding Stage */}
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Cycle / Breeding Timing Stage
                      </label>
                      <select
                        value={breedingStage}
                        onChange={e => setBreedingStage(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-white/40 text-sm text-[#13253b] focus:outline-none focus:ring-2 focus:ring-white font-medium"
                      >
                        <option value="Pre-season / Starting Heat">Pre-season / Starting Heat (Days 1–4)</option>
                        <option value="Days 5–12 of Season (Cycle Staging)">Days 5–12 of Season (Vaginal Cytology Staging)</option>
                        <option value="Peak Ovulation / Ready for AI">Peak Ovulation / Ready for Artificial Insemination</option>
                        <option value="Post-Mating Day 25–30+ (Pregnancy Scan)">Post-Mating Day 25–30+ (Pregnancy Ultrasound Scan)</option>
                        <option value="Follow-Up Ultrasound Re-Scan">Follow-Up Ultrasound Re-Scan</option>
                        <option value="Routine Stud Health Check / Pre-Mating">Routine Stud Health Check / Pre-Mating Semen Analysis</option>
                        <option value="Unsure / Need Cycle Advice">Unsure / Would like guidance on timing</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Preferred Days */}
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

                {/* DEDICATED WHITE INQUIRY SUMMARY BOX (Zero Text Clipping) */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-white/60 shadow-sm text-[#13253b] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#8096bb]/20 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#8096bb]/15 flex items-center justify-center text-[#8096bb]">
                        {serviceType === 'fertility' ? (
                          <Microscope className="w-4 h-4 text-[#8096bb]" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-[#8096bb]" />
                        )}
                      </div>
                      <span className="font-serif-title font-bold text-sm sm:text-base text-[#13253b]">
                        Inquiry Selection Summary
                      </span>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#8096bb]/15 text-[#13253b]">
                      {serviceType === 'fertility'
                        ? 'Canine Fertility'
                        : `${DOG_SIZE_DEFINITIONS[weightCategory].label} (${weightCategory.toUpperCase()})`}
                    </span>
                  </div>

                  {serviceType === 'spa' ? (
                    <div className="space-y-1.5 text-xs text-[#13253b]">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-stone-700">
                          Selected Package: <strong>{packageInterest}</strong>
                        </span>
                        <span className="font-bold text-[#13253b] tabular-nums">£{basePrice}</span>
                      </div>

                      {isBathAndBlowDry && includeDeepClean && (
                        <div className="flex justify-between items-center text-stone-700">
                          <span>• Deep Clean Clarifying Wash (+£5 stage):</span>
                          <span className="font-bold text-[#13253b] tabular-nums">+£{DEEP_CLEAN_UPGRADE.price}</span>
                        </div>
                      )}

                      {paidUpgrades.map(name => {
                        const tr = SPECIALIST_SPA_TREATMENTS.find(t => t.name === name);
                        return (
                          <div key={name} className="flex justify-between items-center text-stone-700">
                            <span>• {name}:</span>
                            <span className="font-bold text-[#13253b] tabular-nums">+£{tr ? tr.basePrice : 0}</span>
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
                  ) : (
                    <div className="space-y-1.5 text-xs text-[#13253b]">
                      {selectedFertilitySummaryItems.length > 0 ? (
                        selectedFertilitySummaryItems.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-stone-700">
                            <span>• {item.label}:</span>
                            <span className="font-bold text-[#13253b] tabular-nums">£{item.price}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-stone-500 italic">No fertility services selected yet.</div>
                      )}
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#8096bb]/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1">
                    <span className="text-xs sm:text-sm font-bold text-[#13253b]">
                      Estimated Starting Total:
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#13253b] tracking-tight tabular-nums">
                      £{activeEstimateTotal}
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-stone-200">
                    <p className="text-[11px] text-stone-600 font-medium leading-relaxed">
                      {serviceType === 'spa' ? PRICING_DISCLAIMER : FERTILITY_DISCLAIMER}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    {serviceType === 'fertility'
                      ? 'Cycle Dates, Mating Details, or Additional Questions'
                      : 'Additional Details, Sensitivities, or Questions'}
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={
                      serviceType === 'fertility'
                        ? 'Share season start date, mating date, chilled semen shipping details, or questions...'
                        : 'Share any sensitivities, coat history, or questions...'
                    }
                    className="w-full px-3.5 py-3 bg-white rounded-xl border border-white/40 text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white font-medium min-h-30 resize-y leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-[#efe0cd] text-[#13253b] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                  >
                    <Send className="w-4 h-4 text-[#13253b]" />
                    <span>
                      {isSubmitting
                        ? 'Submitting Inquiry...'
                        : serviceType === 'fertility'
                        ? `Submit Fertility Inquiry (Est. £${fertilityEstimatedTotal})`
                        : `Submit Spa Consultation Request (Est. £${spaEstimatedTotal})`}
                    </span>
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
