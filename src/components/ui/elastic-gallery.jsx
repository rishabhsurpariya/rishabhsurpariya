import { useState, useRef, useEffect } from 'react';

const defaultProjects = [
  {
    id: 0,
    title: 'mAInu',
    category: 'AI / FULL-STACK',
    video: '/mAInu_project/mAInu video.mp4',
    link: '#',
  },
  {
    id: 1,
    title: 'Food Menu',
    category: 'AI / OCR',
    image: '/mAInu_project/food menu.png',
    link: '#',
  },
  {
    id: 2,
    title: 'Dashboard',
    category: 'ANALYTICS',
    image: '/mAInu_project/mAInu dasshboard.png',
    link: '#',
  },
  {
    id: 3,
    title: 'mAInu App',
    category: 'AI / FULL-STACK',
    image: '/mAInu_project/mAInu.png',
    link: '#',
  },
];

function VideoCard({ src, isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  // Also auto-play when scrolled into view (IntersectionObserver)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isActive) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        filter: isActive ? 'brightness(1)' : 'brightness(0.55) saturate(0.8)',
        transition: 'filter 0.65s ease',
      }}
    />
  );
}

export function ElasticGallery({ items, defaultActiveIndex = 0 }) {
  const projects = items || defaultProjects;
  const [active, setActive] = useState(defaultActiveIndex);

  return (
    <div className="eg-wrapper">
      {projects.map((project) => {
        const isActive = active === project.id;
        return (
          <div
            key={project.id}
            className={`eg-card ${isActive ? 'eg-card--active' : 'eg-card--collapsed'}`}
            onMouseEnter={() => setActive(project.id)}
          >
            {/* Media: video fills full card height, image uses normal wrap */}
            {project.video ? (
              <div style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: 0,
              }}>
                <VideoCard src={project.video} isActive={isActive} />
              </div>
            ) : (
              <div className="eg-img-wrap">
                <img src={project.image} alt={project.title} className="eg-img" />
              </div>
            )}

            {/* Collapsed: vertical rotated title */}
            {!isActive && (
              <div className="eg-collapsed-label">
                <span className="eg-vertical-text">{project.title.toUpperCase()}</span>
              </div>
            )}

            {/* Expanded: category + title + CTA */}
            {isActive && (
              <div className="eg-expanded-info">
                <span className="eg-chip">{project.category}</span>
                <h3 className="eg-title">{project.title.toUpperCase()}</h3>
                <a href={project.link} className="eg-cta">
                  VIEW PROJECT&nbsp;↗
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
