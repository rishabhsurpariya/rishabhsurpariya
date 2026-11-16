import React, { useRef, useEffect, useState, useCallback } from 'react';
import './testimonials-envelope.css';

const LETTERS_DATA = [
  {
    id: 0,
    author: 'Harsh Kothari',
    role: 'Sr. Product Designer, Browserstack · Founder, Frim',
    context: 'Frim Endorsement · 2026',
    location: 'Dispatch: Mumbai · Certified',
    text: 'Yash is exceptionally strong at execution, especially for his age and experience. He is AI-native, has solid design thinking, and most importantly, has great visual design taste. He onboarded fast, adapted quickly, and I was comfortable putting him on client calls early. Many of the branding and taste-driven directions in Frim came from his ideas. I personally recommend him.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP1DJsh7on_ymMpHpBZKwPisT64TsJ0FdQ6I57aH_EkFyUHsalptN2oxHS1F-CQWFIs7TnuPdTKVwR-pe0H0xqDuN_5-eJluX4YHJtRI7-kiTs8YXns-XY_8TgvazQGjdBxO9jIhv0a6FSYglGe4My2MQ7vncaMvbSfOlISZ593KsUvcT5z1tkrdgOjS11nmlKxjiOGl--KGvjll8QD3ttqcnmaYfA6-1SYE0r6PM',
    stampBadge: 'POST',
    baseTilt: -2.0,
    envelopeRotate: -3.5,
    align: 'left',
    theme: {
      base: '#E8B744',
      innerV: '#DEAA33',
      flap: '#F6CE6A',
      flapInner: '#DEAA33',
      leftWing: 'linear-gradient(to right, #F6CE6A, #F1C252)',
      rightWing: 'linear-gradient(to left, #F8D272, #EBB947)',
      bottom: '#F6CE6A',
      accentBar: 'linear-gradient(to right, #F59E0B, #FBBF24, #D97706)',
      tabColor: '#735A37',
      roleColor: '#5C4200',
    },
  },
  {
    id: 1,
    author: 'Pranav Shetty',
    role: 'Founder, Live Group Middle East',
    context: 'Livespace Verification · UAE',
    location: 'Dispatch: Dubai · Air Mail',
    text: 'Yash brought a level of maturity, clarity, and craft that changed the way we present Livespace. He refined our branding, tightened the visual language, and built a high converting website in Framer with thoughtful micro interactions. His structured storytelling made it effortless for interior designers to understand our platform, trust the product, and onboard smoothly.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAciERoXjMBG03ZBlN9KrQ1VcSB9EuSSDEtIJb5hg6Ge8shXjj2b2YmZAdkE1F_dU_O9jjdUazdjKwtmg1dlW5pZ1JYEZijwKKqa-SgPDEQf92KnX1yIEBY5ETVcyflaWSVcZnGho4nhxsyCyz5LOZfCXL0p0H5QBCp8G8xXUjWI2aLEtZjYFx0-XMD2LBhUR76ucxm-xPifUFS_EbuX3S7HlLpl9lPIprgaPF9_kY',
    stampBadge: 'AIR',
    baseTilt: 2.2,
    envelopeRotate: 3.5,
    align: 'right',
    theme: {
      base: '#89B8F8',
      innerV: '#76A8F0',
      flap: '#9EC4FA',
      flapInner: '#76A8F0',
      leftWing: 'linear-gradient(to right, #A5C8FA, #91BCF8)',
      rightWing: 'linear-gradient(to left, #AECFFA, #88B6F7)',
      bottom: '#A0C5FA',
      accentBar: 'linear-gradient(to right, #60A5FA, #93C5FD, #3B82F6)',
      tabColor: '#355375',
      roleColor: '#2B5482',
    },
  },
  {
    id: 2,
    author: 'Aakash Gupta',
    role: 'Head of Product Design · Venture Mentor',
    context: 'Design Co-Founder Endorsement',
    location: 'Dispatch: Bengaluru · Registered',
    text: "Working with Yash felt like having a design co-founder on the project. His attention to micro-interactions, editorial typography, and rapid prototyping set a brand new benchmark for our core product. He doesn't just deliver static mockups—he crafts the tactile motion and feeling behind every state.",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    stampBadge: 'SEAL',
    baseTilt: -1.8,
    envelopeRotate: -3.5,
    align: 'left',
    isSvgStamp: true,
    theme: {
      base: '#8CA68F',
      innerV: '#7D9A81',
      flap: '#A0BFA3',
      flapInner: '#7D9A81',
      leftWing: 'linear-gradient(to right, #A7C2AA, #97B59A)',
      rightWing: 'linear-gradient(to left, #B0CDB3, #8FAEA1)',
      bottom: '#A0BFA3',
      accentBar: 'linear-gradient(to right, #34D399, #6EE7B7, #059669)',
      tabColor: '#3F5441',
      roleColor: '#38523C',
    },
  },
  {
    id: 3,
    author: 'Elena Rostova',
    role: 'Creative Director, Studio Forma',
    context: 'Studio Forma · Direct Endorsement',
    location: 'Dispatch: London / Berlin · Certified Express',
    text: 'The rare blend of design intuition and frontend engineering execution. Every interaction he touches feels tactile and thoughtfully considered. Yash has a distinct sensitivity to editorial pacing, spatial composition, and delightful responsive details that elevate a good concept into an unforgettable product.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    stampBadge: 'AIR',
    baseTilt: 1.5,
    envelopeRotate: 3.5,
    align: 'right',
    isSvgStamp: true,
    theme: {
      base: '#C87569',
      innerV: '#B86255',
      flap: '#D68377',
      flapInner: '#B86255',
      leftWing: 'linear-gradient(to right, #DE8E83, #CF796D)',
      rightWing: 'linear-gradient(to left, #E8988D, #CA7468)',
      bottom: '#D68377',
      accentBar: 'linear-gradient(to right, #F87171, #FCA5A5, #DC2626)',
      tabColor: '#77332C',
      roleColor: '#7D342C',
    },
  },
];

