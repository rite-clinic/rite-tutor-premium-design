import { Helmet } from 'react-helmet-async';
import { ContactCTA } from '@/contexts/ContactModalContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Code, Trophy, CheckCircle, Brain, Globe } from 'lucide-react';

const pathwaysSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "Course", "position": 1, "name": "Logic Explorers (Foundations)", "description": "Visual logic development, computational thinking, and first coding concepts." },
    { "@type": "Course", "position": 2, "name": "Digital Builders (Intermediate)", "description": "Text-based programming, debugging resilience, and project-based learning." },
    { "@type": "Course", "position": 3, "name": "Junior CTOs (Advanced)", "description": "University-level coursework, professional certifications, and advanced project development." }
  ]
};

const pathways = [
  {
    icon: Rocket,
    title: "Pathway 1: Logic Explorers",
    subtitle: "Foundations",
    ages: "Typically ages 6-10 (skill-dependent—not age-restricted)",
    description: "This pathway is perfect for children who show curiosity about how technology works, enjoy puzzles and pattern recognition games, and ask \"why\" questions constantly.",
    phases: [
      { name: "Phase 1: Visual Logic Development", description: "Before touching code, students master how to think algorithmically through interactive visual platforms. They build proportional reasoning, pattern recognition, and problem decomposition skills. Think of this as learning musical scales before attempting compositions." },
      { name: "Phase 2: Introduction to Computational Thinking", description: "Students learn to break complex problems into manageable steps, identify patterns across different scenarios, and develop solutions that can be applied repeatedly. These are practical thinking tools students will use for life." },
      { name: "Phase 3: First Coding Concepts", description: "Using project-based learning, students create simple interactive applications. They're not following tutorials—they're building original projects that solve real problems they've identified." }
    ],
    outcomes: [
      "Approach unfamiliar problems systematically rather than randomly",
      "Explain their thinking process clearly to others",
      "Debug simple programs independently",
      "Build basic web applications using HTML and CSS",
      "Demonstrate genuine enthusiasm for creating rather than consuming technology"
    ],
    duration: "Typically 6-12 months",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code,
    title: "Pathway 2: Digital Builders",
    subtitle: "Intermediate",
    ages: "Typically ages 9-13 (skill-dependent)",
    description: "This transitional stage is where students build real applications, develop debugging resilience, and begin creating professional portfolios. It's where many students either develop confidence or learned helplessness, depending on instruction quality.",
    phases: [
      { name: "Advanced Web Development", description: "Students master HTML5, CSS3, and JavaScript, building responsive websites and interactive applications. They learn to orchestrate multiple technologies simultaneously." },
      { name: "Version Control & Portfolio", description: "Professional portfolio development begins in earnest. Students maintain version control repositories, document their projects, and build a visible record of growth." },
      { name: "Project-Based Mastery", description: "Students build increasingly sophisticated applications—from personal websites to community tools, sports analyzers to environmental trackers—based on their interests." }
    ],
    outcomes: [
      "Build responsive, interactive web applications independently",
      "Use version control professionally for all projects",
      "Debug complex multi-file programs systematically",
      "Explain technical concepts to non-technical audiences",
      "Maintain a growing portfolio of 10-20 documented projects"
    ],
    duration: "Typically 12-18 months",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Trophy,
    title: "Pathway 3: Junior CTOs",
    subtitle: "Advanced",
    ages: "Typically ages 12-15 (skill-dependent)",
    description: "The pinnacle of our pathway. Students don't just code—they architect solutions, manage development workflows, and earn professional credentials that carry real weight in college applications and early career opportunities.",
    phases: [
      { name: "University-Level Coursework", description: "Students work toward professional certifications and college credits through strategic integration with top-tier online education platforms. Our advanced students earn verified certificates from legendary university computer science courses." },
      { name: "Professional Certifications", description: "Beyond university coursework, we prepare students for industry-recognized professional certifications in full-stack development, data science, AI fundamentals, cloud computing, and mobile development." },
      { name: "Advanced Project Development", description: "Junior CTO students build sophisticated applications that get adopted by organizations, serve real users, demonstrate professional-level architecture, and include comprehensive testing and documentation." }
    ],
    outcomes: [
      "Earned 1-3 university-level computer science credentials",
      "Completed 2-5 professional certification programs",
      "Built 30-50 documented projects in their portfolio",
      "Developed presentation skills competitive for internships",
      "Created applications with measurable real-world impact"
    ],
    duration: "Typically 18-30 months",
    color: "from-primary to-yellow-500"
  }
];

const timelines = [
  { label: "Young Beginners (Ages 6-8, No Experience)", steps: ["6-12 months: Logic Explorers pathway", "12-24 months: Digital Builders pathway", "24-48 months: Junior CTO pathway (if desired)"] },
  { label: "Mid-Range Starters (Ages 9-11, Some Exposure)", steps: ["3-6 months: Accelerated Logic Explorers", "12-18 months: Digital Builders pathway", "18-36 months: Junior CTO pathway"] },
  { label: "Advanced Beginners (Ages 12-15, Motivated & Ready)", steps: ["3-6 months: Foundations assessment & gap-filling", "6-12 months: Digital Builders pathway", "12-24 months: Junior CTO pathway with university credentials"] }
];

