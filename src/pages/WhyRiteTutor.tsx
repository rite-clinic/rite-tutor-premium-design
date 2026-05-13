import { Helmet } from 'react-helmet-async';
import { ContactCTA } from '@/contexts/ContactModalContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Brain, Target, Shield, Clock, Award } from 'lucide-react';
import mentorImage from '@/assets/mentor-teaching.jpg';

const reasons = [
  {
    icon: Users,
    title: "Truly 1-on-1 Attention",
    description: "No group classes. Your child gets undivided expert attention every session."
  },
  {
    icon: Brain,
    title: "Logic-First Approach",
    description: "We teach how to think, not just what to type. Building problem-solving skills for life."
  },
  {
    icon: Target,
    title: "Product-Based Learning",
    description: "Students build real apps and projects, not just complete tutorials."
  },
  {
    icon: Shield,
    title: "Vetted Expert Mentors",
    description: "Every mentor is carefully selected for their ability to teach and inspire."
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Sessions fit your family's schedule. No commute, no stress."
  },
  {
    icon: Award,
    title: "Junior CTO Portfolio",
    description: "Students graduate with a professional portfolio showcasing their work."
  }
];

const WhyRiteTutor = () => {
  return (
    <>
      <Helmet>
        <title>Why Choose Rite Tutor | Best Online Coding Tutor Bloomington IN</title>
        <meta name="description" content="Discover why Bloomington families choose Rite Tutor for their children's coding education. Premium 1-on-1 online tutoring that builds Junior CTOs." />
        <meta name="keywords" content="best coding tutor Bloomington, why choose Rite Tutor, online coding for kids Indiana" />
        <link rel="canonical" href="https://www.ritetutor.com/why-rite-tutor" />
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="container-wide">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Why Families Choose{' '}
                <span className="text-primary">Rite Tutor</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                We're not just another coding class. We're building the next generation of technology leaders.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Reasons Grid */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  className="bg-card p-8 rounded-2xl shadow-lg border border-border hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <reason.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
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
                  alt="Mentor teaching student online"
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
                  Premium Education, <span className="text-primary">Delivered to Your Home</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  No more driving across Bloomington for mediocre group classes. Our expert mentors deliver world-class computer science education directly to your living room.
                </p>
                <p className="text-lg text-muted-foreground">
                  Every session is tailored to your child's learning style, pace, and interests. We meet them where they are and take them where they need to go.
                </p>
                <ContactCTA variant="hero" size="lg" className="group">
                    Experience the Difference
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </ContactCTA>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container-wide">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary-foreground">
                Ready to See the Rite Tutor Difference?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Book a complimentary strategy session and discover how we can transform your child's future.
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

export default WhyRiteTutor;
