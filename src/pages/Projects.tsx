import { Helmet } from 'react-helmet-async';
import { ContactCTA } from '@/contexts/ContactModalContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Calendar, Heart, Github, Award, Lightbulb, CheckCircle, MapPin, Users, Brain, Target } from 'lucide-react';
import studentProject from '@/assets/student-project.jpg';

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Student Coding Projects",
  "description": "Real-world software applications built by Rite Tutor students in Bloomington and nationwide.",
  "provider": { "@type": "Organization", "name": "Rite Tutor" }
};

const studentProjects = [
  {
    icon: Globe,
    title: "The Monroe County Cleanup Tracker",
    location: "Bloomington",
    age: "12-year-old",
    description: "A student noticed that local park cleanup efforts lacked coordination. Different volunteer groups duplicated work while other areas remained neglected. She built a web application that maps cleanup locations, tracks volunteer availability, and coordinates efforts efficiently. The Monroe County Parks Department now uses her application. This project demonstrated not just coding ability but civic engagement, systems thinking, and genuine impact."
  },
  {
    icon: Calendar,
    title: "The Academic Traffic Light System",
    location: "Bedford",
    age: "14-year-old",
    description: "A student struggled with homework organization across seven classes. He created a personal dashboard using color-coded priority indicators—green for completed, yellow for approaching deadlines, red for urgent tasks. The system integrates with his school calendar and sends automated reminders. His grades improved dramatically. More importantly, he demonstrated the ability to identify personal challenges and engineer technical solutions."
  },
  {
    icon: Heart,
    title: "The Mental Wellness Companion",
    location: "Martinsville",
    age: "15-year-old",
    description: "A student noticed increasing stress among peers. She built a rule-based chatbot that suggests evidence-based coping strategies—breathing exercises, mindfulness techniques, journal prompts—based on user-reported stress levels. Her project combined technical skill with emotional intelligence and genuine care for community wellbeing."
  },
  {
    icon: MapPin,
    title: "The Local Business Directory",
    location: "Ellettsville",
    age: "13-year-old",
    description: "A student observed that small local businesses struggled with online presence. He created a searchable directory with integrated Google Maps, business hours, contact information, and customer reviews. Local chambers of commerce expressed interest in scaling the project. This demonstrated market research, user experience design, database management, and entrepreneurial thinking."
  }
];

const transferableSkills = [
  { icon: Brain, title: "Systems Thinking", description: "Understanding how components interact within larger ecosystems" },
  { icon: Target, title: "Project Management", description: "Breaking large objectives into achievable milestones with realistic timelines" },
  { icon: Users, title: "Communication", description: "Articulating technical concepts to non-technical audiences through documentation and presentations" },
  { icon: Lightbulb, title: "Debugging Resilience", description: "Viewing failures as data rather than defeats—perhaps the most valuable professional skill" }
];

const scholarshipAdvantages = [
  "Concrete evidence of solving community problems through technology",
  "Professional GitHub portfolios demonstrating sustained effort over years",
  "University-verified credentials from Harvard CS50, IBM, or MIT programs",
  "Demo Day videos articulating complex technical decisions clearly",
  "Essay material featuring specific challenges overcome and genuine growth narratives"
];

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Student Projects & Impact | Real Solutions, Real Results | Rite Tutor</title>
        <meta name="description" content="See how Rite Tutor students build real-world applications that solve genuine problems. From Monroe County cleanup trackers to mental wellness companions." />
        <meta name="keywords" content="student coding portfolio, coding projects for kids, community service projects, project-based learning" />
        <link rel="canonical" href="https://www.ritetutor.com/projects" />
        <script type="application/ld+json">{JSON.stringify(projectsSchema)}</script>
      </Helmet>
      
      <Layout>
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="container-wide">
            <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Don't Just Learn Theory—{' '}
                <span className="text-primary">Build Solutions That Matter</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Real Students. Real Projects. Real Impact in Bloomington and Beyond.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Most Classes Fail */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Why Most Coding Classes Fail to Deliver <span className="text-primary">Real-World Skills</span>
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Traditional coding education follows a predictable and broken pattern: Students complete tutorials, copy pre-made projects, and collect certificates of completion without ever building anything original. They learn to follow instructions but not to create solutions.
                  </p>
                  <p>
                    Rite Tutor operates from radically different principles. From day one—whether students are in Bloomington, Bedford, Ellettsville, or anywhere nationwide—we challenge learners to identify genuine problems in their communities and build functional solutions.
                  </p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img src={studentProject} alt="Student showing their coding project" className="rounded-2xl shadow-premium-lg" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Real Student Projects */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Real Student Projects: <span className="text-primary">Evidence of Excellence</span>
              </h2>
              <p className="text-lg text-muted-foreground">These aren't hypothetical examples. They're actual projects completed by Rite Tutor students.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {studentProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="bg-background p-8 rounded-2xl shadow-lg border border-border"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm text-primary font-semibold">{project.age} from {project.location}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Portfolio */}
        <section className="py-20 bg-foreground text-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                The GitHub Portfolio:{' '}
                <span className="text-primary">Your Child's Professional Resume</span>
              </h2>
              <p className="text-lg text-background/70 mb-8">
                Every Rite Tutor student builds a professional GitHub profile from their first project. A GitHub profile with consistent commit history, increasing project sophistication, and professional documentation tells a compelling story that generic test scores cannot match. It demonstrates:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Consistent commitment over years, not sporadic weekend workshops",
                  "Resilience through debugging (visible in commit messages and iterations)",
                  "Progressive skill development from basic HTML to complex full-stack applications",
                  "Professional practices like version control, documentation, and code organization",
                  "Genuine passion evident through voluntary contributions and personal projects"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-background/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Transferable Skills */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Beyond Coding: <span className="text-primary">Transferable Professional Skills</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transferableSkills.map((skill, index) => (
                <motion.div key={skill.title} className="bg-card p-6 rounded-2xl border border-border text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <skill.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Scholarship Advantage */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                The Scholarship Advantage:{' '}
                <span className="text-primary">Standing Out in Competitive Applications</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Thousands of students apply for competitive scholarships with similar GPAs, identical standardized test scores, and indistinguishable extracurricular activities. A Rite Tutor student's application includes:
              </p>
              <div className="space-y-3">
                {scholarshipAdvantages.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-background p-4 rounded-xl border border-border">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary-foreground">
                Start Building Your Child's Portfolio Today
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                The question isn't whether your child can build impressive projects—it's whether you're ready to invest in education that produces evidence of excellence rather than empty certificates of completion.
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

export default Projects;
