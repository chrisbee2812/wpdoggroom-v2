import React, { useState, useEffect } from 'react';
import { DogSize, InquiryFormData } from '../types';
import { DOG_SIZE_DEFINITIONS, PRICING_PACKAGES } from '../data/pricing';
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock, AlertCircle, Sparkles, Dog, Calendar } from 'lucide-react';

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
  const [packageInterest, setPackageInterest] = useState<string>(prefilledPackage || 'Full West Park Custom Groom');
  const [coatCondition, setCoatCondition] = useState<'good' | 'some-tangles' | 'matted' | 'unsure'>('good');
  const [temperament, setTemperament] = useState<string[]>([]);
  const [preferredContact, setPreferredContact] = useState<'phone' | 'text' | 'email'>('text');
  const [preferredDays, setPreferredDays] = useState<string[]>(['Tue', 'Thu']);
  const [message, setMessage] = useState(prefilledNotes || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InquiryFormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync external prefilled props if user clicks gallery/pricing buttons
  useEffect(() => {
    if (prefilledPackage) setPackageInterest(prefilledPackage);
    if (prefilledSize) setWeightCategory(prefilledSize);
    if (prefilledBreed) setBreed(prefilledBreed);
    if (prefilledNotes) setMessage(prefilledNotes);
  }, [prefilledPackage, prefilledSize, prefilledBreed, prefilledNotes]);

  const temperamentOptions = [
    'Friendly & Easygoing',
    'Nervous with loud dryers',
    'Sensitive around paws/nails',
    'Shy with strangers',
    'Senior / Arthritis joints',
    'High-energy puppy'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleTemperament = (trait: string) => {
    setTemperament(prev =>
      prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]
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
        id: `WP-${Math.floor(1000 + Math.random() * 9000)}`,
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
        coatCondition,
        temperament,
        preferredContact,
        preferredDays,
        message,
        status: 'new'
      };

      // Store in localStorage for demonstration persistence
      try {
        const stored = JSON.parse(localStorage.getItem('west_park_inquiries') || '[]');
        localStorage.setItem('west_park_inquiries', JSON.stringify([newInquiry, ...stored]));
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
    setTemperament([]);
  };

  return (
    <section id="inquiry" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-[#2A4736]" />
            Personalized Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight">
            Grooming & Styling Inquiries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            We operate by consultation to match each dog’s temperament, coat condition, and styling needs. Send us details about your pup and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form or Success State (Left 7 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm">
            {submittedData ? (
              <div className="py-6 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 bg-[#EBF1ED] text-[#2A4736] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#EBF1ED]/50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736] block mb-1">
                    Inquiry Received Successfully
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-900">
                    Thank You, {submittedData.ownerName}!
                  </h3>
                  <p className="text-stone-600 text-sm mt-2 max-w-lg mx-auto">
                    We have received your grooming inquiry for <strong className="text-stone-900">{submittedData.dogName}</strong> ({submittedData.breed}). Reference number: <span className="font-mono font-bold text-[#2A4736]">{submittedData.id}</span>.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="bg-stone-50 rounded-2xl p-6 text-left border border-stone-200/80 max-w-xl mx-auto space-y-3 text-xs">
                  <div className="flex justify-between pb-2 border-b border-stone-200 font-medium">
                    <span className="text-stone-500">Service of interest:</span>
                    <span className="text-stone-900 font-semibold">{submittedData.packageInterest}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-stone-200 font-medium">
                    <span className="text-stone-500">Size Category:</span>
                    <span className="text-stone-900 capitalize">{submittedData.weightCategory}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-stone-200 font-medium">
                    <span className="text-stone-500">Preferred Contact:</span>
                    <span className="text-stone-900 capitalize">{submittedData.preferredContact} ({submittedData.phone})</span>
                  </div>
                  {submittedData.preferredDays.length > 0 && (
                    <div className="flex justify-between pb-2 border-b border-stone-200 font-medium">
                      <span className="text-stone-500">Preferred Days:</span>
                      <span className="text-stone-900">{submittedData.preferredDays.join(', ')}</span>
                    </div>
                  )}
                  {submittedData.temperament.length > 0 && (
                    <div className="pt-1">
                      <span className="text-stone-500 block mb-1">Noted Temperament:</span>
                      <div className="flex flex-wrap gap-1">
                        {submittedData.temperament.map((t, i) => (
                          <span key={i} className="bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* What happens next */}
                <div className="bg-[#EBF1ED]/70 rounded-2xl p-5 text-left border border-[#2A4736]/20 max-w-xl mx-auto">
                  <h4 className="font-bold text-sm text-[#1F372A] mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#2A4736]" />
                    What Happens Next?
                  </h4>
                  <ul className="text-xs text-[#2A4736] space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Our lead groomer reviews your dog’s coat history and temperament notes.</li>
                    <li>We will reach out via <strong>{submittedData.preferredContact}</strong> within 24 business hours.</li>
                    <li>We’ll confirm timing, discuss any reference styling photos, and answer questions.</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-full text-xs font-semibold transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif-title font-bold text-stone-900 mb-1">
                    Tell Us About Your Dog & Inquiries
                  </h3>
                  <p className="text-xs text-stone-500">
                    Fields marked with an asterisk (<span className="text-rose-500">*</span>) are required.
                  </p>
                </div>

                {/* Owner Information */}
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    1. Owner Contact Information
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={ownerName}
                        onChange={e => setOwnerName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A4736] ${
                          errors.ownerName ? 'border-rose-300 ring-1 ring-rose-300' : 'border-stone-200'
                        }`}
                      />
                      {errors.ownerName && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.ownerName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className={`w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A4736] ${
                          errors.email ? 'border-rose-300 ring-1 ring-rose-300' : 'border-stone-200'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Phone Number (UK) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="07123 456789 or 0113 320 8492"
                        className={`w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A4736] ${
                          errors.phone ? 'border-rose-300 ring-1 ring-rose-300' : 'border-stone-200'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['text', 'phone', 'email'] as const).map(method => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPreferredContact(method)}
                            className={`py-2 px-2 rounded-xl text-xs capitalize font-medium border transition-all ${
                              preferredContact === method
                                ? 'bg-[#2A4736] text-white border-[#2A4736]'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
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
                <div className="space-y-4 pt-4 border-t border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    2. Dog Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Dog's Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={dogName}
                        onChange={e => setDogName(e.target.value)}
                        placeholder="e.g. Barnaby"
                        className={`w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A4736] ${
                          errors.dogName ? 'border-rose-300 ring-1 ring-rose-300' : 'border-stone-200'
                        }`}
                      />
                      {errors.dogName && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.dogName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Breed / Mix <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                        placeholder="e.g. Cockapoo, Samoyed"
                        className={`w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A4736] ${
                          errors.breed ? 'border-rose-300 ring-1 ring-rose-300' : 'border-stone-200'
                        }`}
                      />
                      {errors.breed && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.breed}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Approx. Age
                      </label>
                      <input
                        type="text"
                        value={dogAge}
                        onChange={e => setDogAge(e.target.value)}
                        placeholder="e.g. 2 years / 4 months"
                        className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A4736]"
                      />
                    </div>
                  </div>

                  {/* Weight Category Selector */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5">
                      Approximate Weight / Size Bracket
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['small', 'medium', 'large', 'giant'] as DogSize[]).map(size => {
                        const def = DOG_SIZE_DEFINITIONS[size];
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setWeightCategory(size)}
                            className={`p-2.5 rounded-xl border text-left transition-all ${
                              weightCategory === size
                                ? 'bg-[#2A4736] text-white border-[#2A4736] shadow-2xs'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            <div className="font-semibold text-xs">{def.label}</div>
                            <div className={`text-[10px] truncate ${weightCategory === size ? 'text-stone-200' : 'text-stone-500'}`}>
                              {def.weight}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Service Interest & Coat Condition */}
                <div className="space-y-4 pt-4 border-t border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    3. Service & Coat Condition
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Package of Interest
                      </label>
                      <select
                        value={packageInterest}
                        onChange={e => setPackageInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A4736]"
                      >
                        {PRICING_PACKAGES.map(pkg => (
                          <option key={pkg.id} value={pkg.name}>
                            {pkg.name} ({pkg.tagline})
                          </option>
                        ))}
                        <option value="A La Carte / General Consultation">
                          A La Carte / General Consultation
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Current Coat Condition
                      </label>
                      <select
                        value={coatCondition}
                        onChange={e => setCoatCondition(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A4736]"
                      >
                        <option value="good">Well-maintained (regularly brushed)</option>
                        <option value="some-tangles">A few tangles / needs comb-out</option>
                        <option value="matted">Noticeably matted / may need reset</option>
                        <option value="unsure">Not sure / would like stylist to assess</option>
                      </select>
                    </div>
                  </div>

                  {/* Temperament Tags */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5">
                      Dog's Personality & Sensitivities (select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {temperamentOptions.map(trait => {
                        const isSelected = temperament.includes(trait);
                        return (
                          <button
                            key={trait}
                            type="button"
                            onClick={() => toggleTemperament(trait)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                              isSelected
                                ? 'bg-[#2A4736] text-white border-[#2A4736]'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '} {trait}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred days */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5">
                      Preferred Days of the Week for Appointment
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {daysOfWeek.map(day => {
                        const isSelected = preferredDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`w-11 h-9 rounded-lg text-xs font-bold border transition-all ${
                              isSelected
                                ? 'bg-[#2A4736] text-white border-[#2A4736]'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Questions / Message */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Specific Styling Requests, Past Experiences, or Questions
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="e.g. Teddy bear round head with fluffy ears, please keep length around 1 inch. Sensitive to back legs."
                      className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A4736]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#2A4736]" />
                    No payment required to inquire
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#2A4736] hover:bg-[#1f3629] text-white rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        Send Grooming Inquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Salon Information Sidebar (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736]">
                  Studio Location
                </span>
                <h4 className="text-xl font-serif-title font-bold text-stone-900 mt-1">
                  West Park Dog Grooming
                </h4>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#2A4736] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">Salon Address:</strong>
                    <span>72 Latchmere View, Leeds LS16 5DT</span>
                    <span className="block text-stone-500 text-xs mt-0.5">
                      (Quiet West Park residential setting with easy drop-off parking)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#2A4736] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">Hours of Operation:</strong>
                    <span>Monday – Friday: 8:30 am – 5:00 pm</span>
                    <span className="block text-stone-700 text-xs mt-0.5">
                      Saturday: 9:00 am – 4:30 pm
                    </span>
                    <span className="block text-stone-500 text-xs mt-0.5">
                      Sunday: Closed (Deep Sanitisation)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#2A4736] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">Direct Telephone:</strong>
                    <a href="tel:01133208492" className="text-[#2A4736] font-semibold hover:underline">
                      0113 320 8492
                    </a>
                    <span className="block text-stone-500 text-xs mt-0.5">
                      Call or WhatsApp during salon opening hours
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#2A4736] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">Email Inquiries:</strong>
                    <a href="mailto:hello@westparkdoggrooming.co.uk" className="text-[#2A4736] font-semibold hover:underline">
                      hello@westparkdoggrooming.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Inquiries Card */}
            <div className="bg-[#EBF1ED]/70 rounded-3xl p-6 border border-[#2A4736]/20">
              <h5 className="font-serif-title font-bold text-base text-[#1F372A] mb-2 flex items-center gap-2">
                <Dog className="w-4 h-4 text-[#2A4736]" />
                Why We Do Not Use Instant Booking
              </h5>
              <p className="text-xs text-[#2A4736] leading-relaxed">
                Automated booking systems don’t account for coat tangles, past grooming trauma, or sensitive skin. Our consultation-first approach guarantees your dog receives uninterrupted attention with zero rushing.
              </p>
            </div>

            {/* Veterinary Partner Badge */}
            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 space-y-1">
              <strong className="block text-stone-800">Veterinary Emergency Partner:</strong>
              <p>West Park Veterinary Hospital (0.4 miles away on Parkside Ave) for complete peace of mind.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
