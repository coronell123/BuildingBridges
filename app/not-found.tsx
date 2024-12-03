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

      {/* Footer section */}
      <footer className="relative bg-gray-50 border-t">
        <div className="absolute inset-0 bg-[url('/abstract.svg')] bg-center bg-no-repeat bg-cover opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-base text-gray-500 hover:text-gray-900">About Us</Link></li>
                <li><Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact</Link></li>
                <li><Link href="/faq" className="text-base text-gray-500 hover:text-gray-900">FAQ</Link></li>
                <li><Link href="/testimonials" className="text-base text-gray-500 hover:text-gray-900">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/blog" className="text-base text-gray-500 hover:text-gray-900">Blog</Link></li>
                <li><Link href="/media" className="text-base text-gray-500 hover:text-gray-900">Media</Link></li>
                <li><Link href="/press" className="text-base text-gray-500 hover:text-gray-900">Press Kit</Link></li>
                <li><Link href="/partners" className="text-base text-gray-500 hover:text-gray-900">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-base text-gray-500 hover:text-gray-900">Cookie Policy</Link></li>
                <li><Link href="/disclaimer" className="text-base text-gray-500 hover:text-gray-900">Disclaimer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Social</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              © {new Date().getFullYear()} Building Bridges. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
