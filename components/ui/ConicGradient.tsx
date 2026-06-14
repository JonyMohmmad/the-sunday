'use client';

import type { CSSProperties } from 'react';

export interface ConicGradientProps {
  /** Ordered color stops. The first color is auto-appended to close the loop
   *  seamlessly, so the rotation never shows a hard seam. */
  colors?: string[];
  /** Seconds for one full 360° rotation. Lower = faster. */
  speed?: number;
  /** Glow intensity, 0–1. Drives the brightness of the soft bloom layer. */
  glow?: number;
  /** Blur radius (px) applied to the gradient for a soft, ambient feel. */
  blur?: number;
  /** Corner radius (px) of the clipped container. */
  radius?: number;
  /** Overall opacity of the effect, 0–1. */
  opacity?: number;
  /** Gradient disc size as a % of the container's largest side. >140 avoids
   *  corner gaps while it rotates. */
  size?: number;
  /** When false, the disc is static (no animation). */
  animate?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Premium animated conic-gradient backdrop.
 *
 * The rotating disc is a square sized larger than its container and spun with
 * `transform: rotate()` only — that keeps the work on the GPU compositor
 * (no layout/paint per frame), which is what holds a steady 60fps. A second,
 * blurred + brightened copy sits behind it to create the ambient glow/bloom.
 *
 * Drop it into any `position: relative; overflow: hidden` parent as a
 * decorative, non-interactive layer (`aria-hidden`, `pointer-events-none`).
 */
export default function ConicGradient({
  colors = ['#000000', '#3b82f6', '#60a5fa', '#ffffff', '#1e3a8a', '#000000'],
  speed = 8,
  glow = 0.6,
  blur = 40,
  radius = 16,
  opacity = 1,
  size = 160,
  animate = true,
  className = '',
  style,
}: ConicGradientProps) {
  // Close the loop so 360°→0° has no visible color seam.
  const stops = colors[0] === colors[colors.length - 1] ? colors : [...colors, colors[0]];
  const gradient = `conic-gradient(from 0deg, ${stops.join(', ')})`;

  const disc: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `${size}%`,
    aspectRatio: '1 / 1',
    transform: 'translate(-50%, -50%)',
    background: gradient,
    borderRadius: '50%',
    animation: animate ? `conic-rotate ${speed}s linear infinite` : undefined,
    willChange: 'transform',
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ borderRadius: radius, opacity, ...style }}
    >
      {/* Glow / bloom layer — same disc, blurred wide and brightened. */}
      <div
        className="conic-spin"
        style={{
          ...disc,
          filter: `blur(${blur * 1.8}px) brightness(${1 + glow})`,
          opacity: glow,
        }}
      />
      {/* Crisp(er) disc on top for definition. */}
      <div className="conic-spin" style={{ ...disc, filter: `blur(${blur}px)` }} />
    </div>
  );
}
