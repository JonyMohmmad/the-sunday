'use client';

import { useEffect, useRef } from 'react';

/**
 * MagneticGrid — a calm, cursor-reactive dot grid for premium section backgrounds.
 *
 * Dots are pushed away from the pointer (scaled by inverse distance, clamped) and
 * brighten near the cursor. With no pointer present the grid is perfectly still —
 * there is no ambient animation. The canvas is transparent and composites over
 * whatever it is placed in.
 *
 * @example
 * <section className="relative bg-[#0a0a0c]">
 *   <MagneticGrid />
 *   <div className="relative z-10">...content...</div>
 * </section>
 */
export interface MagneticGridProps {
  /** px spacing between dots */
  gap?: number;
  /** dot radius in px */
  dotRadius?: number;
  /**
   * Dot color. Include the literal token `VALUE` where the proximity-driven alpha
   * should be substituted, e.g. `"rgba(168,180,255,VALUE)"`. If no token is present
   * the color is used as-is and proximity fade is applied via globalAlpha.
   */
  dotColor?: string;
  /** max push distance in px */
  maxDisplacement?: number;
  /** higher = stronger / wider pull */
  influence?: number;
  /** opacity of dots far from the cursor */
  baseOpacity?: number;
  className?: string;
}

export default function MagneticGrid({
  gap = 30,
  dotRadius = 1.6,
  dotColor = 'rgba(168,180,255,VALUE)',
  maxDisplacement = 55,
  influence = 2200,
  baseOpacity = 0.1,
  className,
}: MagneticGridProps) {
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
    const usesToken = dotColor.includes('VALUE');

    // ── mutable scene state ──────────────────────────────────────────────
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let effectiveGap = gap;

    // Pointer is absent until the first move that lands inside the canvas.
    let mouseX = 0;
    let mouseY = 0;
    let pointerActive = false;

    let rafId: number | null = null;
    let running = false;
    let visible = true;

    const clamp = (v: number, lo: number, hi: number): number =>
      Math.min(hi, Math.max(lo, v));

    const colorFor = (alpha: number): string =>
      usesToken ? dotColor.replace('VALUE', alpha.toFixed(3)) : dotColor;

    // ── render one frame ─────────────────────────────────────────────────
    function draw(): void {
      ctx.clearRect(0, 0, width, height);

      for (let gx = 0; gx <= cols; gx++) {
        for (let gy = 0; gy <= rows; gy++) {
          const dotX = gx * effectiveGap;
          const dotY = gy * effectiveGap;

          let drawX = dotX;
          let drawY = dotY;
          let opacity = baseOpacity;

          if (pointerActive) {
            const dx = dotX - mouseX;
            const dy = dotY - mouseY;
            const distance = Math.hypot(dx, dy);
            const f = Math.min(maxDisplacement, influence / (distance + 40));
            const angle = Math.atan2(dy, dx);
            drawX = dotX + Math.cos(angle) * f;
            drawY = dotY + Math.sin(angle) * f;
            opacity = clamp(90 / (distance + 30), baseOpacity, 0.9);
          }

          if (usesToken) {
            ctx.fillStyle = colorFor(opacity);
            ctx.globalAlpha = 1;
          } else {
            ctx.fillStyle = dotColor;
            ctx.globalAlpha = opacity;
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    // ── rAF loop ─────────────────────────────────────────────────────────
    function loop(): void {
      draw();
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

      // Cap the backing store at 2x to keep large/hi-dpi sections cheap.
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      // Fewer dots on small screens.
      effectiveGap = width < 640 ? gap * 1.5 : gap;
      cols = Math.ceil(width / effectiveGap);
      rows = Math.ceil(height / effectiveGap);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep the picture correct even while the loop is paused or reduced.
      draw();
    }

    // ── pointer tracking ─────────────────────────────────────────────────
    // The canvas has `pointer-events: none`, so it can't receive events itself.
    // We listen on window and convert to canvas-local coords; when the pointer
    // leaves the canvas bounds we mark it absent so the grid goes static.
    function onPointerMove(e: PointerEvent): void {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        mouseX = x;
        mouseY = y;
        pointerActive = true;
      } else {
        pointerActive = false;
      }
    }

    function onPointerLeave(): void {
      pointerActive = false;
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

    if (!reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave);
      window.addEventListener('blur', onPointerLeave);
      startLoop();
    }

    // ── cleanup ──────────────────────────────────────────────────────────
    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
    };
  }, [gap, dotRadius, dotColor, maxDisplacement, influence, baseOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full${className ? ` ${className}` : ''}`}
    />
  );
}
