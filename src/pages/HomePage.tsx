import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Droplets,
  Sparkles,
  ShieldCheck,
  Phone,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  FileText,
  Mail,
  Camera,
  Info
} from 'lucide-react';
import { GOOD_TO_KNOW } from '../data/pricing';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 lg:space-y-24 bg-[#efe0cd]">
      {/* Hero Welcome Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 bg-[#efe0cd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative Column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Quality Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8096bb] text-white text-xs font-semibold uppercase tracking-wider shadow-2xs border border-white/30">
                <Droplets className="w-3.5 h-3.5 text-white" />
                <span>Private Home-Based Garden Studio • West Park, Leeds</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-[#af8967] tracking-tight leading-[1.15]">
                WEST PARK LUXURY DOG SPA
              </h1>

              {/* Tagline */}
              <div className="text-lg sm:text-xl font-serif-title font-medium text-[#13253b]">
                Specialist Bathing • Skin & Coat Care • Spa Treatments
              </div>

              {/* Subheading / Core Description */}
              <p className="text-base sm:text-lg text-[#2b2520] font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We are coat & skin specialists focusing on professional bathing, therapeutic bath and blow out, alongside luxury spa treatments using carefully selected professional products.
              </p>

              {/* Key Service Highlights in #8096bb cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#8096bb] text-white border border-white/30 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Coat & Skin Specialists</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#8096bb] text-white border border-white/30 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Therapeutic Bath & Blow-Out</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#8096bb] text-white border border-white/30 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Japanese & Korean Spas</span>
                </div>
              </div>

              {/* Primary Call to Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/pricing"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#8096bb] hover:bg-[#6e85ab] text-white rounded-full font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-white/30"
                >
                  <Droplets className="w-4 h-4 text-white" />
                  View Spa Menu & Pricing
                </Link>

                <Link
                  to="/gallery"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#efe0cd]/50 text-[#13253b] border border-[#8096bb]/50 rounded-full font-semibold text-sm transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#af8967]" />
                  View Spa Transformations
                </Link>
              </div>

              {/* Important Info Card: Good to know summary */}
              <div className="pt-1">
                <div className="p-3.5 rounded-2xl bg-[#8096bb] border border-white/30 shadow-xs max-w-xl mx-auto lg:mx-0">
                  <span className="font-serif-title font-bold text-xs text-white block mb-0.5">
                    Good to know:
                  </span>
                  <p className="text-xs text-[#13253b] font-medium leading-relaxed">
                    We specialise in bathing, coat care and spa treatments rather than clipping or breed styling. All appointments are 1-on-1 private sessions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none group">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/5 bg-[#8096bb]">
                  <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
                    alt="Pampered dog enjoying specialist bathing treatment"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#13253b]/80 via-transparent to-transparent" />
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#8096bb]/95 backdrop-blur-md border border-white/50 shadow-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/85 block">
                          Dedicated Garden Studio
                        </span>
                        <h4 className="font-serif-title font-bold text-white text-base">
                          West Park, Leeds
                        </h4>
                      </div>
                      <Link
                        to="/contact"
                        className="px-3.5 py-1.5 rounded-full bg-white text-[#13253b] text-xs font-bold hover:bg-[#efe0cd] transition-colors shadow-2xs"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Credential Chip */}
                <div className="absolute -top-4 -left-4 bg-[#8096bb] px-4 py-2.5 rounded-2xl shadow-lg border border-white/40 flex items-center gap-2.5 sm:flex text-white">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">Product Safety First</div>
                    <div className="text-[10px] text-[#13253b] font-semibold">Reviewed ingredients</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spa Pillars in #8096bb Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#13253b]">
            Our Core Specialty
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#af8967] mt-1">
            Why Choose West Park Luxury Dog Spa
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#8096bb] p-7 rounded-2xl border border-white/30 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-xl text-white">
              Coat & Skin Specialists
            </h3>
            <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans">
              We specialise in coat & skin care. Our Therapeutic Bath & Blow-Out evacuates dead undercoat, releases trapped dander, replenishes moisture, and restores healthy epidermal breathability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#8096bb] p-7 rounded-2xl border border-white/30 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-xl text-white">
              Specialist Luxury Spa Treatments
            </h3>
            <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans">
              From Japanese Marshmallow Foam and Thalassotherapy Sea Mud to Korean Carbonated Baths and Cloud Coat silk conditioning, we elevate bathing into true restorative skin care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#8096bb] p-7 pb-10 sm:pb-7 rounded-2xl border border-white/30 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-xl text-white">
              Product Safety & Garden Studio Calm
            </h3>
            <p className="text-xs sm:text-sm text-[#13253b] font-medium leading-relaxed font-sans pr-2 sm:pr-0">
              Before introducing products into our spa, we review ingredients, manufacturer guidance and intended use. Treatments are selected with the individual dog and coat in mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Prominent Good To Know Important Info Cards: bg #8096bb with white headings and darker blue paragraph text */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#8096bb] rounded-3xl p-8 sm:p-10 border border-white/30 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white text-[#13253b] flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-[#8096bb]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Clear Standards
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
                Good to know
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOD_TO_KNOW.points.map((pt, i) => (
              <div key={i} className="bg-[#8096bb] p-5 sm:p-6 pb-10 sm:pb-6 rounded-2xl border border-white/40 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <span className="w-6 h-6 rounded-full bg-white text-[#13253b] flex items-center justify-center text-xs font-bold shrink-0">
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
        </div>
      </section>

      {/* Explore Pages Directory Cards in #8096bb */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#efe0cd] rounded-3xl p-8 sm:p-12 border border-[#af8967]/25 shadow-xs">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#13253b]">
              Website Directory
            </span>
            <h2 className="text-3xl font-serif-title font-bold text-[#af8967] mt-1">
              Explore Our Dedicated Pages
            </h2>
            <p className="text-[#2b2520] text-xs sm:text-sm mt-2">
              Browse our separate sections to view transformations, inspect size-tiered pricing, read policies, and submit a consultation inquiry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Page 1: Transformations Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.04 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link
                to="/gallery"
                className="bg-[#8096bb] rounded-2xl p-6 pb-9 sm:pb-6 border border-white/30 shadow-xs hover:shadow-md hover:border-white transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-white group-hover:text-white transition-colors">
                    Spa Transformations Gallery
                  </h3>
                  <p className="text-xs text-[#13253b] font-medium mt-2 leading-relaxed pr-2 sm:pr-0">
                    View interactive Before & After split-sliders showing coat & skin care revivals, therapeutic bath and blow out results, and restorative sea mud & foam baths.
                  </p>
                </div>
                <div className="mt-6 pt-4 pb-1 pr-6 sm:pr-0 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white">
                  <span>Open Gallery Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Page 2: Pricing Packages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link
                to="/pricing"
                className="bg-[#8096bb] rounded-2xl p-6 pb-9 sm:pb-6 border border-white/30 shadow-xs hover:shadow-md hover:border-white transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-white group-hover:text-white transition-colors">
                    Spa Packages & Pricing
                  </h3>
                  <p className="text-xs text-[#13253b] font-medium mt-2 leading-relaxed pr-2 sm:pr-0">
                    Interactive size calculator for Bath & Blow-Dry, Therapeutic Bath & Blow-Out, Signature Experiences, and specialist upgrades.
                  </p>
                  <p className="text-[11px] text-white/90 font-medium mt-2 italic pr-2 sm:pr-0">
                    Prices are starting estimates and may vary depending on coat type, condition, thickness, temperament and the time required.
                  </p>
                </div>
                <div className="mt-6 pt-4 pb-1 pr-6 sm:pr-0 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white">
                  <span>Open Pricing Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Page 3: FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.12 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link
                to="/faq"
                className="bg-[#8096bb] rounded-2xl p-6 border border-white/30 shadow-xs hover:shadow-md hover:border-white transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-white group-hover:text-white transition-colors">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-[#13253b] font-medium mt-2 leading-relaxed">
                    Answers on coat & skin specialists, therapeutic bath and blow out, product safety, ingredient screening, starting rates, and vaccinations.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white">
                  <span>Open FAQ Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Page 4: Terms & Policies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.16 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link
                to="/terms"
                className="bg-[#8096bb] rounded-2xl p-6 border border-white/30 shadow-xs hover:shadow-md hover:border-white transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-white group-hover:text-white transition-colors">
                    Terms & Policies
                  </h3>
                  <p className="text-xs text-[#13253b] font-medium mt-2 leading-relaxed">
                    Transparent guidelines regarding product safety review, 48-hour cancellation policy, starting rates, and 1-on-1 studio standards.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white">
                  <span>Open Terms Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Page 5: Contact & Inquiries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="sm:col-span-2 lg:col-span-2"
            >
              <Link
                to="/contact"
                className="bg-[#8096bb] rounded-2xl p-6 border border-white/30 shadow-xs hover:shadow-md hover:border-white transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-white group-hover:text-white transition-colors">
                    Consultation & Inquiries
                  </h3>
                  <p className="text-xs text-[#13253b] font-medium mt-2 leading-relaxed">
                    Fill out our tailored spa inquiry form with breed, coat details, and temperament notes. View studio contact info, phone, and opening hours.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white">
                  <span>Open Consultation & Inquiry Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Garden Studio Location & Hours Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-[#8096bb] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md border border-white/40"
        >
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-white/90">
              Dedicated Garden Studio • West Park, Leeds
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
              Ready to book your dog's spa experience?
            </h2>
            <p className="text-[#13253b] font-medium text-xs sm:text-sm leading-relaxed">
              Situated in a quiet West Park garden setting. We specialise in bathing, coat care and spa treatments rather than clipping or breed styling. All visits are scheduled by advance consultation to preserve our calm, tranquil environment.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="tel:01133208492"
              className="px-6 py-3.5 rounded-full border border-white/50 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-white" />
              0113 320 8492
            </a>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white hover:bg-[#efe0cd] text-[#13253b] font-bold text-xs sm:text-sm rounded-full transition-all shadow-md"
            >
              Submit Spa Inquiry
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
