import React from 'react';
import { Sparkles, Shield, Heart, Scissors, Clock, ArrowDown, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#FAF8F5]">
      {/* Subtle organic background aura */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EBF1ED]/80 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-50/70 blur-2xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF1ED] border border-[#2A4736]/15 text-[#2A4736] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#2A4736]" />
              Dedicated 1-on-1 Gentle Grooming Studio
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-stone-900 tracking-tight leading-[1.12]">
              Where every dog is treated like <span className="italic font-normal text-[#2A4736]">family</span>.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
              Welcome to <strong>West Park Dog Grooming</strong>. We specialize in stress-free, cage-free grooming sessions tailored to your dog’s coat, personality, and physical comfort. From custom scissoring to intensive de-shedding, we take the time to do it right.
            </p>

            {/* Value Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-left pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                <span>1-on-1 Private Sessions</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                <span>Fear-Free Certified Handling</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                <span>100% Organic Botanical Shampoos</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                <span>No Cages or Forced Drying</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#gallery"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#2A4736] hover:bg-[#1a3325] text-white rounded-full font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Scissors className="w-4 h-4" />
                View Transformation Gallery
              </a>

              <a
                href="#pricing"
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-full font-semibold text-sm transition-all shadow-2xs flex items-center justify-center gap-2"
              >
                Pricing Packages
              </a>
            </div>

            {/* Note regarding consultation & no booking */}
            <div className="pt-2">
              <p className="text-xs text-stone-500 italic max-w-xl mx-auto lg:mx-0">
                * We operate on a consultation & inquiry basis rather than generic automated booking, ensuring every pet receives the ideal timing and individualized care.
              </p>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Large Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
                  alt="Happy pampered dog enjoying grooming at West Park"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating overlay pill 1 */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-stone-150 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBF1ED] flex items-center justify-center text-[#2A4736]">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                      Salon Philosophy
                    </span>
                    <span className="text-xs font-bold text-stone-900 block">
                      Comfort Over Vanity
                    </span>
                  </div>
                </div>

                {/* Floating overlay pill 2 */}
                <div className="absolute bottom-4 right-4 bg-stone-900/90 text-white backdrop-blur-md rounded-2xl p-3 shadow-lg border border-stone-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2A4736] flex items-center justify-center text-white">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-300 block tracking-wider">
                      Pet Safety
                    </span>
                    <span className="text-xs font-bold text-white block">
                      Fear-Free Certified
                    </span>
                  </div>
                </div>
              </div>

              {/* Small accent image card */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-44 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80"
                  alt="Freshly groomed schnauzer"
                  referrerPolicy="no-referrer"
                  className="w-full h-28 object-cover rounded-xl"
                />
                <div className="pt-2 text-center">
                  <span className="text-[11px] font-bold text-stone-800 block">West Park Studio</span>
                  <span className="text-[10px] text-[#2A4736] font-medium">Bespoke Styling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
