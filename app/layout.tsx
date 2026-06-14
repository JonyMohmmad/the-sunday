import type { Metadata } from 'next';
import { Poppins, Inter, Outfit } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { SEO } from '@/lib/seo-config';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

// Used by the (scoped) Mentality homepage design.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});
import JsonLd from '@/components/seo/JsonLd';
import Analytics from '@/components/seo/Analytics';
import CustomCursor from '@/components/ui/CustomCursor';
import CustomScrollbarPro from '@/components/ui/CustomScrollbarPro';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${SEO.siteName}`,
  },
  description: SEO.defaultDescription,
  keywords: [...SEO.defaultKeywords],
  authors: [{ name: SEO.siteName, url: SEO.siteUrl }],
  creator: SEO.siteName,
  applicationName: SEO.siteName,
  alternates: {
    canonical: SEO.siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: SEO.locale,
    url: SEO.siteUrl,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    siteName: SEO.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    creator: SEO.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${outfit.variable} ${GeistMono.variable}`}
    >
      <body>
        <JsonLd />
        {children}
        <Analytics />
        <CustomCursor />
        <CustomScrollbarPro />
      </body>
    </html>
  );
}
