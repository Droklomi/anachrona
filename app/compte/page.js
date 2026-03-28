'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import AnachronaLogo from '@/src/AnachronaLogo';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';

const styles = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #0d0d0a; color: #e8dcc8; font-family: 'EB Garamond', Georgia, serif; overflow-x: hidden; min-height: 100vh; }

body::after {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
}

.cp { min-height: 100vh; background: radial-gradient(ellipse 90% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%), #0d0d0a; }

/* NAV */
.cp-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px; height: 72px;
  border-bottom: 1px solid rgba(201,168,76,0.12);
}
.cp-nav-right { display: flex; align-items: center; gap: 16px; }
.cp-back {
  font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(201,168,76,0.6); background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px;
  transition: color 0.3s;
}
.cp-back:hover { color: #c9a84c; }

/* HERO */
.cp-hero {
  text-align: center;
  padding: 80px 24px 60px;
}
.cp-eyebrow {
  font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase;
  color: rgba(201,168,76,0.55); margin-bottom: 20px;
  display: flex; align-items: center; justify-content: center; gap: 16px;
}
.cp-eyebrow::before, .cp-eyebrow::after { content: ''; width: 40px; height: 1px; background: rgba(201,168,76,0.3); }
.cp-hero-title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(28px, 5vw, 52px); font-weight: 900;
  background: linear-gradient(135deg, #F5DFA0 0%, #C9A84C 50%, #8B6914 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  line-height: 1.1; margin-bottom: 18px;
}
.cp-hero-sub {
  font-family: 'EB Garamond', serif; font-style: italic; font-size: clamp(16px, 2vw, 20px);
  color: rgba(232,220,200,0.5); max-width: 520px; margin: 0 auto; line-height: 1.7;
}

/* PRICE CARD */
.cp-price-wrap {
  display: flex; justify-content: center; padding: 0 24px 60px;
}
.cp-price-card {
  width: 100%; max-width: 460px;
  background: linear-gradient(145deg, rgba(26,18,8,0.9), rgba(13,13,18,0.95));
  border: 1px solid rgba(201,168,76,0.3);
  padding: 40px 36px;
  position: relative;
  box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(201,168,76,0.04);
  animation: cp-fadein 0.7s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes cp-fadein { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

.cp-price-card::before { content:''; position:absolute; top:8px; left:8px; width:18px; height:18px; border-top:1px solid rgba(201,168,76,0.4); border-left:1px solid rgba(201,168,76,0.4); }
.cp-price-card::after  { content:''; position:absolute; bottom:8px; right:8px; width:18px; height:18px; border-bottom:1px solid rgba(201,168,76,0.4); border-right:1px solid rgba(201,168,76,0.4); }

.cp-badge {
  display: inline-block; font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
  color: #0d0d0a; background: linear-gradient(135deg, #c9a84c, #e8c96a);
  padding: 5px 14px; margin-bottom: 24px;
}
.cp-price-amount {
  font-family: 'Cinzel Decorative', serif; font-size: 48px; font-weight: 900;
  color: #F5DFA0; line-height: 1; margin-bottom: 4px;
}
.cp-price-period {
  font-family: 'EB Garamond', serif; font-style: italic; font-size: 15px;
  color: rgba(232,220,200,0.4); margin-bottom: 28px;
}
.cp-divider { border: none; border-top: 1px solid rgba(201,168,76,0.15); margin-bottom: 28px; }

.cp-features { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px; }
.cp-feature {
  display: flex; align-items: flex-start; gap: 14px;
  font-family: 'EB Garamond', serif; font-size: 16px; color: rgba(232,220,200,0.8); line-height: 1.4;
}
.cp-feature-icon {
  font-family: 'Cinzel', serif; font-size: 11px; color: #c9a84c; margin-top: 3px; flex-shrink: 0;
}

.cp-cta {
  width: 100%; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase;
  color: #0d0d0a; background: linear-gradient(135deg, #c9a84c, #e8c96a);
  padding: 16px; border: none; cursor: pointer;
  transition: transform 0.2s, box-shadow 0.3s;
  margin-bottom: 14px;
}
.cp-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,168,76,0.4); }

.cp-login-link {
  text-align: center; font-style: italic; font-size: 14px; color: rgba(232,220,200,0.35);
}
.cp-login-link button {
  background: none; border: none; color: rgba(201,168,76,0.6); cursor: pointer; font-style: italic; font-size: 14px;
  transition: color 0.2s; text-decoration: underline; text-underline-offset: 3px;
}
.cp-login-link button:hover { color: #c9a84c; }

/* FREE vs PREMIUM comparison */
.cp-compare { padding: 0 24px 80px; max-width: 700px; margin: 0 auto; }
.cp-compare-title {
  font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
  color: rgba(201,168,76,0.45); text-align: center; margin-bottom: 24px;
}
.cp-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.1); }
.cp-compare-col { background: rgba(13,13,10,0.98); padding: 28px 24px; }
.cp-compare-col-header {
  font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
  margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(201,168,76,0.12);
}
.cp-compare-col-header.free { color: rgba(232,220,200,0.3); }
.cp-compare-col-header.premium { color: #c9a84c; }
.cp-compare-item {
  font-family: 'EB Garamond', serif; font-size: 15px; line-height: 1.5; margin-bottom: 10px;
  display: flex; align-items: center; gap: 10px;
}
.cp-compare-item.has { color: rgba(232,220,200,0.75); }
.cp-compare-item.no { color: rgba(232,220,200,0.22); text-decoration: line-through; }
.cp-compare-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.cp-compare-item.has .cp-compare-dot { background: #c9a84c; }
.cp-compare-item.no .cp-compare-dot { background: rgba(232,220,200,0.15); }

/* ACCOUNT STATE (premium user) */
.cp-account-wrap { display: flex; justify-content: center; padding: 0 24px 80px; }
.cp-account-card {
  width: 100%; max-width: 460px;
  background: linear-gradient(145deg, rgba(26,18,8,0.9), rgba(13,13,18,0.95));
  border: 1px solid rgba(201,168,76,0.25); padding: 40px 36px;
  position: relative; animation: cp-fadein 0.7s cubic-bezier(0.16,1,0.3,1) both;
}
.cp-account-card::before { content:''; position:absolute; top:8px; left:8px; width:18px; height:18px; border-top:1px solid rgba(201,168,76,0.4); border-left:1px solid rgba(201,168,76,0.4); }
.cp-account-card::after  { content:''; position:absolute; bottom:8px; right:8px; width:18px; height:18px; border-bottom:1px solid rgba(201,168,76,0.4); border-right:1px solid rgba(201,168,76,0.4); }
.cp-account-status {
  display: flex; align-items: center; gap: 12px; margin-bottom: 28px;
}
.cp-status-dot { width: 8px; height: 8px; border-radius: 50%; background: #6abf8a; box-shadow: 0 0 8px rgba(106,191,138,0.6); }
.cp-status-label { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #6abf8a; }
.cp-account-name {
  font-family: 'Cinzel Decorative', serif; font-size: 22px; color: #F5DFA0; margin-bottom: 6px;
}
.cp-account-email { font-style: italic; font-size: 15px; color: rgba(232,220,200,0.4); margin-bottom: 28px; }
.cp-account-divider { border: none; border-top: 1px solid rgba(201,168,76,0.12); margin-bottom: 28px; }
.cp-account-perks { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
.cp-account-perk {
  display: flex; align-items: center; gap: 12px;
  font-family: 'EB Garamond', serif; font-size: 15px; color: rgba(232,220,200,0.7);
}
.cp-account-perk-icon { color: #c9a84c; font-size: 13px; }
.cp-logout {
  width: 100%; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(232,220,200,0.4); background: transparent; border: 1px solid rgba(232,220,200,0.12);
  padding: 13px; cursor: pointer; transition: color 0.3s, border-color 0.3s;
}
.cp-logout:hover { color: rgba(232,220,200,0.7); border-color: rgba(232,220,200,0.25); }

@media (max-width: 600px) {
  .cp-nav { padding: 0 20px; }
  .cp-compare-grid { grid-template-columns: 1fr; }
  .cp-price-card, .cp-account-card { padding: 28px 22px; }
}
`;

const FEATURES = [
  'Accès à tous les portraits historiques',
  'Vidéos exclusives en accès anticipé',
  'Nouveaux personnages chaque semaine',
  'Expérience sans publicité',
  'Soutien à la création de contenu',
];

const FREE_ITEMS = [
  { has: true, label: '15 portraits en accès libre' },
  { has: false, label: 'Portraits premium débloqués' },
  { has: false, label: 'Vidéos exclusives' },
  { has: false, label: 'Accès anticipé aux nouveautés' },
  { has: false, label: 'Sans publicité' },
];

const PREMIUM_ITEMS = [
  { has: true, label: 'Tous les portraits historiques' },
  { has: true, label: 'Portraits premium débloqués' },
  { has: true, label: 'Vidéos exclusives' },
  { has: true, label: 'Accès anticipé aux nouveautés' },
  { has: true, label: 'Sans publicité' },
];

export default function ComptePage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const isPremium = profile?.is_premium === true;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cp">
        <nav className="cp-nav">
          <div style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
            <AnachronaLogo size={32} />
          </div>
          <div className="cp-nav-right">
            <button className="cp-back" onClick={() => router.push('/')}>← Retour</button>
          </div>
        </nav>

        {/* PREMIUM USER — Account dashboard */}
        {user && isPremium ? (
          <>
            <div className="cp-hero">
              <div className="cp-eyebrow">Mon compte</div>
              <h1 className="cp-hero-title">Bienvenue</h1>
              <p className="cp-hero-sub">Vous bénéficiez d'un accès complet à l'univers Anachrona.</p>
            </div>
            <div className="cp-account-wrap">
              <div className="cp-account-card">
                <div className="cp-account-status">
                  <div className="cp-status-dot" />
                  <span className="cp-status-label">Pass Premium actif</span>
                </div>
                <div className="cp-account-email">{user.email}</div>
                <hr className="cp-account-divider" />
                <div className="cp-account-perks">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="cp-account-perk">
                      <span className="cp-account-perk-icon">✦</span>
                      {f}
                    </div>
                  ))}
                </div>
                <button className="cp-logout" onClick={handleLogout}>Se déconnecter</button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* HERO */}
            <div className="cp-hero">
              <div className="cp-eyebrow">Pass Premium</div>
              <h1 className="cp-hero-title">L'Histoire sans limites</h1>
              <p className="cp-hero-sub">Débloquez l'intégralité des portraits, vidéos et contenus exclusifs pour seulement 5€ par mois.</p>
            </div>

            {/* PRICE CARD */}
            <div className="cp-price-wrap">
              <div className="cp-price-card">
                <div className="cp-badge">Pass Premium</div>
                <div className="cp-price-amount">5€</div>
                <div className="cp-price-period">par mois · résiliable à tout moment</div>
                <hr className="cp-divider" />
                <ul className="cp-features">
                  {FEATURES.map((f, i) => (
                    <li key={i} className="cp-feature">
                      <span className="cp-feature-icon">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="cp-cta" onClick={() => router.push('/login')}>
                  {user ? 'Activer mon Pass Premium' : 'Commencer maintenant'}
                </button>
                {!user && (
                  <div className="cp-login-link">
                    Déjà un compte ?{' '}
                    <button onClick={() => router.push('/login')}>Se connecter</button>
                  </div>
                )}
                {user && (
                  <div className="cp-login-link">
                    <button onClick={handleLogout}>Se déconnecter</button>
                  </div>
                )}
              </div>
            </div>

            {/* COMPARISON */}
            <div className="cp-compare">
              <div className="cp-compare-title">Gratuit vs Premium</div>
              <div className="cp-compare-grid">
                <div className="cp-compare-col">
                  <div className="cp-compare-col-header free">Gratuit</div>
                  {FREE_ITEMS.map((item, i) => (
                    <div key={i} className={`cp-compare-item ${item.has ? 'has' : 'no'}`}>
                      <div className="cp-compare-dot" />
                      {item.label}
                    </div>
                  ))}
                </div>
                <div className="cp-compare-col">
                  <div className="cp-compare-col-header premium">Premium</div>
                  {PREMIUM_ITEMS.map((item, i) => (
                    <div key={i} className={`cp-compare-item ${item.has ? 'has' : 'no'}`}>
                      <div className="cp-compare-dot" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
