import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './footer-cta.css';

export function FooterCTA({ onOpenResume }) {
  const videoRef = useRef(null);
  const footerRef = useRef(null);

  // Parallax tracking as FooterCTA enters and rolls over the pinned connect page
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"]
  });

  // Staggered parallax lifts
  const headlineY = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const videoRotate = useTransform(scrollYProgress, [0, 1], [-5.5, -2.8]);
  const infoY = useTransform(scrollYProgress, [0.1, 1], [50, 0]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play();
      });
    }
  }, []);

  return (
    <footer ref={footerRef} className="footer-cta-section" id="contact">
      <div className="footer-cta-container">
        {/* Top Content Row: Left Headline & Contacts + Right Meme Video Card */}
        <div className="footer-cta-grid">
          {/* Left Column: Big Headline & Contacts */}
          <div className="footer-cta-left">
            <motion.h2
              className="footer-cta-headline"
              style={{ y: headlineY }}
            >
              lets <span className="footer-cta-script">create</span>
              <br />
              incredible work
              <br />
              together.
            </motion.h2>

            {/* Email & Social Section */}
            <motion.div
              className="footer-cta-info-row"
              style={{ y: infoY }}
            >
              <div className="footer-info-col">
                <span className="footer-info-label">Email</span>
                <a
                  href="mailto:Rishabhsurpariya@gmail.com"
                  className="footer-info-link"
                >
                  Rishabhsurpariya@gmail.com
                </a>
              </div>

              <div className="footer-info-col">
                <span className="footer-info-label">Social</span>
                <div className="footer-social-icons">
                  <a
                    href="https://github.com/rishabhsurpariya"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-btn"
                    title="GitHub (rishabhsurpariya)"
                    aria-label="GitHub"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                  </a>

                  <a
                    href="https://instagram.com/ishabh.r_18"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-btn"
                    title="Instagram (ishabh.r_18)"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>

                  <a
                    href="tel:+918696526232"
                    className="footer-social-btn"
                    title="Contact (+91 8696526232)"
                    aria-label="Phone Contact"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </a>

                  <a
                    href="https://rishabhsurpariya.netlify.app"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-btn"
                    title="Website (rishabhsurpariya.netlify.app)"
                    aria-label="Portfolio Website"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </a>

                  <button
                    type="button"
                    onClick={onOpenResume}
                    className="footer-social-btn"
                    title="View Resume"
                    aria-label="View Resume"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                  </button>

                  <a
                    href="https://linkedin.com/in/rishabhsurpariya"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-btn"
                    title="LinkedIn"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.78-1.72-1.73s.77-1.73 1.72-1.73c.95 0 1.72.78 1.72 1.73s-.77 1.73-1.72 1.73m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Floating Tilted Sigma Video Card */}
          <div className="footer-cta-right">
            <motion.div
              className="footer-video-card"
              style={{
                y: videoY,
                rotate: videoRotate,
              }}
            >
              <video
                ref={videoRef}
                src="/sigma.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="footer-video-element"
              />
            </motion.div>
          </div>
        </div>

        {/* Thin Divider Line */}
        <div className="footer-cta-divider" />

        {/* Copyright Line */}
        <div className="footer-cta-bottom-row">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Rishabh Surpariya
          </p>
        </div>

        {/* Giant Watermark Name Exactly Matching Reference Screenshot */}
        <motion.div
          className="footer-watermark-wrapper"
          aria-hidden="true"
          style={{ y: watermarkY }}
        >
          <h1 className="footer-watermark-text">RISHABH</h1>
        </motion.div>
      </div>

      {/* Atmospheric Clouds Layer overlapping the name exactly as in screenshot */}
      <div className="footer-clouds-container" aria-hidden="true">
        {/* Left fluffy cloud puffs over R & I */}
        <div className="footer-cloud-left" />

        {/* Right fluffy cloud puffs over B & H */}
        <div className="footer-cloud-right" />

        {/* Bottom continuous rolling cloud layer */}
        <div className="footer-clouds-bottom-strip">
          <img
            src="/sky-clouds-footer.jpg"
            alt=""
            className="footer-clouds-img"
          />
        </div>
      </div>
    </footer>
  );
}
