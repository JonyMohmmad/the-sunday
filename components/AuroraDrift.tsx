'use client';

import { useEffect, useRef } from 'react';

/**
 * AuroraDrift — calm, luminous aurora background for premium hero sections.
 *
 * Several large soft radial-gradient blobs drift on slow sine/cosine paths and
 * gently pulse, drawn with additive ("lighter") compositing so overlaps bloom.
 * Motion is ambient, continuous, and very slow. The component paints its own
 * dark base, fills its parent, and ignores pointer events.
 *
 * @example
 * <section className="relative overflow-hidden">
 *   <AuroraDrift />
 *   <div className="relative z-10">...hero content...</div>
 * </section>
 */
export interface AuroraBlob {
  /** horizontal anchor, 0..1 fraction of canvas width */
  x: number;
  /** vertical anchor, 0..1 fraction of canvas height */
  y: number;
  /** "r,g,b" string so alpha can be applied in the gradient */
  color: string;
}

export interface AuroraDriftProps {
  /** dark stage painted behind the light */
  baseColor?: string;
  /** luminous blobs; x/y are 0..1 fractions, color is "r,g,b" */
  blobs?: AuroraBlob[];
  /** peak alpha at each blob center */
  intensity?: number;
  /** multiplier on drift/pulse speed */
  speed?: number;
  /** optional extra ctx.filter blur in px (0 = none) */
  blur?: number;
  className?: string;
}

const DEFAULT_BLOBS: AuroraBlob[] = [
  { x: 0.3, y: 0.34, color: '45,212,191' }, // teal
  { x: 0.7, y: 0.4, color: '139,123,240' }, // violet
  { x: 0.5, y: 0.72, color: '246,179,82' }, // amber
  { x: 0.22, y: 0.74, color: '56,138,221' }, // blue
];

export default function AuroraDrift({
  baseColor = '#0a0a0c',
  blobs = DEFAULT_BLOBS,
  intensity = 0.34,
  speed = 1,
  blur = 0,
  className,
}: AuroraDriftProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext('2d');
    if (!context) return;

    // Non-null aliases so the nested closures below see non-nullable types.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── mutable scene state ──────────────────────────────────────────────
    let width = 0;
    let height = 0;

    let rafId: number | null = null;
    let running = false;
    let visible = true;
    let startTime = 0;

    // ── render one frame at time t (ms) ──────────────────────────────────
    function draw(t: number): void {
      // Dark base.
      ctx.globalCompositeOperation = 'source-over';
      ctx.filter = 'none';
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, width, height);

      // Additive light.
      ctx.globalCompositeOperation = 'lighter';
      if (blur > 0) ctx.filter = `blur(${blur}px)`;

      const minDim = Math.min(width, height);

      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];
        const cx = (blob.x + 0.12 * Math.sin(t * 0.00021 * speed + i)) * width;
        const cy = (blob.y + 0.1 * Math.cos(t * 0.00026 * speed + i * 1.7)) * height;
        const r = minDim * (0.55 + 0.08 * Math.sin(t * 0.0003 * speed + i));

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, `rgba(${blob.color},${intensity})`);
        gradient.addColorStop(1, `rgba(${blob.color},0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset for the next frame / any outside drawing.
      ctx.globalCompositeOperation = 'source-over';
      ctx.filter = 'none';
    }

    // ── rAF loop ─────────────────────────────────────────────────────────
    function loop(now: number): void {
      if (startTime === 0) startTime = now;
      draw(now - startTime);
      rafId = requestAnimationFrame(loop);
    }

    function startLoop(): void {
      if (running || reduced || !visible) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    }

    function stopLoop(): void {
      running = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    // ── sizing ───────────────────────────────────────────────────────────
    function resize(): void {
      const parent = canvas.parentElement;
      const rect = (parent ?? canvas).getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));

      // Cap the backing store at 2x to keep large/hi-dpi heroes cheap.
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep the picture correct while paused or in reduced-motion mode.
      draw(reduced || !running ? 0 : performance.now() - startTime);
    }

    // ── observers ────────────────────────────────────────────────────────
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas.parentElement ?? canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        visible = entry?.isIntersecting ?? true;
        if (visible) startLoop();
        else stopLoop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    // ── boot ─────────────────────────────────────────────────────────────
    resize();

    if (reduced) {
      draw(0); // single static frame
    } else {
      startLoop();
    }

    // ── cleanup ──────────────────────────────────────────────────────────
    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [baseColor, blobs, intensity, speed, blur]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full${className ? ` ${className}` : ''}`}
    />
  );
}
