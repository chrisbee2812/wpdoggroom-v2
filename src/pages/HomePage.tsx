import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Scissors,
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
  Camera
} from 'lucide-react';

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
                <Sparkles className="w-3.5 h-3.5 text-[#2A4736]" />
                <span>Cage-Free • 1-on-1 Private Appointments</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-stone-900 tracking-tight leading-[1.15]">
                Calm, Gentle Grooming Tailored to Your Dog.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-stone-600 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Welcome to West Park Dog Grooming. We provide a peaceful, fear-free sanctuary where every pet receives dedicated one-on-one attention, organic botanical spa washes, and master hand-scissoring.
              </p>

              {/* Key Service Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                  <span>Fear-Free Handling</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                  <span>100% Organic Products</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2A4736] shrink-0" />
                  <span>No Cage Dryers</span>
                </div>
              </div>

              {/* Primary Call to Action buttons linking to separate pages */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/gallery"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#2A4736] hover:bg-[#1a3325] text-white rounded-full font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Scissors className="w-4 h-4" />
                  View Transformation Gallery
                </Link>

                <Link
                  to="/pricing"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-full font-semibold text-sm transition-all shadow-2xs flex items-center justify-center gap-2"
                >
                  View Pricing & Services
                </Link>
              </div>

              {/* Notice regarding consultation model */}
              <div className="pt-1">
                <p className="text-xs text-stone-500 italic max-w-xl mx-auto lg:mx-0">
                  * We operate on a personalized consultation & inquiry model rather than generic automated booking, guaranteeing dedicated attention and accurate timing for every coat.
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
                    src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1000&q=80"
                    alt="Happy freshly groomed dog receiving gentle care"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A4736] block">
                          West Park Studio
                        </span>
                        <h4 className="font-serif-title font-bold text-stone-900 text-base">
                          Private 1-on-1 Sessions
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
                <div className="absolute -top-4 -left-4 bg-white px-4 py-2.5 rounded-2xl shadow-lg border border-stone-200/80 items-center gap-2.5 hidden sm:flex">
                  <div className="w-8 h-8 rounded-full bg-[#EBF1ED] flex items-center justify-center text-[#2A4736]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-stone-900">Fear-Free Certified</div>
                    <div className="text-[10px] text-stone-500">Low-stress techniques</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Salon Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#2A4736]">
            The West Park Standard
          </span>
          <h2 className="text-3xl font-serif-title font-bold text-stone-900 mt-1">
            Why Pet Parents Choose Our Studio
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
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-xl text-stone-900">
              1-on-1 Gentle Care
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We never juggle multiple pets simultaneously. Your dog enjoys uninterrupted personal attention in a quiet, cage-free boutique environment.
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
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-xl text-stone-900">
              Bespoke Breed Styling
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Whether you want a signature round Asian-fusion teddy head, breed-standard schnauzer profile, or easy summer comb-out, we tailor every groom.
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
              Comfort Over Vanity
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We strictly pledge never to pull painfully on matted hair or force an anxious dog. Animal wellness, dignity, and trust always take top priority.
            </p>
          </motion.div>
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
              Browse our separate sections to view transformations, inspect size-tiered pricing, read policies, and submit an inquiry.
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
                    Transformation Gallery
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    View interactive Before & After split-sliders showing curls, de-shedding, matted coat relief, and breed scissoring.
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
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title font-bold text-xl text-stone-900 group-hover:text-[#2A4736] transition-colors">
                    Pricing & Services
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Interactive dog size calculator, 4 core packages (Bath & Dry, Custom Groom, De-Shed, Puppy), and a la carte spa treatments.
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
                    Searchable client answers for vaccinations, grooming frequency, nervous pets, puppy prep, and appointment timing.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#2A4736]">
                  <span>Open FAQ Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Page 4: Terms & Conditions */}
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
                    Transparent guidelines regarding our humane matting pledge, 48-hour cancellation policy, and health requirements.
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
                    Contact & Consultation Inquiries
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Fill out our customized dog inquiry form with breed, coat details, and temperament notes. View studio map, opening hours, and phone contact.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#2A4736]">
                  <span>Open Contact & Inquiry Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Salon Location & Hours Summary */}
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
              West Park, Leeds Studio Location
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
              Ready to schedule your dog's consultation?
            </h2>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              Located at 72 Latchmere View, Leeds LS16 5DT. Open Monday through Saturday. All visits are scheduled by advance consultation to maintain a tranquil, calm environment.
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
              Submit Styling Inquiry
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
