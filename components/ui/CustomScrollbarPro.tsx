'use client';

import { useEffect, useRef, useState } from 'react';

export interface CustomScrollbarProProps {
  /** Visible thumb width in px. Default 6. */
  width?: number;
  /** Thumb color. Default the site brand color. */
  color?: string;
  /** Thumb border radius in px. Default 999 (pill). */
  radius?: number;
  /** Fade-in duration (ms) when scrolling starts. Default 150. */
  fadeInDuration?: number;
  /** Fade-out duration (ms) when idle. Default 300. */
  fadeOutDuration?: number;
  /** Idle delay (ms) before fading out. Default 1500. */
  hideDelay?: number;
  /** Thumb scale on hover. Default 1.15. */
  hoverScale?: number;
  /** Hover scale transition (ms). Default 200. */
  hoverTransition?: number;
  /** Per-frame interpolation factor (0–1). Lower = smoother/laggier. Default 0.16. */
  ease?: number;
  /** Minimum thumb height in px. Default 32. */
  minThumbHeight?: number;
  /** Stacking order. Default 9990. */
  zIndex?: number;
}

interface Metrics {
  scrollable: number;
  trackHeight: number;
  thumbHeight: number;
  maxTravel: number;
}

const clamp = (v: number, min: number, max: number): number =>
  v < min ? min : v > max ? max : v;

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/**
 * CustomScrollbarPro — a fixed, auto-hiding custom scrollbar.
 *
 * The thumb tracks page-scroll progress and is interpolated toward its target
 * every animation frame for buttery, slightly-eased motion. Position is written
 * straight to `transform` via refs inside a single `requestAnimationFrame` loop
 * (compositor-only, no React re-renders, no per-frame layout reads), so it holds
 * 60fps with no Core Web Vitals cost.
 *
 * It fades in immediately on scroll, stays visible while scrolling / hovering /
 * dragging, then fades out after an idle delay. Supports click-and-drag on the
 * thumb and click-to-jump on the (invisible) track, adapts to dynamic page
 * heights via a ResizeObserver, and disables itself on touch devices.
 */
