import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import './experience-timeline.css';

const EXPERIENCES = [
  {
    id: 1,
    role: "AI Engineer Intern",
    company: "Tech Corp",
    location: "Bengaluru, KA",
    date: "Aug '24 - Present",
    logo: "/mainu-logo.png",
    isActive: true,
    images: [
      "/mAInu_project/mAInu.png",
      "/huddle/chatgpt1.png",
      "/huddle/chatgpt2.png"
    ],
    points: [
      "Own <strong>end to end AI product integration</strong> across internal tools and customer-facing apps.",
      "Led the design and launch of an <strong>intelligent search feature</strong>, now used across 500+ users.",
      "Optimized <strong>LLM prompts</strong> and contributed to large-scale data processing pipelines.",
      "Collaborated with cross-functional teams to ship features on a two-week sprint cycle.",
    ],
  },
  {
    id: 2,
    role: "Full Stack Developer Intern",
    company: "Innovate Inc.",
    location: "Remote",
    date: "Dec '23 - Apr '24",
    logo: "/huddle-logo.jpg",
    isActive: false,
    images: [
      "/pic1.png",
      "/pic2.png",
      "/pic3.jpeg"
    ],
    points: [
      "Designed and built key platform experiences, simplifying user onboarding journeys.",
      "Led <strong>end to end development</strong> for new interactive modules supporting core service launches.",
      "Reduced page load time by <strong>40%</strong> through code splitting and lazy loading.",
      "Integrated third-party APIs and managed REST endpoints using Node.js and Express.",
    ],
  },
  {
    id: 3,
    role: "Software Engineering Intern",
    company: "Startup Co.",
    location: "Bengaluru, KA",
    date: "Jun '23 - Aug '23",
    logo: "/huddle/chatgpt2.png",
    isActive: false,
    images: [
      "/huddle/chatgpt3.png",
      "/huddle/chatgpt4.png",
      "/redbull_image.avif"
    ],
    points: [
      "Developed features and improvements for <strong>smart dashboards</strong> and connected device experiences.",
      "Led development for the <strong>MVP</strong>, from early concepts through validation and launch.",
      "Worked across frontend and backend touchpoints to improve daily usage flows.",
      "Wrote unit and integration tests achieving <strong>85% coverage</strong> on critical modules.",
    ],
  },
  {
    id: 4,
    role: "B.Tech, Computer Engineering",
    company: "Silver Oak University",
    location: "Ahmedabad, GJ",
    date: "2025 - 2029",
    logo: "/college-logo.svg",
    isActive: true,
    images: [
      "/pic2.png",
      "/hero bg.png",
      "/pic1.png"
    ],
    points: [
      "Specialization in <strong>Artificial Intelligence & Machine Learning (AI/ML)</strong> with core focus on algorithms and system design.",
      "Deepening foundations in <strong>Data Structures, Neural Networks, and Distributed Systems</strong>.",
      "Actively developing <strong>end-to-end AI applications</strong> and participating in campus technical hackathons.",
      "Collaborating with peers on open-source initiatives and developer workshop sessions.",
    ],
  },
];

function ExpCard({ exp, tiltClass }) {
  return (
    <div className={`exp-card ${tiltClass || ''}`}>
      {/* ── Hover preview fan-out images cluster ── */}
      {exp.images && exp.images.length >= 3 && (
        <div className="exp-hover-cluster" aria-hidden="true">
          <div className="exp-cluster-card exp-cluster-left">
            <img src={exp.images[0]} alt={`${exp.company} preview 1`} />
          </div>
          <div className="exp-cluster-card exp-cluster-center">
            <img src={exp.images[1]} alt={`${exp.company} preview 2`} />
          </div>
          <div className="exp-cluster-card exp-cluster-right">
            <img src={exp.images[2]} alt={`${exp.company} preview 3`} />
          </div>
        </div>
      )}

      <div className="exp-card-header">
        <div className="exp-card-logo-container">
          <img
            src={exp.logo}
            alt={exp.company}
            className="exp-card-logo"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
        <div className="exp-card-title-group">
          <h4 className="exp-card-role">{exp.role}</h4>
          <p className="exp-card-company">{exp.company}</p>
        </div>
        <div className="exp-card-location">
          <MapPin size={13} className="location-icon" />
          <span>{exp.location}</span>
        </div>
      </div>
      <div className="exp-card-divider" />
      <ul className="exp-card-points">
        {exp.points.map((point, i) => (
          <li key={i}>
            <span className="point-bullet">•</span>
            <span className="point-text" dangerouslySetInnerHTML={{ __html: point }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceTimeline() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const calculateDistance = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const cards = track.querySelectorAll('.exp-item-container');
      if (!cards.length) return;

      const lastCard = cards[cards.length - 1];
      // Distance from track's left to last card's horizontal center
      const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
      const viewportCenter = window.innerWidth / 2;
      // Shift required so lastCardCenter aligns precisely with viewportCenter
      const finalShift = viewportCenter - lastCardCenter;
      
      setScrollDistance(finalShift);
    };

    calculateDistance();
    const timer = setTimeout(calculateDistance, 120);
    window.addEventListener('resize', calculateDistance);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scrollDistance || -1450]
  );

  return (
    <div ref={targetRef} className="exp-timeline-wrapper">
      <div className="exp-sticky-container">
        <motion.div ref={trackRef} style={{ x }} className="exp-horizontal-scroll">

          {/* Continuous horizontal center line */}
          <div className="exp-continuous-line" />

          {EXPERIENCES.map((exp, index) => {
            const isUp = index % 2 === 0; // even = card above line
            const tiltClass = isUp ? 'card-tilt-right' : 'card-tilt-left';

            const datePill = (
              <div className={`exp-date-pill ${exp.isActive ? 'pill-active' : ''}`}>
                {exp.date}
              </div>
            );

            return (
              <div key={exp.id} className="exp-item-container">

                {/* ── TOP HALF: content for UP cards, empty for DOWN ── */}
                <div className="exp-half exp-top-half">
                  {isUp && (
                    <>
                      {/* pill floats at top of upper half */}
                      <div className="exp-date-pill-slot">{datePill}</div>
                      {/* card pushed down toward line */}
                      <ExpCard exp={exp} tiltClass={tiltClass} />
                    </>
                  )}
                </div>

                {/* ── BOTTOM HALF: empty for UP cards, content for DOWN ── */}
                <div className="exp-half exp-bottom-half">
                  {!isUp && (
                    <>
                      {/* card pushed up toward line */}
                      <ExpCard exp={exp} tiltClass={tiltClass} />
                      {/* pill floats at bottom of lower half */}
                      <div className="exp-date-pill-slot">{datePill}</div>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
