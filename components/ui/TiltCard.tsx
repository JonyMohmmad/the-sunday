'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface TiltCardProps {
  children:   React.ReactNode;
  className?: string;
  maxTilt?:   number;
  scale?:     number;
  glare?:     boolean;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 6,
  scale   = 1.02,
  glare   = true,
}: TiltCardProps) {
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [currentScale, setCurrentScale] = useState(1);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  if (reduced || isTouch) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect    = ref.current.getBoundingClientRect();
    const mouseX  = e.clientX - rect.left;
    const mouseY  = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;

    setRotateX(((mouseY - centerY) / rect.height) * maxTilt * -1);
    setRotateY(((mouseX - centerX) / rect.width)  * maxTilt);
    setGlareX((mouseX / rect.width)  * 100);
    setGlareY((mouseY / rect.height) * 100);
  };

  const handleMouseEnter = () => {
    setCurrentScale(scale);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setCurrentScale(1);
    setIsHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${currentScale})`,
      }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
      style={{ transformStyle: 'preserve-3d', position: 'relative' }}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      )}
    </motion.div>
  );
}
