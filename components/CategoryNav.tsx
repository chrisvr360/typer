'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const provinces = [
  { name: 'Western Cape', href: '/province/western-cape' },
  { name: 'Eastern Cape', href: '/province/eastern-cape' },
  { name: 'Northern Cape', href: '/province/northern-cape' },
  { name: 'Free State', href: '/province/free-state' },
  { name: 'KwaZulu-Natal', href: '/province/kwazulu-natal' },
  { name: 'North West', href: '/province/north-west' },
  { name: 'Gauteng', href: '/province/gauteng' },
  { name: 'Mpumalanga', href: '/province/mpumalanga' },
  { name: 'Limpopo', href: '/province/limpopo' },
];

export function CategoryNav() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={theme === 'dark' ? 'glass-nav-dark' : 'glass-nav'}>
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between py-4">
          <div className="flex items-center space-x-1">
            {provinces.map((province) => {
              const isActive = pathname === province.href;
              return (
                <Link
                  key={province.name}
                  href={province.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-white' 
                      : theme === 'dark' 
                        ? 'text-teal-200/70 hover:text-teal-200' 
                        : 'text-teal-800/70 hover:text-teal-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      className={theme === 'dark' ? 'glass-dark' : 'glass'}
                      layoutId="activeProvince"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                  <span className="relative z-10">{province.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 