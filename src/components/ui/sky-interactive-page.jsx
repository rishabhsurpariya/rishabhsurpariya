import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './sky-interactive-page.css';

// --- Walter Mitty banner geometry constants ---
const BANNER_TEXT =
  'To see the world, things dangerous to come to, to see behind walls, draw closer, to find each other, and to feel. That is the purpose of life';
const BANNER_WIDTH = 5055;
const BANNER_HEIGHT = 270;
const TOP_OFFSET = 70;
const BOTTOM_OFFSET = 215;
const TEXT_Y = 168;
const WAVE_AMPLITUDE = 34;
const FISHTAIL_INSET = 150;
const NUM_SEGMENTS = 60;
const NUM_FRAMES = 12;
const CYCLE_DURATION = 2.4;

function calcWaveY(x, baseY, phase) {
  return baseY + WAVE_AMPLITUDE * Math.sin((2 * Math.PI * x) / BANNER_WIDTH - phase);
}

function generateBannerClothPath(phase) {
  const points = [];
  for (let i = 0; i <= NUM_SEGMENTS; i++) {
    const x = Math.round((BANNER_WIDTH * i) / NUM_SEGMENTS);
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${calcWaveY(x, TOP_OFFSET, phase).toFixed(1)}`);
  }
  points.push(
    `L ${BANNER_WIDTH - FISHTAIL_INSET} ${calcWaveY(
      BANNER_WIDTH - FISHTAIL_INSET,
      (TOP_OFFSET + BOTTOM_OFFSET) / 2,
      phase
    ).toFixed(1)}`
  );
  for (let i = NUM_SEGMENTS; i >= 0; i--) {
    const x = Math.round((BANNER_WIDTH * i) / NUM_SEGMENTS);
    points.push(`L ${x} ${calcWaveY(x, BOTTOM_OFFSET, phase).toFixed(1)}`);
  }
  return points.join(' ') + ' Z';
}

function generateTextPath(phase) {
  const points = [];
  for (let i = 0; i <= NUM_SEGMENTS; i++) {
    const x = Math.round((BANNER_WIDTH * i) / NUM_SEGMENTS);
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${calcWaveY(x, TEXT_Y, phase).toFixed(1)}`);
  }
  return points.join(' ');
}

// Precomputed wave frames for smooth SVG cloth morph
const PHASES = Array.from({ length: NUM_FRAMES + 1 }, (_, i) => (2 * Math.PI * i) / NUM_FRAMES);
const CLOTH_VALUES = PHASES.map(generateBannerClothPath).join(';');
const TEXT_VALUES = PHASES.map(generateTextPath).join(';');
const INITIAL_CLOTH_PATH = generateBannerClothPath(0);
const INITIAL_TEXT_PATH = generateTextPath(0);

// --- Center statements data for Rishabh Surpariya ---
const SUBNAV_TABS = [
  'WHO I AM',
  'WHAT I CARE ABOUT',
  'WHAT I BELIEVE IN',
  'WHAT I WORK WITH',
  "WHAT I'M UPTO",
];

const STATEMENTS = [
  {
    lines: [
      'My name is *Rishabh Surpariya*',
      'and I am an *AI Engineer & Full-Stack Developer*',
      'currently building intelligent systems.',
    ],
  },
  {
    lines: [
      'Making everyday *technology simple* so',
      'you can walk your dog.',
    ],
  },
  {
    lines: [
      "Good engineering *doesn't scream* for attention,",
      'it just works—*quietly, reliably, and effectively*.',
    ],
  },
  {
    lines: [
      'Designing and shipping *AI agents*, staged LLM pipelines,',
      'FastAPI & Next.js backends,',
      'and systems built to handle *real-world scale*.',
    ],
  },
  {
    lines: [
      'Taking deep breaths,',
      'making space for *AI in everyday life*,',
      '& hunting for next moonshot of a *team*.',
    ],
  },
];

