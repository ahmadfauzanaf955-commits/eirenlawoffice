import React from 'react';
import { NavigationTab } from '../types';
import {
  OFFICIAL_EMAIL,
  createGmailComposeUrl,
  INQUIRY_TEMPLATES,
} from '../utils/email';

interface HomeScreenProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenConsultation: (defaultDomain?: string) => void;
}

export default function HomeScreen({
  onNavigate,
  onOpenConsultation,
}: HomeScreenProps) {
  const HERO_IMG =
    'https://i.imgur.com/7ILPegs.jpeg';

  const PARTNER_KRISNA_IMG =
    'https://i.imgur.com/aH2njbg.jpeg';

  const PARTNER_HAWIN_IMG =
    'https://i.imgur.com/8O0sKRx.jpeg';

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: ARCHITECTURAL HERO */}
      <section className="relative w-full overflow-hidden bg-[#fcf9f8] pt-12 pb-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Hero Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              {/* Structural Architectural Supertitle */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-[3px] bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                  Jakarta Central Business District · Practice 2025
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-display-hero text-display-hero text-[#1b1b1b] tracking-tight leading-[1.08] max-w-2xl font-bold">
                  Clear Counsel. <br />
                  <span className="text-[#1b1b1b]">Commercial Judgment.</span> <br />
                  <span className="text-[#b51c00]">Reliable Execution.</span>
                </h1>
                <p className="font-body-lg text-body-lg text-[#5e5e5e] max-w-xl pt-1 leading-relaxed">
                  Practical legal support for businesses navigating corporate matters,
                  strategic transactions, complex regulatory obligations, and commercial disputes.
                </p>
              </div>

              {/* Hero Action Matrix */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  className="inline-flex items-center justify-center px-6 py-4 bg-[#b51c00] text-white font-title-md text-title-md uppercase tracking-wider shadow-sm hover:bg-[#313030] transition-colors duration-150 group cursor-pointer"
                  href={createGmailComposeUrl(
                    INQUIRY_TEMPLATES.general.subject,
                    INQUIRY_TEMPLATES.general.body
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Discuss Your Legal Needs</span>
                  <span className="material-symbols-outlined ml-2 text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
                <button
                  onClick={() => {
                    onNavigate('practice-areas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-6 py-4 bg-[#f0eded] text-[#1b1b1b] font-title-md text-title-md uppercase tracking-wider hover:bg-[#eae7e7] transition-colors duration-150 cursor-pointer"
                >
                  Explore Our Services
                </button>
              </div>
            </div>

            {/* Hero Right Column: Architectural Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-[#f0eded] p-4 border border-[#eae7e7]">
                {/* Accent Bar Layer */}
                <div className="w-24 h-2 bg-[#b51c00] absolute -top-1 left-0 z-10"></div>
                <div className="relative overflow-hidden aspect-[4/5] bg-[#e5e2e1] shadow-md">
                  <img
                    className="w-full h-full object-cover grayscale contrast-125"
                    alt="Jakarta Corporate Architecture"
                    src={HERO_IMG}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/src/assets/images/jakarta_hero_architecture.jpg';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#313030]/80 via-transparent to-transparent"></div>
                  {/* Floating Structural Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white p-4 shadow-md border-l-2 border-[#b51c00]">
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-[10px] tracking-wider font-bold">
                        Eiren Executive Briefing
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#b51c00] animate-ping"></span>
                    </div>
                    <p className="font-body-sm text-body-sm text-[#1b1b1b] font-bold">
                      Comprehensive Commercial Counsel
                    </p>
                    <p className="font-body-sm text-body-sm text-[#5e5e5e] mt-0.5 text-xs">
                      Structuring investments, corporate transactions, and decisive dispute solutions in Indonesia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT EIREN */}
      <section className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Structural Label Sidebar */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-1 bg-[#b51c00] block"></span>
                  <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-xs">
                    The Practice
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] leading-tight font-bold">
                  Legal Advice Grounded in Business Reality.
                </h2>
              </div>
              <div className="pt-8 lg:pt-0">
                <button
                  onClick={() => {
                    onNavigate('about-us');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-[#b51c00] font-title-md text-title-md uppercase tracking-wider group hover:text-[#1b1b1b] transition-colors cursor-pointer"
                >
                  <span>Discover Eiren</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_right_alt
                  </span>
                </button>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-4">
              <div className="bg-white p-8 sm:p-10 shadow-sm border border-[#eae7e7] space-y-4">
                <p className="font-body-lg text-body-lg text-[#1b1b1b] leading-relaxed">
                  Established in 2025, <strong className="font-bold text-[#1b1b1b]">Eiren Law Office</strong>{' '}
                  represents local and international clients across a diverse spectrum of corporate and
                  regulatory matters. The firm focuses on timely service, transparent communication, and
                  dependable execution without compromising intellectual rigor.
                </p>
                <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                  By thoroughly analyzing the client’s commercial objectives and regulatory landscape,
                  Eiren delivers practical guidance that enables leadership teams to weigh their options
                  objectively and determine the most effective strategic path forward. We eliminate
                  superfluous legal jargon in favor of direct, actionable commercial solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRACTICE AREAS */}
      <section className="w-full bg-[#fcf9f8] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-1 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-xs">
                  Core Capabilities
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] font-bold">
                Our Areas of Practice
              </h2>
            </div>
            <p className="font-body-md text-body-md text-[#5e5e5e] max-w-md">
              Legal support across corporate governance, transactions, compliance mandates, and
              high-stakes commercial disputes.
            </p>
          </div>

          {/* 4 Interactive Practice Area Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Corporate & Commercial */}
            <div className="group flex flex-col justify-between bg-white p-6 shadow-sm border border-[#eae7e7] hover:shadow-md transition-all duration-200 relative overflow-hidden">
              <div className="w-full h-1 bg-[#f0eded] absolute top-0 left-0 group-hover:bg-[#b51c00] transition-colors"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                    01 / PRACTICE
                  </span>
                  <span className="material-symbols-outlined text-[#b51c00] text-[28px]">domain</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] mb-2 group-hover:text-[#b51c00] transition-colors font-bold">
                  Corporate &amp; Commercial
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] mb-4 text-xs">
                  End-to-end advisory for enterprise structuring, management, and ongoing legal affairs.
                </p>
                <ul className="space-y-2 mb-6 font-body-sm text-body-sm text-[#1b1b1b] text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Company establishment &amp; FDI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Corporate governance protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>General Meetings of Shareholders (GMS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Share transfers &amp; restructuring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Commercial contract engineering</span>
                  </li>
                </ul>
              </div>
              <a
                className="mt-4 w-full py-3 bg-[#f0eded] hover:bg-[#b51c00] hover:text-white text-[#1b1b1b] font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1 transition-colors duration-150 cursor-pointer"
                href={createGmailComposeUrl(
                  INQUIRY_TEMPLATES.corporate.subject,
                  INQUIRY_TEMPLATES.corporate.body
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Consult on Corporate</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>

            {/* Card 2: Transactions */}
            <div className="group flex flex-col justify-between bg-white p-6 shadow-sm border border-[#eae7e7] hover:shadow-md transition-all duration-200 relative overflow-hidden">
              <div className="w-full h-1 bg-[#f0eded] absolute top-0 left-0 group-hover:bg-[#b51c00] transition-colors"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                    02 / PRACTICE
                  </span>
                  <span className="material-symbols-outlined text-[#b51c00] text-[28px]">payments</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] mb-2 group-hover:text-[#b51c00] transition-colors font-bold">
                  Transactions
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] mb-4 text-xs">
                  Rigorous due diligence and closing frameworks for major investments and acquisitions.
                </p>
                <ul className="space-y-2 mb-6 font-body-sm text-body-sm text-[#1b1b1b] text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Legal due diligence (LDD) audits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Mergers &amp; acquisition support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Investment &amp; shareholder agreements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Closing conditions &amp; regulatory filing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Joint venture frameworks</span>
                  </li>
                </ul>
              </div>
              <a
                className="mt-4 w-full py-3 bg-[#f0eded] hover:bg-[#b51c00] hover:text-white text-[#1b1b1b] font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1 transition-colors duration-150 cursor-pointer"
                href={createGmailComposeUrl(
                  INQUIRY_TEMPLATES.transactions.subject,
                  INQUIRY_TEMPLATES.transactions.body
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Consult on Deals</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>

            {/* Card 3: Regulatory & Compliance */}
            <div className="group flex flex-col justify-between bg-white p-6 shadow-sm border border-[#eae7e7] hover:shadow-md transition-all duration-200 relative overflow-hidden">
              <div className="w-full h-1 bg-[#f0eded] absolute top-0 left-0 group-hover:bg-[#b51c00] transition-colors"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                    03 / PRACTICE
                  </span>
                  <span className="material-symbols-outlined text-[#b51c00] text-[28px]">verified_user</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] mb-2 group-hover:text-[#b51c00] transition-colors font-bold">
                  Regulatory &amp; Compliance
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] mb-4 text-xs">
                  Navigating intricate Indonesian statutory landscapes with streamlined execution.
                </p>
                <ul className="space-y-2 mb-6 font-body-sm text-body-sm text-[#1b1b1b] text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>OSS-RBA system licensing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Sectoral permits &amp; environmental clearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Employment &amp; labor compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Operational compliance audits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Personal Data Protection (PDP) advisory</span>
                  </li>
                </ul>
              </div>
              <a
                className="mt-4 w-full py-3 bg-[#f0eded] hover:bg-[#b51c00] hover:text-white text-[#1b1b1b] font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1 transition-colors duration-150 cursor-pointer"
                href={createGmailComposeUrl(
                  INQUIRY_TEMPLATES.regulatory.subject,
                  INQUIRY_TEMPLATES.regulatory.body
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Consult on Compliance</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>

            {/* Card 4: Disputes & Risk */}
            <div className="group flex flex-col justify-between bg-white p-6 shadow-sm border border-[#eae7e7] hover:shadow-md transition-all duration-200 relative overflow-hidden">
              <div className="w-full h-1 bg-[#f0eded] absolute top-0 left-0 group-hover:bg-[#b51c00] transition-colors"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                    04 / PRACTICE
                  </span>
                  <span className="material-symbols-outlined text-[#b51c00] text-[28px]">gavel</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] mb-2 group-hover:text-[#b51c00] transition-colors font-bold">
                  Disputes &amp; Risk
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] mb-4 text-xs">
                  Protecting enterprise value through measured pre-litigation and strategic arbitration.
                </p>
                <ul className="space-y-2 mb-6 font-body-sm text-body-sm text-[#1b1b1b] text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Formal legal notices (Somasi/Warning Letters)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Amicable commercial settlements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Litigation management &amp; strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Arbitration proceedings coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                    <span>Pre-emptive contract risk mitigation</span>
                  </li>
                </ul>
              </div>
              <a
                className="mt-4 w-full py-3 bg-[#f0eded] hover:bg-[#b51c00] hover:text-white text-[#1b1b1b] font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1 transition-colors duration-150 cursor-pointer"
                href={createGmailComposeUrl(
                  INQUIRY_TEMPLATES.disputes.subject,
                  INQUIRY_TEMPLATES.disputes.body
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Consult on Disputes</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MEET THE PARTNERS */}
      <section className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-1 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-xs">
                  Leadership
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] font-bold">
                The People Behind Eiren
              </h2>
            </div>
            <p className="font-body-md text-body-md text-[#5e5e5e] max-w-md">
              Practical legal guidance begins with understanding the matter, its context, and the decisions ahead.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Partner 1: Krisna Murti Ardianto */}
            <div className="bg-white p-8 sm:p-10 shadow-sm border border-[#eae7e7] relative flex flex-col justify-between">
              <div className="w-12 h-1.5 bg-[#b51c00] absolute top-0 left-0"></div>
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#f0eded] flex items-center justify-center font-headline-sm text-headline-sm text-[#1b1b1b] font-bold tracking-tight">
                      KMA
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] font-bold">
                        Krisna Murti Ardianto
                      </h3>
                      <span className="font-label-caps text-label-caps text-[#b51c00] uppercase block mt-0.5 text-xs">
                        Partner · Corporate &amp; Transactions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Portrait */}
                <div className="relative w-full h-[380px] sm:h-[440px] mb-6 bg-[#f0eded] overflow-hidden border border-[#eae7e7]">
                  <img
                    className="w-full h-full object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-300 contrast-105"
                    alt="Krisna Murti Ardianto"
                    src={PARTNER_KRISNA_IMG}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/src/assets/images/krisna_murti_ardianto_web.jpg';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 right-2 bg-white px-3 py-1 shadow-xs border border-[#eae7e7]">
                    <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                      Verified Partner
                    </span>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                  Krisna advises clients on corporate and commercial matters, including transactions,
                  corporate structuring, legal due diligence, and regulatory compliance. He also provides
                  legal opinions on corporate, contractual, land, employment, and regulatory matters, with a
                  focus on practical, business-oriented solutions.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-[#f0eded] font-label-caps text-label-caps text-[#1b1b1b] uppercase text-[10px]">
                    M&amp;A Structuring
                  </span>
                  <span className="px-2.5 py-1 bg-[#f0eded] font-label-caps text-label-caps text-[#1b1b1b] uppercase text-[10px]">
                    Legal Opinions
                  </span>
                  <span className="px-2.5 py-1 bg-[#f0eded] font-label-caps text-label-caps text-[#1b1b1b] uppercase text-[10px]">
                    Land &amp; Real Estate
                  </span>
                  <span className="px-2.5 py-1 bg-[#f0eded] font-label-caps text-label-caps text-[#1b1b1b] uppercase text-[10px]">
                    Due Diligence
                  </span>
                </div>
              </div>

              <div className="pt-8">
                <a
                  className="inline-flex items-center gap-2 text-[#b51c00] font-title-md text-title-md uppercase tracking-wider hover:text-[#1b1b1b] transition-colors"
                  href={createGmailComposeUrl(
                    INQUIRY_TEMPLATES.krisna.subject,
                    INQUIRY_TEMPLATES.krisna.body
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Connect with Krisna</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                </a>
              </div>
            </div>

            {/* Partner 2: Asrifan Satria Hawinhuda */}
            <div className="bg-white p-8 sm:p-10 shadow-sm border border-[#eae7e7] relative flex flex-col justify-between">
              <div className="w-12 h-1.5 bg-[#b51c00] absolute top-0 left-0"></div>
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#f0eded] flex items-center justify-center font-headline-sm text-headline-sm text-[#1b1b1b] font-bold tracking-tight">
                      ASH
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] font-bold">
                        Asrifan Satria Hawinhuda
                      </h3>
                      <span className="font-label-caps text-label-caps text-[#b51c00] uppercase block mt-0.5 text-xs">
                        Partner · Commercial &amp; Compliance
                      </span>
                    </div>
                  </div>
                </div>

                {/* Portrait */}
                <div className="relative w-full h-[380px] sm:h-[440px] mb-6 bg-[#f0eded] overflow-hidden border border-[#eae7e7]">
                  <img
                    className="w-full h-full object-cover object-[center_18%] grayscale hover:grayscale-0 transition-all duration-300 contrast-105"
                    alt="Asrifan Satria Hawinhuda, S.H."
                    src={PARTNER_HAWIN_IMG}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/src/assets/images/asrifan_satria_hawinhuda.jpg';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 right-2 bg-white px-3 py-1 shadow-xs border border-[#eae7e7]">
                    <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                      Verified Partner
                    </span>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                  Hawin advises clients on corporate and commercial matters, with expertise in commercial
                  contracts, corporate governance, regulatory compliance, intellectual property, and
                  personal data protection. He helps businesses structure arrangements through practical
                  and commercially driven legal solutions.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-[#f0eded] font-label-caps text-label-caps text-[#1b1b1b] uppercase text-[10px]">
                    Commercial Contracts
                  </span>
                  <span className="px-2.5 py-1 bg-[#f0eded] font-label-caps text-label-caps text-[#1b1b1b] uppercase text-[10px]">
                    Corporate Governance
                  </span>
                  <span className="px-2.5 py-1 bg-[#f0eded] font-label-caps text-label-caps text-[#1b1b1b] uppercase text-[10px]">
                    IP Protection
                  </span>
                  <span className="px-2.5 py-1 bg-[#f0eded] font-label-caps text-label-caps text-[#1b1b1b] uppercase text-[10px]">
                    Data Privacy (PDP)
                  </span>
                </div>
              </div>

              <div className="pt-8">
                <a
                  className="inline-flex items-center gap-2 text-[#b51c00] font-title-md text-title-md uppercase tracking-wider hover:text-[#1b1b1b] transition-colors"
                  href={createGmailComposeUrl(
                    INQUIRY_TEMPLATES.asrifan.subject,
                    INQUIRY_TEMPLATES.asrifan.body
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Connect with Hawin</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRY & CLIENT CONTEXT */}
      <section className="w-full bg-[#fcf9f8] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-1 bg-[#b51c00] block"></span>
              <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-xs">
                Sector Experience
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] font-bold">
              Understanding the Business Behind the Legal Matter
            </h2>
            <p className="font-body-lg text-body-lg text-[#5e5e5e] mt-2 leading-relaxed">
              Familiarity with different commercial environments helps frame legal issues in a way that
              is relevant to the client’s circumstances.
            </p>
          </div>

          {/* Industry Sectors Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div
              onClick={() => {
                onNavigate('industries');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#f6f3f2] p-6 hover:bg-[#f0eded] transition-colors cursor-pointer border border-[#eae7e7]"
            >
              <div className="w-10 h-10 bg-white flex items-center justify-center text-[#b51c00] mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-1 font-bold">
                Trading Companies
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                Cross-border supply chains, import/export licensing, distribution agreements, and trade compliance under Indonesian customs.
              </p>
            </div>

            <div
              onClick={() => {
                onNavigate('industries');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#f6f3f2] p-6 hover:bg-[#f0eded] transition-colors cursor-pointer border border-[#eae7e7]"
            >
              <div className="w-10 h-10 bg-white flex items-center justify-center text-[#b51c00] mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">medical_services</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-1 font-bold">
                Healthcare Providers
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                Regulatory approval for clinics, distribution of medical devices, hospital vendor contracts, and healthcare data security protocols.
              </p>
            </div>

            <div
              onClick={() => {
                onNavigate('industries');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#f6f3f2] p-6 hover:bg-[#f0eded] transition-colors cursor-pointer border border-[#eae7e7]"
            >
              <div className="w-10 h-10 bg-white flex items-center justify-center text-[#b51c00] mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-1 font-bold">
                Manufacturing
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                Industrial zoning, factory environmental permits, labor union negotiations, production outsourcing agreements, and equipment leasing.
              </p>
            </div>

            <div
              onClick={() => {
                onNavigate('industries');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#f6f3f2] p-6 hover:bg-[#f0eded] transition-colors cursor-pointer border border-[#eae7e7]"
            >
              <div className="w-10 h-10 bg-white flex items-center justify-center text-[#b51c00] mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">terrain</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-1 font-bold">
                Mining &amp; Resources
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                Concession licensing reviews (IUP), subcontractor joint operations, statutory royalty compliance, and community dispute handling.
              </p>
            </div>
          </div>

          {/* Client Profiles Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 shadow-sm border border-[#eae7e7]">
              <div className="flex items-center justify-between pb-2">
                <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold">
                  Client Spectrum · 01
                </span>
                <span className="material-symbols-outlined text-[#5e5e5e] text-[20px]">storefront</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-[#1b1b1b] mb-2 font-bold">
                Local Indonesian Businesses
              </h4>
              <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                Assisting family-owned enterprises, high-growth startups, and domestic holding
                companies in institutionalizing governance, safeguarding assets, and executing
                expansion agreements.
              </p>
            </div>

            <div className="bg-white p-8 shadow-sm border border-[#eae7e7]">
              <div className="flex items-center justify-between pb-2">
                <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold">
                  Client Spectrum · 02
                </span>
                <span className="material-symbols-outlined text-[#5e5e5e] text-[20px]">public</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-[#1b1b1b] mb-2 font-bold">
                Multinational Clients
              </h4>
              <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                Guiding foreign direct investors and regional subsidiaries through foreign ownership
                caps, statutory reporting, employment transfers, and cross-border commercial compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR APPROACH */}
      <section className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-1 bg-[#b51c00] block"></span>
              <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-xs">
                Execution Methodology
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] font-bold">
              A Clear Process. A Practical Approach.
            </h2>
            <p className="font-body-md text-body-md text-[#5e5e5e] mt-2">
              A disciplined 4-stage operational sequence that moves client mandates from ambiguity to finality.
            </p>
          </div>

          {/* Horizontal Process Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 */}
            <div className="bg-white p-6 shadow-sm border border-[#eae7e7] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display-hero-mobile text-display-hero-mobile text-[#b51c00] font-bold">
                    01
                  </span>
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                    Stage 01
                  </span>
                </div>
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-2 uppercase font-bold">
                  Understand
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                  We define the commercial realities, stakeholder dynamics, and business objectives
                  driving the legal matter before proposing legal tactics.
                </p>
              </div>
              <div className="w-full h-1 bg-[#b51c00] mt-6"></div>
            </div>

            {/* Step 02 */}
            <div className="bg-white p-6 shadow-sm border border-[#eae7e7] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display-hero-mobile text-display-hero-mobile text-[#b51c00] font-bold">
                    02
                  </span>
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                    Stage 02
                  </span>
                </div>
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-2 uppercase font-bold">
                  Review
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                  Surgical analysis of relevant documentation, statutory provisions, judicial trends,
                  and counterpart exposure to isolate genuine liabilities.
                </p>
              </div>
              <div className="w-full h-1 bg-[#eae7e7] mt-6"></div>
            </div>

            {/* Step 03 */}
            <div className="bg-white p-6 shadow-sm border border-[#eae7e7] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display-hero-mobile text-display-hero-mobile text-[#b51c00] font-bold">
                    03
                  </span>
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                    Stage 03
                  </span>
                </div>
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-2 uppercase font-bold">
                  Advise
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                  Delivering straightforward, commercially reasoned options. We provide clear
                  recommendations instead of passive recitations of statutory text.
                </p>
              </div>
              <div className="w-full h-1 bg-[#eae7e7] mt-6"></div>
            </div>

            {/* Step 04 */}
            <div className="bg-white p-6 shadow-sm border border-[#eae7e7] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display-hero-mobile text-display-hero-mobile text-[#b51c00] font-bold">
                    04
                  </span>
                  <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px]">
                    Stage 04
                  </span>
                </div>
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-2 uppercase font-bold">
                  Execute
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                  Drafting, negotiating, filing, or litigating with punctuality and meticulous attention
                  to closing conditions and regulatory deadlines.
                </p>
              </div>
              <div className="w-full h-1 bg-[#b51c00] mt-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY EIREN (4 PILLARS) */}
      <section className="w-full bg-[#fcf9f8] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-1 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-xs">
                  Operational Principles
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] font-bold">
                Why Eiren
              </h2>
            </div>
            <p className="font-body-md text-body-md text-[#5e5e5e] max-w-md">
              A modern corporate practice constructed around executive accessibility, efficiency, and commercial clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#f6f3f2] p-6 border border-[#eae7e7]">
              <span className="material-symbols-outlined text-[#b51c00] text-[32px] mb-4 block">
                forum
              </span>
              <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-2 font-bold">
                Responsive Communication
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                No communication blackouts or multi-tier bureaucracy. Direct partner availability and
                immediate counsel via our official legal inquiry desk.
              </p>
            </div>

            <div className="bg-[#f6f3f2] p-6 border border-[#eae7e7]">
              <span className="material-symbols-outlined text-[#b51c00] text-[32px] mb-4 block">
                assignment_turned_in
              </span>
              <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-2 font-bold">
                Practical Recommendations
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                We provide definitive next steps tailored to your business risk profile, rather than
                theoretical memos that avoid clear guidance.
              </p>
            </div>

            <div className="bg-[#f6f3f2] p-6 border border-[#eae7e7]">
              <span className="material-symbols-outlined text-[#b51c00] text-[32px] mb-4 block">
                shield
              </span>
              <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-2 font-bold">
                Disciplined Risk Identification
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                Rigorous evaluation of operational, contractual, and regulatory exposures before they
                materialize into expensive disputes.
              </p>
            </div>

            <div className="bg-[#f6f3f2] p-6 border border-[#eae7e7]">
              <span className="material-symbols-outlined text-[#b51c00] text-[32px] mb-4 block">
                sync_alt
              </span>
              <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-2 font-bold">
                Flexible Legal Support
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                Adaptable engagement frameworks spanning project-based transactional retainers,
                ongoing general counsel arrangements, or discrete dispute mandates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: CONTACT CTA */}
      <section className="w-full bg-[#f0eded] py-20">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="bg-white p-8 sm:p-12 lg:p-16 shadow-sm border border-[#eae7e7] relative overflow-hidden">
            {/* Structural Top Accent Bar */}
            <div className="w-32 h-2 bg-[#b51c00] absolute top-0 left-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="font-label-caps text-label-caps text-[#b51c00] uppercase tracking-widest block text-xs">
                  Direct Client Engagement
                </span>
                <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] leading-tight max-w-xl font-bold">
                  Let’s Discuss Your Legal Needs.
                </h2>
                <p className="font-body-lg text-body-lg text-[#5e5e5e] max-w-2xl leading-relaxed">
                  Whether you are preparing a corporate acquisition, structuring a new Indonesian
                  venture, or addressing a commercial disagreement, our partners are ready to assist.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    className="inline-flex items-center justify-center px-6 py-4 bg-[#b51c00] text-white font-title-md text-title-md uppercase tracking-wider hover:bg-[#313030] transition-colors duration-150 cursor-pointer shadow-sm"
                    href={createGmailComposeUrl(
                      INQUIRY_TEMPLATES.general.subject,
                      INQUIRY_TEMPLATES.general.body
                    )}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined mr-2 text-[20px]">mail</span>
                    <span>Initiate Consultation via Email</span>
                  </a>
                  <button
                    onClick={() => {
                      onNavigate('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center px-6 py-4 bg-[#f0eded] text-[#1b1b1b] font-title-md text-title-md uppercase tracking-wider hover:bg-[#eae7e7] transition-colors duration-150 cursor-pointer"
                  >
                    View Contact Details
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#f6f3f2] p-6 border border-[#eae7e7] space-y-3">
                <h3 className="font-label-caps text-label-caps text-[#1b1b1b] uppercase text-xs font-bold">
                  Direct Contact Details
                </h3>
                <div className="space-y-2 font-body-sm text-body-sm text-xs">
                  <p className="text-[#5e5e5e]">Office Hours: Mon – Fri, 09:00 – 18:00 WIB</p>
                  <p className="text-[#1b1b1b] font-bold leading-relaxed">
                    Infiniti Office, Bellezza BSA 1st Floor Unit 106, Jl. Letjen Soepeno, Permata Hijau, South Jakarta, DKI Jakarta
                  </p>
                  <div className="pt-1">
                    <span className="block text-[#5e5e5e] font-label-caps text-label-caps uppercase text-[10px]">
                      Email Inquiries (Direct Desk)
                    </span>
                    <a
                      className="text-[#b51c00] font-bold hover:underline"
                      href={createGmailComposeUrl(
                        INQUIRY_TEMPLATES.general.subject,
                        INQUIRY_TEMPLATES.general.body
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {OFFICIAL_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
