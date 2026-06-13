// lib/use-magnetic.ts
"use client";
import { useRef, useState, useCallback } from "react";

interface MagneticState {
  x: number;
  y: number;
}

export function useMagnetic(strength: number = 0.35) {
  const ref  = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState<MagneticState>({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect    = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    const distX   = (e.clientX - centerX) * strength;
    const distY   = (e.clientY - centerY) * strength;
    setPos({ x: distX, y: distY });
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  return { ref, pos, onMouseMove, onMouseLeave };
}