// --- Floating crafts (balloons / lanterns) configuration ---
const CRAFTS_CONFIG = [
  {
    id: 1,
    left: '12%',
    width: 62,
    lanternWidth: 28,
    balloonImg: '/page2/baloon.webp',
    duration: 58,
    delay: -10,
    sway: 36,
    swayDuration: 18,
    swayDelay: -4,
    tilt: 2.8,
    wobbleDuration: 6.2,
    tag: 'TripAi',
    category: 'FEATURED PROJECT',
    title: 'TripAi: AI Trip Planner',
    note: 'Staged Gemini LLM pipeline, Next.js & Supabase.',
    actionLabel: 'View Live App ↗',
    actionType: 'external',
    target: 'https://trip-ai-pied.vercel.app/',
  },
  {
    id: 2,
    left: '30%',
    width: 36,
    lanternWidth: 20,
    balloonImg: '/page2/balloon-2.webp',
    duration: 68,
    delay: -32,
    sway: 20,
    swayDuration: 22,
    swayDelay: -8,
    tilt: 2.2,
    wobbleDuration: 5.8,
    tag: 'About Me',
    category: 'BACKGROUND',
    title: 'Rishabh Surpariya',
    note: 'AI Engineer studying at Silver Oak University.',
    actionLabel: 'Jump to Story ↓',
    actionType: 'scroll',
    target: '#about',
  },
  {
    id: 3,
    left: '52%',
    width: 50,
    lanternWidth: 26,
    balloonImg: '/page2/balloon-3.webp',
    duration: 52,
    delay: -16,
    sway: 30,
    swayDuration: 17,
    swayDelay: -5,
    tilt: 3.2,
    wobbleDuration: 6.8,
    tag: 'Intro Call',
    category: 'SCHEDULE',
    title: 'Let’s Have a Chat',
    note: 'Pick a slot for a 30-min Google Meet session.',
    actionLabel: 'Book 1:1 Call →',
    actionType: 'modal-booking',
    target: null,
  },
  {
    id: 4,
    left: '72%',
    width: 30,
    lanternWidth: 18,
    balloonImg: '/page2/balloon-2.webp',
    duration: 64,
    delay: -42,
    sway: 16,
    swayDuration: 21,
    swayDelay: -11,
    tilt: 2.0,
    wobbleDuration: 5.4,
    tag: 'Resume.pdf',
    category: 'CREDENTIALS',
    title: 'Download Resume',
    note: 'Updated with latest projects & experiences.',
    actionLabel: 'Open Resume Overlay →',
    actionType: 'modal-resume',
    target: null,
  },
  {
    id: 5,
    left: '82%',
    width: 44,
    lanternWidth: 24,
    balloonImg: '/page2/baloon.webp',
    duration: 60,
    delay: -25,
    sway: 28,
    swayDuration: 19,
    swayDelay: -7,
    tilt: 2.6,
    wobbleDuration: 6.4,
    tag: 'mAInu',
    category: 'FULL-STACK PLATFORM',
    title: 'mAInu Digital Menu',
    note: 'AI OCR menu digitization & table-side payments.',
    actionLabel: 'Explore Project ↓',
    actionType: 'scroll',
    target: '#projects',
  },
];

// Shooting stars configuration for Night mode
const SHOOTING_STARS = [
  { top: '12%', left: '8%', delay: 0, duration: 6.8 },
  { top: '24%', left: '38%', delay: 2.2, duration: 7.8 },
  { top: '8%', left: '60%', delay: 4.1, duration: 7.2 },
  { top: '20%', left: '78%', delay: 1.5, duration: 8.5 },
  { top: '38%', left: '16%', delay: 5.0, duration: 7.5 },
  { top: '32%', left: '62%', delay: 3.3, duration: 6.9 },
];

