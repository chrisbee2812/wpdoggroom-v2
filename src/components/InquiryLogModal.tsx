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
      const data = JSON.parse(localStorage.getItem('west_park_inquiries') || '[]');
      setInquiries(data);
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
      localStorage.removeItem('west_park_inquiries');
      setInquiries([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-stone-200 shadow-2xl">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif-title text-xl font-bold text-stone-900">
              Submitted Inquiries Log
            </h3>
            <p className="text-xs text-stone-500">
              Client inquiries stored in your browser session ({inquiries.length} total)
            </p>
          </div>
          <div className="flex items-center gap-2">
            {inquiries.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-rose-600 hover:text-rose-800 px-2 py-1 flex items-center gap-1"
                title="Clear all stored inquiries"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {inquiries.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              <Dog className="w-8 h-8 mx-auto mb-2 text-stone-300" />
              <p>No inquiries submitted yet.</p>
              <p className="text-stone-400 mt-1">
                Fill out the inquiry form on the website to submit your first grooming request.
              </p>
            </div>
          ) : (
            inquiries.map(inq => (
              <div
                key={inq.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#2A4736] text-sm">
                    {inq.id}
                  </span>
                  <span className="text-stone-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {inq.createdAt}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2 text-stone-700 pt-1">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Client</span>
                    <strong className="text-stone-900">{inq.ownerName}</strong>
                    <div className="text-stone-500 text-[11px] mt-0.5 flex flex-col gap-0.5">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {inq.phone} ({inq.preferredContact})</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {inq.email}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Pet & Package</span>
                    <strong className="text-stone-900">{inq.dogName} ({inq.breed})</strong>
                    <div className="text-stone-600 text-[11px] mt-0.5">
                      <span>{inq.packageInterest} • {inq.weightCategory}</span>
                      <span className="block text-stone-500">Coat: {inq.coatCondition}</span>
                    </div>
                  </div>
                </div>

                {inq.message && (
                  <div className="pt-2 border-t border-stone-200/60 text-stone-600 italic">
                    "{inq.message}"
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-stone-100 bg-stone-50 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold"
          >
            Close Log
          </button>
        </div>
      </div>
    </div>
  );
};
