import { DEFAULT_CATEGORY_SCHEME } from './category-colors';
import type { AboutData, FooterData, HeaderData, HeroData, Project, SiteSettings } from './types';

export const MOCK_ABOUT: AboutData = {
  title: 'Designing for a',
  subtitle: 'Sustainable Future',
  description: `Hi, I'm a passionate UI/UX designer with a deep love for nature and sustainability. My mission is to create beautiful, intuitive digital experiences that not only delight users but also promote environmental consciousness.

With over 5 years of experience in the design industry, I specialize in creating eco-friendly brand identities, user-centered interfaces, and engaging visual content. Every project I work on is approached with mindfulness and respect for our planet.`,
  tag: 'UI/UX Designer & Eco Advocate',
  tags: ['UI/UX Design', 'Branding', 'Illustration', 'Sustainability', 'Web Design'],
  cvUrl: '',
  photoUrl: '',
  availableForWork: true,
};

export const MOCK_HERO: HeroData = {
  title: 'SOMETHING',
  subtitle: 'AMAZING',
  description:
    'Creating beautiful, sustainable digital experiences that make a positive impact on our planet and inspire change.',
  ctaPrimaryLabel: 'My Work',
  ctaSecondaryLabel: 'Get in Touch',
  imageDesktopUrl: '',
  imageTabletUrl: '',
  imageMobileUrl: '',
};

export const MOCK_HEADER: HeaderData = {
  brandName: 'EcoDesign',
  logoUrl: '',
};

export const MOCK_SITE_SETTINGS: SiteSettings = {
  title: 'Get in Touch',
  subtitle:
    "Have a project in mind? I'd love to hear about it. Let's create something beautiful and sustainable together.",
  email: 'hello@ecodesigner.com',
  phone: '+1 (555) 123-4567',
  linkedinUrl: 'https://linkedin.com',
};

