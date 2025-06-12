'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const provinces = [
  { name: "Eastern Cape", slug: "eastern-cape" },
  { name: "Western Cape", slug: "western-cape" },
  { name: "Northern Cape", slug: "northern-cape" },
  { name: "Free State", slug: "free-state" },
  { name: "KwaZulu-Natal", slug: "kwa-zulu-natal" },
  { name: "Gauteng", slug: "gauteng" },
  { name: "Limpopo", slug: "limpopo" },
  { name: "Mpumalanga", slug: "mpumalanga" },
  { name: "North West", slug: "north-west" },
];

export function CategoryNav() {
  const pathname = usePathname();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const isProvincePage = pathname.startsWith('/province/');

  const shouldShow = isAtTop || (isProvincePage && scrollDirection === 'up');

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.nav
          className="glass-nav sticky top-[72px] z-40"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-4 py-4 overflow-x-auto">
              {provinces.map((province) => {
                const isActive = pathname === `/province/${province.slug}`;
                return (
                  <Link
                    key={province.slug}
                    href={`/province/${province.slug}`}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        isActive
                          ? "glass text-primary"
                          : "hover:bg-teal-500/10 text-muted-foreground"
                      }`}
                    >
                      {province.name}
                    </motion.div>
                    {isActive && (
                      <motion.div
                        layoutId="activeProvince"
                        className="absolute inset-0 glass rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
} 