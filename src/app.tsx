/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { PricingPage } from './pages/PricingPage';
import { FAQPage } from './pages/FAQPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { InquiryLogModal } from './components/InquiryLogModal';
import { ClipboardList } from 'lucide-react';

export default function App() {
  const [showInquiryLog, setShowInquiryLog] = useState(false);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#efe0cd] text-[#2b2520] selection:bg-[#af8967]/30 selection:text-[#13253b]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dedicated Separate Page Routes */}
        <main className="flex-1 pb-16 sm:pb-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Salon Footer */}
        <Footer />

        {/* Floating Inquiry Log Access Button - Adjusted position & mobile-optimized clearance */}
        <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 pointer-events-auto">
          <button
            type="button"
            onClick={() => setShowInquiryLog(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#8096bb]/95 hover:bg-[#6e85ab] text-white border border-white/50 shadow-xl hover:shadow-2xl text-[11px] sm:text-xs font-semibold transition-all group cursor-pointer backdrop-blur-md active:scale-95 ring-1 ring-black/10"
            title="View submitted client inquiries"
          >
            <ClipboardList className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">Inquiry Log</span>
          </button>
        </div>

        {/* Inquiry History Modal */}
        <InquiryLogModal
          isOpen={showInquiryLog}
          onClose={() => setShowInquiryLog(false)}
        />
      </div>
    </HashRouter>
  );
}
