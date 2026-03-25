import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AnachronaLogo from './AnachronaLogo';
import TikTokFooter from './TikTokFooter';
import { UNIVERSE_COLORS, UNIVERSES, CHARACTERS } from './data';

/* ─────────────────────────────────────────────
   EDITORIAL ROWS
───────────────────────────────────────────── */
const EDITORIAL_ROWS = [
  { id: 'top10', label: 'Top 10 Anachrona', emoji: '🔥', filter: c => c.tags.includes('top10') },
  { id: 'nouveau', label: 'Nouveau sur Anachrona', emoji: '⭐', filter: c => c.tags.includes('nouveau') },
  { id: 'destins', label: 'Destins Tragiques', emoji: '💀', filter: c => c.tags.includes('destins-tragiques') },
  { id: 'conquerants', label: 'Conquérants & Empereurs', emoji: '⚔', filter: c => c.tags.includes('conquerants') },
  { id: 'femmes', label: 'Femmes de Pouvoir', emoji: '♛', filter: c => c.tags.includes('femmes') },
  { id: 'defie', label: 'Ils ont défié leur époque', emoji: '✨', filter: c => c.tags.includes('defie-epoque') },
  {
    id: 'selection',
    label: 'Notre sélection du jour',
    emoji: '🎯',
    filter: c => ['cleopatre', 'gengis-khan', 'louis-xiv', 'anne-bonny', 'socrate', 'charlemagne'].includes(c.id),
  },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #0d0d0a;
  color: #e8dcc8;
  font-family: 'EB Garamond', Georgia, serif;
  overflow-x: hidden;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
}

/* NAV */
.hn {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 72px;
  transition: background 0.4s ease, border-bottom 0.4s ease;
}
.hn.scrolled {
  background: rgba(13,13,10,0.96);
  border-bottom: 1px solid rgba(201,168,76,0.3);
  backdrop-filter: blur(12px);
}
.hn-logo { cursor: pointer; display: flex; align-items: center; }
.hn-right { display: flex; align-items: center; gap: 12px; }
.hn-btn-shuffle {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  padding: 8px 18px;
  border: 1px solid rgba(232,220,200,0.3);
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  color: rgba(232,220,200,0.8);
  transition: border-color 0.2s, color 0.2s;
}
.hn-btn-shuffle:hover {
  border-color: #c9a84c;
  color: #c9a84c;
}
.hn-btn-myth {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: linear-gradient(135deg, #7C3AED, #A78BFA);
  color: #fff;
  box-shadow: 0 0 18px rgba(124,58,237,0.5);
  transition: box-shadow 0.3s, transform 0.2s;
}
.hn-btn-myth:hover {
  box-shadow: 0 0 30px rgba(167,139,250,0.7);
  transform: translateY(-1px);
}
.hn-btn-premium {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: linear-gradient(135deg, #c9a84c, #e8c96a);
  color: #0d0d0a;
  font-weight: 700;
  transition: transform 0.2s, box-shadow 0.3s;
}
.hn-btn-premium:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 20px rgba(201,168,76,0.5);
}

/* UNIVERSE BAND */
.hub {
  padding: 56px 48px 40px;
}
.hub-label {
  font-family: 'Cinzel', serif;
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.7);
  margin-bottom: 28px;
}
.hub-track {
  display: flex;
  gap: 28px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 8px;
}
.hub-track::-webkit-scrollbar { display: none; }
.hub-track { -ms-overflow-style: none; scrollbar-width: none; }
.hub-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex-shrink: 0;
}
.hub-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.08em;
  border: 2px solid transparent;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  text-align: center;
  line-height: 1.3;
  padding: 8px;
}
.hub-item:hover .hub-circle {
  transform: scale(1.08);
}
.hub-name {
  font-family: 'Cinzel', serif;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: rgba(232,220,200,0.75);
  text-align: center;
  max-width: 90px;
  line-height: 1.3;
}

