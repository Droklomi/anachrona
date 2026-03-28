'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AnachronaLogo from '@/src/AnachronaLogo';

const styles = `
  :root {
    --noir: #09090F;
    --or: #C9A84C;
    --or-clair: #E8C96A;
    --or-sombre: #8B6914;
    --ivoire: #F5F0E8;
    --ivoire-sombre: #D4C9B0;
  }

  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { background:var(--noir); color:var(--ivoire); font-family:'EB Garamond',serif; overflow-x:hidden; min-height:100vh; }

  .lp { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:20px; position:relative; background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,105,20,0.1) 0%, transparent 70%), linear-gradient(160deg, #09090F 0%, #0D0D1A 50%, #0F0D18 100%); }

  .lp::before { content:''; position:fixed; inset:0; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"); pointer-events:none; z-index:0; opacity:0.5; }

  .lp-ring { position:fixed; top:50%; left:50%; border-radius:50%; border:1px solid rgba(201,168,76,0.05); pointer-events:none; }
  .lp-ring:nth-child(1) { width:700px; height:700px; transform:translate(-50%,-50%); animation:lp-rotate 80s linear infinite; }
  .lp-ring:nth-child(2) { width:500px; height:500px; transform:translate(-50%,-50%); animation:lp-rotate 50s linear infinite reverse; border-color:rgba(201,168,76,0.03); }

  @keyframes lp-rotate { from { transform:translate(-50%,-50%) rotate(0deg); } to { transform:translate(-50%,-50%) rotate(360deg); } }

  .lp-box { position:relative; z-index:2; width:100%; max-width:480px; background:linear-gradient(145deg,rgba(26,18,8,0.9),rgba(13,13,26,0.95)); border:1px solid rgba(201,168,76,0.2); padding:clamp(32px,5vw,52px); box-shadow:0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(201,168,76,0.04); animation:lp-fadein 0.8s cubic-bezier(0.16,1,0.3,1) both; }

  @keyframes lp-fadein { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }

  .lp-box::before { content:''; position:absolute; top:8px; left:8px; width:20px; height:20px; border-top:1px solid var(--or-sombre); border-left:1px solid var(--or-sombre); opacity:0.7; }
  .lp-box::after  { content:''; position:absolute; bottom:8px; right:8px; width:20px; height:20px; border-bottom:1px solid var(--or-sombre); border-right:1px solid var(--or-sombre); opacity:0.7; }

  .lp-logo { text-align:center; margin-bottom:28px; cursor:pointer; }
  .lp-dvd { display:flex; align-items:center; justify-content:center; gap:12px; margin:0 auto 28px; }
  .lp-dl { height:1px; width:60px; background:linear-gradient(to right,transparent,var(--or)); }
  .lp-dl.r { background:linear-gradient(to left,transparent,var(--or)); }
  .lp-dg { width:5px; height:5px; background:var(--or); transform:rotate(45deg); }

  .lp-tabs { display:flex; margin-bottom:28px; border-bottom:1px solid rgba(201,168,76,0.12); }
  .lp-tab { flex:1; font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--ivoire-sombre); background:transparent; border:none; padding:12px; cursor:pointer; transition:color 0.3s; position:relative; }
  .lp-tab.active { color:var(--or); }
  .lp-tab.active::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:1px; background:var(--or); }

  .lp-field { margin-bottom:18px; }
  .lp-label { font-family:'Cinzel',serif; font-size:0.48rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--or-sombre); display:block; margin-bottom:8px; }
  .lp-input { width:100%; background:rgba(201,168,76,0.04); border:1px solid rgba(201,168,76,0.18); color:var(--ivoire); font-family:'EB Garamond',serif; font-size:1rem; padding:12px 16px; outline:none; transition:border-color 0.3s, background 0.3s; }
  .lp-input:focus { border-color:rgba(201,168,76,0.5); background:rgba(201,168,76,0.07); }
  .lp-input::placeholder { color:rgba(212,201,176,0.3); }

  .lp-btn { width:100%; font-family:'Cinzel',serif; font-size:0.62rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--noir); background:linear-gradient(135deg,var(--or),var(--or-clair)); padding:15px; border:none; cursor:pointer; margin-top:8px; transition:all 0.3s; }
  .lp-btn:hover { box-shadow:0 0 24px rgba(201,168,76,0.4); transform:translateY(-1px); }
  .lp-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }

  .lp-error { font-style:italic; font-size:0.85rem; color:#e05c5c; text-align:center; margin-top:14px; padding:10px; background:rgba(224,92,92,0.08); border:1px solid rgba(224,92,92,0.2); }
  .lp-success { font-style:italic; font-size:0.85rem; color:#6abf8a; text-align:center; margin-top:14px; padding:10px; background:rgba(106,191,138,0.08); border:1px solid rgba(106,191,138,0.2); }

  .lp-forgot { font-style:italic; font-size:0.82rem; color:var(--or-sombre); text-align:right; cursor:pointer; margin-top:8px; transition:color 0.3s; background:none; border:none; width:100%; }
  .lp-forgot:hover { color:var(--or); }

  .lp-back { font-family:'Cinzel',serif; font-size:0.48rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--or-sombre); background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:8px; margin-bottom:24px; transition:color 0.3s; padding:0; }
  .lp-back:hover { color:var(--or); }

  .lp-desc { font-style:italic; font-size:0.88rem; color:var(--ivoire-sombre); opacity:0.6; text-align:center; margin-top:20px; line-height:1.7; }
  .lp-loading { display:inline-block; animation:lp-spin 0.8s linear infinite; }
  @keyframes lp-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
`;

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    setError(''); setSuccess('');
    if (!email || !password) { setError('Veuillez remplir tous les champs.'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError('Email ou mot de passe incorrect.'); return; }
    router.push('/');
  };

  const handleRegister = async () => {
    setError(''); setSuccess('');
    if (!email || !password || !confirmPassword) { setError('Veuillez remplir tous les champs.'); return; }
    if (password !== confirmPassword) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères.'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) { setError("Erreur lors de l'inscription : " + error.message); return; }
    setSuccess('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
  };

  const handleForgotPassword = async () => {
    if (!email) { setError('Entrez votre email pour réinitialiser le mot de passe.'); return; }
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/login' });
    setLoading(false);
    setSuccess('Email de réinitialisation envoyé !');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lp">
        <div className="lp-ring"/>
        <div className="lp-ring"/>
        <div className="lp-box">
          <button className="lp-back" onClick={() => router.push('/')}>← Retour à l'accueil</button>
          <div className="lp-logo" onClick={() => router.push('/')}>
            <AnachronaLogo onClick={() => router.push('/')} size={38} />
          </div>
          <div className="lp-dvd">
            <div className="lp-dl"/><div className="lp-dg"/><div className="lp-dl r"/>
          </div>
          <div className="lp-tabs">
            <button className={`lp-tab ${tab==='login'?'active':''}`} onClick={() => { setTab('login'); setError(''); setSuccess(''); }}>Se connecter</button>
            <button className={`lp-tab ${tab==='register'?'active':''}`} onClick={() => { setTab('register'); setError(''); setSuccess(''); }}>Créer un compte</button>
          </div>

          {tab === 'login' && (
            <>
              <div className="lp-field">
                <label className="lp-label">Email</label>
                <input className="lp-input" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              </div>
              <div className="lp-field">
                <label className="lp-label">Mot de passe</label>
                <input className="lp-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              </div>
              <button className="lp-btn" onClick={handleLogin} disabled={loading}>
                {loading ? <span className="lp-loading">⟳</span> : 'Se connecter'}
              </button>
              <button className="lp-forgot" onClick={handleForgotPassword}>Mot de passe oublié ?</button>
            </>
          )}

          {tab === 'register' && (
            <>
              <div className="lp-field">
                <label className="lp-label">Email</label>
                <input className="lp-input" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="lp-field">
                <label className="lp-label">Mot de passe</label>
                <input className="lp-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="lp-field">
                <label className="lp-label">Confirmer le mot de passe</label>
                <input className="lp-input" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>
              <button className="lp-btn" onClick={handleRegister} disabled={loading}>
                {loading ? <span className="lp-loading">⟳</span> : 'Créer mon compte'}
              </button>
            </>
          )}

          {error && <div className="lp-error">{error}</div>}
          {success && <div className="lp-success">{success}</div>}
          <p className="lp-desc">En vous connectant, vous acceptez les conditions d'utilisation d'Anachrona.</p>
        </div>
      </div>
    </>
  );
}
