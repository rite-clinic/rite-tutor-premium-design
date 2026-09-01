// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { motion } from "framer-motion";
// import {
//   AlertCircle,
//   ArrowLeft,
//   CalendarCheck,
//   Clock,
//   Download,
//   FileText,
//   GraduationCap,
//   Layers,
//   Lock,
//   RefreshCw,
// } from "lucide-react";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { CourseBadge } from "@/components/courses/CourseBadge";
// import { CoursePricingPlans } from "@/components/courses/CoursePricing";
// import { DemoBookingModal } from "@/components/courses/DemoBookingModal";
// import { ContactCTA } from "@/contexts/ContactModalContext";
// import {
//   getCourse,
//   isCoursePublic,
//   ApiError,
//   type Course,
// } from "@/services/courseService";
// import { instructorName, normalizeDescription, pricingSummary } from "@/lib/courseUtils";
// import placeholder from "@/assets/course-placeholder.jpg";

// const CourseDetails = () => {
//   const { courseId } = useParams<{ courseId: string }>();
//   const [course, setCourse] = useState<Course | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<{ message: string; notFound: boolean } | null>(null);
//   const [reloadKey, setReloadKey] = useState(0);
//   const [bookingOpen, setBookingOpen] = useState(false);

//   useEffect(() => {
//     if (!courseId) return;
//     let active = true;
//     setIsLoading(true);
//     setError(null);
//     getCourse(courseId)
//       .then((data) => {
//         if (!active) return;
//         if (!isCoursePublic(data)) {
//           setError({ message: "This course isn't available right now.", notFound: true });
//           return;
//         }
//         setCourse(data);
//       })
//       .catch((err: ApiError) => {
//         if (!active) return;
//         setError({
//           message:
//             err.status === 404
//               ? "We couldn't find this course. It may have been moved or unpublished."
//               : err.message || "Unable to load this course right now.",
//           notFound: err.status === 404,
//         });
//       })
//       .finally(() => {
//         if (active) setIsLoading(false);
//       });
//     return () => {
//       active = false;
//     };
//   }, [courseId, reloadKey]);

//   const descriptionBlocks = normalizeDescription(course?.description);
//   const subcourses = (course?.subcourses || []).filter(Boolean);
//   const title = course?.title?.trim() || "Course";

//   return (
//     <>
//       <Helmet>
//         <title>{`${isLoading ? "Loading Course" : title} | Rite Tutor Courses`}</title>
//         <meta
//           name="description"
//           content={
//             course?.subtitle?.trim() ||
//             course?.intro?.trim()?.slice(0, 155) ||
//             "Live one-to-one coding course for kids ages 6-15 at Rite Tutor. Book a free demo class today."
//           }
//         />
//         <link rel="canonical" href={`https://www.ritetutor.com/courses/${courseId ?? ""}`} />
//         {course && (
//           <script type="application/ld+json">
//             {JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "Course",
//               name: title,
//               description: course.subtitle || course.intro || title,
//               provider: { "@type": "EducationalOrganization", name: "Rite Tutor" },
//               url: `https://www.ritetutor.com/courses/${course.id}`,
//               ...(course.image ? { image: course.image } : {}),
//             })}
//           </script>
//         )}
//       </Helmet>

//       <Layout>
//         {isLoading && (
//           <div className="container-wide space-y-6 py-20">
//             <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
//             <div className="aspect-[16/8] animate-pulse rounded-2xl bg-muted" />
//             <div className="h-4 w-full animate-pulse rounded bg-muted" />
//             <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
//           </div>
//         )}

//         {!isLoading && error && (
//           <div className="container-wide py-24 text-center">
//             <AlertCircle className="mx-auto h-12 w-12 text-primary" />
//             <h1 className="mt-6 font-display text-3xl font-bold">
//               {error.notFound ? "Course Not Available" : "Something Went Wrong"}
//             </h1>
//             <p className="mx-auto mt-3 max-w-md text-muted-foreground">{error.message}</p>
//             <div className="mt-8 flex flex-wrap justify-center gap-3">
//               <Button variant="premium" asChild>
//                 <Link to="/courses">
//                   <ArrowLeft className="mr-2 h-4 w-4" /> Browse All Courses
//                 </Link>
//               </Button>
//               {!error.notFound && (
//                 <Button variant="outline" onClick={() => setReloadKey((key) => key + 1)}>
//                   <RefreshCw className="mr-2 h-4 w-4" /> Try Again
//                 </Button>
//               )}
//             </div>
//           </div>
//         )}