const TUCKED_Y = 0;
const EMERGED_Y = -220;

export function TestimonialsEnvelope() {
  const containerRef = useRef(null);
  const rowRefs = useRef([]);
  const letterRefs = useRef([]);
  const canvasRef = useRef(null);

  // Modal State
  const [activeModalIdx, setActiveModalIdx] = useState(null);
  const [modalStage, setModalStage] = useState('closed'); // 'closed' | 'opening' | 'open' | 'closing'
  const isExpandedMap = useRef([false, false, false, false]);

  // Apply transformed position with smooth tilt and dynamic shadow
  const applyLetterOffset = useCallback((index, progress) => {
    const el = letterRefs.current[index];
    const cfg = LETTERS_DATA[index];
    if (!el || !cfg) return;

    const emergedDist = typeof window !== 'undefined' && window.innerWidth < 640 ? -170 : -220;
    const currentY = TUCKED_Y + (emergedDist - TUCKED_Y) * progress;
    const tilt = cfg.baseTilt * (0.8 + progress * 0.4);

    const shadowSpread = 10 + progress * 24;
    const shadowBlur = 20 + progress * 40;
    const shadowAlpha = 0.08 + progress * 0.14;

    el.style.transform = `translateY(${currentY}px) rotate(${tilt}deg)`;
    el.style.boxShadow = `0 2px 4px rgba(0,0,0,0.04), 0 10px ${shadowSpread}px -6px rgba(70, 50, 20, 0.15), 0 25px ${shadowBlur}px -12px rgba(0, 0, 0, ${shadowAlpha})`;
  }, []);

  // Scroll Emerge Listener
  useEffect(() => {
    let isScrollTicking = false;

    const handleScrollEmerge = () => {
      const windowHeight = window.innerHeight;

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();

        const triggerStart = windowHeight * 0.90;
        const triggerEnd = windowHeight * 0.38;

        // On screen check:
        if (rect.top < triggerStart && rect.bottom > 0) {
          // Entering from bottom
          const enterProgress = Math.min(Math.max((triggerStart - rect.top) / (triggerStart - triggerEnd), 0), 1);

          // Exiting through top (re-enters when not on screen)
          let exitProgress = 1;
          const exitTrigger = windowHeight * 0.3;
          if (rect.bottom < exitTrigger) {
            exitProgress = Math.max(0, rect.bottom / exitTrigger);
          }

          const combined = Math.min(enterProgress, exitProgress);

          // Smooth ease curve
          const easeProgress = combined < 0.5
            ? 2 * combined * combined
            : 1 - Math.pow(-2 * combined + 2, 2) / 2;

          applyLetterOffset(index, easeProgress);
          isExpandedMap.current[index] = easeProgress > 0.5;
        } else {
          // Not on screen (above or below): tuck in smoothly
          applyLetterOffset(index, 0);
          isExpandedMap.current[index] = false;
        }
      });

      isScrollTicking = false;
    };

    const onScroll = () => {
      if (!isScrollTicking) {
        window.requestAnimationFrame(handleScrollEmerge);
        isScrollTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial calculation
    handleScrollEmerge();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [applyLetterOffset]);

  // Click to toggle manual emergence
  const toggleSingleEnvelope = (index) => {
    isExpandedMap.current[index] = !isExpandedMap.current[index];
    applyLetterOffset(index, isExpandedMap.current[index] ? 1 : 0);
  };

  // ── Air Currents Canvas Physics ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const mouse = {
      x: -999,
      y: -999,
      prevX: -999,
      prevY: -999,
      vx: 0,
      vy: 0,
      speed: 0,
      lastMoveTime: 0,
    };

    class StreamlineRibbon {
      constructor(offsetAngle = 0, lateralDist = 0) {
        this.points = [];
        this.offsetAngle = offsetAngle;
        this.lateralDist = lateralDist;
      }

      add(x, y, vx, vy, speed) {
        const perpX = -vy / (speed || 1);
        const perpY = vx / (speed || 1);
        const px = x + perpX * this.lateralDist;
        const py = y + perpY * this.lateralDist;

        this.points.unshift({
          x: px,
          y: py,
          vx: vx * 0.16 + (Math.random() - 0.5) * 0.4,
          vy: vy * 0.16 - 0.35 + (Math.random() - 0.5) * 0.3,
          age: 0,
          maxAge: 32 + Math.random() * 14,
          width: Math.min(speed * 0.28 + 1.2, 3.8),
        });

        if (this.points.length > 28) {
          this.points.pop();
        }
      }

      update() {
        for (let i = this.points.length - 1; i >= 0; i--) {
          const pt = this.points[i];
          pt.age++;
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.vx *= 0.94;
          pt.vy *= 0.94;

          if (pt.age >= pt.maxAge) {
            this.points.splice(i, 1);
          }
        }
      }

      draw(context) {
        if (this.points.length < 2) return;
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length - 1; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2;
          const yc = (this.points[i].y + this.points[i + 1].y) / 2;
          context.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }

        const headLife = 1 - this.points[0].age / this.points[0].maxAge;
        const alpha = Math.max(0, Math.min(0.45 * headLife, 0.45));

        context.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        context.lineWidth = Math.max(0.5, this.points[0].width * headLife);
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
      }
    }

    const ribbonCenter = new StreamlineRibbon(0, 0);
    const ribbonFlank1 = new StreamlineRibbon(0, -9);
    const ribbonFlank2 = new StreamlineRibbon(0, 8);
    const ribbons = [ribbonCenter, ribbonFlank1, ribbonFlank2];

    const particles = [];
    const MAX_PARTICLES = 120;

    class BreezeWisp {
      constructor(x, y, vx, vy, speed) {
        this.x = x + (Math.random() - 0.5) * 12;
        this.y = y + (Math.random() - 0.5) * 12;

        const angle = Math.atan2(vy, vx) + (Math.random() - 0.5) * 1.2;
        const pSpeed = Math.random() * (speed * 0.28 + 0.6);
        this.vx = Math.cos(angle) * pSpeed * 0.65;
        this.vy = Math.sin(angle) * pSpeed * 0.65 - 0.2;

        this.radius = 1.0 + Math.random() * 2.2;
        this.length = 6 + Math.random() * 14;
        this.swirl = (Math.random() - 0.5) * 0.08;
        this.rotation = angle;

        this.life = 0;
        this.maxLife = 40 + Math.random() * 32;
        this.baseAlpha = 0.25 + Math.random() * 0.35;
        this.isPaperWisp = Math.random() > 0.45;
      }

      update() {
        this.life++;
        this.rotation += this.swirl;
        this.vx += Math.cos(this.rotation) * 0.04;
        this.vy += Math.sin(this.rotation) * 0.03 - 0.015;
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
      }

      draw(context) {
        const progress = this.life / this.maxLife;
        const fade = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
        const currentAlpha = Math.max(0, fade * this.baseAlpha);
        if (currentAlpha <= 0) return;

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);

        if (this.isPaperWisp) {
          context.beginPath();
          context.moveTo(-this.length * 0.5, 0);
          context.quadraticCurveTo(0, -1.8, this.length * 0.5, 0);
          context.strokeStyle = `rgba(255, 255, 255, ${currentAlpha.toFixed(3)})`;
          context.lineWidth = Math.max(0.6, this.radius * (1 - progress * 0.6));
          context.lineCap = 'round';
          context.stroke();
        } else {
          context.beginPath();
          context.arc(0, 0, this.radius * (1 - progress * 0.4), 0, Math.PI * 2);
          context.fillStyle = `rgba(240, 246, 255, ${currentAlpha.toFixed(3)})`;
          context.fill();
        }

        context.restore();
      }
    }

    let lastClientX = null;
    let lastClientY = null;
    let lastEmitTime = 0;

    const handleMouseMove = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      // Only track if cursor is near/over canvas bounds
      if (currentY < -100 || currentY > rect.height + 100) return;

      const now = performance.now();

      if (lastClientX !== null && lastClientY !== null) {
        const dx = currentX - lastClientX;
        const dy = currentY - lastClientY;
        const instantSpeed = Math.sqrt(dx * dx + dy * dy);

        mouse.vx = mouse.vx * 0.6 + dx * 0.4;
        mouse.vy = mouse.vy * 0.6 + dy * 0.4;
        mouse.speed = mouse.speed * 0.7 + instantSpeed * 0.3;

        if (instantSpeed > 1.5 && now - lastEmitTime > 14) {
          lastEmitTime = now;
          ribbonCenter.add(currentX, currentY, mouse.vx, mouse.vy, mouse.speed);

          if (mouse.speed > 8) {
            ribbonFlank1.add(currentX, currentY, mouse.vx, mouse.vy, mouse.speed);
            ribbonFlank2.add(currentX, currentY, mouse.vx, mouse.vy, mouse.speed);
          }

          const spawnCount = Math.min(Math.floor(instantSpeed * 0.22) + 1, 4);
          for (let i = 0; i < spawnCount; i++) {
            if (particles.length < MAX_PARTICLES) {
              particles.push(new BreezeWisp(currentX, currentY, mouse.vx, mouse.vy, mouse.speed));
            }
          }
        }
      }

      lastClientX = currentX;
      lastClientY = currentY;
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.lastMoveTime = now;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let ambientCounter = 0;
    let animationFrameId = null;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      ambientCounter++;
      if (ambientCounter % 48 === 0 && particles.length < MAX_PARTICLES) {
        const spawnX = Math.random() * width;
        const spawnY = Math.random() * (height * 0.65);
        particles.push(new BreezeWisp(spawnX, spawnY, 1.2 + Math.random() * 1.5, -0.4, 2));
      }

      mouse.vx *= 0.92;
      mouse.vy *= 0.92;
      mouse.speed *= 0.92;

      for (let i = 0; i < ribbons.length; i++) {
        ribbons[i].update();
        ribbons[i].draw(ctx);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ── Modal Handlers ──
  // Lock document scroll and pause Lenis smooth scroll while letter modal is open
  useEffect(() => {
    const isModalOpen = modalStage !== 'closed';
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    };
  }, [modalStage]);

  const openLetterModal = (idx) => {
    setActiveModalIdx(idx);
    setModalStage('opening');

    // Phase 2: Flap opening
    setTimeout(() => {
      setModalStage('flap-open');
    }, 180);

    // Phase 3: Letter emergence
    setTimeout(() => {
      setModalStage('glide-out');
    }, 580);

    // Phase 4: Settle
    setTimeout(() => {
      setModalStage('open');
    }, 950);
  };

  const closeLetterModal = () => {
    setModalStage('closing');
    setTimeout(() => {
      setActiveModalIdx(null);
      setModalStage('closed');
    }, 520);
  };

  const nextLetterModal = () => {
    if (activeModalIdx === null) return;
    const next = (activeModalIdx + 1) % LETTERS_DATA.length;
    setActiveModalIdx(next);
  };

  const prevLetterModal = () => {
    if (activeModalIdx === null) return;
    const prev = (activeModalIdx - 1 + LETTERS_DATA.length) % LETTERS_DATA.length;
    setActiveModalIdx(prev);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (activeModalIdx === null) return;
      if (e.key === 'Escape') closeLetterModal();
      if (e.key === 'ArrowRight') nextLetterModal();
      if (e.key === 'ArrowLeft') prevLetterModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModalIdx]);

  const activeLetter = activeModalIdx !== null ? LETTERS_DATA[activeModalIdx] : null;

  return (
    <section className="testimonials-envelope-section" id="testimonials" ref={containerRef}>
      {/* ── Ambient Sky Clouds ── */}
      <div className="testimonials-sky-layer" aria-hidden="true">
        <div className="testimonials-cloud-haze" />
        <svg className="cloud-float cloud-drift-1" fill="currentColor" viewBox="0 0 400 160">
          <path d="M80 140h240a50 50 0 0 0 10-99 65 65 0 0 0-125-18 55 55 0 0 0-105 32 45 45 0 0 0-20 85z" />
        </svg>
        <svg className="cloud-float cloud-drift-2" fill="currentColor" viewBox="0 0 450 180">
          <path d="M90 150h270a55 55 0 0 0 15-108 70 70 0 0 0-136-16 60 60 0 0 0-116 35 48 48 0 0 0-33 89z" />
        </svg>
        <svg className="cloud-float cloud-drift-3" fill="currentColor" viewBox="0 0 400 160">
          <path d="M75 140h230a48 48 0 0 0 12-94 62 62 0 0 0-120-17 52 52 0 0 0-100 30 42 42 0 0 0-24 81z" />
        </svg>
      </div>

      {/* ── Paper Airplanes & Soaring Birds ── */}
      <div className="testimonials-aero-layer" aria-hidden="true">
        {/* Airplane 1 */}
        <div className="plane-anim-1">
          <svg viewBox="0 0 76 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon fill="#FFFFFF" fillOpacity="0.96" points="2,14 74,4 34,42" />
            <polygon fill="#E2E8F0" fillOpacity="0.92" points="34,42 42,21 74,4" />
            <polygon fill="#CBD5E1" fillOpacity="0.85" points="2,14 34,42 42,21" />
            <line stroke="#FFFFFF" strokeLinecap="round" strokeWidth="0.8" x1="2" x2="74" y1="14" y2="4" />
            <line stroke="#94A3B8" strokeOpacity="0.5" strokeWidth="0.5" x1="74" x2="34" y1="4" y2="42" />
          </svg>
        </div>

        {/* Airplane 2 */}
        <div className="plane-anim-2">
          <svg viewBox="0 0 76 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon fill="#FFFDF9" fillOpacity="0.94" points="2,14 74,4 34,42" />
            <polygon fill="#E5E7EB" fillOpacity="0.88" points="34,42 42,21 74,4" />
            <polygon fill="#D1D5DB" fillOpacity="0.8" points="2,14 34,42 42,21" />
            <line stroke="#FFFFFF" strokeLinecap="round" strokeWidth="0.75" x1="2" x2="74" y1="14" y2="4" />
          </svg>
        </div>

        {/* Airplane 3 */}
        <div className="plane-anim-3">
          <svg viewBox="0 0 76 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon fill="#FFFFFF" fillOpacity="0.85" points="2,14 74,4 34,42" />
            <polygon fill="#E2E8F0" fillOpacity="0.78" points="34,42 42,21 74,4" />
            <polygon fill="#CBD5E1" fillOpacity="0.7" points="2,14 34,42 42,21" />
          </svg>
        </div>

        {/* Bird 1 */}
        <div className="bird-anim-1">
          <div className="flutter-subtle">
            <svg fill="currentColor" viewBox="0 0 48 36" style={{ color: 'rgba(56, 83, 117, 0.45)' }}>
              <path d="M24 16 C20 9, 8 2, 0 6 C7 11, 16 17, 21 21 C15 28, 7 32, 2 35 C11 31, 20 25, 24 22 C28 25, 37 31, 46 35 C41 32, 33 28, 27 21 C32 17, 41 11, 48 6 C40 2, 28 9, 24 16 Z" />
            </svg>
          </div>
        </div>

        {/* Bird 2 */}
        <div className="bird-anim-2">
          <div className="flutter-companion">
            <svg fill="currentColor" viewBox="0 0 48 36" style={{ color: 'rgba(71, 101, 135, 0.4)' }}>
              <path d="M24 16 C20 9, 8 2, 0 6 C7 11, 16 17, 21 21 C15 28, 7 32, 2 35 C11 31, 20 25, 24 22 C28 25, 37 31, 46 35 C41 32, 33 28, 27 21 C32 17, 41 11, 48 6 C40 2, 28 9, 24 16 Z" />
            </svg>
          </div>
        </div>

        {/* Bird 3 */}
        <div className="bird-anim-3">
          <div className="flutter-subtle">
            <svg fill="currentColor" viewBox="0 0 48 36" style={{ color: 'rgba(72, 107, 145, 0.35)' }}>
              <path d="M24 16 C20 9, 8 2, 0 6 C7 11, 16 17, 21 21 C15 28, 7 32, 2 35 C11 31, 20 25, 24 22 C28 25, 37 31, 46 35 C41 32, 33 28, 27 21 C32 17, 41 11, 48 6 C40 2, 28 9, 24 16 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Interactive Air Currents Canvas ── */}
      <canvas ref={canvasRef} className="testimonials-air-canvas" aria-hidden="true" />

      {/* ── Section Header ── */}
      <div className="testimonials-header">
        <h2 className="testimonials-title">Words of Trust</h2>
        <p className="testimonials-subtitle">
          "Letters preserved like thoughtful personal correspondence. As you explore down the desk, each note emerges naturally from its pocket."
        </p>
      </div>

      {/* ── Staggered Envelope Grid ── */}
      <div className="testimonials-envelope-grid">
        {LETTERS_DATA.map((letter, idx) => {
          const isRight = letter.align === 'right';

          return (
            <div
              key={letter.id}
              ref={(el) => (rowRefs.current[idx] = el)}
              className={`envelope-row ${isRight ? 'align-right' : 'align-left'}`}
            >
              <div
                className="envelope-container"
                style={{
                  transform: `rotate(${letter.envelopeRotate}deg)`,
                }}
              >
                {/* Back interior cavity */}
                <div
                  className="envelope-back-cavity"
                  style={{ backgroundColor: letter.theme.base }}
                >
                  <div className="envelope-dot-texture" />
                  <div
                    className="envelope-v-slit"
                    style={{ backgroundColor: letter.theme.innerV }}
                  />
                </div>

                {/* Letter Slot Pocket Container */}
                <div className="envelope-slot-container">
                  <article
                    ref={(el) => (letterRefs.current[idx] = el)}
                    className="letter-paper"
                    onClick={() => toggleSingleEnvelope(idx)}
                    title="Click to emerge or tuck note"
                  >
                    {/* Pull Tab */}
                    <div
                      className="pull-tab"
                      style={{ color: letter.theme.tabColor }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openLetterModal(idx);
                      }}
                      title="Click to read full letter"
                    >
                      <span className="pull-tab-label">PULL ✉</span>
                      <span className="pull-tab-sub">· Open Full Letter ↗</span>
                    </div>

                    {/* Note Body Quote */}
                    <p className="letter-quote-body">"{letter.text}"</p>

                    {/* Note Footer */}
                    <div className="letter-footer">
                      <div className="letter-author-info">
                        <span className="letter-author-name">{letter.author}</span>
                        <span className="letter-author-context">{letter.context}</span>
                      </div>
                      <button
                        type="button"
                        className="letter-read-btn"
                        style={{ color: letter.theme.roleColor }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openLetterModal(idx);
                        }}
                      >
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="3" strokeWidth="2" />
                          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Read Letter</span>
                      </button>
                    </div>
                  </article>
                </div>

                {/* Front Pocket Wings */}
                <div className="envelope-front-pocket">
                  <div
                    className="envelope-pocket-left"
                    style={{ background: letter.theme.leftWing }}
                  />
                  <div
                    className="envelope-pocket-right"
                    style={{ background: letter.theme.rightWing }}
                  />
                  <div
                    className="envelope-pocket-bottom"
                    style={{ backgroundColor: letter.theme.bottom }}
                  />

                  {/* Stamp & Author Label */}
                  <div className="envelope-stamp-anchor">
                    <div
                      className="postage-stamp-wrap"
                      onClick={() => openLetterModal(idx)}
                    >
                      <div className="postage-stamp">
                        {letter.isSvgStamp ? (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: idx === 2 ? '#E5ECE5' : '#FCECE9',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: `1px solid ${idx === 2 ? '#BED2BF' : '#F1C2BC'}`,
                              padding: '2px',
                              textAlign: 'center',
                            }}
                          >
                            <svg
                              width="26"
                              height="26"
                              fill="none"
                              stroke={idx === 2 ? '#58795C' : '#93000A'}
                              viewBox="0 0 24 24"
                              style={{ marginBottom: '2px' }}
                            >
                              <circle cx="12" cy="8" r="4" strokeWidth="1.8" />
                              <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                            <span
                              style={{
                                fontSize: '7.5px',
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontWeight: 700,
                                color: idx === 2 ? '#38523C' : '#7A1F16',
                              }}
                            >
                              {idx === 2 ? 'A. GUPTA' : 'E. ROSTOVA'}
                            </span>
                            <span
                              style={{
                                fontSize: '6.5px',
                                color: idx === 2 ? '#69846D' : '#A34E45',
                              }}
                            >
                              {idx === 2 ? 'HEAD DESIGN' : 'STUDIO FORMA'}
                            </span>
                          </div>
                        ) : (
                          <img src={letter.image} alt={letter.author} />
                        )}

                        <div className={`stamp-cancellation-badge ${isRight ? 'align-left-badge' : ''}`}>
                          <span className="stamp-badge-text">{letter.stampBadge}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="envelope-author-name">{letter.author}</h3>
                    <p className="envelope-author-role" style={{ color: letter.theme.roleColor }}>
                      {letter.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3D Origami Envelope Modal Experience ── */}
      {activeLetter && (
        <div
          className={`envelope-modal-overlay ${modalStage !== 'closed' && modalStage !== 'closing' ? 'is-active' : ''}`}
          role="dialog"
          aria-modal="true"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="envelope-modal-backdrop" onClick={closeLetterModal} />

          <div className="envelope-3d-stage" data-lenis-prevent="true">
            <div
              className="modal-envelope-wrapper"
              data-lenis-prevent="true"
              style={{
                transform: modalStage === 'opening' || modalStage === 'closing' ? 'scale(0.88) translateY(18px)' : 'scale(1) translateY(0)',
                opacity: modalStage === 'closing' ? 0 : 1,
              }}
            >
              {/* Envelope Base */}
              <div
                className="modal-envelope-base"
                style={{ backgroundColor: activeLetter.theme.base }}
              >
                <div className="envelope-dot-texture" />
                <div
                  className="envelope-v-slit"
                  style={{ backgroundColor: activeLetter.theme.innerV }}
                />
              </div>

              {/* 3D Flap */}
              <div
                className={`envelope-3d-flap ${modalStage === 'flap-open' || modalStage === 'glide-out' || modalStage === 'open' ? 'is-open' : ''}`}
              >
                <div
                  className="modal-flap-outer envelope-top-flap"
                  style={{ backgroundColor: activeLetter.theme.flap }}
                >
                  <div className="modal-flap-seal">SEAL</div>
                </div>
                <div
                  className="modal-flap-inner envelope-top-flap"
                  style={{ backgroundColor: activeLetter.theme.flapInner }}
                />
              </div>

              {/* Sliding Letter Sheet */}
              <div
                className="modal-letter-glide-box"
                data-lenis-prevent="true"
                style={{
                  transform:
                    modalStage === 'opening' || modalStage === 'flap-open'
                      ? 'translateY(40px) scale(0.92)'
                      : modalStage === 'glide-out'
                        ? 'translateY(-24px) scale(1.02)'
                        : 'translateY(0) scale(1)',
                  opacity: modalStage === 'opening' || modalStage === 'flap-open' ? 0 : 1,
                }}
              >
                <div className="letter-modal-card" data-lenis-prevent="true">
                  {/* Accent bar */}
                  <div
                    className="modal-accent-bar"
                    style={{ background: activeLetter.theme.accentBar }}
                  />

                  {/* Modal Toolbar */}
                  <div className="modal-toolbar">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="modal-badge-chip">Personal Correspondence</span>
                      <span className="modal-counter">
                        Letter {activeModalIdx + 1} of {LETTERS_DATA.length}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button
                        type="button"
                        className="modal-nav-btn"
                        onClick={prevLetterModal}
                        title="Previous Letter"
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="modal-nav-btn"
                        style={{ marginLeft: '6px' }}
                        onClick={nextLetterModal}
                        title="Next Letter"
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="modal-close-btn"
                        onClick={closeLetterModal}
                        title="Close"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Letter Body */}
                  <div
                    className="modal-scroll-body"
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="modal-correspondent-header">
                      <div className="modal-correspondent-left">
                        <div className="postage-stamp" style={{ width: '4rem', height: '5rem' }}>
                          <img src={activeLetter.image} alt={activeLetter.author} />
                        </div>
                        <div>
                          <h3 className="modal-author-title">{activeLetter.author}</h3>
                          <p className="modal-author-role" style={{ color: activeLetter.theme.roleColor }}>
                            {activeLetter.role}
                          </p>
                          <p className="modal-author-context">{activeLetter.context}</p>
                        </div>
                      </div>

                      <div className="modal-airmail-box">
                        <p className="modal-airmail-tag">AIRMAIL PAR AVION</p>
                        <p className="modal-dispatch-text">{activeLetter.location}</p>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="modal-quote-wrapper">
                      <svg className="modal-quote-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="modal-quote-text">"{activeLetter.text}"</p>
                    </div>

                    {/* Signature */}
                    <div className="modal-endorsement-footer">
                      <div className="modal-verified-pill">
                        <span className="modal-verified-dot" />
                        <span style={{ fontWeight: 500, color: '#4E4A43' }}>Verified Direct Reference</span>
                      </div>
                      <span className="modal-signature-handwriting">~ {activeLetter.author}</span>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="modal-bottom-bar">
                    <div className="modal-bottom-links">
                      <button type="button" className="modal-link-btn" onClick={prevLetterModal}>
                        ← Previous Letter
                      </button>
                      <span>|</span>
                      <button type="button" className="modal-link-btn" onClick={nextLetterModal}>
                        Next Letter →
                      </button>
                    </div>
                    <button type="button" className="modal-link-btn" onClick={closeLetterModal} style={{ color: activeLetter.theme.roleColor }}>
                      Dismiss View (Esc)
                    </button>
                  </div>
                </div>
              </div>

              {/* Front pocket clips during opening */}
              <div
                className="envelope-front-pocket"
                style={{
                  opacity: modalStage === 'open' ? 0.15 : 1,
                  transition: 'opacity 0.5s ease',
                }}
              >
                <div className="envelope-pocket-left" style={{ background: activeLetter.theme.leftWing }} />
                <div className="envelope-pocket-right" style={{ background: activeLetter.theme.rightWing }} />
                <div className="envelope-pocket-bottom" style={{ backgroundColor: activeLetter.theme.bottom }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
