import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  CalendarCheck,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Layers,
  Lock,
  RefreshCw,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseBadge } from "@/components/courses/CourseBadge";
import { CoursePricingPlans } from "@/components/courses/CoursePricing";
import { DemoBookingModal } from "@/components/courses/DemoBookingModal";
import { ContactCTA } from "@/contexts/ContactModalContext";
import {
  getCourse,
  isCoursePublic,
  ApiError,
  type Course,
} from "@/services/courseService";
import { instructorName, normalizeDescription, pricingSummary } from "@/lib/courseUtils";
import placeholder from "@/assets/course-placeholder.jpg";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ message: string; notFound: boolean } | null>(null);
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
          setError({ message: "This course isn't available right now.", notFound: true });
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
        if (active) setIsLoading(false);
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
      <Helmet>
        <title>{`${isLoading ? "Loading Course" : title} | Rite Tutor Courses`}</title>
        <meta
          name="description"
          content={
            course?.subtitle?.trim() ||
            course?.intro?.trim()?.slice(0, 155) ||
            "Live one-to-one coding course for kids ages 6-15 at Rite Tutor. Book a free demo class today."
          }
        />
        <link rel="canonical" href={`https://www.ritetutor.com/courses/${courseId ?? ""}`} />
        {course && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: title,
              description: course.subtitle || course.intro || title,
              provider: { "@type": "EducationalOrganization", name: "Rite Tutor" },
              url: `https://www.ritetutor.com/courses/${course.id}`,
              ...(course.image ? { image: course.image } : {}),
            })}
          </script>
        )}
      </Helmet>

      <Layout>
        {isLoading && (
          <div className="container-wide space-y-6 py-20">
            <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
            <div className="aspect-[16/8] animate-pulse rounded-2xl bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        )}

        {!isLoading && error && (
          <div className="container-wide py-24 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-6 font-display text-3xl font-bold">
              {error.notFound ? "Course Not Available" : "Something Went Wrong"}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">{error.message}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="premium" asChild>
                <Link to="/courses">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Browse All Courses
                </Link>
              </Button>
              {!error.notFound && (
                <Button variant="outline" onClick={() => setReloadKey((key) => key + 1)}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                </Button>
              )}
            </div>
          </div>
        )}

        {!isLoading && !error && course && (
          <>
            {/* Hero */}
            <section className="relative overflow-hidden bg-card">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
              <div className="container-wide py-12 lg:py-16">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" /> All Courses
                </Link>

                <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <CourseBadge course={course} />
                    <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                      {title}
                    </h1>
                    {(course.subtitle || course.intro) && (
                      <p className="text-lg text-muted-foreground">
                        {course.subtitle || course.intro}
                      </p>
                    )}

                    <ul className="grid gap-3 sm:grid-cols-2">
                      <li className="flex items-center gap-2 text-sm">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        {instructorName(course)}
                      </li>
                      {course.duration && (
                        <li className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" /> {course.duration}
                        </li>
                      )}
                      {!!course.num_classes && (
                        <li className="flex items-center gap-2 text-sm">
                          <Layers className="h-4 w-4 text-primary" /> {course.num_classes} classes
                        </li>
                      )}
                      <li className="flex items-center gap-2 text-sm font-semibold">
                        <CalendarCheck className="h-4 w-4 text-primary" /> {pricingSummary(course)}
                      </li>
                    </ul>

                    <div className="flex flex-wrap gap-4">
                      <Button variant="hero" size="xl" onClick={() => setBookingOpen(true)}>
                        Book a Free Demo
                      </Button>
                      {course.brochure && (
                        <Button variant="hero-outline" size="xl" asChild>
                          <a href={course.brochure} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-5 w-5" /> Download Brochure
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="overflow-hidden rounded-2xl shadow-premium-lg"
                  >
                    <img
                      src={course.image || placeholder}
                      alt={title}
                      width={1024}
                      height={640}
                      onError={(event) => {
                        const img = event.currentTarget;
                        if (img.src !== placeholder) img.src = placeholder;
                      }}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Description */}
            {descriptionBlocks.length > 0 && (
              <section className="bg-background py-16">
                <div className="container-wide max-w-4xl space-y-8">
                  <h2 className="font-display text-3xl font-bold">About This Course</h2>
                  {descriptionBlocks.map((block, index) => (
                    <div key={index} className="space-y-3">
                      {block.content && (
                        <p className="whitespace-pre-line text-muted-foreground">{block.content}</p>
                      )}
                      {block.objectives && (
                        <div className="rounded-xl border border-border bg-card p-5">
                          <p className="font-semibold">Learning Objectives</p>
                          <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                            {block.objectives}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Curriculum */}
            {subcourses.length > 0 && (
              <section className="bg-card py-16">
                <div className="container-wide max-w-4xl">
                  <h2 className="font-display text-3xl font-bold">Course Curriculum</h2>
                  <p className="mt-2 text-muted-foreground">
                    {subcourses.length} modules, delivered live one-to-one.
                  </p>
                  <Accordion type="single" collapsible className="mt-8">
                    {subcourses.map((subcourse, index) => (
                      <AccordionItem key={subcourse.id} value={String(subcourse.id)}>
                        <AccordionTrigger className="text-left">
                          <span className="flex items-center gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                              {index + 1}
                            </span>
                            {subcourse.title?.trim() || `Module ${index + 1}`}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          {subcourse.description && (
                            <p className="whitespace-pre-line text-muted-foreground">
                              {subcourse.description}
                            </p>
                          )}
                          {subcourse.file && subcourse.visible_to_free_users === true && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={subcourse.file} target="_blank" rel="noopener noreferrer">
                                <FileText className="mr-2 h-4 w-4" /> Download Material
                              </a>
                            </Button>
                          )}
                          {subcourse.file && subcourse.visible_to_free_users !== true && (
                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Lock className="h-4 w-4" /> Course material shared with enrolled
                              students.
                            </p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>
            )}

            {/* Pricing */}
            <section className="bg-background py-16">
              <div className="container-wide max-w-5xl">
                <h2 className="font-display text-3xl font-bold">Investment</h2>
                <p className="mt-2 text-muted-foreground">
                  Transparent plans — pick the pace that suits your child.
                </p>
                <div className="mt-8">
                  <CoursePricingPlans course={course} />
                </div>
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-foreground py-16 text-background">
              <div className="container-wide text-center">
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Start with a Free Demo Class
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-background/80">
                  Meet the mentor, see the teaching style, and get a personalised roadmap for your
                  child — completely free.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button variant="hero" size="xl" onClick={() => setBookingOpen(true)}>
                    Book a Free Demo
                  </Button>
                  <ContactCTA variant="hero-outline" size="xl" className="border-background text-background hover:bg-background hover:text-foreground">
                    Talk to Our Team
                  </ContactCTA>
                </div>
              </div>
            </section>

            <DemoBookingModal course={course} open={bookingOpen} onOpenChange={setBookingOpen} />
          </>
        )}
      </Layout>
    </>
  );
};

export default CourseDetails;
