import React, { useState } from 'react';
import { createGmailComposeUrl } from '../utils/email';

interface IndustriesScreenProps {
  onOpenConsultation: (defaultDomain?: string) => void;
}

export default function IndustriesScreen({
  onOpenConsultation,
}: IndustriesScreenProps) {
  const [activeSector, setActiveSector] = useState<string>('trading');

  const sectors = [
    {
      id: 'trading',
      title: 'Trading & Cross-Border Supply Chains',
      icon: 'local_shipping',
      summary:
        'Guiding regional and domestic trading conglomerates through import-export licenses, customs tariff classification, and multi-tier distribution networks.',
      highlights: [
        'Importer Identification Numbers (API-U / API-P) via OSS-RBA',
        'Customs Valuation & Post-Clearance Audit Defense (Bea Cukai)',
        'Exclusive Master Distribution & Agency Agreements (Permendag 24/2021)',
        'Cross-border freight forwarder liability and warehousing covenants',
      ],
      caseStudy:
        'Structured an end-to-end distribution architecture for a Singaporean consumer goods firm entering Indonesian tier-1 and tier-2 markets with localized distributor security.',
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Life Sciences',
      icon: 'medical_services',
      summary:
        'Navigating complex Ministry of Health (Kemenkes) and BPOM authorizations, healthcare establishment permits, and patient data compliance.',
      highlights: [
        'Medical Device Distribution Permits (IPAK / CDAKB)',
        'Clinic & Hospital Operational Licensing under the Omnibus Health Law',
        'Pharmaceutical contract manufacturing and technology transfer',
        'Electronic Health Record (RME) compliance and statutory health data security',
      ],
      caseStudy:
        'Advised a foreign-backed specialized clinic network on PT PMA equity restrictions, medical personnel credentials, and Ministry of Health compliance filings.',
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing & Heavy Industry',
      icon: 'precision_manufacturing',
      summary:
        'Advising manufacturing facilities located within designated industrial estates (Kawasan Industri) on statutory zoning, environmental permits, and labor relations.',
      highlights: [
        'Factory establishment and expansion approvals (IUI / KBLI alignment)',
        'Environmental compliance: AMDAL, UKL-UPL, and hazardous waste (B3) permits',
        'Industrial labor relations, union negotiations, and Company Regulations',
        'Equipment supply leasing, EPC agreements, and utility off-take contracts',
      ],
      caseStudy:
        'Facilitated the regulatory and land acquisition review for a 12-hectare automotive component assembly facility in Karawang, West Java.',
    },
    {
      id: 'mining',
      title: 'Mining, Energy & Natural Resources',
      icon: 'terrain',
      summary:
        'Comprehensive advisory regarding mining concessions (IUP), subcontractor joint operations (KSO), and regulatory filings with the Ministry of Energy (ESDM).',
      highlights: [
        'Mining Concession (IUP) title scrutiny and ESDM MODI registry verification',
        'Forestry utilization permits (PPKH) and statutory royalty calculations',
        'Mining services licensing (IUJP) and subcontractor master agreements',
        'Community development (PPM) agreements and land compensation settlements',
      ],
      caseStudy:
        'Conducted due diligence on a mineral concession transfer structure, identifying dormant environmental liabilities and negotiating protective indemnity escrow terms.',
    },
    {
      id: 'tech',
      title: 'Technology, E-Commerce & Fintech',
      icon: 'memory',
      summary:
        'Structuring compliance for digital platforms, e-commerce operators, and fintech ventures under Kominfo, Bank Indonesia, and OJK frameworks.',
      highlights: [
        'Electronic System Operator (PSE) registrations with Ministry of Communication',
        'Personal Data Protection (UU PDP No. 27/2022) audit and privacy engineering',
        'SaaS terms of service, API licensing, and intellectual property assignment',
        'Fintech regulatory sandbox alignment and digital payment gateway contracts',
      ],
      caseStudy:
        'Drafted enterprise data governance policies and platform user terms for a B2B logistics SaaS platform scaling cross-island operations in Indonesia.',
    },
    {
      id: 'real-estate',
      title: 'Real Estate, Land & Construction',
      icon: 'apartment',
      summary:
        'Resolving land title complexities, Agrarian Ministry (BPN) registrations, Hak Guna Bangunan (HGB) extensions, and commercial real property transactions.',
      highlights: [
        'BPN land title audits, encumbrance checks, and Hak Milik to HGB conversion',
        'Building Approvals (PBG) and Certificates of Feasibility (SLF)',
        'Commercial lease agreements and shopping center tenancy rules',
        'FIDIC-based construction contracts and contractor dispute arbitration',
      ],
      caseStudy:
        'Represented an institutional investor in the acquisition of a prime commercial tower in Sudirman CBD, conducting rigorous land and building certification checks.',
    },
  ];

  const currentSectorData = sectors.find((s) => s.id === activeSector) || sectors[0];

  return (
    <div className="flex flex-col w-full">
      {/* Top Hero Section */}
      <section className="w-full bg-[#fcf9f8] pt-12 pb-16 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[3px] bg-[#b51c00] block"></span>
              <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                Sector Intelligence &amp; Commercial Acumen
              </span>
            </div>
            <h1 className="font-display-hero text-display-hero text-[#1b1b1b] tracking-tight uppercase font-bold">
              Industries We Counsel
            </h1>
            <p className="font-body-lg text-body-lg text-[#5e5e5e] leading-relaxed">
              Familiarity with sector-specific commercial realities allows our advocates to frame
              legal issues in direct context with business economics, avoiding theoretical bottlenecks.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Sector Browser */}
      <section className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Selector Track */}
            <div className="lg:col-span-4 space-y-2">
              <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px] block mb-2 font-bold">
                Commercial Practice Sectors
              </span>
              {sectors.map((sector) => {
                const isActive = sector.id === activeSector;
                return (
                  <button
                    key={sector.id}
                    onClick={() => setActiveSector(sector.id)}
                    className={`w-full p-4 text-left transition-all border flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#b51c00] shadow-sm'
                        : 'bg-[#f0eded] border-[#eae7e7] hover:bg-white text-[#5e5e5e]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`material-symbols-outlined text-[22px] ${
                          isActive ? 'text-[#b51c00]' : 'text-[#5e5e5e]'
                        }`}
                      >
                        {sector.icon}
                      </span>
                      <span
                        className={`font-title-md text-title-md uppercase text-sm ${
                          isActive ? 'text-[#1b1b1b] font-bold' : 'text-[#5e5e5e]'
                        }`}
                      >
                        {sector.title.split('&')[0].trim()}
                      </span>
                    </div>
                    {isActive && <span className="w-2 h-2 bg-[#b51c00]"></span>}
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Sector Showcase */}
            <div className="lg:col-span-8 bg-white p-8 lg:p-12 border border-[#eae7e7] shadow-sm relative space-y-6">
              <div className="w-16 h-1.5 bg-[#b51c00] absolute top-0 left-0"></div>

              <div className="flex items-start justify-between">
                <div>
                  <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold block">
                    Sector Profile
                  </span>
                  <h2 className="font-headline-md text-headline-md text-[#1b1b1b] uppercase font-bold mt-1">
                    {currentSectorData.title}
                  </h2>
                </div>
                <div className="w-12 h-12 bg-[#f0eded] flex items-center justify-center text-[#b51c00] shrink-0">
                  <span className="material-symbols-outlined text-[26px]">
                    {currentSectorData.icon}
                  </span>
                </div>
              </div>

              <p className="font-body-lg text-body-lg text-[#5e5e5e] leading-relaxed">
                {currentSectorData.summary}
              </p>

              {/* Core Highlights */}
              <div className="pt-2">
                <h3 className="font-label-caps text-label-caps text-[#1b1b1b] uppercase text-xs font-bold mb-3">
                  Core Regulatory &amp; Contractual Mandates
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentSectorData.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#f6f3f2] border border-[#eae7e7] flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 bg-[#b51c00] mt-1.5 shrink-0"></span>
                      <span className="font-body-sm text-body-sm text-[#1b1b1b] text-xs">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Representative Brief */}
              <div className="p-4 bg-[#f0eded] border-l-2 border-[#b51c00] space-y-1">
                <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px] font-bold block">
                  Representative Advisory Context
                </span>
                <p className="font-body-sm text-body-sm text-[#1b1b1b] text-xs leading-relaxed italic">
                  &ldquo;{currentSectorData.caseStudy}&rdquo;
                </p>
              </div>

              {/* Action */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  className="px-6 py-3.5 bg-[#b51c00] text-white font-label-md text-label-md uppercase tracking-wider hover:bg-[#313030] transition-colors shadow-sm inline-flex items-center gap-2"
                  href={createGmailComposeUrl(
                    `Industry Advisory Inquiry — ${currentSectorData.title}`,
                    `Hello Eiren Law Office,\n\nI would like to consult regarding legal counsel in ${currentSectorData.title}.\n\nPlease let me know the appropriate next steps for an initial discussion.\n\nThank you.`
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span>Consult in this Sector</span>
                </a>

                <button
                  onClick={() => onOpenConsultation(currentSectorData.title)}
                  className="px-6 py-3.5 bg-[#f0eded] text-[#1b1b1b] font-label-md text-label-md uppercase tracking-wider hover:bg-[#eae7e7] transition-colors cursor-pointer"
                >
                  Send Structured Brief
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Spectrum Segment */}
      <section className="w-full bg-[#fcf9f8] py-20">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold block mb-1">
              Client Representation
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] font-bold">
              Serving Domestic Leaders &amp; Cross-Border Investors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-[#eae7e7] shadow-sm space-y-4">
              <div className="w-10 h-10 bg-[#f0eded] flex items-center justify-center text-[#b51c00]">
                <span className="material-symbols-outlined text-[24px]">storefront</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] font-bold uppercase">
                Local Indonesian Enterprises
              </h3>
              <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed text-sm">
                Assisting family-owned enterprises, domestic conglomerates, and high-growth Indonesian
                ventures institutionalize governance structures, insulate shareholder assets, and
                execute compliant corporate expansions.
              </p>
              <ul className="space-y-2 text-xs font-bold text-[#1b1b1b] pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Generational succession &amp; family trust holding structures</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Shareholder pacts &amp; board oversight matrices</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Commercial contract enforcement and debt recovery</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-white border border-[#eae7e7] shadow-sm space-y-4">
              <div className="w-10 h-10 bg-[#f0eded] flex items-center justify-center text-[#b51c00]">
                <span className="material-symbols-outlined text-[24px]">public</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] font-bold uppercase">
                Multinational Corporations &amp; FDI
              </h3>
              <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed text-sm">
                Guiding foreign direct investors through foreign ownership limitations, investment
                coordinating board (BKPM) requirements, and cross-border currency and tax alignment.
              </p>
              <ul className="space-y-2 text-xs font-bold text-[#1b1b1b] pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>100% PT PMA foreign entity incorporation &amp; capital deposit</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Periodic investment activity reports (LKPM BKPM)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Expatriate manpower permits (RPTKA) &amp; international arbitration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
