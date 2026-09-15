import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { 
  HeroSection, 
  OpeningSection,
  WhyFamiliesChooseSection,
  JuniorCTOMethodologySection,
  GlobalReachSection,
  TechStackSection,
  RealResultsSection,
  TestimonialsSection,
  InvestmentSection,
  StrategyCallSection,
  CTASection 
} from '@/components/sections/HomeSections';

const Index = () => {
  return (
    <>
<Layout>
        <HeroSection />
        <section className="py-12 bg-background">
          <div className="container-wide grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="text-2xl font-display font-bold mb-3">Tutoring for your child's subjects and grade</h2>
              <p className="text-muted-foreground mb-4">Ask about school subjects, curriculum support, or coding enrichment. Start with a conversation about your child's learning goals.</p>
              <Link to="/online-tutoring-all-subjects" className="font-semibold underline underline-offset-4">Explore all-subject online tutoring</Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="text-2xl font-display font-bold mb-3">For Bloomington and Indiana families</h2>
              <p className="text-muted-foreground mb-4">One-to-one lessons from home for families in Bloomington, Ellettsville, Bedford, Martinsville, Nashville, and across Indiana.</p>
              <Link to="/online-tutoring-bloomington-indiana" className="font-semibold underline underline-offset-4">Learn about online tutoring in your area</Link>
            </div>
          </div>
        </section>
        <OpeningSection />
        <WhyFamiliesChooseSection />
        <JuniorCTOMethodologySection />
        <GlobalReachSection />
        <TechStackSection />
        <RealResultsSection />
        <TestimonialsSection />
        <InvestmentSection />
        <StrategyCallSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
