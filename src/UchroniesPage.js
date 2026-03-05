import PremiumGate from './PremiumGate';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UCHRONIES = [
  {
    id: 1,
    semaine: "Semaine 8 · 2025",
    titre: "Et si Napoléon avait remporté Waterloo ?",
    soustitre: "Les Cent-Jours éternels",
    extrait: "Juin 1815. Les canons de Wellington se taisent au crépuscule. Ney, contre toute attente, enfonce le centre allié. L'Empereur, le regard fixé sur l'horizon flamand, comprend que l'Histoire vient de bifurquer. Paris célèbre. L'Europe tremble. Mais pour combien de temps encore ?",
    texte_long: "Juin 1815. La plaine de Waterloo est couverte de fumée quand le maréchal Ney lance sa dernière charge. Contre toute attente historique, les cuirassiers percent la ligne anglaise. Wellington, blessé, ordonne la retraite. Blücher arrive trop tard. Napoléon a gagné.\n\nDans cette ligne temporelle, les Cent-Jours se prolongent indéfiniment. L'Acte Additionnel devient la constitution d'un Empire libéral. La Sainte-Alliance se disloque. La Prusse négocie. L'Angleterre, épuisée par vingt ans de guerre, accepte un traité de paix humiliant.\n\nMais la question demeure : un Napoléon vieillissant peut-il maintenir un empire que même ses victoires n'ont jamais réussi à stabiliser ? Et si Waterloo n'était pas une défaite militaire, mais la seule issue possible à une contradiction fondamentale — celle d'un homme qui voulait à la fois la liberté et le pouvoir absolu ?",
    duree: "8 min",
    epoque: "Époque Moderne · 1815",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    free: true,
    featured: true,
    tags: ["Napoléon", "Europe", "Guerres"]
  },
  {
    id: 2,
    semaine: "Semaine 7 · 2025",
    titre: "Alexandre le Grand atteint l'Inde et ne revient jamais",
    soustitre: "L'Empire sans fin",
    extrait: "323 av. J.-C. Plutôt que de mourir à Babylone, Alexandre pousse ses armées vers l'est. Ses généraux, épuisés, le suivent par crainte autant que par loyauté. Le Gange se profile. Un empire qui pourrait s'étendre jusqu'aux rives du Pacifique…",
    texte_long: "323 av. J.-C. Alexandre ne meurt pas à Babylone. La fièvre passe. Il convoque ses généraux et leur annonce sa décision : pousser vers l'est, jusqu'aux confins du monde connu.\n\nL'armée macédonienne, enrichie de soldats perses, indiens et bactriens, franchit l'Indus puis le Gange. Alexandre fonde Alexandria Ultima au bord de ce qu'il croit être l'océan oriental. Il ne reviendra jamais en Grèce.\n\nSon empire, gouverné depuis une capitale mobile, se fragmente progressivement. Mais les routes commerciales qu'il ouvre entre la Méditerranée et l'Asie du Sud-Est transforment le monde antique. La soie, les épices, les philosophies circulent deux siècles avant leur heure.\n\nQue serait devenu Rome si Alexandre avait survécu pour la défier ? Et la Chine des Han, confrontée à un empire hellénistique à ses portes occidentales ?",
    duree: "6 min",
    epoque: "Antiquité · 323 av. J.-C.",
    img: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80",
    free: false,
    featured: false,
    tags: ["Alexandre", "Grèce", "Conquête"]
  },
  {
    id: 3,
    semaine: "Semaine 6 · 2025",
    titre: "Rome n'a jamais chuté en 476 après J.-C.",
    soustitre: "L'Empire immortel",
    extrait: "Odoacre est repoussé aux portes de Ravenne. L'Empire d'Occident survit, diminué mais vivant. Que serait l'Europe aujourd'hui si la lumière de Rome n'avait jamais vacillé sous les coups des peuples germaniques ?",
    texte_long: "476 ap. J.-C. Odoacre, roi des Hérules, s'apprête à déposer Romulus Augustule. Mais une armée de secours arrive de Constantinople — Zénon, l'Empereur d'Orient, a finalement décidé d'agir.\n\nRome survit, diminuée, transformée, métissée. L'Empire d'Occident devient une entité hybride, mi-romaine mi-germanique. Le latin reste langue officielle. Le droit romain continue de s'appliquer. L'Église de Rome ne devient jamais le seul gardien de la culture antique.\n\nSans le vide laissé par la chute de Rome, le féodalisme n'émerge pas. La Renaissance n'est pas une 're-naissance' mais une continuation. L'Islam, né deux siècles plus tard, rencontre un Empire romain encore puissant.\n\nL'histoire de l'Europe — et du monde — aurait été fondamentalement différente.",
    duree: "7 min",
    epoque: "Antiquité Tardive · 476",
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    free: false,
    featured: false,
    tags: ["Rome", "Empire", "Chute"]
  },
  {
    id: 4,
    semaine: "Semaine 5 · 2025",
    titre: "Jeanne d'Arc survit au bûcher de Rouen",
    soustitre: "La Pucelle immortelle",
    extrait: "Mai 1431. Au dernier moment, un chevalier bourguignon fait basculer le verdict. Jeanne est exilée plutôt qu'exécutée. Elle traversera l'Europe, rencontrera des papes et des sultans, et deviendra une figure politique d'une puissance inattendue.",
    texte_long: "30 mai 1431. Le bûcher est prêt sur la place du Vieux-Marché à Rouen. Mais un messager arrive de Paris portant une lettre du duc de Bedford : Jeanne sera exilée plutôt qu'exécutée, pour éviter d'en faire une martyre.\n\nJeanne d'Arc, libérée sous condition, quitte la France vers l'est. Elle traversera l'Allemagne, rencontrera l'Empereur Sigismond, puis continuera vers Rome où le pape Eugène IV la recevra avec méfiance.\n\nSon errance la mènera finalement à Constantinople, où elle deviendra conseillère militaire de Jean VIII Paléologue face à la menace ottomane croissante.\n\nDans cette ligne temporelle, Jeanne ne devient pas sainte — elle devient légende de son vivant, une figure politique qui brouille toutes les frontières entre guerre, foi et diplomatie.",
    duree: "9 min",
    epoque: "Moyen Âge · 1431",
    img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    free: false,
    featured: false,
    tags: ["Jeanne d'Arc", "France", "Guerre de Cent Ans"]
  },
];

