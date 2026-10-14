import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TRANSFORMATION_GALLERY } from '../data/transformations';
import { TransformationItem } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Sparkles, Clock, Droplets, X } from 'lucide-react';

interface TransformationGalleryProps {
  onSelectForInquiry?: (dog: TransformationItem) => void;
}

export const TransformationGallery: React.FC<TransformationGalleryProps> = ({ onSelectForInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<TransformationItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Transformations' },
    { id: 'short-coat', label: 'Coat & Skin Care' },
    { id: 'deshed', label: 'Therapeutic Bath & Blow-Out' },
    { id: 'spa-treatment', label: 'Specialist Spa Treatments' },
    { id: 'deep-clean', label: 'Deep Clean Clarification' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? TRANSFORMATION_GALLERY
    : TRANSFORMATION_GALLERY.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 lg:py-20 bg-[#efe0cd] border-t border-b border-[#af8967]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8096bb] text-white text-xs font-semibold uppercase tracking-wider mb-3 border border-white/30 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Real Studio Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#af8967] tracking-tight">
            Dog Spa Transformations Gallery
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2b2520] font-sans leading-relaxed">
            See how our specialist bathing, therapeutic bath and blow out, and luxury spa treatments revitalize coats, soothe sensitive skin, and impart incredible high-gloss shine.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#8096bb] text-white shadow-sm ring-2 ring-white border border-white/40 font-bold'
                  : 'bg-white text-[#13253b] hover:bg-[#efe0cd] border border-[#8096bb]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid of #8096bb Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#8096bb] rounded-2xl overflow-hidden border border-white/40 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group text-white"
            >
              {/* Interactive Split Comparison */}
              <div className="p-3 bg-white/10">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  dogName={item.dogName}
                />
              </div>

              {/* Card Details: white headings and darker blue paragraph text */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-serif-title font-bold text-white group-hover:text-white transition-colors">
                        {item.dogName}
                      </h3>
                      <p className="text-sm font-bold text-white/90">
                        {item.breed} • <span className="text-white/80 font-normal">{item.age}</span>
                      </p>
                    </div>
                    <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-white text-[#13253b] border border-white shadow-2xs">
                      {item.packageUsed}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-white/90 mb-4 pb-3 border-b border-white/20">
                    <span className="flex items-center gap-1 font-medium">
                      <Droplets className="w-3.5 h-3.5 text-white" />
                      {item.service}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-white" />
                      {item.duration}
                    </span>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2 text-xs mb-4">
                    <div className="p-2.5 rounded-lg bg-white/20 border border-white/20">
                      <span className="font-bold text-white block mb-0.5">Before arrival:</span>
                      <p className="text-[#13253b] font-medium line-clamp-2">{item.beforeDescription}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/30 border border-white/30">
                      <span className="font-bold text-white block mb-0.5">Spa outcome:</span>
                      <p className="text-[#13253b] font-bold line-clamp-2">{item.afterDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/20">
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="text-xs font-bold text-white underline hover:text-[#13253b] cursor-pointer"
                  >
                    View Details & Notes
                  </button>

                  {onSelectForInquiry && (
                    <button
                      type="button"
                      onClick={() => onSelectForInquiry(item)}
                      className="px-3 py-1.5 rounded-lg bg-white text-[#13253b] font-bold text-xs hover:bg-[#efe0cd] transition-colors shadow-2xs cursor-pointer"
                    >
                      Inquire Similar
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for detail view */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#8096bb] rounded-3xl max-w-2xl w-full border border-white/50 shadow-2xl p-6 sm:p-8 text-white relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                  Detailed Case Study
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-white mb-1">
                {activeModalItem.dogName} ({activeModalItem.breed})
              </h3>
              <p className="text-xs text-[#13253b] font-bold mb-4">
                Service: {activeModalItem.service} • Package: {activeModalItem.packageUsed}
              </p>

              <div className="rounded-xl overflow-hidden mb-6 border border-white/30">
                <BeforeAfterSlider
                  beforeImage={activeModalItem.beforeImage}
                  afterImage={activeModalItem.afterImage}
                  dogName={activeModalItem.dogName}
                />
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 bg-white/20 rounded-xl border border-white/20">
                  <strong className="text-white block mb-1">Before Condition:</strong>
                  <p className="text-[#13253b] font-medium leading-relaxed">{activeModalItem.beforeDescription}</p>
                </div>
                <div className="p-3 bg-white/30 rounded-xl border border-white/30">
                  <strong className="text-white block mb-1">Treatment & Outcome:</strong>
                  <p className="text-[#13253b] font-bold leading-relaxed">{activeModalItem.afterDescription}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl border border-white/20">
                  <strong className="text-white block mb-1">Specialist Notes:</strong>
                  <p className="text-[#13253b] font-medium leading-relaxed">{activeModalItem.groomerNotes}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 rounded-full border border-white/50 text-white text-xs font-bold hover:bg-white/10 cursor-pointer"
                >
                  Close
                </button>
                {onSelectForInquiry && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectForInquiry(activeModalItem);
                      setActiveModalItem(null);
                    }}
                    className="px-5 py-2 rounded-full bg-white text-[#13253b] font-bold text-xs hover:bg-[#efe0cd] shadow-xs cursor-pointer"
                  >
                    Inquire For Similar Spa
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
