import { motion } from 'framer-motion';
import { ContactCTA } from '@/contexts/ContactModalContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, Brain, Lightbulb, Target, ChevronRight, BookOpen, Github, Award, BarChart3, Globe, Star, Phone, Quote } from 'lucide-react';
import heroImage from '@/assets/hero-child-learning.jpg';
import mentorImage from '@/assets/mentor-teaching.jpg';
import familyImage from '@/assets/family-learning.jpg';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="container-wide py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                🎓 Serving Families Across the US & Worldwide
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              Transform Your Child Into a Logical Thinker,{' '}
              <span className="text-primary">Not Just a Coder</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-xl"
            >
              Premium One-to-One Online Coding Mentorship That Builds Junior CTOs—Not Syntax Memorizers
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <ContactCTA variant="hero" size="xl" className="group">
                  Book Your Free Strategy Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </ContactCTA>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/how-it-works">
                  See How It Works
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">100% Online</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">1-on-1 Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Ages 6-15</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-premium-lg">
              <img 
                src={heroImage} 
                alt="Child learning to code online with a mentor"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-xl -z-10" />
            </div>
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-premium border border-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Junior CTO Mindset</p>
                  <p className="text-sm text-muted-foreground">Building Future Leaders</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function OpeningSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground">
              Imagine your child not just writing code, but architecting solutions to real-world problems. Picture them explaining complex algorithms with confidence, building professional software portfolios, and earning university-level credentials all before graduating high school. This isn't fantasy. This is the Rite Tutor difference.
            </p>
            <p className="text-lg text-muted-foreground">
              We're not another coding camp selling entertainment disguised as education. We're not a crowded classroom where your child disappears into the background. We're a mentorship-driven educational revolution that rejects the broken approach plaguing traditional tutoring worldwide.
            </p>
            <p className="text-lg text-muted-foreground">
              Here's the uncomfortable truth: Most coding classes for kids are designed to keep children busy, not brilliant. They prioritize flashy games over foundational logic. They teach syntax without strategy, tools without thinking. Parents invest thousands of dollars only to discover their child can recite programming commands but can't solve an unfamiliar problem independently.
            </p>
            <p className="text-lg font-semibold">
              Rite Tutor operates from a radically different philosophy: <span className="text-primary">Logic is permanent. Languages change.</span> The child who masters how to think will thrive in any future career, whether they become software engineers, doctors, entrepreneurs, or artists. We use coding as the vehicle, not the destination.
            </p>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={familyImage} 
              alt="Family learning together at home"
              className="rounded-2xl shadow-premium"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function WhyFamiliesChooseSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container-wide">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Why Families Worldwide Choose <span className="text-primary">Rite Tutor</span>
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              Whether you live in the United States, Canada, United Kingdom, Australia, Singapore, or anywhere globally, you've probably noticed the same frustrating pattern: traditional tutoring centers force your child into rigid grade-based curricula. A gifted fourth-grader capable of tenth-grade logic sits through elementary lessons. A struggling high schooler gets pushed through advanced material before mastering fundamentals.
            </p>
            <p>
              We reject this entirely. At Rite Tutor, skill determines placement—not age, not grade level, not arbitrary assessments. Our one-to-one online tutoring model means your child receives 100% of their mentor's attention, every single session. No crowded virtual classrooms. No competing for teacher time. No watered-down curriculum designed for the lowest common denominator.
            </p>
            <p>
              Our mentors are vetted experts who've mastered the art of translating complex computer science concepts into accessible, engaging lessons. They don't just teach Python or JavaScript—they teach proportional reasoning, algorithmic thinking, and systematic problem decomposition. These are the transferable skills that will serve your child whether they're debugging code, conducting scientific research, or managing a business team.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function JuniorCTOMethodologySection() {
  const steps = [
    {
      number: "1",
      title: "Task Identification",
      description: "Instead of assigning generic projects, we guide students to identify real problems in their communities—whether that's inefficient homework tracking, local environmental issues, or family organization challenges."
    },
    {
      number: "2",
      title: "Strategic Decomposition",
      description: "Students learn to break complex problems into manageable pieces using algorithmic thinking and pattern recognition—the same approach professional developers use at leading tech companies worldwide."
    },
    {
      number: "3",
      title: "Integrated Execution",
      description: "We teach HTML, CSS, and JavaScript simultaneously through project-based builds. Students don't learn languages in isolation—they learn to orchestrate multiple technologies to create functional web applications."
    },
    {
      number: "4",
      title: "Professional Portfolio Development",
      description: "Every student builds a version control portfolio from day one. Their development history becomes a 5-8 year proof of work that demonstrates consistent growth, resilience through debugging, and mastery progression."
    },
    {
      number: "5",
      title: "Transparent Progress Tracking",
      description: "After every session, parents receive detailed updates explaining exactly what their child learned, where they struggled, and what comes next. You have direct access to the same professional tools our mentors use."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            The "Junior CTO" Methodology:{' '}
            <span className="text-primary">From Curiosity to Career</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Traditional coding education treats children as passive recipients of information. Rite Tutor treats them as active architects of their own learning journey. Our proprietary methodology develops what we call the "Junior CTO mindset"—the ability to envision, plan, build, and articulate complex technical projects with professional-level competence.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="flex gap-6 bg-card p-6 rounded-2xl border border-border shadow-lg hover:shadow-premium transition-all duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-lg">{step.number}</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/learning-pathways" className="group">
              Explore Our Learning Pathways
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export function GlobalReachSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container-wide">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Global Excellence,{' '}
            <span className="text-primary">Individual Attention</span>
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              Rite Tutor serves families across continents—from North America to Europe, Asia to Australia, and everywhere in between. Our online model means geographical boundaries don't limit educational excellence. We've mentored students in major cities and remote towns, each receiving the same personalized attention and rigorous curriculum regardless of location.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div className="bg-background p-6 rounded-2xl border border-border">
              <h3 className="text-xl font-display font-bold mb-4">
                <Globe className="w-5 h-5 text-primary inline mr-2" />
                Serving the United States Coast to Coast
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                For families across America—whether in New York City, Los Angeles, Chicago, Houston, Phoenix, San Francisco, Seattle, Denver, Austin, or Boston—premium STEM education delivered directly to your living room, scheduled around your life.
              </p>
              <p className="text-xs text-muted-foreground">
                California • Texas • Florida • New York • Pennsylvania • Illinois • Ohio • Georgia • North Carolina • Michigan • And all 50 states
              </p>
            </div>

            <div className="bg-background p-6 rounded-2xl border border-border">
              <h3 className="text-xl font-display font-bold mb-4">
                <Globe className="w-5 h-5 text-primary inline mr-2" />
                International Reach
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                For international families in Canada, United Kingdom, Australia, Singapore, United Arab Emirates, Germany, France, Netherlands, India, Japan, and beyond—access to mentorship that rivals expensive private institutions.
              </p>
              <p className="text-xs text-muted-foreground">
                Toronto • London • Sydney • Singapore • Dubai • Berlin • Paris • Mumbai • Tokyo • And more
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TechStackSection() {
  const tools = [
    {
      icon: Lightbulb,
      title: "Visual Logic Development",
      description: "Interactive, adaptive lessons in mathematical reasoning, scientific thinking, and logical problem decomposition that make abstract concepts tangible."
    },
    {
      icon: BarChart3,
      title: "Academic Performance Analytics",
      description: "Data-driven platforms that identify specific trouble spots in math and language arts, ensuring coding education strengthens rather than competes with school performance."
    },
    {
      icon: Github,
      title: "Professional Version Control",
      description: "Students build professional coding portfolios with documented project histories that serve as living resumes for college applications and early career opportunities."
    },
    {
      icon: Award,
      title: "University-Level Coursework",
      description: "Preparing middle and high schoolers to earn college credits and professional certifications through top-tier university computer science courses and industry-recognized credential programs."
    }
  ];

  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container-wide">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            The Integrated Learning Ecosystem That{' '}
            <span className="text-primary">Changes Everything</span>
          </h2>
          <p className="text-lg text-background/70">
            Most tutoring services use basic platforms that provide minimal insight into student progress. Rite Tutor integrates cutting-edge educational technology and professional development tools.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              className="bg-background/5 backdrop-blur-sm p-6 rounded-2xl border border-background/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                <tool.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{tool.title}</h3>
              <p className="text-background/70">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RealResultsSection() {
  const results = [
    {
      description: "A 12-year-old who built a functional park cleanup tracker for their local conservation efforts"
    },
    {
      description: "A 14-year-old who earned a university computer science certificate and is now taking advanced-level courses"
    },
    {
      description: "A 10-year-old who progressed from basic visual logic to writing Python algorithms in eight months"
    },
    {
      description: "A 15-year-old who landed a paid internship because of their professional development portfolio"
    },
    {
      description: "A 13-year-old who completed multiple university-level computer science courses before high school graduation"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Real Results: What Success{' '}
            <span className="text-primary">Actually Looks Like</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Success at Rite Tutor isn't measured by participation trophies or certificates of completion. It's measured by demonstrable skill acquisition and real-world application.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {results.map((result, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 bg-card p-6 rounded-2xl border border-border shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <p className="text-muted-foreground">{result.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.p 
          className="text-center text-lg text-muted-foreground mt-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          These aren't isolated success stories—they're the expected outcome when you combine personalized mentorship, rigorous curriculum, and a student's natural curiosity.
        </motion.p>
        
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/blog" className="group">
              See Student Success Stories
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Jennifer Martinez",
      location: "Los Angeles, California",
      text: "We tried three different coding camps before finding Rite Tutor. The difference is night and day. My daughter Emma was bored in group classes—she'd finish assignments in 10 minutes and spend 50 minutes waiting. With Rite Tutor, her mentor adapts to her pace instantly. She's built five original projects in six months. Worth every penny.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      location: "Toronto, Canada",
      text: "As a physician, I value evidence-based results. Rite Tutor delivers. My son David struggled with traditional computer class at school—got a D. His teacher said he 'just doesn't get it.' After 4 months with Rite Tutor, he's now tutoring his classmates and got an A. The one-to-one attention made all the difference.",
      rating: 5
    },
    {
      name: "Sarah Thompson",
      location: "London, United Kingdom",
      text: "The transparency is what sold us. After EVERY session, I get a message explaining exactly what Olivia learned—not generic praise, actual technical details in parent-friendly language. Other programs sent monthly reports saying 'doing great!' with zero specifics. Rite Tutor treats parents as partners.",
      rating: 5
    },
    {
      name: "Patricia Desai",
      location: "Singapore",
      text: "The portfolio approach is brilliant. Meera has a professional version control profile with 2+ years of work history. When she applied for a competitive STEM program, the admissions director specifically mentioned her portfolio during the acceptance call. That's the ROI we were looking for.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container-wide">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            What Families Are <span className="text-primary">Saying</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-primary fill-primary" />
            ))}
          </div>
          <p className="text-muted-foreground">4.9/5 rating from 127+ families worldwide</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-background p-8 rounded-2xl border border-border shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InvestmentSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Investment in Excellence:{' '}
            <span className="text-primary">Understanding Our Model</span>
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              We don't advertise prices on our website for a simple reason: Quality education isn't a commodity to be comparison-shopped like groceries. Every child's starting point, learning pace, and educational goals differ dramatically.
            </p>
            <p>
              What we can tell you: Families invest in Rite Tutor because they understand that developing deep logical thinking capabilities—the kind that lead to top-tier university programs, lucrative careers, and lifelong problem-solving skills—delivers exponential returns. The money saved on future college tuition through earned credits, the earning potential from early professional certifications, and the competitive advantage in an AI-dominated economy make this education an investment, not an expense.
            </p>
            <p>
              During your free strategy call, we'll discuss your child's current abilities, educational objectives, and create a customized learning pathway with transparent pricing based on session frequency and curriculum intensity. No surprises. No pressure. Just honest conversation about transforming potential into excellence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function StrategyCallSection() {
  const callIncludes = [
    "Assess your child's current logical aptitude and technical familiarity",
    "Identify specific learning objectives and timeline expectations",
    "Explain how our methodology differs from traditional coding classes",
    "Map out a personalized three-month growth trajectory",
    "Determine if Rite Tutor is the right fit for your family"
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={mentorImage} 
              alt="Expert mentor during a strategy call"
              className="rounded-2xl shadow-premium-lg"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Your Next Step:{' '}
              <span className="text-primary">The Free Strategy Call</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              This isn't a sales pitch disguised as consultation. It's a genuine conversation about your child's future. During this 30-minute session, we'll:
            </p>
            <div className="space-y-3">
              {callIncludes.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground">
              We're selective about enrollment because quality mentorship requires careful mentor-student matching and manageable teaching loads. If we don't believe we can deliver transformative results for your child, we'll tell you honestly and suggest alternative resources.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="tel:+19294218055" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                <Phone className="w-5 h-5" /> +1 (929) 421-8055
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container-wide">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary-foreground">
            Start Building Your Child's Future Today
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Whether you're anywhere in the United States or internationally, the path to world-class education starts with conversation.
          </p>
          <ContactCTA variant="premium" size="xl" className="group">
              Book Your Free Strategy Call Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </ContactCTA>
        </motion.div>
      </div>
    </section>
  );
}
