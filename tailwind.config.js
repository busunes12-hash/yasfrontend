/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      /* ── Sanctuary palette ──────────────────────────────────
         Warm gold + desaturated teal-black. Tokens grouped by role
         so usage is unambiguous. Contrast is checked against
         `surface` (#1A2222) for AA at body sizes (≥4.5:1).
       */
      colors: {
        // Brand gold — buttons, accents, key highlights
        primary: {
          DEFAULT: '#C9A961',
          dark: '#A88842',
          light: '#E2C58A',
        },
        accent: '#E2C58A', // soft gold for body-size text on dark

        // Dark surfaces (sanctuary mode)
        background: '#0F1515',
        surface:    '#1A2222',
        surfaceAlt: '#222B2B',
        ink:        '#0A0E0E', // canonical name for the deepest panel
        deepBrown:  '#0A0E0E', // legacy alias for `ink`; do not introduce new usages

        // Light surfaces (reserve for gifting / print / packaging cards)
        ivory:    '#F4EEE2',
        ivoryAlt: '#EBE3D2',

        // Borders
        border:       '#2A3030',
        borderStrong: '#3A4040',

        // Text — three levels, all AA on `surface` and `background`
        textPrimary:   '#F1ECE0',
        textSecondary: '#A8A096',
        textTertiary:  '#928C80', // bumped from #6E6960 for AA at body sizes

        // Feedback (each AA at small text on `surface`)
        success:  '#7BA889', // sage
        badgeRed: '#C26B5F', // terracotta — bumped from #B5685D for AA + clearer split from success
        info:     '#8FA3A8', // dusty blue
      },

      /* ── Two-font system: Inter (body) + Cormorant Garamond (display) ── */
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        arabic:  ['"Noto Naskh Arabic"', '"Amiri"', 'serif'],
      },

      /* ── Typographic scale ──
         Locked sizes used across the site to enforce hierarchy.
         display    → page heroes
         displaySm  → secondary heroes
         h1, h2, h3 → section / card headings
         body, caption, eyebrow → body & UI
       */
      fontSize: {
        '2xs':       ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.06em' }], // 11px
        'eyebrow':   ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.32em' }], // 11px caps
        'caption':   ['0.75rem',   { lineHeight: '1.5', letterSpacing: '0.04em' }], // 12px
        'body-sm':   ['0.875rem',  { lineHeight: '1.7' }],                          // 14px
        'body':      ['1rem',      { lineHeight: '1.75' }],                         // 16px
        'body-lg':   ['1.125rem',  { lineHeight: '1.7' }],                          // 18px
        'h3':        ['1.5rem',    { lineHeight: '1.2', letterSpacing: '-0.005em' }], // 24px
        'h2':        ['clamp(1.875rem, 3.2vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'h1':        ['clamp(2.5rem, 5vw, 4.25rem)',     { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display':   ['clamp(2.75rem, 6vw, 5.5rem)',     { lineHeight: '1.02', letterSpacing: '-0.025em' }],
      },

      letterSpacing: {
        eyebrow: '0.32em',
        wider: '0.08em',
        wide: '0.04em',
      },

      /* ── Wider container for breath on large screens ── */
      maxWidth: {
        'page': '1400px',
      },

      borderRadius: {
        lg: '12px',
      },

      boxShadow: {
        warm:    '0 1px 2px rgba(0,0,0,0.35), 0 4px 18px rgba(0,0,0,0.35)',
        warmLg:  '0 4px 12px rgba(0,0,0,0.45), 0 16px 40px rgba(0,0,0,0.45)',
        glow:    '0 0 0 1px rgba(201,169,97,0.20), 0 8px 28px rgba(201,169,97,0.18)',
        innerTop: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },

      backgroundImage: {
        'sanctuary-radial':
          'radial-gradient(ellipse at top, rgba(201,169,97,0.08) 0%, transparent 55%), radial-gradient(ellipse at bottom, rgba(226,197,138,0.05) 0%, transparent 60%)',
        'grain':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.035 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      },

      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:  { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        breathe:  { '0%, 100%': { opacity: '0.5' }, '50%': { opacity: '0.85' } },
      },
      animation: {
        /* shimmer is reserved for explicit, user-triggered moments only.
           Keep the keyframes available, but the always-on alias is now a no-op
           to avoid main-thread/GPU work while the user is reading. */
        shimmer: 'none',
        fadeIn:  'fadeIn 0.7s ease-out',
        slideUp: 'slideUp 0.7s ease-out',
        breathe: 'breathe 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
