import { Helmet } from 'react-helmet-async';
import { ContactCTA } from '@/contexts/ContactModalContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Eye, BookOpen, Heart, Users, CheckCircle } from 'lucide-react';
import familyImage from '@/assets/family-learning.jpg';

const parentConcerns = [
  {
    icon: Shield,
    title: "Safety & Security",
    description: "All sessions are recorded and available for parent review. Our mentors are vetted and background-checked."
  },
  {
    icon: Eye,
    title: "Full Visibility",
    description: "Access the parent dashboard anytime to see progress, upcoming sessions, and learning milestones."
  },
  {
    icon: BookOpen,
    title: "No Hidden Curriculum",
    description: "We share our learning roadmap with you. You'll always know what your child is working on and why."
  },
  {
    icon: Heart,
    title: "Child-Centered Approach",
    description: "Sessions are designed around your child's interests. We make learning engaging, not exhausting."
  }
];

const faqs = [
  {
    question: "What if my child has never coded before?",
    answer: "Perfect! Most of our students start with zero coding experience. Our Logic Explorers pathway is specifically designed for beginners."
  },
  {
    question: "How do I know if my child is making progress?",
    answer: "You'll receive monthly progress reports, access to the parent dashboard, and regular milestone calls with our team."
  },
  {
    question: "What technology do we need at home?",
    answer: "Just a computer or laptop with a webcam, stable internet connection, and a quiet learning space. We use secure, browser-based tools."
  },
  {
    question: "Can I sit in on sessions?",
    answer: "Absolutely! Parents are welcome to observe, especially in the first few sessions. However, we find students often focus better when given independent learning time."
  }
];

const ForParents = () => {
  return (
    <>
      <Helmet>
        <title>For Parents | Rite Tutor Online Coding Classes Bloomington IN</title>
        <meta name="description" content="Everything parents need to know about Rite Tutor's online coding program. Safety, visibility, and a child-centered approach to STEM education." />
        <meta name="keywords" content="parent guide coding classes, safe online tutoring kids, Bloomington coding education" />
        <link rel="canonical" href="https://www.ritetutor.com/for-parents" />
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="container-wide">
            <motion.div 
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                For Parents:{' '}
                <span className="text-primary">Your Questions Answered</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                We understand that entrusting your child's education to an online platform requires trust. Here's everything you need to know.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Parent Concerns */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                We Address Your Concerns
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {parentConcerns.map((concern, index) => (
                <motion.div
                  key={concern.title}
                  className="bg-card p-8 rounded-2xl shadow-lg border border-border"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <concern.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{concern.title}</h3>
                  <p className="text-muted-foreground">{concern.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section */}
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
                  src={familyImage} 
                  alt="Family engaged in learning together"
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
                  A Partnership in Your Child's <span className="text-primary">Success</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  We don't just teach your child—we partner with you. You're kept in the loop every step of the way, from initial assessment to project completion.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1" />
                    <span>Regular parent-mentor communication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1" />
                    <span>Transparent curriculum and goals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1" />
                    <span>Celebrate milestones together</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Frequently Asked Questions
              </h2>
            </motion.div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  className="bg-card p-6 rounded-xl border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
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
                Still Have Questions?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                We're here to help. Book a free strategy call and let's discuss how Rite Tutor can work for your family.
              </p>
              <ContactCTA variant="premium" size="xl" className="group">
                  Talk to Our Team
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </ContactCTA>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ForParents;
