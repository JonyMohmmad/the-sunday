'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import type { CSSProperties } from 'react';

interface TextRevealProps {
  text:            string;
  as?:             'h1' | 'h2' | 'h3' | 'p';
  className?:      string;
  style?:          CSSProperties;
  id?:             string;
  delay?:          number;
  once?:           boolean;
  accentLastWord?: boolean;
}

export default function TextReveal({
  text,
  as: Tag = 'h2',
  className,
  style,
  id,
  delay = 0,
  once  = true,
  accentLastWord = false,
}: TextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag id={id} className={className} style={style}>{text}</Tag>;
  }

  const lines        = text.split('\n');
  const allWordLines = lines.map((line) => line.split(' ').filter(Boolean));

  let flatIndex = 0;

  return (
    <Tag id={id} className={className} style={style}>
      {allWordLines.map((words, lineIdx) => (
        <span key={lineIdx} style={{ display: 'block' }}>
          {words.map((word, wIdx) => {
            const idx = flatIndex++;
            const isAccented =
              accentLastWord &&
              lineIdx === allWordLines.length - 1 &&
              wIdx === words.length - 1;

            return (
              <span
                key={wIdx}
                style={{
                  overflow: 'hidden',
                  display: 'inline-block',
                  marginRight: wIdx < words.length - 1 ? '0.28em' : 0,
                }}
              >
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: delay + idx * 0.04,
                    ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
                  }}
                  viewport={{ once }}
                >
                  {isAccented ? (
                    <em style={{ fontStyle: 'italic', color: '#CCFF00' }}>{word}</em>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
