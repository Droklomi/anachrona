import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnachronaLogo from './AnachronaLogo';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#04020E; color:#F5F0E8; font-family:'EB Garamond',serif; overflow-x:hidden; }
  body::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:0.5;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  }

  /* ── NAV ── */
  .mn { position:fixed; top:0; width:100%; z-index:500; padding:15px 5%; display:flex; align-items:center; justify-content:space-between; transition:background .4s; }
  .mn.scrolled { background:rgba(4,2,14,.97); border-bottom:1px solid rgba(139,92,246,.15); backdrop-filter:blur(16px); }
  .mn-back { font-family:'Cinzel',serif; font-size:.58rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(167,139,250,.65); background:none; border:1px solid rgba(167,139,250,.2); padding:8px 18px; cursor:pointer; display:flex; align-items:center; gap:8px; transition:all .3s; }
  .mn-back:hover { color:#A78BFA; border-color:rgba(167,139,250,.5); }
  .mn-title { font-family:'Cinzel',serif; font-size:.6rem; letter-spacing:.3em; text-transform:uppercase; background:linear-gradient(135deg,#E8C96A,#A78BFA); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .mn-cta { font-family:'Cinzel',serif; font-size:.58rem; letter-spacing:.22em; text-transform:uppercase; color:#09090F; background:linear-gradient(135deg,#E8C96A 0%,#A78BFA 100%); padding:9px 22px; border:none; cursor:pointer; transition:all .3s; }
  .mn-cta:hover { box-shadow:0 0 22px rgba(167,139,250,.45); transform:translateY(-1px); }

  /* ── HERO ── */
  .mh { position:relative; height:75vh; min-height:480px; overflow:hidden; background:#04020E; display:flex; align-items:center; justify-content:center; }
  .mh-stars { position:absolute; inset:0; pointer-events:none; }
  .mh-star { position:absolute; background:#fff; border-radius:50%; animation:mstar var(--d) ease-in-out infinite var(--dl); }
  @keyframes mstar { 0%,100%{opacity:var(--lo)} 50%{opacity:var(--hi)} }
  .mh-ring { position:absolute; top:50%; left:50%; border-radius:50%; animation:mring linear infinite; }
  @keyframes mring { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
  .mh-glow { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:600px; height:600px; background:radial-gradient(circle,rgba(109,40,217,.15) 0%,transparent 65%); pointer-events:none; }
  .mh-glow2 { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:400px; height:400px; background:radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 60%); pointer-events:none; }
  .mh-content { position:relative; z-index:2; text-align:center; max-width:700px; padding:0 5%; }
  .mh-eyebrow { font-family:'Cinzel',serif; font-size:.5rem; letter-spacing:.6em; text-transform:uppercase; color:rgba(167,139,250,.65); margin-bottom:20px; display:flex; align-items:center; justify-content:center; gap:20px; }
  .mh-eyebrow::before,.mh-eyebrow::after { content:''; display:block; width:60px; height:1px; background:rgba(167,139,250,.3); }
  .mh-title { font-family:'Cinzel Decorative',serif; font-size:clamp(2.2rem,7vw,5rem); background:linear-gradient(135deg,#E8C96A 0%,#A78BFA 45%,#E8C96A 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; letter-spacing:.06em; line-height:1.1; margin-bottom:12px; }
  .mh-sub { font-family:'Cinzel',serif; font-size:clamp(.52rem,1.2vw,.66rem); letter-spacing:.4em; text-transform:uppercase; color:rgba(167,139,250,.55); margin-bottom:24px; }
  .mh-desc { font-style:italic; font-size:clamp(.9rem,1.6vw,1.02rem); color:rgba(212,201,176,.6); line-height:1.85; max-width:500px; margin:0 auto; }
  .mh-bottom { position:absolute; bottom:0; left:0; right:0; height:80px; background:linear-gradient(to top,#04020E,transparent); }

  /* ── SECTION ── */
  .ms { position:relative; overflow:hidden; }
  .ms-bg-pattern { position:absolute; inset:0; pointer-events:none; z-index:0; }
  .ms-bg-img { position:absolute; inset:0; background-size:cover; background-position:center; filter:brightness(.18) saturate(.45); z-index:0; }
  .ms-bg-glow { position:absolute; inset:0; pointer-events:none; z-index:1; }
  .ms-fade-t { position:absolute; top:0; left:0; right:0; height:80px; pointer-events:none; z-index:2; }
  .ms-fade-b { position:absolute; bottom:0; left:0; right:0; height:80px; pointer-events:none; z-index:2; }
  .ms-inner { position:relative; z-index:3; padding:60px 0 52px; }

  /* section header */
  .ms-header { padding:0 clamp(24px,5%,80px) 28px; position:relative; overflow:hidden; }
  .ms-watermark { position:absolute; right:clamp(24px,5%,80px); top:50%; transform:translateY(-50%); font-family:'Cinzel Decorative',serif; font-size:clamp(5rem,12vw,9rem); letter-spacing:.05em; line-height:1; pointer-events:none; user-select:none; white-space:nowrap; }
  .ms-header-label { font-family:'Cinzel',serif; font-size:.48rem; letter-spacing:.55em; text-transform:uppercase; margin-bottom:8px; opacity:.75; }
  .ms-header-title { font-family:'Cinzel Decorative',serif; font-size:clamp(1.3rem,3vw,2rem); letter-spacing:.05em; margin-bottom:5px; line-height:1.15; }
  .ms-header-sub { font-style:italic; font-size:clamp(.82rem,1.4vw,.93rem); color:rgba(212,201,176,.5); }
  .ms-header-deco { margin-top:16px; font-size:1.2rem; opacity:.5; letter-spacing:.3em; }
  .ms-header-line { margin-top:12px; height:1px; width:60px; }

  /* Norse top border decoration */
  .ms-rune-border { width:100%; height:20px; background-image:repeating-linear-gradient(90deg,transparent 0,transparent 14px,rgba(112,128,204,.35) 14px,rgba(112,128,204,.35) 15px); position:absolute; top:0; left:0; }
  .ms-rune-border-b { width:100%; height:20px; background-image:repeating-linear-gradient(90deg,transparent 0,transparent 14px,rgba(112,128,204,.35) 14px,rgba(112,128,204,.35) 15px); position:absolute; bottom:0; left:0; }

  /* Egyptian top border */
  .ms-egypt-top { position:absolute; top:0; left:0; right:0; height:6px; background:repeating-linear-gradient(90deg,rgba(196,144,20,.5) 0,rgba(196,144,20,.5) 6px,rgba(120,80,10,.3) 6px,rgba(120,80,10,.3) 12px,rgba(196,144,20,.5) 12px,rgba(196,144,20,.5) 18px,transparent 18px,transparent 24px); }
  .ms-egypt-bot { position:absolute; bottom:0; left:0; right:0; height:6px; background:repeating-linear-gradient(90deg,rgba(196,144,20,.5) 0,rgba(196,144,20,.5) 6px,rgba(120,80,10,.3) 6px,rgba(120,80,10,.3) 12px,rgba(196,144,20,.5) 12px,rgba(196,144,20,.5) 18px,transparent 18px,transparent 24px); }

  /* Greek key border */
  .ms-greek-top { position:absolute; top:0; left:0; right:0; height:8px; background:repeating-linear-gradient(90deg,rgba(180,120,60,.4) 0,rgba(180,120,60,.4) 8px,transparent 8px,transparent 16px,rgba(180,120,60,.2) 16px,rgba(180,120,60,.2) 24px,transparent 24px,transparent 32px); }
  .ms-greek-bot { position:absolute; bottom:0; left:0; right:0; height:8px; background:repeating-linear-gradient(90deg,rgba(180,120,60,.4) 0,rgba(180,120,60,.4) 8px,transparent 8px,transparent 16px,rgba(180,120,60,.2) 16px,rgba(180,120,60,.2) 24px,transparent 24px,transparent 32px); }

  /* ── ROW ── */
  .mr { margin-bottom:8px; }
  .mr-head { display:flex; align-items:center; justify-content:space-between; padding:0 clamp(24px,5%,80px); margin-bottom:14px; }
  .mr-left { display:flex; align-items:center; gap:12px; }
  .mr-accent { width:3px; height:26px; border-radius:2px; flex-shrink:0; }
  .mr-title { font-family:'Cinzel',serif; font-size:clamp(.75rem,1.8vw,.95rem); letter-spacing:.15em; color:#F5F0E8; text-transform:uppercase; }
  .mr-sub { font-style:italic; font-size:clamp(.7rem,1.3vw,.82rem); color:rgba(212,201,176,.4); margin-left:10px; }
  .mr-scroll-wrap { position:relative; }
  .mr-scroll { display:flex; gap:11px; overflow-x:auto; padding:6px clamp(24px,5%,80px) 20px; scrollbar-width:none; -ms-overflow-style:none; }
  .mr-scroll::-webkit-scrollbar { display:none; }
  .mr-arrow { position:absolute; top:50%; transform:translateY(-50%); width:36px; height:72px; border:none; cursor:pointer; font-size:1.6rem; display:flex; align-items:center; justify-content:center; z-index:10; opacity:0; pointer-events:none; transition:opacity .3s; background:transparent; color:rgba(245,240,232,.7); }
  .mr-arrow.l { left:6px; }
  .mr-arrow.r { right:6px; }
  .mr-scroll-wrap:hover .mr-arrow { opacity:1; pointer-events:all; }
  .mr-arrow:hover { color:#fff; }

  /* ── CARD ── */
  .mc { position:relative; flex-shrink:0; width:162px; cursor:pointer; transition:transform .4s cubic-bezier(.16,1,.3,1); z-index:1; }
  .mc:hover { transform:scale(1.1) translateY(-8px); z-index:20; }
  .mc-inner { border-radius:4px; overflow:hidden; aspect-ratio:9/16; position:relative; box-shadow:0 6px 28px rgba(0,0,0,.7); transition:box-shadow .4s; }
  .mc:hover .mc-inner { box-shadow:0 12px 48px rgba(0,0,0,.9); }
  .mc-top-bar { position:absolute; top:0; left:0; right:0; height:3px; z-index:3; }
  .mc-img { width:100%; height:100%; object-fit:cover; display:block; transition:filter .4s,transform .4s; filter:brightness(.82) saturate(.7); }
  .mc:hover .mc-img { filter:brightness(.6); transform:scale(1.05); }
  .mc-grad { position:absolute; inset:0; background:linear-gradient(to top,rgba(4,2,14,1) 0%,rgba(4,2,14,.5) 35%,rgba(4,2,14,.1) 60%,transparent 80%); }
  .mc-tint { position:absolute; inset:0; opacity:.12; mix-blend-mode:color; }
  .mc-dur { position:absolute; top:10px; right:10px; font-family:'Cinzel',serif; font-size:.44rem; letter-spacing:.1em; color:rgba(245,240,232,.75); background:rgba(4,2,14,.8); border:1px solid rgba(245,240,232,.1); padding:2px 7px; border-radius:2px; z-index:3; }
  .mc-lock { position:absolute; inset:0; background:rgba(4,2,14,.65); backdrop-filter:blur(4px); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; z-index:4; }
  .mc-lock-glyph { font-size:1.4rem; filter:drop-shadow(0 0 8px rgba(167,139,250,.5)); }
  .mc-lock-text { font-family:'Cinzel',serif; font-size:.4rem; letter-spacing:.2em; color:rgba(167,139,250,.8); text-transform:uppercase; text-align:center; line-height:1.8; }
  .mc-play { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) scale(.5); width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .3s,transform .35s cubic-bezier(.16,1,.3,1); z-index:4; }
  .mc:hover .mc-play { opacity:1; transform:translate(-50%,-50%) scale(1); }
  .mc-play-tri { width:0; height:0; border-top:6px solid transparent; border-bottom:6px solid transparent; border-left:11px solid #09090F; margin-left:3px; }
  .mc-info { position:absolute; bottom:0; left:0; right:0; padding:12px 10px 10px; z-index:3; }
  .mc-name { font-family:'Cinzel',serif; font-size:.56rem; letter-spacing:.12em; color:#F5F0E8; margin-bottom:3px; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; transition:color .3s; }
  .mc:hover .mc-name { color:#E8C96A; }
  .mc-desc { font-style:italic; font-size:.62rem; color:rgba(245,240,232,.5); line-height:1.35; overflow:hidden; max-height:0; opacity:0; transition:max-height .3s,opacity .3s; }
  .mc:hover .mc-desc { max-height:36px; opacity:1; }

  /* ── PASS CTA ── */
  .mp-cta { text-align:center; padding:40px 5% 80px; }
  .mp-box { display:inline-block; max-width:560px; width:100%; background:rgba(4,2,14,.85); border:1px solid rgba(109,40,217,.25); padding:48px clamp(28px,6vw,64px); position:relative; backdrop-filter:blur(12px); }
  .mp-box::before { content:''; position:absolute; top:-1px; left:-1px; width:32px; height:32px; border-top:1.5px solid rgba(167,139,250,.6); border-left:1.5px solid rgba(167,139,250,.6); }
  .mp-box::after { content:''; position:absolute; bottom:-1px; right:-1px; width:32px; height:32px; border-bottom:1.5px solid rgba(167,139,250,.6); border-right:1.5px solid rgba(167,139,250,.6); }
  .mp-glyph { font-size:2.4rem; display:block; margin-bottom:18px; filter:drop-shadow(0 0 16px rgba(167,139,250,.5)); }
  .mp-title { font-family:'Cinzel Decorative',serif; font-size:clamp(1rem,2.5vw,1.5rem); background:linear-gradient(135deg,#E8C96A,#A78BFA); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:14px; }
  .mp-desc { font-style:italic; font-size:clamp(.88rem,1.5vw,.98rem); color:rgba(212,201,176,.55); line-height:1.8; margin-bottom:28px; }
  .mp-list { list-style:none; margin-bottom:32px; display:inline-flex; flex-direction:column; gap:8px; text-align:left; }
  .mp-list li { font-family:'Cinzel',serif; font-size:.52rem; letter-spacing:.15em; color:rgba(212,201,176,.65); text-transform:uppercase; display:flex; align-items:center; gap:10px; }
  .mp-list li::before { content:'◆'; font-size:.35rem; color:rgba(167,139,250,.7); }
  .mp-btn { font-family:'Cinzel',serif; font-size:.6rem; letter-spacing:.28em; text-transform:uppercase; color:#09090F; background:linear-gradient(135deg,#E8C96A,#A78BFA); padding:15px 40px; border:none; cursor:pointer; transition:all .35s; box-shadow:0 4px 28px rgba(167,139,250,.2); }
  .mp-btn:hover { transform:translateY(-2px); box-shadow:0 8px 48px rgba(167,139,250,.45); }

  /* ── DETAIL PANEL ── */
  .dp-overlay { position:fixed; inset:0; background:rgba(0,0,0,.78); z-index:800; backdrop-filter:blur(8px); animation:dpin .3s forwards; display:flex; align-items:center; justify-content:center; padding:20px; }
  @keyframes dpin { from{opacity:0} to{opacity:1} }
  .dp-panel { position:relative; width:min(660px,100%); max-height:90vh; background:#0A0818; overflow-y:auto; z-index:801; scrollbar-width:thin; scrollbar-color:rgba(167,139,250,.2) transparent; animation:dppop .38s cubic-bezier(.16,1,.3,1) forwards; border:1px solid rgba(167,139,250,.1); }
  @keyframes dppop { from{opacity:0;transform:scale(.94) translateY(24px)} to{opacity:1;transform:none} }
  .dp-close { position:absolute; top:14px; right:14px; background:rgba(245,240,232,.08); border:1px solid rgba(245,240,232,.15); color:rgba(245,240,232,.7); width:34px; height:34px; border-radius:50%; cursor:pointer; font-size:1.1rem; display:flex; align-items:center; justify-content:center; z-index:10; transition:all .2s; }
  .dp-close:hover { background:rgba(245,240,232,.15); color:#fff; }
  .dp-video-head { display:flex; justify-content:center; padding:44px 0 28px; }
  .dp-short { width:210px; aspect-ratio:9/16; position:relative; overflow:hidden; cursor:pointer; flex-shrink:0; }
  .dp-short-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(.6) saturate(.7); }
  .dp-short-play { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; z-index:2; transition:transform .2s; }
  .dp-short:hover .dp-short-play { transform:translate(-50%,-50%) scale(1.12); }
  .dp-video-tri { width:0; height:0; border-top:9px solid transparent; border-bottom:9px solid transparent; border-left:16px solid #09090F; margin-left:3px; }
  .dp-meta { padding:0 40px 8px; text-align:center; }
  .dp-cat-badge { display:inline-flex; align-items:center; gap:6px; font-family:'Cinzel',serif; font-size:.46rem; letter-spacing:.3em; text-transform:uppercase; padding:4px 12px; border:1px solid; margin-bottom:12px; }
  .dp-name { font-family:'Cinzel Decorative',serif; font-size:clamp(1.5rem,4vw,2.1rem); letter-spacing:.04em; line-height:1.1; margin-bottom:6px; }
  .dp-epoque { font-family:'Cinzel',serif; font-size:.52rem; letter-spacing:.2em; color:rgba(212,201,176,.5); text-transform:uppercase; }
  .dp-body { padding:24px 40px 32px; }
  .dp-section-title { font-family:'Cinzel',serif; font-size:.5rem; letter-spacing:.35em; text-transform:uppercase; margin-bottom:14px; }
  .dp-bio { font-style:italic; font-size:clamp(.92rem,1.4vw,1.02rem); color:rgba(212,201,176,.78); line-height:1.95; }
  .dp-divider { height:1px; background:linear-gradient(to right,transparent,rgba(167,139,250,.25),transparent); margin:28px 0; }
  .dp-sugg { padding:0 40px 48px; }
  .dp-sugg-row { display:flex; gap:14px; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
  .dp-sugg-row::-webkit-scrollbar { display:none; }
  .dp-sugg-card { flex:0 0 108px; cursor:pointer; transition:opacity .2s; }
  .dp-sugg-card:hover { opacity:.75; }
  .dp-sugg-img-wrap { width:108px; aspect-ratio:2/3; overflow:hidden; position:relative; margin-bottom:8px; }
  .dp-sugg-img { width:100%; height:100%; object-fit:cover; filter:brightness(.7); transition:filter .2s; }
  .dp-sugg-card:hover .dp-sugg-img { filter:brightness(.95); }
  .dp-sugg-name { font-family:'Cinzel',serif; font-size:.5rem; letter-spacing:.06em; color:rgba(212,201,176,.65); line-height:1.35; }
  .dp-sugg-epoque { font-size:.7rem; color:rgba(212,201,176,.35); margin-top:3px; font-style:italic; }

  /* ── FOOTER ── */
  .mfoot { display:flex; align-items:center; gap:20px; padding:40px clamp(24px,5%,80px) 32px; border-top:1px solid rgba(167,139,250,.08); }
  .mfoot-line { flex:1; height:1px; background:linear-gradient(to right,rgba(167,139,250,.15),transparent); }
  .mfoot-line.r { background:linear-gradient(to left,rgba(167,139,250,.15),transparent); }

  @media(max-width:768px) { .mn-title{display:none} .mc{width:132px} }
`;

// ── DA CONFIG ─────────────────────────────────────────────────────────────────

const DA = {
  'mythologie-nordique': {
    bg: '#04060E',
    bgImg: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=80&fit=crop',
    pattern: ``,
    glow: `radial-gradient(ellipse at 50% 30%,rgba(112,128,204,.2) 0%,transparent 60%)`,
    accent: '#7080CC', titleColor: '#A0B0E8',
    label: 'ᚨ  ASGARD · VALHALLA · RAGNARÖK  ᚨ',
    sublabel: 'Les Dieux du Grand Nord',
    watermark: 'ODIN',
    deco: 'runic',
  },
  'mythologie-egyptienne': {
    bg: '#0C0800',
    bgImg: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1600&q=80&fit=crop',
    pattern: ``,
    glow: `radial-gradient(ellipse at 60% 40%,rgba(196,144,20,.2) 0%,transparent 55%)`,
    accent: '#C49014', titleColor: '#E8C060',
    label: '☥  MEMPHIS · THÈBES · L\'ÉTERNITÉ  ☥',
    sublabel: "Dieux du Nil & de l'Au-delà",
    watermark: 'RA',
    deco: 'egypt',
  },
  'mythologie-grecque': {
    bg: '#0E0A04',
    bgImg: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1600&q=80&fit=crop',
    pattern: ``,
    glow: `radial-gradient(ellipse at 40% 55%,rgba(180,120,60,.18) 0%,transparent 55%)`,
    accent: '#B87830', titleColor: '#D4A060',
    label: 'Ω  L\'OLYMPE · L\'ODYSSÉE · LES HÉROS  Ω',
    sublabel: 'Dieux & Mortels de la Grèce Antique',
    watermark: 'ZEUS',
    deco: 'greek',
  },
};

// ── VERTICALS DATA ────────────────────────────────────────────────────────────

const VERTICALS = [
  {
    id: 'mythologie-nordique', titre: 'Mythologie Nordique', subtitle: 'Ragnarök & Valhalla',
    videos: [
      { id: 'mn1', titre: 'Odin', desc: 'Le père de tous', img: 'https://picsum.photos/seed/odin-allfather/400/700', duration: '1:02', epoque: 'Temps mythiques', bio: "Dieu suprême de la mythologie nordique, Odin sacrifia son œil à la fontaine de Mimir pour obtenir la sagesse et pendit neuf jours à l'arbre-monde Yggdrasil pour découvrir les runes. [Description complète à rédiger]" },
      { id: 'mn2', titre: 'Thor', desc: 'Le tonnerre de Midgard', img: 'https://picsum.photos/seed/thor-hammer/400/700', duration: '1:01', epoque: 'Temps mythiques', bio: "Fils d'Odin, dieu du tonnerre, Thor protège les humains avec son marteau Mjöllnir. Son combat éternel contre le serpent de Midgard se terminera lors du Ragnarök. [Description complète à rédiger]" },
      { id: 'mn3', titre: 'Loki', desc: 'Le dieu du chaos', img: 'https://picsum.photos/seed/loki-trickster/400/700', duration: '0:59', epoque: 'Temps mythiques', bio: "Dieu de la ruse et de la transformation, Loki oscille entre bienfaiteur et fauteur de troubles jusqu'à provoquer la mort de Baldr et déclencher le Ragnarök. [Description complète à rédiger]" },
      { id: 'mn4', titre: 'Freya', desc: "Déesse de l'amour et la guerre", img: 'https://picsum.photos/seed/freya-goddess/400/700', duration: '1:00', epoque: 'Temps mythiques', bio: "Déesse vanique de l'amour, de la fertilité et de la guerre, Freya parcourt les champs de bataille pour recueillir la moitié des guerriers tombés. [Description complète à rédiger]" },
      { id: 'mn5', titre: 'Ragnarök', desc: 'La fin des dieux', img: 'https://picsum.photos/seed/ragnarok-twilight/400/700', duration: '1:03', epoque: 'Fin des temps', bio: "Le Crépuscule des Dieux — bataille finale qui verra la mort d'Odin, de Thor et de la plupart des Ases, suivie d'un renouveau du monde. [Description complète à rédiger]" },
      { id: 'mn6', titre: 'Valhalla', desc: 'Le paradis des guerriers', img: 'https://picsum.photos/seed/valhalla-warriors/400/700', duration: '0:58', epoque: 'Temps mythiques', bio: "Le hall d'Odin où les guerriers tombés au combat, les Einherjar, se préparent éternellement pour le Ragnarök en festoyant et se battant chaque jour. [Description complète à rédiger]" },
    ]
  },
  {
    id: 'mythologie-egyptienne', titre: 'Mythologie Égyptienne', subtitle: "Dieux du Nil & de l'Au-delà",
    videos: [
      { id: 'me1', titre: 'Osiris', desc: 'Le seigneur des morts', img: 'https://picsum.photos/seed/osiris-death/400/700', duration: '1:01', epoque: 'Temps des pharaons', bio: "Dieu de la mort et de la résurrection, Osiris fut assassiné par Set puis ressuscité par Isis. Il règne sur le royaume des morts et préside au jugement des âmes. [Description complète à rédiger]" },
      { id: 'me2', titre: 'Rà', desc: 'Le dieu soleil', img: 'https://picsum.photos/seed/ra-sun-egypt/400/700', duration: '0:59', epoque: 'Temps des pharaons', bio: "Dieu solaire par excellence, Rà navigue chaque jour dans sa barque solaire à travers le ciel, avant de traverser le monde souterrain la nuit pour renaître à l'aube. [Description complète à rédiger]" },
      { id: 'me3', titre: 'Anubis', desc: 'Le peseur des âmes', img: 'https://picsum.photos/seed/anubis-jackal/400/700', duration: '1:02', epoque: 'Temps des pharaons', bio: "Dieu à tête de chacal, Anubis guide les morts dans l'Au-delà et préside à la pesée du cœur contre la plume de Maât pour juger l'âme du défunt. [Description complète à rédiger]" },
      { id: 'me4', titre: 'Isis', desc: 'La grande magie', img: 'https://picsum.photos/seed/isis-magic/400/700', duration: '1:00', epoque: 'Temps des pharaons', bio: "Déesse de la magie et de la maternité, Isis ressuscita Osiris et protégea son fils Horus. Son culte s'étendit jusqu'à Rome et Pompéi. [Description complète à rédiger]" },
      { id: 'me5', titre: 'Horus', desc: "L'œil du faucon", img: 'https://picsum.photos/seed/horus-falcon/400/700', duration: '0:58', epoque: 'Temps des pharaons', bio: "Dieu à tête de faucon, fils d'Osiris et d'Isis, Horus incarne la royauté et vengea son père contre Set. L'œil d'Horus reste le symbole protecteur de l'Égypte. [Description complète à rédiger]" },
      { id: 'me6', titre: 'Seth', desc: 'Le dieu des tempêtes', img: 'https://picsum.photos/seed/seth-storm/400/700', duration: '1:01', epoque: 'Temps des pharaons', bio: "Dieu du chaos, des déserts et des tempêtes, Seth tua et démembra son frère Osiris avant d'être vaincu par Horus dans leur combat légendaire. [Description complète à rédiger]" },
    ]
  },
  {
    id: 'mythologie-grecque', titre: 'Mythologie Grecque', subtitle: "L'Olympe & ses Héros",
    videos: [
      { id: 'mg1', titre: 'Zeus', desc: "Le maître de l'Olympe", img: 'https://picsum.photos/seed/zeus-olympus/400/700', duration: '1:02', epoque: 'Temps mythiques', bio: "Roi des dieux olympiens, maître du tonnerre et de la foudre, Zeus règne sur l'Olympe et les affaires humaines depuis le chaos primordial. [Description complète à rédiger]" },
      { id: 'mg2', titre: 'Hercule', desc: 'Les douze travaux', img: 'https://picsum.photos/seed/hercules-labors/400/700', duration: '1:01', epoque: 'Époque héroïque', bio: "Demi-dieu fils de Zeus, Héraclès accomplit douze travaux impossibles imposés par Eurysthée pour expier un crime commis dans la folie d'Héra. [Description complète à rédiger]" },
      { id: 'mg3', titre: 'Achille', desc: 'Le talon fatal', img: 'https://picsum.photos/seed/achilles-heel/400/700', duration: '0:59', epoque: 'Guerre de Troie', bio: "Guerrier quasi invulnérable, héros de l'Iliade, Achille choisit une vie courte et glorieuse plutôt qu'une longue vie sans gloire. Son seul point faible : son talon. [Description complète à rédiger]" },
      { id: 'mg4', titre: 'Ulysse', desc: "L'Odyssée", img: 'https://picsum.photos/seed/odysseus-odyssey/400/700', duration: '1:03', epoque: 'Après Troie', bio: "Roi d'Ithaque, le plus rusé des héros grecs, Ulysse mit dix ans à rentrer chez lui après la guerre de Troie, affrontant Cyclopes, Sirènes et dieux jaloux. [Description complète à rédiger]" },
      { id: 'mg5', titre: 'Médée', desc: 'Amour & vengeance', img: 'https://picsum.photos/seed/medea-tragedy/400/700', duration: '0:58', epoque: 'Époque héroïque', bio: "Magicienne de Colchide, Médée aida Jason à conquérir la Toison d'Or avant d'être abandonnée et de se venger dans l'un des drames les plus noirs de la mythologie. [Description complète à rédiger]" },
      { id: 'mg6', titre: 'Persée', desc: 'Le tueur de Méduse', img: 'https://picsum.photos/seed/perseus-medusa/400/700', duration: '1:00', epoque: 'Époque héroïque', bio: "Fils de Zeus et de Danaé, Persée décapita Méduse la Gorgone grâce au bouclier-miroir d'Athéna et sauva Andromède du monstre marin. [Description complète à rédiger]" },
    ]
  },
];

// ── STARS ─────────────────────────────────────────────────────────────────────

const STARS = Array.from({length:120},(_,i)=>({id:i,top:Math.random()*100,left:Math.random()*100,size:Math.random()*2+.4,d:(Math.random()*5+2).toFixed(1),dl:`-${(Math.random()*6).toFixed(1)}s`,lo:(Math.random()*.08+.02).toFixed(2),hi:(Math.random()*.7+.2).toFixed(2)}));

// ── DETAIL PANEL ──────────────────────────────────────────────────────────────

function DetailPanel({ video, vertical, onClose, onSelect }) {
  const da = DA[vertical.id];
  const suggestions = vertical.videos.filter(v => v.id !== video.id).slice(0, 6);

  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <div className="dp-overlay" onClick={onClose}>
      <div className="dp-panel" onClick={e => e.stopPropagation()}>
        <button className="dp-close" onClick={onClose}>✕</button>

        <div className="dp-video-head">
          <div className="dp-short">
            <img className="dp-short-img" src={video.img} alt={video.titre} />
            <div className="dp-short-play" style={{ background: da.accent }}>
              <div className="dp-video-tri" />
            </div>
          </div>
        </div>

        <div className="dp-meta">
          <div className="dp-cat-badge" style={{ color: da.accent, borderColor: `${da.accent}55`, background: `${da.accent}18` }}>{vertical.titre}</div>
          <div className="dp-name" style={{ color: da.titleColor }}>{video.titre}</div>
          <div className="dp-epoque">{video.epoque}</div>
        </div>

        <div className="dp-body">
          <div className="dp-divider" />
          <div className="dp-section-title" style={{ color: da.accent }}>Biographie</div>
          <p className="dp-bio">{video.bio}</p>
        </div>

        {suggestions.length > 0 && (
          <div className="dp-sugg">
            <div className="dp-divider" />
            <div className="dp-section-title" style={{ color: da.accent }}>Vous aimerez aussi</div>
            <div className="dp-sugg-row">
              {suggestions.map(s => (
                <div key={s.id} className="dp-sugg-card" onClick={() => onSelect(s)}>
                  <div className="dp-sugg-img-wrap">
                    <img className="dp-sugg-img" src={s.img} alt={s.titre} loading="lazy" />
                  </div>
                  <div className="dp-sugg-name">{s.titre}</div>
                  <div className="dp-sugg-epoque">{s.epoque}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MYTH CARD ─────────────────────────────────────────────────────────────────

function MythCard({ video, accent, locked, onSelect }) {
  return (
    <div className="mc" onClick={() => !locked && onSelect(video)}>
      <div className="mc-inner" style={{ '--accent': accent }}>
        <div className="mc-top-bar" style={{ background: accent }} />
        <img className="mc-img" src={video.img} alt={video.titre} loading="lazy" />
        <div className="mc-grad" />
        <div className="mc-tint" style={{ background: accent }} />
        <div className="mc-dur">{video.duration}</div>
        {locked ? (
          <div className="mc-lock">
            <span className="mc-lock-glyph">🔮</span>
            <span className="mc-lock-text">Pass<br />Mythologie</span>
          </div>
        ) : (
          <div className="mc-play" style={{ background: `${accent}ee`, boxShadow: `0 0 0 8px ${accent}18` }}>
            <div className="mc-play-tri" />
          </div>
        )}
        <div className="mc-info">
          <div className="mc-name">{video.titre}</div>
          <div className="mc-desc">{video.desc}</div>
        </div>
      </div>
    </div>
  );
}

// ── MYTH ROW ──────────────────────────────────────────────────────────────────

function MythRow({ vertical, locked, onSelect }) {
  const scrollRef = useRef(null);
  const da = DA[vertical.id];
  const scroll = dir => scrollRef.current?.scrollBy({ left: dir * 600, behavior: 'smooth' });

  return (
    <div className="mr">
      <div className="mr-head">
        <div className="mr-left">
          <div className="mr-accent" style={{ background: `linear-gradient(to bottom,${da.accent},transparent)` }} />
          <div>
            <span className="mr-title" style={{ color: da.titleColor }}>{vertical.titre}</span>
            <span className="mr-sub">{vertical.subtitle}</span>
          </div>
        </div>
      </div>
      <div className="mr-scroll-wrap">
        <button className="mr-arrow l" onClick={() => scroll(-1)}>‹</button>
        <div className="mr-scroll" ref={scrollRef}>
          {vertical.videos.map(v => <MythCard key={v.id} video={v} accent={da.accent} locked={locked} onSelect={onSelect} />)}
        </div>
        <button className="mr-arrow r" onClick={() => scroll(1)}>›</button>
      </div>
    </div>
  );
}

// ── SECTION BLOCK ─────────────────────────────────────────────────────────────

function MythSection({ vertical, locked, onSelect }) {
  const da = DA[vertical.id];
  const isNorse = vertical.id === 'mythologie-nordique';
  const isEgypt = vertical.id === 'mythologie-egyptienne';
  const isGreek = vertical.id === 'mythologie-grecque';

  return (
    <section className="ms" style={{ background: da.bg }}>
      {da.bgImg && <div className="ms-bg-img" style={{ backgroundImage: `url(${da.bgImg})` }} />}
      <div className="ms-bg-pattern" style={{ backgroundImage: da.pattern, position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />
      <div className="ms-bg-glow" style={{ background: da.glow }} />
      {isNorse && <><div className="ms-rune-border" /><div className="ms-rune-border-b" /></>}
      {isEgypt && <><div className="ms-egypt-top" /><div className="ms-egypt-bot" /></>}
      {isGreek && <><div className="ms-greek-top" /><div className="ms-greek-bot" /></>}
      <div className="ms-fade-t" style={{ background: `linear-gradient(to bottom,#04020E,transparent)` }} />
      <div className="ms-fade-b" style={{ background: `linear-gradient(to top,#04020E,transparent)` }} />

      <div className="ms-inner">
        <div className="ms-header">
          <div className="ms-watermark" style={{ color: `${da.accent}14` }}>{da.watermark}</div>
          <div className="ms-header-label" style={{ color: da.accent }}>{da.label}</div>
          <div className="ms-header-title" style={{ color: da.titleColor }}>{vertical.titre}</div>
          <div className="ms-header-sub">{vertical.subtitle}</div>
          {isNorse && <div className="ms-header-deco" style={{ color: da.accent }}>ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ</div>}
          {isEgypt && <div className="ms-header-deco" style={{ color: da.accent }}>☥  𓂀  ✦  ☥</div>}
          {isGreek && <div className="ms-header-deco" style={{ color: da.accent }}>α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω</div>}
          <div className="ms-header-line" style={{ background: `linear-gradient(to right,${da.accent}66,transparent)` }} />
        </div>
        <MythRow vertical={vertical} locked={locked} onSelect={onSelect} />
      </div>
    </section>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function MythologiePage({ user, profile }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState(null);
  const isPremium = profile?.is_premium_mythologie || false;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{ background: '#04020E', minHeight: '100vh' }}>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`mn ${scrolled ? 'scrolled' : ''}`}>
        <button className="mn-back" onClick={() => navigate('/')}>← Histoire</button>
        <span className="mn-title">Anachrona Mythologie</span>
        <button className="mn-cta" onClick={() => navigate('/login')}>
          {user ? 'Mon Compte' : 'Obtenir le Pass'}
        </button>
      </nav>

      {/* HERO COSMIQUE */}
      <div className="mh">
        <div className="mh-stars">
          {STARS.map(s => (
            <div key={s.id} className="mh-star" style={{ top:`${s.top}%`, left:`${s.left}%`, width:`${s.size}px`, height:`${s.size}px`, '--d':`${s.d}s`, '--dl':s.dl, '--lo':s.lo, '--hi':s.hi }} />
          ))}
          {[180,280,390,510,640].map((sz,i) => (
            <div key={i} className="mh-ring" style={{ width:sz, height:sz, border:`1px solid rgba(${i%2?'167,139,250':'201,168,76'},.08)`, animationDuration:`${45+i*15}s`, animationDirection:i%2?'reverse':'normal' }} />
          ))}
          <div className="mh-glow" />
          <div className="mh-glow2" />
        </div>
        <div className="mh-content">
          <div className="mh-eyebrow">Univers Étendu</div>
          <div className="mh-title">Anachrona Mythologie</div>
          <div className="mh-sub">Le Royaume des Dieux & des Légendes</div>
          <p className="mh-desc">Nordique, Égyptienne, Grecque — trois panthéons au carrefour du mythe et de l'Histoire, racontés par l'intelligence artificielle.</p>
        </div>
        <div className="mh-bottom" />
      </div>

      {/* 3 SECTIONS MYTHOLOGIE */}
      {VERTICALS.map(v => (
        <MythSection
          key={v.id}
          vertical={v}
          locked={!isPremium}
          onSelect={video => setSelected({ video, vertical: v })}
        />
      ))}

      {/* PASS CTA */}
      {!isPremium && (
        <div className="mp-cta">
          <div className="mp-box">
            <span className="mp-glyph">🔮</span>
            <div className="mp-title">Pass Anachrona Mythologie</div>
            <p className="mp-desc">Accédez à l'intégralité des trois panthéons. Plus de 18 épisodes exclusifs, une narration IA inédite au croisement du mythe et de l'Histoire.</p>
            <ul className="mp-list">
              <li>Mythologie Nordique — Odin, Thor, Loki, Freya…</li>
              <li>Mythologie Égyptienne — Ra, Osiris, Anubis, Isis…</li>
              <li>Mythologie Grecque — Zeus, Hercule, Ulysse…</li>
              <li>Nouveaux épisodes chaque semaine</li>
            </ul>
            <button className="mp-btn" onClick={() => navigate('/login')}>Obtenir le Pass Mythologie</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="mfoot">
        <div className="mfoot-line" />
        <span style={{ cursor:'pointer', opacity:.6 }} onClick={() => navigate('/')}>
          <AnachronaLogo size={30} />
        </span>
        <div className="mfoot-line r" />
      </div>

      {/* DETAIL PANEL */}
      {selected && (
        <DetailPanel
          video={selected.video}
          vertical={selected.vertical}
          onClose={() => setSelected(null)}
          onSelect={v => setSelected({ video: v, vertical: selected.vertical })}
        />
      )}
    </div>
  );
}
