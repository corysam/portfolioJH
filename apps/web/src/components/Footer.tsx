'use client';

import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

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

/** Card width + gap, kept in sync with the `w-32` / `gap-6` classes below. */
const GAP = 24;
/** Scroll speed of the marquee, in pixels per second. */
const SPEED = 40;

export function Footer({ partnersTitle, copyrightTextBefore, copyrightTextAfter, partners }: FooterProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  // How many copies of the partner list to render, and how far the track has to
  // travel before it lands back on an identical frame. Both are measured rather
  // than assumed, so any number of partners loops seamlessly and still fills the
  // full width of the viewport.
  const [copies, setCopies] = useState(2);
  const [distance, setDistance] = useState(0);

  const measure = useCallback(() => {
    const set = setRef.current;
    const viewport = viewportRef.current;
    if (!set || !viewport) return;

    const setWidth = set.getBoundingClientRect().width;
    if (!setWidth) return;

    const step = setWidth + GAP;
    setDistance(step);
    // One copy scrolls away while the rest cover the viewport — hence the +1.
    setCopies(Math.max(2, Math.ceil(viewport.offsetWidth / step) + 1));
  }, []);

  useEffect(() => {
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (setRef.current) observer.observe(setRef.current);
    return () => observer.disconnect();
  }, [measure, partners.length]);

  const rotation = [-2, -1, 1, 2];

  const renderSet = (copyIndex: number, ref?: React.Ref<HTMLDivElement>) => (
    <div
      key={copyIndex}
      ref={ref}
      aria-hidden={copyIndex > 0}
      className="flex gap-6 items-center flex-shrink-0"
    >
      {partners.map((partner, index) => (
        <motion.div
          key={`${partner.name}-${index}`}
          whileHover={{ scale: 1.05, rotate: 0 }}
          style={{ rotate: rotation[index % rotation.length] }}
          className="flex items-center justify-center w-32 h-20 flex-shrink-0 rounded-2xl border-2 border-[#63746B] shadow-lg bg-[#002625] overflow-hidden"
        >
          {partner.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-neutral-700 dark:bg-neutral-600 flex items-center justify-center text-xs text-neutral-400">
              LOGO
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

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

          <div ref={viewportRef} className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#001616] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#001616] to-transparent z-10" />

            <motion.div
              className="flex gap-6 items-center w-max"
              // Slide left by exactly one copy, then loop. Because the frame at
              // -distance is pixel-identical to the frame at 0, the restart is
              // invisible. Driven by Motion rather than a CSS animation so it
              // keeps running even when the OS asks for reduced motion.
              animate={distance ? { x: [0, -distance] } : { x: 0 }}
              transition={
                distance
                  ? { duration: distance / SPEED, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
                  : { duration: 0 }
              }
            >
              {Array.from({ length: copies }, (_, copyIndex) =>
                renderSet(copyIndex, copyIndex === 0 ? setRef : undefined),
              )}
            </motion.div>
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
