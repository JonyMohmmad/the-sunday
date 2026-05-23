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
  title: '[COMPANY_NAME] — Shopify Conversion Redesigns for Fashion Brands',
  description:
    'We redesign Shopify stores for DTC streetwear, anime, and lifestyle fashion brands. Faster load times, higher conversion, launched in 3 weeks.',
  keywords: [
    'Shopify redesign',
    'DTC fashion',
    'streetwear ecommerce',
    'conversion rate optimization',
    'Shopify agency',
  ],
  openGraph: {
    title: '[COMPANY_NAME] — Shopify Conversion Redesigns',
    description:
      'We turn your Instagram audience into Shopify buyers. Conversion-focused redesigns for fashion brands, shipped in 3 weeks.',
    type: 'website',
    locale: 'en_US',
    // TODO: Replace with real domain and OG image
    url: 'https://[DOMAIN]',
    images: [
      {
        url: 'https://[DOMAIN]/og-image.png',
        width: 1200,
        height: 630,
        alt: '[COMPANY_NAME] — Shopify Conversion Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[COMPANY_NAME] — Shopify Conversion Redesigns',
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
  name: '[COMPANY_NAME]',
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
