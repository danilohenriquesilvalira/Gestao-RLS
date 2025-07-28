// components/ScreenResolutionDebugger.tsx
'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ScreenResolutionDebugger() {
  const [resolution, setResolution] = useState('');
  const [showDebugger, setShowDebugger] = useState(true);

  useEffect(() => {
    const updateResolution = () => {
      setResolution(`${window.innerWidth}px x ${window.innerHeight}px`);
    };

    // Set initial resolution
    updateResolution();

    // Update resolution on window resize
    window.addEventListener('resize', updateResolution);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateResolution);
    };
  }, []);

  if (!showDebugger) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-[9999] bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 opacity-90">
      <span>Resolução: {resolution}</span>
      <button
        onClick={() => setShowDebugger(false)}
        className="text-gray-400 hover:text-white transition-colors p-0.5 rounded-full"
        aria-label="Fechar Debugger"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}