import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { TransformationGallery } from '../components/TransformationGallery';
import { TransformationItem } from '../types';
import { Sparkles, ChevronRight, Scissors } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectTransformation = (dog: TransformationItem) => {
    navigate('/contact', {
      state: {
        prefilledPackage: dog.packageUsed,
        prefilledBreed: dog.breed,
        prefilledNotes: `Hi! I saw ${dog.dogName}'s (${dog.breed}) transformation in your gallery and would love an inquiry for a similar style for my dog.`
      }
    });
  };

  return (
    <div className="min-h-screen py-8">
      {/* Page Breadcrumb & Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
          <Link to="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="font-semibold text-stone-900">Transformation Gallery</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#2A4736] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Before & After Portfolio
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900">
              Pet Transformations Gallery
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Explore our real studio transformations. Drag the interactive split-slider on each photo to examine our scissor work, matting relief, and de-shedding results.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/pricing"
              className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors"
            >
              View Pricing Packages
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full bg-[#2A4736] hover:bg-[#1a3325] text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Submit Styling Inquiry
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main Gallery Component */}
      <TransformationGallery onSelectForInquiry={handleSelectTransformation} />
    </div>
  );
};
