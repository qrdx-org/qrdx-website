import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

const size = { width: 1200, height: 630 }

// The dark theme's tokens (app/globals.css .dark), as hex.
const BG = '#030712'
const FG = '#f1f5f9'
const MUTED = '#8b97ad'
const RULE = '#162036'
const BLUE = '#3b82f6'

const FACTS = [
  ['Signatures', 'ML-DSA-65, FIPS 204'],
  ['Slots', '250 ms'],
  ['Exchange', 'Books, pools, perps'],
]

/**
 * The link preview for every page (/og.png, set in app/layout.tsx): the home page's headline and
 * three facts. A route rather than opengraph-image.tsx so the static export names it with .png.
 */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: BG, color: FG, padding: '64px 72px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26 }}>
          <div style={{ display: 'flex', fontWeight: 600, letterSpacing: -0.5 }}>QRDX</div>
          <div style={{ display: 'flex', alignItems: 'center', color: MUTED, fontSize: 20, letterSpacing: 2 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: BLUE, marginRight: 12 }} />
            TESTNET LIVE
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
          <div style={{ display: 'flex', fontSize: 84, lineHeight: 1.02, letterSpacing: -3.5, maxWidth: 940 }}>Every block is signed post-quantum.</div>
          <div style={{ display: 'flex', marginTop: 56, borderTop: `1px solid ${RULE}` }}>
            {FACTS.map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: 22, paddingLeft: i ? 28 : 0, borderLeft: i ? `1px solid ${RULE}` : 'none' }}>
                <div style={{ display: 'flex', fontSize: 16, letterSpacing: 2.5, color: MUTED }}>{k.toUpperCase()}</div>
                <div style={{ display: 'flex', fontSize: 28, marginTop: 8 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  )
}