const featured = UCHRONIES.find(u => u.featured);
const recentes = UCHRONIES.filter(u => !u.featured).slice(0, 3);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

  :root {
    --noir: #09090F;
    --or: #C9A84C;
    --or-clair: #E8C96A;
    --or-sombre: #8B6914;
    --ivoire: #F5F0E8;
    --ivoire-sombre: #D4C9B0;
    --parchemin: #2a1f0e;
    --parchemin-clair: #3d2e14;
    --bois: #1a1005;
    --encre: #0d0905;
  }

  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { background:var(--bois); color:var(--ivoire); font-family:'EB Garamond',serif; overflow-x:hidden; }

  /* Texture parchemin */
  body::before {
    content:'';
    position:fixed; inset:0;
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events:none;
    z-index:0;
    opacity:0.6;
  }

  /* NAVBAR */
  .un { position:fixed; top:0; width:100%; z-index:1000; padding:16px 5%; display:flex; align-items:center; justify-content:space-between; background:rgba(9,6,2,0.97); border-bottom:1px solid rgba(201,168,76,0.2); }
  .un-logo { font-family:'Cinzel Decorative',serif; font-size:clamp(1rem,2.5vw,1.4rem); color:var(--or); letter-spacing:0.1em; cursor:pointer; text-shadow:0 0 20px rgba(201,168,76,0.3); }
  .un-links { display:flex; gap:28px; list-style:none; align-items:center; }
  .un-links a { font-family:'Cinzel',serif; font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--ivoire-sombre); text-decoration:none; transition:color 0.3s; cursor:pointer; }
  .un-links a:hover { color:var(--or); }
  .un-cta { font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--noir); background:var(--or); padding:9px 18px; cursor:pointer; border:none; transition:all 0.3s; }
  .un-cta:hover { background:var(--or-clair); }

  .u-page {
    min-height:100vh;
    padding-top:72px;
    position:relative;
    background:
      radial-gradient(ellipse 100% 50% at 50% 0%, rgba(139,105,20,0.08) 0%, transparent 60%),
      linear-gradient(180deg, #0d0905 0%, #1a1005 30%, #150e04 70%, #0d0905 100%);
  }

  /* HEADER */
  .u-hdr {
    padding:clamp(50px,7vw,90px) 5% clamp(35px,5vw,60px);
    text-align:center;
    position:relative;
    border-bottom:1px solid rgba(201,168,76,0.1);
  }

  .u-hdr::before {
    content:'';
    position:absolute; left:5%; right:5%; top:0; height:3px;
    background:linear-gradient(90deg,transparent,var(--or-sombre),var(--or),var(--or-sombre),transparent);
    opacity:0.5;
  }

  .u-hdr::after {
    content:'';
    position:absolute; left:0; right:0; bottom:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);
  }

  .u-badge { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:0.5rem; letter-spacing:0.35em; text-transform:uppercase; color:var(--or-sombre); border:1px solid rgba(201,168,76,0.22); padding:5px 18px; margin-bottom:18px; }
  .u-ttl { font-family:'Cinzel Decorative',serif; font-size:clamp(2rem,6vw,4.5rem); color:var(--ivoire); letter-spacing:0.06em; text-shadow:0 0 60px rgba(201,168,76,0.12); margin-bottom:10px; }
  .u-dvd { display:flex; align-items:center; justify-content:center; gap:14px; margin:16px auto 18px; }
  .u-dl { height:1px; width:clamp(50px,8vw,110px); background:linear-gradient(to right,transparent,var(--or)); }
  .u-dl.r { background:linear-gradient(to left,transparent,var(--or)); }
  .u-dg { width:6px; height:6px; background:var(--or); transform:rotate(45deg); }
  .u-dsc { font-style:italic; font-size:clamp(1rem,2vw,1.15rem); color:var(--ivoire-sombre); opacity:0.75; max-width:560px; margin:0 auto; line-height:1.85; }

  /* UCHRONIE VEDETTE */
  .u-featured-wrap {
    padding:clamp(40px,6vw,70px) 5%;
    max-width:1300px;
    margin:0 auto;
  }

  .u-section-lbl {
    font-family:'Cinzel',serif;
    font-size:0.5rem;
    letter-spacing:0.4em;
    text-transform:uppercase;
    color:var(--or);
    opacity:0.7;
    margin-bottom:20px;
    display:flex;
    align-items:center;
    gap:14px;
  }
  .u-section-lbl::after {
    content:'';
    flex:1;
    height:1px;
    background:linear-gradient(to right,rgba(201,168,76,0.3),transparent);
  }

  .u-featured {
    display:grid;
    grid-template-columns:1.2fr 1fr;
    gap:clamp(24px,4vw,56px);
    background:linear-gradient(135deg,rgba(42,31,14,0.6),rgba(26,16,5,0.8));
    border:1px solid rgba(201,168,76,0.2);
    position:relative;
    cursor:pointer;
    transition:border-color 0.4s;
    overflow:hidden;
  }

  .u-featured::before {
    content:'';
    position:absolute; top:8px; left:8px;
    width:22px; height:22px;
    border-top:2px solid var(--or-sombre);
    border-left:2px solid var(--or-sombre);
    opacity:0.7;
  }
  .u-featured::after {
    content:'';
    position:absolute; bottom:8px; right:8px;
    width:22px; height:22px;
    border-bottom:2px solid var(--or-sombre);
    border-right:2px solid var(--or-sombre);
    opacity:0.7;
  }

  .u-featured:hover { border-color:rgba(201,168,76,0.5); }
  .u-featured:hover .u-fimg { filter:sepia(20%) contrast(1.15) brightness(0.85) saturate(0.8); transform:scale(1.03); }

  .u-fimg-wrap {
    position:relative;
    aspect-ratio:4/3;
    overflow:hidden;
    background:#1a1005;
  }

  .u-fimg {
    width:100%; height:100%; object-fit:cover;
    filter:sepia(45%) contrast(1.1) brightness(0.7) saturate(0.65);
    transition:filter 0.6s, transform 0.6s;
  }

  .u-fimg-overlay {
    position:absolute; inset:0;
    background:linear-gradient(to right,transparent 60%,rgba(26,16,5,0.9));
  }

  .u-fnew {
    position:absolute; top:18px; left:18px;
    font-family:'Cinzel',serif; font-size:0.48rem;
    letter-spacing:0.3em; text-transform:uppercase;
    color:var(--noir); background:var(--or);
    padding:4px 12px;
    z-index:2;
  }

  .u-fbody {
    padding:clamp(24px,3vw,44px) clamp(20px,3vw,40px) clamp(24px,3vw,44px) 0;
    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  .u-fsemaine { font-family:'Cinzel',serif; font-size:0.5rem; letter-spacing:0.32em; text-transform:uppercase; color:var(--or-sombre); margin-bottom:12px; }
  .u-ftitre { font-family:'Cinzel Decorative',serif; font-size:clamp(1.2rem,2.5vw,1.8rem); color:var(--ivoire); line-height:1.25; margin-bottom:8px; }
  .u-fsoustitre { font-family:'Cinzel',serif; font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--or); opacity:0.7; margin-bottom:18px; }
  .u-fline { height:1px; background:linear-gradient(to right,var(--or-sombre),transparent); margin-bottom:18px; opacity:0.35; }
  .u-fextrait { font-style:italic; font-size:clamp(0.92rem,1.6vw,1.05rem); color:var(--ivoire-sombre); line-height:1.9; opacity:0.85; margin-bottom:24px; }

  .u-ftags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:24px; }
  .u-ftag { font-family:'Cinzel',serif; font-size:0.42rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--or-sombre); border:1px solid rgba(201,168,76,0.2); padding:3px 10px; }

  .u-fbtn {
    font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.25em; text-transform:uppercase;
    color:var(--noir); background:linear-gradient(135deg,var(--or),var(--or-clair));
    padding:13px 28px; border:none; cursor:pointer;
    align-self:flex-start;
    transition:all 0.3s;
  }
  .u-fbtn:hover { box-shadow:0 0 24px rgba(201,168,76,0.4); transform:translateY(-2px); }
  .u-fdur { font-family:'Cinzel',serif; font-size:0.5rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--or-sombre); margin-top:12px; }

  /* UCHRONIES RÉCENTES */
  .u-recentes-wrap {
    padding:0 5% clamp(50px,7vw,90px);
    max-width:1300px;
    margin:0 auto;
  }

  .u-recentes-grid {
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:clamp(16px,2.5vw,32px);
  }

  .u-card {
    background:linear-gradient(145deg,rgba(42,31,14,0.5),rgba(20,13,4,0.7));
    border:1px solid rgba(201,168,76,0.15);
    cursor:pointer;
    transition:border-color 0.35s, transform 0.35s, box-shadow 0.35s;
    position:relative;
    overflow:hidden;
  }

  .u-card::before {
    content:'';
    position:absolute; top:6px; left:6px;
    width:14px; height:14px;
    border-top:1px solid var(--or-sombre);
    border-left:1px solid var(--or-sombre);
    opacity:0.6;
  }
  .u-card::after {
    content:'';
    position:absolute; bottom:6px; right:6px;
    width:14px; height:14px;
    border-bottom:1px solid var(--or-sombre);
    border-right:1px solid var(--or-sombre);
    opacity:0.6;
  }

  .u-card:hover { border-color:rgba(201,168,76,0.45); transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.05); }
  .u-card:hover .u-cimg { filter:sepia(20%) contrast(1.15) brightness(0.85); transform:scale(1.04); }

  .u-cimg-wrap { position:relative; aspect-ratio:16/9; overflow:hidden; background:#1a1005; }
  .u-cimg { width:100%; height:100%; object-fit:cover; filter:sepia(45%) contrast(1.1) brightness(0.65) saturate(0.6); transition:filter 0.5s, transform 0.5s; }
  .u-cimg-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(20,13,4,0.85) 0%,transparent 60%); }

  .u-cbody { padding:clamp(14px,2vw,22px); }
  .u-csemaine { font-family:'Cinzel',serif; font-size:0.46rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--or-sombre); margin-bottom:8px; display:block; }
  .u-ctitre { font-family:'Cinzel Decorative',serif; font-size:clamp(0.82rem,1.4vw,1rem); color:var(--ivoire); line-height:1.35; margin-bottom:10px; }
  .u-cextrait { font-style:italic; font-size:clamp(0.82rem,1.2vw,0.9rem); color:var(--ivoire-sombre); opacity:0.7; line-height:1.75; margin-bottom:14px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
  .u-cfooter { display:flex; align-items:center; justify-content:space-between; padding-top:12px; border-top:1px solid rgba(201,168,76,0.1); }
  .u-cdur { font-family:'Cinzel',serif; font-size:0.46rem; letter-spacing:0.15em; color:var(--or-sombre); }
  .u-carrow { color:var(--or); opacity:0; transform:translateX(-6px); transition:opacity 0.3s, transform 0.3s; font-size:1rem; }
  .u-card:hover .u-carrow { opacity:1; transform:translateX(0); }
  .u-clock { font-size:0.75rem; }

  /* SÉPARATEUR DÉCORATIF */
  .u-sep {
    display:flex; align-items:center; gap:16px;
    padding:0 5%;
    max-width:1300px;
    margin:0 auto clamp(30px,4vw,50px);
  }
  .u-sep-line { flex:1; height:1px; background:linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent); }
  .u-sep-gem { width:5px; height:5px; background:var(--or-sombre); transform:rotate(45deg); opacity:0.6; }

  /* ARCHIVE */
  .u-archive {
    padding:clamp(30px,4vw,50px) 5%;
    max-width:1300px;
    margin:0 auto;
    text-align:center;
    border-top:1px solid rgba(201,168,76,0.08);
  }
  .u-archive-txt { font-style:italic; font-size:0.95rem; color:var(--ivoire-sombre); opacity:0.5; margin-bottom:16px; }
  .u-archive-btn { font-family:'Cinzel',serif; font-size:0.56rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--or); background:transparent; border:1px solid rgba(201,168,76,0.3); padding:11px 28px; cursor:pointer; transition:all 0.3s; }
  .u-archive-btn:hover { background:rgba(201,168,76,0.07); border-color:var(--or); }

  /* MODAL */
  .u-modal-bg {
    position:fixed; inset:0;
    background:rgba(0,0,0,0.8);
    z-index:2000;
    display:flex; align-items:center; justify-content:center;
    padding:20px;
    opacity:0; pointer-events:none;
    transition:opacity 0.35s;
    backdrop-filter:blur(4px);
  }
  .u-modal-bg.open { opacity:1; pointer-events:all; }

  .u-modal {
    background:linear-gradient(145deg,#2a1f0e,#1a1005 50%,#2a1a08);
    border:1px solid rgba(201,168,76,0.3);
    max-width:800px;
    width:100%;
    max-height:90vh;
    overflow-y:auto;
    position:relative;
    transform:translateY(20px) scale(0.97);
    transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);
    box-shadow:0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(201,168,76,0.06);
  }
  .u-modal-bg.open .u-modal { transform:translateY(0) scale(1); }

  .u-modal::before { content:''; position:absolute; top:8px; left:8px; width:20px; height:20px; border-top:2px solid var(--or-sombre); border-left:2px solid var(--or-sombre); opacity:0.7; z-index:2; }
  .u-modal::after  { content:''; position:absolute; bottom:8px; right:8px; width:20px; height:20px; border-bottom:2px solid var(--or-sombre); border-right:2px solid var(--or-sombre); opacity:0.7; z-index:2; }

  .u-modal-img-wrap { position:relative; aspect-ratio:16/9; overflow:hidden; background:#1a1005; }
  .u-modal-img { width:100%; height:100%; object-fit:cover; filter:sepia(45%) contrast(1.1) brightness(0.65) saturate(0.6); }
  .u-modal-img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,16,5,0.95) 0%,rgba(26,16,5,0.3) 50%,transparent 100%); }

  .u-mclose { position:absolute; top:14px; right:14px; width:36px; height:36px; border:1px solid rgba(201,168,76,0.3); background:rgba(9,6,2,0.85); color:var(--or); font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s; z-index:10; }
  .u-mclose:hover { background:rgba(201,168,76,0.12); border-color:var(--or); }

  .u-mbody { padding:clamp(24px,4vw,40px); }
  .u-m-semaine { font-family:'Cinzel',serif; font-size:0.5rem; letter-spacing:0.35em; text-transform:uppercase; color:var(--or-sombre); margin-bottom:10px; }
  .u-m-titre { font-family:'Cinzel Decorative',serif; font-size:clamp(1.3rem,3vw,2rem); color:var(--ivoire); line-height:1.25; margin-bottom:6px; }
  .u-m-soustitre { font-family:'Cinzel',serif; font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--or); opacity:0.7; margin-bottom:18px; }
  .u-m-line { height:1px; background:linear-gradient(to right,var(--or-sombre),transparent); margin-bottom:20px; opacity:0.35; }
  .u-m-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
  .u-m-tag { font-family:'Cinzel',serif; font-size:0.42rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--or-sombre); border:1px solid rgba(201,168,76,0.2); padding:3px 10px; }

  .u-m-texte { font-style:italic; font-size:clamp(0.95rem,1.6vw,1.05rem); color:var(--ivoire-sombre); line-height:2; opacity:0.88; white-space:pre-line; margin-bottom:28px; }

  .u-m-lock { background:rgba(201,168,76,0.04); border:1px solid rgba(201,168,76,0.18); padding:22px; text-align:center; margin-bottom:20px; }
  .u-m-lico { font-size:1.8rem; margin-bottom:10px; }
  .u-m-ltit { font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--or); margin-bottom:9px; }
  .u-m-ldsc { font-style:italic; font-size:0.86rem; color:var(--ivoire-sombre); opacity:0.75; line-height:1.7; margin-bottom:16px; }
  .u-gold-btn { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--noir); background:linear-gradient(135deg,var(--or),var(--or-clair)); padding:14px 24px; border:none; cursor:pointer; width:100%; transition:all 0.3s; }
  .u-gold-btn:hover { box-shadow:0 0 24px rgba(201,168,76,0.45); transform:translateY(-1px); }
  .u-free-btn { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--or); background:transparent; padding:14px 24px; border:1px solid rgba(201,168,76,0.4); cursor:pointer; width:100%; transition:all 0.3s; margin-bottom:10px; }
  .u-free-btn:hover { background:rgba(201,168,76,0.08); border-color:var(--or); }
  .u-m-dur { font-family:'Cinzel',serif; font-size:0.5rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--or-sombre); text-align:center; margin-top:10px; }

  @media(max-width:900px) {
    .u-featured { grid-template-columns:1fr; }
    .u-fimg-wrap { aspect-ratio:16/9; }
    .u-fimg-overlay { background:linear-gradient(to top,rgba(26,16,5,0.9),transparent 60%); }
    .u-fbody { padding:20px; }
    .un-links { display:none; }
    .u-recentes-grid { grid-template-columns:1fr; }
  }
  @media(max-width:600px) {
    .u-recentes-grid { grid-template-columns:1fr; }
  }
