'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { Project } from '@/lib/types';

interface IllustrationModalProps {
  illustration: Project | null;
  onClose: () => void;
}

export function IllustrationModal({ illustration, onClose }: IllustrationModalProps) {
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
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-fit h-fit flex flex-col"
          >
            {/* Image with decorative border */}
            <motion.div 
              whileHover={{ rotate: 0.5 }}
              className="relative overflow-hidden shadow-2xl"
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

              {/* Grey Placeholder */}
              <div 
                className="bg-neutral-400 dark:bg-neutral-700 bg-cover bg-center w-[90vw] max-w-[600px] aspect-[4/5]" 
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1746106585865-34b063030c8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbGx1c3RyYXRpb24lMjBkcmF3aW5nJTIwYXJ0d29ya3xlbnwxfHx8fDE3NzMzMjMzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)'
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}