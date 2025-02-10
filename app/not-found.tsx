'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center mt-16">
        <div className="max-w-md space-y-8 p-4 text-center">
          <div className="flex justify-center">
            <Image
              src="/logo_round.svg"
              alt="Building Bridges Logo"
              width={80}
              height={80}
              className="w-auto h-20"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-base text-gray-500">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Button
            asChild
            className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
