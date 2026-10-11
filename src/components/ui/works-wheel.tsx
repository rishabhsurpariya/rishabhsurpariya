import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface WorksWheelItem {
  title: string;
  image: string;
  href?: string;
  description?: string;
  category?: string;
}

export interface WorksWheelProps {
  items?: WorksWheelItem[];
  label?: string;
  action?: string;
  className?: string;
}

/**
 * WorksWheel Component
 * Exact Crafter UI 3D Works Wheel:
 * - State 1: 9 cards in a circular ring around center label ("Works '26")
 * - Transition: Smooth 3D tilt/tumbling into vertical cylinder
 * - State 2: Vertical drum wheel with active card in center right, title on left,
 *   and peeking squashed trapezoid cards above/below with generous space to the right.
 * - Non-repeating: When all projects are viewed, scrolling continues to the next section!
 */
export function WorksWheel({
  items = [],
  label = "more",
  action = "View",
  className = ""
}: WorksWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // View progress: 0 = Ring View, 1 = Focus View
  const [viewProgress, setViewProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);

  // Active project index target
  const [targetIndex, setTargetIndex] = useState(0);

  // Smooth rotation angle
  const [rotationAngle, setRotationAngle] = useState(0);
  const [targetRotationAngle, setTargetRotationAngle] = useState(0);

  // Interaction tracking
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startAngleRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Smooth continuous scroll momentum and magnetic snap
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overscrollRef = useRef(0);

  // Track cursor position so scroll hijacking only occurs over the cards
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  // Viewport dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const N = items.length || 9;
  const ringStep = 360 / N; // Ring view angle per card (40deg for 9 cards)
  const focusStep = 36;     // Focus view 3D cylinder tilt per card

  // Derived current index from physical rotation
  const rawIdx = Math.round(rotationAngle / focusStep);
  const currentIndex = Math.max(0, Math.min(rawIdx, N - 1));

  // Window and container resize listener
  useEffect(() => {
    const onResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || window.innerWidth,
          height: containerRef.current.clientHeight || window.innerHeight,
        });
      } else {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = dimensions.width < 768;

  // Card dimensions: slightly shorter, elegant landscape format (~16:9.5)
  const cardWidth = isMobile
    ? Math.min(dimensions.width * 0.65, 270)
    : Math.min(dimensions.width * 0.28, 400);
  const cardHeight = Math.round(cardWidth * 0.58); // Shorter height (~232px on desktop)

  // 3D Geometry
  // 1. Ring radius: circular orbit around center label
  const ringRadius = isMobile
    ? Math.min(dimensions.width * 0.36, 160)
    : Math.min(dimensions.height * 0.33, dimensions.width * 0.25, 290);

  // 2. Cylinder radius in focus view (creates distinct ~60px vertical gap between cards)
  const cylinderRadius = isMobile ? 380 : 470;

  // 3. Card horizontal offset in focus view:
  // Shifted moderately right of center so there's plenty of space to the right!
  const focusOffsetX = isMobile ? 0 : Math.round(dimensions.width * 0.07);

  // Smooth physics animation loop (fluid continuous inertia)
  useEffect(() => {
    const updatePhysics = () => {
      // Progress interpolation (0 to 1) - smooth ring unfolding
      setViewProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.001) return targetProgress;
        return prev + diff * 0.06;
      });

      // Rotation interpolation - fluid continuous momentum
      setRotationAngle((prev) => {
        const diff = targetRotationAngle - prev;
        if (Math.abs(diff) < 0.01) return targetRotationAngle;
        return prev + diff * 0.085; // Continuous smooth tracking with inertia
      });

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, [targetProgress, targetRotationAngle]);

  // Scroll to next section smoothly
  const scrollToNextSection = useCallback(() => {
    const nextSection =
      containerRef.current?.closest('section')?.nextElementSibling ||
      document.querySelector('.video-showcase-section') ||
      document.querySelector('#about');

    if (nextSection) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(nextSection, { duration: 1.2 });
      } else {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Scroll to previous section smoothly
  const scrollToPrevSection = useCallback(() => {
    const prevSection =
      containerRef.current?.closest('section')?.previousElementSibling ||
      document.querySelector('.statement-section') ||
      document.querySelector('#home');

    if (prevSection) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(prevSection, { duration: 1.2 });
      } else {
        prevSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Navigation steps
  const stepTo = useCallback((index: number) => {
    const target = Math.max(0, Math.min(index, N - 1));
    setTargetProgress(1);
    setTargetIndex(target);
    setTargetRotationAngle(target * focusStep);
  }, [focusStep, N]);

  const stepNext = useCallback(() => {
    setTargetProgress(1);
    const nextIdx = targetIndex + 1;

    if (nextIdx >= N) {
      // All projects covered! Do not repeat -> smoothly scroll to next part of page
      scrollToNextSection();
    } else {
      setTargetIndex(nextIdx);
      setTargetRotationAngle(nextIdx * focusStep);
    }
  }, [targetIndex, N, focusStep, scrollToNextSection]);

  const stepPrev = useCallback(() => {
    const prevIdx = targetIndex - 1;

    if (prevIdx < 0) {
      if (targetProgress > 0) {
        // Return to Ring view
        setTargetProgress(0);
        setTargetIndex(0);
        setTargetRotationAngle(0);
      } else {
        scrollToPrevSection();
      }
    } else {
      setTargetIndex(prevIdx);
      setTargetRotationAngle(prevIdx * focusStep);
    }
  }, [targetIndex, targetProgress, focusStep, scrollToPrevSection]);

  const backToRing = useCallback(() => {
    setTargetProgress(0);
    setTargetIndex(0);
    setTargetRotationAngle(0);
  }, []);

  // Wheel scroll handler — continuous fluid momentum scrolling with magnetic snap
  const handleWheel = useCallback((e: WheelEvent) => {
    const dy = e.deltaY;
    if (Math.abs(dy) < 2) return;

    const containerEl = containerRef.current;
    if (!containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    const mx = mouseXRef.current;
    const my = mouseYRef.current;

    // Check if cursor is inside the container
    const inContainer = mx >= rect.left && mx <= rect.right &&
                        my >= rect.top  && my <= rect.bottom;

    // In Focus View, cards are positioned on the right side (~38% from left to edge)
    const isRing = targetProgress === 0 || viewProgress < 0.35;
    const cardZoneLeft = isRing ? rect.left : rect.left + rect.width * 0.38;
    const cursorOverCards = inContainer && mx >= cardZoneLeft;

    if (isRing) {
      // In Ring View: scrolling down unfolds smoothly into focus view
      if (dy > 0 && cursorOverCards) {
        e.preventDefault();
        e.stopPropagation();
        setTargetProgress(1);
        setTargetIndex(0);
        setTargetRotationAngle(0);
      } else if (dy < 0) {
        // In Ring View: scrolling up -> page scrolls upside smoothly!
        // We do not preventDefault or stopPropagation so the wheel event
        // cleanly bubbles to Lenis/window to scroll the page upwards.
      }
    } else {
      // In Focus View: if cursor is NOT over cards, let page scroll naturally!
      if (!cursorOverCards) return;

      e.preventDefault();
      e.stopPropagation();

      const maxAngle = (N - 1) * focusStep;
      const minAngle = 0;
      // Proportional continuous sensitivity (~18deg per 100px wheel tick)
      const stepDelta = (dy / 100) * (focusStep * 0.5);

      // Update target angle continuously with NO freezing or locking!
      setTargetRotationAngle((prev) => {
        const next = prev + stepDelta;

        // Overscroll past the last project
        if (next > maxAngle + 10) {
          overscrollRef.current += dy;
          if (overscrollRef.current > 150) {
            overscrollRef.current = 0;
            scrollToNextSection();
          }
          return maxAngle + 8; // elastic boundary
        }

        // Overscroll before the first project
        if (next < minAngle - 10) {
          overscrollRef.current += dy;
          if (overscrollRef.current < -120) {
            overscrollRef.current = 0;
            setTargetProgress(0); // return to ring view smoothly
            return 0;
          }
          return -8; // elastic boundary
        }

        overscrollRef.current = 0;
        return next;
      });

      // Clear any pending snap
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);

      // Magnetic snap: when continuous scrolling pauses, gently align to the closest card
      snapTimerRef.current = setTimeout(() => {
        setTargetRotationAngle((curr) => {
          const nearestIdx = Math.round(curr / focusStep);
          const clampedIdx = Math.max(0, Math.min(nearestIdx, N - 1));
          setTargetIndex(clampedIdx);
          return clampedIdx * focusStep;
        });
      }, 160);
    }
  }, [targetProgress, viewProgress, N, focusStep, scrollToNextSection]);

  // Pointer drag controls (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startAngleRef.current = targetRotationAngle;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const clientY = e.clientY;
    const dy = clientY - startYRef.current;

    if (targetProgress < 0.35) {
      if (dy < -20) {
        setTargetProgress(1);
      }
    } else {
      const deltaAngle = (dy / cardHeight) * focusStep * 1.25;
      const newAngle = startAngleRef.current - deltaAngle;
      // Clamp between -0.5 and N - 0.5 to prevent endless looping
      const maxAngle = (N - 1) * focusStep + 10;
      const minAngle = -10;
      setTargetRotationAngle(Math.max(minAngle, Math.min(newAngle, maxAngle)));
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;

    if (targetProgress >= 0.35) {
      const rawIdxVal = Math.round(targetRotationAngle / focusStep);
      if (rawIdxVal >= N) {
        // Dragged past end -> transition to next section
        scrollToNextSection();
        setTargetRotationAngle((N - 1) * focusStep);
      } else if (rawIdxVal < 0) {
        // Dragged before first item -> return to Ring View
        setTargetProgress(0);
        setTargetRotationAngle(0);
      } else {
        setTargetIndex(rawIdxVal);
        setTargetRotationAngle(rawIdxVal * focusStep);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        stepNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        stepPrev();
      } else if (e.key === 'Escape') {
        backToRing();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stepNext, stepPrev, backToRing]);

  // Non-passive wheel listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Continuously track mouse position for proximity-based scroll gating
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;
    };
    el.addEventListener('mousemove', onMove, { passive: true });
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const activeItem = items[currentIndex] || items[0] || {};
  const isLastProject = currentIndex === N - 1;

  return (
    <div
      ref={containerRef}
      className={`crafter-works-wheel-root ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={(e) => {
        mouseXRef.current = e.clientX;
        mouseYRef.current = e.clientY;
        handlePointerMove(e);
      }}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        backgroundColor: '#0a0a0a',
        width: '100%',
        maxWidth: '1500px',
        height: isMobile ? '82vh' : '88vh',
        minHeight: '600px',
        maxHeight: '880px',
        borderRadius: isMobile ? '16px' : '28px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
        touchAction: (targetProgress > 0 && viewProgress > 0.35) ? 'none' : 'pan-y',
      }}
    >
      {/* State 1: Center Label in Ring View */}
      <div
        className="crafter-ring-center-label"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: Math.max(0, 1 - viewProgress * 2.2),
          pointerEvents: viewProgress < 0.2 ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
          zIndex: 10,
          cursor: 'pointer',
        }}
        onClick={() => stepTo(0)}
      >
        <span
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            color: '#ffffff',
            fontFamily: "Inter, 'Outfit', -apple-system, sans-serif",
            fontSize: '20px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </span>
      </div>

      {/* State 2: Active Item Title on Left */}
      <div
        className="crafter-focus-left-info"
        style={{
          position: 'absolute',
          top: isMobile ? '14%' : '50%',
          left: isMobile ? '50%' : '14%',
          transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
          gap: '12px',
          opacity: Math.max(0, (viewProgress - 0.4) * 1.8),
          pointerEvents: viewProgress > 0.6 ? 'auto' : 'none',
          textAlign: isMobile ? 'center' : 'left',
          width: isMobile ? '90%' : 'auto',
          maxWidth: '340px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 18 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              style={{
                color: '#ffffff',
                fontFamily: "Inter, 'Outfit', -apple-system, sans-serif",
                fontSize: isMobile ? '28px' : '34px',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {activeItem.title}
            </h2>

            {action && activeItem.href && (
              <a
                href={activeItem.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: "Inter, 'Outfit', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.35)',
                  paddingBottom: '2px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                }}
              >
                <span>{action}</span>
                <span style={{ fontSize: '11px' }}>↗</span>
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Small Navigation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
          <button
            onClick={backToRing}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.35)',
              fontFamily: "Inter, 'Outfit', sans-serif",
              fontSize: '12px',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.35)'; }}
          >
            ← Ring View
          </button>

          {isLastProject && (
            <button
              onClick={scrollToNextSection}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.45)',
                fontFamily: "Inter, 'Outfit', sans-serif",
                fontSize: '12px',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'; }}
            >
              Continue scrolling ↓
            </button>
          )}
        </div>
      </div>

      {/* 3D Stage */}
      <div
        className="crafter-3d-stage"
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main 3D Pivot Center */}
        <div
          className="crafter-3d-pivot"
          style={{
            position: 'relative',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, idx) => {
            // ─── 1. Ring View Coordinates (Progress = 0) ───
            const ringItemAngle = (idx * ringStep) - 90; // Start at 12 o'clock
            const ringRad = (ringItemAngle * Math.PI) / 180;
            const ringX = Math.round(ringRadius * Math.cos(ringRad));
            const ringY = Math.round(ringRadius * Math.sin(ringRad));
            const ringZ = 0;
            const ringRotZ = ringItemAngle + 90; // Tangential orientation
            const ringRotX = 0;
            const ringScale = isMobile ? 0.36 : 0.42;

            // ─── 2. Focus View Coordinates (Linear / Non-repeating) ───
            const diff = idx - (rotationAngle / focusStep);
            const theta = diff * focusStep; // in degrees
            const thetaRad = (theta * Math.PI) / 180;

            const isFrontCard = Math.abs(diff) < 0.45;

            // Trigonometric cylindrical projection:
            const focusCardX = focusOffsetX;
            const focusCardY = -Math.round(cylinderRadius * Math.sin(thetaRad));
            const focusCardZ = Math.round(cylinderRadius * (Math.cos(thetaRad) - 1));
            const focusRotX = theta;
            const focusRotZ = 0;
            const focusScale = 1.0;

            // ─── 3. Interpolation between Ring and Focus ───
            const currentX = ringX * (1 - viewProgress) + focusCardX * viewProgress;
            const currentY = ringY * (1 - viewProgress) + focusCardY * viewProgress;
            const currentZ = ringZ * (1 - viewProgress) + focusCardZ * viewProgress;
            const currentRotZ = ringRotZ * (1 - viewProgress) + focusRotZ * viewProgress;
            const currentRotX = ringRotX * (1 - viewProgress) + focusRotX * viewProgress;
            const currentScale = ringScale * (1 - viewProgress) + focusScale * viewProgress;

            // Opacity: In focus view, active card is bright (1.0), peeking cards above/below are 0.65, distant are hidden
            let opacity = 1;
            if (viewProgress > 0.35) {
              const absDiff = Math.abs(diff);
              if (absDiff < 0.4) {
                opacity = 1;
              } else if (absDiff <= 1.25) {
                opacity = 0.65;
              } else {
                opacity = Math.max(0, 0.5 - (absDiff - 1.25) * 2);
              }
            }

            return (
              <div
                key={idx}
                className="crafter-wheel-card"
                onClick={() => {
                  if (viewProgress < 0.3) {
                    stepTo(idx);
                  } else if (isFrontCard && item.href) {
                    window.open(item.href, '_blank', 'noopener,noreferrer');
                  } else {
                    stepTo(idx);
                  }
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d',
                  transform: `
                    translate3d(${currentX}px, ${currentY}px, ${currentZ}px)
                    rotateZ(${currentRotZ}deg)
                    rotateX(${currentRotX}deg)
                    scale(${currentScale})
                  `,
                  opacity: opacity,
                  visibility: opacity < 0.01 ? 'hidden' : 'visible',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: isFrontCard
                    ? '0 24px 50px rgba(0, 0, 0, 0.95), 0 4px 16px rgba(0, 0, 0, 0.8)'
                    : '0 16px 36px rgba(0, 0, 0, 0.85), 0 2px 10px rgba(0, 0, 0, 0.7)',
                  backgroundColor: '#121212',
                  transition: isDragging
                    ? 'none'
                    : 'box-shadow 0.3s ease, opacity 0.25s ease',
                  zIndex: isFrontCard ? 25 : Math.round(50 - Math.abs(diff) * 10),
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `/chatgpt1.png`;
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WorksWheel;
