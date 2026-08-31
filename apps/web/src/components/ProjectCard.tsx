'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { richTextToPlainText } from '@/lib/rich-text';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  showCategory?: boolean;
  onIllustrationClick: () => void;
  onProjectClick: () => void;
}

// Deterministic per-card hash seeded by the project id (string or numeric).
function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) & 0xffff;
  return hash;
}

// Le sens de l'inclinaison suit la position (gauche, droite, gauche, ...) pour
// garantir l'alternance visuelle, tandis que l'amplitude vient du hash de l'id :
// deux cartes penchées du même côté n'ont jamais exactement le même angle.
function getRotation(id: string, index: number): number {
  const angle = 0.8 + (hashId(id) % 70) / 100; // 0.80 → 1.50
  return index % 2 === 0 ? -angle : angle;
}

// One of the four hand-drawn border shapes (see globals.css), picked
// deterministically so adjacent cards wobble differently but SSR and the
// client always agree.
const SKETCH_VARIANTS = ['sketch-frame', 'sketch-frame-2', 'sketch-frame-3', 'sketch-frame-4'];

function getSketchBorder(id: string): string {
  return SKETCH_VARIANTS[hashId(id) % SKETCH_VARIANTS.length];
}

export function ProjectCard({
  project,
  index,
  showCategory = true,
  onIllustrationClick,
  onProjectClick,
}: ProjectCardProps) {
  const handleClick = () => {
    if (project.categories.some((c) => c.name === 'Illustration')) {
      onIllustrationClick();
    } else {
      onProjectClick();
    }
  };

  const rotation = getRotation(project.id, index);
  const sketchBorder = getSketchBorder(project.id);
  const teaser = richTextToPlainText(project.description);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group h-full"
    >
      <motion.div
        onClick={handleClick}
        whileHover={{ y: -8, rotate: rotation * 0.25, transition: { duration: 0.3 } }}
        style={{ rotate: rotation }}
        className={`bg-[#001616] ${sketchBorder} overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-[#63746B] h-full flex flex-col cursor-pointer`}
      >
        <div className="aspect-[4/3] overflow-hidden bg-neutral-300 dark:bg-neutral-700 relative">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="w-full h-full relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {showCategory && project.categories.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              className="absolute top-4 right-4 flex flex-wrap justify-end gap-2"
            >
              {project.categories.map((category) => (
                <span
                  key={category.name}
                  className="inline-block px-4 py-2 text-xs rounded-full shadow-lg font-bold border-2"
                  style={{
                    backgroundColor: category.color,
                    color: category.textColor,
                    borderColor: category.color,
                  }}
                >
                  {category.name}
                </span>
              ))}
            </motion.div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col bg-[#001616]">
          <h3 className="text-[#F5E6D3] mb-3 font-bold text-xl leading-tight">{project.title}</h3>
          {teaser && (
            <p className="text-sm text-[#D4D0BF] line-clamp-3 leading-relaxed">{teaser}</p>
          )}
          <div className="mt-auto pt-4">
            <motion.div
              className="inline-flex items-center gap-2 text-sm font-bold"
              style={{ color: '#94B298' }}
              whileHover={{ x: 5 }}
            >
              <span>View Project</span>
              <span>→</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