//         {!isLoading && !error && course && (
//           <>
//             {/* Hero */}
//             <section className="relative overflow-hidden bg-card">
//               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
//               <div className="container-wide py-12 lg:py-16">
//                 <Link
//                   to="/courses"
//                   className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//                 >
//                   <ArrowLeft className="h-4 w-4" /> All Courses
//                 </Link>

//                 <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
//                   <motion.div
//                     initial={{ opacity: 0, y: 24 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="space-y-6"
//                   >
//                     <CourseBadge course={course} />
//                     <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
//                       {title}
//                     </h1>
//                     {(course.subtitle || course.intro) && (
//                       <p className="text-lg text-muted-foreground">
//                         {course.subtitle || course.intro}
//                       </p>
//                     )}

//                     <ul className="grid gap-3 sm:grid-cols-2">
//                       <li className="flex items-center gap-2 text-sm">
//                         <GraduationCap className="h-4 w-4 text-primary" />
//                         {instructorName(course)}
//                       </li>
//                       {course.duration && (
//                         <li className="flex items-center gap-2 text-sm">
//                           <Clock className="h-4 w-4 text-primary" /> {course.duration}
//                         </li>
//                       )}
//                       {!!course.num_classes && (
//                         <li className="flex items-center gap-2 text-sm">
//                           <Layers className="h-4 w-4 text-primary" /> {course.num_classes} classes
//                         </li>
//                       )}
//                       <li className="flex items-center gap-2 text-sm font-semibold">
//                         <CalendarCheck className="h-4 w-4 text-primary" /> {pricingSummary(course)}
//                       </li>
//                     </ul>

//                     <div className="flex flex-wrap gap-4">
//                       <Button variant="hero" size="xl" onClick={() => setBookingOpen(true)}>
//                         Book a Free Demo
//                       </Button>
//                       {course.brochure && (
//                         <Button variant="hero-outline" size="xl" asChild>
//                           <a href={course.brochure} target="_blank" rel="noopener noreferrer">
//                             <Download className="mr-2 h-5 w-5" /> Download Brochure
//                           </a>
//                         </Button>
//                       )}
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.96 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5, delay: 0.1 }}
//                     className="overflow-hidden rounded-2xl shadow-premium-lg"
//                   >
//                     <img
//                       src={course.image || placeholder}
//                       alt={title}
//                       width={1024}
//                       height={640}
//                       onError={(event) => {
//                         const img = event.currentTarget;
//                         if (img.src !== placeholder) img.src = placeholder;
//                       }}
//                       className="h-full w-full object-cover"
//                     />
//                   </motion.div>
//                 </div>
//               </div>
//             </section>

