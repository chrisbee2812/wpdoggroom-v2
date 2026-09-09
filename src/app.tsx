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
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#242220] selection:bg-[#2A4736]/20 selection:text-[#183123]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dedicated Separate Page Routes */}
        <main className="flex-1">
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

        {/* Floating Inquiry Log Access Button */}
        <div className="fixed bottom-5 right-5 z-30">
          <button
            type="button"
            onClick={() => setShowInquiryLog(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-stone-800 border border-stone-300 shadow-md hover:shadow-lg hover:border-[#2A4736] text-xs font-semibold transition-all group cursor-pointer"
            title="View submitted client inquiries"
          >
            <ClipboardList className="w-4 h-4 text-[#2A4736] group-hover:scale-110 transition-transform" />
            <span>Inquiry Log</span>
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
