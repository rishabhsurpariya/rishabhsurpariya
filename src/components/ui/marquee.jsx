import React from 'react';

export function Marquee({ children, speed = 40, className = '' }) {
  return (
    <div className={`marquee-root ${className}`}>
      <div className="marquee-track" style={{ '--marquee-speed': `${speed}s` }}>
        <div className="marquee-content" aria-hidden="false">
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="marquee-content" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Marquee;
