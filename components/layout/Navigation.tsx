'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigationLinks = [
  { href: '/vision', label: 'Vision' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/activity', label: 'Aktivitäten' },
  { href: '/roadmap', label: 'Roadmap' },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-[60px] w-[60px] sm:h-[80px] sm:w-[80px]">
            <Image
              src="/logo.png"
              alt="Building Bridges Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl sm:text-3xl font-bold">Building Bridges</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <Button
            asChild
            className="bg-white hover:bg-gray-100 text-black text-sm px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
          >
            <Link href="/sign-in">Anmelden</Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-b from-[#8c52ff] to-black text-white text-sm px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link href="/sign-up">Registrieren</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <div className="px-4 py-2 space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <Button
                asChild
                className="w-full bg-white hover:bg-gray-100 text-black border border-gray-200"
              >
                <Link href="/sign-in">Anmelden</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-gradient-to-b from-[#8c52ff] to-black text-white"
              >
                <Link href="/sign-up">Registrieren</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 