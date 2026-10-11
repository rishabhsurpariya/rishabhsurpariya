import React from 'react';
import { motion } from 'framer-motion';
import './connect-showcase.css';

const MENU_ITEMS = [
  { text: "Full Stack Developer", indent: false },
  { text: "System Integration", indent: true },
  { text: "Implementing RAG Framework", indent: false },
  { text: "Build AI Agents", indent: true },
];

export function ConnectShowcase() {
  return (
    <section className="connect-showcase-section" id="connect">
      {/* Subtle Dotted Pattern Background */}
      <div className="connect-showcase-bg-grid" />

      {/* Floating Scrapbook Elements Layer */}
      <div className="connect-stickers-layer" aria-hidden="true">
        {/* Left: Textured paper with clip */}
        <motion.div
          className="sticker-item sticker-paper"
          initial={{ opacity: 0, x: -50, rotate: -4 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/NJQwflb7Rkq7LNz5q2LxCXR0p1g.avif"
            alt="Paper with clip"
            className="sticker-img-paper"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Left: "Dreams" torn newspaper clipping */}
        <motion.div
          className="sticker-item sticker-dreams"
          initial={{ opacity: 0, y: 35, rotate: -12 }}
          whileInView={{ opacity: 1, y: 0, rotate: -6 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/hUYqSTnOJPjlfX7hhkGUq1EJYU.avif"
            alt="Dreams snippet"
            className="sticker-img-dreams"
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Right: Blue macOS folder "Final_Final_Final" */}
        <motion.div
          className="sticker-item sticker-folder"
          initial={{ opacity: 0, x: 40, rotate: 12 }}
          whileInView={{ opacity: 1, x: 0, rotate: 7 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="folder-wrapper"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/vMjdrDtTZrw17yJlpaPmMqRQ.avif"
              alt="Final Folder"
              className="sticker-img-folder"
            />
            <span className="folder-label">Final_Final_Final</span>
          </motion.div>
        </motion.div>

        {/* Right: AirDrop share popup card */}
        <motion.div
          className="sticker-item sticker-airdrop"
          initial={{ opacity: 0, y: 40, rotate: -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4.5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/vHB09SE0sIPbQRKfmZpP81FS1s0.avif"
            alt="AirDrop share card"
            className="sticker-img-airdrop"
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="connect-showcase-content">
        {/* Bold 3-line heading */}
        <motion.h2
          className="connect-main-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="connect-title-line-1">alright, let’s connect &amp;</span>
          <span className="connect-title-line-2">create something really</span>
          <span className="connect-title-line-3">cool together :)</span>
        </motion.h2>

        {/* Orange "My Menu" Sticky Card */}
        <motion.div
          className="connect-menu-card"
          initial={{ opacity: 0, y: 45, rotate: -4, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.8, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
        >
          <h3 className="connect-menu-title">my menu</h3>

          <div className="connect-menu-list">
            {MENU_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`connect-menu-row ${item.indent ? 'row-indented' : ''}`}
              >
                <div className="connect-menu-item-content">
                  <span className="menu-smiley">☺</span>
                  <span className="menu-text">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
