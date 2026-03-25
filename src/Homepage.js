import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import worldData from 'world-atlas/countries-110m.json';
import AnachronaLogo from './AnachronaLogo';
import HeroParticles from './HeroParticles';
import HeroHourglass from './HeroHourglass';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

  :root {
    --noir: #09090F;
    --nuit: #0D0D1A;
    --or: #C9A84C;
    --or-clair: #E8C96A;
    --or-sombre: #8B6914;
    --ivoire: #F5F0E8;
    --ivoire-sombre: #D4C9B0;
    --brun: #2A1F0A;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--noir);
    color: var(--ivoire);
    font-family: 'EB Garamond', serif;
    overflow-x: hidden;
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.5;
  }

  .ana-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    padding: 18px 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.3s, border-color 0.3s;
  }

  .ana-nav.scrolled {
    background: rgba(9,9,15,0.97);
    border-bottom: 1px solid rgba(201,168,76,0.15);
  }

  .ana-logo {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1rem, 3vw, 1.5rem);
    color: var(--or);
    text-decoration: none;
    letter-spacing: 0.1em;
    text-shadow: 0 0 30px rgba(201,168,76,0.3);
    cursor: pointer;
  }

  .ana-nav-links {
    display: flex;
    gap: clamp(16px, 3vw, 40px);
    list-style: none;
    align-items: center;
  }

  .ana-nav-links a {
    font-family: 'Cinzel', serif;
    font-size: clamp(0.55rem, 1.2vw, 0.72rem);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ivoire-sombre);
    text-decoration: none;
    transition: color 0.3s;
    white-space: nowrap;
    cursor: pointer;
  }

  .ana-nav-links a:hover { color: var(--or); }

  .ana-premium-badge {
    font-size: 0.5rem;
    color: var(--noir);
    background: var(--or);
    padding: 2px 6px;
    font-family: 'Cinzel', serif;
    letter-spacing: 0.1em;
    vertical-align: middle;
    margin-left: 4px;
  }

  .ana-nav-cta {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--noir);
    background: var(--or);
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s;
    white-space: nowrap;
  }

  .ana-nav-cta:hover {
    background: var(--or-clair);
    box-shadow: 0 0 20px rgba(201,168,76,0.4);
  }

  .ana-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px;
  }

  .ana-hamburger span {
    width: 24px;
    height: 1px;
    background: var(--or);
    display: block;
    transition: all 0.3s;
  }

  .ana-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .ana-hamburger.open span:nth-child(2) { opacity: 0; }
  .ana-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  .ana-mobile-menu {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(9,9,15,0.98);
    z-index: 1050;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 36px;
  }

  .ana-mobile-menu.open { display: flex; }

  .ana-mobile-menu a {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--ivoire);
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;
  }

  .ana-mobile-menu a:hover { color: var(--or); }

  .ana-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 120px 5% 80px;
  }

  .ana-hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,105,20,0.13) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 15% 85%, rgba(107,30,30,0.09) 0%, transparent 60%),
      linear-gradient(160deg, #09090F 0%, #0D0D1A 50%, #0F0D18 100%);
  }

  .ana-hero-ring {
    position: absolute;
    top: 50%; left: 50%;
    border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.05);
    pointer-events: none;
  }

  .ana-hero-ring:nth-child(1) { width: min(700px,90vw); height: min(700px,90vw); transform: translate(-50%,-50%); animation: ring-rotate 80s linear infinite; }
  .ana-hero-ring:nth-child(2) { width: min(500px,70vw); height: min(500px,70vw); transform: translate(-50%,-50%); animation: ring-rotate 50s linear infinite reverse; border-color: rgba(201,168,76,0.03); }

  @keyframes ring-rotate {
    from { transform: translate(-50%,-50%) rotate(0deg); }
    to { transform: translate(-50%,-50%) rotate(360deg); }
  }

  .ana-particle {
    position: absolute;
    background: var(--or);
    border-radius: 50%;
    opacity: 0;
    animation: float-up linear infinite;
  }

  @keyframes float-up {
    0% { transform: translateY(100vh); opacity: 0; }
    10% { opacity: 0.5; }
    90% { opacity: 0.2; }
    100% { transform: translateY(-50px); opacity: 0; }
  }

  .ana-hero-content {
    position: relative;
    text-align: center;
    z-index: 2;
    max-width: 860px;
    animation: fade-up 1.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .ana-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: clamp(0.5rem, 1.5vw, 0.65rem);
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--or);
    opacity: 0.8;
    margin-bottom: 20px;
  }

  .ana-hero-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(2.8rem, 10vw, 7.5rem);
    font-weight: 900;
    color: var(--ivoire);
    line-height: 1;
    letter-spacing: 0.05em;
    text-shadow: 0 0 80px rgba(201,168,76,0.12), 0 2px 8px rgba(0,0,0,0.8);
    margin-bottom: 6px;
  }

  .ana-gold { color: var(--or); text-shadow: 0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.2); }

  .ana-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin: 24px auto;
  }

  .ana-div-line { height: 1px; width: clamp(40px,8vw,90px); background: linear-gradient(to right, transparent, var(--or)); }
  .ana-div-line.r { background: linear-gradient(to left, transparent, var(--or)); }
  .ana-div-gem { width: 6px; height: 6px; background: var(--or); transform: rotate(45deg); }
  .ana-div-gem-sm { width: 3px; height: 3px; background: var(--or-sombre); transform: rotate(45deg); }

  .ana-subtitle {
    font-style: italic;
    font-size: clamp(1rem, 2.5vw, 1.35rem);
    color: var(--ivoire-sombre);
    max-width: 540px;
    margin: 0 auto 44px;
    line-height: 1.75;
  }

  .ana-hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .ana-btn-primary {
    font-family: 'Cinzel', serif;
    font-size: clamp(0.6rem, 1.5vw, 0.72rem);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--noir);
    background: linear-gradient(135deg, var(--or), var(--or-clair));
    padding: clamp(12px,2vw,16px) clamp(24px,4vw,36px);
    border: none;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.4s;
  }

  .ana-btn-primary:hover { box-shadow: 0 0 30px rgba(201,168,76,0.5); transform: translateY(-2px); }

  .ana-btn-secondary {
    font-family: 'Cinzel', serif;
    font-size: clamp(0.6rem, 1.5vw, 0.72rem);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--or);
    background: transparent;
    padding: clamp(11px,2vw,15px) clamp(24px,4vw,36px);
    border: 1px solid rgba(201,168,76,0.4);
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.4s;
  }

  .ana-btn-secondary:hover { background: rgba(201,168,76,0.07); border-color: var(--or); }

  .ana-scroll-indicator {
    position: absolute;
    bottom: 36px; left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: rgba(201,168,76,0.45);
    font-family: 'Cinzel', serif;
    font-size: 0.5rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    animation: breathe 2.5s ease-in-out infinite;
  }

  .ana-scroll-bar { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--or-sombre), transparent); animation: scroll-pulse 2.5s ease-in-out infinite; }

  @keyframes breathe { 0%,100%{opacity:0.5;}50%{opacity:1;} }
  @keyframes scroll-pulse { 0%,100%{transform:scaleY(1);}50%{transform:scaleY(0.6);} }

  .ana-section-header { text-align: center; margin-bottom: clamp(40px,6vw,70px); }

  .ana-section-tag {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(0.5rem,1.2vw,0.62rem);
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: var(--or);
    opacity: 0.75;
    margin-bottom: 14px;
  }

  .ana-section-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.6rem,4vw,2.8rem);
    color: var(--ivoire);
    letter-spacing: 0.04em;
    margin-bottom: 14px;
    line-height: 1.2;
  }

  .ana-section-desc {
    font-style: italic;
    font-size: clamp(0.95rem,2vw,1.1rem);
    color: var(--ivoire-sombre);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.8;
  }

  .ana-prem-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Cinzel', serif;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--noir);
    background: linear-gradient(135deg, var(--or-sombre), var(--or));
    padding: 5px 12px;
    margin-bottom: 14px;
  }

  .ana-portraits {
    padding: clamp(60px,10vw,130px) 5%;
    background: linear-gradient(180deg, var(--noir) 0%, #0D0B15 100%);
  }

  .ana-portraits-grid {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: clamp(16px,2.5vw,32px);
    max-width: 1280px;
    margin: 0 auto;
  }

  .ana-portrait-card {
    cursor: pointer;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s, transform 0.7s;
  }

  .ana-portrait-card.visible { opacity: 1; transform: translateY(0); }

  .ana-portrait-frame {
    padding: clamp(10px,1.5vw,16px);
    background: linear-gradient(145deg,#3a2a0e 0%,#1a1208 30%,#2e2210 60%,#1a1005 100%);
    box-shadow: 
      0 0 0 1px rgba(201,168,76,0.4),
      0 0 0 3px rgba(201,168,76,0.08),
      4px 6px 0 rgba(0,0,0,0.7),
      inset 0 0 0 1px rgba(201,168,76,0.15),
      0 20px 60px rgba(0,0,0,0.8);
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s;
    position: relative;
  }

  .ana-portrait-frame::before { content:''; position:absolute; top:6px; left:6px; width:20px; height:20px; border-top:2px solid rgba(201,168,76,0.7); border-left:2px solid rgba(201,168,76,0.7); opacity:0.9; z-index:2; }
  .ana-portrait-frame::after { content:''; position:absolute; bottom:6px; right:6px; width:20px; height:20px; border-bottom:2px solid rgba(201,168,76,0.7); border-right:2px solid rgba(201,168,76,0.7); opacity:0.9; z-index:2; }

  .ana-portrait-card:hover .ana-portrait-frame { 
    transform:translateY(-14px) scale(1.02); 
    box-shadow:
      0 0 0 1px rgba(201,168,76,0.8),
      0 0 0 3px rgba(201,168,76,0.15),
      6px 8px 0 rgba(0,0,0,0.6),
      0 0 40px rgba(201,168,76,0.25),
      0 0 80px rgba(201,168,76,0.1),
      0 40px 100px rgba(0,0,0,0.8);
  }

 .ana-portrait-img-wrap { position:relative; aspect-ratio:3/4; overflow:hidden; background:#1A1208; }
  .ana-portrait-img { width:100%; height:100%; object-fit:cover; filter:sepia(45%) contrast(1.15) brightness(0.75) saturate(0.7); transition:filter 0.6s,transform 0.6s; }
  .ana-portrait-card:hover .ana-portrait-img { filter:sepia(10%) contrast(1.2) brightness(1.0); transform:scale(1.08); }
  .ana-portrait-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(9,9,15,0.95) 0%,rgba(9,9,15,0.4) 40%,transparent 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:clamp(10px,2vw,18px); }
  .ana-portrait-play { width:40px; height:40px; border:1px solid var(--or); border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:10px; opacity:0; transform:translateY(10px); transition:opacity 0.4s,transform 0.4s; background:rgba(201,168,76,0.1); }
  .ana-portrait-card:hover .ana-portrait-play { opacity:1; transform:translateY(0); }
  .ana-portrait-era { font-family:'Cinzel',serif; font-size:clamp(0.45rem,1vw,0.55rem); letter-spacing:0.3em; text-transform:uppercase; color:var(--or); opacity:0.9; margin-bottom:4px; }
  .ana-portrait-name { font-family:'Cinzel',serif; font-size:clamp(0.7rem,1.5vw,0.95rem); color:var(--ivoire); letter-spacing:0.05em; line-height:1.3; }
  .ana-portrait-duration { font-style:italic; font-size:0.78rem; color:var(--ivoire-sombre); opacity:0.7; margin-top:3px; }
  /* VILLES */
  .ana-villes {
    padding: clamp(60px,10vw,130px) 5%;
    background: linear-gradient(180deg,#0D0B15 0%,#0A0A14 100%);
    position: relative;
    overflow: hidden;
  }

  .ana-map-frame {
    max-width: 1100px;
    margin: 0 auto;
    border: 1px solid rgba(201,168,76,0.2);
    background: #060d18;
    position: relative;
    cursor: pointer;
    transition: border-color 0.3s;
    overflow: hidden;
  }

  .ana-map-frame:hover { border-color: rgba(201,168,76,0.45); }
  .ana-map-frame::before { content:''; position:absolute; top:8px; left:8px; width:24px; height:24px; border-top:1px solid var(--or-sombre); border-left:1px solid var(--or-sombre); opacity:0.6; z-index:10; pointer-events:none; }
  .ana-map-frame::after { content:''; position:absolute; bottom:8px; right:8px; width:24px; height:24px; border-bottom:1px solid var(--or-sombre); border-right:1px solid var(--or-sombre); opacity:0.6; z-index:10; pointer-events:none; }

  .ana-map-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    background: rgba(6,13,24,0.15);
    transition: background 0.3s;
    pointer-events: none;
  }

  .ana-map-frame:hover .ana-map-overlay { background: rgba(6,13,24,0.05); }

  .ana-map-cta-badge {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--ivoire);
    background: rgba(9,9,15,0.75);
    border: 1px solid rgba(201,168,76,0.35);
    padding: 10px 24px;
    backdrop-filter: blur(4px);
    transition: all 0.3s;
  }

  .ana-map-frame:hover .ana-map-cta-badge {
    background: rgba(201,168,76,0.12);
    border-color: var(--or);
    color: var(--or-clair);
  }

  .ana-map-caption { text-align:center; padding: 12px; font-style:italic; font-size:0.82rem; color:rgba(212,201,176,0.35); background: rgba(6,13,24,0.5); }

  @keyframes city-pulse-home { 0%{opacity:0.8} 100%{r:18;opacity:0} }
  .city-ring-home { animation: city-pulse-home 2.5s ease-out infinite; fill:none; }

  .ana-fiction {
    padding: clamp(60px,10vw,130px) 5%;
    background: linear-gradient(180deg,#0A0A14 0%,var(--noir) 100%);
  }

  .ana-fiction-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: clamp(16px,2.5vw,28px);
    max-width: 1200px;
    margin: 0 auto;
  }

  .ana-fiction-card { cursor:pointer; opacity:0; transform:translateY(24px); transition:opacity 0.5s,transform 0.5s; }
  .ana-fiction-card.visible { opacity:1; transform:translateY(0); }
  .ana-fiction-inner { border:1px solid rgba(201,168,76,0.15); background:linear-gradient(145deg,rgba(26,18,8,0.8),rgba(13,13,26,0.9)); padding:clamp(20px,3vw,32px); transition:border-color 0.4s,box-shadow 0.4s,transform 0.4s; position:relative; overflow:hidden; height:100%; }
  .ana-fiction-inner::after { content:''; position:absolute; top:8px; right:8px; width:12px; height:12px; border-top:1px solid var(--or-sombre); border-right:1px solid var(--or-sombre); opacity:0.5; }
  .ana-fiction-card:hover .ana-fiction-inner { border-color:rgba(201,168,76,0.4); box-shadow:0 20px 60px rgba(0,0,0,0.5); transform:translateY(-6px); }
  .ana-fiction-new { font-family:'Cinzel',serif; font-size:0.5rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--noir); background:var(--or); padding:3px 9px; display:inline-block; margin-bottom:16px; }
  .ana-fiction-week { font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--or-sombre); margin-bottom:10px; display:block; }
  .ana-fiction-title { font-family:'Cinzel Decorative',serif; font-size:clamp(0.85rem,1.8vw,1.1rem); color:var(--ivoire); line-height:1.35; margin-bottom:14px; }
  .ana-fiction-excerpt { font-style:italic; font-size:clamp(0.85rem,1.5vw,0.95rem); color:var(--ivoire-sombre); line-height:1.75; opacity:0.8; }
  .ana-fiction-footer { margin-top:20px; padding-top:16px; border-top:1px solid rgba(201,168,76,0.1); display:flex; align-items:center; justify-content:space-between; }
  .ana-fiction-duration { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.15em; color:var(--or-sombre); }
  .ana-fiction-arrow { color:var(--or); font-size:1rem; opacity:0; transform:translateX(-6px); transition:opacity 0.3s,transform 0.3s; }
  .ana-fiction-card:hover .ana-fiction-arrow { opacity:1; transform:translateX(0); }

  .ana-premium { padding:clamp(60px,8vw,100px) 5%; background:linear-gradient(135deg,var(--brun) 0%,#1a1208 40%,#0D0D1A 100%); border-top:1px solid rgba(201,168,76,0.15); border-bottom:1px solid rgba(201,168,76,0.15); text-align:center; position:relative; overflow:hidden; }
  .ana-premium::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 70% 80% at 50% 50%,rgba(201,168,76,0.06) 0%,transparent 70%); }
  .ana-premium-inner { position:relative; max-width:700px; margin:0 auto; }
  .ana-price { font-family:'Cinzel Decorative',serif; font-size:clamp(2.5rem,7vw,5rem); color:var(--or); text-shadow:0 0 40px rgba(201,168,76,0.3); line-height:1; margin:20px 0 6px; }
  .ana-perks { display:flex; gap:clamp(16px,4vw,40px); justify-content:center; flex-wrap:wrap; margin:28px 0 36px; }
  .ana-perk { display:flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:clamp(0.55rem,1.2vw,0.67rem); letter-spacing:0.15em; text-transform:uppercase; color:var(--ivoire-sombre); }
  .ana-perk-dot { width:4px; height:4px; background:var(--or); transform:rotate(45deg); }

  .ana-footer { padding:clamp(40px,6vw,70px) 5% clamp(24px,4vw,40px); border-top:1px solid rgba(201,168,76,0.12); background:#070710; }
  .ana-footer-top { display:flex; align-items:flex-start; justify-content:space-between; gap:40px; flex-wrap:wrap; margin-bottom:40px; }
  .ana-footer-tagline { font-style:italic; font-size:0.85rem; color:rgba(212,201,176,0.45); max-width:200px; line-height:1.7; margin-top:10px; }
  .ana-footer-group h4 { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--or-sombre); margin-bottom:16px; }
  .ana-footer-group ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
  .ana-footer-group a { font-size:0.85rem; color:rgba(212,201,176,0.5); text-decoration:none; transition:color 0.3s; }
  .ana-footer-group a:hover { color:var(--or); }
  .ana-footer-bottom { border-top:1px solid rgba(201,168,76,0.08); padding-top:24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
  .ana-footer-copy { font-size:0.75rem; color:rgba(212,201,176,0.3); font-style:italic; }

  .ana-reveal { opacity:0; transform:translateY(30px); transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .ana-reveal.visible { opacity:1; transform:translateY(0); }
.ana-cta-center { text-align:center; margin-top:clamp(40px,5vw,64px); width:100%; display:block; }
  @media (max-width:1024px) {
    .ana-portraits-grid { grid-template-columns:repeat(2,1fr); }
    .ana-fiction-grid { grid-template-columns:repeat(2,1fr); }
    .ana-nav-links { display:none; }
    .ana-hamburger { display:flex; }
  }

  @media (max-width:640px) {
    .ana-portraits-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
    .ana-fiction-grid { grid-template-columns:1fr; }
    .ana-hero-actions { flex-direction:column; align-items:center; }
    .ana-btn-primary,.ana-btn-secondary { width:100%; max-width:280px; text-align:center; }
    .ana-footer-top { flex-direction:column; }
    .ana-perks { flex-direction:column; align-items:center; }
  }
`;

const portraits = [
 { name:"Napoléon Bonaparte", era:"Empire Français · 1769–1821", img:"https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&q=80", videoId:null },
{ name:"Cléopâtre VII", era:"Égypte Antique · 69–30 av. J.-C.", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", videoId:null },
{ name:"Jules César", era:"République Romaine · 100–44 av. J.-C.", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", videoId:null },
  { name:"Marie-Antoinette", era:"Royaume de France · 1755–1793", img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", videoId:"ybgrOEqDkNs" },
];

const homeCities = [
  { name:"Paris",         coordinates:[2.35,48.85]   },
  { name:"Rome",          coordinates:[12.5,41.9]    },
  { name:"Constantinople",coordinates:[28.97,41.01]  },
  { name:"Le Caire",      coordinates:[31.24,30.04]  },
  { name:"Pékin",         coordinates:[116.4,39.9]   },
  { name:"Tenochtitlan",  coordinates:[-99.13,19.43] },
  { name:"Bagdad",        coordinates:[44.36,33.34]  },
  { name:"Londres",       coordinates:[-0.12,51.5]   },
  { name:"Tokyo",         coordinates:[139.69,35.68] },
  { name:"New York",      coordinates:[-74.0,40.71]  },
];

const uchronies = [
  { isNew:true,  week:"Semaine 8 · 2025", title:"Et si Napoléon avait remporté Waterloo ?",                 excerpt:"Juin 1815. Les Cent-Jours se prolongent. L'Europe tremble. Mais dans cette ligne temporelle, les canons de Wellington se taisent au crépuscule…", duration:"8 min" },
  { isNew:false, week:"Semaine 7 · 2025", title:"Alexandre le Grand atteint l'Inde et ne revient jamais",  excerpt:"323 av. J.-C. Au lieu de mourir à Babylone, Alexandre pousse ses armées vers l'est. Un empire qui s'étend jusqu'aux rives du Pacifique…",       duration:"6 min" },
  { isNew:false, week:"Semaine 6 · 2025", title:"Rome n'a jamais chuté en 476 après J.-C.",                excerpt:"Odoacre est repoussé. L'Empire d'Occident survit. Que serait l'Europe aujourd'hui si la lumière de Rome n'avait jamais vacillé ?",               duration:"7 min" },
];

export default function Homepage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCity, setHoveredCity] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

setTimeout(() => {
  document.querySelectorAll('.ana-reveal, .ana-portrait-card, .ana-fiction-card').forEach(el => observer.observe(el));
}, 100);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const cardDelay = (i) => ({ transitionDelay:`${i * 0.1}s` });

  return (
    <>
      <style>{styles}</style>

      <nav className={`ana-nav ${scrolled ? 'scrolled' : ''}`}>
        <span onClick={() => navigate('/')} style={{cursor:'pointer'}}>
  <AnachronaLogo onClick={()=>navigate('/')} size={38} />

</span>
        <ul className="ana-nav-links">
          <li><a onClick={() => navigate('/catalogue')} style={{cursor:'pointer'}}>Histoire</a></li>
          <li><a href="#portraits">Les Portraits</a></li>
          <li><a onClick={() => navigate('/villes')} style={{cursor:'pointer'}}>Les Villes <span className="ana-premium-badge">Premium</span></a></li>
          <li><a onClick={() => navigate('/uchronies')} style={{cursor:'pointer'}}>La Fiction <span className="ana-premium-badge">Premium</span></a></li>
          <li><a href="#">L'Arène</a></li>
        </ul>
<button onClick={()=>navigate('/login')} className="ana-nav-cta">Devenir Premium</button>        <button className={`ana-hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`ana-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#portraits" onClick={() => setMenuOpen(false)}>Les Portraits</a>
        <a onClick={() => { setMenuOpen(false); navigate('/villes'); }}>Les Villes</a>
        <a href="#fiction" onClick={() => setMenuOpen(false)}>La Fiction</a>
        <a href="#" onClick={() => setMenuOpen(false)}>L'Arène</a>
        <a href="#" onClick={() => setMenuOpen(false)}>Musées</a>
        <a href="#premium" className="ana-btn-primary" onClick={() => setMenuOpen(false)}>Devenir Premium</a>
      </div>

      <section className="ana-hero">
        <HeroParticles />
        <div className="ana-hero-bg" />
        <div className="ana-hero-ring" />
        <div className="ana-hero-ring" />
        {[...Array(16)].map((_,i) => (
          <div key={i} className="ana-particle" style={{ left:`${Math.random()*100}%`, animationDuration:`${8+Math.random()*14}s`, animationDelay:`${Math.random()*10}s`, width:`${1+Math.random()*2}px`, height:`${1+Math.random()*2}px` }} />
        ))}
        <div className="ana-hero-content">
          <p className="ana-eyebrow">✦ L'Histoire Prend Vie ✦</p>
          <HeroHourglass />
          <h1 className="ana-hero-title"><span className="ana-gold">Ana</span>chrona</h1>
          <div className="ana-divider">
            <div className="ana-div-line" /><div className="ana-div-gem-sm" /><div className="ana-div-gem" /><div className="ana-div-gem-sm" /><div className="ana-div-line r" />
          </div>
          <p className="ana-subtitle">Traversez les siècles grâce à des vidéos créées par intelligence artificielle. Portraits d'empereurs, villes disparues, uchronies… le passé ne dort jamais.</p>
          <div className="ana-hero-actions">
            <a href="#portraits" className="ana-btn-primary">Explorer l'Histoire</a>
          </div>
        </div>
        <div className="ana-scroll-indicator">
          <div className="ana-scroll-bar" />
          Défiler
        </div>
      </section>

      <section className="ana-portraits" id="portraits">
        <div className="ana-section-header ana-reveal">
          <span className="ana-section-tag">✦ Accès Gratuit ✦</span>
          <h2 className="ana-section-title">Les Portraits</h2>
          <div className="ana-divider" style={{margin:'16px auto'}}>
            <div className="ana-div-line" /><div className="ana-div-gem" /><div className="ana-div-line r" />
          </div>
          <p className="ana-section-desc">Une galerie de figures légendaires, chacune ressuscitée en une minute par l'intelligence artificielle.</p>
        </div>
        <div className="ana-portraits-grid">
          {portraits.map((p,i) => (
            <div key={i} className="ana-portrait-card" style={cardDelay(i)}>
              <div className="ana-portrait-frame">
                <div className="ana-portrait-img-wrap">
                  {p.videoId ? (
  <iframe
  title="Portrait vidéo"
    src={`https://www.youtube.com/embed/${p.videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
    style={{width:'100%',height:'100%',border:'none',position:'absolute',inset:0, pointerEvents:'auto'}}    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
    allowFullScreen
  />
) : (
  <img className="ana-portrait-img" src={p.img} alt={p.name} />
)}
                  {!p.videoId && <div className="ana-portrait-overlay">
  <div className="ana-portrait-play">
    <svg width="12" height="14" viewBox="0 0 10 12" fill="var(--or)"><path d="M0 0 L10 6 L0 12 Z"/></svg>
  </div>
  <span className="ana-portrait-era">{p.era}</span>
  <div className="ana-portrait-name">{p.name}</div>
  <div className="ana-portrait-duration">1 min · Vidéo IA</div>
</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ana-cta-center">
          <button onClick={()=>navigate('/galerie')} className="ana-btn-secondary">Voir toute la galerie</button>
        </div>
      </section>

      {/* VILLES avec vraie carte */}
      <section className="ana-villes" id="villes">
        <div className="ana-section-header ana-reveal">
          <div className="ana-prem-badge">✦ Anachrona Premium</div>
          <h2 className="ana-section-title">Les Villes</h2>
          <div className="ana-divider" style={{margin:'16px auto'}}>
            <div className="ana-div-line" /><div className="ana-div-gem" /><div className="ana-div-line r" />
          </div>
          <p className="ana-section-desc">Voyagez à travers le planisphère et découvrez les cités du monde à travers les époques.</p>
        </div>
        <div className="ana-reveal">
          <div className="ana-map-frame" onClick={() => navigate('/villes')}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 140, center: [15, 20] }}
              style={{ width:'100%', height:'auto', display:'block', background:'#2c4a3e' }}
            >
              <defs>
                <radialGradient id="seaBgHome" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#3a6b5a"/>
                  <stop offset="100%" stopColor="#1e3d30"/>
                </radialGradient>
              </defs>
              <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#seaBgHome)"/>
              <Geographies geography={worldData}>
                {({geographies}) => geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill:'#c8a96e', stroke:'#7a5c2e', strokeWidth:0.5, outline:'none' },
                      hover:   { fill:'#c8a96e', stroke:'#7a5c2e', strokeWidth:0.5, outline:'none' },
                      pressed: { fill:'#1c1808', outline:'none' },
                    }}
                  />
                ))}
              </Geographies>
              {homeCities.map((city, i) => {
                const isHov = hoveredCity === i;
                return (
                  <Marker
                    key={i}
                    coordinates={city.coordinates}
                    onMouseEnter={() => setHoveredCity(i)}
                    onMouseLeave={() => setHoveredCity(null)}
                  >
                    {isHov && (
                      <circle className="city-ring-home" r="10" stroke="#C9A84C" strokeWidth="0.8"/>
                    )}
                    <circle r={isHov ? 6 : 4} fill="#c0392b" style={{filter:'drop-shadow(0 0 4px rgba(201,168,76,0.9))', transition:'r 0.2s'}}/>
                    {isHov && (
                      <text textAnchor="middle" y={-10} style={{fontFamily:'Cinzel,serif', fontSize:'5px', fill:'#E8C96A', letterSpacing:'0.5px', pointerEvents:'none'}}>
                        {city.name}
                      </text>
                    )}
                  </Marker>
                );
              })}
            </ComposableMap>
            <div className="ana-map-overlay">
              <span className="ana-map-cta-badge">✦ Explorer la carte interactive ✦</span>
            </div>
            <p className="ana-map-caption">Cliquez sur la carte pour l'explorer en plein écran</p>
          </div>
        </div>
      </section>

      <section className="ana-fiction" id="fiction">
        <div className="ana-section-header ana-reveal">
          <div className="ana-prem-badge">✦ Anachrona Premium</div>
          <h2 className="ana-section-title">La Fiction</h2>
          <div className="ana-divider" style={{margin:'16px auto'}}>
            <div className="ana-div-line" /><div className="ana-div-gem" /><div className="ana-div-line r" />
          </div>
          <p className="ana-section-desc">Des uchronies publiées chaque semaine. Et si l'Histoire avait pris un autre chemin ?</p>
        </div>
        <div className="ana-fiction-grid">
          {uchronies.map((u,i) => (
            <div key={i} className="ana-fiction-card" style={cardDelay(i)}>
              <div className="ana-fiction-inner">
                {u.isNew && <span className="ana-fiction-new">Nouveau</span>}
                <span className="ana-fiction-week">{u.week}</span>
                <h3 className="ana-fiction-title">{u.title}</h3>
                <p className="ana-fiction-excerpt">{u.excerpt}</p>
                <div className="ana-fiction-footer">
                  <span className="ana-fiction-duration">Vidéo · {u.duration}</span>
                  <span className="ana-fiction-arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ana-cta-center ana-reveal">
<button onClick={()=>navigate('/uchronies')} className="ana-btn-secondary">Voir toutes les uchronies</button>        </div>
      </section>

      <section className="ana-premium" id="premium">
        <div className="ana-premium-inner ana-reveal">
          <span className="ana-section-tag">✦ Anachrona Premium ✦</span>
          <h2 className="ana-section-title">Ouvrez toutes les portes du temps</h2>
          <div className="ana-divider" style={{margin:'16px auto'}}>
            <div className="ana-div-line" /><div className="ana-div-gem" /><div className="ana-div-line r" />
          </div>
          <div className="ana-price">5€<sub style={{fontSize:'0.4em',verticalAlign:'sub',opacity:0.7}}>/mois</sub></div>
          <p style={{fontStyle:'italic',fontSize:'0.9rem',color:'var(--ivoire-sombre)',opacity:0.7}}>Sans engagement · Résiliable à tout moment</p>
          <div className="ana-perks">
            {["Les Villes — Carte interactive","La Fiction — Uchronies hebdo","L'Arène — Accès complet","Grimoire — Archives musées"].map((p,i) => (
              <div key={i} className="ana-perk"><div className="ana-perk-dot" />{p}</div>
            ))}
          </div>
<button onClick={()=>navigate('/login')} className="ana-btn-primary" style={{fontSize:'0.72rem',padding:'16px 48px'}}>Commencer l'aventure</button>        </div>
      </section>

      <footer className="ana-footer">
        <div className="ana-footer-top">
          <div>
            <span onClick={() => navigate('/')} style={{cursor:'pointer'}}>
  <AnachronaLogo onClick={()=>navigate('/')} size={38} />
</span>
            <p className="ana-footer-tagline">L'Histoire prend vie grâce à l'intelligence artificielle.</p>
          </div>
          {[
            { title:"Explorer", links:["Les Portraits","Les Villes","La Fiction","L'Arène"] },
            { title:"Premium", links:["Abonnement 5€/mois","Partenaires Musées","Le Grimoire"] },
            { title:"À propos", links:["Notre mission","Contact","Mentions légales","CGU"] },
          ].map((g,i) => (
            <div key={i} className="ana-footer-group">
              <h4>{g.title}</h4>
              <ul>{g.links.map((l,j) => <li key={j}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="ana-footer-bottom">
          <span className="ana-footer-copy">© 2025 Anachrona. Tous droits réservés.</span>
          <div className="ana-divider" style={{margin:0}}>
            <div className="ana-div-line" style={{width:30}} />
            <div className="ana-div-gem-sm" />
            <div className="ana-div-line r" style={{width:30}} />
          </div>
          <span className="ana-footer-copy">Façonné avec l'IA · Inspiré par l'Histoire</span>
        </div>
      </footer>
    </>
  );
}
