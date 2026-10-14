import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FAQ_ITEMS } from '../data/faq';
import { Search, ChevronDown, HelpCircle, MessageSquareText } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('faq-specialty');

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'spa', label: 'Spa Treatments & Therapeutic Blow-Out' },
    { id: 'general', label: 'Specialty & Garden Studio' },
    { id: 'pricing', label: 'Starting Rates' },
    { id: 'health', label: 'Product Safety & Health' },
    { id: 'puppy', label: 'Puppies' },
    { id: 'booking', label: 'Consultations' }
  ];

  const filteredFaqs = FAQ_ITEMS.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 lg:py-20 bg-[#efe0cd] border-t border-[#af8967]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8096bb] text-white text-xs font-semibold uppercase tracking-wider mb-3 border border-white/30 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-white" />
            Client Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#af8967] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2b2520] font-sans leading-relaxed">
            Everything you need to know about our garden studio in West Park, Leeds, coat & skin care, therapeutic bath and blow out, product safety, starting rates, and spa rituals.
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
              placeholder="Search questions (e.g. coat care, therapeutic blow out, product safety)..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-white/40 text-sm text-[#13253b] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8096bb] shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#8096bb] text-white shadow-xs font-bold ring-2 ring-white'
                    : 'bg-white text-[#13253b] hover:bg-[#efe0cd] border border-[#8096bb]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordions List: Cards in #8096bb with white headings and dark blue paragraph text */}
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
                  className="bg-[#8096bb] rounded-2xl transition-all duration-200 border border-white/40 shadow-sm overflow-hidden text-white"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif-title font-bold text-base sm:text-lg text-white">
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'rotate-180 bg-white text-[#13253b]'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-white/20 animate-fadeIn">
                      <p className="text-[#13253b] text-sm leading-relaxed font-sans font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-[#8096bb] rounded-2xl border border-white/40 text-white">
              <p className="text-white text-sm font-medium">
                No matching questions found for "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 text-xs font-bold text-white underline hover:text-[#13253b] cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Still have questions banner in #8096bb */}
        <div className="mt-12 bg-[#8096bb] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-white/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 text-white">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif-title font-bold text-white">
                Have a specific question about your dog’s coat or skin?
              </h4>
              <p className="text-xs sm:text-sm text-[#13253b] font-medium">
                Every dog is unique. Send us your inquiry and our spa specialist will gladly advise on the most suitable treatments.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="shrink-0 px-6 py-3 bg-white hover:bg-[#efe0cd] text-[#13253b] font-bold text-xs sm:text-sm rounded-full transition-colors shadow-sm cursor-pointer"
          >
            Submit an Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
};
