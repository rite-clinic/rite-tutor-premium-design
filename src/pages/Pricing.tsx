import { Helmet } from 'react-helmet-async';
import { ContactCTA } from '@/contexts/ContactModalContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Users, Briefcase, TrendingUp, GraduationCap, DollarSign, XCircle, Star } from 'lucide-react';

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "One-to-One Online Coding Mentorship",
  "description": "Premium one-to-one mentorship delivered worldwide.",
  "brand": { "@type": "Brand", "name": "Rite Tutor" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "areaServed": { "@type": "Place", "name": "Worldwide" }
  }
};

const tiers = [
  {
    icon: Users,
    name: "Foundation Builder",
    subtitle: "Entry Level",
    sessions: "1 Session/Week (60 min)",
    description: "Designed for students ages 6-10 beginning their coding journey, or older students assessing fit before deeper commitment.",
    features: [
      "1 weekly one-to-one session (60 minutes)",
      "Personalized curriculum based on skill assessment",
      "Access to visual logic development platforms",
      "Detailed parent updates after every session",
      "Professional portfolio initiation",
      "Monthly progress reviews"
    ],
    bestFor: "Families exploring whether coding education aligns with their child's interests and capabilities"
  },
  {
    icon: Clock,
    name: "Skill Developer",
    subtitle: "Standard",
    sessions: "1-2 Sessions/Week (60 min each)",
    description: "Designed for committed students ages 8-14 pursuing consistent skill development.",
    popular: true,
    features: [
      "1-2 weekly one-to-one sessions (60 minutes each)",
      "Advanced curriculum with project-based learning",
      "Full access to integrated learning ecosystem",
      "Professional portfolio with version control",
      "Comprehensive parent dashboard access",
      "Quarterly pathway progression assessments",
      "Priority mentor matching"
    ],
    bestFor: "Families investing in multi-year educational partnership with clear progression objectives"
  },
  {
    icon: Briefcase,
    name: "Junior CTO Accelerator",
    subtitle: "Premium",
    sessions: "2-3 Sessions/Week (60-90 min each)",
    description: "Designed for ambitious students ages 12-15 pursuing university credentials and maximum competitive advantage.",
    features: [
      "2-3 weekly intensive sessions (60-90 minutes each)",
      "University-level course preparation and guidance",
      "Professional certification pathways",
      "Advanced project mentorship for portfolio differentiation",
      "College application strategy consultation",
      "Internship and opportunity connection support",
      "Dedicated mentor relationship",
      "Expedited communication and scheduling"
    ],
    bestFor: "Families treating education as high-ROI investment toward scholarships, early college credits, and career preparation"
  }
];

const traditionalComparison = [
  { label: "Traditional Coding Classes", cost: "$1,000-$3,000 annually", items: ["Participation certificates everyone receives", "Surface-level syntax memorization", "Generic group curriculum", "Minimal individual attention", "Entertainment disguised as education", "No lasting competitive advantage"], verdict: "Negligible return" },
  { label: "School Computer Science", cost: "\"Free\" (included in tuition)", items: ["Minimal individual attention in 30-student classes", "Outdated curriculum limited by school budgets", "Generic pacing that serves nobody optimally", "No personalized mentorship", "Zero professional portfolio development"], verdict: "Limited lasting impact" },
  { label: "Self-Taught Approach", cost: "\"Free\" (using online resources)", items: ["Inefficient learning through trial and error", "No guidance when stuck", "Bad habits that require unlearning later", "No structured progression", "Zero accountability", "No credential value"], verdict: "High hidden costs" }
];

