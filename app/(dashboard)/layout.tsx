import { Navbar } from '@/components/layout/navbar';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { UserProvider } from '@/lib/auth/index';
import { getSession } from '@/lib/auth/session';
import { User } from '@/lib/db/schema';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getSession() as Promise<User | null>;
  return (
    <UserProvider userPromise={userPromise}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 mt-16">
          {children}
        </main>

        {/* Footer section */}
      </div>
    </UserProvider>
  );
}
