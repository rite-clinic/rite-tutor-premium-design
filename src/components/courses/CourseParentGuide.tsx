import { Link } from 'react-router-dom';
import { ContactCTA } from '@/contexts/ContactModalContext';
import { courseGuidance } from '@/lib/courseContent';
import type { Course } from '@/services/courseService';

export function CourseParentGuide({ course }: { course: Course }) {
  const guide = courseGuidance(course);
  return <section className="py-16 bg-card"><div className="container-wide max-w-4xl space-y-8">
    <div><h2 className="font-display text-3xl font-bold mb-4">Is this course right for your child?</h2><p>{guide.audience}</p></div>
    <div><h3 className="text-xl font-bold mb-3">Starting level and prerequisites</h3><p>{guide.startingPoint}</p></div>
    <div><h3 className="text-xl font-bold mb-3">An example learning activity</h3><p>{guide.activity} This illustrates a possible activity, not a guaranteed project or result.</p></div>
    <div><h3 className="text-xl font-bold mb-3">Learning goals</h3><p>{guide.goal} Progress depends on the starting point, practice and learning needs.</p></div>
    <div><h3 className="text-xl font-bold mb-3">How do online lessons work?</h3><p>One-to-one lessons give students time to ask questions, try examples and explain their reasoning. Discuss the online setup, lesson arrangements and availability during your consultation.</p></div>
    <div><h3 className="text-xl font-bold mb-3">How can parents follow progress?</h3><p>Agree with the team on how progress will be communicated. Useful questions include what your child can explain independently, where guidance is still needed and what to practice next.</p></div>
    <div><h3 className="text-xl font-bold mb-3">Can school tutoring follow our curriculum?</h3><p>Share your current unit and school requirements. School support can follow that sequence while adapting the pace and revisiting foundations. Coding and AI enrichment can follow the published course topics.</p></div>
    <ContactCTA variant="hero" size="lg">Ask About This Course</ContactCTA>
    <p><Link className="underline" to="/blogs/choose-online-tutor-parent-checklist">Use the parent checklist for choosing online tutoring</Link> · <Link className="underline" to="/learning-plans">Explore learning plans</Link></p>
  </div></section>;
}
