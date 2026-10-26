import { ContactCTA } from '@/contexts/ContactModalContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Users, Briefcase, TrendingUp, GraduationCap, DollarSign, XCircle, Star } from 'lucide-react';

const tiers = [
  { icon: Users, name: "Foundation Builder", subtitle: "Starting Out", popular: false, sessions: "Discuss scheduling", description: "For learners developing foundational understanding.", features: ["One-to-one online learning", "Discuss the starting level", "Identify foundations to revisit", "Agree on parent communication"], bestFor: "Families exploring a suitable starting point" },
  { icon: Clock, name: "Skill Developer", subtitle: "Developing Skills", popular: false, sessions: "Discuss scheduling", description: "For learners building on existing knowledge.", features: ["Practice and explanation", "Discuss school curriculum or coding topics", "Review questions and next steps", "Agree on learning goals"], bestFor: "Families seeking ongoing support" },
  { icon: Briefcase, name: "Junior CTO Pathway", subtitle: "Further Exploration", popular: false, sessions: "Discuss scheduling", description: "For learners ready to explore more involved programming projects.", features: ["Discuss prerequisites", "Plan a suitable project", "Practice testing and explanation", "Review what to explore next"], bestFor: "Families exploring further coding topics" }
];

const traditionalComparison = [
  { label: "School-Subject Support", cost: "Curriculum and current topics", items: ["Share the current school unit", "Identify foundations to revisit", "Discuss suitable practice"], verdict: "Start from the learning need" },
  { label: "Coding Enrichment", cost: "Interests and experience", items: ["Compare published course topics", "Discuss prior coding experience", "Ask about practical activities"], verdict: "Choose an appropriate starting point" },
  { label: "Independent Practice", cost: "Practice between lessons", items: ["Ask what to try independently", "Review questions in a lesson", "Explain the approach taken"], verdict: "Discuss a manageable plan" }
];

const roiExamples = [
  { name: "School support", returns: ["Bring the current topic", "Discuss an example of difficult work", "Identify what to revisit"], net: "Agree on a starting point" },
  { name: "Coding foundations", returns: ["Share previous experience", "Choose a suitable course", "Discuss a small practice activity"], net: "Build understanding step by step" },
  { name: "Further exploration", returns: ["Review current skills", "Identify a project interest", "Discuss prerequisites"], net: "Choose an appropriate next challenge" }
];

const Pricing = () => {
  return (
    <>
<Layout>
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Learning Plans:{' '}
                <span className="text-primary">Understanding the Rite Tutor Model</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* A Plan Around Your Child */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Why We Don't Display Prices <span className="text-primary">and Their Learning Needs</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Start by discussing the subject, current understanding and learning goals.
                </p>
                <p>
                  A school learner and a coding beginner may need different starting points. Discuss the curriculum, interests and suitable lesson arrangements.
</p>
                <p>
Practical projects give students opportunities to explain their thinking, test ideas and reflect on what to improve. Discuss appropriate goals and a suitable starting point during a consultation.
</p>
                <p>During your free strategy call, we'll discuss:</p>
                <ul className="space-y-2 ml-4">
                  {["Your child's current capabilities and starting point", "Educational objectives and timeline expectations", "Recommended session frequency (weekly, bi-weekly, or intensive)", "Pathway progression and anticipated duration", "Lesson arrangements suited to your learning needs"].map((item) => (
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
                Comparing Learning Approaches:{' '}
                <span className="text-primary">Questions to Consider</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {traditionalComparison.map((item, index) => (
                <motion.div key={item.label} className="bg-background p-6 rounded-2xl border border-border" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <h3 className="font-bold text-lg mb-2">{item.label}</h3>
                  <p className="text-sm text-primary font-semibold mb-4">Focus: {item.cost}</p>
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
                  "Explore advanced topics and project practice",
                  "Explore advanced topics and project practice",
                  "Deep logical thinking capabilities transferable to any field",
                  "College application competitive advantages",
                  "Discuss learning goals and lesson arrangements"
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
              <p className="text-muted-foreground">Use these starting points to discuss an appropriate learning plan.</p>
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
                Learning Plan Examples: <span className="text-primary">Topics to Discuss</span>
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
                  { title: "Learning Together", desc: "Discuss each child’s learning needs separately" },
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
                  <h3 className="font-bold text-lg mb-4">Planning Your Lessons</h3>
                  <ul className="space-y-2 mb-4">
                    {["Discuss suitable lesson times", "Review the starting topic", "Agree on how to review progress"].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span>{i}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">Confirm lesson arrangements with the team before starting.</p>
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
                Discuss Your Child’s Next Step
</h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
Practical projects give students opportunities to explain their thinking, test ideas and reflect on what to improve. Discuss appropriate goals and a suitable starting point during a consultation.
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
