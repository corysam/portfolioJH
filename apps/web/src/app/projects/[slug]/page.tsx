import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Target, Trophy } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RichText } from '@/components/RichText';
import { DEFAULT_CATEGORY_COLOR } from '@/lib/category-colors';
import { getFooter, getHeader, getProject, getProjects } from '@/lib/content';
import { hasRichText, richTextToPlainText } from '@/lib/rich-text';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects
    .filter((p) => !p.categories.some((c) => c.name === 'Illustration'))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const description =
    richTextToPlainText(project.description) ||
    richTextToPlainText(project.mission) ||
    `${project.title} — case study.`;
  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: project.image ? [project.image] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, footer, header] = await Promise.all([
    getProject(slug),
    getFooter(),
    getHeader(),
  ]);
  if (!project || project.categories.some((c) => c.name === 'Illustration')) notFound();

  const phases = project.phases ?? [];
  const clientNames = project.clientName ?? [];
  const sections = project.sections ?? [];
  // The page's accent (callout tint/borders) follows the project's first category.
  const accent = project.categories[0]?.color ?? DEFAULT_CATEGORY_COLOR;

  return (
    <>
      <Header header={header} />
      <div className="min-h-screen bg-white dark:bg-[#001616]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="pt-24 pb-20">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 mb-16 text-primary font-bold hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Projects</span>
            </Link>

            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 mb-16 items-start">
              <div className="space-y-6">
                {project.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category) => (
                      <span
                        key={category.name}
                        className="inline-block px-5 py-2 rounded-full font-bold text-sm border-2 shadow-md"
                        style={{
                          backgroundColor: category.color,
                          color: category.textColor,
                          borderColor: category.color,
                        }}
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-[#F5E6D3] text-[32px] font-bold leading-tight">{project.title}</h1>

                <div className="space-y-3">
                  {project.dateAndDuration && (
                    <DetailRow label="Date & Duration" value={project.dateAndDuration} />
                  )}
                  {project.role && <DetailRow label="Role" value={project.role} />}
                  {project.equipe && <DetailRow label="Équipe" value={project.equipe} />}
                  {clientNames.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-[#63746b]">
                        {clientNames.length > 1 ? 'Clients' : 'Client'}
                      </p>
                      {clientNames.map((c) => (
                        <p key={c} className="font-semibold text-[#f5e6d3]">{c}</p>
                      ))}
                    </div>
                  )}
                  {project.software?.length ? (
                    <DetailRow label="Software" value={project.software.join(', ')} />
                  ) : null}
                </div>

                {project.buttonTitle && project.buttonUrl && (
                  <div className="pt-4">
                    <a
                      href={project.buttonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      {project.buttonTitle}
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>

              <div
                className="rounded-3xl overflow-hidden shadow-2xl border-4 relative aspect-[4/3]"
                style={{ borderColor: '#63746B' }}
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>

            {hasRichText(project.mission) && (
              <Callout
                icon={<Target className="w-6 h-6 text-[#F5E6D3]" />}
                title="Project Overview"
                accent={accent}
              >
                <RichText value={project.mission} className="text-[#D4D0BF]" />
              </Callout>
            )}

            {phases.length > 0 && (
            <section className="mb-16 mt-16">
              <h2 className="text-[26px] font-bold mb-8 text-[#F5E6D3]">Project Phases</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {phases.map((phase, index) => (
                  <div key={phase.title} className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold"
                        style={{ backgroundColor: '#94B29820', color: '#94B298' }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="mb-2 text-[#F5E6D3] font-bold">{phase.title}</h3>
                        <RichText value={phase.description} className="text-sm text-[#D4D0BF]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            )}

            <section className="space-y-12">
              {sections.map((section, index) => (
                <div
                  key={section.title + index}
                  className={`grid gap-8 items-center my-20 ${section.photo ? 'md:grid-cols-2' : ''}`}
                >
                  {section.photo && (
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={section.photo}
                          alt={section.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    {section.title && (
                      <h2 className="text-[26px] font-bold mb-4 text-[#F5E6D3]">{section.title}</h2>
                    )}
                    <RichText value={section.content} className="text-[#D4D0BF]" />
                  </div>
                </div>
              ))}
            </section>

            {hasRichText(project.results) && (
              <div className="mt-16">
                <Callout
                  icon={<Trophy className="w-6 h-6 text-[#F5E6D3]" />}
                  title="Results"
                  accent={accent}
                >
                  <RichText value={project.results} className="text-[#D4D0BF]" />
                </Callout>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer
        partnersTitle={footer.partnersTitle}
        copyrightTextBefore={footer.copyrightTextBefore}
        copyrightTextAfter={footer.copyrightTextAfter}
        partners={footer.partners}
      />
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider font-semibold text-[#63746b]">{label}</p>
      <p className="font-semibold text-[#f5e6d3]">{value}</p>
    </div>
  );
}

function Callout({
  icon,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  /** Tinted from the project's first category color. */
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-start gap-4 p-6 rounded-3xl border-4"
      style={{ backgroundColor: `${accent}20`, borderColor: accent }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: accent }}
      >
        {icon}
      </div>
      <div>
        <h2 className="text-[20px] font-bold mb-3 text-[#F5E6D3]">{title}</h2>
        <div className="leading-relaxed text-[#D4D0BF]">{children}</div>
      </div>
    </div>
  );
}