export function SkyInteractivePage({ onOpenResume, onOpenBooking }) {
  // Mode: 'day' | 'sunset' | 'night'
  const [theme, setTheme] = useState('day');
  const [isAuto, setIsAuto] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCraftId, setHoveredCraftId] = useState(null);

  // Auto mode handler: calculates theme based on current local hour or OS theme
  const getAutoTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'sunset';
    return 'night';
  };

  useEffect(() => {
    if (isAuto) {
      setTheme(getAutoTheme());
    }
  }, [isAuto]);

  const handleSelectMode = (mode) => {
    setIsAuto(false);
    setTheme(mode);
  };

  const handleToggleAuto = () => {
    const nextAuto = !isAuto;
    setIsAuto(nextAuto);
    if (nextAuto) {
      setTheme(getAutoTheme());
    }
  };

  const handleCraftAction = (craft) => {
    if (craft.actionType === 'modal-resume' && onOpenResume) {
      onOpenResume();
    } else if (craft.actionType === 'modal-booking' && onOpenBooking) {
      onOpenBooking();
    } else if (craft.actionType === 'scroll' && craft.target) {
      const el = document.querySelector(craft.target);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -40, duration: 1.4 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (craft.actionType === 'external' && craft.target) {
      window.open(craft.target, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="sky-page-section" data-theme={theme} id="sky-interactive">
      {/* ── Layered Backgrounds ── */}
      <div className="sky-bg-layer sky-bg-day" aria-hidden="true" />
      <div className="sky-bg-layer sky-bg-sunset" aria-hidden="true" />
      <div className="sky-bg-layer sky-bg-night" aria-hidden="true" />
      <div className="sky-vignette" aria-hidden="true" />

      {/* ── Shooting Stars (Night Mode) ── */}
      <div className="shooting-stars-layer" aria-hidden="true">
        {SHOOTING_STARS.map((star, idx) => (
          <span
            key={idx}
            className="shooting-star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ── Airplane with Waving Trailing Banner ── */}
      <div className="airplane-track" aria-hidden="true">
        <div className="airplane-flight-path">
          <div className="airplane-spiral-wrap">
            <img
              src="/page2/banner-plane.png"
              alt="Airplane"
              className="airplane-img"
            />
            <div className="airplane-banner-wrap">
              <svg
                className="airplane-banner-svg"
                viewBox={`0 0 ${BANNER_WIDTH} ${BANNER_HEIGHT}`}
              >
                <defs>
                  <linearGradient id="plane-banner-cloth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#F8DA45" />
                    <stop offset="1" stopColor="#EFC81F" />
                  </linearGradient>
                  <path id="plane-banner-text-path" d={INITIAL_TEXT_PATH}>
                    <animate
                      attributeName="d"
                      dur={`${CYCLE_DURATION}s`}
                      repeatCount="indefinite"
                      values={TEXT_VALUES}
                    />
                  </path>
                </defs>
                <path fill="url(#plane-banner-cloth)" d={INITIAL_CLOTH_PATH}>
                  <animate
                    attributeName="d"
                    dur={`${CYCLE_DURATION}s`}
                    repeatCount="indefinite"
                    values={CLOTH_VALUES}
                  />
                </path>
                <text
                  fontFamily="'Outfit', -apple-system, sans-serif"
                  fontWeight="700"
                  fontSize="70"
                  fill="#2e2a18"
                >
                  <textPath
                    href="#plane-banner-text-path"
                    startOffset="130"
                    textLength={BANNER_WIDTH - 550}
                    lengthAdjust="spacingAndGlyphs"
                  >
                    {BANNER_TEXT}
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hot Air Balloons (Day/Sunset) & Sky Lanterns (Night) ── */}
      <div className="balloon-sky-layer">
        {CRAFTS_CONFIG.map((craft) => {
          const isHovered = hoveredCraftId === craft.id;
          const alignClass = parseInt(craft.left) > 60 ? 'align-left' : 'align-right';

          return (
            <div
              key={craft.id}
              className="floating-craft-container"
              style={{
                left: craft.left,
                width: theme === 'night' ? `${craft.lanternWidth}px` : `${craft.width}px`,
                animationDuration: `${craft.duration}s`,
                animationDelay: `${craft.delay}s`,
              }}
            >
              <div
                className="floating-craft-sway"
                style={{
                  '--sway': `${craft.sway}px`,
                  animationDuration: `${craft.swayDuration}s`,
                  animationDelay: `${craft.swayDelay}s`,
                }}
              >
                <div
                  className="floating-craft-wobble"
                  style={{
                    '--tilt': `${craft.tilt}deg`,
                    animationDuration: `${craft.wobbleDuration}s`,
                  }}
                  onMouseEnter={() => setHoveredCraftId(craft.id)}
                  onMouseLeave={() => setHoveredCraftId(null)}
                >
                  {/* Visual art: balloon for day/sunset, lantern for night */}
                  {theme === 'night' ? (
                    <img
                      src="/page2/lantern.png"
                      alt="Lantern"
                      className="craft-art craft-lantern-img"
                    />
                  ) : (
                    <img
                      src={craft.balloonImg || '/page2/baloon.webp'}
                      alt="Hot air balloon"
                      className="craft-art craft-balloon-img"
                    />
                  )}

                  {/* Text line carried with the balloon */}
                  <span className="craft-tag-label">{craft.tag}</span>

                  {/* Hover detail card popover */}
                  {isHovered && (
                    <div className={`craft-popover-card ${alignClass}`}>
                      <div className="craft-card-dash" />
                      <div
                        className="craft-card-panel"
                        onClick={() => handleCraftAction(craft)}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="craft-card-category">{craft.category}</span>
                        <h4 className="craft-card-title">{craft.title}</h4>
                        <p className="craft-card-note">{craft.note}</p>
                        <span className="craft-card-action">{craft.actionLabel}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Center Content: Sub-Nav Tabs & Typewriter Statements ── */}
      <div className="sky-center-content">
        {/* Sub-nav tabs */}
        <nav className="sky-subnav-tabs" aria-label="Statement Navigation">
          {SUBNAV_TABS.map((tab, idx) => (
            <button
              key={tab}
              type="button"
              className={`sky-tab-btn ${activeTab === idx ? 'is-active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Dynamic typewriter / monospace statement text */}
        <div className="sky-statement-box">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="sky-statement-text">
                {STATEMENTS[activeTab].lines.map((line, lIdx) => (
                  <span key={lIdx} style={{ display: 'block' }}>
                    {line.split('*').map((part, pIdx) => {
                      // Odd indices were inside *asterisks*
                      if (pIdx % 2 === 1) {
                        return <strong key={pIdx}>{part}</strong>;
                      }
                      return <span key={pIdx}>{part}</span>;
                    })}
                  </span>
                ))}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right-Side Theme Rail (Sun / Sunset / Moon / Auto) ── */}
      <aside className="sky-theme-rail" aria-label="Atmosphere Theme Selector">
        {/* Sun (Day) */}
        <button
          type="button"
          className={`theme-rail-btn ${!isAuto && theme === 'day' ? 'is-active' : ''}`}
          onClick={() => handleSelectMode('day')}
          title="Day Mode"
          aria-label="Day Mode"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>

        {/* Sunset */}
        <button
          type="button"
          className={`theme-rail-btn ${!isAuto && theme === 'sunset' ? 'is-active' : ''}`}
          onClick={() => handleSelectMode('sunset')}
          title="Sunset Mode"
          aria-label="Sunset Mode"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 18a5 5 0 0 0-10 0" />
            <line x1="12" y1="9" x2="12" y2="2" />
            <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
            <line x1="1" y1="18" x2="3" y2="18" />
            <line x1="21" y1="18" x2="23" y2="18" />
            <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
            <line x1="23" y1="22" x2="1" y2="22" />
            <polyline points="16 5 12 9 8 5" />
          </svg>
        </button>

        {/* Moon (Night) */}
        <button
          type="button"
          className={`theme-rail-btn ${!isAuto && theme === 'night' ? 'is-active' : ''}`}
          onClick={() => handleSelectMode('night')}
          title="Night Mode"
          aria-label="Night Mode"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <span className="theme-rail-divider" aria-hidden="true" />

        {/* AUTO Mode */}
        <button
          type="button"
          className={`theme-rail-auto-btn ${isAuto ? 'is-active' : ''}`}
          onClick={handleToggleAuto}
          title="Auto Theme (syncs with current hour)"
          aria-label="Auto Theme"
        >
          AUTO
        </button>
      </aside>
    </section>
  );
}