const LearningPathways = () => {
  return (
    <>
      <Helmet>
        <title>Learning Pathways | From Logic Explorer to Junior CTO | Rite Tutor</title>
        <meta name="description" content="Three skill-based pathways that students progress through based on demonstrated mastery, not calendar age. From Logic Explorers to Digital Builders to Junior CTOs." />
        <meta name="keywords" content="coding curriculum for kids, computer science pathway, skill-based coding education, personalized learning path" />
        <link rel="canonical" href="https://www.ritetutor.com/learning-pathways" />
        <script type="application/ld+json">{JSON.stringify(pathwaysSchema)}</script>
      </Helmet>
      
      <Layout>
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Your Child's Personalized Journey:{' '}
                <span className="text-primary">From Logic Explorer to Junior CTO</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Three skill-based pathways that students progress through based on demonstrated mastery, not calendar age.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Most coding programs force children into rigid age-based tracks. Seven-year-olds get "beginner" material. Fourteen-year-olds get "advanced" content. Your child's actual capability? Irrelevant.
                </p>
                <p>
                  Rite Tutor rejects this completely. We've developed three skill-based pathways that students progress through based on demonstrated mastery, not calendar age. A gifted nine-year-old might work in our advanced pathway. A fourteen-year-old who needs foundational support starts where they actually are, not where society expects them to be.
                </p>
                <p className="font-semibold text-foreground">
                  This is education designed around your child—not around administrative convenience.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pathway Stages */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <div className="space-y-16">
              {pathways.map((pathway, index) => (
                <motion.div key={pathway.title} className="bg-background rounded-2xl overflow-hidden shadow-premium" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className={`h-2 bg-gradient-to-r ${pathway.color}`} />
                  <div className="p-8 lg:p-12">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <pathway.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold">{pathway.title}</h3>
                        <p className="text-primary font-semibold">{pathway.subtitle}</p>
                        <span className="text-sm text-muted-foreground">{pathway.ages}</span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-8">{pathway.description}</p>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold mb-4 text-lg">What Students Learn:</h4>
                        <div className="space-y-4">
                          {pathway.phases.map((phase) => (
                            <div key={phase.name} className="bg-card p-4 rounded-xl border border-border">
                              <h5 className="font-semibold text-sm mb-1">{phase.name}</h5>
                              <p className="text-xs text-muted-foreground">{phase.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-4 text-lg">Expected Outcomes ({pathway.duration}):</h4>
                        <ul className="space-y-3">
                          {pathway.outcomes.map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skill-Based Difference */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                The Skill-Based Difference:{' '}
                <span className="text-primary">Why This Matters</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-3 text-red-500">❌ Gifted Students in Traditional Programs</h3>
                  <p className="text-sm text-muted-foreground">Become bored and disengaged. When a nine-year-old masters concepts in three weeks but must wait twelve weeks for their age cohort to catch up, we lose their enthusiasm. Repeated boredom trains brilliant children to disengage from learning.</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-3 text-red-500">❌ Struggling Students in Traditional Programs</h3>
                  <p className="text-sm text-muted-foreground">Develop anxiety and learned helplessness. When a fourteen-year-old gets pushed through advanced material before mastering foundations, they internalize the belief that they're "just not good at coding." The truth is they're perfectly capable—the pacing was wrong.</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                Rite Tutor's skill-based pathways eliminate both problems. Every student progresses at their optimal pace, building genuine mastery rather than superficial familiarity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Progression Timeline */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
                Progression Timeline:{' '}
                <span className="text-primary">What to Expect</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {timelines.map((timeline) => (
                  <div key={timeline.label} className="bg-background p-6 rounded-2xl border border-border">
                    <h3 className="font-bold text-sm mb-4">{timeline.label}</h3>
                    <ul className="space-y-2">
                      {timeline.steps.map((step) => (
                        <li key={step} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                These timelines assume consistent weekly sessions. Students who pursue more intensive schedules (2-3 sessions weekly) progress faster. Those who need slower pacing extend timelines without stigma or pressure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Global Accessibility */}
        <section className="py-20 bg-foreground text-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Global Accessibility:{' '}
                <span className="text-primary">Learning From Anywhere</span>
              </h2>
              <p className="text-lg text-background/70 mb-6">
                Whether your family lives in the United States (all 50 states), Canada, United Kingdom, Australia, Singapore, UAE, Germany, France, Netherlands, India, Japan, or anywhere globally—these pathways are accessible. Our online model means students in small towns receive identical quality mentorship as those in major metropolitan areas.
              </p>
              <p className="text-lg text-background/70">
                Even within these structured pathways, we customize extensively. Two students in Digital Builders might be working on completely different projects based on their interests—one builds a sports statistics analyzer, another creates an environmental tracking app, a third develops a music playlist organizer. Same technical skills. Different applications. This is how we maintain engagement while building mastery.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary-foreground">
                Discover Your Child's Pathway
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                During your free strategy call, we'll assess your child's current capabilities, recommend the appropriate starting pathway, and map a realistic progression timeline. No pressure. No hard sell. Just honest conversation about your child's future.
              </p>
              <ContactCTA variant="premium" size="xl" className="group">
                  Book Your Free Strategy Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </ContactCTA>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default LearningPathways;
