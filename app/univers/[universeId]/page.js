'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AnachronaLogo from '@/src/AnachronaLogo';
import { UNIVERSE_COLORS, UNIVERSES, CHARACTERS } from '@/src/data';
import TikTokFooter from '@/src/TikTokFooter';
import { useAuth } from '@/components/AuthProvider';

/* ─────────────────────────────────────────────
   ERA CLASSIFICATION
───────────────────────────────────────────── */
const ERA_ORDER = [
  { id: 'antiquite', label: 'Antiquité' },
  { id: 'moyen-age', label: 'Moyen Âge' },
  { id: 'renaissance', label: 'Renaissance & Temps Modernes' },
  { id: 'xixe-xxe', label: 'XIXe — XXe siècle' },
  { id: 'inconnue', label: 'Époque inconnue' },
];

function getEra(birth_year) {
  if (birth_year === null || birth_year === undefined) return 'inconnue';
  if (birth_year < 500) return 'antiquite';
  if (birth_year < 1400) return 'moyen-age';
  if (birth_year < 1800) return 'renaissance';
  return 'xixe-xxe';
}

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = `
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
.hn-links {
  display: flex;
  list-style: none;
  gap: 32px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.hn-links li {
  font-family: 'Cinzel', serif;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(232,220,200,0.65);
  cursor: pointer;
  transition: color 0.2s;
}
.hn-links li.active { color: #c9a84c; }
.hn-links li:hover { color: #e8c96a; }
.hn-right { display: flex; align-items: center; gap: 12px; }
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
  top: 16px; right: 16px;
  z-index: 10;
  background: rgba(13,13,10,0.75);
  border: 1px solid rgba(201,168,76,0.3);
  color: #e8dcc8;
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 16px;
  transition: background 0.2s, border-color 0.2s;
}
.dp-close:hover { background: rgba(201,168,76,0.15); border-color: #c9a84c; }
.dp-video-wrap { display: flex; justify-content: center; padding: 36px 24px 24px; background: rgba(0,0,0,0.3); }
.dp-video { position: relative; width: 200px; height: 355px; border-radius: 8px; overflow: hidden; background: #111; flex-shrink: 0; }
.dp-video-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.55); }
.dp-play-btn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.dp-play-circle { width: 56px; height: 56px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.35); transition: transform 0.2s, background 0.2s; cursor: pointer; }
.dp-play-circle:hover { transform: scale(1.1); background: rgba(0,0,0,0.55); }
.dp-play-triangle { width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 17px solid #fff; margin-left: 4px; }
.dp-locked { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; background: rgba(0,0,0,0.65); text-align: center; gap: 12px; }
.dp-lock-icon { font-size: 28px; }
.dp-lock-text { font-family: 'EB Garamond', serif; font-style: italic; font-size: 13px; color: rgba(232,220,200,0.8); line-height: 1.5; }
.dp-lock-btn { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.12em; padding: 7px 16px; border: none; border-radius: 4px; cursor: pointer; background: linear-gradient(135deg, #c9a84c, #e8c96a); color: #0d0d0a; font-weight: 700; text-transform: uppercase; }
.dp-meta { padding: 24px 32px 0; }
.dp-universe-badge { display: inline-block; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 12px; border-radius: 2px; margin-bottom: 12px; color: #fff; }
.dp-char-name { font-family: 'Cinzel Decorative', serif; font-size: 28px; font-weight: 700; color: #c9a84c; line-height: 1.1; margin-bottom: 6px; }
.dp-dates { font-family: 'EB Garamond', serif; font-style: italic; font-size: 15px; color: rgba(232,220,200,0.55); }
.dp-divider { border: none; border-top: 1px solid rgba(201,168,76,0.15); margin: 20px 32px; }
.dp-section { padding: 0 32px; }
.dp-section-label { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(201,168,76,0.7); margin-bottom: 12px; }
.dp-bio { font-family: 'EB Garamond', serif; font-style: italic; font-size: 16px; line-height: 1.75; color: rgba(232,220,200,0.8); }
.dp-also-track { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; }
.dp-also-track::-webkit-scrollbar { display: none; }
.dp-also-track { -ms-overflow-style: none; scrollbar-width: none; }
.dp-also-card { flex-shrink: 0; width: 80px; cursor: pointer; transition: opacity 0.2s; }
.dp-also-card:hover { opacity: 0.8; }
.dp-also-img { width: 80px; height: 120px; object-fit: cover; border-radius: 3px; background: #1a1a16; }
.dp-also-name { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.06em; color: rgba(232,220,200,0.65); margin-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center; }
.dp-bottom-pad { height: 32px; }

/* UNIVERSE HERO */
.uv-hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.uv-hero-bg {
  position: absolute;
  inset: 0;
  background-size: 200px 200px;
  opacity: 0.6;
}
.uv-hero-grad { position: absolute; inset: 0; }
.uv-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 64px;
  gap: 48px;
}
.uv-hero-left { flex: 1; max-width: 580px; }
.uv-hero-icon {
  font-family: 'Cinzel', serif;
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 24px;
  opacity: 0.18;
  letter-spacing: -0.02em;
  user-select: none;
}
.uv-hero-name {
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(36px, 5.5vw, 72px);
  font-weight: 900;
  color: #fff;
  line-height: 1.05;
  margin-bottom: 10px;
  text-shadow: 0 2px 30px rgba(0,0,0,0.8);
}
.uv-hero-sub {
  font-family: 'Cinzel', serif;
  font-size: 13px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 28px;
}
.uv-hero-text {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 18px;
  line-height: 1.7;
  color: rgba(232,220,200,0.8);
  margin-bottom: 36px;
  max-width: 520px;
}
.uv-hero-btn {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 13px 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #0d0d0a;
  font-weight: 700;
  transition: transform 0.2s, box-shadow 0.3s;
}
.uv-hero-btn:hover { transform: translateY(-2px); }
.uv-hero-right { flex-shrink: 0; width: 240px; }
.uv-hero-portrait {
  width: 240px;
  height: 360px;
  object-fit: cover;
  border-radius: 4px;
  filter: brightness(0.75) saturate(0.85);
  display: block;
}
.uv-hero-portrait-wrap { position: relative; }
.uv-hero-portrait-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 4px;
  pointer-events: none;
}

/* ERA SECTION LABEL */
.uv-era-section { padding: 32px 48px 0; }
.uv-era-label {
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.5);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(201,168,76,0.1);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .uv-hero-right { display: none; }
  .uv-hero-content { padding: 0 32px; }
  .uv-hero-icon { font-size: 80px; }
}
@media (max-width: 768px) {
  .hn { padding: 0 20px; }
  .hn-links { display: none; }
  .hn-btn-premium { font-size: 10px; padding: 6px 12px; letter-spacing: 0.05em; }
  .uv-hero-content { padding: 0 24px; }
  .uv-hero-icon { font-size: 64px; }
  .hs { padding: 0 20px 36px; }
  .hsep { margin: 20px 20px 36px; }
  .hfooter { padding: 36px 20px; }
  .dp-meta { padding: 20px 20px 0; }
  .dp-section { padding: 0 20px; }
  .dp-divider { margin: 16px 20px; }
  .dp-char-name { font-size: 22px; }
  .uv-era-section { padding: 24px 20px 0; }
}
`;

