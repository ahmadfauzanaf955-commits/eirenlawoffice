import React from 'react';

interface LegalModalProps {
  type: 'disclaimer' | 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  const contentMap = {
    disclaimer: {
      title: 'Legal Disclaimer',
      subtitle: 'Informational Notice & Professional Boundaries',
      content: (
        <div className="space-y-4 text-sm text-[#5e5e5e] leading-relaxed">
          <p>
            The materials and information available on this website have been prepared by{' '}
            <strong className="text-[#1b1b1b]">Eiren Law Office</strong> for general informational
            purposes only and do not constitute formal legal advice or legal opinions on any specific
            facts or circumstances.
          </p>
          <p>
            Neither transmission nor receipt of these materials creates an attorney-client relationship
            between the reader and Eiren Law Office. You should not act or refrain from acting based on
            any information found on this portal without seeking qualified professional legal counsel
            licensed in the Republic of Indonesia.
          </p>
          <p>
            Past legal track records and transactional representations discussed herein do not guarantee
            or predict similar results in future matters. Indonesian statutory regulations, ministerial
            regimes (e.g. OSS-RBA, BKPM, Menkumham), and judicial interpretations evolve continuously.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Client Data Notice',
      subtitle: 'Indonesian Personal Data Protection (UU PDP No. 27/2022) Alignment',
      content: (
        <div className="space-y-4 text-sm text-[#5e5e5e] leading-relaxed">
          <p>
            Eiren Law Office respects the confidentiality and privacy of prospective and current clients.
            In accordance with Indonesian Law No. 27 of 2022 on Personal Data Protection (UU PDP), we
            collect and process information strictly for commercial identification, conflict check
            screening, and direct legal communication.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not sell, license, or transmit client particulars to third parties.</li>
            <li>
              Preliminary matter overviews transmitted through our intake portals or official communication desk are
              treated under advocate professional secrecy standards (Undang-Undang No. 18 Tahun 2003
              tentang Advokat).
            </li>
            <li>
              Confidential matter files are encrypted and retained strictly in accordance with statutory
              retention requirements.
            </li>
          </ul>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Engagement',
      subtitle: 'Institutional Intake & Conflict Check Procedures',
      content: (
        <div className="space-y-4 text-sm text-[#5e5e5e] leading-relaxed">
          <p>
            Before undertaking formal legal representation, Eiren Law Office requires execution of a
            written Engagement Agreement (Surat Kuasa / Perjanjian Jasa Hukum) specifying scope of work,
            commercial deliverables, partner responsibility, and agreed fee structures.
          </p>
          <p>
            Prior to accepting any mandate, the firm conducts a rigorous conflict of interest
            investigation to verify that no commercial or adversarial conflict exists with current or
            former clients across the firm&apos;s active docket.
          </p>
          <p>
            Payment terms, milestone drawdowns, statutory government filing fees (PNBP), and reimbursable
            operational expenses are itemized transparently without hidden administrative surcharges.
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#fcf9f8] shadow-2xl border border-[#eae7e7] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-[#b51c00]"></div>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-caps text-label-caps uppercase text-[#b51c00] tracking-widest text-xs">
                {current.subtitle}
              </span>
              <h2 className="font-headline-sm text-headline-sm uppercase text-[#1b1b1b] font-bold mt-1">
                {current.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5e5e5e] hover:text-[#1b1b1b] hover:bg-[#f0eded] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <div className="py-2 max-h-[60vh] overflow-y-auto pr-2">{current.content}</div>

          <div className="pt-4 border-t border-[#eae7e7] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#313030] text-white font-label-md text-label-md uppercase tracking-wider hover:bg-[#b51c00] transition-colors cursor-pointer"
            >
              Close Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
