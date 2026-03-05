import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  .pg {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,105,20,0.1) 0%, transparent 70%),
      linear-gradient(160deg, #09090F 0%, #0D0D1A 50%, #0F0D18 100%);
    font-family: 'EB Garamond', serif;
  }

  .pg-box {
    max-width: 540px;
    width: 100%;
    background: linear-gradient(145deg, rgba(42,31,14,0.9), rgba(13,13,26,0.95));
    border: 1px solid rgba(201,168,76,0.25);
    padding: clamp(36px,5vw,60px);
    text-align: center;
    position: relative;
    box-shadow: 0 40px 100px rgba(0,0,0,0.7);
    animation: pg-in 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes pg-in {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .pg-box::before { content:''; position:absolute; top:8px; left:8px; width:20px; height:20px; border-top:1px solid #8B6914; border-left:1px solid #8B6914; opacity:0.7; }
  .pg-box::after  { content:''; position:absolute; bottom:8px; right:8px; width:20px; height:20px; border-bottom:1px solid #8B6914; border-right:1px solid #8B6914; opacity:0.7; }

  .pg-icon { font-size: 3rem; margin-bottom: 20px; }

  .pg-badge {
    display: inline-flex; align-items:center; gap:6px;
    font-family: 'Cinzel', serif; font-size: 0.5rem;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: #8B6914; border: 1px solid rgba(201,168,76,0.25);
    padding: 5px 16px; margin-bottom: 18px;
  }

  .pg-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.4rem, 4vw, 2rem);
    color: #F5F0E8; margin-bottom: 10px; line-height: 1.2;
  }

  .pg-dvd { display:flex; align-items:center; justify-content:center; gap:12px; margin:14px auto 18px; }
  .pg-dl { height:1px; width:60px; background:linear-gradient(to right,transparent,#C9A84C); }
  .pg-dl.r { background:linear-gradient(to left,transparent,#C9A84C); }
  .pg-dg { width:5px; height:5px; background:#C9A84C; transform:rotate(45deg); }

  .pg-desc {
    font-style: italic; font-size: clamp(0.95rem, 2vw, 1.05rem);
    color: #D4C9B0; line-height: 1.85; opacity: 0.85;
    margin-bottom: 28px;
  }

  .pg-perks {
    display: flex; flex-direction:column; gap:10px;
    margin-bottom: 28px; text-align:left;
  }

  .pg-perk {
    display: flex; align-items:center; gap:12px;
    font-family: 'Cinzel', serif; font-size: 0.56rem;
    letter-spacing: 0.15em; text-transform:uppercase;
    color: #D4C9B0;
  }

  .pg-perk-dot { width:5px; height:5px; background:#C9A84C; transform:rotate(45deg); flex-shrink:0; }

  .pg-price {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    color: #C9A84C; text-shadow: 0 0 30px rgba(201,168,76,0.3);
    margin-bottom: 6px; line-height:1;
  }

  .pg-price-sub {
    font-style:italic; font-size:0.85rem;
    color: #D4C9B0; opacity:0.6; margin-bottom:24px;
  }

  .pg-btn-primary {
    font-family: 'Cinzel', serif; font-size: 0.62rem;
    letter-spacing: 0.25em; text-transform: uppercase;
    color: #09090F;
    background: linear-gradient(135deg, #C9A84C, #E8C96A);
    padding: 15px 32px; border:none; cursor:pointer;
    width: 100%; margin-bottom: 12px;
    transition: all 0.3s;
  }
  .pg-btn-primary:hover { box-shadow:0 0 24px rgba(201,168,76,0.4); transform:translateY(-1px); }

  .pg-btn-secondary {
    font-family: 'Cinzel', serif; font-size: 0.58rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: #C9A84C; background: transparent;
    padding: 12px 32px; border: 1px solid rgba(201,168,76,0.3);
    cursor:pointer; width:100%; transition:all 0.3s;
  }
  .pg-btn-secondary:hover { background:rgba(201,168,76,0.07); border-color:#C9A84C; }
`;

export default function PremiumGate({ pageName }) {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <div className="pg">
        <div className="pg-box">
          <div className="pg-icon">🔒</div>
          <div className="pg-badge">✦ Anachrona Premium</div>
          <h2 className="pg-title">{pageName} est réservé aux membres Premium</h2>
          <div className="pg-dvd">
            <div className="pg-dl"/><div className="pg-dg"/><div className="pg-dl r"/>
          </div>
          <p className="pg-desc">
            Débloquez l'accès complet à toutes les fonctionnalités d'Anachrona — carte interactive, uchronies hebdomadaires, archives et bien plus.
          </p>
          <div className="pg-perks">
            {["Les Villes — Carte interactive mondiale","La Fiction — Uchronies chaque semaine","L'Arène — Débats historiques","Grimoire — Archives des musées"].map((p,i) => (
              <div key={i} className="pg-perk"><div className="pg-perk-dot"/>{p}</div>
            ))}
          </div>
          <div className="pg-price">5€<span style={{fontSize:'0.4em',verticalAlign:'super',opacity:0.7}}>/mois</span></div>
          <p className="pg-price-sub">Sans engagement · Résiliable à tout moment</p>
          <button className="pg-btn-primary" onClick={()=>navigate('/login')}>
            Devenir Premium
          </button>
          <button className="pg-btn-secondary" onClick={()=>navigate('/')}>
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </>
  );
}
