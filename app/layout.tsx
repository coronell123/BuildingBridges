import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { UserProvider } from '@/lib/auth/index';
import { getUser } from '@/lib/db/queries';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Building Bridges',
  description: 'Empowerment und Mentoring für Mädchen & FLINTA of Color',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html lang="de" className={manrope.className}>
      <body className="min-h-[100dvh]">
        <UserProvider userPromise={userPromise}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 mt-16">{children}</main>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