const roiExamples = [
  { name: "Sarah (Age 14, Joined at 12)", returns: ["$20,000 STEM scholarship earned (portfolio cited specifically)", "Early acceptance to competitive university program", "Completed 2 university-level courses (saved ~$6,000 in future tuition)", "Landed paid summer internship at age 15"], net: "Net Financial Return: Positive $26,000+" },
  { name: "Marcus (Age 11, Joined at 9)", returns: ["Confidence transformation from struggling student to peer tutor", "Academic performance improvement across all subjects", "Professional portfolio with 35+ projects", "Competitive positioning for future scholarship applications"], net: "Net Value: Immeasurable confidence boost" },
  { name: "The Williams Twins (Ages 13, Joined at 11)", returns: ["Both completed intermediate pathway ahead of schedule", "Combined portfolio with 50+ projects", "Twin A pursuing game development specialization", "Twin B pursuing data science pathway"], net: "Two children receiving world-class education" }
];

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Investment in Excellence | Understanding the Rite Tutor Model | Rite Tutor</title>
        <meta name="description" content="Quality education isn't a commodity. Understand the true value of investing in your child's coding education with personalized one-to-one mentorship from Rite Tutor." />
        <meta name="keywords" content="coding tutoring pricing, online coding classes cost, one-to-one tutoring investment, educational ROI" />
        <link rel="canonical" href="https://www.ritetutor.com/pricing" />
        <script type="application/ld+json">{JSON.stringify(pricingSchema)}</script>
      </Helmet>
      
      <Layout>
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Investment in Excellence:{' '}
                <span className="text-primary">Understanding the Rite Tutor Model</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Why We Don't Display Prices */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Why We Don't Display Prices <span className="text-primary">on Our Website</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  You won't find a simple price list on this page. That's intentional, not evasive.
                </p>
                <p>
                  Here's why: Quality education isn't a commodity. A fourth-grader beginning with visual logic needs different session frequency and curriculum intensity than a high schooler pursuing university-level certifications. Pricing identical education to both would be dishonest.
                </p>
                <p>
                  Moreover, educational pricing should reflect outcomes, not just time spent. A year of one-to-one mentorship that results in university credits, professional certifications, and a competitive portfolio delivers vastly more value than a year of group classes producing participation certificates.
                </p>
                <p>During your free strategy call, we'll discuss:</p>
                <ul className="space-y-2 ml-4">
                  {["Your child's current capabilities and starting point", "Educational objectives and timeline expectations", "Recommended session frequency (weekly, bi-weekly, or intensive)", "Pathway progression and anticipated duration", "Transparent pricing based on your specific situation"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-semibold text-foreground">No surprises. No pressure. Just honest conversation about transforming potential into excellence.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Educational ROI */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Understanding Educational ROI:{' '}
                <span className="text-primary">What You're Actually Buying</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {traditionalComparison.map((item, index) => (
                <motion.div key={item.label} className="bg-background p-6 rounded-2xl border border-border" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <h3 className="font-bold text-lg mb-2">{item.label}</h3>
                  <p className="text-sm text-primary font-semibold mb-4">Cost: {item.cost}</p>
                  <ul className="space-y-2 mb-4">
                    {item.items.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-semibold text-muted-foreground">{item.verdict}</p>
                </motion.div>
              ))}
            </div>

            <motion.div className="max-w-4xl mx-auto mt-12 bg-primary/5 p-8 rounded-2xl border-2 border-primary" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-display font-bold mb-4">Rite Tutor Delivers:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Professional portfolio with 2-8 years of documented growth",
                  "University-level credentials (for advanced students)",
                  "Professional certifications carrying real market value",
                  "Deep logical thinking capabilities transferable to any field",
                  "College application competitive advantages",
                  "Potential scholarship earnings ($15,000-$25,000+ based on portfolios)"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold">Return: Exponential. Skills that compound over time.</p>
            </motion.div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Membership Models: <span className="text-primary">Finding Your Fit</span>
              </h2>
              <p className="text-muted-foreground">While specific pricing requires conversation, here's our general membership structure.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {tiers.map((tier, index) => (
                <motion.div key={tier.name} className={`relative bg-card rounded-2xl overflow-hidden shadow-lg border-2 ${tier.popular ? 'border-primary' : 'border-border'}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">Most Popular</div>
                  )}
                  <div className={`p-8 ${tier.popular ? 'pt-14' : ''}`}>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <tier.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-1">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{tier.subtitle}</p>
                    <p className="text-primary font-semibold mb-2 text-sm">{tier.sessions}</p>
                    <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                    <ul className="space-y-3 mb-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted-foreground italic mb-6">Best for: {tier.bestFor}</p>
                    <ContactCTA variant={tier.popular ? "hero" : "hero-outline"} className="w-full">Book Strategy Call</ContactCTA>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Real ROI Examples */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Real ROI: <span className="text-primary">What Families Actually Experience</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {roiExamples.map((example, index) => (
                <motion.div key={example.name} className="bg-background p-6 rounded-2xl border border-border shadow-lg" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <h3 className="font-bold text-lg mb-4">{example.name}</h3>
                  <ul className="space-y-2 mb-4">
                    {example.returns.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold text-primary">{example.net}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Flexible Options */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
                Flexible Options: <span className="text-primary">Education That Adapts</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Session Frequency Flexibility", desc: "Weekly, bi-weekly, or custom scheduling based on your needs" },
                  { title: "Intensity Adjustment", desc: "Reduce or increase session frequency as situations change" },
                  { title: "Sibling Discounts", desc: "Multiple children from same family receive adjusted pricing" },
                  { title: "Extended Breaks", desc: "Pause during family vacations or intensive school periods without penalty" }
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 bg-card p-5 rounded-xl border border-border">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-4">What's Included (Always)</h3>
                  <ul className="space-y-2">
                    {["All curriculum and learning platform access", "Mentor time and preparation", "Parent communication and updates", "Progress tracking and assessments", "Portfolio hosting and management", "University course enrollment fees (advanced students)"].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-4">Payment Options</h3>
                  <ul className="space-y-2 mb-4">
                    {["Monthly subscription (most popular)", "Quarterly commitment (modest savings)", "Annual commitment (maximum savings, priority scheduling)"].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span>{i}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">All with transparent contracts, clear terms, and straightforward cancellation policies.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-primary-foreground">
                The Question Isn't Cost—It's Value
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Families don't invest in Rite Tutor because it's cheap. They invest because it delivers outcomes that matter: children who think logically, students who compete for scholarships, and young people who enter adulthood with marketable skills and genuine confidence.
              </p>
              <ContactCTA variant="premium" size="xl" className="group">
                  Book Your Strategy Call Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </ContactCTA>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Pricing;
