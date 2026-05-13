import { Helmet } from 'react-helmet-async';
import { ContactCTA } from '@/contexts/ContactModalContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Users, BookOpen, Briefcase, BarChart3, Brain, Code, Layers, Eye, Github, Award, CheckCircle } from 'lucide-react';
import mentorImage from '@/assets/mentor-teaching.jpg';

const howItWorksSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How Rite Tutor's Online Coding Mentorship Works",
  "description": "From curiosity to capability through personalized online mentorship.",
  "step": [
    { "@type": "HowToStep", "name": "Logic-First Assessment", "text": "We assess how your child thinks through logic puzzles and pattern recognition." },
    { "@type": "HowToStep", "name": "Perfect Mentor Matching", "text": "We match your child with an ideal mentor based on learning style and personality." },
    { "@type": "HowToStep", "name": "Three-Pillar Learning", "text": "Logic, Syntax, and Product-based learning framework." },
    { "@type": "HowToStep", "name": "Portfolio Development", "text": "Students build professional Junior CTO portfolios." }
  ]
};

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How It Works | From Curiosity to Capability | Rite Tutor</title>
        <meta name="description" content="Discover how Rite Tutor transforms kids into logical thinkers through personalized online mentorship. Our four-step process builds Junior CTOs, not syntax memorizers." />
        <meta name="keywords" content="how online coding tutoring works, personalized coding education, logic-first assessment kids" />
        <link rel="canonical" href="https://www.ritetutor.com/how-it-works" />
        <script type="application/ld+json">{JSON.stringify(howItWorksSchema)}</script>
      </Helmet>
      
      <Layout>
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="container-wide">
            <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                From Curiosity to Capability:{' '}
                <span className="text-primary">The Rite Tutor Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                How We Transform Kids Into Logical Thinkers Through Personalized Online Mentorship
              </p>
            </motion.div>
          </div>
        </section>

        {/* Problem With Traditional Classes */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                The Problem With <span className="text-primary">Traditional Coding Classes</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Most coding programs follow a depressingly predictable pattern: Gather 15-20 children into a virtual classroom, assign everyone the same age-appropriate project, provide minimal individual attention, and hope struggling students somehow keep pace while gifted learners zone out from boredom.
                </p>
                <p>
                  The result? Children learn to copy code they don't understand, memorize syntax without grasping underlying logic, and develop the dangerous belief that programming is either impossibly confusing or trivially simple—depending on whether they fall behind or race ahead of the group average.
                </p>
                <p>
                  Rite Tutor operates from a fundamentally different model. We reject the factory approach entirely. Every student receives 100% of their mentor's attention, every single session. No competing for teacher time. No waiting for slower peers to catch up or feeling pressured to move faster than comprehension allows. Just pure, focused mentorship calibrated to your child's exact skill level and learning pace.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Step 1: Logic-First Assessment */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                    <Search className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="text-5xl font-display font-bold text-primary/20">01</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The Logic-First Assessment</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    We don't start with "What grade are you in?" or "Have you coded before?" Those questions assume age correlates with ability and that prior exposure equals mastery. Both assumptions are demonstrably false.
                  </p>
                  <p>
                    Instead, our initial assessment focuses on how your child thinks. Through carefully designed logic puzzles, pattern recognition challenges, and problem decomposition exercises, we identify their current reasoning capabilities. A fourth-grader might demonstrate tenth-grade analytical thinking. A high schooler might need foundational work in algorithmic approaches.
                  </p>
                  <h3 className="text-xl font-bold text-foreground">What Makes Our Assessment Different</h3>
                  <p>
                    This assessment is friendly, low-pressure, and actually enjoyable. We're not testing your child—we're understanding them. How do they approach unfamiliar problems? Do they jump straight to solutions or plan systematically? Can they explain their thinking process?
                  </p>
                  <p>
                    For families anywhere in the world, this means no standardized placement tests that reduce your unique child to a generic skill bracket. The assessment happens online, on your schedule, with immediate feedback and personalized pathway recommendations.
                  </p>
                </div>
                <div className="mt-6">
                  <ContactCTA variant="hero" size="lg" className="group">
                      Take the Free Logic Assessment
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </ContactCTA>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Search className="w-32 h-32 text-primary/30" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Step 2: Perfect Mentor Matching */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div className="lg:order-2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="text-5xl font-display font-bold text-primary/20">02</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Perfect Mentor Matching</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Technical expertise alone doesn't create effective teaching. A mentor might be a brilliant developer but struggle to explain concepts to children. Another might excel at working with introverted analytical thinkers but clash with enthusiastic extroverts.
                  </p>
                  <p>That's why Rite Tutor invests significant effort in mentor-student matching. We consider:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> Learning style (visual vs. verbal, big-picture vs. detail-oriented)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> Personality compatibility</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> Communication preferences</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> Specific educational objectives</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> Scheduling needs across time zones</li>
                  </ul>
                  <p>The goal is creating a mentorship relationship where your child feels safe asking questions, comfortable admitting confusion, and excited to tackle challenging material.</p>
                </div>
              </motion.div>
              <motion.div className="lg:order-1" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img src={mentorImage} alt="Mentor matching process" className="rounded-2xl shadow-premium-lg" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Step 3: Three-Pillar Learning Framework */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Layers className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-5xl font-display font-bold text-primary/20">03</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The Three-Pillar Learning Framework</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div className="bg-background p-8 rounded-2xl shadow-lg border border-border" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <Brain className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Pillar 1: Logic (The Why)</h3>
                <p className="text-muted-foreground">
                  Before writing a single line of code, students must understand how to think algorithmically. We use visual, interactive platforms to build proportional reasoning, pattern recognition, and systematic problem decomposition. These aren't abstract exercises—they're the foundational thinking skills that make advanced programming intuitive rather than mystifying. Logic comes first. Always.
                </p>
              </motion.div>
              <motion.div className="bg-background p-8 rounded-2xl shadow-lg border border-border" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <Code className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Pillar 2: Syntax (The How)</h3>
                <p className="text-muted-foreground">
                  Rite Tutor teaches integrated coding from day one. Students learn HTML structure, CSS styling, and JavaScript functionality simultaneously through project-based builds. They don't memorize disconnected syntax—they orchestrate multiple technologies to create real web applications. This mirrors how professional developers actually work.
                </p>
              </motion.div>
              <motion.div className="bg-background p-8 rounded-2xl shadow-lg border border-border" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <Briefcase className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Pillar 3: Product (The What)</h3>
                <p className="text-muted-foreground">
                  Generic coding exercises teach syntax. Real projects teach thinking. Every Rite Tutor student builds a portfolio of functional applications—not tutorials they copied, but original creations that solve genuine problems. Every project gets published to professional version control, creating a documented history of growth.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Step 4: Junior CTO Portfolio */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-5xl font-display font-bold text-primary/20">04</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The Junior CTO Portfolio Development</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Traditional coding classes produce students who've completed courses. Rite Tutor produces students who've built things. There's a massive difference. As students progress, they develop what we call a "Junior CTO Portfolio"—a collection of increasingly sophisticated projects.
              </p>
              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Version control repositories with comprehensive documentation",
                  "Live-deployed websites and applications",
                  "Demo videos explaining technical decisions",
                  "Rite Tutor certifications documenting mastered skills",
                  "For advanced students: university credentials and professional certifications"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-lg text-muted-foreground mt-6">
                When college admissions officers review this portfolio alongside generic transcripts from traditional coding classes, the difference is stark. One demonstrates actual capability. The other proves attendance.
              </p>
              <div className="mt-8">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/blog" className="group">
                    See Student Portfolios
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Parent Visibility */}
        <section className="py-20 bg-foreground text-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                Parent Visibility:{' '}
                <span className="text-primary">The Transparency You Deserve</span>
              </h2>
              <div className="space-y-6 text-lg text-background/70">
                <p>
                  After every single session, parents receive detailed updates. Not vague summaries—specific breakdowns of what your child learned, where they struggled, breakthroughs they achieved, and what comes next.
                </p>
                <p>
                  Additionally, you have direct access to every platform we use. Want to review your child's version control history? It's available. Curious about analytics showing proficiency levels? Log in anytime. Interested in which courses they've completed? Check the dashboard.
                </p>
                <p>
                  This radical transparency serves multiple purposes: Ensures accountability, helps parents support learning at home, and builds trust through demonstrated results rather than marketing promises.
                </p>
                <p>
                  For families globally, this level of ongoing communication is revolutionary. You're never wondering whether your investment is working—you know, session by session.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Long-Term Pathway */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                The Long-Term Pathway:{' '}
                <span className="text-primary">From Logic Explorer to Tech Professional</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Rite Tutor isn't a short-term skill acquisition program—it's a multi-year educational partnership. Our structured learning pathways accommodate students from age six through fifteen, adapting complexity and pacing to match developmental progression.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-card p-6 rounded-2xl border border-border">
                    <h4 className="font-bold mb-2">Younger Students (Ages 6-8)</h4>
                    <p className="text-sm">Focus on play-with-purpose logic development, building pattern recognition and sequential thinking through engaging visual exercises.</p>
                  </div>
                  <div className="bg-card p-6 rounded-2xl border border-border">
                    <h4 className="font-bold mb-2">Mid-Range Students (Ages 9-11)</h4>
                    <p className="text-sm">Transition from block-based coding concepts to text-based languages, developing debugging resilience and project planning capabilities.</p>
                  </div>
                  <div className="bg-card p-6 rounded-2xl border border-border">
                    <h4 className="font-bold mb-2">Advanced Students (Ages 12-15)</h4>
                    <p className="text-sm">Pursue professional-level certifications, college credits, and sophisticated full-stack development.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Getting Started CTA */}
        <section className="py-20 bg-primary">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary-foreground">
                Book Your Free Strategy Call Today
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                The first step is conversation, not commitment. No pressure. No sales scripts. Just honest dialogue about transforming your child's potential into excellence.
              </p>
              <ContactCTA variant="premium" size="xl" className="group">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </ContactCTA>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default HowItWorks;
