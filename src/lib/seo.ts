import brand from '@/data/brand.json';
export const SITE_URL = brand.origin;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).href;
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
export const plainDescription = (value: string, limit = 170) => {
  const text = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  const shortened = text.slice(0, limit - 1);
  return `${shortened.slice(0, shortened.lastIndexOf(" "))}…`;
};
export const isoDate = (value: string) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return new Date(`${value} 00:00:00 UTC`).toISOString().slice(0, 10);
};

export const organizationSchema = {
  "@type": "EducationalOrganization",
  "@id": ORGANIZATION_ID,
  name: brand.name,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: absoluteUrl(brand.logo) },
  image: absoluteUrl(brand.sharingImage),
  description: "One-to-one online tutoring across school subjects and grades, with coding, AI, math, and personalized learning for families in the United States and worldwide.",
  telephone: brand.telephone,
  email: brand.email,
  areaServed: [
    { "@type": "City", name: "Bloomington, Indiana" },
    { "@type": "AdministrativeArea", name: "Indiana" },
    { "@type": "Country", name: "United States" },
    { "@type": "Place", name: "Worldwide" },
  ],
  contactPoint: { "@type": "ContactPoint", contactType: "enrollment", telephone: brand.telephone, email: brand.email },
};

export const websiteSchema = {
  "@type": "WebSite", "@id": WEBSITE_ID, name: brand.name,
  url: `${SITE_URL}/`, publisher: { "@id": ORGANIZATION_ID }, inLanguage: "en",
};

export const pageMetadata: Record<string, { title: string; description: string; label: string }> = {
  "/": { title: "Rite Tutor | Online Math, Coding & School Tutoring", description: "One-to-one online tutoring across school subjects and grades, plus coding and AI. Serving Bloomington, Indiana, US and worldwide families. Book a free call.", label: "Home" },
  "/about-us": { title: "About Rite Tutor | Personalized Online Learning for Kids", description: "Learn how Rite Tutor approaches one-to-one mentorship, skill-based learning, coding, and academic support for children and families worldwide.", label: "About Us" },
  "/how-it-works": { title: "How Online Tutoring Works | Free Strategy Call | Rite Tutor", description: "Start with a free strategy call, discuss your child's learning needs, and plan one-to-one online lessons with Rite Tutor. See the steps and what to expect.", label: "How It Works" },
  "/learning-pathways": { title: "Kids' Coding Learning Pathways | Beginner to AI | Rite Tutor", description: "Explore skill-based coding pathways from logic foundations to Python, web development, and advanced projects. Find your child's next step with Rite Tutor.", label: "Learning Pathways" },
  "/courses": { title: "Online Classes for Kids | Math, Python, Coding & AI | Rite Tutor", description: "Browse Rite Tutor's live course catalog: Python, AI, web development, algebra, geometry, precalculus, and logic. Ask about tutoring for any school subject.", label: "Courses" },
  "/projects": { title: "Coding Project Ideas & Learning Activities | Rite Tutor", description: "Explore illustrative Python, web development and React activities with Rite Tutor. See how explaining, testing and reviewing code can support learning.", label: "Student Projects" },
  "/learning-plans": { title: "Online Tutoring Learning Plans | Rite Tutor", description: "Plan one-to-one online school tutoring or coding enrichment around your child’s starting point, curriculum, and goals. Request a free consultation.", label: "Learning Plans" },
  "/services": { title: "Online Tutoring Services | All Subjects, Math & Coding | Rite Tutor", description: "One-to-one online tutoring across school subjects and grades, alongside coding, math, and AI. Find support for your child's goals with Rite Tutor.", label: "Services" },
  "/contact": { title: "Contact Rite Tutor | Book a Free Online Tutoring Consultation", description: "Talk with Rite Tutor about your child's subject, grade, and learning goals. Book a free strategy call for online tutoring in Indiana, the US, or worldwide.", label: "Contact" },
  "/blogs": { title: "Parent Guides to Tutoring, Math, Coding & AI | Rite Tutor Blog", description: "Practical parent guides to online tutoring, math understanding, coding readiness, and AI, with free printable checklists from Rite Tutor.", label: "Blog" },
  "/online-tutoring-bloomington-indiana": { title: "Online Tutoring in Bloomington, Indiana | Rite Tutor", description: "Online tutoring for Bloomington, Ellettsville, Bedford, and Indiana families. School subjects, all grades, math, coding, and AI. Book a free strategy call.", label: "Bloomington & Indiana" },
  "/online-tutoring-all-subjects": { title: "Online Tutoring for All School Subjects & Grades | Rite Tutor", description: "Get one-to-one online support for school subjects and grades, including math, science, English, and coding. Discuss curriculum, goals, and tutor availability.", label: "All Subjects & Grades" },
};
