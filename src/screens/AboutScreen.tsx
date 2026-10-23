import React from 'react';
import { NavigationTab } from '../types';
import { createGmailComposeUrl, INQUIRY_TEMPLATES } from '../utils/email';

interface AboutScreenProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenConsultation: (defaultDomain?: string) => void;
}

export default function AboutScreen({
  onNavigate,
  onOpenConsultation,
}: AboutScreenProps) {
  const BUILDING_IMG =
    'https://i.imgur.com/aFDud02.jpeg';

  const PARTNER_KRISNA_IMG =
    'https://i.imgur.com/aH2njbg.jpeg';

  const PARTNER_HAWIN_IMG =
    'https://i.imgur.com/8O0sKRx.jpeg';

  return (
    <div className="flex flex-col w-full">
      {/* Top Architectural Statement Section */}
      <section className="w-full bg-[#fcf9f8] pt-12 pb-16 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[3px] bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                  Institutional Profile &amp; Core Tenets / Established 2025
                </span>
              </div>
              <h1 className="font-display-hero text-display-hero text-[#1b1b1b] tracking-tight uppercase font-bold">
                About Eiren <br />
                <span className="text-[#5e5e5e] font-light">Law Office</span>
              </h1>
              <p className="font-headline-sm text-headline-sm text-[#1b1b1b] pt-1">
                Clear counsel. Commercial judgment. Reliable execution.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end space-y-4">
              <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                Established in 2025, Eiren Law Office represents local and cross-border commercial
                enterprises, venture funds, emerging ventures, and executive boards navigating
                Indonesia’s evolving statutory and regulatory landscape.
              </p>
              <div className="p-4 bg-[#f6f3f2] border-l-2 border-[#b51c00]">
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] block text-[10px]">
                  Corporate Headquarters
                </span>
                <span className="font-title-md text-title-md text-[#1b1b1b] block mt-0.5 font-bold text-sm">
                  Jakarta Central Business District, Indonesia
                </span>
              </div>
            </div>
          </div>

          {/* Foundational Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <div className="p-6 bg-white border border-[#eae7e7] shadow-xs">
              <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-[10px] block">
                Foundational Year
              </span>
              <span className="font-display-hero-mobile text-display-hero-mobile text-[#b51c00] font-bold block mt-1">
                2025
              </span>
              <p className="font-body-sm text-body-sm text-[#5f3f38] text-xs mt-1">
                Structured for modern velocity
              </p>
            </div>

            <div className="p-6 bg-white border border-[#eae7e7] shadow-xs">
              <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-[10px] block">
                Regulatory Breadth
              </span>
              <span className="font-display-hero-mobile text-display-hero-mobile text-[#1b1b1b] font-bold block mt-1">
                12+
              </span>
              <p className="font-body-sm text-body-sm text-[#5f3f38] text-xs mt-1">
                Commercial practice sectors
              </p>
            </div>

            <div className="p-6 bg-white border border-[#eae7e7] shadow-xs">
              <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-[10px] block">
                Cross-Border Reach
              </span>
              <span className="font-display-hero-mobile text-display-hero-mobile text-[#1b1b1b] font-bold block mt-1">
                FDI
              </span>
              <p className="font-body-sm text-body-sm text-[#5f3f38] text-xs mt-1">
                Inbound corporate structuring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 01: WHO WE ARE */}
      <section className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 bg-[#b51c00] block"></span>
            <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
              Section 01 / Institutional Orientation
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Accent */}
            <div className="lg:col-span-5 relative">
              <div className="relative overflow-hidden aspect-[4/4] sm:aspect-[4/4.2] bg-white border border-[#eae7e7] shadow-md group">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 contrast-110"
                  alt="Eiren Law Office Architectural Entrance"
                  src={BUILDING_IMG}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      '/src/assets/images/eiren_about_building.jpg';
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/85 via-transparent to-transparent flex items-end p-6">
                  <div className="border-l-2 border-[#b51c00] pl-4">
                    <span className="font-title-lg text-title-lg text-white uppercase block font-bold">
                      Uncompromising Standard.
                    </span>
                    <p className="font-body-sm text-body-sm text-[#e5e2e1] mt-1 text-xs">
                      Tailored corporate legal strategy calibrated for immediate commercial execution.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display-hero-mobile text-display-hero-mobile text-[#1b1b1b] uppercase font-bold tracking-tight">
                Who We Are
              </h2>

              <p className="font-body-lg text-body-lg text-[#1b1b1b] leading-relaxed">
                Eiren Law Office was conceived as an antidote to bureaucratic inertia, opaque legal
                advice, and academic detachment. We operate as strategic counsel to companies
                navigating rapid market expansion, operational compliance, and complex transactions
                in Indonesia.
              </p>

              <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                Our firm bridges the divide between meticulous legal doctrine and commercial pragmatism.
                Rather than presenting our clients with exhaustive theoretical treatises on why a
                transaction cannot proceed, we engineer actionable pathways that safeguard enterprise
                value while honoring the strictest standards of local compliance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-white border border-[#eae7e7]">
                  <span className="font-label-caps text-label-caps text-[#b51c00] block uppercase font-bold text-xs">
                    01
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] mt-1 font-bold">
                    Precision First
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] mt-1 text-xs leading-relaxed">
                    Every agreement and regulatory filing undergoes strict partner scrutiny.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#eae7e7]">
                  <span className="font-label-caps text-label-caps text-[#b51c00] block uppercase font-bold text-xs">
                    02
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] mt-1 font-bold">
                    Swift Velocity
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] mt-1 text-xs leading-relaxed">
                    Timely execution without ever sacrificing quality or technical depth.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#eae7e7]">
                  <span className="font-label-caps text-label-caps text-[#b51c00] block uppercase font-bold text-xs">
                    03
                  </span>
                  <h3 className="font-title-md text-title-md uppercase text-[#1b1b1b] mt-1 font-bold">
                    Pragmatism
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] mt-1 text-xs leading-relaxed">
                    Advice structured to match boardroom goals and business models.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: METHODOLOGY - HOW WE THINK ABOUT LEGAL WORK */}
      <section className="w-full bg-[#fcf9f8] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                  Section 02 / Methodology
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase font-bold tracking-tight">
                How We Think About Legal Work
              </h2>
            </div>
            <p className="font-body-md text-body-md text-[#5e5e5e] max-w-md">
              Three non-negotiable operational principles govern every advisory mandate, case file,
              and corporate transaction handled at Eiren.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-8 bg-white border border-[#eae7e7] shadow-sm relative flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                  Pillar One
                </span>
                <span className="w-2 h-2 bg-[#b51c00]"></span>
              </div>
              <div className="space-y-3">
                <h3 className="font-headline-sm text-headline-sm uppercase text-[#1b1b1b] font-bold">
                  Clear Counsel
                </h3>
                <p className="font-body-md text-body-md text-[#5e5e5e] text-sm leading-relaxed">
                  We explain relevant legal matters, options, risks, and next steps clearly without
                  burying insight beneath gratuitous jargon or defensive academic caveats.
                </p>
                <div className="pt-4 border-t border-[#eae7e7] space-y-2 text-xs font-bold text-[#1b1b1b]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] shrink-0"></span>
                    <span>Plain-language risk categorization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] shrink-0"></span>
                    <span>Decisive executive summaries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] shrink-0"></span>
                    <span>Direct client counsel interaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 bg-white border border-[#eae7e7] shadow-sm relative flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                  Pillar Two
                </span>
                <span className="w-2 h-2 bg-[#b51c00]"></span>
              </div>
              <div className="space-y-3">
                <h3 className="font-headline-sm text-headline-sm uppercase text-[#1b1b1b] font-bold">
                  Commercial Judgment
                </h3>
                <p className="font-body-md text-body-md text-[#5e5e5e] text-sm leading-relaxed">
                  We ground all legal counsel within commercial realities, financial structures, sector
                  dynamics, and our clients&apos; specific growth targets.
                </p>
                <div className="pt-4 border-t border-[#eae7e7] space-y-2 text-xs font-bold text-[#1b1b1b]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] shrink-0"></span>
                    <span>Balance sheet-aware transaction design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] shrink-0"></span>
                    <span>Regulatory arbitrage navigation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] shrink-0"></span>
                    <span>Deal friction mitigation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 bg-white border border-[#eae7e7] shadow-sm relative flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                  Pillar Three
                </span>
                <span className="w-2 h-2 bg-[#b51c00]"></span>
              </div>
              <div className="space-y-3">
                <h3 className="font-headline-sm text-headline-sm uppercase text-[#1b1b1b] font-bold">
                  Reliable Execution
                </h3>
                <p className="font-body-md text-body-md text-[#5e5e5e] text-sm leading-relaxed">
                  Disciplined follow-through, rigorous document review, and practical delivery ensure
                  your agreements withstand statutory scrutiny.
                </p>
                <div className="pt-4 border-t border-[#eae7e7] space-y-2 text-xs font-bold text-[#1b1b1b]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] shrink-0"></span>
                    <span>Multi-stage internal document audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] shrink-0"></span>
                    <span>Strict milestone timelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] shrink-0"></span>
                    <span>Proactive post-closing governance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: OUR PARTNERS */}
      <section className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                  Section 03 / Leadership
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase font-bold tracking-tight">
                Our Partners
              </h2>
            </div>
            <p className="font-body-md text-body-md text-[#5e5e5e] max-w-md">
              Eiren&apos;s senior leadership brings seasoned commercial perspective, rigorous procedural
              familiarity, and relentless advocacy to every institutional client engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Partner 1: Krisna Murti Ardianto */}
            <div className="bg-white p-8 sm:p-10 border border-[#eae7e7] shadow-sm relative flex flex-col justify-between">
              <div className="w-16 h-1.5 bg-[#b51c00] absolute top-0 left-0"></div>
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-28 h-36 sm:w-36 sm:h-48 bg-[#f0eded] overflow-hidden border border-[#eae7e7] shrink-0">
                    <img
                      src={PARTNER_KRISNA_IMG}
                      alt="Krisna Murti Ardianto, S.H."
                      className="w-full h-full object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-300 contrast-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          '/src/assets/images/krisna_murti_ardianto_web.jpg';
                      }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold block">
                      Partner &amp; Advocate
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] font-bold uppercase mt-1">
                      Krisna Murti Ardianto
                    </h3>
                    <p className="font-body-sm text-body-sm text-[#5e5e5e] mt-0.5">
                      Advocate &amp; Legal Consultant, S.H.
                    </p>
                    <div className="mt-2 inline-block px-2.5 py-1 bg-[#f0eded] text-[10px] font-label-caps uppercase tracking-wider text-[#1b1b1b]">
                      Commercial Litigation · Corporate Law
                    </div>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                  Krisna Murti Ardianto leads the firm&apos;s dispute resolution and corporate structuring
                  practices. He regularly counsels domestic corporations and international
                  conglomerates on complex cross-border joint ventures, regulatory compliance
                  frameworks, shareholder contestations, and formal commercial litigation proceedings
                  in Indonesian district and commercial courts.
                </p>

                <div className="p-4 bg-[#f6f3f2] border border-[#eae7e7]">
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase block text-[10px]">
                    Practice Focus
                  </span>
                  <p className="font-body-sm text-body-sm text-[#1b1b1b] mt-1 font-bold text-xs">
                    Commercial Litigation, Corporate Governance, Shareholder Disputes, Foreign Direct
                    Investment (FDI), and Debt Restructuring.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-[#eae7e7] mt-6 flex items-center justify-between">
                <a
                  className="inline-flex items-center gap-2 text-[#b51c00] font-title-md text-title-md uppercase tracking-wider hover:text-[#1b1b1b] transition-colors"
                  href={createGmailComposeUrl(
                    INQUIRY_TEMPLATES.krisna.subject,
                    INQUIRY_TEMPLATES.krisna.body
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Consult Krisna</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                </a>
                <span className="font-label-caps text-label-caps text-[#5e5e5e] text-[10px] uppercase">
                  Jakarta Bar Association (PERADI)
                </span>
              </div>
            </div>

            {/* Partner 2: Asrifan Satria Hawinhuda */}
            <div className="bg-white p-8 sm:p-10 border border-[#eae7e7] shadow-sm relative flex flex-col justify-between">
              <div className="w-16 h-1.5 bg-[#b51c00] absolute top-0 left-0"></div>
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-28 h-36 sm:w-36 sm:h-48 bg-[#f0eded] overflow-hidden border border-[#eae7e7] shrink-0">
                    <img
                      src={PARTNER_HAWIN_IMG}
                      alt="Asrifan Satria Hawinhuda, S.H."
                      className="w-full h-full object-cover object-[center_18%] grayscale hover:grayscale-0 transition-all duration-300 contrast-105"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          '/src/assets/images/asrifan_satria_hawinhuda.jpg';
                      }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold block">
                      Partner &amp; Legal Consultant
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] font-bold uppercase mt-1">
                      Asrifan Satria Hawinhuda
                    </h3>
                    <p className="font-body-sm text-body-sm text-[#5e5e5e] mt-0.5">
                      Advocate &amp; Legal Consultant, S.H.
                    </p>
                    <div className="mt-2 inline-block px-2.5 py-1 bg-[#f0eded] text-[10px] font-label-caps uppercase tracking-wider text-[#1b1b1b]">
                      M&amp;A · Financial Transactions
                    </div>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                  Hawin provides strategic counsel on transactional engineering, cross-border mergers,
                  and corporate restructuring. With substantial experience across high-growth
                  sectors, he oversees complex legal due diligence, contractual architecture, and
                  regulatory filings across Indonesian ministries, ensuring that client transactions
                  reach completion with complete enforceability.
                </p>

                <div className="p-4 bg-[#f6f3f2] border border-[#eae7e7]">
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase block text-[10px]">
                    Practice Focus
                  </span>
                  <p className="font-body-sm text-body-sm text-[#1b1b1b] mt-1 font-bold text-xs">
                    Mergers &amp; Acquisitions, Banking &amp; Project Finance, Employment Law, Technology
                    Regulations, and Comprehensive Due Diligence.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-[#eae7e7] mt-6 flex items-center justify-between">
                <a
                  className="inline-flex items-center gap-2 text-[#b51c00] font-title-md text-title-md uppercase tracking-wider hover:text-[#1b1b1b] transition-colors"
                  href={createGmailComposeUrl(
                    INQUIRY_TEMPLATES.asrifan.subject,
                    INQUIRY_TEMPLATES.asrifan.body
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Consult Asrifan</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                </a>
                <span className="font-label-caps text-label-caps text-[#5e5e5e] text-[10px] uppercase">
                  Jakarta Bar Association (PERADI)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCEDURAL STANDARDS / INTEGRITY */}
      <section className="w-full bg-[#fcf9f8] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase tracking-widest text-xs block">
                Procedural Standards / Integrity
              </span>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase font-bold tracking-tight">
                Constructed on Disciplined Indonesian Jurisprudence
              </h2>
              <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed max-w-xl">
                Every legal memorandum, regulatory submission, and draft contract undergoes our
                dual-layer architectural audit process before delivery to a client or counterparty.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between p-3.5 bg-white border border-[#eae7e7]">
                  <span className="font-title-md text-title-md text-[#1b1b1b] font-bold text-sm">
                    Primary Statutory Analysis
                  </span>
                  <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold">
                    Mandatory Level 1
                  </span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-white border border-[#eae7e7]">
                  <span className="font-title-md text-title-md text-[#1b1b1b] font-bold text-sm">
                    Commercial Exposure Calibration
                  </span>
                  <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold">
                    Mandatory Level 2
                  </span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-white border border-[#eae7e7]">
                  <span className="font-title-md text-title-md text-[#1b1b1b] font-bold text-sm">
                    Final Partner Sign-Off
                  </span>
                  <span className="font-label-caps text-label-caps text-[#1b1b1b] uppercase text-xs font-bold">
                    Uncompromising
                  </span>
                </div>
              </div>
            </div>

            {/* Quote Block */}
            <div className="lg:col-span-5 bg-[#f6f3f2] p-8 sm:p-10 border border-[#eae7e7] relative">
              <div className="w-12 h-1 bg-[#b51c00] mb-4"></div>
              <blockquote className="font-headline-sm text-headline-sm text-[#1b1b1b] italic font-normal leading-relaxed">
                &ldquo;Clients do not consult an advocate to receive a transcript of the law; they hire
                us to engineer clarity through uncertainty, isolate business liabilities, and safeguard
                institutional objectives with absolute fidelity.&rdquo;
              </blockquote>
              <div className="mt-6 pt-4 border-t border-[#eae7e7] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#b51c00] flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-[16px]">gavel</span>
                </div>
                <div>
                  <span className="font-label-caps text-label-caps uppercase text-[#1b1b1b] font-bold block text-xs">
                    Executive Committee
                  </span>
                  <span className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                    Eiren Law Office
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCUSS YOUR LEGAL NEEDS WITH EIREN BANNER */}
      <section className="w-full bg-[#313030] py-20 text-white">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="font-label-caps text-label-caps uppercase text-[#ffb4a5] tracking-widest text-xs">
                Immediate Legal Counsel
              </span>
              <h2 className="font-display-hero-mobile text-display-hero-mobile uppercase font-bold text-white tracking-tight">
                Discuss Your Legal Needs With Eiren
              </h2>
              <p className="font-body-md text-body-md text-[#dcd9d9] leading-relaxed">
                Schedule a direct preliminary consultation with our partners. We review inquiries
                promptly and provide immediate statutory perspective for domestic and international
                ventures.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center gap-2 px-6 py-4 bg-[#b51c00] text-white font-title-md text-title-md uppercase tracking-wider hover:bg-[#e32500] transition-colors shadow-sm"
                href={createGmailComposeUrl(
                  'Partner Consultation Inquiry — Eiren Law Office',
                  'Hello Eiren Law Office,\n\nI would like to schedule a consultation with your partners.\n\nPlease let me know your availability for an initial discussion.\n\nThank you.'
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
                <span>Email Our Partners</span>
              </a>

              <button
                onClick={() => onOpenConsultation()}
                className="inline-flex items-center gap-2 px-6 py-4 bg-transparent border border-white text-white font-title-md text-title-md uppercase tracking-wider hover:bg-white hover:text-[#1b1b1b] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
                <span>Send Formal Brief</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
