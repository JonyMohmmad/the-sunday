'use client';

import { Container } from '@/components/ui/Container';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import StaggerGrid from '@/components/ui/StaggerGrid';
import { COPY } from '@/lib/copy';

export default function Team() {
  const { members } = COPY.team;

  return (
    <section
      id="team"
      className="py-24 lg:py-32"
      style={{ background: '#FFFFFF', borderTop: '1px solid #E4E4E7' }}
      aria-labelledby="team-heading"
    >
      <Container>

        <div className="max-w-3xl mb-16">
          <RevealOnScroll>
            <p className="text-[11px] uppercase tracking-widest text-[#71717A] mb-4">
              {COPY.team.eyebrow}
            </p>
            <h2
              id="team-heading"
              className="font-display font-bold text-[#3F3F46] tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700 }}
            >
              {COPY.team.headline.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h2>
            <p className="text-[#71717A] text-base leading-relaxed">{COPY.team.subhead}</p>
          </RevealOnScroll>
        </div>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {members.map((member) => (
            <article
              key={member.name}
              className="p-6"
              style={{ background: '#F7F7F8', border: '1px solid #E4E4E7', borderRadius: 12 }}
            >
              {/* TODO: replace initials with next/image photo */}
              <div
                className="flex items-center justify-center mb-4 font-display font-bold text-lg"
                style={{ width: 48, height: 48, borderRadius: '50%', background: '#F7F7F8', border: '1px solid #E4E4E7', color: '#CCFF00' }}
                aria-label={`${member.name}'s avatar`}
              >
                {member.initials}
              </div>
              <h3 className="font-display font-bold text-[#3F3F46] text-base tracking-tight mb-0.5">
                {member.name}
              </h3>
              <p className="text-[12px] font-semibold text-[#71717A] mb-3">{member.role}</p>
              <p className="text-[13px] text-[#71717A] leading-relaxed">{member.bio}</p>
            </article>
          ))}
        </StaggerGrid>

        {/* "Why trust students?" objection handler */}
        {/* TODO: remove or rewrite once you have 10+ completed projects */}
        <RevealOnScroll delay={0.2}>
          <div
            className="p-4 pl-6 rounded-r-lg"
            style={{ background: '#F7F7F8', borderLeft: '2px solid #CCFF00', borderRadius: '0 8px 8px 0' }}
          >
            <p className="text-[14px] text-[#71717A] leading-relaxed">
              We don&apos;t have 10 years of agency bloat — we have 2 years of focused research
              into exactly this problem. Every project gets three engineers, not one junior
              handed off after the sales call.
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  );
}
