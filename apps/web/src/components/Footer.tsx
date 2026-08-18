'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Partner {
  name: string;
  logo?: string;
}

interface FooterProps {
  partnersTitle: string;
  copyrightTextBefore: string;
  copyrightTextAfter: string;
  partners: Partner[];
}

export function Footer({ partnersTitle, copyrightTextBefore, copyrightTextAfter, partners }: FooterProps) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const next = prev - 1;
        if (Math.abs(next) >= partners.length * 200) return 0;
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [partners.length]);

  const duplicated = [...partners, ...partners];

  return (
    <footer className="border-t-4 border-primary dark:border-primary/40 bg-background dark:bg-[#0C2723] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#A0C4A1] rounded-full blur-3xl opacity-15" />
      <div className="absolute bottom-0 left-[20%] w-24 h-24 bg-[#E07F3A] rounded-full blur-3xl opacity-15" />

      <div className="py-12 relative z-10 bg-white dark:bg-[#001616]">
        <div className="mb-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 max-w-7xl mx-auto px-4"
          >
            <h2 className="font-bold text-foreground fascinate-title text-[36px]">{partnersTitle}</h2>
          </motion.div>

          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#001616] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#001616] to-transparent z-10" />

            <div
              className="flex gap-6 items-center"
              style={{ transform: `translateX(${position}px)`, width: 'max-content' }}
            >
              {duplicated.map((partner, index) => {
                const rotation = [-2, -1, 1, 2];
                return (
                  <motion.div
                    key={`${partner.name}-${index}`}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    style={{ rotate: rotation[index % rotation.length] }}
                    className="flex items-center justify-center w-32 h-20 flex-shrink-0 rounded-2xl border-2 border-[#63746B] shadow-lg bg-[#002625] overflow-hidden"
                  >
                    {partner.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-3" />
                    ) : (
                      <div className="w-full h-full bg-neutral-700 dark:bg-neutral-600 flex items-center justify-center text-xs text-neutral-400">
                        LOGO
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-primary/10 py-4 text-center max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-[#D4D0BF] text-sm">
              {copyrightTextBefore.replace('{year}', String(new Date().getFullYear()))}{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block text-red-500"
              >
                ❤️
              </motion.span>
              {' '}{copyrightTextAfter}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
