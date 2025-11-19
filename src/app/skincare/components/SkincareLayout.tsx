'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';

interface SkincareLayoutProps {
  children: ReactNode;
}

export default function SkincareLayout({ children }: SkincareLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-8 px-4 sm:px-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