/* CHARACTER ROWS */
.hs {
  padding: 0 48px 48px;
}
.hs-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  padding-left: 16px;
  border-left: 3px solid #c9a84c;
}
.hs-head.universe-bar { border-left-color: var(--ucolor, #c9a84c); }
.hs-emoji { font-size: 18px; }
.hs-title {
  font-family: 'Cinzel', serif;
  font-size: 15px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e8dcc8;
}
.hs-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 8px;
}
.hs-track::-webkit-scrollbar { display: none; }
.hs-track { -ms-overflow-style: none; scrollbar-width: none; }

/* CHARACTER CARD */
.hc {
  flex-shrink: 0;
  width: 154px;
  cursor: pointer;
}
.hc-portrait {
  position: relative;
  width: 154px;
  height: 231px;
  border-radius: 4px;
  overflow: hidden;
  background: #1a1a16;
}
.hc-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;
}
.hc:hover .hc-img {
  transform: scale(1.06);
  filter: brightness(0.65);
}
.hc-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.hc:hover .hc-overlay { opacity: 1; }
.hc-overlay-text {
  font-family: 'Cinzel', serif;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #fff;
  text-transform: uppercase;
  background: rgba(201,168,76,0.2);
  border: 1px solid rgba(201,168,76,0.6);
  padding: 6px 14px;
  border-radius: 2px;
}
.hc-badges {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hc-badge-new {
  font-family: 'Cinzel', serif;
  font-size: 9px;
  letter-spacing: 0.15em;
  color: #e8c96a;
  border: 1px solid #c9a84c;
  padding: 2px 7px;
  background: rgba(13,13,10,0.7);
  text-transform: uppercase;
}
.hc-badge-lock {
  font-size: 13px;
  line-height: 1;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.8));
}
.hc-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-family: 'Cinzel', serif;
  font-size: 10px;
  color: rgba(232,220,200,0.8);
  background: rgba(13,13,10,0.75);
  padding: 2px 6px;
  border-radius: 2px;
}
.hc-info { padding: 8px 2px 0; }
.hc-name {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #e8dcc8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hc-dates {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 12px;
  color: rgba(232,220,200,0.5);
  margin-top: 2px;
}

/* SEPARATOR */
.hsep {
  border: none;
  border-top: 1px solid rgba(201,168,76,0.15);
  margin: 20px 48px 48px;
}

/* FOOTER */
.hfooter {
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-top: 1px solid rgba(201,168,76,0.15);
}
.hfooter-tagline {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 15px;
  color: rgba(232,220,200,0.4);
  letter-spacing: 0.05em;
}
.hfooter-copy {
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 0.15em;
  color: rgba(232,220,200,0.25);
  text-transform: uppercase;
}

/* TIKTOK FOOTER */
.htk {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 64px;
  background: rgba(255,255,255,0.03);
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-wrap: wrap;
  gap: 20px;
}
.htk-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.htk-text h3 {
  font-family: 'Cinzel', serif;
  font-size: 15px;
  letter-spacing: 0.08em;
  color: #e8dcc8;
}
.htk-text p {
  font-family: 'EB Garamond', serif;
  font-size: 14px;
  font-style: italic;
  color: rgba(232,220,200,0.55);
  margin-top: 3px;
}
.htk-btn {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 11px 28px;
  border-radius: 4px;
  border: 1px solid rgba(232,220,200,0.35);
  color: #e8dcc8;
  background: transparent;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
  cursor: pointer;
}
.htk-btn:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(232,220,200,0.6);
}

