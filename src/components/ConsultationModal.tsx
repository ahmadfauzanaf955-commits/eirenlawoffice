import React, { useState } from 'react';
import {
  createGmailComposeUrl,
  createMailtoUrl,
} from '../utils/email';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomain?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultDomain = 'Corporate & Commercial',
}: ConsultationModalProps) {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [domain, setDomain] = useState(defaultDomain);
  const [brief, setBrief] = useState('');
  const [urgency, setUrgency] = useState('Standard (within 24h)');

  if (!isOpen) return null;

  const getInquiryContent = () => {
    const rep = fullName.trim() || 'Prospective Client';
    const comp = company.trim() ? ` (${company.trim()})` : '';
    const subject = `Legal Counsel Inquiry [${domain}] - ${rep}${comp}`;
    const body =
      `Dear Eiren Law Office,\n\n` +
      `I would like to consult with your partners regarding ${domain}.\n\n` +
      `• Representative: ${rep}${comp}\n` +
      `• Practice Domain: ${domain}\n` +
      `• Priority: ${urgency}\n` +
      `• Matter Details:\n${brief.trim() || 'Please share initial discussion parameters.'}\n\n` +
      `Please let me know the appropriate next steps.\n\n` +
      `Best regards,\n${rep}`;
    return { subject, body };
  };

  const handleEmailDispatch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const { subject, body } = getInquiryContent();
    const gmailUrl = createGmailComposeUrl(subject, body);
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleMailtoFallback = () => {
    const { subject, body } = getInquiryContent();
    const mailtoUrl = createMailtoUrl(subject, body);
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#fcf9f8] shadow-2xl border border-[#eae7e7] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Architectural Vermilion Header Accent */}
        <div className="h-1.5 w-full bg-[#b51c00]"></div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-[#b51c00]"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                  Duty Counsel Protocol
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm uppercase text-[#1b1b1b] font-bold">
                Discuss Your Legal Needs
              </h2>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] mt-1">
                Connect directly with our partners for commercial, regulatory, or transactional matters.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5e5e5e] hover:text-[#1b1b1b] hover:bg-[#f0eded] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-[#f6f3f2] text-xs">
            <div>
              <span className="font-label-caps text-label-caps block text-[#5e5e5e] uppercase">Location</span>
              <span className="font-bold text-[#1b1b1b]">Jakarta CBD</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps block text-[#5e5e5e] uppercase">Intake Channel</span>
              <span className="font-bold text-[#b51c00]">Partner Email Desk</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps block text-[#5e5e5e] uppercase">Response Time</span>
              <span className="font-bold text-[#1b1b1b]">&lt; 2h (Business Hrs)</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailDispatch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                  Full Name / Representative <span className="text-[#b51c00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aris Sutanto, S.H."
                  className="w-full p-2.5 bg-white border border-[#e5e2e1] text-[#1b1b1b] text-sm focus:outline-none focus:border-[#b51c00]"
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. PT Samudra Investama Mandiri"
                  className="w-full p-2.5 bg-white border border-[#e5e2e1] text-[#1b1b1b] text-sm focus:outline-none focus:border-[#b51c00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                  Practice Domain <span className="text-[#b51c00]">*</span>
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#e5e2e1] text-[#1b1b1b] text-sm focus:outline-none focus:border-[#b51c00]"
                >
                  <option value="Corporate & Commercial">01 Corporate & Commercial</option>
                  <option value="Transactions & M&A">02 Transactions & M&A</option>
                  <option value="Regulatory & Compliance">03 Regulatory & Compliance</option>
                  <option value="Disputes & Risk Mitigation">04 Disputes & Risk Mitigation</option>
                  <option value="General Retainer / Advisory">General Corporate Retainer</option>
                  <option value="Specialized Scope">Specialized Scope (Land / Court / IP)</option>
                </select>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                  Timeline / Urgency
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#e5e2e1] text-[#1b1b1b] text-sm focus:outline-none focus:border-[#b51c00]"
                >
                  <option value="Standard (within 24h)">Standard Intake (within 24h)</option>
                  <option value="Priority (Transactional deadline)">Priority (Transactional deadline)</option>
                  <option value="Urgent (Injunction / Somasi / Dispute)">Urgent (Injunction / Somasi response)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                Matter Overview (Non-Confidential Summary)
              </label>
              <textarea
                rows={3}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Briefly describe key objectives, parties involved, or transaction timeline..."
                className="w-full p-2.5 bg-white border border-[#e5e2e1] text-[#1b1b1b] text-sm focus:outline-none focus:border-[#b51c00]"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-5 bg-[#b51c00] text-white font-title-md text-title-md uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#313030] transition-colors cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
                <span>Draft Official Legal Inquiry</span>
              </button>

              <button
                type="button"
                onClick={handleMailtoFallback}
                className="py-3 px-5 bg-[#f0eded] text-[#1b1b1b] font-title-md text-title-md uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#eae7e7] transition-colors cursor-pointer"
                title="Open in your default desktop or mobile mail client"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Default Mail Client</span>
              </button>
            </div>

            <p className="font-body-sm text-body-sm text-[#5e5e5e] text-center text-xs mt-2">
              Privileged attorney-client communication protocol applies. (UU Advokat No. 18/2003).
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