//             {/* Description */}
//             {descriptionBlocks.length > 0 && (
//               <section className="bg-background py-16">
//                 <div className="container-wide max-w-4xl space-y-8">
//                   <h2 className="font-display text-3xl font-bold">About This Course</h2>
//                   {descriptionBlocks.map((block, index) => (
//                     <div key={index} className="space-y-3">
//                       {block.content && (
//                         <p className="whitespace-pre-line text-muted-foreground">{block.content}</p>
//                       )}
//                       {block.objectives && (
//                         <div className="rounded-xl border border-border bg-card p-5">
//                           <p className="font-semibold">Learning Objectives</p>
//                           <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
//                             {block.objectives}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* Curriculum */}
//             {subcourses.length > 0 && (
//               <section className="bg-card py-16">
//                 <div className="container-wide max-w-4xl">
//                   <h2 className="font-display text-3xl font-bold">Course Curriculum</h2>
//                   <p className="mt-2 text-muted-foreground">
//                     {subcourses.length} modules, delivered live one-to-one.
//                   </p>
//                   <Accordion type="single" collapsible className="mt-8">
//                     {subcourses.map((subcourse, index) => (
//                       <AccordionItem key={subcourse.id} value={String(subcourse.id)}>
//                         <AccordionTrigger className="text-left">
//                           <span className="flex items-center gap-3">
//                             <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
//                               {index + 1}
//                             </span>
//                             {subcourse.title?.trim() || `Module ${index + 1}`}
//                           </span>
//                         </AccordionTrigger>
//                         <AccordionContent className="space-y-4">
//                           {subcourse.description && (
//                             <p className="whitespace-pre-line text-muted-foreground">
//                               {subcourse.description}
//                             </p>
//                           )}
//                           {subcourse.file && subcourse.visible_to_free_users === true && (
//                             <Button variant="outline" size="sm" asChild>
//                               <a href={subcourse.file} target="_blank" rel="noopener noreferrer">
//                                 <FileText className="mr-2 h-4 w-4" /> Download Material
//                               </a>
//                             </Button>
//                           )}
//                           {subcourse.file && subcourse.visible_to_free_users !== true && (
//                             <p className="flex items-center gap-2 text-sm text-muted-foreground">
//                               <Lock className="h-4 w-4" /> Course material shared with enrolled
//                               students.
//                             </p>
//                           )}
//                         </AccordionContent>
//                       </AccordionItem>
//                     ))}
//                   </Accordion>
//                 </div>
//               </section>
//             )}

//             {/* Pricing */}
//             <section className="bg-background py-16">
//               <div className="container-wide max-w-5xl">
//                 <h2 className="font-display text-3xl font-bold">Investment</h2>
//                 <p className="mt-2 text-muted-foreground">
//                   Transparent plans — pick the pace that suits your child.
//                 </p>
//                 <div className="mt-8">
//                   <CoursePricingPlans course={course} />
//                 </div>
//               </div>
//             </section>

//             {/* Bottom CTA */}
//             <section className="bg-foreground py-16 text-background">
//               <div className="container-wide text-center">
//                 <h2 className="font-display text-3xl font-bold md:text-4xl">
//                   Start with a Free Demo Class
//                 </h2>
//                 <p className="mx-auto mt-4 max-w-2xl text-background/80">
//                   Meet the mentor, see the teaching style, and get a personalised roadmap for your
//                   child — completely free.
//                 </p>
//                 <div className="mt-8 flex flex-wrap justify-center gap-4">
//                   <Button variant="hero" size="xl" onClick={() => setBookingOpen(true)}>
//                     Book a Free Demo
//                   </Button>
//                   <ContactCTA variant="hero-outline" size="xl" className="border-background text-background hover:bg-background hover:text-foreground">
//                     Talk to Our Team
//                   </ContactCTA>
//                 </div>
//               </div>
//             </section>

//             <DemoBookingModal course={course} open={bookingOpen} onOpenChange={setBookingOpen} />
//           </>
//         )}
//       </Layout>
//     </>
//   );
// };

// export default CourseDetails;


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  Layers,
  Lock,
  Puzzle,
  RefreshCw,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { DemoBookingModal } from "@/components/courses/DemoBookingModal";
import { ContactCTA } from "@/contexts/ContactModalContext";

import {
  getCourse,
  isCoursePublic,
  ApiError,
  type Course,
} from "@/services/courseService";

