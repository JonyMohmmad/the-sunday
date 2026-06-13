import { ImageResponse } from 'next/og';

export const runtime     = 'edge';
export const alt         = 'The Sunday â€” Shopify CRO for Streetwear & Anime Brands';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#0A0A0B',
          padding:        '64px 72px',
          fontFamily:     'sans-serif',
          position:       'relative',
        }}
      >
        {/* Dot grid â€” top-right */}
        <div
          style={{
            position: 'absolute',
            top:      48,
            right:    72,
            display:  'flex',
            flexWrap: 'wrap',
            gap:      10,
            width:    86,
          }}
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              style={{
                width:        4,
                height:       4,
                borderRadius: '50%',
                background:   '#232327',
              }}
            />
          ))}
        </div>

        {/* Eyebrow */}
        <div
          style={{
            fontSize:      14,
            color:         '#A1A1AA',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom:  20,
          }}
        >
          Shopify CRO Agency Â· US Â· UK Â· AU Â· CA
        </div>

        {/* Headline */}
        {/* TODO: replace [COMPANY_NAME] before launch */}
        <div
          style={{
            fontSize:     72,
            fontWeight:   800,
            color:        '#FAFAFA',
            lineHeight:   0.95,
            marginBottom: 32,
          }}
        >
          [COMPANY_NAME]
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize:     22,
            color:        '#A1A1AA',
            lineHeight:   1.4,
            maxWidth:     640,
            marginBottom: 48,
          }}
        >
          We rebuild Shopify stores for DTC streetwear &amp; anime brands.
          Avg 2.4Ã— CVR lift.
        </div>

        {/* Stat row */}
        <div style={{ display: 'flex', gap: 40 }}>
          {[
            { value: '47+',   label: 'Stores rebuilt'    },
            { value: '2.4Ã—',  label: 'Avg CVR lift'      },
            { value: '$2.3M+', label: 'Revenue generated' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#CCFF00', lineHeight: 1 }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 13, color: '#A1A1AA', marginTop: 4 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Domain â€” bottom-right */}
        {/* TODO: replace with real domain */}
        <div
          style={{
            position: 'absolute',
            bottom:   48,
            right:    72,
            fontSize: 14,
            color:    '#A1A1AA',
          }}
        >
          [DOMAIN].com
        </div>
      </div>
    ),
    { ...size }
  );
}