`;

export default function UchroniesPage({ user, profile }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handler = e => { if(e.key==='Escape') setSelected(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  if (!profile?.is_premium) return <PremiumGate pageName="La Fiction" />;

  return (
    <>
      <style>{styles}</style>

      <nav className="un">
        <span className="un-logo" onClick={()=>navigate('/')}>Anachrona</span>
        <ul className="un-links">
          <li><a onClick={()=>navigate('/')}>Accueil</a></li>
          <li><a onClick={()=>navigate('/galerie')}>Les Portraits</a></li>
          <li><a onClick={()=>navigate('/villes')}>Les Villes</a></li>
          <li><a style={{color:'var(--or)'}}>La Fiction</a></li>
        </ul>
        <button className="un-cta">Premium · 5€/mois</button>
      </nav>

      <div className="u-page">

        {/* HEADER */}
        <div className="u-hdr">
          <div className="u-badge">✦ Anachrona Premium · Uchronies ✦</div>
          <h1 className="u-ttl">La Fiction</h1>
          <div className="u-dvd"><div className="u-dl"/><div className="u-dg"/><div className="u-dl r"/></div>
          <p className="u-dsc">Et si l'Histoire avait pris un autre chemin ? Chaque semaine, une uchronie vidéo explore les bifurcations du temps.</p>
        </div>

        {/* UCHRONIE VEDETTE */}
        <div className="u-featured-wrap">
          <div className="u-section-lbl">✦ Uchronie de la semaine</div>
          {featured && (
            <div className="u-featured" onClick={()=>setSelected(featured)}>
              <div className="u-fimg-wrap">
                <img className="u-fimg" src={featured.img} alt={featured.titre}/>
                <div className="u-fimg-overlay"/>
                <div className="u-fnew">Nouveau</div>
              </div>
              <div className="u-fbody">
                <div className="u-fsemaine">{featured.semaine}</div>
                <h2 className="u-ftitre">{featured.titre}</h2>
                <div className="u-fsoustitre">{featured.soustitre}</div>
                <div className="u-fline"/>
                <p className="u-fextrait">{featured.extrait}</p>
                <div className="u-ftags">
                  {featured.tags.map(t=><span key={t} className="u-ftag">{t}</span>)}
                </div>
                <button className="u-fbtn" onClick={e=>{e.stopPropagation();setSelected(featured);}}>
                  {featured.free ? `▶ Visionner · ${featured.duree}` : '🔒 Contenu Premium'}
                </button>
                <div className="u-fdur">Vidéo IA · {featured.duree} · {featured.epoque}</div>
              </div>
            </div>
          )}
        </div>

        {/* SÉPARATEUR */}
        <div className="u-sep">
          <div className="u-sep-line"/>
          <div className="u-sep-gem"/>
          <div className="u-sep-line"/>
        </div>

        {/* UCHRONIES RÉCENTES */}
        <div className="u-recentes-wrap">
          <div className="u-section-lbl">✦ Semaines précédentes</div>
          <div className="u-recentes-grid">
            {recentes.map(u => (
              <div key={u.id} className="u-card" onClick={()=>setSelected(u)}>
                <div className="u-cimg-wrap">
                  <img className="u-cimg" src={u.img} alt={u.titre}/>
                  <div className="u-cimg-overlay"/>
                </div>
                <div className="u-cbody">
                  <span className="u-csemaine">{u.semaine}</span>
                  <h3 className="u-ctitre">{u.titre}</h3>
                  <p className="u-cextrait">{u.extrait}</p>
                  <div className="u-cfooter">
                    <span className="u-cdur">
                      {u.free ? `▶ ${u.duree}` : <span>🔒 Premium · {u.duree}</span>}
                    </span>
                    <span className="u-carrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ARCHIVE */}
        <div className="u-archive">
          <p className="u-archive-txt">Les archives contiennent plus de 50 uchronies — accessibles avec Premium</p>
          <button className="u-archive-btn">Explorer les archives</button>
        </div>

      </div>

      {/* MODAL */}
      <div className={`u-modal-bg ${selected?'open':''}`} onClick={()=>setSelected(null)}>
        <div className="u-modal" onClick={e=>e.stopPropagation()}>
          {selected && <>
            <button className="u-mclose" onClick={()=>setSelected(null)}>✕</button>
            <div className="u-modal-img-wrap">
              <img className="u-modal-img" src={selected.img} alt={selected.titre}/>
              <div className="u-modal-img-overlay"/>
            </div>
            <div className="u-mbody">
              <div className="u-m-semaine">{selected.semaine} · {selected.epoque}</div>
              <h2 className="u-m-titre">{selected.titre}</h2>
              <div className="u-m-soustitre">{selected.soustitre}</div>
              <div className="u-m-line"/>
              <div className="u-m-tags">
                {selected.tags.map(t=><span key={t} className="u-m-tag">{t}</span>)}
              </div>
              {selected.free ? (
                <>
                  <p className="u-m-texte">{selected.texte_long}</p>
                  <button className="u-free-btn">▶ Visionner la vidéo · {selected.duree}</button>
                </>
              ) : (
                <>
                  <p className="u-m-texte">{selected.extrait}</p>
                  <div className="u-m-lock">
                    <div className="u-m-lico">🔒</div>
                    <div className="u-m-ltit">Contenu Premium</div>
                    <p className="u-m-ldsc">Accédez à l'uchronie complète et à la vidéo avec un abonnement Premium à 5€/mois.</p>
                    <button className="u-gold-btn">Débloquer avec Premium</button>
                  </div>
                </>
              )}
              <div className="u-m-dur">Vidéo IA · {selected.duree}</div>
            </div>
          </>}
        </div>
      </div>
    </>
  );
}
