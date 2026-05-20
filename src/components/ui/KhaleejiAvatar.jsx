/**
 * KhaleejiAvatar — faceless, stylized portrait of a Khaleeji man wearing
 * a ghutra (head cloth) over a kandura, drawn in inline SVG using the
 * brand palette. Three deterministic variants cycle by name hash:
 *   0 → white ghutra + black agal      (Emirati / KSA classic)
 *   1 → red-and-white shemagh + agal   (KSA / Kuwait)
 *   2 → plain white ghutra, no agal    (Omani / casual)
 *
 * Faceless on purpose — keeps things tasteful, sidesteps likeness issues,
 * and reads as a brand mark at avatar sizes (32–48px).
 */

const PALETTE = {
  bg: '#1A2222',         // surface
  ring: 'rgba(201,169,97,0.30)', // primary @ 30%
  ghutraWhite: '#F4EEE2',   // ivory
  ghutraShade: '#D9D2C2',   // ivoryAlt (warmer shadow)
  shemaghRed: '#C26B5F',    // badgeRed
  agal: '#0A0E0E',          // ink
  agalGold: '#C9A961',      // primary — gold cord accent
  skin: '#C9A07A',          // warm beige (kept neutral / desaturated)
  kandura: '#EFE6D4',       // kandura ivory
};

function hashName(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h + name.charCodeAt(i)) % 9973;
  return h;
}

export default function KhaleejiAvatar({ name = '', className = '', size = 40 }) {
  const variant = hashName(name) % 3;

  const ghutraFill = variant === 1 ? PALETTE.shemaghRed : PALETTE.ghutraWhite;
  const showAgal = variant !== 2;
  const showShemaghPattern = variant === 1;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Customer avatar"
    >
      <defs>
        {/* subtle inner gradient on the disc so it doesn't read as flat */}
        <radialGradient id="kavBg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#222B2B" />
          <stop offset="100%" stopColor={PALETTE.bg} />
        </radialGradient>
        {/* shemagh pattern — diagonal lattice */}
        <pattern id="kavShemagh" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill={PALETTE.shemaghRed} />
          <path d="M0 3 H6 M3 0 V6" stroke={PALETTE.ghutraWhite} strokeWidth="1.1" />
        </pattern>
        <clipPath id="kavClip">
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>

      {/* Disc background */}
      <g clipPath="url(#kavClip)">
        <circle cx="32" cy="32" r="32" fill="url(#kavBg)" />

        {/* Kandura collar / shoulders — soft V at the bottom */}
        <path
          d="M6 64 C 12 50, 22 46, 32 46 C 42 46, 52 50, 58 64 Z"
          fill={PALETTE.kandura}
          opacity="0.92"
        />
        {/* Collar shadow seam */}
        <path
          d="M22 49 Q 32 56 42 49"
          fill="none"
          stroke={PALETTE.ghutraShade}
          strokeWidth="0.8"
          opacity="0.7"
        />

        {/* Head (faceless silhouette) */}
        <ellipse cx="32" cy="33" rx="11.5" ry="13" fill={PALETTE.skin} />

        {/* Ghutra drape — sides falling onto shoulders */}
        <path
          d="M14 28 Q 13 44 18 52 L 24 52 Q 22 42 24 30 Z"
          fill={showShemaghPattern ? 'url(#kavShemagh)' : ghutraFill}
        />
        <path
          d="M50 28 Q 51 44 46 52 L 40 52 Q 42 42 40 30 Z"
          fill={showShemaghPattern ? 'url(#kavShemagh)' : ghutraFill}
        />

        {/* Ghutra crown — covers top of head, sweeps to sides */}
        <path
          d="M16 30 Q 18 14 32 13 Q 46 14 48 30 Q 44 26 40 26 L 24 26 Q 20 26 16 30 Z"
          fill={showShemaghPattern ? 'url(#kavShemagh)' : ghutraFill}
        />

        {/* Soft fold shadow under the crown for depth */}
        <path
          d="M20 27 Q 32 22 44 27"
          fill="none"
          stroke={PALETTE.ghutraShade}
          strokeWidth="0.8"
          opacity="0.55"
        />

        {/* Agal — double black cord with a small gold knot */}
        {showAgal && (
          <g>
            <ellipse
              cx="32"
              cy="18"
              rx="14"
              ry="3"
              fill="none"
              stroke={PALETTE.agal}
              strokeWidth="2.2"
            />
            <ellipse
              cx="32"
              cy="20.5"
              rx="14"
              ry="3"
              fill="none"
              stroke={PALETTE.agal}
              strokeWidth="2.2"
            />
            {/* Gold knot detail — ties to brand */}
            <circle cx="20" cy="19.2" r="1.6" fill={PALETTE.agalGold} />
          </g>
        )}

        {/* Faint inner ring to lift the avatar from dark backgrounds */}
        <circle cx="32" cy="32" r="31.25" fill="none" stroke={PALETTE.ring} strokeWidth="0.75" />
      </g>
    </svg>
  );
}
