import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'The Sunday — SaaS & Web App Development Studio',
  description:
    'We build SaaS products and web applications for startups and growing businesses. Premium engineering and product design, shipped in weeks.',
  keywords: [
    'SaaS development',
    'web app development',
    'MVP development',
    'product design',
    'software studio',
  ],
  openGraph: {
    title: 'The Sunday — SaaS & Web App Studio',
    description:
      'We build software products that scale. Premium engineering and design in one studio — from MVP to full SaaS.',
    type: 'website',
    locale: 'en_US',
    // TODO: Replace with real domain and OG image
    url: 'https://[DOMAIN]',
    images: [
      {
        url: 'https://[DOMAIN]/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Sunday — Shopify Conversion Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Sunday — Shopify Conversion Redesigns',
    description: 'Fashion brand Shopify redesigns that actually convert.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'The Sunday',
  description:
    'Boutique Shopify redesign agency for DTC streetwear, anime, and lifestyle fashion brands.',
  url: 'https://[DOMAIN]',
  // TODO: Replace with real contact details
  email: 'hello@[DOMAIN]',
  areaServed: ['US', 'GB', 'CA', 'AU'],
  serviceType: 'Shopify Store Redesign',
  priceRange: '$$',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
