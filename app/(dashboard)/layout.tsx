'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/auth/index';
import { useState } from 'react';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const navItems = [
  { name: 'Vision', href: '/vision' },
  { name: 'Workshops', href: '/workshops' },
  { name: 'Activity', href: '/activity' },
  { name: 'Roadmap', href: '/roadmap' },
];

function Header() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-[url('/abstract.svg')] bg-center bg-no-repeat bg-cover opacity-50" />
      <nav className="relative bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo - always visible */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="Building Bridges Logo"
                  width={40}
                  height={40}
                  className="w-auto h-8"
                />
                <span className="text-xl font-bold">Building Bridges</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  asChild
                  className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>

            {/* Auth Buttons - always visible */}
            <div className="flex items-center space-x-4">
              {user ? (
                <Button
                  asChild
                  className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  <Button
                    asChild
                    className="bg-white hover:bg-gray-100 text-black text-sm px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-b from-[#8c52ff] to-black text-white text-sm px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    asChild
                    className="w-full bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
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
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 mt-16">{children}</div>
      <Footer />
    </div>
  );
}
