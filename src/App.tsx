import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

import { ContactModalProvider } from "@/contexts/ContactModalContext";

import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import HowItWorks from "./pages/HowItWorks";
import LearningPathways from "./pages/LearningPathways";
import Projects from "./pages/Projects";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ContactModalProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/learning-pathways" element={<LearningPathways />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />
              {/* Backward-compatible aliases */}
              <Route path="/blog" element={<Navigate to="/blogs" replace />} />
              <Route path="/blog/:slug" element={<BlogPostRedirect />} />
              <Route path="/thank-you" element={<Navigate to="/" replace />} />
              <Route path="/thank-you/:token" element={<ThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ContactModalProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

// Redirect old /blog/:slug → /blogs/:slug
import { useParams } from "react-router-dom";
function BlogPostRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/blogs/${slug}`} replace />;
}

export default App;
