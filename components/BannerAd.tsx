'use client';

import { useEffect, useState } from 'react';

// AdMob banner placeholder — replace with real AdSense / AdMob script
export default function BannerAd() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 3 s to avoid hurting CLS/LCP scores
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="w-full max-w-lg mx-auto pointer-events-auto">
        {/* --- REPLACE THIS DIV WITH YOUR REAL AD UNIT --- */}
        <div
          className="mx-2 mb-2 rounded-xl overflow-hidden flex items-center justify-center
                     bg-dark-800 border border-white/10 h-14 text-white/30 text-xs select-none"
          aria-hidden="true"
        >
          {/* AdMob / AdSense ad renders here */}
          <span>[ Advertisement ]</span>
        </div>
        {/* --------------------------------------------- */}
      </div>
    </div>
  );
}
