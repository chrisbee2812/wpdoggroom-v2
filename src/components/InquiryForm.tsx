import React, { useState, useEffect } from 'react';
import { DogSize, InquiryFormData } from '../types';
import { DOG_SIZE_DEFINITIONS, SPECIALIST_SPA_TREATMENTS } from '../data/pricing';
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock, Droplets, Heart } from 'lucide-react';

interface InquiryFormProps {
  prefilledPackage?: string;
  prefilledSize?: DogSize;
  prefilledBreed?: string;
  prefilledNotes?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  prefilledPackage,
  prefilledSize,
  prefilledBreed,
  prefilledNotes
}) => {
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState(prefilledBreed || '');
  const [dogAge, setDogAge] = useState('');
  const [weightCategory, setWeightCategory] = useState<DogSize>(prefilledSize || 'medium');
  const [packageInterest, setPackageInterest] = useState<string>(prefilledPackage || 'Fresh & Fluffy');
  const [selectedSpaUpgrades, setSelectedSpaUpgrades] = useState<string[]>([]);
  const [coatCondition, setCoatCondition] = useState<'good' | 'heavy-shedding' | 'dry-skin' | 'sensitive' | 'unsure'>('good');
  const [temperament, setTemperament] = useState<string[]>([]);
  const [preferredContact, setPreferredContact] = useState<'phone' | 'text' | 'email'>('text');
  const [preferredDays, setPreferredDays] = useState<string[]>(['Tue', 'Thu']);
  const [message, setMessage] = useState(prefilledNotes || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InquiryFormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefilledPackage) setPackageInterest(prefilledPackage);
    if (prefilledSize) setWeightCategory(prefilledSize);
    if (prefilledBreed) setBreed(prefilledBreed);
    if (prefilledNotes) setMessage(prefilledNotes);
  }, [prefilledPackage, prefilledSize, prefilledBreed, prefilledNotes]);

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
        selectedSpaUpgrades,
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
                West Park Dog Spa
              </h3>
              <p className="text-xs text-white/90 font-medium">
                Specialist Bathing • Skin & Coat Care • Spa Treatments
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans">
              A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We are coat & skin specialists focusing on professional bathing, therapeutic bath and blow out, alongside luxury spa treatments using carefully selected professional products.
            </p>

            <div className="space-y-4 pt-2 border-t border-white/20">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-[#13253b] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#8096bb]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white block">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm text-[#13253b] font-bold">
                    West Park, Leeds (LS16)
                  </span>
                  <span className="text-[11px] text-[#13253b] block font-medium">
                    Private garden studio setting
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-[#13253b] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#8096bb]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white block">
                    Phone Consultation
                  </span>
                  <a href="tel:01133208492" className="text-xs sm:text-sm text-[#13253b] font-bold hover:underline">
                    0113 320 8492
                  </a>
                  <span className="text-[11px] text-[#13253b] block font-medium">
                    Call or text for inquiries
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-[#13253b] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#8096bb]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white block">
                    Direct Email
                  </span>
                  <a href="mailto:hello@westparkdogspa.co.uk" className="text-xs sm:text-sm text-[#13253b] font-bold hover:underline">
                    hello@westparkdogspa.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-[#13253b] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#8096bb]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white block">
                    Studio Hours
                  </span>
                  <span className="text-xs sm:text-sm text-[#13253b] font-bold">
                    Tuesday – Saturday: 9:00 AM – 5:30 PM
                  </span>
                  <span className="text-[11px] text-[#13253b] block font-medium">
                    Strictly 1-on-1 by advance booking
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Info Card 2: Why advance inquiry */}
          <div className="bg-[#8096bb] rounded-3xl p-6 border border-white/40 shadow-sm text-white space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-white" />
              <h4 className="font-serif-title font-bold text-white text-base">
                Why Consultation Inquiries First?
              </h4>
            </div>
            <p className="text-xs text-[#13253b] font-medium leading-relaxed font-sans">
              Unlike crowded commercial salons with conveyor-belt booking, we personally review every dog’s breed, skin type, and temperament before confirming an appointment. This guarantees enough quiet, calm time for your dog’s customized treatment in our garden sanctuary.
            </p>
          </div>
        </div>

        {/* Right Side: The Form Card in #8096bb */}
        <div className="lg:col-span-7">
          <div className="bg-[#8096bb] rounded-3xl p-6 sm:p-10 border border-white/40 shadow-sm text-white">
            {submittedData ? (
              <div className="text-center py-8 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-white text-[#13253b] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10 text-[#8096bb]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                    Inquiry Reference: {submittedData.id}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
                    Thank You, {submittedData.ownerName}!
                  </h3>
                  <p className="text-sm text-[#13253b] font-bold max-w-md mx-auto">
                    We’ve received your spa inquiry for <strong>{submittedData.dogName}</strong> ({submittedData.breed}).
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-white/20 rounded-2xl p-5 text-left border border-white/30 space-y-2 max-w-xl mx-auto text-xs">
                  <div className="flex justify-between pb-2 border-b border-white/20 font-medium">
                    <span className="text-white/80">Selected Package:</span>
                    <span className="text-white font-bold">{submittedData.packageInterest}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/20 font-medium">
                    <span className="text-white/80">Size Bracket:</span>
                    <span className="text-white font-bold capitalize">{submittedData.weightCategory}</span>
                  </div>
                  {(submittedData.selectedSpaUpgrades ?? []).length > 0 && (
                    <div className="flex justify-between pb-2 border-b border-white/20 font-medium">
                      <span className="text-white/80">Spa Add-Ons:</span>
                      <span className="text-white font-bold">{(submittedData.selectedSpaUpgrades ?? []).join(', ')}</span>
                    </div>
                  )}
                  <div className="flex justify-between pb-2 border-b border-white/20 font-medium">
                    <span className="text-white/80">Preferred Contact:</span>
                    <span className="text-white font-bold capitalize">{submittedData.preferredContact} ({submittedData.phone})</span>
                  </div>
                </div>

                {/* Important Info Card: What happens next */}
                <div className="bg-[#8096bb] rounded-2xl p-5 text-left border border-white/50 max-w-xl mx-auto shadow-sm">
                  <h4 className="font-serif-title font-bold text-sm text-white mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-white" />
                    What Happens Next?
                  </h4>
                  <ul className="text-xs text-[#13253b] font-medium space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Our spa specialist reviews your dog’s breed, skin history, and coat needs.</li>
                    <li>We will reach out via <strong>{submittedData.preferredContact}</strong> within 24 business hours.</li>
                    <li>We will discuss treatment safety, confirm starting rates, and reserve your dedicated 1-on-1 garden studio window.</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-6 py-2.5 bg-white hover:bg-[#efe0cd] text-[#13253b] rounded-full text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif-title font-bold text-white mb-1">
                    Tell Us About Your Dog & Spa Needs
                  </h3>
                  <p className="text-xs text-white/80">
                    Fields marked with an asterisk (<span className="text-rose-300 font-bold">*</span>) are required.
                  </p>
                </div>

                {/* Owner Information */}
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90 block">
                    1. Owner Contact Information
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
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

                    <div>
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['small', 'medium', 'large', 'xl'] as DogSize[]).map(size => {
                        const def = DOG_SIZE_DEFINITIONS[size];
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setWeightCategory(size)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              weightCategory === size
                                ? 'bg-white text-[#13253b] border-white shadow-2xs font-bold'
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
                    3. Spa Service & Upgrades
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
                        <optgroup label="🫧 Bath & Blow-Dry">
                          <option value="Fresh & Fluffy">Fresh & Fluffy (from £25)</option>
                          <option value="Deep Clean">Deep Clean (Add £5 to Bath & Blow-Dry)</option>
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

                  {/* Specialist Spa Upgrades Checkboxes */}
                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      Optional Specialist Spa Treatments (select any to add)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SPECIALIST_SPA_TREATMENTS.map(upgrade => {
                        const isSelected = selectedSpaUpgrades.includes(upgrade.name);
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
                            <span>
                              {upgrade.flagEmoji} {upgrade.name}
                            </span>
                            <span className="font-bold text-[11px] shrink-0">
                              {upgrade.priceNote}
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

                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Additional Details or Questions
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Share any sensitivities, coat history, or questions..."
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-white/40 text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-[#efe0cd] text-[#13253b] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#8096bb]" />
                        Submit Spa Consultation Inquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
