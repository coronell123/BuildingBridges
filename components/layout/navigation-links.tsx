'use client';

import Link from 'next/link';

export function NavigationLinks({ mobile }: { mobile?: boolean }) {
  const links = [
    { href: '/vision', label: 'Vision' },
    { href: '/workshops', label: 'Workshops' },
    { href: '/activity', label: 'Activity' },
    { href: '/roadmap', label: 'Roadmap' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${
            mobile
              ? 'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              : 'text-sm font-medium text-gray-700 hover:text-gray-900'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
} 