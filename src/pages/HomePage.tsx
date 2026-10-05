import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Droplets,
  Sparkles,
  Heart,
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  FileText,
  Mail,
  Camera,
  Info,
  Waves
} from 'lucide-react';
import { GOOD_TO_KNOW } from '../data/pricing';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Welcome Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 bg-[#FAF8F5]">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider shadow-2xs">
                <Droplets className="w-3.5 h-3.5 text-[#2A4736]" />
                <span>Private Home-Based Garden Studio • West Park, Leeds</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-stone-900 tracking-tight leading-[1.15]">
                WEST PARK DOG SPA
              </h1>

              {/* Tagline */}
              <div className="text-lg sm:text-xl font-serif-title font-medium text-[#2A4736]">
                Specialist Bathing • Skin & Coat Care • Spa Treatments
              </div>

              {/* Subheading / Core Description */}
              <p className="text-base sm:text-lg text-stone-600 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A private, home-based dog spa situated within our dedicated garden studio in West Park, Leeds. We specialise in short-haired breeds, professional bathing, deshedding and specialist skin & coat care, alongside luxury spa treatments using carefully selected professional products.
              </p>

              {/* Key Service Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                  <span>Short-Haired Specialists</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                  <span>Deshed Bath & Blow-Out</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                  <span>Japanese & Korean Spas</span>
                </div>
              </div>

              {/* Primary Call to Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/pricing"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#2A4736] hover:bg-[#1a3325] text-white rounded-full font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Droplets className="w-4 h-4" />
                  View Spa Menu & Pricing
                </Link>

                <Link
                  to="/gallery"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-full font-semibold text-sm transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  View Spa Transformations
                </Link>
              </div>

              {/* Good to know summary */}
              <div className="pt-1">
                <p className="text-xs text-stone-500 italic max-w-xl mx-auto lg:mx-0">
                  * Good to know: We specialise in bathing, coat care and spa treatments rather than clipping or breed styling. All appointments are 1-on-1 private sessions.
                </p>
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
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/5 bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
                    alt="Pampered dog enjoying specialist bathing treatment"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A4736] block">
                          Dedicated Garden Studio
                        </span>
                        <h4 className="font-serif-title font-bold text-stone-900 text-base">
                          West Park, Leeds
                        </h4>
                      </div>
                      <Link
                        to="/contact"
                        className="px-3.5 py-1.5 rounded-full bg-[#2A4736] text-white text-xs font-semibold hover:bg-[#1a3325] transition-colors"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Credential Chip */}
                <div className="absolute -top-4 -left-4 bg-white px-4 py-2.5 rounded-2xl shadow-lg border border-stone-200/80 flex items-center gap-2.5 sm:flex">
                  <div className="w-8 h-8 rounded-full bg-[#EBF1ED] flex items-center justify-center text-[#2A4736]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-stone-900">Product Safety First</div>
                    <div className="text-[10px] text-stone-500">Reviewed ingredients</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spa Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736]">
            Our Core Specialty
          </span>
          <h2 className="text-3xl font-serif-title font-bold text-stone-900 mt-1">
            Why Choose West Park Dog Spa
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-xl text-stone-900">
              Short-Coat & Deshedding Experts
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              We specialise in short-haired breeds and smooth coats. Our Deshed Bath & Blow-Out evacuates dead undercoat, releases trapped dander, and restores skin breathability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-xl text-stone-900">
              Specialist Luxury Spa Treatments
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              From Japanese Marshmallow Foam and Thalassotherapy Sea Mud to Korean Carbonated Baths and Cloud Coat silk conditioning, we elevate bathing into true restorative skin care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-xl text-stone-900">
              Product Safety & Garden Studio Calm
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Before introducing products into our spa, we review ingredients, manufacturer guidance and intended use. Treatments are selected with the individual dog and coat in mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Prominent Good To Know Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EBF1ED]/80 rounded-3xl p-8 sm:p-10 border border-[#2A4736]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#2A4736] text-white flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736]">
                Clear Standards
              </span>
              <h3 className="text-2xl font-serif-title font-bold text-stone-900">
                Good to know
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-700">
            {GOOD_TO_KNOW.points.map((pt, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-[#2A4736]/15 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <span>{pt.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {pt.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Pages Directory Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6F3EE] rounded-3xl p-8 sm:p-12 border border-[#E9E4DC]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736]">
              Website Directory
            </span>
            <h2 className="text-3xl font-serif-title font-bold text-stone-900 mt-1">
              Explore Our Dedicated Pages
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2">
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
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#2A4736] transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-stone-900 group-hover:text-[#2A4736] transition-colors">
                    Spa Transformations Gallery
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    View interactive Before & After split-sliders showing short coat revivals, deshedding blow-out results, and therapeutic sea mud & foam baths.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#2A4736]">
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
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#2A4736] transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-stone-900 group-hover:text-[#2A4736] transition-colors">
                    Spa Packages & Pricing
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Interactive size calculator for Bath & Blow-Dry, Signature Experiences (Short-Coat Spa, Ultimate Spa), and specialist upgrades.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#2A4736]">
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
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#2A4736] transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-stone-900 group-hover:text-[#2A4736] transition-colors">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Answers on short-coat care, product safety, ingredient screening, starting rates, vaccinations, and our calm garden studio setting.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#2A4736]">
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
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#2A4736] transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-stone-900 group-hover:text-[#2A4736] transition-colors">
                    Terms & Policies
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Transparent guidelines regarding product safety review, 48-hour cancellation policy, starting rates, and 1-on-1 studio standards.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#2A4736]">
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
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#2A4736] transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EBF1ED] text-[#2A4736] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-stone-900 group-hover:text-[#2A4736] transition-colors">
                    Consultation & Inquiries
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Fill out our tailored spa inquiry form with breed, coat details, and temperament notes. View studio contact info, phone, and opening hours.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#2A4736]">
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
          className="bg-[#2A4736] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md"
        >
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Dedicated Garden Studio • West Park, Leeds
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
              Ready to book your dog's spa experience?
            </h2>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              Situated in a quiet West Park garden setting. We specialise in bathing, coat care and spa treatments rather than clipping or breed styling. All visits are scheduled by advance consultation to preserve our calm, tranquil environment.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="tel:01133208492"
              className="px-6 py-3.5 rounded-full border border-emerald-400/50 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              0113 320 8492
            </a>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white hover:bg-stone-100 text-[#2A4736] font-bold text-xs sm:text-sm rounded-full transition-all shadow-md"
            >
              Submit Spa Inquiry
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
