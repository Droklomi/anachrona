import PremiumGate from './PremiumGate';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import worldData from 'world-atlas/countries-110m.json';

const CITIES = [
  { id:1,  name:"Paris",          country:"France",       era:"Second Empire · 1853",         free:true,  coordinates:[2.35,48.85],   desc:"Sous Haussmann, Paris se métamorphose. Les ruelles médiévales cèdent aux grands boulevards dorés par le soleil.", duration:"8 min",  year:"1853–1870",             population:"1,8 million",  img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" },
  { id:2,  name:"Rome",           country:"Italie",       era:"Empire Romain · Ier s.",       free:false, coordinates:[12.5,41.9],    desc:"Au sommet de sa gloire, Rome compte plus d'un million d'habitants. Le Colisée rugit sous les acclamations.", duration:"10 min", year:"Ier siècle ap. J.-C.",  population:"1 million",    img:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80" },
  { id:3,  name:"Constantinople", country:"Turquie",      era:"Byzance · Ve siècle",          free:false, coordinates:[28.97,41.01],  desc:"Joyau entre deux continents, Constantinople rayonne. Ses murailles légendaires en font le centre du monde.", duration:"9 min",  year:"Ve siècle ap. J.-C.",   population:"500 000",      img:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80" },
  { id:4,  name:"Le Caire",       country:"Égypte",       era:"Antiquité · -2500",            free:false, coordinates:[31.24,30.04],  desc:"Sous le regard des pyramides de Gizeh, les scribes écrivent et le Nil irrigue une civilisation millénaire.", duration:"11 min", year:"2500 av. J.-C.",        population:"200 000",      img:"https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&q=80" },
  { id:5,  name:"Pékin",          country:"Chine",        era:"Cité Interdite · XVe s.",      free:false, coordinates:[116.4,39.9],   desc:"La Cité Interdite vient d'être achevée. L'Empereur règne sur l'empire le plus peuplé de la Terre.", duration:"8 min",  year:"1420 ap. J.-C.",        population:"600 000",      img:"https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80" },
  { id:6,  name:"Tenochtitlan",   country:"Mexique",      era:"Empire Aztèque · XVe s.",      free:false, coordinates:[-99.13,19.43], desc:"Fondée sur un lac, Tenochtitlan stupéfie les conquistadors. Ses pyramides déchirent le ciel.", duration:"9 min",  year:"1450 ap. J.-C.",        population:"300 000",      img:"https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80" },
  { id:7,  name:"Bagdad",         country:"Irak",         era:"Âge d'Or · IXe s.",            free:false, coordinates:[44.36,33.34],  desc:"Sous les Abbassides, Bagdad est la ville la plus savante du monde. La Maison de la Sagesse rayonne.", duration:"7 min",  year:"830 ap. J.-C.",         population:"1,5 million",  img:"https://images.unsplash.com/photo-1580818939494-a5eb07c88fbd?w=600&q=80" },
  { id:8,  name:"Athènes",        country:"Grèce",        era:"Âge d'Or · Ve av. J.-C.",      free:true,  coordinates:[23.73,37.98],  desc:"Périclès règne sur la démocratie naissante. Le Parthénon s'élève, Socrate débat dans l'agora.", duration:"8 min",  year:"Ve siècle av. J.-C.",   population:"100 000",      img:"https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80" },
  { id:9,  name:"Londres",        country:"Royaume-Uni",  era:"Ère Victorienne · XIXe s.",    free:false, coordinates:[-0.12,51.5],   desc:"À l'apogée de l'Empire britannique, Londres est la capitale du monde. Big Ben sonne l'ère industrielle.", duration:"8 min",  year:"1851 ap. J.-C.",        population:"2,5 millions", img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
  { id:10, name:"Tokyo",          country:"Japon",        era:"Ère Meiji · XIXe s.",          free:false, coordinates:[139.69,35.68], desc:"Edo devient Tokyo. Le Japon s'ouvre au monde avec une modernisation fulgurante.", duration:"9 min",  year:"1868 ap. J.-C.",        population:"1 million",    img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" },
  { id:11, name:"Carthage",       country:"Tunisie",      era:"Antiquité · IIIe av. J.-C.",   free:false, coordinates:[10.32,36.86],  desc:"Rivale de Rome, Carthage domine la Méditerranée. Hannibal prépare ses éléphants pour les Alpes.", duration:"8 min",  year:"IIIe siècle av. J.-C.", population:"500 000",      img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80" },
  { id:12, name:"Moscou",         country:"Russie",       era:"Empire Russe · XVIIIe s.",     free:false, coordinates:[37.62,55.75],  desc:"Le Kremlin veille sur la Troisième Rome. Pierre le Grand modernise l'empire à marche forcée.", duration:"8 min",  year:"XVIIIe siècle",         population:"300 000",      img:"https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80" },
  { id:13, name:"New York",       country:"États-Unis",   era:"Âge d'Or · XIXe s.",           free:false, coordinates:[-74.0,40.71],  desc:"Les immigrants débarquent devant la Statue de la Liberté. Manhattan invente la modernité.", duration:"8 min",  year:"1890 ap. J.-C.",        population:"1,5 million",  img:"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80" },
  { id:14, name:"Lisbonne",       country:"Portugal",     era:"Âge des Découvertes · XVe s.", free:false, coordinates:[-9.14,38.72],  desc:"Du port de Lisbonne partent les caravelles. Le Portugal tient le monde dans ses mains.", duration:"8 min",  year:"XVe siècle",            population:"100 000",      img:"https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=600&q=80" },
  { id:15, name:"Alexandrie",     country:"Égypte",       era:"Hellénisme · IIIe av. J.-C.",  free:false, coordinates:[29.92,31.2],   desc:"La Grande Bibliothèque brille. Alexandrie est le phare intellectuel du monde antique.", duration:"9 min",  year:"IIIe siècle av. J.-C.", population:"600 000",      img:"https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&q=80" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
  :root { --noir:#09090F; --or:#C9A84C; --or-clair:#E8C96A; --or-sombre:#8B6914; --ivoire:#F5F0E8; --ivoire-sombre:#D4C9B0; }
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { background:var(--noir); color:var(--ivoire); font-family:'EB Garamond',serif; overflow-x:hidden; }

  .vn { position:fixed; top:0; width:100%; z-index:1000; padding:16px 5%; display:flex; align-items:center; justify-content:space-between; background:rgba(9,9,15,0.97); border-bottom:1px solid rgba(201,168,76,0.15); }
  .vn-logo { font-family:'Cinzel Decorative',serif; font-size:clamp(1rem,2.5vw,1.4rem); color:var(--or); letter-spacing:0.1em; cursor:pointer; text-shadow:0 0 20px rgba(201,168,76,0.3); }
  .vn-links { display:flex; gap:28px; list-style:none; align-items:center; }
  .vn-links a { font-family:'Cinzel',serif; font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--ivoire-sombre); text-decoration:none; transition:color 0.3s; cursor:pointer; }
  .vn-links a:hover,.vn-links a.active { color:var(--or); }
  .vn-cta { font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--noir); background:var(--or); padding:9px 18px; cursor:pointer; border:none; transition:all 0.3s; }
  .vn-cta:hover { background:var(--or-clair); }
  .vn-burger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; padding:4px; }
  .vn-burger span { width:22px; height:1px; background:var(--or); display:block; }
  .vn-mob { display:none; position:fixed; inset:0; background:rgba(9,9,15,0.98); z-index:1050; flex-direction:column; align-items:center; justify-content:center; gap:32px; }
  .vn-mob.open { display:flex; }
  .vn-mob a { font-family:'Cinzel',serif; font-size:0.95rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--ivoire); cursor:pointer; }

  .v-page { min-height:100vh; display:flex; flex-direction:column; }
  .v-hdr { padding:100px 5% 28px; text-align:center; background:linear-gradient(180deg,#09090F,#0d1015); border-bottom:1px solid rgba(201,168,76,0.08); }
  .v-badge { display:inline-flex; align-items:center; gap:6px; font-family:'Cinzel',serif; font-size:0.52rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--noir); background:linear-gradient(135deg,var(--or-sombre),var(--or)); padding:5px 14px; margin-bottom:12px; }
  .v-ttl { font-family:'Cinzel Decorative',serif; font-size:clamp(2rem,5vw,3.2rem); color:var(--ivoire); letter-spacing:0.05em; margin-bottom:8px; }
  .v-dvd { display:flex; align-items:center; justify-content:center; gap:12px; margin:10px auto 12px; }
  .v-dl { height:1px; width:60px; background:linear-gradient(to right,transparent,var(--or)); }
  .v-dl.r { background:linear-gradient(to left,transparent,var(--or)); }
  .v-dg { width:5px; height:5px; background:var(--or); transform:rotate(45deg); }
  .v-dsc { font-style:italic; font-size:clamp(0.95rem,2vw,1.05rem); color:var(--ivoire-sombre); max-width:520px; margin:0 auto; line-height:1.8; opacity:0.85; }

  .v-map-area { flex:1; position:relative; background:#2c4a3e; overflow:hidden; }
  .v-frame { position:absolute; inset:16px; border:1px solid rgba(201,168,76,0.2); pointer-events:none; z-index:5; }
  .v-frame::before { content:''; position:absolute; top:6px; left:6px; width:28px; height:28px; border-top:1px solid rgba(201,168,76,0.55); border-left:1px solid rgba(201,168,76,0.55); }
  .v-frame::after { content:''; position:absolute; bottom:6px; right:6px; width:28px; height:28px; border-bottom:1px solid rgba(201,168,76,0.55); border-right:1px solid rgba(201,168,76,0.55); }
  .v-frame-tr { position:absolute; top:24px; right:24px; width:28px; height:28px; border-top:1px solid rgba(201,168,76,0.55); border-right:1px solid rgba(201,168,76,0.55); pointer-events:none; z-index:5; }
  .v-frame-bl { position:absolute; bottom:24px; left:24px; width:28px; height:28px; border-bottom:1px solid rgba(201,168,76,0.55); border-left:1px solid rgba(201,168,76,0.55); pointer-events:none; z-index:5; }
  .v-hint { position:absolute; top:32px; left:50%; transform:translateX(-50%); font-family:'Cinzel',serif; font-size:0.5rem; letter-spacing:0.3em; text-transform:uppercase; color:rgba(201,168,76,0.35); pointer-events:none; z-index:6; white-space:nowrap; }

  .v-compass { position:absolute; bottom:38px; right:38px; width:76px; height:76px; opacity:0.65; pointer-events:none; z-index:6; }
  .v-zoom { position:absolute; bottom:38px; left:38px; display:flex; flex-direction:column; gap:4px; z-index:6; }
  .v-zb { width:32px; height:32px; background:rgba(9,9,15,0.88); border:1px solid rgba(201,168,76,0.3); color:var(--or); font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s; }
  .v-zb:hover { background:rgba(201,168,76,0.1); border-color:var(--or); }

  @keyframes pulse-ring { 0%{opacity:0.8} 100%{r:20;opacity:0} }
  .city-ring { animation:pulse-ring 2s ease-out infinite; fill:none; }

  .v-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:1999; opacity:0; pointer-events:none; transition:opacity 0.4s; }
  .v-overlay.open { opacity:1; pointer-events:all; }
  .v-panel { position:fixed; top:0; right:-100%; width:min(440px,100vw); height:100vh; background:linear-gradient(180deg,#0d0b08,#09090F); border-left:1px solid rgba(201,168,76,0.2); z-index:2000; transition:right 0.5s cubic-bezier(0.16,1,0.3,1); display:flex; flex-direction:column; overflow-y:auto; }
  .v-panel.open { right:0; }
  .v-close { position:absolute; top:18px; right:18px; width:34px; height:34px; border:1px solid rgba(201,168,76,0.3); background:transparent; color:var(--or); font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s; z-index:10; }
  .v-close:hover { background:rgba(201,168,76,0.1); border-color:var(--or); }
  .v-vid { position:relative; aspect-ratio:16/9; background:#000; overflow:hidden; flex-shrink:0; }
  .v-vthumb { width:100%; height:100%; object-fit:cover; filter:sepia(30%) brightness(0.6); }
  .v-vplay { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; background:rgba(9,9,15,0.4); cursor:pointer; }
  .v-pcircle { width:62px; height:62px; border-radius:50%; border:2px solid var(--or); display:flex; align-items:center; justify-content:center; box-shadow:0 0 28px rgba(201,168,76,0.3); }
  .v-ptri { width:0; height:0; border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:17px solid var(--or); margin-left:4px; }
  .v-plbl { font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--ivoire-sombre); }
  .v-pb { padding:26px 26px 48px; flex:1; }
  .v-pera { font-family:'Cinzel',serif; font-size:0.54rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--or); opacity:0.8; margin-bottom:8px; }
  .v-pname { font-family:'Cinzel Decorative',serif; font-size:clamp(1.3rem,4vw,1.9rem); color:var(--ivoire); margin-bottom:4px; line-height:1.2; }
  .v-pcountry { font-style:italic; font-size:0.88rem; color:var(--ivoire-sombre); opacity:0.6; margin-bottom:18px; }
  .v-pline { height:1px; background:linear-gradient(to right,var(--or-sombre),transparent); margin-bottom:18px; opacity:0.4; }
  .v-pdesc { font-style:italic; font-size:0.95rem; color:var(--ivoire-sombre); line-height:1.85; margin-bottom:22px; opacity:0.85; }
  .v-pinfos { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:24px; }
  .v-pinfo { background:rgba(201,168,76,0.04); border:1px solid rgba(201,168,76,0.12); padding:11px; }
  .v-pilbl { font-family:'Cinzel',serif; font-size:0.46rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--or-sombre); margin-bottom:4px; }
  .v-pival { font-family:'Cinzel',serif; font-size:0.72rem; color:var(--ivoire); }
  .v-plock { background:rgba(201,168,76,0.05); border:1px solid rgba(201,168,76,0.2); padding:22px; text-align:center; margin-bottom:18px; }
  .v-plico { font-size:1.8rem; margin-bottom:10px; }
  .v-pltit { font-family:'Cinzel',serif; font-size:0.78rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--or); margin-bottom:9px; }
  .v-pldsc { font-style:italic; font-size:0.86rem; color:var(--ivoire-sombre); opacity:0.75; line-height:1.7; margin-bottom:16px; }
  .v-gold-btn { font-family:'Cinzel',serif; font-size:0.62rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--noir); background:linear-gradient(135deg,var(--or),var(--or-clair)); padding:13px 24px; border:none; cursor:pointer; width:100%; transition:all 0.3s; }
  .v-gold-btn:hover { box-shadow:0 0 20px rgba(201,168,76,0.4); transform:translateY(-1px); }

  @media(max-width:900px){
    .vn-links{display:none} .vn-burger{display:flex}
    .v-panel{width:100vw} .v-compass{width:52px;height:52px;bottom:18px;right:18px}
    .v-zoom{bottom:18px;left:18px} .v-hint{display:none}
  }
`;

export default function VillesPage({ user, profile }) {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([15, 20]);

  useEffect(() => {
    const handler = e => { if(e.key==='Escape') setSelectedCity(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  },[]);

  useEffect(() => {
    document.body.style.overflow = selectedCity ? 'hidden' : '';
    return () => { document.body.style.overflow=''; };
  },[selectedCity]);
  
console.log('profile reçu:', profile);
  if (!profile?.is_premium) return <PremiumGate pageName="Les Villes" />;

  return (
    <>
      <style>{styles}</style>
      <nav className="vn">
        <span className="vn-logo" onClick={()=>navigate('/')}>Anachrona</span>
        <ul className="vn-links">
          <li><a onClick={()=>navigate('/')}>Accueil</a></li>
          <li><a onClick={()=>navigate('/')}>Les Portraits</a></li>
          <li><a className="active">Les Villes</a></li>
          <li><a onClick={()=>navigate('/')}>La Fiction</a></li>
          <li><a onClick={()=>navigate('/')}>L'Arène</a></li>
        </ul>
        <button className="vn-cta">Premium · 5€/mois</button>
        <button className={`vn-burger ${menuOpen?'open':''}`} onClick={()=>setMenuOpen(!menuOpen)}>
          <span/><span/><span/>
        </button>
      </nav>

      <div className={`vn-mob ${menuOpen?'open':''}`}>
        <a onClick={()=>{setMenuOpen(false);navigate('/');}}>Accueil</a>
        <a onClick={()=>setMenuOpen(false)}>Les Villes</a>
        <a onClick={()=>{setMenuOpen(false);navigate('/');}}>La Fiction</a>
      </div>

      <div className="v-page">
        <div className="v-hdr">
          <div className="v-badge">✦ Anachrona Premium</div>
          <h1 className="v-ttl">Les Villes</h1>
          <div className="v-dvd"><div className="v-dl"/><div className="v-dg"/><div className="v-dl r"/></div>
          <p className="v-dsc">Cliquez sur une cité pour la découvrir à travers les âges, en vidéos créées par l'IA.</p>
        </div>

        <div className="v-map-area" style={{height:'calc(100vh - 200px)'}}>
          <div className="v-frame"/>
          <div className="v-frame-tr"/>
          <div className="v-frame-bl"/>
          <span className="v-hint">✦ Molette pour zoomer · Glissez pour naviguer · Cliquez sur une ville ✦</span>

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140, center: [15, 20] }}
            style={{ width:'100%', height:'100%', background:'transparent' }}
          >
            <defs>
              <radialGradient id="seaBg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#3a6b5a"/>
                <stop offset="100%" stopColor="#1e3d30"/>
              </radialGradient>
            </defs>
            <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#seaBg)"/>

            <ZoomableGroup
              zoom={zoom}
              center={center}
              onMoveEnd={({zoom:z, coordinates}) => { setZoom(z); setCenter(coordinates); }}
              minZoom={0.8}
              maxZoom={12}
            >
              <Geographies geography={worldData}>
                {({geographies}) => geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill:'#c8a96e', stroke:'#7a5c2e', strokeWidth:0.5, outline:'none' },
                      hover:   { fill:'#d4b87a', stroke:'#7a5c2e', strokeWidth:0.6, outline:'none' },
                      pressed: { fill:'#d4b87a', outline:'none' },
                    }}
                  />
                ))}
              </Geographies>

              {CITIES.map(city => {
                const active = hoveredCity===city.id || selectedCity?.id===city.id;
                return (
                  <Marker
                    key={city.id}
                    coordinates={city.coordinates}
                    onClick={() => setSelectedCity(city)}
                    onMouseEnter={() => setHoveredCity(city.id)}
                    onMouseLeave={() => setHoveredCity(null)}
                    style={{cursor:'pointer'}}
                  >
                    {active && (
                      <circle className="city-ring" r="14" stroke={city.free?'#c0392b':'#8b1a1a'} strokeWidth="0.8"/>
                    )}
                    <circle
                      r={active?11:7}
                      fill={active?'rgba(192,57,43,0.2)':'rgba(192,57,43,0.08)'}
                      stroke={active?'rgba(192,57,43,0.8)':'rgba(192,57,43,0.5)'}
                      strokeWidth="0.8"
                      style={{transition:'all 0.3s'}}
                    />
                    <circle
                      r={active?5:3}
                      fill={city.free?'#c0392b':'#8b1a1a'}
                      style={{transition:'all 0.3s', filter:'drop-shadow(0 0 3px rgba(139,26,26,0.8))'}}
                    />
                    <text
                      textAnchor="middle"
                      y={-13}
                      style={{
                        fontFamily:'Cinzel, serif',
                        fontSize: active?'7px':'5px',
                        fill: active?'#8b1a1a':'#3d1f0a',
                        letterSpacing:'0.5px',
                        pointerEvents:'none',
                        fontWeight: active?'bold':'normal',
                      }}
                    >{city.name}</text>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          <div className="v-compass">
            <svg viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="28" fill="rgba(6,13,24,0.8)" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8"/>
              <path d="M30 5 L27 28 L30 25 L33 28 Z" fill="#C9A84C"/>
              <path d="M30 55 L27 32 L30 35 L33 32 Z" fill="rgba(201,168,76,0.38)"/>
              <path d="M5 30 L28 27 L25 30 L28 33 Z" fill="rgba(201,168,76,0.38)"/>
              <path d="M55 30 L32 27 L35 30 L32 33 Z" fill="rgba(201,168,76,0.38)"/>
              <circle cx="30" cy="30" r="2.5" fill="#C9A84C"/>
              <text x="30" y="14" textAnchor="middle" fontSize="5" fill="#C9A84C" fontFamily="serif" fontWeight="bold">N</text>
              <text x="30" y="53" textAnchor="middle" fontSize="4" fill="rgba(201,168,76,0.5)" fontFamily="serif">S</text>
              <text x="9" y="32" textAnchor="middle" fontSize="4" fill="rgba(201,168,76,0.5)" fontFamily="serif">O</text>
              <text x="51" y="32" textAnchor="middle" fontSize="4" fill="rgba(201,168,76,0.5)" fontFamily="serif">E</text>
            </svg>
          </div>

          <div className="v-zoom">
            <button className="v-zb" onClick={()=>setZoom(z=>Math.min(z+0.8,12))}>+</button>
            <button className="v-zb" onClick={()=>setZoom(z=>Math.max(z-0.8,0.8))}>−</button>
            <button className="v-zb" style={{fontSize:'0.65rem'}} onClick={()=>{setZoom(1);setCenter([15,20]);}}>↺</button>
          </div>
        </div>
      </div>

      <div className={`v-overlay ${selectedCity?'open':''}`} onClick={()=>setSelectedCity(null)}/>

      <div className={`v-panel ${selectedCity?'open':''}`}>
        {selectedCity && <>
          <button className="v-close" onClick={()=>setSelectedCity(null)}>✕</button>
          <div className="v-vid">
            <img className="v-vthumb" src={selectedCity.img} alt={selectedCity.name}/>
            <div className="v-vplay">
              <div className="v-pcircle"><div className="v-ptri"/></div>
              <span className="v-plbl">{selectedCity.free?`Visionner · ${selectedCity.duration}`:'🔒 Contenu Premium'}</span>
            </div>
          </div>
          <div className="v-pb">
            <div className="v-pera">{selectedCity.era}</div>
            <h2 className="v-pname">{selectedCity.name}</h2>
            <p className="v-pcountry">{selectedCity.country}</p>
            <div className="v-pline"/>
            <p className="v-pdesc">{selectedCity.desc}</p>
            <div className="v-pinfos">
              <div className="v-pinfo"><div className="v-pilbl">Période</div><div className="v-pival">{selectedCity.year}</div></div>
              <div className="v-pinfo"><div className="v-pilbl">Population</div><div className="v-pival">{selectedCity.population}</div></div>
            </div>
            {!selectedCity.free
              ? <div className="v-plock">
                  <div className="v-plico">🔒</div>
                  <div className="v-pltit">Contenu Premium</div>
                  <p className="v-pldsc">Accédez à la vidéo complète sur {selectedCity.name} pour 5€/mois.</p>
                  <button className="v-gold-btn">Débloquer avec Premium</button>
                </div>
              : <button className="v-gold-btn">▶ Visionner · {selectedCity.duration}</button>
            }
          </div>
        </>}
      </div>
    </>
  );
}
