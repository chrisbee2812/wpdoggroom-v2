import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, Droplets, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#efe0cd]">
      {/* Subtle organic background aura */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#8096bb]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#af8967]/15 blur-2xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8096bb] text-white text-xs font-semibold uppercase tracking-wider shadow-xs">
              <Droplets className="w-3.5 h-3.5 text-white" />
              Dedicated Garden Studio • West Park, Leeds
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-[#af8967] tracking-tight leading-[1.12]">
              Specialist Bathing, Skin & Coat Care <span className="italic font-normal text-[#152438]">& Luxury Spa Treatments</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#2b2520] max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
              Welcome to <strong>West Park Luxury Dog Spa</strong>. A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We are coat & skin specialists focusing on professional bathing, therapeutic bath and blow out, alongside luxury spa treatments using carefully selected professional products.
            </p>

            {/* Value Checkmarks Cards - styled on #8096bb */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-left pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#8096bb] border border-white/30 text-white shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Coat & Skin Specialists</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#8096bb] border border-white/30 text-white shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Therapeutic Bath & Blow-Out</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#8096bb] border border-white/30 text-white shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Private 1-on-1 Garden Studio</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#8096bb] border border-white/30 text-white shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Carefully Reviewed Product Safety</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                to="/pricing"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#8096bb] hover:bg-[#6e85ab] text-white rounded-full font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-white/40"
              >
                <Droplets className="w-4 h-4 text-white" />
                Explore Spa Menu & Pricing
              </Link>

              <Link
                to="/gallery"
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#efe0cd]/50 text-[#152438] border border-[#8096bb]/40 rounded-full font-semibold text-sm transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#af8967]" />
                View Spa Transformations
              </Link>
            </div>

            {/* Important Info Card: Good to Know */}
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-[#8096bb] border border-white/30 shadow-xs max-w-xl mx-auto lg:mx-0">
                <h4 className="font-serif-title font-bold text-sm text-white mb-1">
                  Good to know:
                </h4>
                <p className="text-xs text-[#13253b] font-medium leading-relaxed">
                  We specialise in bathing, coat care and spa treatments rather than clipping or breed styling. All sessions are 1-on-1 by advance consultation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Large Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5] bg-[#8096bb]">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
                  alt="Happy pampering dog enjoying bath at West Park Luxury Dog Spa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating overlay card 1 */}
                <div className="absolute top-4 left-4 bg-[#8096bb]/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/40 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/80 block tracking-wider">
                      Garden Studio
                    </span>
                    <span className="text-xs font-bold text-white block">
                      Calm 1-on-1 Sanctuary
                    </span>
                  </div>
                </div>

                {/* Floating overlay card 2 */}
                <div className="absolute bottom-4 right-4 bg-[#8096bb]/95 text-white backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/40 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/80 block tracking-wider">
                      Ingredients First
                    </span>
                    <span className="text-xs font-bold text-white block">
                      Product Safety Assessed
                    </span>
                  </div>
                </div>
              </div>

              {/* Small accent image card */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-44 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-[#8096bb] p-2">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80"
                  alt="Sleek glossy coat after therapeutic blow-out"
                  referrerPolicy="no-referrer"
                  className="w-full h-28 object-cover rounded-xl"
                />
                <div className="pt-2 text-center">
                  <span className="text-[11px] font-bold text-white block">West Park Luxury Dog Spa</span>
                  <span className="text-[10px] text-[#13253b] font-bold">Therapeutic Coat Gloss</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
