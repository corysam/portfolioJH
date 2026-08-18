'use client';

import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import type { HeroData } from '@/lib/types';

interface HeroProps {
  hero: HeroData;
  availableForWork: boolean;
}

export function Hero({ hero, availableForWork }: HeroProps) {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-between relative overflow-hidden">
      {/* Decorative organic shapes */}
      {/* TEMPORARILY HIDDEN - Remove comment to restore flowers
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Shape 1 - green light */}
        {/* <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-[15%] w-20 h-28 opacity-40"
        >
          <OrganicShape color="#A0C4A1" className="w-full h-full" />
        </motion.div>

        {/* Shape 2 - green medium */}
        {/* <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-32 right-[20%] w-24 h-32 opacity-50"
        >
          <OrganicShape color="#5A7A5E" className="w-full h-full" />
        </motion.div>

        {/* Shape 3 - orange */}
        {/* <motion.div
          animate={{ 
            rotate: [-10, 10, -10],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-40 right-[15%] w-16 h-24 opacity-40"
        >
          <OrganicShape color="#E07F3A" className="w-full h-full" />
        </motion.div>

        {/* Shape 4 - green dark */}
        {/* <motion.div
          animate={{ 
            rotate: [10, -10, 10],
            y: [0, -12, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-32 left-[10%] w-18 h-28 opacity-35"
        >
          <OrganicShape color="#2F4538" className="w-full h-full" />
        </motion.div>

        {/* Shape 5 - purple small */}
        {/* <motion.div
          animate={{ 
            rotate: [5, -5, 5],
            y: [0, -8, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[50%] right-[10%] w-14 h-20 opacity-30"
        >
          <OrganicShape color="#8B7FD8" className="w-full h-full" />
        </motion.div>
      </div>
      */}

      {/* Text Content - Top on mobile/centered, Left on desktop */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-20 sm:pt-24 lg:pt-32 relative z-10 w-full lg:flex lg:items-center lg:min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center lg:text-left lg:max-w-[50%] mt-16 sm:mt-20 lg:-mt-24 mb-12 lg:mb-0"
        >
          {availableForWork && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 dark:bg-[#5A7A5E]/20 border-2 border-[#5A7A5E] rounded-full text-[#2F4538] dark:text-[#5A7A5E] mb-8 bg-[#e5f7e5]"
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-3 h-3 bg-[#A0C4A1] rounded-full"
                />
                <motion.div
                  animate={{ 
                    opacity: [1, 0.6, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-2.5 h-2.5 bg-[#A0C4A1] rounded-full shadow-[0_0_8px_rgba(160,196,161,0.6)]"
                />
              </div>
              <span className="text-sm font-semibold text-[#94b298]">Available for projects</span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 text-center lg:text-left"
          >

            <h1 className="fascinate-title text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-none">
              {hero.title}
              {hero.subtitle && (
                <>
                  {' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">{hero.subtitle}</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute bottom-0 left-0 h-4 bg-[#A0C4A1] dark:bg-[#5A7A5E] z-0 rounded"
                    />
                  </span>
                </>
              )}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[#D4D0BF] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed text-center lg:text-left text-[18px]"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#work');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              transition={{ duration: 0.2 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {hero.ctaPrimaryLabel}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              transition={{ duration: 0.2 }}
              className="px-8 py-4 bg-[#5A7A5E] text-[#F5E6D3] rounded-2xl font-bold border-2 border-primary/10 hover:border-primary/20 transition-all"
            >
              {hero.ctaSecondaryLabel}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Simple illustration area - Bottom full-width on mobile, absolute right on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="w-full lg:absolute lg:bottom-0 lg:right-0 lg:w-[65%] lg:h-[95vh] relative z-0"
      >
        {/* Desktop illustration - hidden on small screens */}
        <div className={`hidden lg:flex relative z-0 w-full h-full bg-transparent dark:bg-transparent mx-6 sm:mx-8 lg:mx-0 items-center justify-center overflow-visible ${hero.imageDesktopUrl ? '' : 'border-2 border-dashed border-neutral-300/30 dark:border-neutral-600/30'}`}>
          {hero.imageDesktopUrl && (
            <Image
              src={hero.imageDesktopUrl}
              alt=""
              fill
              priority
              sizes="65vw"
              className="object-contain"
            />
          )}
        </div>

        {/* Tablet illustration - medium height, visible between 640px and 1023px */}
        <div className={`hidden sm:flex lg:hidden relative w-full h-[500px] bg-transparent dark:bg-transparent mx-6 sm:mx-8 items-center justify-center overflow-visible ${hero.imageTabletUrl ? '' : 'border-2 border-dashed border-neutral-300/30 dark:border-neutral-600/30'}`}>
          {hero.imageTabletUrl && (
            <Image
              src={hero.imageTabletUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          )}
        </div>

        {/* Mobile illustration - taller version, visible only on small screens < 640px */}
        <div className={`flex sm:hidden w-full h-[600px] bg-transparent dark:bg-transparent mx-6 items-center justify-center overflow-visible ${hero.imageMobileUrl ? '' : 'border-2 border-dashed border-neutral-300/30 dark:border-neutral-600/30'}`}>
          {hero.imageMobileUrl && (
            <Image
              src={hero.imageMobileUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => {
          const element = document.querySelector('#work');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#63746B] hover:text-[#5A7A5E] transition-colors z-20"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}