export const MOCK_FOOTER: FooterData = {
  partnersTitle: 'Partners and clients',
  copyrightTextBefore: '© {year} EcoDesign Portfolio. Crafted with',
  copyrightTextAfter: 'for our planet',
  partners: [
    { name: 'EcoLeaf Solutions' },
    { name: 'GreenTech Inc' },
    { name: 'NatureFirst Co' },
    { name: 'BioPure' },
    { name: 'EarthCare' },
    { name: 'Sustainable Living' },
    { name: 'Green Horizon' },
    { name: 'Eco Ventures' },
    { name: 'Pure Planet' },
    { name: 'Renewable World' },
  ],
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'green-energy-app',
    title: 'Green Energy App',
    categories: [{ name: 'UI UX Design', ...DEFAULT_CATEGORY_SCHEME }],
    image:
      'https://images.unsplash.com/photo-1695548487486-3649bfc8dd9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHdlYiUyMGRlc2lnbiUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc3MzMwMTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Mobile app for tracking renewable energy consumption',
    software: ['Figma', 'Adobe XD', 'Sketch'],
    buttonTitle: 'View Prototype',
    buttonUrl: 'https://figma.com',
    dateAndDuration: 'January 2024 — 3 months',
    role: 'Lead UI/UX Designer',
    equipe: '2 designers, 3 developers',
    clientName: ['GreenTech Solutions', 'EcoEnergy Corp'],
    mission:
      'Create an intuitive mobile application that empowers users to monitor and optimize their renewable energy usage, promoting sustainable living through data-driven insights.',
    results:
      'Launched successfully with 10K+ downloads in the first month. Users reported 25% reduction in energy waste and 95% satisfaction rate.',
    phases: [
      {
        title: 'User Research',
        description:
          'Conducted interviews with 50+ eco-conscious users to understand their energy tracking needs and pain points.',
      },
      {
        title: 'Information Architecture',
        description:
          'Structured complex energy data into digestible, actionable insights with clear visual hierarchy.',
      },
      {
        title: 'UI Design',
        description:
          'Created a calming green interface with intuitive graphs and real-time energy consumption displays.',
      },
      {
        title: 'Prototype Testing',
        description:
          'Tested interactive prototype with target users, achieving 92% task completion rate.',
      },
    ],
    sections: [
      {
        title: 'Discovery & Research',
        content:
          'We started with extensive user research to understand the needs and pain points of environmentally conscious energy consumers. Through interviews and surveys, we identified key opportunities for creating a meaningful tracking experience.',
        photo:
          'https://images.unsplash.com/photo-1693044216415-e2c1d759ed62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcmVzZWFyY2glMjBpbnRlcnZpZXclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzczMjIwMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Design System',
        content:
          "Developed a comprehensive design system with eco-friendly color palettes, sustainable iconography, and accessible typography that reflects the brand's commitment to environmental responsibility.",
        photo:
          'https://images.unsplash.com/photo-1562601555-513820e5d0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjB1aSUyMGNvbXBvbmVudHN8ZW58MXx8fHwxNzczMzAxODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'User Testing',
        content:
          'Conducted multiple rounds of usability testing with target users to refine the interface and ensure an intuitive experience. Feedback was incorporated iteratively to optimize the final design.',
        photo:
          'https://images.unsplash.com/photo-1531813119282-cd4d545af976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2FiaWxpdHklMjB0ZXN0aW5nJTIwdXNlciUyMGV4cGVyaWVuY2V8ZW58MXx8fHwxNzczMzAxODY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    id: '2',
    slug: 'nature-illustration-series',
    title: 'Nature Illustration Series',
    categories: [{ name: 'Illustration', ...DEFAULT_CATEGORY_SCHEME }],
    image:
      'https://images.unsplash.com/photo-1633081528845-1c0b71d8a010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBpbGx1c3RyYXRpb24lMjBhcnR3b3JrfGVufDF8fHx8MTc3MzI3MjEyMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    slug: 'eco-brand-identity',
    title: 'Eco Brand Identity',
    categories: [{ name: 'Graphic', ...DEFAULT_CATEGORY_SCHEME }],
    image:
      'https://images.unsplash.com/photo-1549718206-ddba4e8391a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwYnJhbmRpbmclMjBwYWNrYWdpbmclMjBncmVlbnxlbnwxfHx8fDE3NzMzMDE2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Complete branding for sustainable fashion company',
    software: ['Illustrator', 'Photoshop'],
    buttonTitle: 'View Brand Guide',
    buttonUrl: 'https://behance.net',
    dateAndDuration: 'February 2024 — 2 months',
    role: 'Brand & Visual Designer',
    equipe: 'Solo project',
    clientName: ['EcoWear Fashion'],
    mission:
      'Design a cohesive brand identity that communicates sustainability, elegance, and environmental consciousness for a new eco-friendly fashion brand.',
    results:
      'Brand identity successfully launched across all touchpoints. Client saw 40% increase in brand recognition and positive customer feedback on sustainable packaging.',
    sections: [
      {
        title: 'Brand Strategy',
        content:
          'Developed a comprehensive brand strategy that positions EcoWear as a leader in sustainable fashion, emphasizing natural materials and ethical production.',
        photo:
          'https://images.unsplash.com/photo-1695548487486-3649bfc8dd9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGJyYW5kaW5nJTIwbW9ja3VwfGVufDF8fHx8MTc3MzMwMTg2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Visual Identity',
        content:
          "Created a sophisticated visual language with earthy tones, organic shapes, and minimalist typography that reflects the brand's commitment to sustainability.",
        photo:
          'https://images.unsplash.com/photo-1562601555-513820e5d0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjB1aSUyMGNvbXBvbmVudHN8ZW58MXx8fHwxNzczMzAxODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    id: '4',
    slug: 'sustainable-shopping-platform',
    title: 'Sustainable Shopping Platform',
    categories: [{ name: 'UI UX Design', ...DEFAULT_CATEGORY_SCHEME }],
    image:
      'https://images.unsplash.com/photo-1725267196915-7700df784ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYXBwJTIwaW50ZXJmYWNlJTIwZGVzaWdufGVufDF8fHx8MTc3MzMwMTY0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'E-commerce platform for eco-friendly products',
    software: ['Figma', 'Framer', 'Principle'],
    buttonTitle: 'Live Demo',
    buttonUrl: 'https://example.com',
    dateAndDuration: 'March 2024 — 6 months',
    role: 'Product Designer',
    equipe: '4 designers, 6 developers',
    clientName: ['GreenMarket Co.'],
    mission:
      'Design and prototype a user-friendly e-commerce platform that makes discovering and purchasing sustainable products easy and enjoyable.',
    results:
      'Platform launched with 500+ sustainable products. Achieved 35% conversion rate and received industry recognition for best sustainable UX design.',
    sections: [
      {
        title: 'Wireframing & Prototyping',
        content:
          'Created detailed wireframes and interactive prototypes to map out the user journey from product discovery to checkout, ensuring a seamless experience.',
        photo:
          'https://images.unsplash.com/photo-1685463894505-d33387aa8430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2hpbmclMjBkZXNpZ24lMjBwcm9jZXNzfGVufDF8fHx8MTc3MzMwMTg2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Mobile First Design',
        content:
          'Designed with a mobile-first approach, ensuring that the shopping experience is optimized for smartphones and tablets while maintaining desktop functionality.',
        photo:
          'https://images.unsplash.com/photo-1748801583967-3038967d7279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBwcm90b3R5cGUlMjBkZXNpZ258ZW58MXx8fHwxNzczMzAxODY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    id: '5',
    slug: 'wildlife-portrait-collection',
    title: 'Wildlife Portrait Collection',
    categories: [{ name: 'Illustration', ...DEFAULT_CATEGORY_SCHEME }],
    image:
      'https://images.unsplash.com/photo-1633081528845-1c0b71d8a010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBpbGx1c3RyYXRpb24lMjBhcnR3b3JrfGVufDF8fHx8MTc3MzI3MjEyMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    slug: 'zero-waste-campaign',
    title: 'Zero Waste Campaign',
    categories: [{ name: 'Graphic', ...DEFAULT_CATEGORY_SCHEME }],
    image:
      'https://images.unsplash.com/photo-1745302133222-076de505778f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGVudmlyb25tZW50YWwlMjBncmFwaGljJTIwZGVzaWdufGVufDF8fHx8MTc3MzMwMTY0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Social media campaign promoting zero waste lifestyle',
    software: ['Photoshop', 'Illustrator', 'InDesign'],
    buttonTitle: 'See Campaign',
    buttonUrl: 'https://dribbble.com',
    dateAndDuration: '3 weeks',
  },
  {
    id: '7',
    slug: 'carbon-footprint-tracker',
    title: 'Carbon Footprint Tracker',
    categories: [{ name: 'UI UX Design', ...DEFAULT_CATEGORY_SCHEME }],
    image:
      'https://images.unsplash.com/photo-1695548487486-3649bfc8dd9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHdlYiUyMGRlc2lnbiUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc3MzMwMTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Web app for personal carbon footprint monitoring',
    software: ['Figma', 'Adobe XD'],
    buttonTitle: 'Try it Out',
    buttonUrl: 'https://example.com/demo',
    dateAndDuration: '4 months',
  },
  {
    id: '8',
    slug: 'botanical-illustration-set',
    title: 'Botanical Illustration Set',
    categories: [{ name: 'Illustration', ...DEFAULT_CATEGORY_SCHEME }],
    image:
      'https://images.unsplash.com/photo-1633081528845-1c0b71d8a010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBpbGx1c3RyYXRpb24lMjBhcnR3b3JrfGVufDF8fHx8MTc3MzI3MjEyMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '9',
    slug: 'organic-food-packaging',
    title: 'Organic Food Packaging',
    categories: [{ name: 'Graphic', ...DEFAULT_CATEGORY_SCHEME }],
    image:
      'https://images.unsplash.com/photo-1676474509670-f1978e55fa3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHByb2R1Y3QlMjBkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzczMzAxNjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Sustainable packaging design for organic food brand',
    software: ['Illustrator', 'Photoshop', 'Dimension'],
    buttonTitle: 'View Gallery',
    buttonUrl: 'https://behance.net/gallery',
    dateAndDuration: '6 weeks',
  },
];
