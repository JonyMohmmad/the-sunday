'use client';

import { ScrollDepthBanner } from '@/components/ui/ScrollDepthBanner';
import { MobileStickyBar } from '@/components/ui/MobileStickyBar';

export function ClientProviders() {
  function handleAuditClick() {
    window.dispatchEvent(new Event('openAuditModal'));
  }

  return (
    <>
      <ScrollDepthBanner />
      <MobileStickyBar onAuditClick={handleAuditClick} />
    </>
  );
}
