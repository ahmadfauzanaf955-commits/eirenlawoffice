import React from 'react';
import { createGmailComposeUrl, INQUIRY_TEMPLATES } from '../utils/email';

export default function FloatingWhatsApp() {
  const composeUrl = createGmailComposeUrl(
    INQUIRY_TEMPLATES.general.subject,
    INQUIRY_TEMPLATES.general.body
  );

  return (
    <aside className="fixed bottom-6 right-6 z-40 group flex items-center">
      <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-3 px-3 py-1.5 bg-[#313030] text-[#f3f0ef] font-label-sm text-label-sm uppercase tracking-wider shadow-[0_1px_8px_rgba(0,0,0,0.1)] whitespace-nowrap text-xs">
        Direct Legal Inquiry via Email
      </div>
      <a
        aria-label="Draft official legal inquiry to Eiren Law Office via Gmail"
        className="flex items-center justify-center w-14 h-14 bg-[#b51c00] text-white shadow-[0_2px_12px_rgba(181,28,0,0.35)] hover:bg-[#313030] transition-colors duration-150 rounded-none cursor-pointer group-hover:scale-105 transition-transform"
        href={composeUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="material-symbols-outlined text-[28px]">mail</span>
      </a>
    </aside>
  );
}

