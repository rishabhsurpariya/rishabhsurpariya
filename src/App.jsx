import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, PenTool, User, Phone } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { MarqueeDemo } from './components/ui/logo-marquee';
import { ElasticGallery } from './components/ui/elastic-gallery';
import { WorksWheel } from './components/ui/works-wheel';
import { ExperienceTimeline } from './components/ui/experience-timeline';
import { ConnectShowcase } from './components/ui/connect-showcase';
import { FooterCTA } from './components/ui/footer-cta';
import { BookingModal } from './components/ui/booking-modal';
import StackIcon from 'tech-stack-icons';
import './index.css';

const WORKS_ITEMS = [
  {
    title: "AI Engineer Portfolio",
    image: "/moreworks_media/Screenshot 2026-10-11 124403.png",
    href: "#",
  },
  {
    title: "mAInu Digital Menu",
    image: "/moreworks_media/food menu.png",
    href: "#",
  },
  {
    title: "mAInu Dashboard",
    image: "/moreworks_media/mAInu dasshboard.png",
    href: "#",
  },
  {
    title: "mAInu Mobile App",
    image: "/mAInu_project/mAInu.png",
    href: "#",
  },
  {
    title: "Huddle Social Platform",
    image: "/moreworks_media/chatgpt1.png",
    href: "#",
  },
  {
    title: "Huddle Groups & Collab",
    image: "/huddle/chatgpt2.png",
    href: "#",
  },
  {
    title: "Huddle Professional Network",
    image: "/huddle/chatgpt3.png",
    href: "#",
  },
  {
    title: "Huddle Student Community",
    image: "/huddle/chatgpt4.png",
    href: "#",
  },
  {
    title: "mAInu Smart Ordering",
    image: "/mAInu_project/food menu.png",
    href: "#",
  },
];

function HeroSocialExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);
  const leaveTimerRef = useRef(null);

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/rishabhsurpariya',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:rishabhsurpariya@gmail.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/rishabhsurpariya',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/ishabh.r_18',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="hero-social-expandable-wrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-social-expandable">
        <motion.div
          className="hero-social-icons-tray"
          initial={false}
          animate={{
            width: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="hero-social-icons-inner">
            {socials.map((s, idx) => (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-btn"
                aria-label={s.name}
                tabIndex={isExpanded ? 0 : -1}
                animate={{
                  scale: isExpanded ? 1 : 0.6,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{
                  duration: isExpanded ? 0.28 : 0.18,
                  delay: isExpanded ? idx * 0.04 : (socials.length - 1 - idx) * 0.02,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* The Toggle Plus Button */}
        <button
          type="button"
          className="hero-social-toggle-btn"
          aria-label={isExpanded ? "Close socials" : "Expand socials"}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </motion.svg>
        </button>
      </div>
    </div>
  );
}



function AnimatedHeroTitle() {
  const lines = [
    "HEY, I'M RISHABH.",
    "AI Engineer"
  ];

  let cumulativeOffset = 0;

  return (
    <h1 className="title" aria-label="HEY, I'M RISHABH. AI ENGINEER">
      {lines.map((line, lineIdx) => {
        const words = line.split(' ');
        const lineStartOffset = cumulativeOffset;
        cumulativeOffset += line.length + 1;

        let charInLineOffset = 0;

        return (
          <span key={lineIdx} className="title-line">
            {words.map((word, wordIdx) => {
              const chars = word.split('');
              const currentWordOffset = lineStartOffset + charInLineOffset;
              charInLineOffset += chars.length + 1;

              const isEngineer = word.toLowerCase() === 'engineer';

              return (
                <span
                  key={wordIdx}
                  className={`title-word-wrapper ${isEngineer ? 'title-word-wrapper--engineer' : ''}`}
                >
                  <span className={`title-word ${isEngineer ? 'title-word--engineer' : ''}`}>
                    {chars.map((char, charIdx) => {
                      const totalIndex = currentWordOffset + charIdx;
                      return (
                        <motion.span
                          key={charIdx}
                          className="title-char"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.18,
                            delay: 0.08 + totalIndex * 0.022,
                            ease: 'easeOut',
                          }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                  {wordIdx < words.length - 1 && (
                    <span className="title-space">&nbsp;</span>
                  )}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

function AnimatedKnowMeTitle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const segments = [
    { text: "Know me", className: "know-me-dark" },
    { text: "better", className: "know-me-gray" }
  ];

  let globalCharIndex = 0;

  return (
    <h2 ref={ref} className="know-me-heading" aria-label="Know me better">
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(" ");
        return (
          <span key={segIdx} className={segment.className}>
            {words.map((word, wordIdx) => {
              const chars = word.split("");
              const currentOffset = globalCharIndex;
              globalCharIndex += chars.length + 1;

              return (
                <span key={wordIdx} className="title-word-wrapper">
                  <span className="title-word">
                    {chars.map((char, charIdx) => {
                      const totalIndex = currentOffset + charIdx;
                      return (
                        <motion.span
                          key={charIdx}
                          className="title-char"
                          initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
                          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 22, filter: 'blur(4px)' }}
                          transition={{
                            duration: 0.38,
                            delay: totalIndex * 0.035,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                  {wordIdx < words.length - 1 && (
                    <span className="title-space">&nbsp;</span>
                  )}
                </span>
              );
            })}
            {segIdx < segments.length - 1 && (
              <span className="title-space">&nbsp;</span>
            )}
          </span>
        );
      })}
    </h2>
  );
}

function AnimatedSelectedWorksTitle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const selectedChars = "Selected".split("");
  const worksChars = "works".split("");

  return (
    <h2 ref={ref} className="projects-title" aria-label="Selected works">
      <span className="projects-selected">
        <span className="title-word">
          {selectedChars.map((char, idx) => (
            <motion.span
              key={idx}
              className="title-char"
              initial={{ opacity: 0, y: 26, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 26, filter: 'blur(4px)' }}
              transition={{
                duration: 0.4,
                delay: idx * 0.038,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </span>

      <span className="projects-works">
        <span className="title-word">
          {worksChars.map((char, idx) => {
            const isW = idx === 0;
            const charDelay = 0.36 + idx * 0.045;

            return (
              <motion.span
                key={idx}
                className="title-char"
                initial={{ opacity: 0, y: 26, filter: 'blur(4px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 26, filter: 'blur(4px)' }}
                transition={{
                  duration: 0.4,
                  delay: charDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {isW ? <span className="works-w">{char}</span> : char}
              </motion.span>
            );
          })}
        </span>
      </span>
    </h2>
  );
}

function AnimatedMoreWorksTitle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const moreChars = "More".split("");
  const worksChars = "works".split("");

  return (
    <h2 ref={ref} className="projects-title" aria-label="More works">
      <span className="projects-selected">
        <span className="title-word">
          {moreChars.map((char, idx) => (
            <motion.span
              key={idx}
              className="title-char"
              initial={{ opacity: 0, y: 26, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 26, filter: 'blur(4px)' }}
              transition={{
                duration: 0.4,
                delay: idx * 0.038,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </span>

      <span className="projects-works">
        <span className="title-word">
          {worksChars.map((char, idx) => {
            const isW = idx === 0;
            const charDelay = 0.2 + idx * 0.045;

            return (
              <motion.span
                key={idx}
                className="title-char"
                initial={{ opacity: 0, y: 26, filter: 'blur(4px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 26, filter: 'blur(4px)' }}
                transition={{
                  duration: 0.4,
                  delay: charDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {isW ? <span className="works-w">{char}</span> : char}
              </motion.span>
            );
          })}
        </span>
      </span>
    </h2>
  );
}

function AnimatedExperienceTitle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const chars = "EXPERIENCE".split("");

  return (
    <h2 ref={ref} className="projects-title" aria-label="EXPERIENCE">
      <span className="projects-works">
        <span className="title-word">
          {chars.map((char, idx) => (
            <motion.span
              key={idx}
              className="title-char"
              initial={{ opacity: 0, y: 26, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 26, filter: 'blur(4px)' }}
              transition={{
                duration: 0.4,
                delay: idx * 0.038,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </span>
    </h2>
  );
}

function AnimatedProjectTitle({ text }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  const wordEntries = useMemo(() => {
    const rawWords = text.split(" ");
    const entries = [];
    let offset = 0;
    for (let i = 0; i < rawWords.length; i++) {
      entries.push({ word: rawWords[i], offset });
      offset += rawWords[i].length + 1;
    }
    return entries;
  }, [text]);

  return (
    <h3 ref={ref} className="project-title" aria-label={text}>
      {wordEntries.map(({ word, offset: wordOffset }, wordIdx) => {
        const chars = word.split("");

        return (
          <span key={wordIdx} className="title-word-wrapper">
            <span className="title-word">
              {chars.map((char, charIdx) => {
                const totalIndex = wordOffset + charIdx;
                return (
                  <motion.span
                    key={charIdx}
                    className="title-char"
                    initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 16, filter: 'blur(3px)' }}
                    transition={{
                      duration: 0.35,
                      delay: totalIndex * 0.016,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
            {wordIdx < wordEntries.length - 1 && (
              <span className="title-space">&nbsp;</span>
            )}
          </span>
        );
      })}
    </h3>
  );
}

const PROJECT_TECH_ICONS = {
  'Next.js': <StackIcon name="nextjs" style={{ width: 23, height: 23 }} />,
  'Node.js': <StackIcon name="nodejs" style={{ width: 23, height: 23 }} />,
  'PostgreSQL': <StackIcon name="postgresql" style={{ width: 23, height: 23 }} />,
  'React': <StackIcon name="react" style={{ width: 23, height: 23 }} />,
  'MongoDB': <StackIcon name="mongodb" style={{ width: 23, height: 23 }} />,
  'Socket.io': <StackIcon name="socketio" style={{ width: 23, height: 23 }} />,
};

function ProjectTechStack({ stack }) {
  return (
    <div className="project-tech-icons">
      {stack.map((name) => (
        <div key={name} className="project-tech-badge">
          <div className="project-tech-icon-wrap" aria-label={name}>
            {PROJECT_TECH_ICONS[name] || name}
          </div>
          <span className="project-tech-name">{name}</span>
        </div>
      ))}
    </div>
  );
}

function AnimatedStatementSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="statement-section" id="works" ref={ref}>
      <div className="statement-canvas">
        <div className="statement-row line-engineering">
          <motion.span
            className="statement-heavy"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            ENGINEERING
          </motion.span>
        </div>

        <div className="statement-row line-solves">
          <motion.span
            className="statement-script"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            That Solves
          </motion.span>
        </div>

        <div className="statement-row line-real">
          <motion.span
            className="statement-heavy"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            REAL
          </motion.span>
        </div>

        <div className="statement-row line-world">
          <motion.span
            className="statement-heavy"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            WORLD
          </motion.span>
        </div>

        <div className="statement-row line-complexity">
          <motion.span
            className="statement-script"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Complexity
          </motion.span>
        </div>
      </div>
    </section>
  );
}

function ResumeOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const docxContainerRef = useRef(null);
  const [docxLoaded, setDocxLoaded] = useState(false);
  const [docxError, setDocxError] = useState(false);

  // Initialize dedicated Lenis instance for buttery smooth inertia scrolling on the resume overlay
  useEffect(() => {
    if (!isOpen) return;
    const el = overlayRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    el.scrollTop = 0;

    const overlayLenis = new Lenis({
      wrapper: el,
      content: content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: true,
    });

    const updateGradient = (currentScroll) => {
      const maxScroll = 600;
      const t = Math.min(Math.max(currentScroll, 0) / maxScroll, 1);
      // At t=1 both stops resolve to hsl(218,90%,52%) which is the exact
      // background of .ro-bottom-section — seamless handoff.
      const bgTop = `hsl(${200 + t * 18}, ${40 + t * 50}%, ${98 - t * 46}%)`;
      const bgBottom = `hsl(${210 + t * 8}, ${60 + t * 30}%, ${88 - t * 36}%)`;
      el.style.background = `linear-gradient(180deg, ${bgTop} 0%, ${bgBottom} 100%)`;
    };

    updateGradient(0);

    overlayLenis.on('scroll', ({ scroll }) => {
      updateGradient(scroll);
    });

    return () => {
      overlayLenis.destroy();
    };
  }, [isOpen]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Render the .docx using docx-preview whenever the overlay opens
  useEffect(() => {
    if (!isOpen) return;
    const container = docxContainerRef.current;
    if (!container) return;

    setDocxLoaded(false);
    setDocxError(false);

    import('docx-preview').then(({ renderAsync }) => {
      fetch('/Rishabh_Surpariya_Resume.docx')
        .then(res => {
          if (!res.ok) throw new Error('File not found');
          return res.arrayBuffer();
        })
        .then(buffer => {
          container.innerHTML = '';
          return renderAsync(buffer, container, undefined, {
            className: 'docx-viewer',
            inWrapper: true,
            ignoreWidth: false,
            ignoreHeight: false,
            defaultTabStop: 720,
            renderHeaders: true,
            renderFooters: true,
            renderFootnotes: true,
            renderEndnotes: true,
            useBase64URL: true,
            useMathMLPolyfill: false,
          });
        })
        .then(() => setDocxLoaded(true))
        .catch(err => {
          console.error('docx-preview error:', err);
          setDocxError(true);
        });
    });
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <motion.div
          className="resume-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        />
      )}

      <motion.div
        className="resume-overlay"
        ref={overlayRef}
        data-lenis-prevent="true"
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? '0%' : '100%' }}
        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Floating Back Button */}
        <motion.button
          className="ro-back-btn"
          onClick={onClose}
          aria-label="Go back"
          initial={{ opacity: 0, x: -25 }}
          animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -25 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </motion.button>

        <div ref={contentRef} className="ro-scroll-content">
          {/* Hero copy */}
          <div className="ro-hero">
            <motion.span
              className="ro-label"
              initial={{ opacity: 0, y: 15 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="ro-diamond">◆</span>
              RESUME
            </motion.span>
            <h1 className="ro-headline">
              {"oh sure, let's keep it formal".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: "inline-block", marginRight: "0.28em" }}
                  initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                  animate={
                    isOpen
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 35, filter: "blur(6px)" }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.28 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="ro-subtext"
              initial={{ opacity: 0, y: 20 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              For recruiters, hiring managers, and anyone who prefers<br />
              the short version.
            </motion.p>
            <motion.a
              className="ro-download-btn"
              href="/Rishabh_Surpariya_Resume.docx"
              download="Rishabh_Surpariya_Resume.docx"
              aria-label="Download Resume"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={isOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ro-dl-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <span>Download</span>
            </motion.a>
          </div>

          {/* Resume rendered from .docx */}
          <motion.div
            className="ro-resume-frame"
            initial={{ opacity: 0, y: 70, scale: 0.92, rotate: -2.5 }}
            animate={
              isOpen
                ? { opacity: 1, y: 0, scale: 1, rotate: -2.5 }
                : { opacity: 0, y: 70, scale: 0.92, rotate: -2.5 }
            }
            whileHover={{ rotate: -1, scale: 1.01 }}
            transition={{
              duration: 0.8,
              delay: 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {!docxLoaded && !docxError && (
              <div className="ro-loading">
                <div className="ro-spinner" />
                <p>Loading resume…</p>
              </div>
            )}
            {docxError && (
              <div className="ro-loading">
                <p style={{ color: '#c0392b' }}>
                  Could not load resume file.<br />
                  <a href="/Rishabh_Surpariya_Resume.docx" download style={{ color: '#4b9cd3' }}>
                    Download it instead ↓
                  </a>
                </p>
              </div>
            )}
            <div
              ref={docxContainerRef}
              className="ro-docx-container"
              style={{ display: docxLoaded ? 'block' : 'none' }}
            />
          </motion.div>

          {/* Bottom blue CTA section */}
          <section className="ro-bottom-section">
            <div className="ro-bottom-container">
              <div className="ro-bottom-main">

                {/* Left: headline + contact */}
                <div className="ro-bottom-left">
                  <p className="ro-footer-headline">
                    lets<span className="ro-script-build"> build</span><br />
                    incredible work<br />
                    together.
                  </p>
                  <div className="ro-contact-row">
                    <div className="ro-contact-col">
                      <span className="ro-contact-label">Email</span>
                      <a href="mailto:rishabhsurpariya@gmail.com" className="ro-contact-link">
                        rishabhsurpariya@gmail.com
                      </a>
                    </div>
                    <div className="ro-contact-col">
                      <span className="ro-contact-label">Social</span>
                      <div className="ro-social-links">
                        {/* LinkedIn */}
                        <a
                          href="https://linkedin.com/in/rishabhsurpariya"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ro-social-icon"
                          aria-label="LinkedIn"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                        {/* Email icon */}
                        <a
                          href="mailto:rishabhsurpariya@gmail.com"
                          className="ro-social-icon"
                          aria-label="Email"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: meme GIF card */}
                <div className="ro-meme-card-wrapper">
                  <div className="ro-meme-card">
                    <img
                      src="https://media.tenor.com/uoSm3UazQsMAAAAe/american-psycho-nod.png"
                      alt="Patrick Bateman nodding"
                      className="ro-meme-media"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>


            </div>
          </section>
        </div>
      </motion.div>
    </>
  );
}

function App() {
  const [isDarkNav, setIsDarkNav] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    const updateNavState = () => {
      const dottedSection = document.getElementById('works');
      if (dottedSection) {
        const rect = dottedSection.getBoundingClientRect();
        setIsDarkNav(rect.top <= 70);
      } else {
        setIsDarkNav(window.scrollY > window.innerHeight * 0.7);
      }
    };

    lenis.on('scroll', updateNavState);
    updateNavState();

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    window.lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="page-wrapper">
      {/* Resume Overlay */}
      <ResumeOverlay isOpen={showResume} onClose={() => setShowResume(false)} />
      {/* Booking Modal */}
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
      {/* Top Static Navigation */}
      <nav className={`top-nav ${isDarkNav ? 'scrolled' : ''}`}>
        <div className="nav-item">
          <button
            type="button"
            className="nav-icon"
            aria-label="Home"
            onClick={() => {
              const el = document.getElementById('home');
              if (el && window.lenis) {
                window.lenis.scrollTo(el, { offset: 0, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
              }
            }}
          >
            <Home size={20} />
          </button>
          <div className="nav-popover">
            <span className="thought-dot-small"></span>
            <span className="thought-dot-medium"></span>
            <span className="thought-bubble">Home</span>
          </div>
        </div>

        <div className="nav-item">
          <button
            type="button"
            className="nav-icon"
            aria-label="My Works"
            onClick={() => {
              const el = document.getElementById('projects');
              if (el && window.lenis) {
                window.lenis.scrollTo(el, { offset: -60, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
              }
            }}
          >
            <PenTool size={20} />
          </button>
          <div className="nav-popover">
            <span className="thought-dot-small"></span>
            <span className="thought-dot-medium"></span>
            <span className="thought-bubble">My Works</span>
          </div>
        </div>

        <div className="nav-item">
          <button
            type="button"
            className="nav-icon"
            aria-label="About Me"
            onClick={() => {
              const el = document.getElementById('about');
              if (el && window.lenis) {
                window.lenis.scrollTo(el, { offset: -60, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
              }
            }}
          >
            <User size={20} />
          </button>
          <div className="nav-popover">
            <span className="thought-dot-small"></span>
            <span className="thought-dot-medium"></span>
            <span className="thought-bubble">About Me</span>
          </div>
        </div>
      </nav>

      {/* Page 1: Hero Section */}
      <section className="hero-section" id="home">
        {/* Background grain overlay */}
        <div className="grain-overlay"></div>

        {/* Top spacer to preserve exact hero layout with fixed nav */}
        <div className="nav-spacer" aria-hidden="true"></div>

        {/* Main Content */}
        <main className="main-content">

          {/* Floating Images */}
          <div className="floating-elements-container">
            {/* Left Redbull */}
            <motion.div
              className="floating-item redbull"
              animate={{ y: [0, -15, 0], rotate: [-15, -10, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/redbull_image.avif" alt="Redbull" onError={(e) => { e.target.src = 'https://via.placeholder.com/100x150?text=Redbull' }} />
              <span className="floating-text">redbull.png</span>
            </motion.div>


            {/* Right Resume — clickable sticker */}
            <motion.button
              className="floating-item resume floating-btn"
              animate={{ y: [0, -20, 0], rotate: [-15, -10, -15] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              onClick={() => setShowResume(true)}
              aria-label="View Resume"
            >
              <img src="/icons8-resume-100.png" alt="Resume" />
              <span className="floating-text">resume.pdf</span>
            </motion.button>
          </div>

          {/* Typography */}
          <div className="hero-text">
            <AnimatedHeroTitle />
            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.55, ease: "easeOut" }}
            >
              Currently an AI engineering student helping founders & early-stage<br />
              startups build, deploy, and scale intelligent systems
            </motion.p>
          </div>

          {/* CTA Section */}
          <motion.div
            className="cta-section"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88, duration: 0.55, ease: "easeOut" }}
          >
            <div className="status-toggle">
              <div className="toggle-switch">
                <div className="toggle-knob"></div>
              </div>
              <span className="status-text">Open for opportunities</span>
            </div>

            <div className="hero-cta-row">
              <HeroSocialExpandable />

              <button className="cta-button" onClick={() => setShowBooking(true)} type="button">
                <span className="cta-text-roller">
                  <span className="cta-text-primary">BOOK AN INTRO CALL</span>
                  <span className="cta-text-secondary" aria-hidden="true">BOOK AN INTRO CALL</span>
                </span>
                <div className="cta-icon-wrapper">
                  <Phone size={16} fill="white" stroke="none" />
                </div>
              </button>
            </div>
          </motion.div>

        </main>

        {/* Bottom: Location + Marquee stacked */}
        <div className="hero-bottom-wrapper">
          <div className="hero-location-badge">
            <span className="hero-location-prefix">BASED IN</span>
            <svg
              className="hero-location-pin"
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 0C2.91 0 0 2.91 0 6.5C0 11.125 6.5 16 6.5 16C6.5 16 13 11.125 13 6.5C13 2.91 10.09 0 6.5 0ZM6.5 8.75C5.257 8.75 4.25 7.743 4.25 6.5C4.25 5.257 5.257 4.25 6.5 4.25C7.743 4.25 8.75 5.257 8.75 6.5C8.75 7.743 7.743 8.75 6.5 8.75Z"
                fill="#000000"
              />
            </svg>
            <span className="hero-location-city">UDAIPUR, RAJ</span>
          </div>

          {/* Tech Stack Logo Marquee */}
          <footer className="logo-marquee-section">
            <MarqueeDemo />
          </footer>
        </div>
      </section>

      {/* Page 2: Statement Section ("ENGINEERING That Solves REAL WORLD Complexity") */}
      <AnimatedStatementSection />


      {/* Page 3: Video Showcase Section */}
      <VideoSection />

      {/* Page 4: Projects Section */}

      <section className="projects-section" id="projects">
        <div className="projects-bg-card">

          <div className="projects-header">
            <p className="projects-subtitle">Blood, sweat & sleeps were sacrificed</p>
            <AnimatedSelectedWorksTitle />
          </div>

          {/* Two-column project layout */}
          <div className="project-split">

            {/* Left: Project info text */}
            <div className="project-split-left">
              <p className="project-date">2026 – Present</p>
              <AnimatedProjectTitle text="Building an AI-powered restaurant menu & ordering platform" />
              <ProjectTechStack stack={['Next.js', 'Node.js', 'PostgreSQL', 'React']} />
              <p className="project-desc">
                mAInu is an AI-powered digital menu and ordering platform built for restaurants and street food vendors. Using AI-driven OCR to instantly digitize any paper menu, unique QR codes for zero-error table-side ordering, and seamless UPI deep-link payments, mAInu lets customers order and pay directly from their phone — no waiting, no waiters, no mistakes.
              </p>

              <button className="cta-button project-cta-button" type="button">
                <span className="cta-text-roller">
                  <span className="cta-text-primary">mAInu</span>
                  <span className="cta-text-secondary" aria-hidden="true">mAInu</span>
                </span>
                <div className="cta-icon-wrapper project-cta-icon-wrapper">
                  <img
                    src="/mainu-logo.png"
                    alt="mAInu Logo"
                    className="project-cta-logo"
                    onError={(e) => { e.currentTarget.src = '/file_000000008de871fa98c63ee61ea04668.png'; }}
                  />
                </div>
              </button>
            </div>

            {/* Right: Elastic Gallery */}
            <div className="project-split-right gallery-tilt--right">
              <ElasticGallery />
            </div>

          </div>


          {/* Second project — gallery LEFT, text RIGHT */}
          <div className="project-split">

            {/* Left: Elastic Gallery */}
            <div className="project-split-right gallery-tilt--left">
              <ElasticGallery
                defaultActiveIndex={3}
                items={[
                  { id: 0, title: 'Ideas', category: 'COMMUNITY', image: '/huddle/chatgpt4.png', link: '#' },
                  { id: 1, title: 'Collab', category: 'GROUPS', image: '/huddle/chatgpt2.png', link: '#' },
                  { id: 2, title: 'Network', category: 'PROFESSIONAL', image: '/huddle/chatgpt3.png', link: '#' },
                  { id: 3, title: 'Huddle', category: 'SOCIAL / PLATFORM', image: '/huddle/chatgpt1.png', link: '#' },
                ]}
              />
            </div>

            {/* Right: Project info text */}
            <div className="project-split-left">
              <p className="project-date">2025 – Present</p>
              <AnimatedProjectTitle text="A global student community to connect, collaborate & grow" />
              <ProjectTechStack stack={['React', 'Node.js', 'MongoDB', 'Socket.io']} />
              <p className="project-desc">
                Students worldwide connect, share ideas, form groups, and find professional
                partners across content, business, sports, and coding — all in one platform
                built to break boundaries and spark collaboration.
              </p>

              <button className="cta-button project-cta-button" type="button">
                <span className="cta-text-roller">
                  <span className="cta-text-primary">Huddle</span>
                  <span className="cta-text-secondary" aria-hidden="true">Huddle</span>
                </span>
                <div className="cta-icon-wrapper project-cta-icon-wrapper">
                  <img
                    src="/huddle-logo.jpg"
                    alt="Huddle Logo"
                    className="project-cta-logo"
                  />
                </div>
              </button>
            </div>

          </div>

        </div>{/* end projects-bg-card */}

        {/* Section Header: More works */}
        <div className="projects-header" style={{ marginTop: '7rem', marginBottom: '3.5rem' }}>
          <AnimatedMoreWorksTitle />
        </div>

      </section>

      {/* 3D Interactive Works Wheel Showcase — placed below Huddle project */}
      <section className="works-wheel-section">
        <WorksWheel items={WORKS_ITEMS} label="more" action="View" />
      </section>

      {/* Experience Section */}
      <section className="experience-section" id="experience" style={{ padding: '6rem 0 2rem 0', background: 'transparent' }}>
        <div className="projects-header experience-header" style={{ marginBottom: '4rem', padding: '0 1.5rem' }}>
          <AnimatedExperienceTitle />

          <motion.h3
            className="experience-journey-title"
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            the journey so far
          </motion.h3>

          <motion.p
            className="experience-journey-subtitle"
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            From healthcare SaaS to insurance to community tech — four roles across two years, and counting.
          </motion.p>
        </div>

        <ExperienceTimeline />
      </section>

      {/* Know Me Better / About Section — after Works Wheel */}
      <section className="know-me-section" id="about">
        <div className="know-me-inner">

          {/* Heading */}
          <AnimatedKnowMeTitle />

          {/* Body Copy */}
          <div className="know-me-body">
            <p className="know-me-intro">
              Hey, I'm <span className="know-me-name">Rishabh 🤙</span>
            </p>

            <p>
              an independent <strong>AI engineer</strong> and <strong>full-stack developer from India.</strong> I
              work with founders and early-stage startups to build, deploy, and
              scale intelligent systems.
            </p>

            <p>
              I survive on Redbull and all-nighters, running purely on caffeine and
              stubbornness. I hate boilerplate, but I'll happily spend hours
              fine-tuning a model until the outputs feel just right.
            </p>

            <p>
              I've got a habit of finding calm in staring at clouds and sky textures.
              Half of my camera roll is just blue gradients and soft sunlight.
            </p>

            <p>
              I like building stuff that feels simple, smooth, and kinda satisfying to
              use.
            </p>

            <p className="know-me-cta">
              <strong>If you want to build something together, I'm in.</strong>
            </p>
          </div>

          {/* Tech Stack Showcase */}
          <div className="tech-stack-container">
            {[
              { name: 'MongoDB', color: '#00684A', content: <svg viewBox="0 0 24 24" width="22" height="22" fill="#4ade80" xmlns="http://www.w3.org/2000/svg"><path d="M11.95 0C11.95 0 3.732 3.125 3.327 11.233c-.021.41.01.815.08 1.206 1.487-1.127 3.518-1.581 6.007-1.393-.162-3.14 1.587-5.592 1.587-5.592s.101 4.708 2.923 5.485c3.551-.976 5.372-2.316 5.372-2.316s-1.895 4.316-5.836 4.908c-1.332.2-2.583.21-3.693.08-1.996 2.193-4.521 2.37-4.521 2.37s1.394 1.34 4.364 1.63c3.085.3 6.947-.98 8.878-5.3 1.157-2.6 1.166-5.842 1.166-5.842S16.7 9.87 11.95 0z" /></svg> },
              { name: 'Express', color: '#20232A', content: 'EX' },
              { name: 'React', color: '#20232A', content: <svg viewBox="-11.5 -10.23174 23 20.46348" width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2.05" fill="#61dafb" /><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg> },
              { name: 'Node.js', color: '#20232A', content: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#4ade80" strokeWidth="2" /><text x="12" y="15.5" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle">Node</text></svg> },
              { name: 'AWS', color: '#232F3E', content: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-2px' }}><span style={{ fontSize: '11px', fontWeight: 'bold' }}>AWS</span><svg width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '-2px' }}><path d="M1 2C6 8 14 8 19 2" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" /></svg></div> },
              { name: 'Docker', color: '#2496ED', content: <svg viewBox="0 0 24 24" width="26" height="26" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.185m-2.954-2.716h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185H8.075a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185H8.075a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.185m0 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H8.075a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M5.12 6.29h2.118a.186.186 0 00.186-.185V4.217a.186.186 0 00-.186-.186H5.12a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.715h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185H5.12a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.185m0 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.12a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M2.166 9.006h2.118a.186.186 0 00.186-.186V6.93a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M21.94 9.385c-.066-.467-.428-2.023-2.155-2.222-.24-.027-.373.111-.373.111s-.418.995-.452 2.274a1.767 1.767 0 00-.317.062c-.783.21-1.72.632-1.72.632l.067 1.104s.484-.216 1.144-.367a7.275 7.275 0 011.02-.12c.05-.595.275-1.123.633-1.523.513-.574 1.258-.934 2.106-.934.194 0 .382.02.563.058.077-.384.14-1.077-.45-1.077zm-.92 1.34c-1.391 0-2.52 1.128-2.52 2.518s1.129 2.518 2.52 2.518 2.518-1.128 2.518-2.518-1.127-2.518-2.518-2.518zm0 4.103a1.587 1.587 0 01-1.585-1.585 1.587 1.587 0 011.585-1.585 1.587 1.587 0 011.584 1.585 1.587 1.587 0 01-1.584 1.585zM0 13.916c0 2.457 1.83 4.296 4.316 4.296h11.235c2.428 0 4.29-1.84 4.29-4.296 0-.325-.038-.642-.11-.944-.658.213-1.365.335-2.108.335-2.053 0-3.877-.96-5.07-2.45a9.664 9.664 0 01-1.865.253h-1.95v-1.11h1.95a8.47 8.47 0 001.373-.134l-.066-1.104s-.892.203-1.425.203H10.51v1.11h1.49c-.276.082-.54.186-.795.31l.512.983c.2-.102.404-.194.613-.274-.633 1.164-1.857 1.956-3.265 1.956-2.052 0-3.714-1.662-3.714-3.714 0-.178.012-.353.036-.525l-.898-.518c-.067.337-.102.685-.102 1.043 0 1.99 1.488 3.633 3.42 3.89v1.115c-2.525-.262-4.475-2.39-4.475-4.99 0-.154.007-.306.02-.455L.234 11.25A4.477 4.477 0 000 13.916z" /></svg> },
              { name: 'RAG/LLM', color: '#f97316', content: 'AI' }
            ].map((tech, index, arr) => (
              <div
                key={index}
                className="tech-icon-wrapper"
                style={{
                  '--icon-bg': tech.color,
                  zIndex: arr.length - index
                }}
              >
                <span className="tech-icon-tooltip">{tech.name}</span>
                {tech.content}
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div className="know-me-gallery-label">
            <span className="gallery-script">Some photos</span>
            <span className="gallery-script">from my gallery ..</span>
          </div>

          <div className="gallery-cards-row">
            <div className="gallery-card gallery-card--left">
              <img src="/pic1.png" alt="Photo 1" className="gallery-card-img gallery-card-img--top" />
            </div>
            <div className="gallery-card gallery-card--center">
              <img src="/pic2.png" alt="Photo 2" className="gallery-card-img" />
            </div>
            <div className="gallery-card gallery-card--right">
              <img src="/pic3.jpeg" alt="Photo 3" className="gallery-card-img" />
            </div>
          </div>

        </div>
      </section>

      {/* Connect & Create Scrapbook Section */}
      <ConnectShowcase />

      {/* Footer CTA Section */}
      <FooterCTA onOpenResume={() => setShowResume(true)} />
    </div>
  );
}

function VideoSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="video-showcase-section" id="video-showcase">
      <div className="video-frame-wrapper">
        <video
          ref={videoRef}
          className="showcase-video"
          src="/PixVerse_V6_Fusion_540P_image1__image2__image3.mp4"
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
}

export default App;
