'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ProjectCard } from './ProjectCard';
import { IllustrationModal } from './IllustrationModal';
import { DEFAULT_CATEGORY_SCHEME } from '@/lib/category-colors';
import type { Project, ProjectCategory } from '@/lib/types';

interface WorkProps {
  projects: Project[];
}

// The "All" pill isn't a CMS category; its colors come from Tailwind classes
// below, so the scheme here is never read.
const ALL_CATEGORY: ProjectCategory = { name: 'All', ...DEFAULT_CATEGORY_SCHEME };

export function Work({ projects }: WorkProps) {
  const router = useRouter();
  // Filter out archived projects from the public view
  const activeProjects = projects.filter(p => !p.archived);

  // Dynamically get unique categories from active projects, keyed by name so a
  // category appearing on several projects only yields one pill.
  const uniqueCategories = Array.from(
    new Map(activeProjects.flatMap(p => p.categories).map(c => [c.name, c])).values()
  );
  const categories: ProjectCategory[] = [...uniqueCategories, ALL_CATEGORY];

  const [filter, setFilter] = useState<string>(uniqueCategories[0]?.name || 'All');
  const [selectedIllustration, setSelectedIllustration] = useState<Project | null>(null);

  const filteredProjects = filter === 'All' 
    ? activeProjects 
    : activeProjects.filter(p => p.categories.some(c => c.name === filter));

  return (
    <div className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative background organic shapes */}
      {/* TEMPORARILY HIDDEN - Remove comment to restore flowers
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-[10%] w-24 h-32">
          <OrganicShape color="#E07F3A" className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-[15%] w-28 h-36 transform -scale-x-100">
          <OrganicShape color="#A0C4A1" className="w-full h-full" />
        </div>
        <div className="absolute top-[50%] right-[20%] w-18 h-24">
          <OrganicShape color="#5A7A5E" className="w-full h-full" />
        </div>
        <div className="absolute bottom-[20%] left-[8%] w-20 h-28">
          <OrganicShape color="#8B7FD8" className="w-full h-full" />
        </div>
      </div>
      */}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight text-center">
            <span className="fascinate-title relative inline-block mt-2 text-4xl sm:text-5xl">
              <span className="relative z-10">Selected Works</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-0 left-0 h-4 bg-[#A0C4A1] dark:bg-[#5A7A5E] -z-0 rounded"
              />
            </span>
          </h1>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, idx) => {
            const isActive = filter === category.name;
            const isAllCategory = category.name === 'All';

            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, rotate: isActive ? 0 : -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category.name)}
                className={`px-5 py-2.5 text-sm rounded-full font-bold border-2 transition-all ${
                  isAllCategory
                    ? isActive
                      ? 'shadow-lg border-foreground text-foreground bg-transparent'
                      : 'border-transparent text-foreground/60 bg-transparent hover:text-foreground/80'
                    : isActive
                    ? 'shadow-lg'
                    : 'shadow-md hover:shadow-lg border-transparent bg-[#001616] text-[#F5E6D3]'
                }`}
                style={
                  isActive && !isAllCategory
                    ? {
                        backgroundColor: category.color,
                        color: category.textColor,
                        borderColor: category.color,
                      }
                    : {}
                }
              >
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                showCategory={filter === 'All'}
                onIllustrationClick={() => {
                  if (project.categories.some(c => c.name === 'Illustration')) {
                    setSelectedIllustration(project);
                  }
                }}
                onProjectClick={() => {
                  if (!project.categories.some(c => c.name === 'Illustration')) {
                    router.push(`/projects/${project.slug}`);
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Illustration Modal */}
      <IllustrationModal
        illustration={selectedIllustration}
        onClose={() => setSelectedIllustration(null)}
      />
    </div>
  );
}