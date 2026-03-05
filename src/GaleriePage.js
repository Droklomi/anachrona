import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PORTRAITS = [
  { id:1,  name:"Napoléon Bonaparte",    epoque:"Époque Moderne",      civilisation:"France",           destin:"Conquérant",    years:"1769–1821",        country:"France",            desc:"Général, Premier Consul, Empereur des Français. Napoléon remodela l'Europe entière selon sa volonté de fer et son génie militaire sans égal.", img:"https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&q=80",  free:true,  duration:"8 min"  },
  { id:2,  name:"Cléopâtre VII",         epoque:"Antiquité",           civilisation:"Égypte Ancienne",  destin:"Souverain",     years:"69–30 av. J.-C.",  country:"Égypte",            desc:"Dernière souveraine du royaume ptolémaïque d'Égypte, elle séduisit César et Marc Antoine, maniant la politique avec une maestria inégalée.", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",  free:true,  duration:"7 min"  },
  { id:3,  name:"Jules César",           epoque:"Antiquité",           civilisation:"Rome Antique",     destin:"Conquérant",    years:"100–44 av. J.-C.", country:"Rome",              desc:"Général, homme d'État et écrivain, César transforma la République romaine en pouvoir personnel avant d'être assassiné aux Ides de Mars.", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",  free:false, duration:"9 min"  },
  { id:4,  name:"Aliénor d'Aquitaine",   epoque:"Moyen Âge Central",   civilisation:"France",           destin:"Souverain",     years:"1122–1204",        country:"France/Angleterre", desc:"Reine de France puis d'Angleterre, elle fut la femme la plus puissante du XIIe siècle, mécène des arts et mère de Richard Cœur de Lion.", img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",  free:false, duration:"8 min"  },
  { id:5,  name:"Gengis Khan",           epoque:"Moyen Âge Central",   civilisation:"Empire Mongol",    destin:"Conquérant",    years:"1162–1227",        country:"Mongolie",          desc:"Fondateur du plus grand empire terrestre de l'histoire, il unifia les tribus mongoles et conquit une immensité allant de la Chine à la Perse.", img:"https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&q=80",  free:false, duration:"10 min" },
  { id:6,  name:"Léonard de Vinci",      epoque:"Renaissance",         civilisation:"France",           destin:"Artiste",       years:"1452–1519",        country:"Italie",            desc:"Peintre, sculpteur, architecte, ingénieur et scientifique. L'incarnation parfaite de l'homme de la Renaissance, dont le génie transcende tout.", img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",  free:false, duration:"9 min"  },
  { id:7,  name:"Marie-Antoinette",      epoque:"Âge Classique",       civilisation:"France",           destin:"Martyr",        years:"1755–1793",        country:"France/Autriche",   desc:"Archiduchesse d'Autriche devenue reine de France, son destin tragique incarne la chute d'un monde de faste sous les coups de la Révolution.", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",  free:false, duration:"8 min"  },
  { id:8,  name:"Alexandre le Grand",    epoque:"Antiquité",           civilisation:"Grèce Antique",    destin:"Conquérant",    years:"356–323 av. J.-C.",country:"Macédoine",         desc:"Roi de Macédoine, il bâtit en treize ans l'un des plus vastes empires de l'Antiquité, de la Grèce jusqu'aux confins de l'Inde.", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",  free:false, duration:"11 min" },
  { id:9,  name:"Isabelle de Castille",  epoque:"Renaissance",         civilisation:"Espagne",          destin:"Souverain",     years:"1451–1504",        country:"Espagne",           desc:"Reine de Castille, elle finança le voyage de Christophe Colomb et unifia l'Espagne, posant les fondations d'un empire mondial.", img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",  free:false, duration:"7 min"  },
  { id:10, name:"Saladin",               epoque:"Moyen Âge Central",   civilisation:"Proche-Orient",    destin:"Général",       years:"1137–1193",        country:"Sultanat Ayyoubide",desc:"Sultan ayyoubide d'Égypte et de Syrie, il reconquit Jérusalem des Croisés et fut célébré même par ses ennemis pour sa chevalerie.", img:"https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&q=80",  free:false, duration:"8 min"  },
  { id:11, name:"Louis XIV",             epoque:"Âge Classique",       civilisation:"France",           destin:"Souverain",     years:"1638–1715",        country:"France",            desc:"Le Roi-Soleil régna 72 ans. Versailles, sa création, reste le symbole absolu du pouvoir absolu et de la splendeur monarchique.", img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",  free:false, duration:"9 min"  },
  { id:12, name:"Boudicca",              epoque:"Antiquité",           civilisation:"Rome Antique",     destin:"Révolutionnaire",years:"~30–61 ap. J.-C.", country:"Bretagne",          desc:"Reine de la tribu icène, elle mena la plus grande révolte contre l'occupation romaine en Bretagne, incendiant Londinium avant d'être vaincue.", img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",  free:false, duration:"7 min"  },
  { id:13, name:"Suleiman le Magnifique",epoque:"Renaissance",         civilisation:"Empire Ottoman",   destin:"Souverain",     years:"1494–1566",        country:"Turquie",           desc:"À son apogée, l'Empire Ottoman s'étendait de Budapest à Bagdad. Suleiman fut à la fois conquérant redouté et mécène des arts.", img:"https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&q=80",  free:false, duration:"9 min"  },
  { id:14, name:"Catherine de Médicis",  epoque:"Renaissance",         civilisation:"France",           destin:"Souverain",     years:"1519–1589",        country:"France/Italie",     desc:"Reine de France et régente, elle gouverna entre guerres de religion et intrigues de cour avec une habileté politique redoutable.", img:"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80",  free:false, duration:"8 min"  },
  { id:15, name:"Attila",                epoque:"Haut Moyen Âge",      civilisation:"Empire Mongol",    destin:"Conquérant",    years:"406–453",          country:"Empire Hunnique",   desc:"Surnommé le Fléau de Dieu, Attila terrorisa Rome et Constantinople, forgeant un empire de la Rhénanie à la mer Caspienne.", img:"https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=600&q=80",  free:false, duration:"7 min"  },
  { id:16, name:"Élisabeth Ire",         epoque:"Renaissance",         civilisation:"Angleterre",       destin:"Souverain",     years:"1533–1603",        country:"Angleterre",        desc:"La Reine Vierge régna 45 ans et fit entrer l'Angleterre dans son âge d'or. Son règne vit fleurir Shakespeare et la défaite de l'Invincible Armada.", img:"https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=600&q=80",  free:false, duration:"9 min"  },
  { id:17, name:"Hannibal Barca",        epoque:"Antiquité",           civilisation:"Rome Antique",     destin:"Général",       years:"247–183 av. J.-C.",country:"Carthage",          desc:"Le plus grand stratège de l'Antiquité, il traversa les Alpes avec ses éléphants et mit Rome à genoux lors de la deuxième guerre punique.", img:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",  free:false, duration:"8 min"  },
  { id:18, name:"Anne Boleyn",           epoque:"Renaissance",         civilisation:"Angleterre",       destin:"Martyr",        years:"1501–1536",        country:"Angleterre",        desc:"Deuxième épouse d'Henri VIII, sa chute précipitée mena à sa décapitation. Son destin incarne la fragilité du pouvoir à la cour des Tudors.", img:"https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=600&q=80",  free:false, duration:"7 min"  },
  { id:19, name:"Charlemagne",           epoque:"Haut Moyen Âge",      civilisation:"France",           destin:"Souverain",     years:"742–814",          country:"Francie",           desc:"Roi des Francs puis Empereur d'Occident, Charlemagne unifia l'Europe occidentale et posa les fondations de ce qui deviendra la France et l'Allemagne.", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",  free:false, duration:"10 min" },
  { id:20, name:"Nefertiti",             epoque:"Antiquité",           civilisation:"Égypte Ancienne",  destin:"Souverain",     years:"~1370–1330 av. J.-C.",country:"Égypte",          desc:"Grande épouse royale d'Akhenaton, Nefertiti fut une figure politique et religieuse majeure, co-régente d'un pharaon révolutionnaire.", img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",  free:false, duration:"8 min"  },
  { id:21, name:"Richard Cœur de Lion", epoque:"Moyen Âge Central",   civilisation:"Angleterre",       destin:"Général",       years:"1157–1199",        country:"Angleterre",        desc:"Roi d'Angleterre et héros des Croisades, il passa la majeure partie de son règne sur les champs de bataille.", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",  free:false, duration:"8 min"  },
  { id:22, name:"Vlad III l'Empaleur",   epoque:"Moyen Âge Central",   civilisation:"Proche-Orient",    destin:"Tyran",         years:"1428–1477",        country:"Valachie",          desc:"Prince de Valachie tristement célèbre pour sa cruauté, il inspira le personnage de Dracula et résista à l'expansionnisme ottoman.", img:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80",  free:false, duration:"7 min"  },
  { id:23, name:"Périclès",              epoque:"Antiquité",           civilisation:"Grèce Antique",    destin:"Philosophe",    years:"495–429 av. J.-C.",country:"Grèce",             desc:"Homme d'État athénien, il présida à l'âge d'or d'Athènes, faisant ériger le Parthénon et développant la démocratie directe.", img:"https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&q=80",  free:false, duration:"8 min"  },
  { id:24, name:"Marie Curie",           epoque:"Époque Moderne",      civilisation:"France",           destin:"Scientifique",  years:"1867–1934",        country:"France/Pologne",    desc:"Première femme Prix Nobel, et seule personne à l'avoir reçu dans deux disciplines. Sa détermination brisa les barrières de genre dans la science.", img:"https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=80",  free:false, duration:"9 min"  },
];

const EPOQUES       = ["Tous", "Antiquité", "Haut Moyen Âge", "Moyen Âge Central", "Renaissance", "Âge Classique", "Époque Moderne", "Contemporain"];
const CIVILISATIONS = ["Toutes", "Rome Antique", "Grèce Antique", "Égypte Ancienne", "Empire Ottoman", "Empire Mongol", "France", "Angleterre", "Espagne", "Russie", "Proche-Orient", "Asie", "Amériques"];
const DESTINS       = ["Tous", "Conquérant", "Souverain", "Général", "Explorateur", "Scientifique", "Artiste", "Philosophe", "Révolutionnaire", "Martyr", "Tyran"];
const PORTRAITS_PER_PAGE = 12;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
  :root { --noir:#09090F; --or:#C9A84C; --or-clair:#E8C96A; --or-sombre:#8B6914; --ivoire:#F5F0E8; --ivoire-sombre:#D4C9B0; }
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { background:#1a1208; color:var(--ivoire); font-family:'EB Garamond',serif; overflow-x:hidden; }

  .gn { position:fixed; top:0; width:100%; z-index:1000; padding:16px 5%; display:flex; align-items:center; justify-content:space-between; background:rgba(9,9,15,0.97); border-bottom:1px solid rgba(201,168,76,0.2); }
  .gn-logo { font-family:'Cinzel Decorative',serif; font-size:clamp(1rem,2.5vw,1.4rem); color:var(--or); letter-spacing:0.1em; cursor:pointer; text-shadow:0 0 20px rgba(201,168,76,0.3); }
  .gn-links { display:flex; gap:28px; list-style:none; align-items:center; }
  .gn-links a { font-family:'Cinzel',serif; font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--ivoire-sombre); text-decoration:none; transition:color 0.3s; cursor:pointer; }
  .gn-links a:hover { color:var(--or); }
  .gn-cta { font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--noir); background:var(--or); padding:9px 18px; cursor:pointer; border:none; transition:all 0.3s; }
  .gn-cta:hover { background:var(--or-clair); }

  .g-page {
    min-height:100vh;
    padding-top:72px;
    background:
      repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(201,168,76,0.025) 60px),
      repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,168,76,0.025) 60px),
      linear-gradient(160deg, #1a1005 0%, #120d04 40%, #1e1508 70%, #120d04 100%);
  }

  .g-hdr { padding:clamp(40px,6vw,70px) 5% clamp(30px,4vw,50px); text-align:center; position:relative; border-bottom:1px solid rgba(201,168,76,0.12); }
  .g-hdr::before { content:''; position:absolute; left:5%; right:5%; top:0; height:3px; background:linear-gradient(90deg,transparent,var(--or-sombre),var(--or),var(--or-sombre),transparent); opacity:0.6; }
  .g-badge { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:0.52rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--or-sombre); border:1px solid rgba(201,168,76,0.25); padding:5px 16px; margin-bottom:16px; }
  .g-ttl { font-family:'Cinzel Decorative',serif; font-size:clamp(2rem,6vw,4rem); color:var(--ivoire); letter-spacing:0.08em; text-shadow:0 0 60px rgba(201,168,76,0.15); margin-bottom:8px; }
  .g-dvd { display:flex; align-items:center; justify-content:center; gap:14px; margin:14px auto 16px; }
  .g-dl { height:1px; width:clamp(50px,8vw,100px); background:linear-gradient(to right,transparent,var(--or)); }
  .g-dl.r { background:linear-gradient(to left,transparent,var(--or)); }
  .g-dg { width:6px; height:6px; background:var(--or); transform:rotate(45deg); }
  .g-dsc { font-style:italic; font-size:clamp(0.95rem,2vw,1.1rem); color:var(--ivoire-sombre); opacity:0.8; max-width:560px; margin:0 auto 16px; line-height:1.8; }
  .g-count { font-family:'Cinzel',serif; font-size:0.55rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--or-sombre); }

  /* FILTRES */
  .g-filters { padding:22px 5%; background:rgba(0,0,0,0.3); border-bottom:1px solid rgba(201,168,76,0.08); display:flex; flex-direction:column; gap:12px; }
  .g-filter-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .g-filter-lbl { font-family:'Cinzel',serif; font-size:0.46rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--or); opacity:0.75; min-width:100px; flex-shrink:0; }
  .g-filter-sep { width:1px; height:14px; background:rgba(201,168,76,0.2); flex-shrink:0; }
  .g-fb { font-family:'Cinzel',serif; font-size:0.44rem; letter-spacing:0.14em; text-transform:uppercase; padding:4px 11px; border:1px solid rgba(201,168,76,0.15); background:transparent; color:var(--ivoire-sombre); cursor:pointer; transition:all 0.25s; white-space:nowrap; }
  .g-fb:hover { background:rgba(201,168,76,0.07); border-color:rgba(201,168,76,0.4); color:var(--or); }
  .g-fb.active { background:rgba(201,168,76,0.14); border-color:var(--or); color:var(--or-clair); }
  .g-reset { font-family:'Cinzel',serif; font-size:0.42rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--or-sombre); background:transparent; border:1px solid rgba(201,168,76,0.15); padding:4px 12px; cursor:pointer; transition:all 0.25s; margin-left:auto; }
  .g-reset:hover { color:var(--or); border-color:rgba(201,168,76,0.4); }

  .g-results { font-family:'Cinzel',serif; font-size:0.48rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--or-sombre); padding:10px 5%; background:rgba(0,0,0,0.15); border-bottom:1px solid rgba(201,168,76,0.05); }

  /* GALLERY */
  .g-wall { padding:clamp(30px,5vw,60px) 5%; max-width:1400px; margin:0 auto; }
  .g-empty { text-align:center; padding:80px 20px; font-style:italic; color:var(--ivoire-sombre); opacity:0.45; font-size:1.1rem; }
  .g-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(20px,3vw,40px); }

  .g-card { cursor:pointer; opacity:0; transform:translateY(20px); transition:opacity 0.5s, transform 0.5s; }
  .g-card.visible { opacity:1; transform:translateY(0); }

  .g-frame {
    position:relative; padding:clamp(10px,1.5vw,16px);
    background:linear-gradient(145deg,#4a3010 0%,#2e1e08 20%,#5a3c14 40%,#2e1e08 60%,#4a3010 80%,#3a2810 100%);
    box-shadow:0 0 0 1px rgba(201,168,76,0.4),0 0 0 3px rgba(139,105,20,0.15),inset 0 0 0 1px rgba(201,168,76,0.1),6px 8px 24px rgba(0,0,0,0.8),0 20px 60px rgba(0,0,0,0.6);
    transition:transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
  }
  .g-frame::before { content:''; position:absolute; top:5px; left:5px; width:16px; height:16px; border-top:2px solid var(--or-sombre); border-left:2px solid var(--or-sombre); opacity:0.8; z-index:2; }
  .g-frame::after { content:''; position:absolute; bottom:5px; right:5px; width:16px; height:16px; border-bottom:2px solid var(--or-sombre); border-right:2px solid var(--or-sombre); opacity:0.8; z-index:2; }
  .g-frame-tr { position:absolute; top:5px; right:5px; width:16px; height:16px; border-top:2px solid var(--or-sombre); border-right:2px solid var(--or-sombre); opacity:0.8; z-index:2; }
  .g-frame-bl { position:absolute; bottom:5px; left:5px; width:16px; height:16px; border-bottom:2px solid var(--or-sombre); border-left:2px solid var(--or-sombre); opacity:0.8; z-index:2; }
  .g-card:hover .g-frame { transform:translateY(-8px) scale(1.01); box-shadow:0 0 0 1px rgba(201,168,76,0.7),0 0 0 3px rgba(201,168,76,0.12),8px 12px 40px rgba(0,0,0,0.9),0 30px 80px rgba(0,0,0,0.7),0 0 40px rgba(201,168,76,0.08); }

  .g-img-wrap { position:relative; aspect-ratio:3/4; overflow:hidden; background:#1A1208; }
  .g-img { width:100%; height:100%; object-fit:cover; filter:sepia(50%) contrast(1.15) brightness(0.75) saturate(0.7); transition:filter 0.5s, transform 0.6s; }
  .g-card:hover .g-img { filter:sepia(20%) contrast(1.2) brightness(0.9) saturate(0.85); transform:scale(1.05); }

  .g-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(9,6,2,0.95) 0%,rgba(9,6,2,0.5) 35%,transparent 65%); display:flex; flex-direction:column; justify-content:flex-end; padding:clamp(10px,1.5vw,16px); }
  .g-play { width:40px; height:40px; border-radius:50%; border:1.5px solid rgba(201,168,76,0.7); display:flex; align-items:center; justify-content:center; margin-bottom:10px; opacity:0; transform:translateY(10px) scale(0.8); transition:opacity 0.3s, transform 0.3s; background:rgba(201,168,76,0.08); }
  .g-card:hover .g-play { opacity:1; transform:translateY(0) scale(1); }
  .g-era { font-family:'Cinzel',serif; font-size:clamp(0.42rem,0.8vw,0.5rem); letter-spacing:0.3em; text-transform:uppercase; color:var(--or); opacity:0.85; margin-bottom:4px; }
  .g-name { font-family:'Cinzel',serif; font-size:clamp(0.65rem,1.2vw,0.82rem); color:var(--ivoire); letter-spacing:0.04em; line-height:1.3; margin-bottom:3px; }
  .g-years { font-style:italic; font-size:clamp(0.7rem,1vw,0.8rem); color:var(--ivoire-sombre); opacity:0.55; }

  .g-plaque { background:linear-gradient(135deg,#2e1e08,#3a2810,#2e1e08); border:1px solid rgba(201,168,76,0.25); padding:8px 12px; text-align:center; margin-top:6px; position:relative; }
  .g-plaque::before { content:''; position:absolute; inset:2px; border:1px solid rgba(201,168,76,0.08); pointer-events:none; }
  .g-plaque-name { font-family:'Cinzel',serif; font-size:clamp(0.5rem,0.9vw,0.6rem); letter-spacing:0.15em; text-transform:uppercase; color:var(--or); }
  .g-plaque-era { font-style:italic; font-size:clamp(0.6rem,0.85vw,0.7rem); color:var(--ivoire-sombre); opacity:0.55; margin-top:2px; }

  /* PAGINATION */
  .g-pag { display:flex; align-items:center; justify-content:center; gap:8px; padding:clamp(30px,4vw,50px) 5%; border-top:1px solid rgba(201,168,76,0.08); flex-wrap:wrap; }
  .g-pb { width:36px; height:36px; border:1px solid rgba(201,168,76,0.25); background:transparent; color:var(--ivoire-sombre); font-family:'Cinzel',serif; font-size:0.62rem; cursor:pointer; transition:all 0.3s; display:flex; align-items:center; justify-content:center; }
  .g-pb:hover,.g-pb.active { background:rgba(201,168,76,0.1); border-color:var(--or); color:var(--or); }
  .g-pb.active { background:rgba(201,168,76,0.15); color:var(--or-clair); }
  .g-pb:disabled { opacity:0.3; cursor:not-allowed; }
  .g-pag-info { font-family:'Cinzel',serif; font-size:0.5rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--or-sombre); margin:0 12px; }

  /* PANEL */
  .g-overlay-bg { position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:1999; opacity:0; pointer-events:none; transition:opacity 0.4s; backdrop-filter:blur(2px); }
  .g-overlay-bg.open { opacity:1; pointer-events:all; }
  .g-panel { position:fixed; top:0; right:-100%; width:min(460px,100vw); height:100vh; background:linear-gradient(160deg,#1a1005,#120d04 50%,#1a1208); border-left:1px solid rgba(201,168,76,0.25); z-index:2000; transition:right 0.5s cubic-bezier(0.16,1,0.3,1); display:flex; flex-direction:column; overflow-y:auto; }
  .g-panel.open { right:0; }
  .g-panel-top { position:relative; flex-shrink:0; }
  .g-panel-top::before { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,var(--or-sombre),var(--or),var(--or-sombre),transparent); opacity:0.5; z-index:2; }
  .g-close { position:absolute; top:16px; right:16px; width:36px; height:36px; border:1px solid rgba(201,168,76,0.3); background:rgba(9,6,2,0.8); color:var(--or); font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s; z-index:10; }
  .g-close:hover { background:rgba(201,168,76,0.12); border-color:var(--or); }
  .g-vid { position:relative; aspect-ratio:3/4; background:#000; overflow:hidden; max-height:360px; }
  .g-vthumb { width:100%; height:100%; object-fit:cover; filter:sepia(40%) contrast(1.1) brightness(0.6); }
  .g-vplay { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; background:linear-gradient(to top,rgba(9,6,2,0.8),rgba(9,6,2,0.2)); cursor:pointer; }
  .g-vcircle { width:68px; height:68px; border-radius:50%; border:2px solid var(--or); display:flex; align-items:center; justify-content:center; box-shadow:0 0 30px rgba(201,168,76,0.35); transition:transform 0.3s; }
  .g-vplay:hover .g-vcircle { transform:scale(1.08); }
  .g-vtri { width:0; height:0; border-top:11px solid transparent; border-bottom:11px solid transparent; border-left:18px solid var(--or); margin-left:5px; }
  .g-vlbl { font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--ivoire-sombre); }
  .g-pb-body { padding:26px 28px 48px; flex:1; }
  .g-p-era { font-family:'Cinzel',serif; font-size:0.52rem; letter-spacing:0.32em; text-transform:uppercase; color:var(--or); opacity:0.8; margin-bottom:8px; }
  .g-p-name { font-family:'Cinzel Decorative',serif; font-size:clamp(1.3rem,4vw,2rem); color:var(--ivoire); margin-bottom:4px; line-height:1.2; }
  .g-p-years { font-style:italic; font-size:0.9rem; color:var(--ivoire-sombre); opacity:0.55; margin-bottom:4px; }
  .g-p-country { font-family:'Cinzel',serif; font-size:0.5rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--or-sombre); margin-bottom:18px; }
  .g-p-line { height:1px; background:linear-gradient(to right,var(--or-sombre),transparent); margin-bottom:18px; opacity:0.35; }
  .g-p-desc { font-style:italic; font-size:0.95rem; color:var(--ivoire-sombre); line-height:1.9; margin-bottom:22px; opacity:0.85; }
  .g-p-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:22px; }
  .g-p-tag { font-family:'Cinzel',serif; font-size:0.44rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--or-sombre); border:1px solid rgba(201,168,76,0.2); padding:4px 10px; }
  .g-p-infos { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:24px; }
  .g-p-info { background:rgba(201,168,76,0.03); border:1px solid rgba(201,168,76,0.1); padding:12px; }
  .g-p-ilbl { font-family:'Cinzel',serif; font-size:0.44rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--or-sombre); margin-bottom:5px; }
  .g-p-ival { font-family:'Cinzel',serif; font-size:0.65rem; color:var(--ivoire); }
  .g-p-lock { background:rgba(201,168,76,0.04); border:1px solid rgba(201,168,76,0.18); padding:22px; text-align:center; margin-bottom:16px; }
  .g-p-lico { font-size:1.8rem; margin-bottom:10px; }
  .g-p-ltit { font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--or); margin-bottom:9px; }
  .g-p-ldsc { font-style:italic; font-size:0.86rem; color:var(--ivoire-sombre); opacity:0.75; line-height:1.7; margin-bottom:16px; }
  .g-gold-btn { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--noir); background:linear-gradient(135deg,var(--or),var(--or-clair)); padding:14px 24px; border:none; cursor:pointer; width:100%; transition:all 0.3s; }
  .g-gold-btn:hover { box-shadow:0 0 24px rgba(201,168,76,0.45); transform:translateY(-1px); }
  .g-free-btn { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--or); background:transparent; padding:14px 24px; border:1px solid rgba(201,168,76,0.4); cursor:pointer; width:100%; transition:all 0.3s; }
  .g-free-btn:hover { background:rgba(201,168,76,0.08); border-color:var(--or); }

  @media(max-width:1200px) { .g-grid { grid-template-columns:repeat(3,1fr); } }
  @media(max-width:900px) { .g-grid { grid-template-columns:repeat(2,1fr); } .gn-links{display:none} .g-filter-lbl{min-width:70px} }
  @media(max-width:500px) { .g-grid { grid-template-columns:1fr 1fr; gap:12px; } }
`;

export default function GaleriePage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [epoque, setEpoque] = useState('Tous');
  const [civilisation, setCivilisation] = useState('Toutes');
  const [destin, setDestin] = useState('Tous');

  const filtered = PORTRAITS.filter(p => {
    const eOk = epoque === 'Tous' || p.epoque === epoque;
    const cOk = civilisation === 'Toutes' || p.civilisation === civilisation;
    const dOk = destin === 'Tous' || p.destin === destin;
    return eOk && cOk && dOk;
  });

  const totalPages = Math.ceil(filtered.length / PORTRAITS_PER_PAGE);
  const paginated = filtered.slice((page-1)*PORTRAITS_PER_PAGE, page*PORTRAITS_PER_PAGE);
  const hasFilters = epoque !== 'Tous' || civilisation !== 'Toutes' || destin !== 'Tous';

  const resetFilters = () => { setEpoque('Tous'); setCivilisation('Toutes'); setDestin('Tous'); setPage(1); };

  useEffect(() => {
    const handler = e => { if(e.key==='Escape') setSelected(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  useEffect(() => { setPage(1); }, [epoque, civilisation, destin]);

  useEffect(() => {
    window.scrollTo({top:0, behavior:'smooth'});
    setTimeout(() => {
      document.querySelectorAll('.g-card').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 55);
      });
    }, 50);
  }, [page, epoque, civilisation, destin]);

  return (
    <>
      <style>{styles}</style>

      <nav className="gn">
        <span className="gn-logo" onClick={()=>navigate('/')}>Anachrona</span>
        <ul className="gn-links">
          <li><a onClick={()=>navigate('/')}>Accueil</a></li>
          <li><a style={{color:'var(--or)'}}>Les Portraits</a></li>
          <li><a onClick={()=>navigate('/villes')}>Les Villes</a></li>
          <li><a onClick={()=>navigate('/')}>La Fiction</a></li>
        </ul>
        <button className="gn-cta">Premium · 5€/mois</button>
      </nav>

      <div className="g-page">
        <div className="g-hdr">
          <div className="g-badge">✦ Anachrona · Galerie des Portraits ✦</div>
          <h1 className="g-ttl">La Grande Galerie</h1>
          <div className="g-dvd"><div className="g-dl"/><div className="g-dg"/><div className="g-dl r"/></div>
          <p className="g-dsc">Des figures légendaires de l'Histoire, ressuscitées par l'intelligence artificielle. Chaque portrait révèle une vie, une époque, un destin.</p>
          <p className="g-count">{filtered.length} portrait{filtered.length > 1 ? 's' : ''} · Page {page} sur {Math.max(1, totalPages)}</p>
        </div>

        <div className="g-filters">
          <div className="g-filter-row">
            <span className="g-filter-lbl">⏳ Époque</span>
            <div className="g-filter-sep"/>
            {EPOQUES.map(e => (
              <button key={e} className={`g-fb ${epoque===e?'active':''}`} onClick={()=>setEpoque(e)}>{e}</button>
            ))}
          </div>
          <div className="g-filter-row">
            <span className="g-filter-lbl">🌍 Civilisation</span>
            <div className="g-filter-sep"/>
            {CIVILISATIONS.map(c => (
              <button key={c} className={`g-fb ${civilisation===c?'active':''}`} onClick={()=>setCivilisation(c)}>{c}</button>
            ))}
          </div>
          <div className="g-filter-row">
            <span className="g-filter-lbl">⚔️ Destin</span>
            <div className="g-filter-sep"/>
            {DESTINS.map(d => (
              <button key={d} className={`g-fb ${destin===d?'active':''}`} onClick={()=>setDestin(d)}>{d}</button>
            ))}
            {hasFilters && <button className="g-reset" onClick={resetFilters}>✕ Réinitialiser</button>}
          </div>
        </div>

        <div className="g-results">
          {filtered.length} résultat{filtered.length > 1 ? 's' : ''}{hasFilters ? ' · Filtres actifs' : ' · Tous les portraits'}
        </div>

        <div className="g-wall">
          {filtered.length === 0 ? (
            <div className="g-empty">Aucun portrait ne correspond à ces filtres.</div>
          ) : (
            <div className="g-grid">
              {paginated.map((p, i) => (
                <div key={p.id} className="g-card" style={{transitionDelay:`${i*0.04}s`}} onClick={()=>setSelected(p)}>
                  <div className="g-frame">
                    <div className="g-frame-tr"/>
                    <div className="g-frame-bl"/>
                    <div className="g-img-wrap">
                      <img className="g-img" src={p.img} alt={p.name}/>
                      <div className="g-overlay">
                        <div className="g-play">
                          <svg width="12" height="14" viewBox="0 0 10 12" fill="var(--or)"><path d="M0 0 L10 6 L0 12 Z"/></svg>
                        </div>
                        <span className="g-era">{p.epoque}</span>
                        <div className="g-name">{p.name}</div>
                        <div className="g-years">{p.years}</div>
                      </div>
                    </div>
                  </div>
                  <div className="g-plaque">
                    <div className="g-plaque-name">{p.name}</div>
                    <div className="g-plaque-era">{p.destin} · {p.civilisation}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="g-pag">
            <button className="g-pb" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>←</button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(n => (
              <button key={n} className={`g-pb ${page===n?'active':''}`} onClick={()=>setPage(n)}>{n}</button>
            ))}
            <button className="g-pb" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>→</button>
            <span className="g-pag-info">{page} / {totalPages}</span>
          </div>
        )}
      </div>

      <div className={`g-overlay-bg ${selected?'open':''}`} onClick={()=>setSelected(null)}/>
      <div className={`g-panel ${selected?'open':''}`}>
        {selected && <>
          <div className="g-panel-top">
            <button className="g-close" onClick={()=>setSelected(null)}>✕</button>
            <div className="g-vid">
              <img className="g-vthumb" src={selected.img} alt={selected.name}/>
              <div className="g-vplay">
                <div className="g-vcircle"><div className="g-vtri"/></div>
                <span className="g-vlbl">{selected.free ? `▶ Visionner · ${selected.duration}` : '🔒 Contenu Premium'}</span>
              </div>
            </div>
          </div>
          <div className="g-pb-body">
            <div className="g-p-era">{selected.epoque}</div>
            <h2 className="g-p-name">{selected.name}</h2>
            <div className="g-p-years">{selected.years}</div>
            <div className="g-p-country">{selected.country}</div>
            <div className="g-p-line"/>
            <p className="g-p-desc">{selected.desc}</p>
            <div className="g-p-tags">
              <span className="g-p-tag">{selected.epoque}</span>
              <span className="g-p-tag">{selected.civilisation}</span>
              <span className="g-p-tag">{selected.destin}</span>
            </div>
            <div className="g-p-infos">
              <div className="g-p-info"><div className="g-p-ilbl">Époque</div><div className="g-p-ival">{selected.epoque}</div></div>
              <div className="g-p-info"><div className="g-p-ilbl">Civilisation</div><div className="g-p-ival">{selected.civilisation}</div></div>
              <div className="g-p-info"><div className="g-p-ilbl">Destin</div><div className="g-p-ival">{selected.destin}</div></div>
            </div>
            {!selected.free ? (
              <div className="g-p-lock">
                <div className="g-p-lico">🔒</div>
                <div className="g-p-ltit">Contenu Premium</div>
                <p className="g-p-ldsc">Accédez au portrait complet de {selected.name} avec un abonnement Premium à 5€/mois.</p>
                <button className="g-gold-btn">Débloquer avec Premium</button>
              </div>
            ) : (
              <button className="g-free-btn">▶ Visionner · {selected.duration}</button>
            )}
          </div>
        </>}
      </div>
    </>
  );
}
