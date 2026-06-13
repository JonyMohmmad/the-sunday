'use client';

import Script from 'next/script';
import { ANALYTICS } from '@/lib/analytics-config';
import { GoogleAnalytics } from '@next/third-parties/google';

function MetaPixel() {
  if (!ANALYTICS.META_PIXEL_ID || ANALYTICS.META_PIXEL_ID === '0000000000000') {
    return null;
  }
  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${ANALYTICS.META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${ANALYTICS.META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

function Hotjar() {
  if (!ANALYTICS.HOTJAR_ID || ANALYTICS.HOTJAR_ID === '0000000') {
    return null;
  }
  return (
    <Script
      id="hotjar"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${ANALYTICS.HOTJAR_ID},hjsv:${ANALYTICS.HOTJAR_SV}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  );
}

export default function Analytics() {
  return (
    <>
      {ANALYTICS.GA4_ID !== 'G-PLACEHOLDER' && (
        <GoogleAnalytics gaId={ANALYTICS.GA4_ID} />
      )}
      <MetaPixel />
      <Hotjar />
    </>
  );
}
