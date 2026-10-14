import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { TransformationGallery } from '../components/TransformationGallery';
import { TransformationItem } from '../types';
import { ChevronRight, Droplets } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectTransformation = (dog: TransformationItem) => {
    navigate('/contact', {
      state: {
        prefilledPackage: dog.packageUsed,
        prefilledBreed: dog.breed,
        prefilledNotes: `Hi! I saw ${dog.dogName}'s (${dog.breed}) transformation in your gallery and would love an inquiry for a similar spa experience for my dog.`
      }
    });
  };

  return (
    <div className="min-h-screen py-8 bg-[#efe0cd]">
      {/* Page Breadcrumb & Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-[#2b2520] mb-4 font-medium">
          <Link to="/" className="hover:text-[#13253b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#13253b]" />
          <span className="font-bold text-[#13253b]">Spa Transformations Gallery</span>
        </div>

        {/* Important Info Header Card in #8096bb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-[#8096bb] rounded-3xl p-8 sm:p-10 border border-white/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/30">
              <Droplets className="w-3.5 h-3.5" />
              Before & After Spa Results
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-white">
              Spa Transformations Gallery
            </h1>
            <p className="text-[#13253b] font-medium text-sm sm:text-base leading-relaxed font-sans">
              Explore our real studio transformations. Drag the interactive split-slider on each photo to examine coat & skin care revivals, therapeutic bath and blow out results, and luxurious Japanese & Korean spa therapies in our West Park garden studio.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/pricing"
              className="px-5 py-2.5 rounded-full border border-white/60 text-white hover:bg-white/20 text-xs font-semibold transition-colors"
            >
              View Spa Packages
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full bg-white hover:bg-[#efe0cd] text-[#13253b] text-xs font-bold transition-colors shadow-sm"
            >
              Book Spa Consultation
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main Gallery Component */}
      <TransformationGallery onSelectForInquiry={handleSelectTransformation} />
    </div>
  );
};
