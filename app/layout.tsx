import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://forge.dev'),
  title: {
    default: 'Forge — Deploy APIs instantly. Monitor everything.',
    template: '%s | Forge',
  },
  description:
    'Forge deploys your APIs globally in under 3 seconds, monitors every request in real-time, and scales to zero automatically. Trusted by 4,200+ engineering teams.',
  keywords: [
    'API deployment',
    'API monitoring',
    'edge computing',
    'serverless APIs',
    'distributed tracing',
    'real-time observability',
    'developer infrastructure',
  ],
  authors: [{ name: 'Forge, Inc.', url: 'https://forge.dev' }],
  creator: 'Forge, Inc.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://forge.dev',
    title: 'Forge — Deploy APIs instantly. Monitor everything.',
    description:
      'Deploy your APIs globally in under 3 seconds. Monitor every request in real-time. Scales to zero automatically.',
    siteName: 'Forge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Forge — API deployment and monitoring platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forge — Deploy APIs instantly. Monitor everything.',
    description:
      'Deploy your APIs globally in under 3 seconds. Monitor every request in real-time.',
    creator: '@forgedev',
    images: ['/og-image.png'],
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
