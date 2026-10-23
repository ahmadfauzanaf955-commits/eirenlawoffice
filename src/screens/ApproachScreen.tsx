import React from 'react';
import { createGmailComposeUrl } from '../utils/email';

interface ApproachScreenProps {
  onOpenConsultation: (defaultDomain?: string) => void;
}

export default function ApproachScreen({ onOpenConsultation }: ApproachScreenProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Top Hero Section */}
      <section className="w-full bg-[#fcf9f8] pt-12 pb-16 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[3px] bg-[#b51c00] block"></span>
              <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                Operational Discipline &amp; Delivery Standards
              </span>
            </div>
            <h1 className="font-display-hero text-display-hero text-[#1b1b1b] tracking-tight uppercase font-bold">
              Our Approach
            </h1>
            <p className="font-body-lg text-body-lg text-[#5e5e5e] leading-relaxed">
              We eliminate bureaucratic inertia and theoretical ambiguity in favor of direct partner
              involvement, swift turnaround velocity, and uncompromising commercial clarity.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Stage Execution Methodology */}
      <section className="w-full bg-[#f6f3f2] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 space-y-12">
          <div>
            <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold block mb-1">
              Methodology
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] font-bold uppercase">
              The 4-Stage Operational Sequence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 border border-[#eae7e7] shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-display-hero text-display-hero text-[#b51c00] font-bold block mb-4">
                  01
                </span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-[10px] block mb-1">
                  Phase One
                </span>
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] uppercase font-bold mb-3">
                  Understand
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                  We define the commercial realities, stakeholder dynamics, and business objectives
                  driving the legal matter before proposing legal tactics.
                </p>
              </div>
              <div className="w-full h-1 bg-[#b51c00] mt-8"></div>
            </div>

            <div className="bg-white p-8 border border-[#eae7e7] shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-display-hero text-display-hero text-[#b51c00] font-bold block mb-4">
                  02
                </span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-[10px] block mb-1">
                  Phase Two
                </span>
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] uppercase font-bold mb-3">
                  Review
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                  Surgical analysis of relevant documentation, statutory provisions, judicial trends,
                  and counterpart exposure to isolate genuine liabilities.
                </p>
              </div>
              <div className="w-full h-1 bg-[#eae7e7] mt-8"></div>
            </div>

            <div className="bg-white p-8 border border-[#eae7e7] shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-display-hero text-display-hero text-[#b51c00] font-bold block mb-4">
                  03
                </span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-[10px] block mb-1">
                  Phase Three
                </span>
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] uppercase font-bold mb-3">
                  Advise
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                  Delivering straightforward, commercially reasoned options. We provide clear
                  recommendations instead of passive recitations of statutory text.
                </p>
              </div>
              <div className="w-full h-1 bg-[#eae7e7] mt-8"></div>
            </div>

            <div className="bg-white p-8 border border-[#eae7e7] shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-display-hero text-display-hero text-[#b51c00] font-bold block mb-4">
                  04
                </span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-[10px] block mb-1">
                  Phase Four
                </span>
                <h3 className="font-title-lg text-title-lg text-[#1b1b1b] uppercase font-bold mb-3">
                  Execute
                </h3>
                <p className="font-body-sm text-body-sm text-[#5e5e5e] leading-relaxed text-xs">
                  Drafting, negotiating, filing, or litigating with punctuality and meticulous
                  attention to closing conditions and regulatory deadlines.
                </p>
              </div>
              <div className="w-full h-1 bg-[#b51c00] mt-8"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Fee Structures */}
      <section className="w-full bg-[#fcf9f8] py-20 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 space-y-12">
          <div className="max-w-2xl">
            <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold block mb-1">
              Billing Transparency
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] font-bold uppercase">
              Flexible Engagement Frameworks
            </h2>
            <p className="font-body-md text-body-md text-[#5e5e5e] mt-2 text-sm leading-relaxed">
              We eliminate billable-hour opacity with defined scopes, capped project agreements, and
              structured monthly retainers designed for institutional predictability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-[#eae7e7] shadow-sm relative">
              <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold block mb-1">
                Model 01
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] uppercase font-bold mb-2">
                General Corporate Retainer
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] mb-6 text-xs leading-relaxed">
                Ongoing advisory for enterprises requiring day-to-day contract reviews, corporate
                secretarial support, labor consultation, and general regulatory monitoring.
              </p>
              <ul className="space-y-2 text-xs font-bold text-[#1b1b1b] border-t border-[#eae7e7] pt-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Dedicated partner response SLA</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Predictable monthly expenditure</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Priority access across all practice pillars</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-white border border-[#eae7e7] shadow-sm relative">
              <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold block mb-1">
                Model 02
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] uppercase font-bold mb-2">
                Fixed-Scope Transactional
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] mb-6 text-xs leading-relaxed">
                Targeted due diligence, entity establishment, M&amp;A transaction drafting, or
                specific licensing permits with a fixed transparent budget.
              </p>
              <ul className="space-y-2 text-xs font-bold text-[#1b1b1b] border-t border-[#eae7e7] pt-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Exhaustive written deliverable catalogue</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>No billing surprises or variable overruns</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Clear statutory deadline milestone tracking</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-white border border-[#eae7e7] shadow-sm relative">
              <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold block mb-1">
                Model 03
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#1b1b1b] uppercase font-bold mb-2">
                Milestone-Stage Disputes
              </h3>
              <p className="font-body-sm text-body-sm text-[#5e5e5e] mb-6 text-xs leading-relaxed">
                Structured phased billing for formal legal warning notices (Somasi), settlement deed
                negotiations, and commercial arbitration (BANI) proceedings.
              </p>
              <ul className="space-y-2 text-xs font-bold text-[#1b1b1b] border-t border-[#eae7e7] pt-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Feasibility audit prior to court escalation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Phased drawdowns tied to procedural stages</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#b51c00]"></span>
                  <span>Settlement alignment incentives</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#f0eded] py-20">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 text-center space-y-6">
          <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs font-bold">
            Preliminary Consultation
          </span>
          <h2 className="font-headline-lg text-headline-lg text-[#1b1b1b] uppercase font-bold">
            Discuss Your Engagement Parameters
          </h2>
          <p className="font-body-md text-body-md text-[#5e5e5e] max-w-xl mx-auto text-sm leading-relaxed">
            Contact our practice manager to receive a preliminary engagement outline tailored to
            your corporate structure or transaction timeline.
          </p>
          <div className="pt-2">
            <a
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#b51c00] text-white font-title-md text-title-md uppercase tracking-wider hover:bg-[#313030] transition-colors shadow-sm"
              href={createGmailComposeUrl(
                'Engagement & Counsel Scope Inquiry — Eiren Law Office',
                'Hello Eiren Law Office,\n\nI would like to discuss engagement terms and counsel scope.\n\nPlease let me know the appropriate next steps.\n\nThank you.'
              )}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
              <span>Inquire via Email</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
