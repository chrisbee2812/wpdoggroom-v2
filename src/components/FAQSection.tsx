import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FAQ_ITEMS } from '../data/faq';
import { FAQItem } from '../types';
import { Search, ChevronDown, HelpCircle, MessageSquareText, Shield, Heart } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('faq-booking'); // open the booking question by default

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'booking', label: 'Inquiries & Booking' },
    { id: 'general', label: 'Grooming Process' },
    { id: 'health', label: 'Health & Behavior' },
    { id: 'puppy', label: 'Puppies' },
    { id: 'pricing', label: 'Pricing & Care' }
  ];

  const filteredFaqs = FAQ_ITEMS.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 bg-[#F3EFEA]/50 border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#2A4736]" />
            Client Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Everything you need to know about preparing your dog, our 1-on-1 gentle grooming philosophy, vaccination standards, and salon policies.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-4 max-w-4xl mx-auto">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. matted hair, vaccinations, anxious dogs, drying)..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2A4736] focus:border-transparent shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#2A4736] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10px' }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={`bg-white rounded-2xl transition-all duration-200 border ${
                    isOpen
                      ? 'border-[#2A4736]/40 shadow-sm ring-1 ring-[#2A4736]/10'
                      : 'border-stone-200/80 hover:border-stone-300 hover:shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif-title font-semibold text-base sm:text-lg text-stone-900">
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'rotate-180 bg-[#EBF1ED] text-[#2A4736]'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-stone-100/80 animate-fadeIn">
                      <p className="text-stone-700 text-sm leading-relaxed font-sans">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
              <p className="text-stone-500 text-sm">
                No matching questions found for "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 text-xs font-semibold text-[#2A4736] underline hover:text-[#183123]"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 bg-[#2A4736] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <MessageSquareText className="w-6 h-6 text-stone-100" />
            </div>
            <div>
              <h4 className="text-lg font-serif-title font-bold text-white">
                Have a specific question about your dog?
              </h4>
              <p className="text-xs sm:text-sm text-stone-200">
                Every pup is an individual. Submit an inquiry form below with photos or notes, and our lead groomer will get back to you personally.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="shrink-0 px-6 py-3 bg-white hover:bg-stone-100 text-[#2A4736] font-semibold text-xs sm:text-sm rounded-full transition-colors shadow-sm"
          >
            Submit an Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
};