/* ─────────────────────────────────────────────
   CHARACTER CARD
───────────────────────────────────────────── */
function CharCard({ char, onClick }) {
  return (
    <div className="hc" onClick={() => onClick(char)}>
      <div className="hc-portrait">
        <img className="hc-img" src={char.img} alt={char.name} loading="lazy" />
        <div className="hc-overlay"><span className="hc-overlay-text">Regarder</span></div>
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
   CHARACTER ROW
───────────────────────────────────────────── */
function CharRow({ label, emoji, characters, onSelect, accentColor }) {
  if (!characters || characters.length === 0) return null;
  return (
    <div className="hs">
      <div className="hs-head universe-bar" style={{ '--ucolor': accentColor || '#c9a84c' }}>
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
   VIDEO MODAL
───────────────────────────────────────────── */
function VideoModal({ char, onClose }) {
  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.88)', zIndex:9000, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ position:'relative', width:'min(400px,90vw)', aspectRatio:'9/16', background:'#000' }}>
        <button onClick={onClose} style={{ position:'absolute', top:'-40px', right:0, background:'none', border:'none', color:'rgba(232,220,200,0.7)', fontSize:'1.4rem', cursor:'pointer', zIndex:10 }}>✕</button>
        <iframe
          style={{ width:'100%', height:'100%', border:'none' }}
          src={`https://www.youtube.com/embed/${char.youtubeId}?autoplay=1&rel=0`}
          title={`${char.name} — Anachrona`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DETAIL PANEL
───────────────────────────────────────────── */
function DetailPanel({ char, onClose, onSelect, isPremium, onPlay }) {
  const univColor = UNIVERSE_COLORS[char.universe] || '#c9a84c';
  const univConfig = UNIVERSES.find(u => u.id === char.universe);
  const sameUniverse = CHARACTERS.filter(c => c.universe === char.universe && c.id !== char.id).slice(0, 5);

  const handleKey = useCallback(e => { if (e.key === 'Escape') onClose(); }, [onClose]);
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const showLocked = char.is_premium && !isPremium;

  return (
    <div className="dp-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dp-panel">
        <button className="dp-close" onClick={onClose}>✕</button>
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
              <div className="dp-play-btn" onClick={() => char.youtubeId && onPlay(char)} style={{ cursor: char.youtubeId ? 'pointer' : 'default' }}>
                <div className="dp-play-circle" style={{ borderColor: univColor }}>
                  <div className="dp-play-triangle" style={{ borderLeftColor: univColor }} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="dp-meta">
          <span className="dp-universe-badge" style={{ background: univColor }}>
            {univConfig ? univConfig.name : char.universe}
          </span>
          <div className="dp-char-name">{char.name}</div>
          <div className="dp-dates">{char.dates}</div>
        </div>
        <hr className="dp-divider" />
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
                  <div key={c.id} className="dp-also-card" onClick={() => onSelect(c)}>
                    <img className="dp-also-img" src={c.img} alt={c.name} loading="lazy" />
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
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'rgba(232,220,200,0.55)', fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '13px', transition: 'color 0.2s' }}
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
export default function UniversePage() {
  const router = useRouter();
  const { universeId } = useParams();
  const { user, profile } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState(null);
  const [videoChar, setVideoChar] = useState(null);
  const eraRef = useRef(null);

  const isPremium = profile?.is_premium === true;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const u = UNIVERSES.find(x => x.id === universeId);

  useEffect(() => {
    if (!u) router.push('/');
  }, [u]); // eslint-disable-line

  if (!u) return null;

  const universeChars = CHARACTERS.filter(c => c.universe === universeId);

  const eraGroups = ERA_ORDER.map(era => {
    const chars = universeChars
      .filter(c => getEra(c.birth_year) === era.id)
      .sort((a, b) => {
        if (a.birth_year === null) return 1;
        if (b.birth_year === null) return -1;
        return a.birth_year - b.birth_year;
      });
    return { ...era, chars };
  }).filter(era => era.chars.length > 0);

  const multipleEras = eraGroups.length > 1;

  const firstChar = [...universeChars].sort((a, b) => {
    if (a.birth_year === null) return 1;
    if (b.birth_year === null) return -1;
    return a.birth_year - b.birth_year;
  })[0];

  const scrollToContent = () => {
    if (eraRef.current) {
      eraRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: '#0d0d0a', minHeight: '100vh' }}>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`hn${scrolled ? ' scrolled' : ''}`}>
        <div className="hn-logo" onClick={() => router.push('/')}>
          <AnachronaLogo />
        </div>
        <ul className="hn-links">
          <li onClick={() => router.push('/')}>← Histoire</li>
          <li className="active" style={{ color: u.color }}>{u.name}</li>
        </ul>
        <div className="hn-right">
          <a href="https://www.tiktok.com/@anachrona.fr" target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', color:'rgba(232,220,200,0.7)', transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(232,220,200,0.7)'}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor"><path d="M21.5 2h-3.8v19.1a3.7 3.7 0 0 1-3.7 3.7 3.7 3.7 0 0 1-3.7-3.7 3.7 3.7 0 0 1 3.7-3.7c.36 0 .7.05 1.03.14V13.6a7.55 7.55 0 0 0-1.03-.07 7.5 7.5 0 0 0-7.5 7.5 7.5 7.5 0 0 0 7.5 7.5 7.5 7.5 0 0 0 7.5-7.5V11.4a11.1 11.1 0 0 0 6.5 2.1V9.7A7.3 7.3 0 0 1 21.5 2Z"/></svg>
          </a>
          <button className="hn-btn-premium" onClick={() => router.push('/compte')}>
            {user ? 'Mon Compte' : 'Devenir Premium'}
          </button>
        </div>
      </nav>

      {/* UNIVERSE HERO */}
      <section className="uv-hero">
        {u.bgImg && (
          <img
            src={u.bgImg}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
          />
        )}
        <div className="uv-hero-bg" />
        <div className="uv-hero-grad" style={{ background: `linear-gradient(135deg, ${u.color}22 0%, #0d0d0a 60%)` }} />

        <div className="uv-hero-content">
          <div className="uv-hero-left">
            <h1 className="uv-hero-name">{u.name}</h1>
            <div className="uv-hero-sub" style={{ color: u.color }}>{u.sub}</div>
            <p className="uv-hero-text">{u.heroText}</p>
            <button
              className="uv-hero-btn"
              style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}cc)`, boxShadow: `0 0 24px ${u.color}44` }}
              onClick={scrollToContent}
            >
              Explorer les personnages
            </button>
          </div>

          {firstChar && (
            <div className="uv-hero-right">
              <div className="uv-hero-portrait-wrap" style={{ boxShadow: `0 0 40px ${u.color}33` }}>
                <img
                  className="uv-hero-portrait"
                  src={firstChar.img}
                  alt={firstChar.name}
                  style={{ borderLeft: `3px solid ${u.color}` }}
                />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '4px', background: `linear-gradient(to top, ${u.color}33 0%, transparent 50%)`, pointerEvents: 'none' }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ERA ROWS */}
      <div ref={eraRef} style={{ paddingTop: '48px' }}>
        {eraGroups.map((era, idx) => (
          <div key={era.id}>
            <CharRow
              label={multipleEras ? era.label : 'Tous les personnages'}
              emoji={null}
              characters={era.chars}
              onSelect={setSelected}
              accentColor={u.color}
            />
            {idx < eraGroups.length - 1 && <hr className="hsep" />}
          </div>
        ))}
      </div>

      {/* TIKTOK FOOTER */}
      <TikTokFooter />

      {/* FOOTER */}
      <footer className="hfooter">
        <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <AnachronaLogo />
        </div>
        <p className="hfooter-tagline">L'Histoire vivante, à portée de main.</p>
        <p className="hfooter-copy">© 2026 Anachrona — Tous droits réservés</p>
      </footer>

      {/* DETAIL PANEL */}
      {selected && (
        <DetailPanel
          char={selected}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
          isPremium={isPremium}
          onPlay={setVideoChar}
        />
      )}

      {/* VIDEO MODAL */}
      {videoChar && (
        <VideoModal char={videoChar} onClose={() => setVideoChar(null)} />
      )}
    </div>
  );
}
