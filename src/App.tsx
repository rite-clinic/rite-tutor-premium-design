import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, useEffect } from "react";
import { SiteSeo } from "@/components/Seo";
import { MarketingMeasurement } from "@/components/MarketingMeasurement";
import { PrerenderContext, type PrerenderData } from "@/contexts/PrerenderContext";

import { ContactModalProvider } from "@/contexts/ContactModalContext";


import { Index, AboutUs, HowItWorks, LearningPathways, Projects, Courses, CourseDetails, Pricing, Services, Contact, Blog, BlogPost, ThankYou, NotFound, AllSubjects, BloomingtonTutoring } from "@/route-pages";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const timer = window.setTimeout(() => document.documentElement.removeAttribute("data-prerendered"), 1200);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  return null;
};

export const AppContent = ({ data = {} }: { data?: PrerenderData }) => (
  <PrerenderContext.Provider value={data}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <ContactModalProvider>
            <ScrollToTop />
            <SiteSeo />
            <MarketingMeasurement />
            <Suspense fallback={<main className="container-wide py-20" aria-busy="true">Loading page?</main>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/learning-pathways" element={<LearningPathways />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />
              <Route path="/online-tutoring-all-subjects" element={<AllSubjects />} />
              <Route path="/online-tutoring-bloomington-indiana" element={<BloomingtonTutoring />} />
              {/* Backward-compatible aliases */}
              <Route path="/blog" element={<Navigate to="/blogs" replace />} />
              <Route path="/blog/:slug" element={<BlogPostRedirect />} />
              <Route path="/thank-you" element={<Navigate to="/" replace />} />
              <Route path="/thank-you/:token" element={<ThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </ContactModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </PrerenderContext.Provider>
);

const App = ({ data }: { data?: PrerenderData }) => (
  <HelmetProvider><BrowserRouter><AppContent data={data} /></BrowserRouter></HelmetProvider>
);

// Redirect old /blog/:slug → /blogs/:slug
import { useParams } from "react-router-dom";
function BlogPostRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/blogs/${slug}`} replace />;
}

export default App;
