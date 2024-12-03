import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = [
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Partners', href: '/partners' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Impressum', href: '/impressum' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Support', href: '/support' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com' },
  { Icon: Twitter, href: 'https://twitter.com' },
  { Icon: Instagram, href: 'https://instagram.com' },
  { Icon: Linkedin, href: 'https://linkedin.com' },
];

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
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
            <p className="text-gray-500 text-sm">
              Empowering FLINTA individuals and girls of color to achieve their full potential
              in psychosocial and educational fields.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-gray-900 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Building Bridges. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 