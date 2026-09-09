import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { TRANSFORMATION_GALLERY } from '../data/transformations';
import { TransformationItem } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Sparkles, Clock, Scissors, Info, ArrowUpRight, CheckCircle2, X } from 'lucide-react';

interface TransformationGalleryProps {
  onSelectForInquiry?: (dog: TransformationItem) => void;
}

export const TransformationGallery: React.FC<TransformationGalleryProps> = ({ onSelectForInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<TransformationItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Transformations' },
    { id: 'doodle', label: 'Doodles & Curly' },
    { id: 'double-coat', label: 'Double Coats & De-Shed' },
    { id: 'styling', label: 'Breed Scissoring' },
    { id: 'small-breed', label: 'Small Breeds' },
    { id: 'senior-rescue', label: 'Senior & Gentle Care' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? TRANSFORMATION_GALLERY
    : TRANSFORMATION_GALLERY.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-[#F3EFEA]/60 border-t border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2A4736]" />
            Real Studio Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight">
            Pet Transformations Gallery
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Every coat has a story. Explore our before-and-after transformations showcasing gentle de-matting, breed standard scissoring, deep undercoat restoration, and calming puppy resets.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-[#2A4736] text-white shadow-sm ring-2 ring-[#2A4736]/20'
                  : 'bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group"
            >
              {/* Interactive Split Comparison */}
              <div className="p-3 bg-stone-50/50">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  dogName={item.dogName}
                />
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-serif-title font-bold text-stone-900 group-hover:text-[#2A4736] transition-colors">
                        {item.dogName}
                      </h3>
                      <p className="text-sm font-medium text-[#2A4736]">
                        {item.breed} • <span className="text-stone-500">{item.age}</span>
                      </p>
                    </div>
                    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {item.packageUsed}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-stone-500 mb-4 pb-3 border-b border-stone-100">
                    <span className="flex items-center gap-1">
                      <Scissors className="w-3.5 h-3.5 text-stone-400" />
                      {item.service}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {item.duration}
                    </span>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2 text-xs mb-4">
                    <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                      <span className="font-semibold text-stone-700 block mb-0.5">Before condition:</span>
                      <p className="text-stone-600 line-clamp-2">{item.beforeDescription}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#EBF1ED]/70 border border-[#2A4736]/10">
                      <span className="font-semibold text-[#1F372A] block mb-0.5">Transformation result:</span>
                      <p className="text-[#2A4736] line-clamp-2">{item.afterDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-[#2A4736] transition-colors py-1.5 px-2 rounded hover:bg-stone-50 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Stylist notes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectForInquiry) {
                        onSelectForInquiry(item);
                      } else {
                        const el = document.getElementById('inquiry');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2A4736] hover:text-[#183123] bg-[#EBF1ED] hover:bg-[#dfebe3] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    Inquire for this look
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery bottom reassurance */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EBF1ED] flex items-center justify-center shrink-0 text-[#2A4736]">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-title font-bold text-lg text-stone-900">
                Looking for a specific breed clip or style?
              </h4>
              <p className="text-sm text-stone-600">
                Bring reference photos or tell us your lifestyle preferences. We customize every single clip for comfort, weather, and personality.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-5 py-2.5 bg-[#2A4736] hover:bg-[#1f3629] text-white rounded-full text-sm font-semibold transition-colors shadow-sm"
          >
            Start Styling Inquiry
          </Link>
        </div>
      </div>

      {/* Stylist Notes Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#2A4736]">
                  Styling Case Study
                </div>
                <h3 className="text-2xl font-serif-title font-bold text-stone-900">
                  {activeModalItem.dogName} • {activeModalItem.breed}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Modal Slider */}
              <BeforeAfterSlider
                beforeImage={activeModalItem.beforeImage}
                afterImage={activeModalItem.afterImage}
                dogName={activeModalItem.dogName}
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[11px] text-stone-500 uppercase font-medium">Age</span>
                  <div className="font-semibold text-stone-900 text-sm mt-0.5">{activeModalItem.age}</div>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[11px] text-stone-500 uppercase font-medium">Duration</span>
                  <div className="font-semibold text-stone-900 text-sm mt-0.5">{activeModalItem.duration}</div>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[11px] text-stone-500 uppercase font-medium">Package</span>
                  <div className="font-semibold text-stone-900 text-sm mt-0.5">{activeModalItem.packageUsed}</div>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[11px] text-stone-500 uppercase font-medium">Category</span>
                  <div className="font-semibold text-stone-900 text-sm mt-0.5">{activeModalItem.categoryLabel}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2A4736]" />
                    Before & After Evaluation
                  </h5>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-stone-50 text-stone-700 border border-stone-200">
                      <strong className="block text-stone-900 mb-1">Arrival Assessment:</strong>
                      {activeModalItem.beforeDescription}
                    </div>
                    <div className="p-3 rounded-lg bg-[#EBF1ED] text-[#1F372A] border border-[#2A4736]/20">
                      <strong className="block text-[#1F372A] mb-1">Grooming Outcome:</strong>
                      {activeModalItem.afterDescription}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs leading-relaxed">
                  <strong className="block font-bold text-amber-900 mb-1">Lead Stylist Notes & Handling Technique:</strong>
                  {activeModalItem.groomerNotes}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const item = activeModalItem;
                  setActiveModalItem(null);
                  if (onSelectForInquiry) {
                    onSelectForInquiry(item);
                  } else {
                    const el = document.getElementById('inquiry');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-5 py-2 rounded-full bg-[#2A4736] hover:bg-[#1a3325] text-white text-xs font-semibold transition-colors"
              >
                Inquire For Similar Breed
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
