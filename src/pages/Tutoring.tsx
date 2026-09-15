import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ContactCTA } from "@/contexts/ContactModalContext";
import { ArrowRight, BookOpen, Globe, Laptop, MessageCircle } from "lucide-react";

const subjects = [
  { title: "Math", text: "Build understanding in your current math course, from foundational skills to algebra, geometry, and precalculus.", href: "/courses", label: "Browse math courses" },
  { title: "Science", text: "Discuss the concepts, school assignments, and curriculum your child needs help with. Tell us the subject and grade so we can plan suitable support.", href: "/contact", label: "Discuss science tutoring" },
  { title: "English and school subjects", text: "Ask about reading, writing, English, and other subjects on your child's timetable. Share the learning goals and school requirements when you contact us.", href: "/contact", label: "Ask about your subject" },
  { title: "Coding and AI", text: "Explore Python, web development, React, logic, and introductory AI through practical projects and one-to-one guidance.", href: "/courses", label: "Explore coding and AI courses" },
];

function SubjectCards() {
  return <div className="grid md:grid-cols-2 gap-6">{subjects.map(subject => <div key={subject.title} className="rounded-2xl bg-card border border-border p-6">
    <h3 className="text-xl font-display font-bold mb-3">{subject.title}</h3>
    <p className="text-muted-foreground leading-relaxed mb-5">{subject.text}</p>
    <Link className="inline-flex items-center gap-2 font-semibold underline underline-offset-4" to={subject.href}>{subject.label}<ArrowRight className="h-4 w-4" /></Link>
  </div>)}</div>;
}

function Questions({ items }: { items: { q: string; a: string }[] }) {
  return <section className="py-16 bg-card"><div className="container-wide max-w-4xl"><h2 className="text-3xl font-display font-bold mb-8">Questions parents ask</h2><div className="space-y-8">{items.map(item => <div key={item.q}><h3 className="text-xl font-bold mb-2">{item.q}</h3><p className="text-muted-foreground leading-relaxed">{item.a}</p></div>)}</div></div></section>;
}

function NextStep() {
  return <section className="py-16 bg-primary"><div className="container-wide max-w-3xl text-center"><h2 className="text-3xl font-display font-bold mb-4">Tell us what your child needs</h2><p className="mb-7 leading-relaxed">Share the subject, grade, school curriculum, learning goal, and preferred lesson times. A free strategy call is the first step toward a suitable tutoring plan.</p><ContactCTA variant="premium" size="lg">Book Your Free Strategy Call</ContactCTA><p className="mt-5 text-sm">Or call <a className="underline" href="tel:+19294218055">+1 (929) 421-8055</a> or email <a className="underline" href="mailto:hello@ritetutor.com">hello@ritetutor.com</a>.</p></div></section>;
}

export function AllSubjects() {
  return <Layout>
    <section className="py-16 md:py-24 bg-card"><div className="container-wide max-w-4xl"><p className="font-semibold mb-4">Rite Tutor · One-to-one online learning</p><h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Online tutoring for all school subjects and grades</h1><p className="text-lg text-muted-foreground leading-relaxed mb-7">Get support with the subjects your child studies at school, or explore something new through coding and AI. Rite Tutor offers personalized online tutoring for families across the United States and worldwide. We start with your child's current understanding, curriculum, and goals.</p><ContactCTA variant="hero" size="lg">Find Support for Your Child</ContactCTA></div></section>
    <section className="py-16"><div className="container-wide max-w-6xl"><h2 className="text-3xl font-display font-bold mb-4">School support and skills beyond the classroom</h2><p className="text-muted-foreground mb-8 max-w-3xl">Our published courses cover coding, AI, logic, and math. For any other school subject or grade, contact us to discuss the curriculum, tutor availability, and the right plan before enrolling.</p><SubjectCards /></div></section>
    <section className="py-16 bg-card"><div className="container-wide max-w-4xl"><h2 className="text-3xl font-display font-bold mb-7">A plan built around the learner</h2><div className="space-y-7">
      <div><h3 className="text-xl font-bold mb-2">Elementary school</h3><p className="text-muted-foreground leading-relaxed">Tell us which foundations your child is building and what makes learning difficult or enjoyable. Early support can focus on understanding the task, explaining an idea, and practicing with guidance.</p></div>
      <div><h3 className="text-xl font-bold mb-2">Middle and high school</h3><p className="text-muted-foreground leading-relaxed">Bring the course name, recent work, and upcoming learning goals. We can discuss gaps in understanding, challenging topics, and a lesson plan that fits the school curriculum.</p></div>
      <div><h3 className="text-xl font-bold mb-2">Enrichment and coding</h3><p className="text-muted-foreground leading-relaxed">For children ready for an additional challenge, explore practical coding projects and skill-based <Link className="underline" to="/learning-pathways">learning pathways</Link>. Placement depends on readiness and prior experience.</p></div>
    </div></div></section>
    <section className="py-16"><div className="container-wide max-w-4xl"><h2 className="text-3xl font-display font-bold mb-5">From the first conversation to regular lessons</h2><ol className="list-decimal pl-6 space-y-4 text-muted-foreground"><li>Share your child's subject, grade, curriculum, and specific goals.</li><li>Discuss the current level, tutor fit, lesson format, and availability.</li><li>Agree on scheduling and pricing before starting.</li><li>Use lessons to practice, ask questions, and review progress together.</li></ol><p className="mt-6"><Link className="font-semibold underline" to="/how-it-works">See how Rite Tutor works</Link> · <Link className="font-semibold underline" to="/pricing">Explore lesson options</Link></p></div></section>
    <Questions items={[
      { q: "Can I ask about a subject that is not in the course catalog?", a: "Yes. Rite Tutor offers tutoring across school subjects and grades. Tell us the subject, curriculum, and goal so we can confirm the right tutor and availability." },
      { q: "Are lessons online or in person?", a: "Rite Tutor provides online lessons. Students join from home with a suitable device and internet connection; we do not offer in-person classes." },
      { q: "Can families outside the United States join?", a: "Yes. We serve families worldwide. Share your time zone and available times so we can discuss a workable schedule." },
      { q: "What does tutoring cost?", a: "The plan depends on the subject, lesson frequency, and learning needs. Discuss pricing and scheduling on a free strategy call before deciding whether to enroll." },
    ]} />
    <NextStep />
  </Layout>;
}

