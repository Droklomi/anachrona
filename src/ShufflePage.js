import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AnachronaLogo from './AnachronaLogo';
import { CHARACTERS, UNIVERSES, UNIVERSE_COLORS, getStaticTransition } from './data';

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.sf-outer {
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
}

.sf-slide {
  height: 100dvh;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
}

.sf-char-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: brightness(0.75);
}

.sf-char-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, transparent 70%);
  pointer-events: none;
}

.sf-char-universe-border {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.sf-char-info {
  position: absolute;
  bottom: 60px;
  left: 24px;
  right: 80px;
}

.sf-char-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: 600;
}

.sf-char-name {
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(22px, 5vw, 32px);
  color: #fff;
  line-height: 1.15;
  margin-bottom: 6px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.8);
}

.sf-char-dates {
  font-family: 'EB Garamond', Georgia, serif;
  font-style: italic;
  font-size: 15px;
  color: rgba(232,220,200,0.8);
  margin-bottom: 10px;
  letter-spacing: 0.04em;
}

.sf-char-bio {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(232,220,200,0.75);
}

.sf-char-actions {
  position: absolute;
  bottom: 60px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.sf-watch-btn {
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 50%;
  width: 52px;
  height: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  color: #fff;
  font-size: 18px;
  gap: 2px;
}

.sf-watch-btn:hover {
  background: rgba(255,255,255,0.22);
}

.sf-watch-label {
  font-family: 'Cinzel', serif;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.8);
}

.sf-universe-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.4);
}

/* TRANSITION SLIDE */
.sf-transition {
  background: #0a0a08;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 40px 32px;
  text-align: center;
}

.sf-transition-divider {
  opacity: 0.7;
}

.sf-transition-text {
  font-family: 'EB Garamond', Georgia, serif;
  font-style: italic;
  font-size: clamp(18px, 4vw, 24px);
  line-height: 1.6;
  background: linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  max-width: 520px;
  transition: opacity 0.6s ease;
}

.sf-transition-text.loading {
  opacity: 0.5;
}

.sf-transition-portraits {
  display: flex;
  gap: 24px;
  align-items: center;
}

.sf-transition-portrait {
  width: 64px;
  height: 96px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center top;
  border: 1.5px solid rgba(201,168,76,0.35);
  opacity: 0.85;
}

.sf-transition-portrait-name {
  font-family: 'Cinzel', serif;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.6);
  margin-top: 6px;
  text-align: center;
  max-width: 64px;
}

.sf-transition-portrait-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sf-transition-arrow {
  font-size: 20px;
  color: rgba(201,168,76,0.4);
  line-height: 1;
}

.sf-transition-scroll {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Cinzel', serif;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.45);
  animation: sf-bounce 2s infinite;
}

@keyframes sf-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.45; }
  50% { transform: translateX(-50%) translateY(5px); opacity: 0.7; }
}

/* NAV */
.sf-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background: transparent;
  transition: background 0.3s ease;
  pointer-events: none;
}

.sf-nav.scrolled {
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
}

.sf-nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: all;
}

.sf-nav-title {
  font-family: 'Cinzel', serif;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.85);
}

.sf-nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
  pointer-events: all;
}

.sf-nav-counter {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: rgba(201,168,76,0.8);
}

.sf-nav-back {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: rgba(232,220,200,0.7);
  cursor: pointer;
  transition: color 0.2s;
  background: none;
  border: none;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.sf-nav-back:hover {
  color: #c9a84c;
}

/* NAVIGATION DOTS */
.sf-dots {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 6px;
  pointer-events: none;
}

.sf-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: background 0.3s, transform 0.3s;
}

.sf-dot.active {
  background: #c9a84c;
  transform: scale(1.4);
}

/* TOAST */
.sf-toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(20,18,12,0.95);
  border: 1px solid rgba(201,168,76,0.35);
  border-radius: 8px;
  padding: 12px 20px;
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 15px;
  color: #e8dcc8;
  z-index: 200;
  white-space: nowrap;
  animation: sf-toast-in 0.25s ease;
  pointer-events: none;
}

