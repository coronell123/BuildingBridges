import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { UserProvider } from '@/lib/auth/index';
import { getUser } from '@/lib/db/queries';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Configure JetBrains Mono font
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Building Bridges',
  description: 'Empowerment und Mentoring für Mädchen & FLINTA of Color',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html 
      lang="de" 
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-primary antialiased min-h-[100dvh]">
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