/* DETAIL PANEL */
.dp-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: dpFadeIn 0.25s ease;
}
@keyframes dpFadeIn { from { opacity: 0; } to { opacity: 1; } }
.dp-panel {
  position: relative;
  width: min(640px, 100%);
  max-height: 90vh;
  background: #0d0d1a;
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 8px;
  overflow-y: auto;
  animation: dpScaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.dp-panel::-webkit-scrollbar { width: 4px; }
.dp-panel::-webkit-scrollbar-track { background: transparent; }
.dp-panel::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
@keyframes dpScaleUp {
  from { transform: scale(0.88); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.dp-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: rgba(13,13,10,0.75);
  border: 1px solid rgba(201,168,76,0.3);
  color: #e8dcc8;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s, border-color 0.2s;
}
.dp-close:hover { background: rgba(201,168,76,0.15); border-color: #c9a84c; }
.dp-video-wrap {
  display: flex;
  justify-content: center;
  padding: 36px 24px 24px;
  background: rgba(0,0,0,0.3);
}
.dp-video {
  position: relative;
  width: 200px;
  height: 355px;
  border-radius: 8px;
  overflow: hidden;
  background: #111;
  flex-shrink: 0;
}
.dp-video-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.55);
}
.dp-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dp-play-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.35);
  transition: transform 0.2s, background 0.2s;
  cursor: pointer;
}
.dp-play-circle:hover { transform: scale(1.1); background: rgba(0,0,0,0.55); }
.dp-play-triangle {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 17px solid #fff;
  margin-left: 4px;
}
.dp-locked {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0,0,0,0.65);
  text-align: center;
  gap: 12px;
}
.dp-lock-icon { font-size: 28px; }
.dp-lock-text {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 13px;
  color: rgba(232,220,200,0.8);
  line-height: 1.5;
}
.dp-lock-btn {
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 0.12em;
  padding: 7px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: linear-gradient(135deg, #c9a84c, #e8c96a);
  color: #0d0d0a;
  font-weight: 700;
  text-transform: uppercase;
}
.dp-meta {
  padding: 24px 32px 0;
}
.dp-universe-badge {
  display: inline-block;
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 2px;
  margin-bottom: 12px;
  color: #fff;
}
.dp-char-name {
  font-family: 'Cinzel Decorative', serif;
  font-size: 28px;
  font-weight: 700;
  color: #c9a84c;
  line-height: 1.1;
  margin-bottom: 6px;
}
.dp-dates {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 15px;
  color: rgba(232,220,200,0.55);
}
.dp-divider {
  border: none;
  border-top: 1px solid rgba(201,168,76,0.15);
  margin: 20px 32px;
}
.dp-section { padding: 0 32px; }
.dp-section-label {
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.7);
  margin-bottom: 12px;
}
.dp-bio {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 16px;
  line-height: 1.75;
  color: rgba(232,220,200,0.8);
}
.dp-also-track {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.dp-also-track::-webkit-scrollbar { display: none; }
.dp-also-track { -ms-overflow-style: none; scrollbar-width: none; }
.dp-also-card {
  flex-shrink: 0;
  width: 80px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.dp-also-card:hover { opacity: 0.8; }
.dp-also-img {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 3px;
  background: #1a1a16;
}
.dp-also-name {
  font-family: 'Cinzel', serif;
  font-size: 9px;
  letter-spacing: 0.06em;
  color: rgba(232,220,200,0.65);
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.dp-bottom-pad { height: 32px; }

/* RESPONSIVE */
@media (max-width: 768px) {
  .hn { padding: 0 20px; }
  .hub { padding: 40px 20px 28px; }
  .hs { padding: 0 20px 36px; }
  .hsep { margin: 20px 20px 36px; }
  .hfooter { padding: 36px 20px; }
  .htk { padding: 22px 24px; }
  .dp-meta { padding: 20px 20px 0; }
  .dp-section { padding: 0 20px; }
  .dp-divider { margin: 16px 20px; }
  .dp-char-name { font-size: 22px; }
}
`;

/* ─────────────────────────────────────────────
   CHARACTER CARD COMPONENT
───────────────────────────────────────────── */
function CharCard({ char, onClick }) {
  return (
    <div className="hc" onClick={() => onClick(char)}>
      <div className="hc-portrait">
        <img
          className="hc-img"
          src={char.img}
          alt={char.name}
          loading="lazy"
        />
        <div className="hc-overlay">
          <span className="hc-overlay-text">Regarder</span>
        </div>
        <div className="hc-badges">
          {char.isNew && <span className="hc-badge-new">Nouveau</span>}
          {char.is_premium && <span className="hc-badge-lock">🔒</span>}
        </div>
        <span className="hc-duration">{char.duration}</span>
      </div>
      <div className="hc-info">
        <div className="hc-name">{char.name}</div>
        <div className="hc-dates">{char.dates}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHARACTER ROW COMPONENT
───────────────────────────────────────────── */
function CharRow({ label, emoji, characters, onSelect, accentColor }) {
  if (!characters || characters.length === 0) return null;
  return (
    <div className="hs">
      <div
        className="hs-head universe-bar"
        style={{ '--ucolor': accentColor || '#c9a84c' }}
      >
        {emoji && <span className="hs-emoji">{emoji}</span>}
        <h2 className="hs-title">{label}</h2>
      </div>
      <div className="hs-track">
        {characters.map(char => (
          <CharCard key={char.id} char={char} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DETAIL PANEL COMPONENT
───────────────────────────────────────────── */
function DetailPanel({ char, onClose, onSelect, isPremium }) {
  const univColor = UNIVERSE_COLORS[char.universe] || '#c9a84c';
  const univConfig = UNIVERSES.find(u => u.id === char.universe);
  const sameUniverse = CHARACTERS.filter(
    c => c.universe === char.universe && c.id !== char.id
  ).slice(0, 5);

  const handleKey = useCallback(
    e => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const showLocked = char.is_premium && !isPremium;

  return (
    <div className="dp-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dp-panel">
        <button className="dp-close" onClick={onClose}>✕</button>

        {/* Video section */}
        <div className="dp-video-wrap">
          <div className="dp-video">
            <img className="dp-video-img" src={char.img} alt={char.name} />
            {showLocked ? (
              <div className="dp-locked">
                <span className="dp-lock-icon">🔒</span>
                <p className="dp-lock-text">Débloquer avec le Pass Premium — 5€/mois</p>
                <button className="dp-lock-btn">Devenir Premium</button>
              </div>
            ) : (
              <div className="dp-play-btn">
                <div className="dp-play-circle" style={{ borderColor: univColor }}>
                  <div className="dp-play-triangle" style={{ borderLeftColor: univColor }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="dp-meta">
          <span
            className="dp-universe-badge"
            style={{ background: univColor }}
          >
            {univConfig ? univConfig.name : char.universe}
          </span>
          <div className="dp-char-name">{char.name}</div>
          <div className="dp-dates">{char.dates}</div>
        </div>

        <hr className="dp-divider" />

        {/* Bio */}
        <div className="dp-section">
          <div className="dp-section-label">Biographie</div>
          <p className="dp-bio">{char.bio}</p>
        </div>

        {sameUniverse.length > 0 && (
          <>
            <hr className="dp-divider" />
            <div className="dp-section">
              <div className="dp-section-label">Vous aimerez aussi</div>
              <div className="dp-also-track">
                {sameUniverse.map(c => (
                  <div
                    key={c.id}
                    className="dp-also-card"
                    onClick={() => onSelect(c)}
                  >
                    <img
                      className="dp-also-img"
                      src={c.img}
                      alt={c.name}
                      loading="lazy"
                    />
                    <div className="dp-also-name">{c.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <hr className="dp-divider" />
        <div className="dp-section" style={{ paddingBottom: '8px' }}>
          <a
            href="https://www.tiktok.com/@anachrona.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'rgba(232,220,200,0.55)',
              fontFamily: "'EB Garamond', serif",
              fontStyle: 'italic',
              fontSize: '13px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,220,200,0.55)'}
          >
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
              <path d="M21.5 2h-3.8v19.1a3.7 3.7 0 0 1-3.7 3.7 3.7 3.7 0 0 1-3.7-3.7 3.7 3.7 0 0 1 3.7-3.7c.36 0 .7.05 1.03.14V13.6a7.55 7.55 0 0 0-1.03-.07 7.5 7.5 0 0 0-7.5 7.5 7.5 7.5 0 0 0 7.5 7.5 7.5 7.5 0 0 0 7.5-7.5V11.4a11.1 11.1 0 0 0 6.5 2.1V9.7A7.3 7.3 0 0 1 21.5 2Z" fill="currentColor" />
            </svg>
            Retrouvez {char.name} sur @anachrona.fr
          </a>
        </div>
        <div className="dp-bottom-pad" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function CataloguePage({ user, profile }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState(null);

  const isPremium = profile?.is_premium === true;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <div style={{ background: '#0d0d0a', minHeight: '100vh' }}>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`hn${scrolled ? ' scrolled' : ''}`}>
        <div className="hn-logo" onClick={() => navigate('/')}>
          <AnachronaLogo />
        </div>
        <div className="hn-right">
          <button className="hn-btn-shuffle" onClick={() => navigate('/shuffle')}>
            ▶ Shuffle
          </button>
          <button className="hn-btn-myth" onClick={() => navigate('/mythologie')}>
            ✦ Mythologie
          </button>
          <button className="hn-btn-premium" onClick={() => navigate(user ? '/compte' : '/premium')}>
            {user ? 'Mon Compte' : 'Devenir Premium'}
          </button>
        </div>
      </nav>

      {/* UNIVERSE BAND */}
      <section className="hub">
        <p className="hub-label">Les Univers</p>
        <div className="hub-track">
          {UNIVERSES.map(u => (
            <div className="hub-item" key={u.id} onClick={() => navigate('/univers/' + u.id)}>
              <div
                className="hub-circle"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${u.color}cc, ${u.color}55)`,
                  boxShadow: `inset 0 0 0 2px ${u.color}33`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = u.color;
                  e.currentTarget.style.boxShadow = `0 0 18px ${u.color}55, inset 0 0 0 2px ${u.color}99`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = `inset 0 0 0 2px ${u.color}33`;
                }}
              >
                {u.icon}
              </div>
              <span className="hub-name">{u.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL ROWS */}
      {EDITORIAL_ROWS.map(row => {
        const chars = CHARACTERS.filter(row.filter);
        return (
          <CharRow
            key={row.id}
            label={row.label}
            emoji={row.emoji}
            characters={chars}
            onSelect={setSelected}
            accentColor="#c9a84c"
          />
        );
      })}

      {/* FOOTER */}
      <footer className="hfooter">
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <AnachronaLogo />
        </div>
        <p className="hfooter-tagline">L'Histoire vivante, à portée de main.</p>
        <p className="hfooter-copy">© 2026 Anachrona — Tous droits réservés</p>
      </footer>

      {/* TIKTOK FOOTER */}
      <TikTokFooter />

      {/* DETAIL PANEL */}
      {selected && (
        <DetailPanel
          char={selected}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
          isPremium={isPremium}
        />
      )}
    </div>
  );
}
