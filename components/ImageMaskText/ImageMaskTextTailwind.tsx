'use client';

import { type CSSProperties, useEffect, useState } from 'react';
import type { AnimationType, ImageFit, TextAlign } from './ImageMaskText';

/**
 * Tailwind-only variant of ImageMaskText — no CSS module.
 * Uses utility classes for the static styling and a single injected <style>
 * block for the optional Ken-Burns / pan keyframes (so it needs no tailwind
 * config changes and stays drop-in).
 */
export interface ImageMaskTextTailwindProps {
  text: string;
  image?: string;
  fontSize?: string;
  fontWeight?: number;
  fontFamily?: string;
  lineHeight?: number;
  letterSpacing?: string;
  textAlign?: TextAlign;
  imageFit?: ImageFit;
  imageScale?: number;
  textColor?: string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  animated?: boolean;
  animationType?: AnimationType;
  'aria-label'?: string;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const KEYFRAMES = `
@keyframes imt-tw-zoom{0%{background-size:110%}50%{background-size:145%}100%{background-size:110%}}
@keyframes imt-tw-pan{from{background-position:0% center}to{background-position:100% center}}
@media (prefers-reduced-motion: reduce){.imt-tw-anim{animation:none!important}}
`;

export default function ImageMaskTextTailwind({
  text,
  image = '',
  fontSize = 'clamp(2.5rem, 8vw, 7rem)',
  fontWeight = 800,
  fontFamily = 'inherit',
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
  'aria-label': ariaLabel,
}: ImageMaskTextTailwindProps) {
  const hasImage = Boolean(image);
  const [imageOk, setImageOk] = useState(false);

  useEffect(() => {
    if (!hasImage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImageOk(false);
      return;
    }
    let active = true;
    const img = new window.Image();
    img.onload = () => active && setImageOk(true);
    img.onerror = () => active && setImageOk(false);
    img.src = image;
    return () => {
      active = false;
    };
  }, [hasImage, image]);

  const typography: CSSProperties = {
    fontSize,
    fontWeight,
    fontFamily,
    lineHeight,
    letterSpacing,
    textAlign,
  };
  const stroke: CSSProperties =
    strokeColor && strokeWidth > 0 ? { WebkitTextStroke: `${strokeWidth}px ${strokeColor}` } : {};

  if (hasImage && imageOk) {
    const backgroundSize =
      imageFit === 'cover' ? 'cover' : imageFit === 'contain' ? 'contain' : `${clamp(imageScale, 10, 200)}%`;

    const animation =
      animated && animationType === 'zoom'
        ? 'imt-tw-zoom 24s ease-in-out infinite'
        : animated && animationType === 'pan'
          ? 'imt-tw-pan 22s linear infinite alternate'
          : undefined;

    return (
      <div className={`block w-full max-w-full ${className ?? ''}`.trim()}>
        <style>{KEYFRAMES}</style>
        <span
          className={`m-0 block w-full break-words bg-center bg-no-repeat bg-clip-text text-transparent ${
            animated ? 'imt-tw-anim' : ''
          }`}
          style={{
            ...typography,
            ...stroke,
            WebkitTextFillColor: 'transparent',
            backgroundImage: `url("${image}")`,
            backgroundSize,
            backgroundAttachment: animated && animationType === 'parallax' ? 'fixed' : undefined,
            animation,
          }}
          aria-label={ariaLabel}
        >
          {text}
        </span>
      </div>
    );
  }

  return (
    <div className={`block w-full max-w-full ${className ?? ''}`.trim()}>
      <span className="m-0 block w-full break-words" style={{ ...typography, ...stroke, color: textColor }} aria-label={ariaLabel}>
        {text}
      </span>
    </div>
  );
}
