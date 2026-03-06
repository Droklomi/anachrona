import React from 'react';

export default function AnachronaLogo({ size = 40, withText = true, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="sg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5DFA0" />
            <stop offset="50%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
          <linearGradient id="sg-sand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8C96A" />
            <stop offset="100%" stopColor="#C9A84C" />
          </linearGradient>
          <linearGradient id="sg-glass-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(201,168,76,0.12)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0.04)" />
          </linearGradient>
          <linearGradient id="sg-glass-bot" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(201,168,76,0.04)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0.15)" />
          </linearGradient>
          <filter id="sg-glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Plateau haut */}
        <rect x="24" y="14" width="52" height="5" rx="2.5"
          fill="url(#sg-gold)" filter="url(#sg-glow)"
        />

        {/* Bulbe supérieur */}
        <path d="M 30 19 Q 30 42 46 49 L 54 49 Q 70 42 70 19 Z"
          fill="url(#sg-glass-top)"
          stroke="url(#sg-gold)" strokeWidth="1.3"
        />

        {/* Sable haut */}
        <path d="M 32 19 Q 34 38 48 47 L 52 47 Q 66 38 68 19 Z"
          fill="url(#sg-sand)" opacity="0.5"
        />

        {/* Étranglement */}
        <path d="M 46 49 Q 48 52 50 53 Q 52 52 54 49 Q 52 47 50 46 Q 48 47 46 49 Z"
          fill="url(#sg-gold)" filter="url(#sg-glow)"
        />

        {/* Filet de sable */}
        <line x1="50" y1="53" x2="50" y2="60"
          stroke="#E8C96A" strokeWidth="1.2" opacity="0.7"
        />

        {/* Bulbe inférieur */}
        <path d="M 30 81 Q 30 58 46 51 L 54 51 Q 70 58 70 81 Z"
          fill="url(#sg-glass-bot)"
          stroke="url(#sg-gold)" strokeWidth="1.3"
        />

        {/* Sable bas */}
        <path d="M 35 81 Q 42 68 50 65 Q 58 68 65 81 Z"
          fill="url(#sg-sand)" opacity="0.85"
        />

        {/* Plateau bas */}
        <rect x="24" y="81" width="52" height="5" rx="2.5"
          fill="url(#sg-gold)" filter="url(#sg-glow)"
        />

        {/* Losange gauche */}
        <rect x="17" y="47" width="7" height="7"
          fill="url(#sg-gold)" transform="rotate(45 20.5 50.5)"
          opacity="0.8"
        />

        {/* Losange droit */}
        <rect x="76" y="47" width="7" height="7"
          fill="url(#sg-gold)" transform="rotate(45 79.5 50.5)"
          opacity="0.8"
        />

      </svg>

      {withText && (
        <span
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
            background: 'linear-gradient(135deg, #F5DFA0, #C9A84C, #8B6914)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.12em',
            lineHeight: 1,
          }}
        >
          Anachrona
        </span>
      )}
    </div>
  );
}
