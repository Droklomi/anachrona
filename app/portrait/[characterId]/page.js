import { notFound } from 'next/navigation';
import { CHARACTERS, UNIVERSES, UNIVERSE_COLORS } from '@/src/data';
import Link from 'next/link';

export async function generateStaticParams() {
  return CHARACTERS.map(c => ({ characterId: c.id }));
}

export async function generateMetadata({ params }) {
  const char = CHARACTERS.find(c => c.id === params.characterId);
  if (!char) return {};
  return {
    title: `${char.name} — Anachrona`,
    description: char.bio?.slice(0, 155),
    openGraph: {
      title: `${char.name} — Anachrona`,
      description: char.bio?.slice(0, 155),
      images: [{ url: char.img }],
    },
  };
}

export default function PortraitPage({ params }) {
  const char = CHARACTERS.find(c => c.id === params.characterId);
  if (!char) notFound();

  const univColor = UNIVERSE_COLORS[char.universe] || '#c9a84c';
  const univConfig = UNIVERSES.find(u => u.id === char.universe);
  const related = CHARACTERS.filter(c => c.universe === char.universe && c.id !== char.id).slice(0, 4);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0d0a; color: #e8dcc8; font-family: 'EB Garamond', Georgia, serif; }
        .pp-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 64px; background: rgba(13,13,10,0.96); border-bottom: 1px solid rgba(201,168,76,0.15); backdrop-filter: blur(12px); }
        .pp-nav-back { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(232,220,200,0.6); text-decoration: none; display: flex; align-items: center; gap: 8px; transition: color 0.2s; }
        .pp-nav-back:hover { color: #c9a84c; }
        .pp-nav-brand { font-family: 'Cinzel Decorative', serif; font-size: 14px; background: linear-gradient(135deg, #F5DFA0, #C9A84C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .pp-hero { position: relative; min-height: 70vh; display: flex; align-items: flex-end; overflow: hidden; }
        .pp-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: brightness(0.4) saturate(0.7); }
        .pp-hero-grad { position: absolute; inset: 0; background: linear-gradient(to top, #0d0d0a 0%, rgba(13,13,10,0.6) 40%, transparent 70%); }
        .pp-hero-content { position: relative; z-index: 1; padding: 0 clamp(24px, 6%, 80px) 56px; max-width: 800px; }
        .pp-badge { display: inline-block; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 14px; border-radius: 2px; color: #fff; margin-bottom: 16px; }
        .pp-name { font-family: 'Cinzel Decorative', serif; font-size: clamp(36px, 6vw, 72px); font-weight: 900; color: #fff; line-height: 1.05; margin-bottom: 10px; text-shadow: 0 2px 30px rgba(0,0,0,0.8); }
        .pp-dates { font-family: 'EB Garamond', serif; font-style: italic; font-size: 18px; color: rgba(232,220,200,0.65); letter-spacing: 0.04em; }
        .pp-body { max-width: 720px; margin: 0 auto; padding: clamp(40px, 6vw, 80px) clamp(24px, 6%, 80px); }
        .pp-section-label { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(201,168,76,0.65); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(201,168,76,0.12); }
        .pp-bio { font-family: 'EB Garamond', serif; font-style: italic; font-size: clamp(17px, 2vw, 20px); line-height: 1.85; color: rgba(232,220,200,0.85); margin-bottom: 56px; }
        .pp-related { margin-top: 40px; }
        .pp-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; margin-top: 20px; }
        .pp-related-card { text-decoration: none; display: block; }
        .pp-related-img-wrap { width: 100%; aspect-ratio: 2/3; border-radius: 4px; overflow: hidden; background: #1a1a16; margin-bottom: 8px; }
        .pp-related-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.75); transition: filter 0.3s, transform 0.3s; }
        .pp-related-card:hover .pp-related-img { filter: brightness(0.9); transform: scale(1.04); }
        .pp-related-name { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.08em; color: rgba(232,220,200,0.7); line-height: 1.3; }
        .pp-related-dates { font-family: 'EB Garamond', serif; font-style: italic; font-size: 12px; color: rgba(232,220,200,0.4); margin-top: 2px; }
        .pp-divider { border: none; border-top: 1px solid rgba(201,168,76,0.12); margin: 48px 0; }
        .pp-cta { text-align: center; padding: 40px 24px; }
        .pp-cta-text { font-family: 'EB Garamond', serif; font-style: italic; font-size: 16px; color: rgba(232,220,200,0.5); margin-bottom: 20px; }
        .pp-cta-link { display: inline-block; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; padding: 12px 28px; border: 1px solid rgba(201,168,76,0.35); color: #c9a84c; text-decoration: none; border-radius: 4px; transition: border-color 0.2s, background 0.2s; }
        .pp-cta-link:hover { border-color: #c9a84c; background: rgba(201,168,76,0.08); }
        @media (max-width: 768px) { .pp-nav { padding: 0 20px; } }
      `}</style>

      {/* NAV */}
      <nav className="pp-nav">
        <Link href={`/univers/${char.universe}`} className="pp-nav-back">
          ← {univConfig?.name || 'Retour'}
        </Link>
        <span className="pp-nav-brand">Anachrona</span>
        <Link href="/" style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(232,220,200,0.5)', textDecoration: 'none', textTransform: 'uppercase' }}>
          Accueil
        </Link>
      </nav>

      {/* HERO */}
      <div className="pp-hero">
        <img className="pp-hero-img" src={char.img} alt={char.name} />
        <div className="pp-hero-grad" />
        <div className="pp-hero-content">
          <span className="pp-badge" style={{ background: univColor }}>
            {univConfig?.name || char.universe}
          </span>
          <h1 className="pp-name">{char.name}</h1>
          <p className="pp-dates">{char.dates}</p>
        </div>
      </div>

      {/* BODY */}
      <div className="pp-body">
        <div className="pp-section-label">Biographie</div>
        <p className="pp-bio">{char.bio}</p>

        {related.length > 0 && (
          <>
            <hr className="pp-divider" />
            <div className="pp-related">
              <div className="pp-section-label">Dans le même univers</div>
              <div className="pp-related-grid">
                {related.map(c => (
                  <Link key={c.id} href={`/portrait/${c.id}`} className="pp-related-card">
                    <div className="pp-related-img-wrap">
                      <img className="pp-related-img" src={c.img} alt={c.name} loading="lazy" />
                    </div>
                    <div className="pp-related-name">{c.name}</div>
                    <div className="pp-related-dates">{c.dates}</div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        <hr className="pp-divider" />
        <div className="pp-cta">
          <p className="pp-cta-text">Découvrez tous les personnages d'Anachrona</p>
          <Link href="/" className="pp-cta-link">← Explorer le catalogue</Link>
        </div>
      </div>
    </>
  );
}
