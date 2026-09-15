import { lazy } from "react";

export const Index = lazy(() => import("./pages/Index"));
export const AboutUs = lazy(() => import("./pages/AboutUs"));
export const HowItWorks = lazy(() => import("./pages/HowItWorks"));
export const LearningPathways = lazy(() => import("./pages/LearningPathways"));
export const Projects = lazy(() => import("./pages/Projects"));
export const Courses = lazy(() => import("./pages/Courses"));
export const CourseDetails = lazy(() => import("./pages/CourseDetails"));
export const Pricing = lazy(() => import("./pages/Pricing"));
export const Services = lazy(() => import("./pages/Services"));
export const Contact = lazy(() => import("./pages/Contact"));
export const Blog = lazy(() => import("./pages/Blog"));
export const BlogPost = lazy(() => import("./pages/BlogPost"));
export const ThankYou = lazy(() => import("./pages/ThankYou"));
export const NotFound = lazy(() => import("./pages/NotFound"));

export const AllSubjects = lazy(() => import("./pages/Tutoring").then(module => ({ default: module.AllSubjects })));
export const BloomingtonTutoring = lazy(() => import("./pages/Tutoring").then(module => ({ default: module.BloomingtonTutoring })));
