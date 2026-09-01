import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Puzzle,
  RefreshCw,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  CourseCard,
  CourseCardSkeleton,
} from "@/components/courses/CourseCard";

import { ContactCTA } from "@/contexts/ContactModalContext";

import {
  getCourses,
  type Course,
} from "@/services/courseService";

const coursesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Courses for Kids | Rite Tutor",
  description:
    "Explore interactive learning courses for kids designed to build creativity, confidence, problem-solving and real-world skills.",
  url: "https://www.ritetutor.com/courses",
};

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");

  const [reloadKey, setReloadKey] = useState(0);

  /* =========================================================
      LOAD COURSES
  ========================================================== */

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setError(null);

    getCourses()
      .then((data) => {
        if (active) {
          setCourses(data);
        }
      })
      .catch((err: Error) => {
        if (active) {
          setError(
            err.message ||
              "Unable to load courses right now."
          );
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  /* =========================================================
      SEARCH
  ========================================================== */

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return courses;
    }

    return courses.filter((course) =>
      [
        course.title,
        course.subtitle,
        course.intro,
      ]
        .filter(Boolean)
        .some((field) =>
          String(field).toLowerCase().includes(q)
        )
    );
  }, [courses, query]);

  return (
    <>
      {/* =====================================================
          SEO
      ====================================================== */}

      <Helmet>
        <title>
          Fun & Interactive Courses for Kids | Rite Tutor
        </title>

        <meta
          name="description"
          content="Explore engaging and interactive learning programs for kids at Rite Tutor. Help your child build creativity, confidence, problem-solving and practical skills."
        />

        <link
          rel="canonical"
          href="https://www.ritetutor.com/courses"
        />

        <meta
          property="og:title"
          content="Fun & Interactive Courses for Kids | Rite Tutor"
        />

        <meta
          property="og:description"
          content="Explore engaging courses created to make learning exciting, practical and enjoyable for children."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://www.ritetutor.com/courses"
        />

        <script type="application/ld+json">
          {JSON.stringify(coursesSchema)}
        </script>
      </Helmet>

      <Layout>
        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          className="
            relative overflow-hidden
            border-b
            bg-gradient-to-br
            from-primary/[0.08]
            via-background
            to-purple-500/[0.07]
          "
        >
          {/* Decorative background */}

          <div className="pointer-events-none absolute -left-28 top-5 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="pointer-events-none absolute right-[15%] top-16 hidden lg:block">
            <Sparkles className="h-9 w-9 rotate-12 text-primary/30" />
          </div>

          <div className="pointer-events-none absolute left-[48%] top-[35%] hidden lg:block">
            <div className="h-5 w-5 rotate-12 rounded-md bg-yellow-400/30" />
          </div>

          <div className="container-wide relative py-16 md:py-20 lg:py-24">
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mx-auto max-w-4xl text-center"
            >
              {/* Badge */}

              <span
                className="
                  inline-flex items-center gap-2
                  rounded-full border border-primary/20
                  bg-background/80
                  px-4 py-2
                  text-sm font-bold text-primary
                  shadow-sm backdrop-blur
                "
              >
                <Sparkles className="h-4 w-4" />
                Learning Adventures for Kids
              </span>

              {/* Heading */}

              <h1
                className="
                  mt-6 font-display
                  text-4xl font-extrabold leading-tight
                  tracking-tight
                  sm:text-5xl lg:text-6xl
                "
              >
                Discover Something
                <span className="text-primary">
                  {" "}
                  Amazing
                </span>{" "}
                to Learn
              </h1>

              {/* Description */}

              <p
                className="
                  mx-auto mt-6 max-w-3xl
                  text-base leading-7
                  text-muted-foreground
                  md:text-lg md:leading-8
                "
              >
                Explore fun, engaging and interactive courses
                designed to help kids discover new ideas,
                solve problems, create projects and build
                confidence while learning.
              </p>

              {/* Benefits */}

              <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Kid-friendly learning
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Hands-on activities
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Confidence building
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            COURSES
        ====================================================== */}

        <section className="bg-background py-12 md:py-16 lg:py-20">
          <div className="container-wide">
            {/* Heading + Search */}

            <div
              className="
                mb-10 flex flex-col gap-6
                md:flex-row md:items-end
                md:justify-between
              "
            >
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  Explore Courses
                </p>

                <h2 className="mt-2 font-display text-3xl font-bold">
                  Find Your Next Learning Adventure
                </h2>

                {!isLoading && !error && courses.length > 0 && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Explore {courses.length}{" "}
                    {courses.length === 1
                      ? "course"
                      : "courses"}{" "}
                    created for curious young learners.
                  </p>
                )}
              </div>

              {/* Search */}

              <div className="relative w-full md:max-w-md">
                <Search
                  className="
                    pointer-events-none absolute
                    left-4 top-1/2 h-5 w-5
                    -translate-y-1/2
                    text-muted-foreground
                  "
                />

                <Input
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(
                      event.target.value.slice(0, 80)
                    )
                  }
                  placeholder="Search a course..."
                  aria-label="Search courses"
                  className="
                    h-12 rounded-xl
                    border-border bg-card
                    pl-12 pr-4
                    shadow-sm
                    focus-visible:ring-primary
                  "
                />
              </div>
            </div>

            {/* =================================================
                LOADING
            ================================================== */}

            {isLoading && (
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({
                  length: 6,
                }).map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* =================================================
                ERROR
            ================================================== */}

            {!isLoading && error && (
              <div
                className="
                  rounded-[28px]
                  border border-border
                  bg-card p-10
                  text-center shadow-sm
                "
              >
                <div
                  className="
                    mx-auto flex h-16 w-16
                    items-center justify-center
                    rounded-2xl bg-primary/10
                  "
                >
                  <AlertCircle className="h-8 w-8 text-primary" />
                </div>

                <h2 className="mt-5 font-display text-2xl font-bold">
                  We Couldn't Load the Courses
                </h2>

                <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                  {error}
                </p>

                <Button
                  variant="premium"
                  className="mt-6 rounded-xl"
                  onClick={() =>
                    setReloadKey((key) => key + 1)
                  }
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            )}

            {/* =================================================
                EMPTY
            ================================================== */}

            {!isLoading &&
              !error &&
              visible.length === 0 && (
                <div
                  className="
                    rounded-[28px]
                    border border-border
                    bg-card p-10
                    text-center shadow-sm
                  "
                >
                  <div
                    className="
                      mx-auto flex h-16 w-16
                      items-center justify-center
                      rounded-2xl bg-primary/10
                    "
                  >
                    <Search className="h-7 w-7 text-primary" />
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-bold">
                    {courses.length === 0
                      ? "New Learning Adventures Are Coming!"
                      : "No Courses Found"}
                  </h2>

                  <p className="mx-auto mt-2 max-w-md leading-6 text-muted-foreground">
                    {courses.length === 0
                      ? "We're preparing exciting new programs for curious young learners."
                      : `We couldn't find a course matching "${query}". Try searching with another keyword.`}
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {courses.length > 0 && (
                      <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => setQuery("")}
                      >
                        Clear Search
                      </Button>
                    )}

                    <ContactCTA
                      variant="hero"
                      className="rounded-xl"
                    >
                      Talk to Our Team
                    </ContactCTA>
                  </div>
                </div>
              )}

            {/* =================================================
                COURSE GRID
            ================================================== */}

            {!isLoading &&
              !error &&
              visible.length > 0 && (
                <>
                  {query && (
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <p className="text-sm text-muted-foreground">
                        Showing{" "}
                        <span className="font-semibold text-foreground">
                          {visible.length}
                        </span>{" "}
                        {visible.length === 1
                          ? "course"
                          : "courses"}{" "}
                        for{" "}
                        <span className="font-semibold text-foreground">
                          "{query}"
                        </span>
                      </p>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuery("")}
                      >
                        Clear
                      </Button>
                    </div>
                  )}

                  <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map(
                      (course, index) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          index={index}
                        />
                      )
                    )}
                  </div>
                </>
              )}
          </div>
        </section>

        {/* =====================================================
            WHY LEARN WITH RITE TUTOR
        ====================================================== */}

        <section className="border-y bg-muted/30 py-16 md:py-20">
          <div className="container-wide">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Learn • Create • Grow
              </p>

              <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                More Than Just Another Class
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                Our learning experiences encourage kids to
                think, explore, ask questions and turn ideas
                into something they can be proud of.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
              {/* CARD */}

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl border bg-card p-7 text-center shadow-sm"
              >
                <div
                  className="
                    mx-auto flex h-14 w-14
                    items-center justify-center
                    rounded-2xl bg-primary/10
                  "
                >
                  <Puzzle className="h-7 w-7 text-primary" />
                </div>

                <h3 className="mt-5 font-display text-xl font-bold">
                  Learn by Doing
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Kids actively participate, experiment,
                  practise and solve problems instead of
                  simply watching.
                </p>
              </motion.div>

              {/* CARD */}

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl border bg-card p-7 text-center shadow-sm"
              >
                <div
                  className="
                    mx-auto flex h-14 w-14
                    items-center justify-center
                    rounded-2xl bg-purple-500/10
                  "
                >
                  <Lightbulb className="h-7 w-7 text-purple-600" />
                </div>

                <h3 className="mt-5 font-display text-xl font-bold">
                  Think Creatively
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Activities encourage curiosity, creativity
                  and new ways of approaching challenges.
                </p>
              </motion.div>

              {/* CARD */}

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl border bg-card p-7 text-center shadow-sm"
              >
                <div
                  className="
                    mx-auto flex h-14 w-14
                    items-center justify-center
                    rounded-2xl bg-yellow-400/15
                  "
                >
                  <Trophy className="h-7 w-7 text-yellow-600" />
                </div>

                <h3 className="mt-5 font-display text-xl font-bold">
                  Build Confidence
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Step-by-step progress helps kids become
                  independent learners who feel confident
                  taking on new challenges.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="relative overflow-hidden bg-foreground py-16 text-background md:py-20">
          <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="container-wide relative text-center">
            <div
              className="
                mx-auto flex h-16 w-16
                items-center justify-center
                rounded-2xl bg-background/10
              "
            >
              <BookOpen className="h-8 w-8" />
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-bold md:text-4xl">
              Not Sure Which Course Is Right for Your Child?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-background/75">
              Tell us about your child's interests and
              learning goals, and our team can help you
              discover the right learning pathway.
            </p>

            <div className="mt-8 flex justify-center">
              <ContactCTA
                variant="hero"
                size="xl"
                className="rounded-xl"
              >
                Talk to Our Learning Team
              </ContactCTA>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Courses;