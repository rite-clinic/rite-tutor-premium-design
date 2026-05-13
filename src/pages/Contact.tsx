import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone, CheckCircle } from "lucide-react";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "EducationalOrganization",
    name: "Rite Tutor",
    telephone: "+1-929-421-8055",
    email: "hello@ritetutor.com",
    areaServed: { "@type": "Place", name: "Worldwide" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+1-929-421-8055",
      availableLanguage: "English",
      areaServed: "Worldwide",
    },
  },
};

const expectations = [
  { title: "Assess Your Child's Current Capabilities", description: "Through friendly dialogue and optional logic puzzles, we understand where your child actually is—not where age-based assessments say they should be." },
  { title: "Understand Your Educational Objectives", description: "What matters to you? College preparation? Professional skill development? Confidence building? Career exploration? We customize." },
  { title: "Explain Our Methodology Transparently", description: "We'll detail exactly how skill-based progression works, why logic comes before syntax, and how portfolio development creates competitive advantages." },
  { title: "Map a Realistic Three-Month Pathway", description: "Based on assessment results and your objectives, we outline specific milestones your child would achieve in their first quarter." },
  { title: "Provide Transparent Pricing", description: "We'll discuss investment options that align with session frequency, curriculum intensity, and your budget. All cards on the table." },
  { title: "Determine Fit Honestly", description: "If we believe Rite Tutor can deliver transformative results, we'll outline next steps. If we don't think we're the right fit, we'll say so directly." },
];

const faqs = [
  { question: "How long is the free strategy call?", answer: "30 minutes. Sometimes we run 5-10 minutes over if conversation is productive, but we respect your time." },
  { question: "Will you pressure me to enroll during the call?", answer: "No. We're educators, not salespeople. If we're not confident we can deliver exceptional results for your child, we'll say so honestly." },
  { question: "Can my child join the call?", answer: "Absolutely! In fact, it's helpful for us to interact with them briefly if they're available. However, parent-only calls work fine too." },
  { question: "What if we live in a different time zone?", answer: "We schedule strategy calls across all global time zones. Whether you're in the US, Canada, UK, Australia, Singapore, UAE, Germany, France, India, Japan, or elsewhere—we'll find time that works." },
  { question: "Do I need to prepare anything?", answer: "No preparation required. Just come with your questions and educational objectives." },
  { question: "What happens after the strategy call if we want to proceed?", answer: "We'll begin mentor matching based on your child's learning style and objectives. Typically, first sessions start within 1-2 weeks of enrollment." },
  { question: "What if we're not ready to commit yet?", answer: "That's completely fine. Many families take weeks or months to consider. We provide information, not pressure." },
];

const goodFit = [
  "Your child shows curiosity about technology or problem-solving",
  "You value quality education over cheap alternatives",
  "You're frustrated with crowded group classes or generic curricula",
  "Your gifted child is bored in age-based programs",
  "Your struggling child needs personalized attention and pacing",
  "You want transparency and regular communication about progress",
  "You're investing in long-term skill development, not short-term entertainment",
  "You're anywhere globally with reliable internet connection",
];

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Rite Tutor | Book Free Strategy Call | Global Coding Mentorship</title>
        <meta name="description" content="Start the conversation about your child's future. Book a free 30-minute strategy call with Rite Tutor. Serving families across the US and worldwide." />
        <link rel="canonical" href="https://www.ritetutor.com/contact" />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Start the Conversation: <span className="text-primary">Your Free Strategy Call</span>
              </h1>
              <p className="text-xl text-muted-foreground">This Isn't a Sales Pitch—It's a Partnership Discussion</p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-lg text-muted-foreground">
                We're selective about enrollment because quality mentorship requires careful mentor-student matching and manageable teaching loads. Not every family is right for Rite Tutor, and Rite Tutor isn't right for every child. That's why we begin with honest conversation, not high-pressure sales tactics.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What to Expect + Form */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-display font-bold mb-6">
                  During Your Complimentary <span className="text-primary">30-Minute Strategy Session</span>
                </h2>
                <div className="space-y-4">
                  {expectations.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-display font-bold">Contact Methods</h3>
                  <a href="mailto:hello@ritetutor.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" /> hello@ritetutor.com
                  </a>
                  <a href="tel:+19294218055" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-5 h-5" /> +1 (929) 421-8055
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Available Monday-Friday, 9 AM - 7 PM EST (Other times by appointment for international families)
                  </p>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5" /> Serving families worldwide
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="bg-background p-8 rounded-2xl shadow-premium border border-border">
                  <h3 className="text-2xl font-display font-bold mb-6">Book Your Strategy Call</h3>
                  <ContactForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Good Fit */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
                Who Should <span className="text-primary">Book a Strategy Call?</span>
              </h2>
              <div className="bg-card p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-4">You're a Great Fit If:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {goodFit.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div key={faq.question} className="bg-background p-6 rounded-xl border border-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary-foreground">
                Ready to Transform Potential Into Excellence?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Your child's journey from curious explorer to confident builder starts with one simple step: conversation. No commitment required. No credit card needed. No pressure tactics.
              </p>
              <Button variant="premium" size="xl" asChild>
                <a href="tel:+19294218055" className="group">
                  Call Now: +1 (929) 421-8055
                  <Phone className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
