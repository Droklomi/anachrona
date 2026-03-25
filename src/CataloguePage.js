import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnachronaLogo from './AnachronaLogo';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

  :root {
    --noir: #09090F;
    --or: #C9A84C;
    --or-clair: #E8C96A;
    --ivoire: #F5F0E8;
    --ivoire-sombre: #D4C9B0;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#09090F; color:#F5F0E8; font-family:'EB Garamond',serif; overflow-x:hidden; }
  body::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:0.5;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  }

  /* ── NAV ── */
  .cn { position:fixed; top:0; width:100%; z-index:500; padding:15px 5%; display:flex; align-items:center; justify-content:space-between; transition:background .4s,border .4s; }
  .cn.scrolled { background:rgba(9,9,15,.97); border-bottom:1px solid rgba(201,168,76,.12); backdrop-filter:blur(16px); }
  .cn-links { display:flex; gap:clamp(16px,3vw,36px); list-style:none; }
  .cn-links a { font-family:'Cinzel',serif; font-size:.65rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(245,240,232,.6); cursor:pointer; text-decoration:none; transition:color .3s; }
  .cn-links a:hover,.cn-links a.active { color:#C9A84C; }
  .cn-cta { font-family:'Cinzel',serif; font-size:.58rem; letter-spacing:.22em; text-transform:uppercase; color:#09090F; background:linear-gradient(135deg,#E8C96A,#C9A84C); padding:9px 22px; border:none; cursor:pointer; transition:all .3s; }
  .cn-cta:hover { box-shadow:0 0 22px rgba(201,168,76,.5); transform:translateY(-1px); }

  /* ── HERO ── */
  .ch { position:relative; height:82vh; min-height:520px; overflow:hidden; background:#09090F; }
  .ch-logo-bg { position:absolute; right:-4%; top:50%; transform:translateY(-50%); height:115%; pointer-events:none; display:flex; align-items:center; }
  .ch-logo-bg img { height:100%; width:auto; opacity:.18; filter:saturate(1.3) brightness(1.1); animation:hzoom 30s ease-out forwards; }
  @keyframes hzoom { from{transform:scale(1)} to{transform:scale(1.06)} }
  .ch-logo-glow { position:absolute; right:28%; top:50%; transform:translate(50%,-50%); width:700px; height:700px; background:radial-gradient(circle,rgba(201,168,76,.1) 0%,transparent 65%); pointer-events:none; }
  .ch-grad { position:absolute; inset:0; background:linear-gradient(to right,rgba(9,9,15,1) 0%,rgba(9,9,15,.85) 35%,rgba(9,9,15,.2) 65%,rgba(9,9,15,.05) 100%),linear-gradient(to top,rgba(9,9,15,1) 0%,rgba(9,9,15,.35) 28%,transparent 55%); }
  .ch-content { position:absolute; bottom:0; left:0; padding:0 clamp(24px,6%,96px) clamp(48px,8vh,80px); max-width:640px; }
  .ch-badge { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:.5rem; letter-spacing:.4em; text-transform:uppercase; color:#C9A84C; border:1px solid rgba(201,168,76,.35); padding:4px 12px; margin-bottom:16px; }
  .ch-badge::before { content:''; width:4px; height:4px; background:#C9A84C; border-radius:50%; }
  .ch-title { font-family:'Cinzel Decorative',serif; font-size:clamp(2.6rem,7vw,5.5rem); color:#F5F0E8; letter-spacing:.03em; line-height:1.05; margin-bottom:8px; text-shadow:0 4px 60px rgba(0,0,0,.9); }
  .ch-series { font-family:'Cinzel',serif; font-size:clamp(.55rem,1.3vw,.72rem); letter-spacing:.25em; color:rgba(201,168,76,.7); text-transform:uppercase; margin-bottom:18px; }
  .ch-desc { font-style:italic; font-size:clamp(.95rem,1.7vw,1.08rem); color:rgba(212,201,176,.8); line-height:1.8; margin-bottom:32px; max-width:460px; }
  .ch-btns { display:flex; gap:12px; flex-wrap:wrap; }
  .ch-btn-play { font-family:'Cinzel',serif; font-size:.6rem; letter-spacing:.25em; text-transform:uppercase; color:#09090F; background:linear-gradient(135deg,#E8C96A,#C9A84C); padding:14px 36px; border:none; cursor:pointer; display:flex; align-items:center; gap:12px; transition:all .3s; box-shadow:0 4px 24px rgba(201,168,76,.3); }
  .ch-btn-play:hover { box-shadow:0 6px 36px rgba(201,168,76,.55); transform:translateY(-2px); }
  .ch-btn-play-tri { width:0; height:0; border-top:6px solid transparent; border-bottom:6px solid transparent; border-left:10px solid #09090F; margin-left:1px; }
  .ch-btn-out { font-family:'Cinzel',serif; font-size:.6rem; letter-spacing:.25em; text-transform:uppercase; color:rgba(245,240,232,.85); background:rgba(245,240,232,.07); padding:13px 28px; border:1px solid rgba(245,240,232,.2); cursor:pointer; backdrop-filter:blur(8px); transition:all .3s; }
  .ch-btn-out:hover { background:rgba(245,240,232,.14); }

  /* ticker */
  .ch-ticker { position:absolute; bottom:0; left:0; right:0; height:34px; display:flex; align-items:center; background:rgba(9,9,15,.85); border-top:1px solid rgba(201,168,76,.1); overflow:hidden; }
  .ch-ticker-label { font-family:'Cinzel',serif; font-size:.42rem; letter-spacing:.3em; color:#C9A84C; text-transform:uppercase; padding:0 18px; border-right:1px solid rgba(201,168,76,.2); white-space:nowrap; flex-shrink:0; }
  .ch-ticker-wrap { flex:1; overflow:hidden; }
  .ch-ticker-inner { display:flex; width:max-content; animation:ticker 45s linear infinite; }
  @keyframes ticker { to { transform:translateX(-50%); } }
  .ch-ticker-item { font-family:'Cinzel',serif; font-size:.42rem; letter-spacing:.22em; color:rgba(245,240,232,.38); text-transform:uppercase; white-space:nowrap; padding:0 24px; }
  .ch-ticker-item::after { content:'◆'; margin-left:24px; color:rgba(201,168,76,.25); font-size:.32rem; }

  /* ── SECTION BLOCK ── */
  .cs { position:relative; overflow:hidden; }
  .cs-bg-pattern { position:absolute; inset:0; pointer-events:none; z-index:0; }
  .cs-bg-img { position:absolute; inset:0; background-size:cover; background-position:center; filter:brightness(.18) saturate(.5); z-index:0; transition:filter 6s ease-out; }
  .cs-bg-glow { position:absolute; inset:0; pointer-events:none; z-index:1; }
  .cs-fade-t { position:absolute; top:0; left:0; right:0; height:80px; background:linear-gradient(to bottom,#09090F,transparent); pointer-events:none; z-index:2; }
  .cs-fade-b { position:absolute; bottom:0; left:0; right:0; height:80px; background:linear-gradient(to top,#09090F,transparent); pointer-events:none; z-index:2; }
  .cs-inner { position:relative; z-index:3; padding:60px 0 52px; }

  /* section header */
  .cs-header { padding:0 clamp(24px,5%,80px) 28px; position:relative; overflow:hidden; }
  .cs-watermark { position:absolute; right:clamp(24px,5%,80px); top:50%; transform:translateY(-50%); font-family:'Cinzel Decorative',serif; font-size:clamp(5rem,12vw,9rem); color:rgba(255,255,255,.028); letter-spacing:.05em; line-height:1; pointer-events:none; user-select:none; white-space:nowrap; }
  .cs-header-label { font-family:'Cinzel',serif; font-size:.48rem; letter-spacing:.55em; text-transform:uppercase; margin-bottom:8px; opacity:.75; }
  .cs-header-title { font-family:'Cinzel Decorative',serif; font-size:clamp(1.3rem,3vw,2rem); letter-spacing:.05em; margin-bottom:5px; line-height:1.15; }
  .cs-header-sub { font-style:italic; font-size:clamp(.82rem,1.4vw,.93rem); color:rgba(212,201,176,.5); }
  .cs-header-line { margin-top:16px; height:1px; width:60px; }

  /* ── ROW ── */
  .cr { margin-bottom:8px; }
  .cr-head { display:flex; align-items:center; justify-content:space-between; padding:0 clamp(24px,5%,80px); margin-bottom:14px; }
  .cr-left { display:flex; align-items:center; gap:12px; }
  .cr-accent { width:3px; height:26px; border-radius:2px; flex-shrink:0; }
  .cr-title { font-family:'Cinzel',serif; font-size:clamp(.75rem,1.8vw,.95rem); letter-spacing:.15em; color:#F5F0E8; text-transform:uppercase; }
  .cr-sub { font-family:'EB Garamond',serif; font-style:italic; font-size:clamp(.7rem,1.3vw,.82rem); color:rgba(212,201,176,.4); margin-left:10px; }
  .cr-voir { font-family:'Cinzel',serif; font-size:.48rem; letter-spacing:.2em; text-transform:uppercase; color:#C9A84C; background:none; border:1px solid rgba(201,168,76,.22); padding:5px 14px; cursor:pointer; opacity:0; transition:opacity .3s; }
  .cr:hover .cr-voir { opacity:1; }
  .cr-scroll-wrap { position:relative; }
  .cr-scroll { display:flex; gap:11px; overflow-x:auto; padding:6px clamp(24px,5%,80px) 20px; scrollbar-width:none; -ms-overflow-style:none; }
  .cr-scroll::-webkit-scrollbar { display:none; }
  .cr-fade { position:absolute; top:0; bottom:0; width:90px; pointer-events:none; z-index:5; opacity:0; transition:opacity .3s; }
  .cr-fade.l { left:0; }
  .cr-fade.r { right:0; }
  .cr-scroll-wrap:hover .cr-fade { opacity:1; }
  .cr-arrow { position:absolute; top:50%; transform:translateY(-50%); width:36px; height:72px; border:none; cursor:pointer; font-size:1.6rem; font-weight:300; display:flex; align-items:center; justify-content:center; z-index:10; opacity:0; pointer-events:none; transition:opacity .3s; background:transparent; }
  .cr-arrow.l { left:6px; color:rgba(245,240,232,.7); }
  .cr-arrow.r { right:6px; color:rgba(245,240,232,.7); }
  .cr-scroll-wrap:hover .cr-arrow { opacity:1; pointer-events:all; }
  .cr-arrow:hover { color:#fff; }

  /* ── CARD ── */
  .cc { position:relative; flex-shrink:0; width:162px; cursor:pointer; transition:transform .4s cubic-bezier(.16,1,.3,1); z-index:1; }
  .cc:hover { transform:scale(1.1) translateY(-8px); z-index:20; }
  .cc-inner { border-radius:4px; overflow:hidden; aspect-ratio:9/16; position:relative; box-shadow:0 6px 28px rgba(0,0,0,.7); transition:box-shadow .4s; }
  .cc:hover .cc-inner { box-shadow:0 12px 48px rgba(0,0,0,.9),0 0 0 1.5px var(--accent,.5); }
  .cc-top-bar { position:absolute; top:0; left:0; right:0; height:3px; z-index:3; }
  .cc-img { width:100%; height:100%; object-fit:cover; display:block; transition:filter .4s,transform .4s; filter:brightness(.82) saturate(.75); }
  .cc:hover .cc-img { filter:brightness(.6) saturate(.85); transform:scale(1.05); }
  .cc-grad { position:absolute; inset:0; background:linear-gradient(to top,rgba(9,9,15,1) 0%,rgba(9,9,15,.5) 35%,rgba(9,9,15,.1) 60%,transparent 80%); }
  .cc-tint { position:absolute; inset:0; opacity:.1; mix-blend-mode:color; }
  .cc-dur { position:absolute; top:10px; right:10px; font-family:'Cinzel',serif; font-size:.44rem; letter-spacing:.1em; color:rgba(245,240,232,.75); background:rgba(9,9,15,.75); border:1px solid rgba(245,240,232,.1); padding:2px 7px; border-radius:2px; z-index:3; }
  .cc-new { position:absolute; top:0; left:10px; font-family:'Cinzel',serif; font-size:.38rem; letter-spacing:.18em; color:#09090F; background:#C9A84C; padding:4px 8px 3px; text-transform:uppercase; font-weight:700; z-index:4; }
  .cc-info { position:absolute; bottom:0; left:0; right:0; padding:12px 10px 10px; z-index:3; }
  .cc-name { font-family:'Cinzel',serif; font-size:.56rem; letter-spacing:.12em; color:#F5F0E8; margin-bottom:3px; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; transition:color .3s; }
  .cc:hover .cc-name { color:#E8C96A; }
  .cc-desc { font-style:italic; font-size:.62rem; color:rgba(245,240,232,.5); line-height:1.35; overflow:hidden; max-height:0; opacity:0; transition:max-height .3s ease,opacity .3s ease; }
  .cc:hover .cc-desc { max-height:36px; opacity:1; }
  .cc-play { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) scale(.5); width:44px; height:44px; border-radius:50%; background:rgba(232,201,106,.9); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .3s,transform .35s cubic-bezier(.16,1,.3,1); z-index:4; box-shadow:0 0 0 8px rgba(232,201,106,.12); }
  .cc:hover .cc-play { opacity:1; transform:translate(-50%,-50%) scale(1); }
  .cc-play-tri { width:0; height:0; border-top:6px solid transparent; border-bottom:6px solid transparent; border-left:11px solid #09090F; margin-left:3px; }


/* ── DETAIL PANEL ── */
  .dp-overlay { position:fixed; inset:0; background:rgba(0,0,0,.78); z-index:800; backdrop-filter:blur(8px); animation:dp-in .3s forwards; display:flex; align-items:center; justify-content:center; padding:20px; }
  @keyframes dp-in { from{opacity:0} to{opacity:1} }
  .dp-panel { position:relative; width:min(660px,100%); max-height:90vh; background:#0C0C16; overflow-y:auto; z-index:801; scrollbar-width:thin; scrollbar-color:rgba(201,168,76,.2) transparent; animation:dp-pop .38s cubic-bezier(.16,1,.3,1) forwards; border:1px solid rgba(201,168,76,.09); }
  @keyframes dp-pop { from{opacity:0;transform:scale(.94) translateY(24px)} to{opacity:1;transform:none} }
  .dp-panel::-webkit-scrollbar { width:4px; }
  .dp-panel::-webkit-scrollbar-thumb { background:rgba(201,168,76,.2); }
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
  .dp-divider { height:1px; background:linear-gradient(to right,transparent,rgba(201,168,76,.2),transparent); margin:28px 0; }
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
  .cfoot { display:flex; align-items:center; gap:20px; padding:40px clamp(24px,5%,80px) 32px; border-top:1px solid rgba(201,168,76,.07); }
  .cfoot-line { flex:1; height:1px; background:linear-gradient(to right,rgba(201,168,76,.15),transparent); }
  .cfoot-line.r { background:linear-gradient(to left,rgba(201,168,76,.15),transparent); }
  .cfoot-logo { cursor:pointer; opacity:.6; transition:opacity .3s; }
  .cfoot-logo:hover { opacity:1; }

  .cn-mobile-myth { display:none; }
  @media(max-width:768px) { .cn-links{display:none} .ch-title{font-size:clamp(2rem,9vw,3.2rem)} .cc{width:132px} .cn-mobile-myth{display:flex;align-items:center;} }
`;

// ── DA CONFIG ─────────────────────────────────────────────────────────────────

const DA = {
  rome: {
    bg: '#0D0404',
    bgImg: null,
    pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='50'%3E%3Ctext x='60' y='34' text-anchor='middle' font-size='12' font-family='Georgia%2Cserif' fill='rgba(196%2C83%2C58%2C.1)' letter-spacing='6'%3ESPQR%3C/text%3E%3C/svg%3E")`,
    glow: `radial-gradient(ellipse at 40% 50%,rgba(196,83,58,.18) 0%,transparent 60%)`,
    accent: '#C4533A', titleColor: '#E8A090',
    label: 'S · P · Q · R', sublabel: 'Senatus Populusque Romanus', deco: '⚔',
    watermark: 'ROMA',
  },
  'rois-france': {
    bg: '#04070E',
    bgImg: null,
    pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ctext x='40' y='56' text-anchor='middle' font-size='44' fill='rgba(74%2C114%2C184%2C.09)'%3E%E2%9A%9C%3C/text%3E%3C/svg%3E")`,
    glow: `radial-gradient(ellipse at 50% 40%,rgba(74,114,184,.18) 0%,transparent 60%)`,
    accent: '#4A72B8', titleColor: '#90B0E0',
    label: '⚜  MONARCHIE FRANÇAISE  ⚜', sublabel: 'Rex Francorum · La Couronne Capétienne', deco: '⚜',
    watermark: 'REX',
  },
  'femmes-pouvoir': {
    bg: '#0A0408',
    bgImg: null,
    pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70'%3E%3Ctext x='35' y='50' text-anchor='middle' font-size='36' fill='rgba(160%2C82%2C138%2C.09)'%3E%E2%9C%BF%3C/text%3E%3C/svg%3E")`,
    glow: `radial-gradient(ellipse at 60% 50%,rgba(160,82,138,.18) 0%,transparent 60%)`,
    accent: '#A0528A', titleColor: '#D890C0',
    label: '♛  RÉGINES & IMPÉRATRICES  ♛', sublabel: "Celles qui ont gouverné l'Histoire", deco: '♛',
    watermark: 'REGINA',
  },
  'legendes-mers': {
    bg: '#020609',
    bgImg: null,
    pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cline x1='50' y1='8' x2='50' y2='92' stroke='rgba(26%2C171%2C204%2C.1)' stroke-width='.8'/%3E%3Cline x1='8' y1='50' x2='92' y2='50' stroke='rgba(26%2C171%2C204%2C.1)' stroke-width='.8'/%3E%3Cline x1='20' y1='20' x2='80' y2='80' stroke='rgba(26%2C171%2C204%2C.06)' stroke-width='.8'/%3E%3Cline x1='80' y1='20' x2='20' y2='80' stroke='rgba(26%2C171%2C204%2C.06)' stroke-width='.8'/%3E%3Ccircle cx='50' cy='50' r='5' fill='none' stroke='rgba(26%2C171%2C204%2C.13)' stroke-width='.8'/%3E%3Ccircle cx='50' cy='50' r='18' fill='none' stroke='rgba(26%2C171%2C204%2C.08)' stroke-width='.8'/%3E%3Ccircle cx='50' cy='50' r='36' fill='none' stroke='rgba(26%2C171%2C204%2C.05)' stroke-width='.8'/%3E%3C/svg%3E")`,
    glow: `radial-gradient(ellipse at 30% 60%,rgba(26,171,204,.32) 0%,transparent 55%)`,
    accent: '#1AABCC', titleColor: '#5DD8F0',
    label: '⚓  TERRA INCOGNITA  ⚓', sublabel: 'Aventuriers, Corsaires & Explorateurs', deco: '⚓',
    watermark: 'MARE',
  },
  'legendes-asie': {
    bg: '#030809',
    bgImg: null,
    pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Ctext x='45' y='62' text-anchor='middle' font-size='52' fill='rgba(107%2C154%2C90%2C.09)'%3E%E9%BE%8D%3C/text%3E%3C/svg%3E")`,
    glow: `radial-gradient(ellipse at 70% 40%,rgba(107,154,90,.15) 0%,transparent 55%)`,
    accent: '#6B9A5A', titleColor: '#98C888',
    label: '龍  EXTRÊME-ORIENT  龍', sublabel: "Empereurs, Guerriers & Sages de l'Orient", deco: '龍',
    watermark: '東方',
  },
  philosophes: {
    bg: '#070709',
    bgImg: null,
    pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='60'%3E%3Crect x='6' y='10' width='10' height='38' rx='1' fill='none' stroke='rgba(160%2C144%2C96%2C.11)' stroke-width='.9'/%3E%3Crect x='18' y='16' width='12' height='32' rx='1' fill='none' stroke='rgba(160%2C144%2C96%2C.11)' stroke-width='.9'/%3E%3Crect x='32' y='8' width='9' height='40' rx='1' fill='none' stroke='rgba(160%2C144%2C96%2C.11)' stroke-width='.9'/%3E%3Crect x='43' y='14' width='13' height='34' rx='1' fill='none' stroke='rgba(160%2C144%2C96%2C.11)' stroke-width='.9'/%3E%3Crect x='58' y='6' width='8' height='42' rx='1' fill='none' stroke='rgba(160%2C144%2C96%2C.11)' stroke-width='.9'/%3E%3Crect x='68' y='12' width='11' height='36' rx='1' fill='none' stroke='rgba(160%2C144%2C96%2C.11)' stroke-width='.9'/%3E%3Cline x1='4' y1='48' x2='86' y2='48' stroke='rgba(160%2C144%2C96%2C.08)' stroke-width='.8'/%3E%3C/svg%3E")`,
    glow: `radial-gradient(ellipse at 50% 50%,rgba(160,144,96,.12) 0%,transparent 60%)`,
    accent: '#A09060', titleColor: '#C8B880',
    label: '◈  PENSEURS & SAGES  ◈', sublabel: "La Quête de la Vérité à travers les âges", deco: '◈',
    watermark: 'SOPHIA',
  },
};

// ── VERTICALS DATA ────────────────────────────────────────────────────────────

const VERTICALS = [
  {
    id: 'rome', titre: 'Rome', subtitle: "L'Empire Éternel",
    heroImg: 'https://picsum.photos/seed/rome-colosseum/1600/900',
    heroDesc: "Des origines légendaires à la chute de l'Empire, les destins de ceux qui ont fait Rome.",
    videos: [
      { id: 'r1', titre: 'Jules César', desc: "La chute d'un titan", img: 'https://picsum.photos/seed/julius-caesar-rome/400/700', duration: '1:02', isNew: true, epoque: '100 — 44 av. J.-C.', bio: "Général, homme d'État et dictateur romain, Jules César a repoussé les frontières de Rome jusqu'en Gaule avant d'être assassiné aux Ides de Mars. [Description complète à rédiger]" },
      { id: 'r2', titre: 'Marc Aurèle', desc: 'Le philosophe-roi', img: 'https://picsum.photos/seed/marcus-aurelius-rome/400/700', duration: '0:58', epoque: '121 — 180 ap. J.-C.', bio: "Dernier des Cinq Bons Empereurs, Marc Aurèle est aussi l'auteur des Pensées pour moi-même, chef-d'œuvre de la philosophie stoïcienne. [Description complète à rédiger]" },
      { id: 'r3', titre: 'Néron', desc: 'La folie du pouvoir', img: 'https://picsum.photos/seed/nero-emperor/400/700', duration: '1:00', epoque: '37 — 68 ap. J.-C.', bio: "Dernier empereurjulio-claudien, Néron reste associé à la tyrannie, à l'incendie de Rome et aux premières persécutions chrétiennes. [Description complète à rédiger]" },
      { id: 'r4', titre: 'Auguste', desc: 'Le premier des Césars', img: 'https://picsum.photos/seed/augustus-caesar/400/700', duration: '1:03', epoque: '63 av. J.-C. — 14 ap. J.-C.', bio: "Fondateur du Principat, Auguste instaure la Pax Romana et transforme Rome en capitale monumentale. [Description complète à rédiger]" },
      { id: 'r5', titre: 'Spartacus', desc: "L'esclave rebelle", img: 'https://picsum.photos/seed/spartacus-rebel/400/700', duration: '0:59', isNew: true, epoque: '111 — 71 av. J.-C.', bio: "Chef de la troisième guerre servile, Spartacus mena 120 000 esclaves en révolte contre Rome avant d'être défait par Crassus. [Description complète à rédiger]" },
      { id: 'r6', titre: 'Cléopâtre VII', desc: 'La reine et Rome', img: 'https://picsum.photos/seed/cleopatra-rome/400/700', duration: '1:01', epoque: '69 — 30 av. J.-C.', bio: "Dernière reine ptolémaïque d'Égypte, Cléopâtre allia Rome à son destin en séduisant César puis Marc Antoine. [Description complète à rédiger]" },
      { id: 'r7', titre: 'Cicéron', desc: 'La plume de la République', img: 'https://picsum.photos/seed/cicero-republic/400/700', duration: '0:57', epoque: '106 — 43 av. J.-C.', bio: "Orateur, avocat et philosophe, Cicéron incarne les idéaux de la République romaine face aux ambitions de César. [Description complète à rédiger]" },
    ]
  },
  {
    id: 'rois-france', titre: 'Rois de France', subtitle: 'La Couronne & le Destin',
    videos: [
      { id: 'rf1', titre: 'Louis XIV', desc: 'Le Roi-Soleil', img: 'https://picsum.photos/seed/louis14-versailles/400/700', duration: '1:02', isNew: true, epoque: '1638 — 1715', bio: "Le plus long règne d'Europe. Louis XIV incarne la monarchie absolue, bâtit Versailles et place la France au sommet de sa puissance. [Description complète à rédiger]" },
      { id: 'rf2', titre: 'Charlemagne', desc: "L'Empire carolingien", img: 'https://picsum.photos/seed/charlemagne-empire/400/700', duration: '0:59', epoque: '742 — 814', bio: "Couronné Empereur d'Occident en l'an 800, Charlemagne unifie l'Europe et jette les bases de la civilisation médiévale. [Description complète à rédiger]" },
      { id: 'rf3', titre: 'Henri IV', desc: 'Paris vaut bien une messe', img: 'https://picsum.photos/seed/henri4-france/400/700', duration: '1:01', epoque: '1553 — 1610', bio: "Huguenot converti, Henri IV met fin aux guerres de religion par l'Édit de Nantes et relance la prospérité française. [Description complète à rédiger]" },
      { id: 'rf4', titre: 'François Ier', desc: 'Le roi chevalier', img: 'https://picsum.photos/seed/francois1-renaissance/400/700', duration: '0:58', epoque: '1494 — 1547', bio: "Mécène de la Renaissance, rival de Charles Quint, François Ier invite Léonard de Vinci et fait entrer la France dans la modernité culturelle. [Description complète à rédiger]" },
      { id: 'rf5', titre: 'Louis XVI', desc: "La fin d'un monde", img: 'https://picsum.photos/seed/louis16-revolution/400/700', duration: '1:03', epoque: '1754 — 1793', bio: "Dernier roi de France avant la Révolution, Louis XVI fut guillotiné place de la Révolution le 21 janvier 1793. [Description complète à rédiger]" },
      { id: 'rf6', titre: 'Napoléon', desc: "L'aigle de la France", img: 'https://picsum.photos/seed/napoleon-france/400/700', duration: '1:04', isNew: true, epoque: '1769 — 1821', bio: "Général corse devenu Empereur des Français, Napoléon remodela l'Europe entière avant son exil à Sainte-Hélène. [Description complète à rédiger]" },
    ]
  },
  {
    id: 'femmes-pouvoir', titre: 'Femmes de Pouvoir', subtitle: "Celles qui ont changé l'Histoire",
    videos: [
      { id: 'fp1', titre: 'Marie-Antoinette', desc: 'La reine sacrifiée', img: 'https://picsum.photos/seed/marie-antoinette-queen/400/700', duration: '1:02', isNew: true, epoque: '1755 — 1793', bio: "Archiduchesse d'Autriche et reine de France, Marie-Antoinette devient le symbole de la déconnexion de la monarchie avec le peuple. [Description complète à rédiger]" },
      { id: 'fp2', titre: 'Cléopâtre', desc: 'La dernière pharaonne', img: 'https://picsum.photos/seed/cleopatra-pharaon/400/700', duration: '1:01', epoque: '69 — 30 av. J.-C.', bio: "Seule pharaonne à maîtriser la langue égyptienne depuis des siècles, Cléopâtre dirigea l'Égypte avec un génie politique hors du commun. [Description complète à rédiger]" },
      { id: 'fp3', titre: "Aliénor d'Aquitaine", desc: 'La reine des deux royaumes', img: 'https://picsum.photos/seed/alienor-aquitaine/400/700', duration: '0:59', epoque: '1122 — 1204', bio: "Reine de France puis d'Angleterre, mécène et femme politique, Aliénor incarne la femme médiévale la plus puissante d'Europe. [Description complète à rédiger]" },
      { id: 'fp4', titre: 'Nefertiti', desc: 'La beauté qui vint', img: 'https://picsum.photos/seed/nefertiti-egypt/400/700', duration: '0:58', epoque: '1370 — 1330 av. J.-C.', bio: "Grande Épouse royale d'Akhenaton, Nefertiti joua un rôle central dans la révolution religieuse atoniste. [Description complète à rédiger]" },
      { id: 'fp5', titre: 'Catherine de Médicis', desc: 'La régente de France', img: 'https://picsum.photos/seed/catherine-medici/400/700', duration: '1:00', epoque: '1519 — 1589', bio: "Régente pendant les guerres de religion, Catherine de Médicis gouverna la France à travers trois de ses fils. [Description complète à rédiger]" },
      { id: 'fp6', titre: 'Isabelle de Castille', desc: 'La reine catholique', img: 'https://picsum.photos/seed/isabelle-castille/400/700', duration: '1:01', epoque: '1451 — 1504', bio: "En finançant Christophe Colomb et en unifiant l'Espagne avec Ferdinand d'Aragon, Isabelle change le cours de l'Histoire mondiale. [Description complète à rédiger]" },
    ]
  },
  {
    id: 'legendes-mers', titre: 'Légendes des Mers', subtitle: "Les conquérants de l'Océan",
    videos: [
      { id: 'lm1', titre: 'Barbe-Noire', desc: 'La terreur des mers', img: 'https://picsum.photos/seed/blackbeard-pirate/400/700', duration: '1:00', isNew: true, epoque: '1680 — 1718', bio: "Né Edward Teach, Barbe-Noire terrorisa les Caraïbes et la côte américaine à bord du Queen Anne's Revenge. [Description complète à rédiger]" },
      { id: 'lm2', titre: 'Christophe Colomb', desc: "La traversée de l'impossible", img: 'https://picsum.photos/seed/columbus-discovery/400/700', duration: '1:02', epoque: '1451 — 1506', bio: "En atteignant l'Amérique en 1492, Colomb ouvrit une ère nouvelle dans l'histoire de l'humanité. [Description complète à rédiger]" },
      { id: 'lm3', titre: 'Vasco de Gama', desc: 'La route des Indes', img: 'https://picsum.photos/seed/vasco-gama/400/700', duration: '0:59', epoque: '1469 — 1524', bio: "Premier Européen à relier l'Europe aux Indes par la mer, Vasco de Gama ouvrit la route maritime qui brisa le monopole arabe. [Description complète à rédiger]" },
      { id: 'lm4', titre: 'Magellan', desc: 'Le tour du monde', img: 'https://picsum.photos/seed/magellan-circumnavigation/400/700', duration: '1:01', epoque: '1480 — 1521', bio: "Chef de la première expédition à circumnaviger le globe, Magellan mourut aux Philippines avant d'en voir l'aboutissement. [Description complète à rédiger]" },
      { id: 'lm5', titre: 'Robert Surcouf', desc: 'Le corsaire malouin', img: 'https://picsum.photos/seed/surcouf-corsaire/400/700', duration: '0:58', epoque: '1773 — 1827', bio: "Corsaire saint-maloin, Surcouf captura plus de 40 navires anglais dans l'océan Indien, devenant la bête noire de la Royal Navy. [Description complète à rédiger]" },
      { id: 'lm6', titre: 'Francis Drake', desc: "Le corsaire de la Reine", img: 'https://picsum.photos/seed/francis-drake/400/700', duration: '1:00', epoque: '1540 — 1596', bio: "Pirate pour l'Espagne, héros pour l'Angleterre, Francis Drake circumnavigua le globe et contribua à la défaite de l'Invincible Armada. [Description complète à rédiger]" },
    ]
  },
  {
    id: 'legendes-asie', titre: "Légendes d'Asie", subtitle: "Les titans de l'Orient",
    videos: [
      { id: 'la1', titre: 'Gengis Khan', desc: "L'empire infini", img: 'https://picsum.photos/seed/genghis-mongol/400/700', duration: '1:02', epoque: '1162 — 1227', bio: "Fondateur du plus grand empire contigu de l'histoire, Gengis Khan unifia les tribus mongoles et conquit l'Eurasie. [Description complète à rédiger]" },
      { id: 'la2', titre: 'Mulan', desc: 'La guerrière légendaire', img: 'https://picsum.photos/seed/mulan-china/400/700', duration: '0:59', isNew: true, epoque: 'Époque légendaire', bio: "Figure légendaire de la Chine ancienne, Hua Mulan s'engagea sous un nom masculin pour protéger son père vieillissant. [Description complète à rédiger]" },
      { id: 'la3', titre: 'Zheng He', desc: "L'amiral des sept mers", img: 'https://picsum.photos/seed/zheng-china/400/700', duration: '1:01', epoque: '1371 — 1433', bio: "Amiral eunuque de la cour des Ming, Zheng He mena sept expéditions gigantesques vers l'Afrique et l'Asie du Sud-Est. [Description complète à rédiger]" },
      { id: 'la4', titre: 'Sun Tzu', desc: "L'art de la guerre", img: 'https://picsum.photos/seed/sun-tzu-china/400/700', duration: '0:58', epoque: 'Ve siècle av. J.-C.', bio: "Stratège et philosophe militaire, Sun Tzu est l'auteur de L'Art de la Guerre, manuel toujours étudié 2500 ans plus tard. [Description complète à rédiger]" },
      { id: 'la5', titre: 'Ashoka', desc: "L'empereur de la paix", img: 'https://picsum.photos/seed/ashoka-india/400/700', duration: '1:00', epoque: '304 — 232 av. J.-C.', bio: "Après avoir conquis l'Inde par le sang, Ashoka se convertit au bouddhisme et gouverna avec une compassion sans précédent. [Description complète à rédiger]" },
      { id: 'la6', titre: 'Wu Zetian', desc: "L'unique impératrice", img: 'https://picsum.photos/seed/wu-empress-china/400/700', duration: '1:01', isNew: true, epoque: '624 — 705', bio: "Seule femme à avoir régné en son propre nom sur la Chine, Wu Zetian gouverna l'Empire du Milieu pendant plus de 50 ans. [Description complète à rédiger]" },
    ]
  },
  {
    id: 'philosophes', titre: 'Philosophes', subtitle: 'Les pères de la pensée',
    videos: [
      { id: 'ph1', titre: 'Socrate', desc: 'Je sais que je ne sais rien', img: 'https://picsum.photos/seed/socrates-athen/400/700', duration: '0:59', epoque: '470 — 399 av. J.-C.', bio: "Le père fondateur de la philosophie occidentale, condamné à mort pour impiété et corruption de la jeunesse athénienne. [Description complète à rédiger]" },
      { id: 'ph2', titre: 'Aristote', desc: 'Le maître de ceux qui savent', img: 'https://picsum.photos/seed/aristotle-athens/400/700', duration: '1:01', epoque: '384 — 322 av. J.-C.', bio: "Disciple de Platon et précepteur d'Alexandre le Grand, Aristote posa les bases de la logique, de la biologie et de la politique. [Description complète à rédiger]" },
      { id: 'ph3', titre: 'Confucius', desc: "La sagesse de l'Orient", img: 'https://picsum.photos/seed/confucius-wisdom/400/700', duration: '0:58', isNew: true, epoque: '551 — 479 av. J.-C.', bio: "Penseur chinois dont les enseignements sur la vertu, la famille et la gouvernance influencent encore deux milliards de personnes. [Description complète à rédiger]" },
      { id: 'ph4', titre: 'Platon', desc: 'Les ombres de la caverne', img: 'https://picsum.photos/seed/plato-republic/400/700', duration: '1:00', epoque: '428 — 348 av. J.-C.', bio: "Auteur de La République, Platon développe la théorie des Idées et pose les fondements de la philosophie idéaliste. [Description complète à rédiger]" },
      { id: 'ph5', titre: 'Nietzsche', desc: 'Dieu est mort', img: 'https://picsum.photos/seed/nietzsche-modern/400/700', duration: '1:02', epoque: '1844 — 1900', bio: "Philosophe de la volonté de puissance, Nietzsche bouleversa la pensée occidentale en proclamant la mort de Dieu et l'avènement du Surhomme. [Description complète à rédiger]" },
      { id: 'ph6', titre: 'Voltaire', desc: "Écrasez l'infâme", img: 'https://picsum.photos/seed/voltaire-enlightenment/400/700', duration: '0:57', epoque: '1694 — 1778', bio: "Figure majeure des Lumières, Voltaire combattit l'obscurantisme religieux et l'absolutisme avec une plume redoutable. [Description complète à rédiger]" },
    ]
  },
];



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
          <div className="dp-cat-badge" style={{ color: da.accent, borderColor: `${da.accent}55`, background: `${da.accent}18` }}>
            {vertical.titre}
          </div>
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

// ── VIDEO CARD ────────────────────────────────────────────────────────────────

function VideoCard({ video, accent, onSelect }) {
  return (
    <div className="cc" onClick={() => onSelect(video)}>
      <div className="cc-inner">
        <div className="cc-top-bar" style={{ background: accent }} />
        <img className="cc-img" src={video.img} alt={video.titre} loading="lazy" />
        <div className="cc-grad" />
        <div className="cc-tint" style={{ background: accent }} />
        {video.isNew && <div className="cc-new">Nouveau</div>}
        <div className="cc-dur">{video.duration}</div>
        <div className="cc-play"><div className="cc-play-tri" /></div>
        <div className="cc-info">
          <div className="cc-name">{video.titre}</div>
          <div className="cc-desc">{video.desc}</div>
        </div>
      </div>
    </div>
  );
}

// ── CATEGORY ROW ──────────────────────────────────────────────────────────────

function CategoryRow({ vertical, onSelect }) {
  const scrollRef = useRef(null);
  const da = DA[vertical.id];
  const scroll = dir => scrollRef.current?.scrollBy({ left: dir * 600, behavior: 'smooth' });

  return (
    <div className="cr">
      <div className="cr-head">
        <div className="cr-left">
          <div className="cr-accent" style={{ background: `linear-gradient(to bottom,${da.accent},transparent)` }} />
          <div>
            <span className="cr-title">{vertical.titre}</span>
            <span className="cr-sub">{vertical.subtitle}</span>
          </div>
        </div>
        <button className="cr-voir" style={{ color: da.accent, borderColor: `${da.accent}44` }}>
          Voir tout ›
        </button>
      </div>
      <div className="cr-scroll-wrap">
        <div className="cr-fade l" style={{ background: `linear-gradient(to right,${da.bg},transparent)` }} />
        <button className="cr-arrow l" onClick={() => scroll(-1)}>‹</button>
        <div className="cr-scroll" ref={scrollRef}>
          {vertical.videos.map(v => <VideoCard key={v.id} video={v} accent={da.accent} onSelect={onSelect} />)}
        </div>
        <button className="cr-arrow r" onClick={() => scroll(1)}>›</button>
        <div className="cr-fade r" style={{ background: `linear-gradient(to left,${da.bg},transparent)` }} />
      </div>
    </div>
  );
}

// ── SECTION BLOCK ─────────────────────────────────────────────────────────────

function SectionBlock({ vertical, onSelect }) {
  const da = DA[vertical.id];
  return (
    <section className="cs" style={{ background: da.bg }}>
      {da.bgImg && <div className="cs-bg-img" style={{ backgroundImage: `url(${da.bgImg})` }} />}
      <div className="cs-bg-pattern" style={{ backgroundImage: da.pattern, position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />
      <div className="cs-bg-glow" style={{ background: da.glow }} />
      <div className="cs-fade-t" style={{ background: `linear-gradient(to bottom,#09090F,transparent)` }} />
      <div className="cs-fade-b" style={{ background: `linear-gradient(to top,#09090F,transparent)` }} />

      <div className="cs-inner">
        <div className="cs-header">
          <div className="cs-watermark" style={{ color: `${da.accent}18` }}>{da.watermark}</div>
          <div className="cs-header-label" style={{ color: da.accent }}>{da.label}</div>
          <div className="cs-header-title" style={{ color: da.titleColor }}>{vertical.titre}</div>
          <div className="cs-header-sub">{vertical.subtitle}</div>
          <div className="cs-header-line" style={{ background: `linear-gradient(to right,${da.accent}66,transparent)` }} />
        </div>

        <CategoryRow vertical={vertical} onSelect={onSelect} />
      </div>
    </section>
  );
}

// ── MYTHOLOGIE PORTAL ─────────────────────────────────────────────────────────


// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function CataloguePage({ user }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const featured = VERTICALS[0];

  return (
    <div style={{ background: '#09090F', minHeight: '100vh' }}>
      <style>{styles}</style>

      <nav className={`cn ${scrolled ? 'scrolled' : ''}`}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <AnachronaLogo size={38} />
        </span>
        <ul className="cn-links">
          <li><a className="active">Histoire</a></li>
          <li><a onClick={() => navigate('/mythologie')} style={{ cursor: 'pointer' }}>Mythologie</a></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a className="cn-mobile-myth" onClick={() => navigate('/mythologie')} style={{ cursor: 'pointer', fontFamily: "'Cinzel',serif", fontSize: '.58rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,.6)' }}>Mythologie</a>
          <button className="cn-cta" onClick={() => navigate('/login')}>
            {user ? 'Mon Compte' : 'Devenir Premium'}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="ch">
        <div className="ch-logo-bg">
          <img src="/Anachrona_logo.png" alt="" />
        </div>
        <div className="ch-logo-glow" />
        <div className="ch-grad" />
        <div className="ch-content">
          <div className="ch-badge">Rome · À la une</div>
          <h1 className="ch-title">Jules César</h1>
          <div className="ch-series">Rome · L'Empire Éternel</div>
          <p className="ch-desc">{featured.heroDesc}</p>
          <div className="ch-btns">
            <button className="ch-btn-play" onClick={() => setSelected({ video: featured.videos[0], vertical: featured })}>
              <div className="ch-btn-play-tri" /> Regarder
            </button>
            <button className="ch-btn-out">+ Ma liste</button>
          </div>
        </div>

      </div>

      {/* 6 THEMED SECTIONS */}
      {VERTICALS.map(v => (
        <SectionBlock key={v.id} vertical={v} onSelect={video => setSelected({ video, vertical: v })} />
      ))}


      {/* FOOTER */}
      <div className="cfoot">
        <div className="cfoot-line" />
        <span className="cfoot-logo" onClick={() => navigate('/')}>
          <AnachronaLogo size={30} />
        </span>
        <div className="cfoot-line r" />
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
