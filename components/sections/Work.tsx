'use client';

import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import StaggerGrid from '@/components/ui/StaggerGrid';
import TiltCard from '@/components/ui/TiltCard';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';

interface CaseStudyCardProps {
  brand:           string;
  category:        string;
  challenge:       string;
  result_1_label:  string;
  result_1_before: string;
  result_1_after:  string;
  result_2_label:  string;
  result_2_before: string;
  result_2_after:  string;
  result_3_label:  string;
  result_3_before: string;
  result_3_after:  string;
  tags:            string[];
  imageSlot:       ReactNode;
  accentColor?:    string;
}

function CaseStudyCard({
  brand, category, challenge,
  result_1_label, result_1_before, result_1_after,
  result_2_label, result_2_before, result_2_after,
  result_3_label, result_3_before, result_3_after,
  tags, imageSlot, accentColor = '#CCFF00',
}: CaseStudyCardProps) {
  const metrics = [
    { label: result_1_label, before: result_1_before, after: result_1_after },
    { label: result_2_label, before: result_2_before, after: result_2_after },
    { label: result_3_label, before: result_3_before, after: result_3_after },
  ];

  return (
    <div
      className="flex flex-col lg:flex-row overflow-hidden"
      style={{ background: '#F7F7F8', border: '1px solid #E4E4E7', borderRadius: 12 }}
    >
      <div className="w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden">
        {imageSlot}
      </div>
      <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between gap-5">
        <div>
          <h3 className="font-display text-2xl font-bold text-[#3F3F46] tracking-tight">{brand}</h3>
          <p className="text-sm text-[#71717A] mt-1">{category}</p>
          <p className="text-sm text-[#71717A] mt-3 leading-relaxed">{challenge}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {metrics.map(({ label, before, after }) => (
            <div key={label}>
              <p className="text-[11px] uppercase tracking-widest text-[#71717A] mb-1">{label}</p>
              <p className="text-xs text-[#71717A] mb-0.5">{before}</p>
              <p className="text-xl font-bold leading-tight" style={{ color: accentColor }}>{after}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-[11px] text-[#71717A] px-2.5 py-1 rounded-full" style={{ background: '#E4E4E7' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// TODO: replace with real client data
const caseStudies = [
  {
    brand: 'Crestfield Store',
    category: 'Fashion · Shopify Plus',
    challenge: 'Conversion was bleeding on mobile — the checkout flow had 7 steps and load times exceeded 5 seconds on 4G.',
    result_1_label: 'Conversion rate', result_1_before: '1.2%',  result_1_after: '3.8%',
    result_2_label: 'Revenue / month', result_2_before: '$41K',  result_2_after: '$118K',
    result_3_label: 'Cart abandonment',result_3_before: '79%',   result_3_after: '51%',
    tags: ['CRO Redesign', 'Mobile-first', 'Checkout Opt.'],
    beforeBg: '#F2F2F4', afterBg: '#F0FFCC',
  },
  {
    brand: 'Maple & Pine',
    category: 'Lifestyle · Shopify',
    challenge: 'High organic social traffic was bouncing before reaching the cart because product pages felt generic and slow.',
    result_1_label: 'Conversion rate', result_1_before: '0.9%', result_1_after: '2.7%',
    result_2_label: 'AOV',             result_2_before: '$38',  result_2_after: '$67',
    result_3_label: 'Bounce rate',     result_3_before: '68%',  result_3_after: '39%',
    tags: ['Landing Page', 'Product Page', 'A/B Testing'],
    beforeBg: '#F5F0E8', afterBg: '#F5FFDF',
  },
  {
    brand: 'Void Supply Co',
    category: 'Accessories · Shopify Plus',
    challenge: 'Mobile drove 70% of traffic but only 31% of revenue — a UX problem, not a demand problem.',
    result_1_label: 'Conversion rate',   result_1_before: '1.8%', result_1_after: '4.1%',
    result_2_label: 'Page speed',        result_2_before: '54',   result_2_after: '94',
    result_3_label: 'Mobile rev. share', result_3_before: '31%',  result_3_after: '58%',
    tags: ['Speed Optimisation', 'Mobile UX', 'Redesign'],
    beforeBg: '#F1F1F6', afterBg: '#EDF5ED',
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="py-24 lg:py-32"
      style={{ background: '#FFFFFF' }}
      aria-labelledby="work-heading"
    >
      <Container>
        <RevealOnScroll className="mb-12">
          <h2
            id="work-heading"
            className="font-display text-4xl lg:text-5xl font-bold text-[#3F3F46] tracking-tight leading-none"
          >
            Proof of work
          </h2>
          <p className="text-[#71717A] mt-3 text-base">Real stores. Real numbers. Before and after.</p>
        </RevealOnScroll>

        <StaggerGrid className="flex flex-col gap-6" stagger={0.12}>
          {caseStudies.map((study) => (
            <TiltCard key={study.brand} maxTilt={3} scale={1.01}>
              <CaseStudyCard
                {...study}
                imageSlot={
                  <BeforeAfterSlider
                    beforeBg={study.beforeBg}
                    afterBg={study.afterBg}
                    className="w-full h-full min-h-[180px]"
                  />
                }
              />
            </TiltCard>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
