'use client';

import { Navbar } from '@/components/layout/navbar';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 mt-16">
        {children}
      </main>

      {/* Footer section */}
    </div>
  );
}
