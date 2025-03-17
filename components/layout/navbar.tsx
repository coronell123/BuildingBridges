'use client';

import { useState } from 'react';
import { Button } from '@/lib/design-system/components';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationLinks } from './navigation-links';
import { useUser } from '@/lib/auth/index';

const navItems = [
  { name: 'Vision', href: '/vision' },
  { name: 'Workshops', href: '/workshops' },
  { name: 'Activity', href: '/activity' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Mentors', href: '/mentors' },
];

export function Navbar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

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
                  src="/logo_round.svg"
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
                  variant="default"
                  className="px-6"
                  asChild
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>

            {/* Auth Buttons - always visible */}
            <div className="flex items-center space-x-4">
              {user ? (
                <Button
                  variant="default"
                  asChild
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="md"
                    asChild
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button
                    variant="default"
                    size="md"
                    asChild
                  >
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="default"
                  className="w-full mb-2"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 