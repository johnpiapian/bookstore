"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname()
  const rootPath = pathname.split('/')[1] ? `/${pathname.split('/')[1]}` : '/';

  const navItems = [
    { id: 'home', href: '/', label: 'Home' },
    // { id: 'books', href: '/books', label: 'Books' },
    // { id: 'manage', href: '/manage', label: 'Manage' },
    { id: 'about', href: '/about', label: 'About' },
  ];

  return (
    <nav className="p-4 bg-gray-500 dark:bg-gray-800">
      <ul className="flex space-x-4 justify-center">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                rootPath === item.href
                  ?'text-teal-500'
                  : 'text-white hover:text-teal-500 trasition-colors'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}