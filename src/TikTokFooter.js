import React from 'react';

function TikTokIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M21.5 2h-3.8v19.1a3.7 3.7 0 0 1-3.7 3.7 3.7 3.7 0 0 1-3.7-3.7 3.7 3.7 0 0 1 3.7-3.7c.36 0 .7.05 1.03.14V13.6a7.55 7.55 0 0 0-1.03-.07 7.5 7.5 0 0 0-7.5 7.5 7.5 7.5 0 0 0 7.5 7.5 7.5 7.5 0 0 0 7.5-7.5V11.4a11.1 11.1 0 0 0 6.5 2.1V9.7A7.3 7.3 0 0 1 21.5 2Z"
        fill="white"
      />
    </svg>
  );
}

export default function TikTokFooter() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 48px',
      background: 'rgba(255,255,255,0.03)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      flexWrap: 'wrap',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <TikTokIcon />
        <div>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '14px',
            letterSpacing: '0.08em',
            color: '#e8dcc8',
          }}>@anachrona.fr</div>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: 'rgba(232,220,200,0.5)',
            marginTop: '2px',
          }}>Découvrez l'Histoire en 60 secondes</div>
        </div>
      </div>
      <a
        href="https://www.tiktok.com/@anachrona.fr"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '9px 20px',
          border: '1px solid rgba(232,220,200,0.3)',
          borderRadius: '4px',
          color: '#e8dcc8',
          textDecoration: 'none',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,220,200,0.3)'; e.currentTarget.style.color = '#e8dcc8'; }}
      >
        Suivre sur TikTok
      </a>
    </div>
  );
}
