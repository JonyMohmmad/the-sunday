'use client';

import { type CSSProperties, useEffect, useId, useRef, useState } from 'react';
import styles from './ImageMaskText.module.css';

/* ────────────────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────────────────── */

export type ImageFit = 'cover' | 'contain' | 'percent';
export type TextAlign = 'left' | 'center' | 'right';
export type AnimationType = 'zoom' | 'pan' | 'parallax';

export interface ImageMaskTextProps {
  /** The text rendered as the mask. */
  text: string;
  /** Background image clipped to the text. PNG / JPG / WebP / remote URL. */
  image?: string;

  /* Typography */
  fontSize?: string;
  fontWeight?: number;
  fontFamily?: string;
  fontStyle?: CSSProperties['fontStyle'];
  lineHeight?: number;
  letterSpacing?: string;
  textAlign?: TextAlign;

  /* Image fitting */
  imageFit?: ImageFit;
  /** Used when imageFit === "percent". Clamped to 10–200. */
  imageScale?: number;

  /** Fallback colour used when no usable image/video is available. */
  textColor?: string;
  className?: string;

  /* ── Bonus ── */
  strokeColor?: string;
  strokeWidth?: number;
  animated?: boolean;
  animationType?: AnimationType;
  /** A video clipped to the text. Takes precedence over `image`. */
  video?: string;

  /** Accessible name. Defaults to `text`. */
  'aria-label'?: string;
}

/* ────────────────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────────────────── */

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

function backgroundSizeFor(fit: ImageFit, scale: number): string {
  if (fit === 'cover') return 'cover';
  if (fit === 'contain') return 'contain';
  return `${clamp(scale, 10, 200)}%`;
}

/* ────────────────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────────────────── */

export default function ImageMaskText({
  text,
  image = '',
  fontSize = 'clamp(2.5rem, 8vw, 7rem)',
  fontWeight = 800,
  fontFamily = 'inherit',
  fontStyle = 'normal',
  lineHeight = 1.05,
  letterSpacing = '-0.02em',
  textAlign = 'center',
  imageFit = 'cover',
  imageScale = 100,
  textColor = 'currentColor',
  className,
  strokeColor,
  strokeWidth = 0,
  animated = false,
  animationType = 'zoom',
  video,
  'aria-label': ariaLabel,
}: ImageMaskTextProps) {
  const maskId = useId().replace(/:/g, '');

  const hasVideo = Boolean(video);
  const hasImage = Boolean(image) && !hasVideo;

  // Detect whether the image actually loads; otherwise we fall back to text.
  const [imageOk, setImageOk] = useState(false);
  useEffect(() => {
    if (!hasImage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImageOk(false);
      return;
    }
    let active = true;
    const img = new window.Image();
    img.onload = () => {
      if (active) setImageOk(true);
    };
    img.onerror = () => {
      if (active) setImageOk(false);
    };
    img.src = image;
    return () => {
      active = false;
    };
  }, [hasImage, image]);

  // If a supplied video fails, drop back to text.
  const [videoFailed, setVideoFailed] = useState(false);

  // Measure the box so the SVG video mask can match it.
  const sizerRef = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!hasVideo) return;
    const el = sizerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setBox({ w: Math.round(r.width), h: Math.round(r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [hasVideo]);

  // Shared typography for every render path so the box never shifts.
  const typography: CSSProperties = {
    fontSize,
    fontWeight,
    fontFamily,
    fontStyle,
    lineHeight,
    letterSpacing,
    textAlign,
  };

  const stroke: CSSProperties =
    strokeColor && strokeWidth > 0
      ? { WebkitTextStroke: `${strokeWidth}px ${strokeColor}` }
      : {};

  /* ── Video path ───────────────────────────────────────────────────────── */
  if (hasVideo && !videoFailed) {
    return (
      <div className={`${styles.root} ${className ?? ''}`.trim()} aria-label={ariaLabel ?? text} role="img">
        <div className={styles.videoWrap}>
          {/* establishes layout size + carries the real text for SEO/selection */}
          <span ref={sizerRef} className={styles.sizer} style={typography} aria-hidden="true">
            {text}
          </span>

          {box.w > 0 && box.h > 0 && (
            <svg
              className={styles.videoSvg}
              width={box.w}
              height={box.h}
              viewBox={`0 0 ${box.w} ${box.h}`}
              aria-hidden="true"
            >
              <defs>
                <mask id={`imt-${maskId}`}>
                  <rect width="100%" height="100%" fill="black" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    style={{ fontSize, fontWeight, fontFamily, fontStyle, letterSpacing }}
                  >
                    {text}
                  </text>
                </mask>
              </defs>
              <foreignObject x="0" y="0" width="100%" height="100%" mask={`url(#imt-${maskId})`}>
                <video
                  className={styles.videoEl}
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onError={() => setVideoFailed(true)}
                />
              </foreignObject>
            </svg>
          )}
        </div>
      </div>
    );
  }

  /* ── Image path ───────────────────────────────────────────────────────── */
  if (hasImage && imageOk) {
    const animClass =
      animated && animationType === 'pan'
        ? styles.animPan
        : animated && animationType === 'zoom'
          ? styles.animZoom
          : animated && animationType === 'parallax'
            ? styles.parallax
            : '';

    const clipStyle: CSSProperties = {
      ...typography,
      ...stroke,
      backgroundImage: `url("${image}")`,
      backgroundSize: backgroundSizeFor(imageFit, imageScale),
    };

    return (
      <div className={`${styles.root} ${className ?? ''}`.trim()}>
        <span className={`${styles.clip} ${animClass}`.trim()} style={clipStyle} aria-label={ariaLabel}>
          {text}
        </span>
      </div>
    );
  }

  /* ── Fallback: plain text, typography + stroke preserved ─────────────────── */
  return (
    <div className={`${styles.root} ${className ?? ''}`.trim()}>
      <span className={styles.fallback} style={{ ...typography, ...stroke, color: textColor }} aria-label={ariaLabel}>
        {text}
      </span>
    </div>
  );
}
