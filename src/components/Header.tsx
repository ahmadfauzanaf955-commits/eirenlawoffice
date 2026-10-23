import React, { useState } from 'react';
import { NavigationTab } from '../types';
// Reusable Header Component
interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenConsultation: () => void;
}

export default function Header({
  currentTab,
  onNavigate,
  onOpenConsultation,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about-us', label: 'About Us' },
    { id: 'practice-areas', label: 'Practice Areas' },
    { id: 'industries', label: 'Industries' },
    { id: 'our-approach', label: 'Our Approach' },
    { id: 'insights', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcf9f8]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eae7e7]">
      <div className="h-20 w-full px-6 lg:px-16 flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Brand Lockup: Single official image element */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left cursor-pointer focus:outline-none flex items-center shrink-0"
          aria-label="Eiren Law Office Home"
        >
          <img
            src="https://i.imgur.com/frpKNcG.png"
            alt="Eiren Law Office logo"
            className="w-[200px] sm:w-[230px] lg:w-[290px] max-w-[55vw] sm:max-w-none h-auto object-contain block transition-opacity duration-150 hover:opacity-90"
            loading="eager"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== window.location.origin + '/official_logo.png') {
                target.src = '/official_logo.png';
              }
            }}
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8 2xl:gap-10">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 font-label-md text-label-md uppercase tracking-wider transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-[#1b1b1b] font-bold after:w-full'
                    : 'text-[#5e5e5e] hover:text-[#1b1b1b] after:w-0'
                } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#b51c00] after:transition-all after:duration-200 hover:after:w-full`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Group */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#b51c00] text-white font-label-md text-label-md uppercase tracking-wider hover:bg-[#313030] transition-colors duration-150 cursor-pointer shadow-sm active:translate-y-0.5"
          >
            Discuss Your Legal Needs
          </button>

          {/* Quick Partner Profile Indicator */}
          <button
            onClick={onOpenConsultation}
            title="Duty Counsel Contact"
            className="w-8 h-8 rounded-full bg-[#b51c00] flex items-center justify-center hover:bg-[#313030] transition-colors cursor-pointer text-white shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#1b1b1b] hover:text-[#b51c00] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fcf9f8] border-b border-[#eae7e7] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 px-3 uppercase tracking-wider font-label-md text-label-md transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#f0eded] text-[#b51c00] font-bold border-l-2 border-[#b51c00]'
                      : 'text-[#5e5e5e] hover:bg-[#f6f3f2] hover:text-[#1b1b1b]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-[#b51c00] rounded-full"></span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-[#eae7e7]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 bg-[#b51c00] text-white font-label-md uppercase tracking-wider text-center block hover:bg-[#313030] transition-colors shadow-sm"
              >
                Discuss Your Legal Needs
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
