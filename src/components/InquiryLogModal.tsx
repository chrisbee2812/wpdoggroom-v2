import React, { useState, useEffect } from 'react';
import { InquiryFormData } from '../types';
import { X, Clock, Mail, Phone, Dog, Trash2 } from 'lucide-react';

interface InquiryLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryLogModal: React.FC<InquiryLogModalProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<InquiryFormData[]>([]);

  const loadInquiries = () => {
    try {
      const data1 = JSON.parse(localStorage.getItem('west_park_spa_inquiries') || '[]');
      const data2 = JSON.parse(localStorage.getItem('west_park_inquiries') || '[]');
      setInquiries([...data1, ...data2]);
    } catch {
      setInquiries([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadInquiries();
    }
  }, [isOpen]);

  const clearAll = () => {
    if (confirm('Clear stored inquiries from local browser history?')) {
      localStorage.removeItem('west_park_spa_inquiries');
      localStorage.removeItem('west_park_inquiries');
      setInquiries([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#efe0cd] rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-[#8096bb]/40 shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-[#af8967]/20 flex items-center justify-between bg-[#efe0cd]">
          <div>
            <h3 className="font-serif-title text-xl font-bold text-[#af8967]">
              Submitted Inquiries Log
            </h3>
            <p className="text-xs text-[#2b2520] font-medium">
              Client inquiries stored in your browser session ({inquiries.length} total)
            </p>
          </div>
          <div className="flex items-center gap-2">
            {inquiries.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-rose-700 hover:text-rose-900 px-2 py-1 flex items-center gap-1 font-semibold cursor-pointer"
                title="Clear all stored inquiries"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#8096bb] hover:bg-[#6e85ab] flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {inquiries.length === 0 ? (
            <div className="text-center py-12 text-[#2b2520] text-xs">
              <Dog className="w-8 h-8 mx-auto mb-2 text-[#8096bb]" />
              <p className="font-bold">No inquiries submitted yet.</p>
              <p className="text-stone-600 mt-1">
                Fill out the inquiry form on the website to submit your first spa consultation request.
              </p>
            </div>
          ) : (
            inquiries.map(inq => (
              <div
                key={inq.id}
                className="p-4 rounded-2xl border border-white/40 bg-[#8096bb] text-white space-y-2 text-xs shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-white text-sm bg-white/20 px-2 py-0.5 rounded">
                    {inq.id}
                  </span>
                  <span className="text-white/80 text-[11px] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {inq.createdAt}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2 text-white pt-1">
                  <div>
                    <span className="text-white/70 block text-[10px] uppercase font-bold">Client</span>
                    <strong className="text-white text-sm">{inq.ownerName}</strong>
                    <div className="text-white/90 text-[11px] mt-0.5 flex flex-col gap-0.5">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {inq.phone} ({inq.preferredContact})</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {inq.email}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-white/70 block text-[10px] uppercase font-bold">Pet & Package</span>
                    <strong className="text-white text-sm">{inq.dogName} ({inq.breed})</strong>
                    <div className="text-[#13253b] font-bold text-[11px] mt-0.5 bg-white/30 p-1.5 rounded-lg space-y-0.5">
                      <div>{inq.packageInterest} • {inq.weightCategory}</div>
                      {inq.includeDeepClean && <div>+ Deep Clean Wash Upgrade (+£5)</div>}
                      {inq.selectedSpaUpgrades && inq.selectedSpaUpgrades.length > 0 && (
                        <div>+ Upgrades: {inq.selectedSpaUpgrades.join(', ')}</div>
                      )}
                      <div className="text-white/90 font-medium">Coat: {inq.coatCondition}</div>
                    </div>
                  </div>
                </div>

                {inq.message && (
                  <div className="pt-2 border-t border-white/20 text-[#13253b] font-bold italic bg-white/20 p-2 rounded-lg">
                    "{inq.message}"
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-[#af8967]/20 bg-[#efe0cd] text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#8096bb] hover:bg-[#6e85ab] text-white text-xs font-bold cursor-pointer"
          >
            Close Log
          </button>
        </div>
      </div>
    </div>
  );
};
