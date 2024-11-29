'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push('/');
  }

  return (
    <header className="relative h-[40vh] min-h-[320px] w-full">
      {/* Abstract Shape Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/logo_graphic_wide2.png"
          alt="Background Graphic"
          fill
          className="object-cover w-full"
        />
      </div>

      <nav className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo and Title Section */}
        <div className="h-full flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-[100px] w-[100px] sm:h-[120px] sm:w-[120px]">
              <Image
                src="/logo.png"
                alt="Building Bridges Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center sm:text-left mt-4 sm:mt-0 sm:ml-6">
              Building Bridges
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Button
              asChild
              className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/vision">Vision</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/workshops">Workshops</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/activity">Activity</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/roadmap">Roadmap</Link>
            </Button>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-12 w-12 ring-2 ring-white/50">
                    <AvatarImage alt={user.name || ''} />
                    <AvatarFallback>
                      {user.email
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="flex flex-col gap-1">
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/dashboard" className="flex w-full items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <form action={handleSignOut} className="w-full">
                    <button type="submit" className="flex w-full">
                      <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
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
          </div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-[100dvh] w-full">
      <Header />
      {children}
      <Footer />
    </section>
  );
}
