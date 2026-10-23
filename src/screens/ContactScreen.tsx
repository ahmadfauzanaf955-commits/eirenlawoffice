import React, { useState } from 'react';
import {
  OFFICIAL_EMAIL,
  createGmailComposeUrl,
  createMailtoUrl,
  INQUIRY_TEMPLATES,
} from '../utils/email';

const EMAIL_SUBJECT = INQUIRY_TEMPLATES.general.subject;
const EMAIL_BODY = INQUIRY_TEMPLATES.general.body;
const GMAIL_COMPOSE_URL = createGmailComposeUrl(EMAIL_SUBJECT, EMAIL_BODY);
const FALLBACK_MAILTO_URL = createMailtoUrl(EMAIL_SUBJECT);

export default function ContactScreen() {
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [practiceDomain, setPracticeDomain] = useState('Corporate & Commercial');
  const [matterSummary, setMatterSummary] = useState('');

  const CHAMBERS_IMG =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBl1rZ8KQBFca4c1s86HIjTUd699BRpUkYGvaSYqryH6KHpL6_rtmFykOTAUtNz3-iQ_RxYZ7brgWYyhg4Yew2P6iMK0gq27DCgsRgpUj6Zrpry4gHUBkiD0wIyMMpsAdgnOzdeWozga_nNcrdZQLdHtEaLiaAyoUPfxCGQNZeiuNKnFRSjotawJxdeMdiHMGrm7szfxmXSl9IJCapLVE_xC8u1Gi7KTaSf_TpnYFPK56ZP9Rrmh8oPZw';

  const MAP_IMG =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCbmowEgI5qjzGCP-5sPpNyX4CNkVxBiwA4iO1yPG28YGOIA4qQQQ33WwgRBwBfmd7TwhNtAxs_cI9UiX5-Qo_EHOuiRGi7vMkIb7QTjRWy3ulqA_loHq5SWORE0Ij9hSmcwP9MBX0UWVolHX_oTlSFRdHmYjwkVPMcRzcsk2ZgvW10ONAMOkoXJRYFLleDmFbCSpkdrFaN81HrmbLwszgy_TwFEc8elVTtCSSCyEb6Zydo9uI7pd-FBQ';

  const previewText = () => {
    const rep = clientName.trim() || '[Your Name]';
    const comp = clientCompany.trim() ? ` (${clientCompany.trim()})` : '';
    let text = `Hello Eiren Law Office, my name is ${rep}${comp}. I am reaching out regarding ${practiceDomain}.`;
    if (matterSummary.trim()) {
      text += ` Context: ${matterSummary.trim()}`;
    } else {
      text += ` Please advise on partner consultation availability.`;
    }
    return text;
  };

  const dispatchEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const rep = clientName.trim() || 'Prospective Client';
    const comp = clientCompany.trim() ? ` (${clientCompany.trim()})` : '';

    const subject = `Legal Counsel Inquiry [${practiceDomain}] - ${rep}${comp}`;
    let message =
      `Hello Eiren Law Office,\n\n` +
      `I would like to schedule an initial legal counsel discussion.\n\n` +
      `• Representative: ${rep}${comp}\n` +
      `• Practice Domain: ${practiceDomain}\n`;

    if (matterSummary.trim()) {
      message += `• Overview: ${matterSummary.trim()}\n`;
    }

    message += `\nPlease confirm next steps and availability. Thank you.`;

    const composeUrl = createGmailComposeUrl(subject, message);
    window.open(composeUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollToInquiry = () => {
    const el = document.getElementById('inquiry-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Architectural Statement & Brief Section */}
      <section className="w-full bg-[#fcf9f8] pt-12 pb-16 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#f0eded] px-3 py-1 border border-[#eae7e7]">
                <span className="w-2 h-2 bg-[#b51c00]"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#1b1b1b] tracking-widest text-xs">
                  Formal Legal Consultation Portal
                </span>
              </div>

              <h1 className="font-display-hero text-display-hero text-[#1b1b1b] tracking-tight uppercase leading-none font-bold">
                Let&apos;s Discuss <br />
                <span className="text-[#b51c00]">Your Legal Needs.</span>
              </h1>

              <p className="font-body-lg text-body-lg text-[#5e5e5e] max-w-xl pt-1 leading-relaxed">
                We would be pleased to discuss your legal needs and determine the most practical,
                commercially viable next steps for your organization.
              </p>

              {/* Direct Primary Action: Official Email */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#b51c00] text-white font-title-md text-title-md uppercase tracking-wider hover:bg-[#313030] transition-all shadow-sm cursor-pointer"
                  href={GMAIL_COMPOSE_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[24px]">mail</span>
                  <span>Draft Official Email</span>
                </a>
                <button
                  onClick={scrollToInquiry}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#f0eded] text-[#1b1b1b] font-title-md text-title-md uppercase tracking-wider hover:bg-[#eae7e7] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                  <span>Tailor Inquiry Draft</span>
                </button>
              </div>

              <div className="pt-2 flex items-center gap-4 text-[#5e5e5e]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#b51c00] text-[18px]">
                    verified_user
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-[11px]">
                    Direct Partner Attention
                  </span>
                </div>
                <span className="text-[#e5e2e1]">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#b51c00] text-[18px]">lock</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-[11px]">
                    Confidential Exchange
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Operational Protocol */}
            <div className="lg:col-span-5 bg-[#f6f3f2] p-8 lg:p-10 flex flex-col justify-between relative shadow-sm border border-[#eae7e7]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#b51c00]"></div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-wider text-xs">
                    Operational Standards
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 bg-[#f0eded] text-[#1b1b1b] font-label-sm text-label-sm font-bold text-[10px]">
                    WIB (UTC+7)
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-[#1b1b1b] uppercase font-bold">
                  Consultation Protocol
                </h2>
                <p className="font-body-md text-body-md text-[#5e5e5e] text-sm leading-relaxed">
                  Client engagements adhere to strict conflict-check screening and professional
                  confidentiality. Consultations are conducted both virtually and in-person by confirmed
                  appointment.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-start justify-between bg-white p-3.5 shadow-xs border border-[#eae7e7]">
                    <div>
                      <span className="font-label-caps text-label-caps text-[#1b1b1b] block uppercase text-[10px]">
                        Business Hours
                      </span>
                      <span className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                        Monday — Friday
                      </span>
                    </div>
                    <span className="font-title-md text-title-md text-[#1b1b1b] font-bold text-sm">
                      09:00 — 18:00
                    </span>
                  </div>

                  <div className="flex items-start justify-between bg-white p-3.5 shadow-xs border border-[#eae7e7]">
                    <div>
                      <span className="font-label-caps text-label-caps text-[#1b1b1b] block uppercase text-[10px]">
                        Urgent Matters
                      </span>
                      <span className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                        Transactional Deadlines &amp; Injunctions
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm font-bold text-[#b51c00] uppercase text-[10px]">
                      Priority Channel
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 flex items-center justify-between bg-[#f0eded] p-3.5 border border-[#eae7e7]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#25D366]"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#1b1b1b] font-bold text-xs">
                    Duty Counsel Active
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                  Typical reply: &lt; 2 hrs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE INQUIRY HELPER & TAILORED DISPATCH */}
      <section
        id="inquiry-builder"
        className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]"
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-12 shadow-md border border-[#eae7e7] relative">
              <div className="absolute top-0 left-0 w-16 h-1 bg-[#b51c00]"></div>
              <div className="space-y-2 mb-8">
                <span className="font-label-caps text-label-caps text-[#b51c00] tracking-widest uppercase text-xs font-bold">
                  Structured Triage Tool
                </span>
                <h2 className="font-headline-md text-headline-md text-[#1b1b1b] uppercase font-bold">
                  Prepare Client Inquiry
                </h2>
                <p className="font-body-md text-body-md text-[#5e5e5e] text-sm leading-relaxed">
                  Input preliminary non-sensitive matter particulars to generate an authenticated,
                  formatted email briefing for counsel review.
                </p>
              </div>

              <form onSubmit={dispatchEmail} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-caps text-label-caps text-[#1b1b1b] uppercase block text-xs">
                      Full Name / Legal Representative <span className="text-[#b51c00]">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2.5 bg-white border border-[#e5e2e1] text-[#1b1b1b] font-body-md text-body-md placeholder:text-[#5b5c5c] focus:outline-none focus:border-[#b51c00] shadow-xs text-sm"
                      placeholder="e.g. Aris Sutanto, S.H."
                      required
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-caps text-label-caps text-[#1b1b1b] uppercase block text-xs">
                      Entity / Company Name
                    </label>
                    <input
                      className="w-full px-3 py-2.5 bg-white border border-[#e5e2e1] text-[#1b1b1b] font-body-md text-body-md placeholder:text-[#5b5c5c] focus:outline-none focus:border-[#b51c00] shadow-xs text-sm"
                      placeholder="e.g. PT Samudra Investama Mandiri"
                      type="text"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                    />
                  </div>
                </div>

                {/* Practice Area Domain Selector */}
                <div className="space-y-1">
                  <label className="font-label-caps text-label-caps text-[#1b1b1b] uppercase block text-xs">
                    Primary Practice Domain <span className="text-[#b51c00]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      'Corporate & Commercial',
                      'Transactions & M&A',
                      'Regulatory & Compliance',
                      'Disputes & Risk',
                    ].map((domain) => {
                      const isSelected = practiceDomain === domain;
                      return (
                        <label
                          key={domain}
                          className={`flex items-center gap-3 p-3.5 cursor-pointer border transition-colors shadow-xs ${
                            isSelected
                              ? 'bg-[#f0eded] border-[#b51c00]'
                              : 'bg-[#f6f3f2] border-[#eae7e7] hover:bg-[#f0eded]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="practice_domain"
                            value={domain}
                            checked={isSelected}
                            onChange={(e) => setPracticeDomain(e.target.value)}
                            className="w-4 h-4 accent-[#b51c00]"
                          />
                          <span className="font-title-md text-title-md text-[#1b1b1b] text-sm font-bold">
                            {domain}
                          </span>
                        </label>
                      );
                    })}

                    <label
                      className={`sm:col-span-2 flex items-center gap-3 p-3.5 cursor-pointer border transition-colors shadow-xs ${
                        practiceDomain === 'General Counsel / Retainer Advisory'
                          ? 'bg-[#f0eded] border-[#b51c00]'
                          : 'bg-[#f6f3f2] border-[#eae7e7] hover:bg-[#f0eded]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="practice_domain"
                        value="General Counsel / Retainer Advisory"
                        checked={practiceDomain === 'General Counsel / Retainer Advisory'}
                        onChange={(e) => setPracticeDomain(e.target.value)}
                        className="w-4 h-4 accent-[#b51c00]"
                      />
                      <span className="font-title-md text-title-md text-[#1b1b1b] text-sm font-bold">
                        General Counsel / Retainer Advisory
                      </span>
                    </label>
                  </div>
                </div>

                {/* Matter Brief Note */}
                <div className="space-y-1">
                  <label className="font-label-caps text-label-caps text-[#1b1b1b] uppercase block text-xs">
                    Objective Overview / Brief Outline
                  </label>
                  <textarea
                    className="w-full px-3 py-2.5 bg-white border border-[#e5e2e1] text-[#1b1b1b] font-body-md text-body-md placeholder:text-[#5b5c5c] focus:outline-none focus:border-[#b51c00] shadow-xs text-sm"
                    placeholder="Provide non-confidential context regarding prospective timeline, transaction scale, or desired counsel."
                    rows={3}
                    value={matterSummary}
                    onChange={(e) => setMatterSummary(e.target.value)}
                  />
                </div>

                {/* Submit Triggering Email */}
                <div className="pt-2">
                  <button
                    className="w-full py-4 px-6 bg-[#b51c00] text-white font-title-md text-title-md uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#313030] transition-all shadow-sm cursor-pointer"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                    <span>Prepare &amp; Open Official Email</span>
                  </button>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] text-center text-xs mt-2">
                    Opens directly in Gmail compose addressed to {OFFICIAL_EMAIL}
                  </p>
                </div>
              </form>
            </div>

            {/* Right Side: Live Inspection Preview & Chambers Graphic */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Outgoing Message Preview Box */}
              <div className="bg-[#f0eded] p-6 shadow-sm border border-[#eae7e7]">
                <div className="flex items-center justify-between pb-3 border-b border-[#eae7e7]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#b51c00]"></span>
                    <span className="font-label-caps text-label-caps uppercase text-[#1b1b1b] font-bold tracking-wider text-xs">
                      Outgoing Message Preview
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#5e5e5e] text-[10px]">
                    Standard Encryption
                  </span>
                </div>

                <div className="bg-white p-4 font-body-sm text-body-sm text-[#1b1b1b] space-y-2 shadow-xs border border-[#eae7e7] mt-4">
                  <p className="font-title-md text-title-md text-[#b51c00] font-bold text-sm">
                    Inquiry: {practiceDomain}
                  </p>
                  <p className="text-[#5e5e5e] leading-relaxed italic text-xs">
                    &ldquo;{previewText()}&rdquo;
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[#5e5e5e] font-label-sm text-label-sm text-xs">
                  <span className="material-symbols-outlined text-[#b51c00] text-[18px]">
                    verified
                  </span>
                  <span>Monitored during office operational window</span>
                </div>
              </div>

              {/* Chambers Image Card */}
              <div className="bg-white shadow-md border border-[#eae7e7] overflow-hidden flex flex-col">
                <div className="h-44 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${CHAMBERS_IMG})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <span className="px-3 py-1 bg-[#313030] text-white font-label-caps text-label-caps uppercase tracking-wider text-[10px]">
                      South Jakarta Chambers
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-1">
                  <h3 className="font-title-lg text-title-lg text-[#1b1b1b] uppercase font-bold text-sm">
                    Central Jakarta Legal Desk
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#5e5e5e] text-xs leading-relaxed">
                    Conveniently situated adjacent to prime financial corridors with direct vehicular
                    access for regional corporate delegations and domestic enterprises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED CONTACT CHANNELS */}
      <section className="w-full bg-[#fcf9f8] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-caps text-label-caps text-[#b51c00] uppercase tracking-widest block text-xs font-bold">
                Direct Communications
              </span>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase tracking-tight mt-1 font-bold">
                Contact Channels
              </h2>
            </div>
            <p className="font-body-md text-body-md text-[#5e5e5e] max-w-md">
              Reach our senior advocates directly through established electronic correspondence
              or official chamber presence channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Channel 1: Official Inquiries */}
            <div className="bg-white p-6 shadow-sm border border-[#eae7e7] relative group hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-[#f0eded] flex items-center justify-center mb-4 group-hover:bg-[#b51c00] transition-colors">
                <span className="material-symbols-outlined text-[#b51c00] group-hover:text-white text-[22px]">
                  mail
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase block mb-1 text-[10px]">
                Official Inquiries &amp; Formal Tenders
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] mb-2 font-bold break-words text-lg">
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#b51c00] transition-colors focus:outline-none focus:underline"
                  title="Open pre-filled draft in Gmail"
                >
                  {OFFICIAL_EMAIL}
                </a>
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] mb-6 text-xs leading-relaxed">
                Submit formal RFPs, institutional tender dossiers, cross-border transactional
                documentation, or legal retention requests.
              </p>
              <div className="pt-2 border-t border-[#eae7e7] flex items-center justify-between gap-2 flex-wrap">
                <a
                  className="inline-flex items-center gap-1 font-title-md text-title-md text-[#b51c00] uppercase hover:text-[#1b1b1b] transition-colors text-xs font-bold cursor-pointer"
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open pre-filled draft in Gmail"
                >
                  <span>Draft Official Email</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
                <a
                  className="inline-flex items-center gap-1 font-label-sm text-label-sm text-[#5e5e5e] hover:text-[#b51c00] transition-colors text-[11px] uppercase"
                  href={FALLBACK_MAILTO_URL}
                  title="Open in default mail client (mailto)"
                >
                  <span>Mail App</span>
                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Channel 3 */}
            <div className="bg-white p-6 shadow-sm border border-[#eae7e7] relative group hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-[#f0eded] flex items-center justify-center mb-4 group-hover:bg-[#b51c00] transition-colors">
                <span className="material-symbols-outlined text-[#b51c00] group-hover:text-white text-[22px]">
                  domain
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase block mb-1 text-[10px]">
                Official Chamber Registry
              </span>
              <h3 className="font-title-lg text-title-lg text-[#1b1b1b] mb-2 uppercase font-bold text-base">
                Permata Hijau Desk
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] mb-6 leading-relaxed text-xs">
                Infiniti Office, Bellezza BSA 1st Floor Unit 106, Jl. Letjen Soepeno, Permata Hijau,
                South Jakarta, DKI Jakarta 12210.
              </p>
              <div className="pt-2 border-t border-[#eae7e7]">
                <a
                  className="inline-flex items-center gap-1 font-title-md text-title-md text-[#b51c00] uppercase hover:text-[#1b1b1b] transition-colors text-xs font-bold"
                  href="https://maps.google.com/?q=Bellezza+BSA+Jalan+Letjen+Soepeno+Permata+Hijau+Jakarta"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>View Access Coordinates</span>
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICE LOCATION & CARTOGRAPHIC DETAIL */}
      <section
        id="location-map"
        className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]"
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Map Frame */}
            <div className="lg:col-span-8 shadow-md relative min-h-[360px] lg:min-h-[460px] bg-[#eae7e7] overflow-hidden border border-[#eae7e7]">
              <div
                className="w-full h-full bg-cover bg-center min-h-[360px] lg:min-h-[460px]"
                style={{ backgroundImage: `url(${MAP_IMG})` }}
              ></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 shadow-md border border-[#eae7e7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-[#b51c00] shrink-0"></span>
                  <div>
                    <span className="font-title-md text-title-md uppercase text-[#1b1b1b] block font-bold text-sm">
                      Bellezza BSA — Unit 106
                    </span>
                    <span className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                      South Jakarta Administrative Zone (DKI Jakarta)
                    </span>
                  </div>
                </div>
                <a
                  className="px-4 py-2 bg-[#313030] text-white font-label-md text-label-md uppercase tracking-wider hover:bg-[#b51c00] transition-colors text-xs"
                  href="https://maps.google.com/?q=Bellezza+BSA+Jalan+Letjen+Soepeno+Permata+Hijau+Jakarta"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open Google Maps
                </a>
              </div>
            </div>

            {/* Address & Transit */}
            <div className="lg:col-span-4 bg-white p-8 lg:p-10 shadow-md border border-[#eae7e7] flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="font-label-caps text-label-caps text-[#b51c00] uppercase tracking-widest block text-xs font-bold">
                    Chamber Address
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] uppercase mt-1 font-bold">
                    Official Registered Office
                  </h3>
                </div>

                <div className="p-4 bg-[#f6f3f2] space-y-1 shadow-xs border border-[#eae7e7]">
                  <span className="font-title-md text-title-md text-[#1b1b1b] uppercase block font-bold text-xs">
                    Infiniti Office Bellezza BSA
                  </span>
                  <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed text-xs">
                    1st Floor, Unit 106
                    <br />
                    Jalan Letjen Soepeno, Permata Hijau
                    <br />
                    Grogol Utara, Kebayoran Lama
                    <br />
                    Jakarta Selatan, DKI Jakarta 12210
                    <br />
                    Republic of Indonesia
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#b51c00] text-[20px] shrink-0 mt-0.5">
                      local_parking
                    </span>
                    <div>
                      <span className="font-title-md text-title-md text-[#1b1b1b] block font-bold text-xs">
                        Visitor Parking
                      </span>
                      <span className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                        Basement and designated valet bays available via BSA Main Lobby.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#b51c00] text-[20px] shrink-0 mt-0.5">
                      security
                    </span>
                    <div>
                      <span className="font-title-md text-title-md text-[#1b1b1b] block font-bold text-xs">
                        Access Clearance
                      </span>
                      <span className="font-body-sm text-body-sm text-[#5e5e5e] text-xs">
                        Please present personal ID card at BSA security reception for Unit 106 pass.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 bg-[#f0eded] p-4 border border-[#eae7e7]">
                <span className="font-label-caps text-label-caps text-[#1b1b1b] block uppercase text-[10px] font-bold">
                  Prior Appointment Requisite
                </span>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] mt-1 text-xs">
                  Unscheduled visits cannot be accommodated due to hearing schedules and confidential
                  boardroom sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTATION STANDARDS */}
      <section className="w-full bg-[#fcf9f8] py-20">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <span className="font-label-caps text-label-caps text-[#b51c00] uppercase tracking-widest block text-xs font-bold">
                Client Governance
              </span>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase tracking-tight font-bold">
                Consultation <br />
                Standards
              </h2>
              <p className="font-body-md text-body-md text-[#5e5e5e] leading-relaxed">
                Prior to accepting representations, Eiren Law Office applies rigorous Indonesian
                ethical guidelines and commercial conflict checks.
              </p>
              <div className="pt-2">
                <a
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#313030] text-white font-label-md text-label-md uppercase tracking-wider hover:bg-[#b51c00] transition-colors text-xs"
                  href={createGmailComposeUrl(
                    'Practice Management & Client Intake Inquiry — Eiren Law Office',
                    'Hello Eiren Law Office,\n\nI would like to inquire with your Practice Manager regarding client intake parameters and engagement standards.\n\nThank you.'
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span>Inquire with Practice Manager</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="bg-[#f6f3f2] p-6 shadow-xs border border-[#eae7e7]">
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] uppercase flex items-center justify-between font-bold text-sm">
                  <span>1. Conflict of Interest Check Procedure</span>
                  <span className="material-symbols-outlined text-[#b51c00] text-[20px]">check</span>
                </h3>
                <p className="font-body-md text-body-md text-[#5e5e5e] mt-2 leading-relaxed text-xs">
                  We cross-check all potential client counterparties against active client
                  representations prior to executing any formal engagement agreement or confidential
                  case assessment.
                </p>
              </div>

              <div className="bg-[#f6f3f2] p-6 shadow-xs border border-[#eae7e7]">
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] uppercase flex items-center justify-between font-bold text-sm">
                  <span>2. Non-Disclosure &amp; Privileged Communication</span>
                  <span className="material-symbols-outlined text-[#b51c00] text-[20px]">shield</span>
                </h3>
                <p className="font-body-md text-body-md text-[#5e5e5e] mt-2 leading-relaxed text-xs">
                  All communications directed through our official email desk or intake portals
                  are treated with standard advocate professional secrecy (Undang-Undang Advokat No.
                  18/2003).
                </p>
              </div>

              <div className="bg-[#f6f3f2] p-6 shadow-xs border border-[#eae7e7]">
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] uppercase flex items-center justify-between font-bold text-sm">
                  <span>3. Retainer Models &amp; Transactional Billing</span>
                  <span className="material-symbols-outlined text-[#b51c00] text-[20px]">payments</span>
                </h3>
                <p className="font-body-md text-body-md text-[#5e5e5e] mt-2 leading-relaxed text-xs">
                  We offer structured fee transparency: monthly general corporate retainers, fixed
                  project advisory rates, and capped milestone billing for complex commercial
                  transactions and arbitration proceedings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
