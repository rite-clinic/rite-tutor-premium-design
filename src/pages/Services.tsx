import { Helmet } from 'react-helmet-async';
import { ContactCTA } from '@/contexts/ContactModalContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Globe, Smartphone, Database, Gamepad2, Bot, Shield, Brain, Calculator, Palette, GraduationCap, Award, BookOpen } from 'lucide-react';

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "One-to-One Coding Mentorship Program",
  "description": "Personalized coding education from visual logic to professional development",
  "provider": { "@type": "EducationalOrganization", "name": "Rite Tutor" },
  "educationalLevel": "Beginner to Advanced",
  "teaches": ["Python Programming", "Web Development", "Logical Thinking", "Problem Solving", "React.js", "Full-Stack Development"],
  "availableLanguage": "en",
  "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "PT1H" }
};

const coreServices = [
  {
    icon: Code,
    title: "Python Programming: Data Science & AI Foundation",
    description: "Python dominates data science, artificial intelligence, and academic research. Our comprehensive Python curriculum takes students from basic syntax through advanced data structures, algorithmic thinking, and practical applications. Students learn to write clean, readable code while mastering object-oriented programming, file handling, and API integration. Advanced learners progress to machine learning."
  },
  {
    icon: Globe,
    title: "Web Development Fundamentals: HTML, CSS & JavaScript",
    description: "Every website you've ever visited uses these three technologies. Unlike traditional coding classes that teach them sequentially over months, Rite Tutor teaches integrated web development from day one. Students learn HTML structure, CSS styling, and JavaScript functionality simultaneously through project-based builds. By their third project, students create responsive, interactive websites."
  },
  {
    icon: Code,
    title: "React.js Development: Modern Front-End Excellence",
    description: "React powers Facebook, Instagram, Netflix, and thousands of professional applications. Once students master JavaScript fundamentals, we introduce component-based architecture, state management, and modern front-end development practices. Students build real single-page applications with professional-level code organization."
  },
  {
    icon: Database,
    title: "Full-Stack MERN Development: Professional Web Applications",
    description: "MongoDB, Express, React, Node.js—the complete stack for building modern web applications. This advanced service teaches students to manage both front-end user interfaces and back-end server logic, handle databases, implement authentication, and deploy live applications."
  }
];

const specializedServices = [
  {
    icon: Smartphone,
    title: "Mobile App Development: iOS & Android Creation",
    description: "Using React Native or Flutter, students learn to build cross-platform mobile applications. This service transforms ideas into pocket-sized reality—whether creating productivity tools, educational games, or social features."
  },
  {
    icon: Database,
    title: "Data Science & Analytics: Working With Big Data",
    description: "Introduction to pandas, NumPy, matplotlib, and statistical analysis using Python. Students learn to clean messy datasets, identify patterns, create visualizations, and draw meaningful conclusions from data."
  },
  {
    icon: Gamepad2,
    title: "Game Development: Unity & Unreal Engine",
    description: "Beyond simple game tutorials, we teach professional game physics, 3D environment design, and gameplay mechanics using industry-standard engines. Students learn C# or C++ while building original games."
  },
  {
    icon: Bot,
    title: "AI & Machine Learning Fundamentals",
    description: "Demystifying artificial intelligence through hands-on experimentation. Students learn how ChatGPT-style models work, implement basic neural networks, and explore machine learning concepts like training, testing, and model evaluation."
  },
  {
    icon: Shield,
    title: "Cybersecurity & Ethical Hacking Basics",
    description: "Teaching students how to stay safe online while understanding encryption, authentication, and digital security principles. Students learn to identify vulnerabilities and implement security best practices."
  }
];

const foundationalServices = [
  {
    icon: Brain,
    title: "Logical Thinking & Algorithmic Reasoning",
    description: "Before students write any code, they must understand how to think systematically. Using Brilliant.org visual puzzles and pattern recognition exercises, we build foundational reasoning capabilities that improve performance across all academic subjects."
  },
  {
    icon: Calculator,
    title: "Mathematics for Programming",
    description: "We relate mathematical concepts to everyday programming challenges. Students struggling with exponents master them through algorithm complexity analysis. Proportional reasoning becomes clear through responsive design calculations."
  },
  {
    icon: Palette,
    title: "UI/UX Design for Developers",
    description: "Before building applications, students learn to design intuitive user interfaces using industry tools like Figma. This service teaches visual hierarchy, color theory, accessibility standards, and user-centered design thinking."
  }
];

const certifications = [
  {
    icon: GraduationCap,
    title: "Harvard CS50: Introduction to Computer Science",
    description: "Harvard's legendary introductory course, accessible to advanced Rite Tutor students. We serve as stepping-stone guides, helping students navigate challenging problem sets. Students who complete CS50 earn verified certificates from Harvard University."
  },
  {
    icon: Award,
    title: "IBM Professional Certificates: Data Science & AI",
    description: "Industry-recognized credentials demonstrating professional-level capability in data analysis, machine learning, and artificial intelligence. These programs prepare students for actual career entry."
  },
  {
    icon: BookOpen,
    title: "MIT OpenCourseWare: Advanced Topics",
    description: "For exceptional students ready for university-level challenges, we provide guided access to MIT's open course materials. Topics include advanced algorithms, systems engineering, and artificial intelligence research."
  }
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | Comprehensive Technical Education | Rite Tutor</title>
        <meta name="description" content="From Python programming to Harvard CS50 preparation. Explore Rite Tutor's comprehensive one-to-one online coding services for kids ages 6-15." />
        <meta name="keywords" content="python tutoring for kids, web development classes children, React.js for kids, coding services Bloomington" />
        <link rel="canonical" href="https://www.ritetutor.com/services" />
        <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>
      </Helmet>
      
      <Layout>
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Comprehensive Technical Education{' '}
                <span className="text-primary">From Visual Logic to Professional Development</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                One-to-One Online Mentorship Across Every Major Technology Platform
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Programming Services */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Core Programming <span className="text-primary">Services</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {coreServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-card p-8 rounded-2xl border border-border shadow-lg hover:shadow-premium transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Advanced */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Specialized Advanced <span className="text-primary">Services</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specializedServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-background p-6 rounded-2xl border border-border shadow-lg hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Foundational Support */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Foundational Support <span className="text-primary">Services</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {foundationalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-card p-8 rounded-2xl border border-border shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Button variant="hero" size="lg" asChild>
                <Link to="/learning-pathways" className="group">
                  Explore Learning Pathways
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* University-Level Certifications */}
        <section className="py-20 bg-foreground text-background">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                University-Level <span className="text-primary">Certification Pathways</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  className="bg-background/5 backdrop-blur-sm p-6 rounded-2xl border border-background/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                    <cert.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">{cert.title}</h3>
                  <p className="text-background/70 text-sm">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Superior */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Why Rite Tutor Services Deliver <span className="text-primary">Superior Results</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every service follows our proven methodology: skill-based progression, one-to-one mentorship, project-based learning, and transparent progress tracking. We don't just teach tools—we build thinkers capable of learning any future technology independently. That's the Rite Tutor difference.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary-foreground">
                Start Your Child's Coding Journey
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Book your free strategy call to discuss which services align with your child's interests and goals.
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

export default Services;
