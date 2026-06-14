'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cursor visual states. `view` / `add` swap the ring for a labelled disc
 * ("VIEW" / "ADD") the way luxury fashion storefronts (Represent, Fear of God)
 * treat product imagery and add-to-cart affordances.
 */
export type CursorVariant = 'default' | 'hover' | 'view' | 'add';

export interface CustomCursorProps {
  /** Base diameter of the trailing ring, in px. Default 40. */
  ringSize?: number;
  /** Diameter of the center dot, in px. Default 7. */
  dotSize?: number;
  /** Ring follow easing (0–1). Lower = more lag/delay. Default 0.15. */
  ringEase?: number;
  /** Dot follow easing (0–1). Higher = tighter to the pointer. Default 0.35. */
  dotEase?: number;
  /** How strongly the cursor is pulled toward hovered targets (0–1). Default 0.2. */
  magnetStrength?: number;
  /** Min viewport width (px) at/above which the cursor is active. Default 768. */
  minWidth?: number;
  /** Stroke/dot/label color. Default pure white (pairs with `mix-blend-mode`). */
  color?: string;
  /** Ring fill. Default white @ 20% opacity, per luxury-brand spec. */
  ringFill?: string;
}

interface Point {
  x: number;
  y: number;
}

const VARIANT_SCALE: Record<CursorVariant, number> = {
  default: 1,
  hover: 1.7,
  view: 2.2,
  add: 2.2,
};

const VARIANT_LABEL: Record<CursorVariant, string> = {
  default: '',
  hover: '',
  view: 'VIEW',
  add: 'ADD',
};

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Maps a hovered element to a cursor variant + the element to magnetize toward. */
function resolveVariant(el: Element | null): { variant: CursorVariant; anchor: Element | null } {
  if (!el) return { variant: 'default', anchor: null };

  const viewEl = el.closest('[data-cursor="view"], .product-image, .cursor-view');
  if (viewEl) return { variant: 'view', anchor: viewEl };

  const addEl = el.closest('[data-cursor="add"], .add-to-cart, .cursor-add');
  if (addEl) return { variant: 'add', anchor: addEl };

  const hoverEl = el.closest(
    'a, button, [role="button"], input[type="submit"], input[type="button"], label[for], select, summary, .cursor-cta, [data-cursor="hover"]',
  );
  if (hoverEl) return { variant: 'hover', anchor: hoverEl };

  return { variant: 'default', anchor: null };
}

/**
 * Premium custom cursor: a tight center dot plus a spring-lagged trailing ring,
 * inspired by Framer's CursorDotTrail and high-end agency sites.
 *
 * Performance: position and scale are driven entirely through refs + a single
 * `requestAnimationFrame` loop writing `transform` (compositor-only, no layout,
 * no React re-renders per frame), so it has no measurable Core Web Vitals cost.
 *
 * Accessibility / capability: auto-disables on touch/coarse pointers, on
 * viewports below `minWidth`, and when `prefers-reduced-motion: reduce` is set.
 */
export default function CustomCursor({
  ringSize = 40,
  dotSize = 7,
  ringEase = 0.15,
  dotEase = 0.35,
  magnetStrength = 0.2,
  minWidth = 768,
  color = '#ffffff',
  ringFill = 'rgba(255, 255, 255, 0.2)',
}: CustomCursorProps = {}) {
  const [enabled, setEnabled] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  // Decide whether the cursor should run, and keep it in sync as the device /
  // viewport / motion preference changes.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const compute = () => setEnabled(fine.matches && wide.matches && !reduce.matches);
    compute();

    fine.addEventListener('change', compute);
    wide.addEventListener('change', compute);
    reduce.addEventListener('change', compute);
    return () => {
      fine.removeEventListener('change', compute);
      wide.removeEventListener('change', compute);
      reduce.removeEventListener('change', compute);
    };
  }, [minWidth]);

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!root || !ring || !dot || !label) return;

    // Hide the native cursor everywhere (incl. links/buttons that force pointer).
    document.documentElement.classList.add('cursor-hidden');

    const pointer: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos: Point = { ...pointer };
    const dotPos: Point = { ...pointer };
    let scale = 1;
    let started = false;
    let pressed = false;

    const state: { variant: CursorVariant; anchor: Element | null } = {
      variant: 'default',
      anchor: null,
    };

    const applyVariant = (variant: CursorVariant, anchor: Element | null) => {
      if (variant === state.variant && anchor === state.anchor) return;
      state.variant = variant;
      state.anchor = anchor;

      const labelled = variant === 'view' || variant === 'add';
      label.textContent = VARIANT_LABEL[variant];
      label.style.opacity = labelled ? '1' : '0';
      dot.style.opacity = labelled ? '0' : '1';
      // Slightly reduce ring opacity on interactive hover for a softer feel.
      ring.style.opacity = variant === 'hover' ? '0.6' : '1';
      // Drop the fill behind the label so the text stays legible.
      ring.style.background = labelled ? 'transparent' : ringFill;
    };

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!started) {
        started = true;
        ringPos.x = dotPos.x = pointer.x;
        ringPos.y = dotPos.y = pointer.y;
        root.style.opacity = '1';
      }
    };

    const onOver = (e: MouseEvent) => {
      const { variant, anchor } = resolveVariant(e.target as Element);
      applyVariant(variant, anchor);
    };

    const onLeave = () => {
      root.style.opacity = '0';
    };
    const onEnter = () => {
      if (started) root.style.opacity = '1';
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };

    let raf = 0;
    const tick = () => {
      let rtx = pointer.x;
      let rty = pointer.y;
      let dtx = pointer.x;
      let dty = pointer.y;

      // Magnetic pull toward the hovered target's center.
      if (state.anchor && state.anchor.isConnected) {
        const r = state.anchor.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        rtx = lerp(pointer.x, cx, magnetStrength);
        rty = lerp(pointer.y, cy, magnetStrength);
        dtx = lerp(pointer.x, cx, magnetStrength * 0.45);
        dty = lerp(pointer.y, cy, magnetStrength * 0.45);
      }

      ringPos.x = lerp(ringPos.x, rtx, ringEase);
      ringPos.y = lerp(ringPos.y, rty, ringEase);
      dotPos.x = lerp(dotPos.x, dtx, dotEase);
      dotPos.y = lerp(dotPos.y, dty, dotEase);

      const targetScale = VARIANT_SCALE[state.variant] * (pressed ? 0.82 : 1);
      scale = lerp(scale, targetScale, 0.18);

      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      label.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('cursor-hidden');
    };
  }, [enabled, ringEase, dotEase, magnetStrength, ringFill]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647,
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          background: ringFill,
          willChange: 'transform',
          transition: 'opacity 0.25s ease, background 0.25s ease',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: color,
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
        }}
      />
      <span
        ref={labelRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          color,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.12em',
          lineHeight: 1,
          opacity: 0,
          userSelect: 'none',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
        }}
      />
    </div>
  );
}
