import { ImageResponse } from 'next/og';

export const alt = 'Lumora Studio — Web Design & Development for Growing Businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#080B14',
          backgroundImage:
            'radial-gradient(ellipse 80% 80% at 70% 20%, rgba(59,130,246,0.25), transparent 60%)',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Logo lockup */}
        <div style={{ position: 'absolute', top: 56, left: 72, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            L
          </div>
          <span style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>Lumora Studio</span>
        </div>

        <div
          style={{
            fontSize: 14,
            color: '#93c5fd',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Web Design & Development Studio
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 70,
            fontWeight: 800,
            color: '#FAFAFA',
            lineHeight: 1.0,
            marginBottom: 28,
          }}
        >
          <span>Websites that win you</span>
          <span>more customers.</span>
        </div>

        <div style={{ display: 'flex', gap: 40 }}>
          {[
            { value: '150+', label: 'Projects shipped' },
            { value: '40+', label: 'Countries served' },
            { value: '4.9/5', label: 'Client rating' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 30, fontWeight: 700, color: '#22c55e', lineHeight: 1 }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 14, color: '#A1A1AA', marginTop: 4 }}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: 48, right: 72, fontSize: 15, color: '#A1A1AA' }}>
          lumorastudio.com
        </div>
      </div>
    ),
    { ...size }
  );
}
