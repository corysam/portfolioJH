'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Project } from '@/lib/types';

interface IllustrationModalProps {
  illustration: Project | null;
  onClose: () => void;
}

/** Intrinsic pixel size of the loaded illustration, used to size the frame exactly. */
type NaturalSize = { width: number; height: number };

/** Viewport budget the frame is allowed to occupy. */
const MAX_VW = 90;
const MAX_VH = 85;

export function IllustrationModal({ illustration, onClose }: IllustrationModalProps) {
  const [size, setSize] = useState<NaturalSize | null>(null);

  useEffect(() => {
    if (illustration) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [illustration]);

  // A new illustration has its own dimensions — drop the previous ones.
  useEffect(() => {
    setSize(null);
  }, [illustration?.id]);

  // Fit the image inside the viewport budget without ever upscaling it.
  const ratio = size ? size.width / size.height : null;
  const frameStyle =
    size && ratio
      ? {
          aspectRatio: `${size.width} / ${size.height}`,
          width: `min(${MAX_VW}vw, ${(MAX_VH * ratio).toFixed(4)}vh, ${size.width}px)`,
        }
      : undefined;

  return (
    <AnimatePresence>
      {illustration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: size ? 1 : 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-fit h-fit flex flex-col"
          >
            {/* Image with decorative border */}
            <motion.div
              whileHover={{ rotate: 0.5 }}
              className="relative overflow-hidden shadow-2xl"
              style={frameStyle}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-12 h-12 bg-[#5A7A5E] hover:bg-[#4a6a4e] rounded-2xl flex items-center justify-center text-[#F5E6D3] transition-all z-10 shadow-lg border-2 border-[#F5E6D3]"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {illustration.image && (
                <Image
                  src={illustration.image}
                  alt={illustration.title}
                  fill
                  sizes="90vw"
                  priority
                  onLoad={(e) =>
                    setSize({
                      width: e.currentTarget.naturalWidth,
                      height: e.currentTarget.naturalHeight,
                    })
                  }
                  className="object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
