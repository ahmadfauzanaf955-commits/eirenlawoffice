import React from 'react';
import { NavigationTab } from '../types';
import EirenLogo from './EirenLogo';
import {
  OFFICIAL_EMAIL,
  createGmailComposeUrl,
  INQUIRY_TEMPLATES,
} from '../utils/email';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenLegalModal: (type: 'disclaimer' | 'privacy' | 'terms') => void;
}

export default function Footer({ onNavigate, onOpenLegalModal }: FooterProps) {
  const handleNav = (tab: NavigationTab) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#f6f3f2] border-t border-[#eae7e7]">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-4">
              <button
                onClick={() => handleNav('home')}
                className="text-left cursor-pointer focus:outline-none"
              >
                <EirenLogo />
              </button>
              <p className="font-body-md text-body-md text-[#5e5e5e] max-w-sm">
                Clear counsel. Commercial judgment. Reliable execution.
              </p>
              <div className="pt-2">
                <span className="inline-block font-label-caps text-label-caps text-[#5f3f38] bg-[#f0eded] px-3 py-1.5 uppercase tracking-wider">
                  Advocates &amp; Legal Consultants
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-label-caps text-label-caps text-[#1b1b1b] uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { tab: 'home' as NavigationTab, label: 'Home' },
                { tab: 'about-us' as NavigationTab, label: 'About Us' },
                { tab: 'practice-areas' as NavigationTab, label: 'Practice Areas' },
                { tab: 'industries' as NavigationTab, label: 'Industries' },
                { tab: 'our-approach' as NavigationTab, label: 'Our Approach' },
                { tab: 'insights' as NavigationTab, label: 'Insights' },
                { tab: 'contact' as NavigationTab, label: 'Contact' },
              ].map((item) => (
                <li key={item.tab} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#b51c00] inline-block shrink-0"></span>
                  <button
                    onClick={() => handleNav(item.tab)}
                    className="font-body-sm text-body-sm text-[#5e5e5e] hover:text-[#1b1b1b] transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Practice Domains */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-label-caps text-label-caps text-[#1b1b1b] uppercase tracking-wider">
              Practice Domains
            </h3>
            <ul className="space-y-2">
              {[
                'Corporate & M&A',
                'Commercial Litigation & Dispute',
                'Banking & Project Finance',
                'Foreign Direct Investment',
                'Employment & Labor Relations',
                'Restructuring & Insolvency',
              ].map((name) => (
                <li key={name} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#b51c00] inline-block shrink-0"></span>
                  <button
                    onClick={() => handleNav('practice-areas')}
                    className="font-body-sm text-body-sm text-[#5e5e5e] hover:text-[#1b1b1b] transition-colors cursor-pointer text-left"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Office & Channels */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-label-caps text-label-caps text-[#1b1b1b] uppercase tracking-wider">
              Verified Office
            </h3>
            <div className="space-y-3 font-body-sm text-body-sm text-[#5e5e5e]">
              <div>
                <span className="font-label-caps text-label-caps block text-[#1b1b1b] uppercase">
                  Address
                </span>
                <p className="mt-1 text-[#5f3f38] font-bold">
                  Infiniti Office, Bellezza BSA 1st Floor Unit 106
                </p>
                <p className="text-xs text-[#5e5e5e] mt-0.5">
                  Jl. Letjen Soepeno, Permata Hijau, South Jakarta, DKI Jakarta
                </p>
              </div>
              <div>
                <span className="font-label-caps text-label-caps block text-[#1b1b1b] uppercase">
                  Official Inquiries (Email)
                </span>
                <a
                  className="mt-1 block text-[#b51c00] hover:text-[#1b1b1b] transition-colors font-bold"
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

        {/* Legal Links & Copyright */}
        <div className="mt-12 pt-6 border-t border-[#eae7e7] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-body-sm text-body-sm text-[#5e5e5e]">
            © 2025 Eiren Law Office. All rights reserved. Registered Advocates &amp; Legal Consultants.
          </p>
          <div className="flex items-center gap-6 font-label-caps text-label-caps text-[#5e5e5e]">
            <button
              onClick={() => onOpenLegalModal('disclaimer')}
              className="hover:text-[#1b1b1b] transition-colors cursor-pointer uppercase"
            >
              Legal Disclaimer
            </button>
            <button
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-[#1b1b1b] transition-colors cursor-pointer uppercase"
            >
              Client Data Notice
            </button>
            <button
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-[#1b1b1b] transition-colors cursor-pointer uppercase"
            >
              Terms of Engagement
            </button>
            <span className="text-[#d8d5d4]">•</span>
            <button
              onClick={() => {
                window.location.hash = 'admin';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#b51c00] transition-colors cursor-pointer uppercase text-[10px] text-[#8c8c8c]"
            >
              Editorial CMS
            </button>
          </div>
        </div>

        {/* Regulatory Statutory Disclaimer Notice */}
        <div className="mt-6 p-4 bg-[#f0eded]">
          <p className="font-body-sm text-body-sm text-[#5f3f38] leading-relaxed">
            Disclaimer: The information provided on this platform does not, and is not intended to,
            constitute formal legal advice. All content, materials, and references are for general
            informational purposes only. Prior results do not guarantee a similar outcome. Receipt of
            information or communication via this portal does not establish an attorney-client relationship
            with Eiren Law Office.
          </p>
        </div>

        {/* Website Developer Credit */}
        <div className="mt-6 pt-2 text-center">
          <p className="text-[11px] sm:text-[12px] text-[#888888] font-sans tracking-normal">
            Website crafted by{' '}
            <a
              href="https://wms.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-[#5e5e5e] transition-colors focus:outline-none focus:underline"
            >
              wms.tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
