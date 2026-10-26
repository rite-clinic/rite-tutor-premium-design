import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ContactCTA } from '@/contexts/ContactModalContext';

export type InformationSection = { heading: string; text: string; items?: string[] };
export function LearningInformation({ title, intro, sections }: { title: string; intro: string; sections: InformationSection[] }) {
  return <Layout>
    <section className="bg-card py-16 md:py-24"><div className="container-wide max-w-4xl">
      <p className="font-semibold text-primary mb-4">Rite Tutor · One-to-one online lessons</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{title}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">{intro}</p>
      <ContactCTA variant="hero" size="lg">Discuss Your Child’s Needs</ContactCTA>
    </div></section>
    {sections.map((section, index) => <section key={section.heading} className={`py-14 ${index % 2 ? 'bg-card' : 'bg-background'}`}><div className="container-wide max-w-4xl">
      <h2 className="font-display text-3xl font-bold mb-5">{section.heading}</h2>
      <p className="text-muted-foreground leading-relaxed">{section.text}</p>
      {section.items && <ul className="mt-5 list-disc pl-6 space-y-3">{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
    </div></section>)}
    <section className="py-14 bg-primary"><div className="container-wide max-w-4xl"><h2 className="font-display text-3xl font-bold mb-5">Choose your next step</h2>
      <div className="flex flex-wrap gap-6 mb-7"><Link className="underline font-semibold" to="/online-tutoring-all-subjects">School-subject tutoring</Link><Link className="underline font-semibold" to="/courses">Math, coding and AI courses</Link><Link className="underline font-semibold" to="/blogs">Guides for parents</Link></div>
      <ContactCTA variant="premium" size="lg">Request a Free Consultation</ContactCTA><p className="mt-4">Send an enquiry and our team will contact you to arrange a conversation. Submitting a request does not confirm an appointment.</p>
    </div></section>
  </Layout>;
}