export function BloomingtonTutoring() {
  return <Layout>
    <section className="py-16 md:py-24 bg-card"><div className="container-wide max-w-4xl"><p className="font-semibold mb-4">Bloomington · Monroe County · Indiana</p><h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Online tutoring for Bloomington, Indiana families</h1><p className="text-lg text-muted-foreground leading-relaxed mb-7">Find one-to-one support for your child's school subjects, math, coding, or AI learning. Rite Tutor connects Bloomington families with online tutoring from home, with a plan based on the child's grade, curriculum, and goals.</p><ContactCTA variant="hero" size="lg">Discuss Your Child's Learning Goals</ContactCTA></div></section>
    <section className="py-16"><div className="container-wide max-w-6xl"><h2 className="text-3xl font-display font-bold mb-5">Subjects and classes for your family</h2><p className="text-muted-foreground max-w-3xl mb-8">Ask about <Link className="underline" to="/online-tutoring-all-subjects">any school subject or grade</Link>, or browse our published math and coding courses. We will confirm curriculum fit and tutor availability with you.</p><SubjectCards /></div></section>
    <section className="py-16 bg-card"><div className="container-wide max-w-4xl"><h2 className="text-3xl font-display font-bold mb-5">Considering a tutor near you?</h2><p className="text-muted-foreground leading-relaxed mb-5">If you are comparing local or in-person tutoring in Bloomington, consider whether an online lesson could fit your family's routine. Rite Tutor is an online service: your child joins from home, and there is no classroom address or commute.</p><div className="grid sm:grid-cols-2 gap-6">{[
      { icon: Laptop, title: "Prepare a learning space", text: "Use a suitable computer, internet connection, and a quiet place to work. Confirm any software or materials needed for the chosen subject." },
      { icon: MessageCircle, title: "Share school expectations", text: "Tell us the course name, grade, curriculum, and topics your child is studying. Recent work can help guide the first discussion." },
      { icon: BookOpen, title: "Plan around the school week", text: "Share your preferred after-school or weekend times. We will discuss available lessons and confirm your time zone before booking." },
      { icon: Globe, title: "Learn from nearby towns too", text: "The same online format is available to families in Ellettsville, Bedford, Martinsville, Nashville, and elsewhere in Indiana." },
    ].map(item => <div key={item.title} className="rounded-2xl border border-border p-5"><item.icon className="h-6 w-6 mb-3" /><h3 className="font-bold text-lg mb-2">{item.title}</h3><p className="text-muted-foreground leading-relaxed">{item.text}</p></div>)}</div></div></section>
    <section className="py-16"><div className="container-wide max-w-4xl"><h2 className="text-3xl font-display font-bold mb-5">Compare tutoring options with confidence</h2><p className="text-muted-foreground leading-relaxed mb-6">Ask every provider about tutor consistency, teaching approach, progress updates, and what your child will be able to explain or do. Use our parent resources to prepare questions before committing.</p><ul className="space-y-4 font-semibold underline"><li><Link to="/blogs/choose-online-tutor-parent-checklist">How to choose an online tutor: a parent's checklist</Link></li><li><Link to="/blogs/algebra-1-readiness-checklist">Check the foundations before Algebra 1</Link></li><li><Link to="/blogs/coding-roadmap-kids-skill-not-age">Find a coding starting point by skill</Link></li></ul></div></section>
    <Questions items={[
      { q: "Do you have a tutoring center in Bloomington?", a: "No. Rite Tutor provides online tutoring, not in-person classes or a walk-in tutoring center. Bloomington and nearby families can join lessons from home." },
      { q: "Which areas of Indiana can use the service?", a: "Online lessons are available to families in Bloomington, Monroe County, Ellettsville, Bedford, Martinsville, Nashville, and across Indiana, subject to a suitable schedule and tutor availability." },
      { q: "Can you help with subjects besides coding?", a: "Yes. We offer tutoring across school subjects and grades. Tell us the subject and curriculum so we can discuss a suitable plan. The public course catalog also includes algebra, geometry, precalculus, and logic." },
      { q: "Is tutoring limited to Indiana?", a: "No. Rite Tutor serves families across the United States and worldwide through online lessons." },
    ]} />
    <NextStep />
  </Layout>;
}