import { normalizeDescription } from "@/lib/courseUtils";
import placeholder from "@/assets/course-placeholder.jpg";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<{
    message: string;
    notFound: boolean;
  } | null>(null);

  const [reloadKey, setReloadKey] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    let active = true;

    setIsLoading(true);
    setError(null);

    getCourse(courseId)
      .then((data) => {
        if (!active) return;

        if (!isCoursePublic(data)) {
          setError({
            message: "This course isn't available right now.",
            notFound: true,
          });
          return;
        }

        setCourse(data);
      })
      .catch((err: ApiError) => {
        if (!active) return;

        setError({
          message:
            err.status === 404
              ? "We couldn't find this course. It may have been moved or unpublished."
              : err.message || "Unable to load this course right now.",
          notFound: err.status === 404,
        });
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [courseId, reloadKey]);

  const descriptionBlocks = normalizeDescription(course?.description);

  const subcourses = (course?.subcourses || []).filter(Boolean);

  const title = course?.title?.trim() || "Course";

  return (
    <>
      {/* =========================
          SEO
      ========================== */}
      <Helmet>
        <title>
          {`${isLoading ? "Loading Course" : title} | Rite Tutor Courses`}
        </title>

        <meta
          name="description"
          content={
            course?.subtitle?.trim() ||
            course?.intro?.trim()?.slice(0, 155) ||
            "Fun, interactive and engaging learning programs designed for kids at Rite Tutor."
          }
        />

        <link
          rel="canonical"
          href={`https://www.ritetutor.com/courses/${courseId ?? ""}`}
        />

        {course && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: title,
              description: course.subtitle || course.intro || title,
              provider: {
                "@type": "EducationalOrganization",
                name: "Rite Tutor",
              },
              url: `https://www.ritetutor.com/courses/${course.id}`,
              ...(course.image ? { image: course.image } : {}),
            })}
          </script>
        )}
      </Helmet>

      <Layout>
        {/* =========================================================
            LOADING
        ========================================================== */}

        {isLoading && (
          <div className="container-wide py-16 md:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="space-y-5">
                <div className="h-5 w-28 animate-pulse rounded-full bg-muted" />

                <div className="h-12 w-4/5 animate-pulse rounded-xl bg-muted" />

                <div className="h-5 w-full animate-pulse rounded bg-muted" />

                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

                <div className="flex gap-3">
                  <div className="h-11 w-40 animate-pulse rounded-xl bg-muted" />
                  <div className="h-11 w-40 animate-pulse rounded-xl bg-muted" />
                </div>
              </div>

              <div className="aspect-[16/10] animate-pulse rounded-[2rem] bg-muted" />
            </div>
          </div>
        )}

        {/* =========================================================
            ERROR
        ========================================================== */}

        {!isLoading && error && (
          <section className="relative overflow-hidden py-24">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="container-wide relative text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <AlertCircle className="h-10 w-10 text-primary" />
              </div>

              <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl">
                {error.notFound
                  ? "Oops! Course Not Available"
                  : "Something Went Wrong"}
              </h1>

              <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
                {error.message}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="premium" asChild>
                  <Link to="/courses">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Explore Courses
                  </Link>
                </Button>

                {!error.notFound && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setReloadKey((currentKey) => currentKey + 1)
                    }
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            COURSE
        ========================================================== */}

        {!isLoading && !error && course && (
          <>
            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/[0.08] via-background to-purple-500/[0.06]">
              {/* Decorative elements */}

              <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

              <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="pointer-events-none absolute right-[12%] top-16 hidden rotate-12 lg:block">
                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400 opacity-70" />
              </div>

              <div className="pointer-events-none absolute left-[45%] top-12 hidden lg:block">
                <Sparkles className="h-7 w-7 text-primary/40" />
              </div>

              <div className="container-wide relative py-8 md:py-12 lg:py-16">
                {/* Back Button */}

                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-full bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-background hover:text-primary hover:shadow-md"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Explore All Courses
                </Link>

                <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                  {/* LEFT */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="space-y-6"
                  >
                    {/* Kids Learning Badge */}

                    <div className="flex flex-wrap gap-2">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        <Sparkles className="h-4 w-4" />
                        Made for Curious Young Minds
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-600">
                        <Puzzle className="h-4 w-4" />
                        Learn by Doing
                      </div>
                    </div>

                    {/* Title */}

                    <div className="space-y-4">
                      <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                        {title}
                      </h1>

                      {(course.subtitle || course.intro) && (
                        <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                          {course.subtitle || course.intro}
                        </p>
                      )}
                    </div>

                    {/* Highlights */}

                    <div className="grid max-w-xl gap-3 sm:grid-cols-2">
                      {!!course.num_classes && (
                        <div className="flex items-center gap-3 rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <Layers className="h-5 w-5 text-primary" />
                          </div>

                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Learning Journey
                            </p>

                            <p className="font-bold">
                              {course.num_classes} Classes
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Learning Style
                          </p>

                          <p className="font-bold">Interactive Learning</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                      <Button
                        variant="hero"
                        size="xl"
                        className="w-full rounded-xl sm:w-auto"
                        onClick={() => setBookingOpen(true)}
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Book a Demo Class
                      </Button>

                      {course.brochure && (
                        <Button
                          variant="hero-outline"
                          size="xl"
                          className="w-full rounded-xl sm:w-auto"
                          asChild
                        >
                          <a
                            href={course.brochure}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="mr-2 h-5 w-5" />
                            View Course Brochure
                          </a>
                        </Button>
                      )}
                    </div>

                    {/* Parent trust text */}

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Kid-friendly lessons
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Interactive activities
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Guided learning
                      </span>
                    </div>
                  </motion.div>

                  {/* RIGHT IMAGE */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1,
                    }}
                    className="relative"
                  >
                    {/* image background */}

                    <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-gradient-to-br from-primary/20 to-purple-500/20" />

                    <div className="absolute -inset-3 -rotate-2 rounded-[2rem] border-2 border-dashed border-primary/20" />

                    <div className="relative overflow-hidden rounded-[1.75rem] border-4 border-background bg-background shadow-2xl">
                      <div className="aspect-[16/10]">
                        <img
                          src={course.image || placeholder}
                          alt={title}
                          width={1024}
                          height={640}
                          onError={(event) => {
                            const img = event.currentTarget;

                            if (img.src !== placeholder) {
                              img.src = placeholder;
                            }
                          }}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                        />
                      </div>
                    </div>

                    {/* Floating card */}

                    <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-xl sm:left-8">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/15">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Learn • Practice • Grow
                        </p>

                        <p className="text-sm font-bold">
                          Build Skills with Confidence
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* =====================================================
                ABOUT COURSE
            ====================================================== */}

            {descriptionBlocks.length > 0 && (
              <section className="relative bg-background py-16 md:py-20">
                <div className="container-wide max-w-5xl">
                  {/* Heading */}

                  <div className="mb-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                      <BookOpen className="h-7 w-7 text-primary" />
                    </div>

                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                      Discover
                    </p>

                    <h2 className="font-display text-3xl font-bold md:text-4xl">
                      What's This Course About?
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                      A fun learning journey designed to help children explore,
                      understand and confidently apply new skills.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {descriptionBlocks.map((block, index) => (
                      <motion.div
                        key={index}
                        initial={{
                          opacity: 0,
                          y: 16,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                        }}
                        className="rounded-3xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md md:p-8"
                      >
                        {block.content && (
                          <p className="whitespace-pre-line text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                            {block.content}
                          </p>
                        )}

                        {block.objectives && (
                          <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/[0.04] p-5 md:p-6">
                            <div className="mb-3 flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                                <Trophy className="h-5 w-5 text-primary" />
                              </div>

                              <p className="font-display text-lg font-bold">
                                What Your Child Will Learn
                              </p>
                            </div>

                            <p className="whitespace-pre-line leading-7 text-muted-foreground">
                              {block.objectives}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================
                CURRICULUM
            ====================================================== */}

            {subcourses.length > 0 && (
              <section className="relative overflow-hidden border-y bg-muted/30 py-16 md:py-20">
                <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

                <div className="container-wide relative max-w-5xl">
                  <div className="mb-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
                      <Puzzle className="h-7 w-7 text-purple-600" />
                    </div>

                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                      Learning Adventure
                    </p>

                    <h2 className="font-display text-3xl font-bold md:text-4xl">
                      What Will We Explore?
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                      The course is divided into{" "}
                      <span className="font-semibold text-foreground">
                        {subcourses.length} engaging{" "}
                        {subcourses.length === 1 ? "module" : "modules"}
                      </span>{" "}
                      that make learning simple, structured and enjoyable.
                    </p>
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    className="space-y-4"
                  >
                    {subcourses.map((subcourse, index) => (
                      <AccordionItem
                        key={subcourse.id}
                        value={String(subcourse.id)}
                        className="overflow-hidden rounded-2xl border bg-background px-4 shadow-sm transition-all data-[state=open]:shadow-md md:px-6"
                      >
                        <AccordionTrigger className="py-5 text-left hover:no-underline md:py-6">
                          <span className="flex items-center gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-primary-foreground shadow-sm">
                              {index + 1}
                            </span>

                            <span>
                              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Module {index + 1}
                              </span>

                              <span className="mt-0.5 block font-display text-base font-bold md:text-lg">
                                {subcourse.title?.trim() ||
                                  `Module ${index + 1}`}
                              </span>
                            </span>
                          </span>
                        </AccordionTrigger>

                        <AccordionContent className="pb-6">
                          <div className="border-t pt-5">
                            {subcourse.description && (
                              <p className="whitespace-pre-line leading-7 text-muted-foreground">
                                {subcourse.description}
                              </p>
                            )}

                            {subcourse.file &&
                              subcourse.visible_to_free_users === true && (
                                <div className="mt-5">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl"
                                    asChild
                                  >
                                    <a
                                      href={subcourse.file}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FileText className="mr-2 h-4 w-4" />
                                      Open Learning Material
                                    </a>
                                  </Button>
                                </div>
                              )}

                            {subcourse.file &&
                              subcourse.visible_to_free_users !== true && (
                                <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
                                  <Lock className="mt-0.5 h-4 w-4 shrink-0" />

                                  <p>
                                    Learning material for this module is shared
                                    with students during the course.
                                  </p>
                                </div>
                              )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>
            )}

            {/* =====================================================
                WHY KIDS WILL ENJOY THIS
            ====================================================== */}

            <section className="bg-background py-16 md:py-20">
              <div className="container-wide">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                    A Better Way to Learn
                  </p>

                  <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                    Learning That Kids Look Forward To
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    Lessons are designed to keep children involved, curious and
                    confident instead of simply watching and memorising.
                  </p>
                </div>

                <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
                  {/* Card 1 */}

                  <div className="group rounded-3xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                      <Puzzle className="h-7 w-7 text-primary" />
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold">
                      Interactive Learning
                    </h3>

                    <p className="mt-2 leading-6 text-muted-foreground">
                      Children learn by exploring concepts, solving activities
                      and actively participating.
                    </p>
                  </div>

                  {/* Card 2 */}

                  <div className="group rounded-3xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 transition-transform group-hover:scale-110">
                      <Sparkles className="h-7 w-7 text-purple-600" />
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold">
                      Made for Kids
                    </h3>

                    <p className="mt-2 leading-6 text-muted-foreground">
                      Concepts are presented in a simple and engaging way that
                      helps young learners stay interested.
                    </p>
                  </div>

                  {/* Card 3 */}

                  <div className="group rounded-3xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/15 transition-transform group-hover:scale-110">
                      <Trophy className="h-7 w-7 text-yellow-600" />
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold">
                      Confidence Building
                    </h3>

                    <p className="mt-2 leading-6 text-muted-foreground">
                      Step-by-step learning helps children strengthen skills and
                      feel proud of their progress.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================
                FINAL CTA
            ====================================================== */}

            <section className="relative overflow-hidden bg-foreground py-16 text-background md:py-20">
              <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

              <div className="container-wide relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-background/10">
                  <Sparkles className="h-8 w-8" />
                </div>

                <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-background/60">
                  Ready to Start?
                </p>

                <h2 className="mx-auto mt-2 max-w-3xl font-display text-3xl font-bold md:text-4xl lg:text-5xl">
                  Begin Your Child's Learning Adventure
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-background/75 md:text-lg">
                  Discover how engaging, guided and interactive learning can
                  help your child build skills with confidence.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    variant="hero"
                    size="xl"
                    className="rounded-xl"
                    onClick={() => setBookingOpen(true)}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Book a Demo Class
                  </Button>

                  <ContactCTA
                    variant="hero-outline"
                    size="xl"
                    className="rounded-xl border-background/40 text-background hover:bg-background hover:text-foreground"
                  >
                    Talk to Our Team
                  </ContactCTA>
                </div>
              </div>
            </section>

            {/* =====================================================
                DEMO MODAL
            ====================================================== */}

            <DemoBookingModal
              course={course}
              open={bookingOpen}
              onOpenChange={setBookingOpen}
            />
          </>
        )}
      </Layout>
    </>
  );
};

export default CourseDetails;