export default function CustomScrollbarPro({
  width = 6,
  color = 'var(--primary)',
  radius = 999,
  fadeInDuration = 150,
  fadeOutDuration = 300,
  hideDelay = 1500,
  hoverScale = 1.15,
  hoverTransition = 200,
  ease = 0.16,
  minThumbHeight = 32,
  zIndex = 9990,
}: CustomScrollbarProProps = {}) {
  const [enabled, setEnabled] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);

  // Only run on devices with a fine pointer (i.e. not touch).
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener('change', update);
    return () => fine.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const track = trackRef.current;
    const thumb = thumbRef.current;
    const pill = pillRef.current;
    if (!track || !thumb || !pill) return;

    // Hide the native scrollbar while the custom one is active (desktop only).
    document.documentElement.classList.add('custom-scrollbar-active');

    const m: Metrics = { scrollable: 0, trackHeight: 0, thumbHeight: minThumbHeight, maxTravel: 0 };

    let targetY = 0; // where the thumb should be (px from track top)
    let currentY = 0; // interpolated position actually rendered
    let visible = false;
    let hovering = false;
    let dragging = false;
    let dragStartY = 0;
    let dragStartScroll = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;

    // ── Visibility ─────────────────────────────────────────────────────────
    const show = () => {
      if (m.scrollable <= 0) return;
      visible = true;
      thumb.style.transition = `opacity ${fadeInDuration}ms ease`;
      thumb.style.opacity = '1';
      track.style.pointerEvents = 'auto';
    };
    const hide = () => {
      visible = false;
      thumb.style.transition = `opacity ${fadeOutDuration}ms ease`;
      thumb.style.opacity = '0';
      track.style.pointerEvents = 'none';
    };
    const scheduleHide = () => {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (dragging || hovering) return;
        hide();
      }, hideDelay);
    };

    // ── Metrics (recomputed on scroll/resize/content change, never per-frame) ─
    const updateMetrics = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      m.scrollable = Math.max(0, docHeight - winHeight);
      m.trackHeight = winHeight;
      m.thumbHeight = Math.max(
        minThumbHeight,
        Math.round((winHeight / docHeight) * winHeight),
      );
      m.maxTravel = Math.max(0, m.trackHeight - m.thumbHeight);
      thumb.style.height = `${m.thumbHeight}px`;

      if (m.scrollable <= 0) {
        track.style.display = 'none';
      } else {
        track.style.display = 'block';
      }
      syncTargetToScroll();
    };

    const syncTargetToScroll = () => {
      const progress = m.scrollable > 0 ? window.scrollY / m.scrollable : 0;
      targetY = clamp(progress, 0, 1) * m.maxTravel;
    };

    // ── Events ─────────────────────────────────────────────────────────────
    const onScroll = () => {
      syncTargetToScroll();
      show();
      scheduleHide();
    };

    const onResize = () => updateMetrics();

    const onThumbDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragging = true;
      dragStartY = e.clientY;
      dragStartScroll = window.scrollY;
      document.body.style.userSelect = 'none';
      show();
      if (hideTimer) clearTimeout(hideTimer);
      window.addEventListener('mousemove', onDragMove, { passive: true });
      window.addEventListener('mouseup', onDragUp, { passive: true });
    };
    const onDragMove = (e: MouseEvent) => {
      if (!dragging || m.maxTravel <= 0) return;
      const delta = e.clientY - dragStartY;
      const scroll = dragStartScroll + (delta / m.maxTravel) * m.scrollable;
      window.scrollTo(0, clamp(scroll, 0, m.scrollable));
    };
    const onDragUp = () => {
      dragging = false;
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('mouseup', onDragUp);
      scheduleHide();
    };

    const onTrackDown = (e: MouseEvent) => {
      // Ignore clicks that originate on the thumb (those start a drag).
      if (e.target === thumb || thumb.contains(e.target as Node)) return;
      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const thumbTop = clamp(clickY - m.thumbHeight / 2, 0, m.maxTravel);
      const progress = m.maxTravel > 0 ? thumbTop / m.maxTravel : 0;
      window.scrollTo({ top: progress * m.scrollable, behavior: 'smooth' });
      show();
      scheduleHide();
    };

    const onEnter = () => {
      hovering = true;
      pill.style.transform = `scaleX(${hoverScale})`;
      if (hideTimer) clearTimeout(hideTimer);
      show();
    };
    const onLeave = () => {
      hovering = false;
      pill.style.transform = 'scaleX(1)';
      scheduleHide();
    };

    // ── Animation loop ───────────────────────────────────────────────────────
    const tick = () => {
      currentY = lerp(currentY, targetY, ease);
      if (Math.abs(targetY - currentY) < 0.05) currentY = targetY;
      thumb.style.transform = `translate3d(0, ${currentY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    // ── Init ─────────────────────────────────────────────────────────────────
    updateMetrics();
    syncTargetToScroll();
    currentY = targetY;
    thumb.style.transform = `translate3d(0, ${currentY}px, 0)`;
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(updateMetrics);
    ro.observe(document.documentElement);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    track.addEventListener('mousedown', onTrackDown);
    thumb.addEventListener('mousedown', onThumbDown);
    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      if (hideTimer) clearTimeout(hideTimer);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('mouseup', onDragUp);
      track.removeEventListener('mousedown', onTrackDown);
      thumb.removeEventListener('mousedown', onThumbDown);
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
      document.body.style.userSelect = '';
      document.documentElement.classList.remove('custom-scrollbar-active');
    };
  }, [
    enabled,
    width,
    fadeInDuration,
    fadeOutDuration,
    hideDelay,
    hoverScale,
    ease,
    minThumbHeight,
  ]);

  if (!enabled) return null;

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: width + 8, // transparent hit area; visible thumb is `width`
        zIndex,
        background: 'transparent',
        pointerEvents: 'none',
        cursor: 'pointer',
      }}
    >
      <div
        ref={thumbRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 4,
          width,
          opacity: 0,
          willChange: 'transform',
          cursor: 'grab',
        }}
      >
        <div
          ref={pillRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: radius,
            background: color,
            transformOrigin: 'center',
            transition: `transform ${hoverTransition}ms ease`,
          }}
        />
      </div>
    </div>
  );
}
