'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para login
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">RLS</span>
        </div>
        <div className="loading-spinner mx-auto"></div>
      </div>
    </div>
  );
}