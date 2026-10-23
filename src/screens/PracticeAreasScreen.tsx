import React, { useState } from 'react';
import {
  OFFICIAL_EMAIL,
  createGmailComposeUrl,
  INQUIRY_TEMPLATES,
} from '../utils/email';

interface PracticeAreasScreenProps {
  onOpenConsultation: (defaultDomain?: string) => void;
}

export default function PracticeAreasScreen({
  onOpenConsultation,
}: PracticeAreasScreenProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    designation: '',
    pillar: 'corporate',
    matterBrief: '',
  });

  const CORPORATE_IMG =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBt1zTueIYPH1jSl9QMdDltAcGJv3pGAigIJ39qujQIDBSUJ7J71wPh7RvQd7vkBlhfVwL2ZK9n_GVxW9sxiR-x7R7KTktdk8R2sK-dCnishoZmBXJ4hCKNPme8NqICY9tBozREApt6poa3TnihZfZbUscFuEgtDB-GruhMZZOt8hi--MLMaKuf8HEaL0kqxNpngOR-JNJcInP3-BRkjkyEV_346uoxrMn_ysePHJQvYfrHOvnbAdf3iA';

  const REGULATORY_IMG =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC0zZJQg-A1EjAd2OTXq7FzelDtUsIKBKgMAo3oXWmOU1mDECTxFgvZph5geyztWPHEBqsruFRL3eyZrLU1g8p36EjP06mILkfiAa3iVWBghVo-Rvsk1mDxWrLhr6m_0Bo2oh_53yUwlCS1ZyG9EMnV1e00JBEj3XYT1G4zmPcyA-mTDfBZ5llN3OeNp69XvIuy9BkQfpp9l46w2g899IK4AUXKgQDUuWW9XePzMi80PnjeeKTOnT-HJA';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    const pillarName =
      inquiryData.pillar === 'corporate'
        ? 'Corporate & Commercial'
        : inquiryData.pillar === 'transactions'
        ? 'Transactions & M&A'
        : inquiryData.pillar === 'regulatory'
        ? 'Regulatory & Compliance'
        : inquiryData.pillar === 'disputes'
        ? 'Disputes & Risk'
        : 'Specialized Scope';

    const subject = `Direct Legal Inquiry [${pillarName}] - ${inquiryData.fullName}`;
    const message =
      `Hello Eiren Law Office,\n\n` +
      `Direct Legal Inquiry Submission:\n` +
      `• Client Name: ${inquiryData.fullName}\n` +
      `• Company: ${inquiryData.companyName || 'N/A'}\n` +
      `• Email: ${inquiryData.email}\n` +
      `• Designation: ${inquiryData.designation || 'N/A'}\n` +
      `• Practice Pillar: ${pillarName}\n` +
      `• Matter Brief: ${inquiryData.matterBrief}\n\n` +
      `Please confirm receipt. Thank you.`;

    const composeUrl = createGmailComposeUrl(subject, message);
    window.open(composeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Architectural Statement Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 py-12 lg:py-16 bg-[#fcf9f8] border-b border-[#eae7e7]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[3px] bg-[#b51c00] block"></span>
              <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                Institutional Competency &amp; Practice Scope
              </span>
            </div>
            <h1 className="font-display-hero text-display-hero text-[#1b1b1b] tracking-tight uppercase font-bold">
              Legal Support <span className="text-[#5e5e5e] font-light">Across</span> Business Needs
            </h1>
            <p className="font-body-lg text-body-lg text-[#5f3f38] max-w-2xl leading-relaxed">
              Eiren Law Office provides legal support across corporate and commercial matters,
              transactions, regulatory compliance, and disputes and risk.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-4">
            <div className="p-6 bg-[#f6f3f2] shadow-sm border border-[#eae7e7] space-y-2">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-xs">
                  Jurisdiction
                </span>
                <span className="font-label-caps text-label-caps uppercase text-[#b51c00] font-bold text-xs">
                  Republic of Indonesia
                </span>
              </div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-xs">
                  Core Pillars
                </span>
                <span className="font-title-md text-title-md text-[#1b1b1b] font-bold text-sm">
                  04 Structural Domains
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-xs">
                  Response Protocol
                </span>
                <span className="font-body-sm text-body-sm text-[#1b1b1b] font-bold text-xs">
                  ≤ 24h Institutional Intake
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation Anchor Track */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'corporate-commercial', num: '01', name: 'Corporate' },
            { id: 'transactions', num: '02', name: 'Transactions' },
            { id: 'regulatory-compliance', num: '03', name: 'Regulatory' },
            { id: 'disputes-risk', num: '04', name: 'Disputes' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="p-4 bg-[#f6f3f2] hover:bg-[#f0eded] transition-colors shadow-xs border border-[#eae7e7] flex items-center justify-between group text-left cursor-pointer"
            >
              <div>
                <span className="block font-label-caps text-label-caps text-[#b51c00] text-[10px]">
                  {item.num} / PILLAR
                </span>
                <span className="font-title-md text-title-md text-[#1b1b1b] uppercase font-bold text-sm">
                  {item.name}
                </span>
              </div>
              <span className="material-symbols-outlined text-[#5e5e5e] group-hover:text-[#b51c00] group-hover:translate-y-0.5 transition-all text-[20px]">
                south
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* PILLAR 01: CORPORATE & COMMERCIAL */}
      <section
        id="corporate-commercial"
        className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]"
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#f0eded] px-3 py-1 border border-[#eae7e7]">
                <span className="w-2 h-2 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#1b1b1b] tracking-wider text-xs">
                  Practice Domain 01
                </span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase tracking-tight font-bold">
                Corporate &amp; Commercial
              </h2>

              <p className="font-body-lg text-body-lg text-[#5e5e5e] leading-relaxed">
                Robust constitutional framing and commercial governance ensuring corporate stability,
                stakeholder clarity, and disciplined operations across the enterprise lifecycle.
              </p>

              <div className="pt-2">
                <a
                  className="inline-flex items-center gap-2 px-6 py-4 bg-[#b51c00] text-white font-label-md text-label-md uppercase tracking-wider shadow-sm hover:bg-[#313030] transition-colors duration-150 cursor-pointer"
                  href={createGmailComposeUrl(
                    INQUIRY_TEMPLATES.corporate.subject,
                    INQUIRY_TEMPLATES.corporate.body
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span>Enquire on Corporate Legal Services</span>
                </a>
              </div>

              <div className="p-6 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-xs font-bold block">
                  Strategic Impact
                </span>
                <p className="font-body-sm text-body-sm text-[#5f3f38] text-xs leading-relaxed">
                  Preventative legal architecture designed to eliminate shareholder friction and
                  preserve contractual enforcement in local jurisdictions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {/* Visual Accent */}
              <div className="relative overflow-hidden shadow-md h-56 bg-white border border-[#eae7e7]">
                <img
                  className="w-full h-full object-cover grayscale contrast-125"
                  alt="Jakarta CBD Corporate Governance Coverage"
                  src={CORPORATE_IMG}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/80 via-transparent to-transparent flex items-end p-4">
                  <span className="font-label-caps text-label-caps uppercase text-white tracking-widest text-xs font-bold">
                    Jakarta CBD Corporate Governance Coverage
                  </span>
                </div>
              </div>

              {/* Capability Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-5 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                    <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                      Company Establishment
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Deed of establishment, Ministry of Law approvals (SK Menkumham), capital
                    structuring, and foreign investment (PT PMA) structuring.
                  </p>
                </div>

                <div className="p-5 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                    <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                      Corporate Governance
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Board of Directors and Commissioners oversight charters, articles of association
                    amendments, and internal compliance matrices.
                  </p>
                </div>

                <div className="p-5 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                    <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                      GMS Support
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Annual &amp; Extraordinary General Meetings of Shareholders (RUPS/EGMS)
                    convocations, quorums, notarized circular resolutions, and minutes.
                  </p>
                </div>

                <div className="p-5 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                    <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                      Share Transfers
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Equity rights transfers, preemptive rights documentation, share buybacks, newspaper
                    announcements, and statutory filings.
                  </p>
                </div>

                <div className="p-5 bg-white shadow-xs border border-[#eae7e7] sm:col-span-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                    <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                      Commercial Contracts
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Drafting and negotiation of master services agreements (MSA), joint ventures,
                    procurement structures, licensing, non-disclosure covenants, and supply chains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 02: TRANSACTIONS & M&A */}
      <section
        id="transactions"
        className="w-full bg-[#fcf9f8] py-20 border-b border-[#eae7e7]"
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#f0eded] px-3 py-1 border border-[#eae7e7]">
                <span className="w-2 h-2 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#1b1b1b] tracking-wider text-xs">
                  Practice Domain 02
                </span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase tracking-tight font-bold">
                Transactions &amp; M&amp;A
              </h2>

              <p className="font-body-lg text-body-lg text-[#5e5e5e] leading-relaxed">
                Structured deal execution protecting equity value through meticulous legal due
                diligence, risk allocation mechanisms, and post-signing certainty.
              </p>

              <div className="pt-2">
                <a
                  className="inline-flex items-center gap-2 px-6 py-4 bg-[#b51c00] text-white font-label-md text-label-md uppercase tracking-wider shadow-sm hover:bg-[#313030] transition-colors duration-150 cursor-pointer"
                  href={createGmailComposeUrl(
                    INQUIRY_TEMPLATES.transactions.subject,
                    INQUIRY_TEMPLATES.transactions.body
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span>Enquire on Transactional Advisory</span>
                </a>
              </div>

              <div className="p-6 bg-[#f6f3f2] shadow-xs border border-[#eae7e7]">
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] block mb-1 text-xs font-bold">
                  Deal Pipeline Safeguard
                </span>
                <p className="font-body-sm text-body-sm text-[#1b1b1b] text-xs leading-relaxed">
                  Structured checks designed to expose hidden encumbrances, asset liens, and regulatory
                  hurdles prior to capital deployment.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-1 space-y-4">
              {/* SVG Stage Gate Framework */}
              <div className="p-6 bg-[#f6f3f2] shadow-sm border border-[#eae7e7]">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                    Transaction Execution Lifecycle
                  </span>
                  <span className="font-label-caps text-label-caps uppercase text-[#b51c00] font-bold text-xs">
                    Stage Gate Framework
                  </span>
                </div>
                <svg
                  className="w-full h-auto"
                  fill="none"
                  viewBox="0 0 600 120"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="10" y="20" width="130" height="80" rx="0" fill="#ffffff" stroke="#e5e2e1" />
                  <text x="25" y="45" fill="#b51c00" fontSize="10" fontWeight="700">
                    PHASE 01
                  </text>
                  <text x="25" y="65" fill="#1b1b1b" fontSize="11" fontWeight="700">
                    LEGAL DD
                  </text>
                  <text x="25" y="82" fill="#5e5e5e" fontSize="9">
                    Audit &amp; Risk Matrix
                  </text>
                  <line x1="140" y1="60" x2="160" y2="60" stroke="#b51c00" strokeWidth="2" />

                  <rect x="160" y="20" width="130" height="80" rx="0" fill="#ffffff" stroke="#e5e2e1" />
                  <text x="175" y="45" fill="#b51c00" fontSize="10" fontWeight="700">
                    PHASE 02
                  </text>
                  <text x="175" y="65" fill="#1b1b1b" fontSize="11" fontWeight="700">
                    STRUCTURE
                  </text>
                  <text x="175" y="82" fill="#5e5e5e" fontSize="9">
                    SPA, SHA &amp; Covenants
                  </text>
                  <line x1="290" y1="60" x2="310" y2="60" stroke="#b51c00" strokeWidth="2" />

                  <rect x="310" y="20" width="130" height="80" rx="0" fill="#ffffff" stroke="#e5e2e1" />
                  <text x="325" y="45" fill="#b51c00" fontSize="10" fontWeight="700">
                    PHASE 03
                  </text>
                  <text x="325" y="65" fill="#1b1b1b" fontSize="11" fontWeight="700">
                    CP VALIDATION
                  </text>
                  <text x="325" y="82" fill="#5e5e5e" fontSize="9">
                    Closing Conditions
                  </text>
                  <line x1="440" y1="60" x2="460" y2="60" stroke="#b51c00" strokeWidth="2" />

                  <rect x="460" y="20" width="130" height="80" rx="0" fill="#313030" />
                  <text x="475" y="45" fill="#ffb4a5" fontSize="10" fontWeight="700">
                    PHASE 04
                  </text>
                  <text x="475" y="65" fill="#ffffff" fontSize="11" fontWeight="700">
                    EXECUTION
                  </text>
                  <text x="475" y="82" fill="#eae7e7" fontSize="9">
                    Closing &amp; Registration
                  </text>
                </svg>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-5 bg-[#f6f3f2] shadow-xs border border-[#eae7e7] space-y-1">
                  <span className="font-label-caps text-label-caps uppercase text-[#b51c00] text-xs font-bold">
                    02.1 Scope
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                    Legal Due Diligence (LDD)
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Target entity legal health checks, material contract examinations, corporate
                    history audits, and asset title verification.
                  </p>
                </div>

                <div className="p-5 bg-[#f6f3f2] shadow-xs border border-[#eae7e7] space-y-1">
                  <span className="font-label-caps text-label-caps uppercase text-[#b51c00] text-xs font-bold">
                    02.2 Scope
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                    Acquisition Support
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Asset sales, business takeovers, share subscriptions, minority shareholder
                    protections, and board reconstitution negotiations.
                  </p>
                </div>

                <div className="p-5 bg-[#f6f3f2] shadow-xs border border-[#eae7e7] space-y-1">
                  <span className="font-label-caps text-label-caps uppercase text-[#b51c00] text-xs font-bold">
                    02.3 Scope
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                    Investment Instruments
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Share Purchase Agreements (SPA), Shareholders&apos; Agreements (SHA), Convertible Notes,
                    and Promissory Loan notes.
                  </p>
                </div>

                <div className="p-5 bg-[#f6f3f2] shadow-xs border border-[#eae7e7] space-y-1">
                  <span className="font-label-caps text-label-caps uppercase text-[#b51c00] text-xs font-bold">
                    02.4 Scope
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                    Closing Conditions (CPs)
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Tracking regulatory approvals, creditor consents, third-party waivers, escrow
                    releases, and post-closing statutory filings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 03: REGULATORY & COMPLIANCE */}
      <section
        id="regulatory-compliance"
        className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]"
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#f0eded] px-3 py-1 border border-[#eae7e7]">
                <span className="w-2 h-2 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#1b1b1b] tracking-wider text-xs">
                  Practice Domain 03
                </span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase tracking-tight font-bold">
                Regulatory &amp; Compliance
              </h2>

              <p className="font-body-lg text-body-lg text-[#5e5e5e] leading-relaxed">
                Guiding foreign direct investors and domestic corporations through the intricate
                Indonesian regulatory apparatus, licensing regimes, and institutional labor mandates.
              </p>

              <div className="pt-2">
                <a
                  className="inline-flex items-center gap-2 px-6 py-4 bg-[#b51c00] text-white font-label-md text-label-md uppercase tracking-wider shadow-sm hover:bg-[#313030] transition-colors duration-150 cursor-pointer"
                  href={createGmailComposeUrl(
                    INQUIRY_TEMPLATES.regulatory.subject,
                    INQUIRY_TEMPLATES.regulatory.body
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span>Enquire on Regulatory Compliance</span>
                </a>
              </div>

              <div className="p-6 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-xs font-bold block">
                  Operational Readiness
                </span>
                <p className="font-body-sm text-body-sm text-[#5f3f38] text-xs leading-relaxed">
                  Prevent administrative freezes, sanction notices, and operational shutdowns by
                  securing strict statutory alignment under OSS-RBA guidelines.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="relative overflow-hidden shadow-md h-56 bg-white border border-[#eae7e7]">
                <img
                  className="w-full h-full object-cover grayscale contrast-125"
                  alt="Cross-Ministerial Alignment & Sectoral Advisory"
                  src={REGULATORY_IMG}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/80 via-transparent to-transparent flex items-end p-4">
                  <span className="font-label-caps text-label-caps uppercase text-white tracking-widest text-xs font-bold">
                    Cross-Ministerial Alignment &amp; Sectoral Advisory
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-5 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                    <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                      OSS-RBA Licensing
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Online Single Submission Risk-Based Approach verification, Business Identification
                    Numbers (NIB), standard certificates, and environmental approvals.
                  </p>
                </div>

                <div className="p-5 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                    <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                      Sectoral Permits
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Industrial licenses, trading distribution permits, fintech &amp; e-commerce PSE
                    registrations, logistics authorizations, and customs certifications.
                  </p>
                </div>

                <div className="p-5 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                    <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                      Employment &amp; Manpower
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Company Regulations (Peraturan Perusahaan), employment contracts (PKWT / PKWTT),
                    expatriate work permits (RPTKA / ITAS), and union relations.
                  </p>
                </div>

                <div className="p-5 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                    <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                      Operational Compliance
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Mandatory periodic reporting (LKPM BKPM), personal data protection compliance (UU
                    PDP), anti-bribery policies, and operational audits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 04: DISPUTES & RISK */}
      <section
        id="disputes-risk"
        className="w-full bg-[#fcf9f8] py-20 border-b border-[#eae7e7]"
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#f0eded] px-3 py-1 border border-[#eae7e7]">
                <span className="w-2 h-2 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#1b1b1b] tracking-wider text-xs">
                  Practice Domain 04
                </span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase tracking-tight font-bold">
                Disputes &amp; Risk Mitigation
              </h2>

              <p className="font-body-lg text-body-lg text-[#5e5e5e] leading-relaxed">
                Pre-emptive controversy containment and strategic dispute navigation designed to
                defend commercial interests while minimizing corporate exposure and expense.
              </p>

              <div className="pt-2">
                <a
                  className="inline-flex items-center gap-2 px-6 py-4 bg-[#b51c00] text-white font-label-md text-label-md uppercase tracking-wider shadow-sm hover:bg-[#313030] transition-colors duration-150 cursor-pointer"
                  href={createGmailComposeUrl(
                    INQUIRY_TEMPLATES.disputes.subject,
                    INQUIRY_TEMPLATES.disputes.body
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span>Enquire on Dispute &amp; Risk Counsel</span>
                </a>
              </div>

              <div className="p-6 bg-[#f6f3f2] shadow-xs border border-[#eae7e7]">
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] block mb-1 text-xs font-bold">
                  Strategic Prudence
                </span>
                <p className="font-body-sm text-body-sm text-[#1b1b1b] text-xs leading-relaxed">
                  Prioritizing non-contentious settlement mechanics and clear default notices before
                  escalating to commercial arbitral tribunals or courts.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-5 bg-[#f6f3f2] shadow-xs border border-[#eae7e7] space-y-1">
                  <span className="font-label-caps text-label-caps uppercase text-[#b51c00] text-xs font-bold">
                    Pre-Dispute
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                    Legal Warning Letters (Somasi)
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Formal default notices, statutory demands, breach of contract declarations, and
                    decisive initial escalation frameworks.
                  </p>
                </div>

                <div className="p-5 bg-[#f6f3f2] shadow-xs border border-[#eae7e7] space-y-1">
                  <span className="font-label-caps text-label-caps uppercase text-[#b51c00] text-xs font-bold">
                    Resolution
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                    Settlement Support
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Negotiated settlement deeds (Akta Perdamaian), debt restructuring accords, release
                    agreements, and mutual termination pacts.
                  </p>
                </div>

                <div className="p-5 bg-[#f6f3f2] shadow-xs border border-[#eae7e7] space-y-1">
                  <span className="font-label-caps text-label-caps uppercase text-[#b51c00] text-xs font-bold">
                    Tribunals
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                    Litigation &amp; Arbitration
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Courtroom strategy coordination, BANI (Indonesian National Board of Arbitration)
                    dispute management, and procedural guidance.
                  </p>
                </div>

                <div className="p-5 bg-[#f6f3f2] shadow-xs border border-[#eae7e7] space-y-1">
                  <span className="font-label-caps text-label-caps uppercase text-[#b51c00] text-xs font-bold">
                    Containment
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                    Risk Mitigation
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                    Contractual liability assessments, exposure stress-testing, asset tracing oversight,
                    and enforcement probability audits.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#e5e2e1] shadow-xs border border-[#eae7e7]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#b51c00] text-[20px]">shield</span>
                  <span className="font-title-md text-title-md uppercase text-[#1b1b1b] font-bold text-sm">
                    Case Feasibility Assessment
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                  Prior to filing legal action or responding to official summons, our team conducts a
                  rigorous jurisdictional and evidentiary audit to calculate legal costs versus commercial
                  recovery odds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL ADVISORY NOTE: PARTNER VALIDATION & EXTENDED SCOPE */}
      <section className="w-full bg-[#eae7e7] py-16 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#b51c00] tracking-widest text-xs font-bold">
                  Specialized Mandates
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md uppercase text-[#1b1b1b] font-bold">
                Partner Validation &amp; Extended Scope
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                Complex matters requiring specialized court appearances, specific land certification,
                or technical IP registrations operate under strict lead-partner validation.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-title-md text-[#1b1b1b] font-bold text-sm">
                      Civil &amp; Criminal Litigation
                    </span>
                    <span className="font-label-sm text-label-sm uppercase px-2 py-0.5 bg-[#f0eded] text-[#5f3f38] text-[10px]">
                      Validated
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                    Formal judicial court representation handled through licensed Indonesian Peradi
                    advocates with proven courtroom track records.
                  </p>
                </div>

                <div className="p-4 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-title-md text-[#1b1b1b] font-bold text-sm">
                      Land &amp; Real Estate Law
                    </span>
                    <span className="font-label-sm text-label-sm uppercase px-2 py-0.5 bg-[#f0eded] text-[#5f3f38] text-[10px]">
                      Validated
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                    BPN registration, land due diligence, hak guna bangunan (HGB), and real property
                    development structuring.
                  </p>
                </div>

                <div className="p-4 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-title-md text-[#1b1b1b] font-bold text-sm">
                      Employment Disputes (PHI)
                    </span>
                    <span className="font-label-sm text-label-sm uppercase px-2 py-0.5 bg-[#f0eded] text-[#5f3f38] text-[10px]">
                      Validated
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                    Industrial Relations Court proceedings, bipartite &amp; tripartite negotiations with
                    manpower offices (Disnaker).
                  </p>
                </div>

                <div className="p-4 bg-white shadow-xs border border-[#eae7e7] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-title-md text-[#1b1b1b] font-bold text-sm">
                      Intellectual Property (IP)
                    </span>
                    <span className="font-label-sm text-label-sm uppercase px-2 py-0.5 bg-[#f0eded] text-[#5f3f38] text-[10px]">
                      Validated
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                    Trademark applications, patent filings via DGIP (DJKI), IP infringement response
                    letters, and licensing covenants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE INTAKE & DIRECT INQUIRY SECTION */}
      <section className="w-full bg-[#fcf9f8] py-20">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-xs font-bold">
                  Initiate Engagement
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase tracking-tight font-bold">
                Direct Legal Inquiry
              </h2>
              <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                Submit your practice domain requirements to connect with an attorney. All submissions
                are treated under strict legal confidentiality.
              </p>

              <div className="p-6 bg-[#f6f3f2] shadow-xs border border-[#eae7e7] space-y-2">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#b51c00] text-[20px] mt-0.5">
                    lock
                  </span>
                  <div>
                    <span className="font-title-md text-title-md text-[#1b1b1b] block font-bold text-sm">
                      Attorney-Client Privilege Protocol
                    </span>
                    <p className="font-body-sm text-body-sm text-[#5e5e5e] mt-1 text-xs leading-relaxed">
                      Submissions via this channel are encrypted and reviewed strictly by our legal
                      team for conflict check validation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00] block"></span>
                  <span>
                    Official Inquiries:{' '}
                    <a
                      href={createGmailComposeUrl(
                        INQUIRY_TEMPLATES.general.subject,
                        INQUIRY_TEMPLATES.general.body
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-[#b51c00]"
                    >
                      <strong className="text-[#1b1b1b]">{OFFICIAL_EMAIL}</strong>
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleFormSubmit}
                className="p-8 sm:p-10 bg-[#f6f3f2] shadow-sm border border-[#eae7e7] space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                      Client Full Name *
                    </label>
                    <input
                      className="w-full p-2.5 bg-white border border-[#eae7e7] text-[#1b1b1b] font-body-md text-body-md focus:outline-none focus:border-[#b51c00] shadow-xs text-sm"
                      placeholder="e.g. Hendra Widjaja"
                      required
                      type="text"
                      value={inquiryData.fullName}
                      onChange={(e) =>
                        setInquiryData({ ...inquiryData, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                      Company / Entity
                    </label>
                    <input
                      className="w-full p-2.5 bg-white border border-[#eae7e7] text-[#1b1b1b] font-body-md text-body-md focus:outline-none focus:border-[#b51c00] shadow-xs text-sm"
                      placeholder="e.g. PT Mitra Global Sejahtera"
                      type="text"
                      value={inquiryData.companyName}
                      onChange={(e) =>
                        setInquiryData({ ...inquiryData, companyName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                      Corporate Email Address *
                    </label>
                    <input
                      className="w-full p-2.5 bg-white border border-[#eae7e7] text-[#1b1b1b] font-body-md text-body-md focus:outline-none focus:border-[#b51c00] shadow-xs text-sm"
                      placeholder="name@company.co.id"
                      required
                      type="email"
                      value={inquiryData.email}
                      onChange={(e) =>
                        setInquiryData({ ...inquiryData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                      Corporate Title / Designation
                    </label>
                    <input
                      className="w-full p-2.5 bg-white border border-[#eae7e7] text-[#1b1b1b] font-body-md text-body-md focus:outline-none focus:border-[#b51c00] shadow-xs text-sm"
                      placeholder="e.g. Managing Director / General Counsel"
                      type="text"
                      value={inquiryData.designation}
                      onChange={(e) =>
                        setInquiryData({ ...inquiryData, designation: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                    Select Primary Practice Pillar *
                  </label>
                  <select
                    className="w-full p-2.5 bg-white border border-[#eae7e7] text-[#1b1b1b] font-body-md text-body-md focus:outline-none focus:border-[#b51c00] shadow-xs text-sm"
                    required
                    value={inquiryData.pillar}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, pillar: e.target.value })
                    }
                  >
                    <option value="corporate">
                      01 Corporate &amp; Commercial (Governance, Establishment, GMS, Contracts)
                    </option>
                    <option value="transactions">
                      02 Transactions &amp; M&amp;A (Due Diligence, Investment Docs, CPs)
                    </option>
                    <option value="regulatory">
                      03 Regulatory &amp; Compliance (OSS-RBA, Permits, Manpower, PDP)
                    </option>
                    <option value="disputes">
                      04 Disputes &amp; Risk (Legal Warning Letters, Settlements, Arbitration)
                    </option>
                    <option value="specialized">
                      Specialized Scope (Land, Civil/Criminal, IP Validation)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-label-caps text-label-caps uppercase text-[#1b1b1b] mb-1 text-xs">
                    Brief Description of Matter *
                  </label>
                  <textarea
                    className="w-full p-2.5 bg-white border border-[#eae7e7] text-[#1b1b1b] font-body-md text-body-md focus:outline-none focus:border-[#b51c00] shadow-xs text-sm"
                    placeholder="Please summarize key transaction parameters, timeline constraints, or dispute characteristics..."
                    required
                    rows={4}
                    value={inquiryData.matterBrief}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, matterBrief: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <button
                    className="px-6 py-3.5 bg-[#b51c00] text-white font-label-md text-label-md uppercase tracking-wider hover:bg-[#313030] transition-colors duration-150 shadow-sm cursor-pointer"
                    type="submit"
                  >
                    Transmit Legal Inquiry
                  </button>
                  <span className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                    Confidential matter transmission
                  </span>
                </div>

                {formSubmitted && (
                  <div className="p-4 bg-white border-l-4 border-[#b51c00] shadow-xs">
                    <div className="flex items-center gap-2 text-[#b51c00] mb-1">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span className="font-title-md text-title-md uppercase font-bold text-sm">
                        Inquiry Transmitted Successfully
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                      Your legal inquiry has been registered and opened in Gmail Compose. An advocate from
                      Eiren Law Office will contact you within one business day.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
