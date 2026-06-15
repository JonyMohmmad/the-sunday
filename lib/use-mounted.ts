// lib/use-mounted.ts
"use client";
import { useEffect, useState } from "react";

/**
 * Returns `false` on the server and during the first client render, then flips
 * to `true` after mount.
 *
 * Use it to gate scroll-reveal animations so content is *visible by default*:
 * pair with `initial={false}` + an `animate` that resolves to the visible state
 * while `!mounted`. The server then renders fully-visible HTML, and the reveal
 * (opacity:0 → opacity:1 on scroll) only engages once JS is confirmed running.
 * If JS is slow, blocked, or hydration fails, the content simply stays visible
 * instead of being stuck at opacity:0 (a blank page).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return mounted;
}
