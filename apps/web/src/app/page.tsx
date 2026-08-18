import { AboutMe } from '@/components/AboutMe';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Work } from '@/components/Work';
import { getAbout, getFooter, getHeader, getHero, getProjects, getSiteSettings } from '@/lib/content';

export default async function HomePage() {
  const [projects, about, settings, hero, header, footer] = await Promise.all([
    getProjects(),
    getAbout(),
    getSiteSettings(),
    getHero(),
    getHeader(),
    getFooter(),
  ]);

  return (
    <>
      <Header header={header} />
      <Hero hero={hero} availableForWork={about.availableForWork} />
      <div id="work" className="bg-neutral-100 dark:bg-[#0C2723]">
        <Work projects={projects} />
      </div>
      <div id="about">
        <AboutMe
          title={about.title}
          subtitle={about.subtitle}
          description={about.description}
          tag={about.tag}
          tags={about.tags}
          cvUrl={about.cvUrl}
          photoUrl={about.photoUrl}
        />
      </div>
      <div id="contact">
        <Contact
          title={settings.title}
          subtitle={settings.subtitle}
          email={settings.email}
          phone={settings.phone}
          linkedinUrl={settings.linkedinUrl}
        />
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
