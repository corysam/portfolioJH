'use client';

import { motion } from 'motion/react';
import { Download, Sprout } from 'lucide-react';
import Image from 'next/image';

interface AboutMeProps {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  tags: string[];
  cvUrl: string;
  photoUrl: string;
}

export function AboutMe({ title, subtitle, description, tag, tags, cvUrl, photoUrl }: AboutMeProps) {
  return (
    <div className="py-20 md:py-32 relative">
      {/* Decorative organic shapes */}
      {/* TEMPORARILY HIDDEN - Remove comment to restore flowers
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          animate={{ 
            rotate: [0, 10, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[20%] left-[8%] w-24 h-32 opacity-50"
        >
          <OrganicShape color="#8B7FD8" className="w-full h-full" />
        </motion.div>
        <div className="absolute bottom-40 left-[5%] w-28 h-36 opacity-40">
          <OrganicShape color="#5A7A5E" className="w-full h-full" />
        </div>
        <div className="absolute top-[50%] right-[5%] w-20 h-28 opacity-35">
          <OrganicShape color="#8B7FD8" className="w-full h-full" />
        </div>
        <motion.div
          animate={{ 
            rotate: [0, -8, 0],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[35%] left-[35%] w-16 h-20 opacity-50"
        >
          <OrganicShape color="#E07F3A" className="w-full h-full" />
        </motion.div>
      </div>
      */}

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative h-full"
          >
            <div className="relative w-full max-w-xl mx-auto h-full">
              {/* Main photo card */}
              <motion.div
                whileHover={{ rotate: -2, scale: 1.02 }}
                className="relative rounded-3xl h-full"
              >
                <div className="min-h-[600px] h-full bg-neutral-300 dark:bg-[#001616] relative rounded-3xl overflow-hidden">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-3xl"
                    />
                  ) : (
                    <div className="w-full h-full dark:bg-transparent bg-transparent border-2 border-dashed border-neutral-300/30 dark:border-neutral-600/30 flex items-center justify-center rounded-3xl"></div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="space-y-6 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex justify-center md:justify-start items-center gap-3"
            >
              <h2 className="fascinate-title text-4xl sm:text-5xl leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 text-foreground">About Me</span>
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="absolute bottom-0 left-0 h-4 bg-[#A0C4A1] dark:bg-[#5A7A5E] -z-0 rounded"
                  />
                </span>
              </h2>
              
              <motion.span
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                <Sprout className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" fill="currentColor" />
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4 text-[#5A5A5A] dark:text-[#B8A89A] leading-relaxed"
            >
              {(description ?? '').split('\n\n').map((paragraph, index) => (
                <p className="text-[#D4D0BF]" key={index}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 pt-4 justify-center md:justify-start"
            >
              {(tags ?? []).map((skill, idx) => {
                return (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + idx * 0.05 }}
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-[#63746B] text-[#001616] shadow-lg"
                  >
                    {skill}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* CV Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-3 pt-6 justify-center md:justify-start"
            >
              <motion.a
                href={cvUrl || '#'}
                download={cvUrl ? true : undefined}
                whileHover={{ scale: 1.1, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl transition-all flex items-center gap-2 font-bold shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}