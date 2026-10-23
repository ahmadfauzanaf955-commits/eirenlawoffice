import React, { useState } from 'react';

// Official Eiren Law Office image asset provided by user
const OFFICIAL_IMAGE_URL = 'https://i.imgur.com/frpKNcG.png';
const OFFICIAL_FALLBACK_URL = '/official_logo.png';

interface EirenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function EirenLogo({
  className = '',
  size = 'md',
  showSubtitle = true,
}: EirenLogoProps) {
  const [currentSrc, setCurrentSrc] = useState(OFFICIAL_IMAGE_URL);

  const imageWidthClass =
    size === 'sm'
      ? 'w-[150px] sm:w-[170px]'
      : size === 'lg'
        ? 'w-[220px] sm:w-[260px] md:w-[290px]'
        : 'w-[180px] sm:w-[210px] md:w-[230px]';

  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 select-none ${className}`}>
      {/* Official photo from https://i.imgur.com/frpKNcG.png, adjusted with aspect ratio preservation */}
      <img
        src={currentSrc}
        alt="Eiren Law Office logo"
        onError={() => setCurrentSrc(OFFICIAL_FALLBACK_URL)}
        className={`${imageWidthClass} h-auto object-contain shrink-0 transition-opacity duration-150 hover:opacity-90 block`}
        loading="eager"
      />

      {/* Wordmark: "LAW OFFICE" maintained right beside the logo */}
      {showSubtitle && (
        <div className="flex items-center leading-none pl-0.5">
          <span
            className={`font-sans font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#1b1b1b] uppercase ${
              size === 'sm'
                ? 'text-xs sm:text-sm'
                : size === 'lg'
                  ? 'text-base sm:text-lg'
                  : 'text-sm sm:text-base'
            }`}
          >
            LAW OFFICE
          </span>
        </div>
      )}
    </div>
  );
}