@keyframes sf-toast-in {
  from { opacity: 0; transform: translateX(-50%) translateY(8px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* VIDEO MODAL */
.sf-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sf-modal-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.sf-modal-close {
  position: absolute;
  top: -44px;
  right: 0;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  line-height: 1;
}

.sf-modal-close:hover {
  background: rgba(255,255,255,0.2);
}

.sf-modal-iframe {
  width: 315px;
  height: 560px;
  border: none;
  border-radius: 12px;
  display: block;
}

.sf-modal-soon {
  width: 315px;
  height: 560px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 40px;
}

.sf-modal-soon-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: brightness(0.4);
}

.sf-modal-soon-text {
  position: relative;
  z-index: 1;
  font-family: 'Cinzel Decorative', serif;
  font-size: 16px;
  color: #c9a84c;
  text-align: center;
  line-height: 1.5;
  padding: 0 20px;
}

.sf-modal-soon-sub {
  position: relative;
  z-index: 1;
  font-family: 'EB Garamond', Georgia, serif;
  font-style: italic;
  font-size: 14px;
  color: rgba(232,220,200,0.6);
  margin-top: 8px;
  text-align: center;
}

.sf-modal-char-name {
  font-family: 'Cinzel', serif;
  font-size: 13px;
  letter-spacing: 0.1em;
  color: rgba(232,220,200,0.7);
  text-transform: uppercase;
}
`;

/* ─────────────────────────────────────────────
   BUILD SLIDES
───────────────────────────────────────────── */
function buildSlides(chars) {
  const slides = [];
  chars.forEach((char, i) => {
    slides.push({ ...char, type: 'char' });
    if (i < chars.length - 1) {
      slides.push({
        type: 'transition',
        key: `${char.id}-${chars[i + 1].id}`,
        from: char,
        to: chars[i + 1],
        text: null,
      });
    }
  });
  return slides;
}

/* ─────────────────────────────────────────────
   HOURGLASS SVG
───────────────────────────────────────────── */
function HourglassIcon() {
  return (
    <svg
      className="sf-transition-divider"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4h20M10 36h20M13 4c0 8 7 12 7 16s-7 8-7 16M27 4c0 8-7 12-7 16s7 8 7 16"
        stroke="#c9a84c"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="20" cy="20" rx="5" ry="2" fill="rgba(201,168,76,0.3)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   CHARACTER SLIDE
───────────────────────────────────────────── */
function CharSlide({ char, charIndex, total, onVideo, navigate }) {
  const universe = UNIVERSES.find(u => u.id === char.universe);
  const uColor = UNIVERSE_COLORS[char.universe] || '#c9a84c';
  const bioExcerpt = char.bio ? char.bio.slice(0, 130) + '...' : '';

  return (
    <div className="sf-slide">
      <img
        className="sf-char-bg"
        src={char.img}
        alt={char.name}
        loading="lazy"
      />
      <div className="sf-char-grad" />
      <div className="sf-char-universe-border" style={{ background: uColor }} />

      <div className="sf-char-info">
        <span
          className="sf-char-badge"
          style={{
            background: `${uColor}22`,
            border: `1px solid ${uColor}66`,
            color: uColor,
          }}
        >
          {universe ? universe.name : char.universe}
        </span>
        <div className="sf-char-name">{char.name}</div>
        <div className="sf-char-dates">{char.dates}</div>
        <div className="sf-char-bio">{bioExcerpt}</div>
      </div>

      <div className="sf-char-actions">
        <button
          className="sf-watch-btn"
          onClick={() => onVideo(char)}
          title="Regarder"
        >
          <span style={{ fontSize: 18 }}>▶</span>
          <span className="sf-watch-label">Voir</span>
        </button>
        <div
          className="sf-universe-dot"
          style={{ background: uColor }}
          title={universe ? universe.name : char.universe}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TRANSITION SLIDE
───────────────────────────────────────────── */
function TransitionSlide({ slide, transitionText }) {
  const staticText = getStaticTransition(slide.from, slide.to);
  const displayText = transitionText || staticText;
  const isLoading = !transitionText;

  return (
    <div className="sf-slide sf-transition">
      <HourglassIcon />

      <p className={`sf-transition-text${isLoading ? ' loading' : ''}`}>
        {displayText}
      </p>

      <div className="sf-transition-portraits">
        <div className="sf-transition-portrait-wrap">
          <img
            className="sf-transition-portrait"
            src={slide.from.img}
            alt={slide.from.name}
            loading="lazy"
          />
          <div className="sf-transition-portrait-name">
            {slide.from.name.split(' ')[0]}
          </div>
        </div>
        <div className="sf-transition-arrow">→</div>
        <div className="sf-transition-portrait-wrap">
          <img
            className="sf-transition-portrait"
            src={slide.to.img}
            alt={slide.to.name}
            loading="lazy"
          />
          <div className="sf-transition-portrait-name">
            {slide.to.name.split(' ')[0]}
          </div>
        </div>
      </div>

      <div className="sf-transition-scroll">↓ Continuer</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIDEO MODAL
───────────────────────────────────────────── */
function VideoModal({ char, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="sf-modal-overlay" onClick={onClose}>
      <div className="sf-modal-inner" onClick={(e) => e.stopPropagation()}>
        <button className="sf-modal-close" onClick={onClose}>✕</button>
        {char.youtubeId ? (
          <>
            <iframe
              className="sf-modal-iframe"
              src={`https://www.youtube.com/embed/${char.youtubeId}?autoplay=1&rel=0`}
              title={`${char.name} — Anachrona`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="sf-modal-char-name">{char.name}</div>
          </>
        ) : (
          <>
            <div className="sf-modal-soon">
              <img
                className="sf-modal-soon-img"
                src={char.img}
                alt={char.name}
              />
              <div className="sf-modal-soon-text">Vidéo bientôt disponible</div>
              <div className="sf-modal-soon-sub">{char.name}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ShufflePage({ user, profile }) {
  const navigate = useNavigate();
  const outerRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [videoChar, setVideoChar] = useState(null);
  const [transitions, setTransitions] = useState({});
  const [navScrolled, setNavScrolled] = useState(false);
  const [toast, setToast] = useState(null);

  const slides = buildSlides(CHARACTERS);
  const charSlides = slides.filter(s => s.type === 'char');
  const charCount = charSlides.length;

  // Current character index for counter
  const currentCharIdx = slides
    .slice(0, currentIdx + 1)
    .filter(s => s.type === 'char').length;

  // Fetch all transition texts on mount
  useEffect(() => {
    const transitionSlides = slides.filter(s => s.type === 'transition');
    transitionSlides.forEach(async (slide) => {
      try {
        const res = await fetch('/api/transition', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: slide.from.name, to: slide.to.name }),
        });
        if (res.ok) {
          const { text } = await res.json();
          setTransitions(prev => ({ ...prev, [slide.key]: text }));
        }
      } catch {
        // keep static fallback
      }
    });
  }, []); // eslint-disable-line

  // Track scroll position for nav + current index
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const slideHeight = el.clientHeight;
      const idx = Math.round(scrollTop / slideHeight);
      setCurrentIdx(idx);
      setNavScrolled(scrollTop > 10);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  const scrollToSlide = useCallback((idx) => {
    const el = outerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    el.scrollTo({ top: clamped * el.clientHeight, behavior: 'smooth' });
  }, [slides.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (videoChar) return;
      if (e.key === 'ArrowDown') scrollToSlide(currentIdx + 1);
      if (e.key === 'ArrowUp') scrollToSlide(currentIdx - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIdx, scrollToSlide, videoChar]);

  // Toast helper
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // Navigation dots (max 10, only for char slides)
  const dotIndices = charSlides.slice(0, 10).map((cs) =>
    slides.findIndex(s => s.type === 'char' && s.id === cs.id)
  );

  return (
    <div style={{ position: 'relative', background: '#0a0a08' }}>
      <style>{styles}</style>

      {/* TOP NAV */}
      <nav className={`sf-nav${navScrolled ? ' scrolled' : ''}`}>
        <div className="sf-nav-left">
          <AnachronaLogo size={28} withText={false} />
          <span className="sf-nav-title">Shuffle</span>
        </div>
        <div className="sf-nav-right">
          <span className="sf-nav-counter">
            {currentCharIdx} / {charCount}
          </span>
          <button className="sf-nav-back" onClick={() => navigate('/catalogue')}>
            ← Histoire
          </button>
        </div>
      </nav>

      {/* SCROLL CONTAINER */}
      <div className="sf-outer" ref={outerRef}>
        {slides.map((slide, i) =>
          slide.type === 'transition' ? (
            <TransitionSlide
              key={slide.key}
              slide={slide}
              transitionText={transitions[slide.key]}
            />
          ) : (
            <CharSlide
              key={slide.id}
              char={slide}
              charIndex={slides.slice(0, i + 1).filter(s => s.type === 'char').length}
              total={charCount}
              onVideo={(char) => {
                if (!char.youtubeId) {
                  showToast('Vidéo bientôt disponible');
                } else {
                  setVideoChar(char);
                }
              }}
              navigate={navigate}
            />
          )
        )}
      </div>

      {/* NAVIGATION DOTS */}
      <div className="sf-dots">
        {dotIndices.map((slideIdx, dotIdx) => (
          <div
            key={dotIdx}
            className={`sf-dot${currentIdx === slideIdx ? ' active' : ''}`}
          />
        ))}
      </div>

      {/* TOAST */}
      {toast && <div className="sf-toast">{toast}</div>}

      {/* VIDEO MODAL */}
      {videoChar && (
        <VideoModal char={videoChar} onClose={() => setVideoChar(null)} />
      )}
    </div>
  );
}
