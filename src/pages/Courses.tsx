import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseCard, CourseCardSkeleton } from "@/components/courses/CourseCard";
import { ContactCTA } from "@/contexts/ContactModalContext";
import { getCourses, type Course } from "@/services/courseService";
import { isFreeCourse } from "@/lib/courseUtils";

type Filter = "all" | "free" | "paid";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All Courses" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const coursesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Online Coding Courses for Kids | Rite Tutor",
  description:
    "Explore live one-to-one coding courses for kids ages 6-15 — web development, React, Python, MERN stack and more.",
  url: "https://www.ritetutor.com/courses",
};

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);
    getCourses()
      .then((data) => {
        if (active) setCourses(data);
      })
      .catch((err: Error) => {
        if (active) setError(err.message || "Unable to load courses right now.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      if (filter === "free" && !isFreeCourse(course)) return false;
      if (filter === "paid" && isFreeCourse(course)) return false;
      if (!q) return true;
      return [course.title, course.subtitle, course.intro]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q));
    });
  }, [courses, filter, query]);

  return (
    <>
      <Helmet>
        <title>Online Coding Courses for Kids Ages 6-15 | Rite Tutor</title>
        <meta
          name="description"
          content="Browse Rite Tutor's live one-to-one coding courses for kids ages 6-15 — web development, React, Python, MERN stack and more. Book a free demo class today."
        />
        <link rel="canonical" href="https://www.ritetutor.com/courses" />
        <meta property="og:title" content="Online Coding Courses for Kids Ages 6-15 | Rite Tutor" />
        <meta
          property="og:description"
          content="Live one-to-one coding courses for kids ages 6-15. Book a free demo class with a Rite Tutor mentor."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ritetutor.com/courses" />
        <script type="application/ld+json">{JSON.stringify(coursesSchema)}</script>
      </Helmet>

      <Layout>
        <section className="relative overflow-hidden bg-card">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-wide py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                🚀 Live One-to-One Courses
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
                Explore Our <span className="text-primary">Courses</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Structured, mentor-led programs that build real engineering thinking — from first
                logic puzzles to full-stack projects. Every course starts with a free demo class.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-background py-12 lg:py-16">
          <div className="container-wide space-y-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value.slice(0, 80))}
                  placeholder="Search courses…"
                  aria-label="Search courses"
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter courses">
                {FILTERS.map((option) => (
                  <Button
                    key={option.value}
                    variant={filter === option.value ? "hero" : "outline"}
                    size="sm"
                    aria-pressed={filter === option.value}
                    onClick={() => setFilter(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {isLoading && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            )}

            {!isLoading && error && (
              <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-premium">
                <AlertCircle className="mx-auto h-10 w-10 text-primary" />
                <h2 className="mt-4 font-display text-2xl font-bold">We couldn't load the courses</h2>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">{error}</p>
                <Button
                  variant="premium"
                  className="mt-6"
                  onClick={() => setReloadKey((key) => key + 1)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                </Button>
              </div>
            )}

            {!isLoading && !error && visible.length === 0 && (
              <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-premium">
                <h2 className="font-display text-2xl font-bold">No courses match your search</h2>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                  {courses.length === 0
                    ? "New courses are being published shortly. Book a free strategy call and we'll recommend the right pathway for your child."
                    : "Try a different keyword or clear the filters to see everything on offer."}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {courses.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuery("");
                        setFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                  <ContactCTA variant="hero">Book Free Strategy Call</ContactCTA>
                </div>
              </div>
            )}

            {!isLoading && !error && visible.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-foreground py-16 text-background">
          <div className="container-wide text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Not sure which course fits your child?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-background/80">
              Our mentors run a free logic-first assessment and recommend the exact pathway — no
              guesswork, no pressure.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ContactCTA variant="hero" size="xl">
                Book Your Free Strategy Call
              </ContactCTA>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Courses;
