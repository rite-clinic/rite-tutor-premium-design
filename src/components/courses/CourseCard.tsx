import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Course } from "@/services/courseService";
import placeholder from "@/assets/course-placeholder.jpg";

export function CourseCard({
  course,
  index = 0,
}: {
  course: Course;
  index?: number;
}) {
  const title = course.title?.trim() || "Untitled Course";
  const summary = course.subtitle?.trim() || course.intro?.trim() || "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 6) * 0.06,
      }}
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-[28px] border border-border/70 bg-card
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* =========================
          COURSE IMAGE
      ========================== */}
      <Link
        to={`/courses/${course.id}`}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
        aria-label={`View course: ${title}`}
      >
        <img
          src={course.image || placeholder}
          alt={title}
          loading="lazy"
          width={1600}
          height={1000}
          onError={(event) => {
            const img = event.currentTarget;

            if (img.src !== placeholder) {
              img.src = placeholder;
            }
          }}
          className="
            h-full w-full object-cover
            transition-transform duration-700
            group-hover:scale-[1.05]
          "
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60" />

        {/* Kid-friendly badge */}
        <div
          className="
            absolute left-4 top-4
            inline-flex items-center gap-2
            rounded-full border border-white/20
            bg-white/90 px-3 py-1.5
            text-xs font-bold text-foreground
            shadow-sm backdrop-blur
          "
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Kids Learning
        </div>

        {/* Decorative star */}
        <Star
          className="
            absolute right-4 top-4 h-6 w-6
            fill-yellow-300 text-yellow-300
            drop-shadow
          "
        />
      </Link>

      {/* =========================
          CONTENT
      ========================== */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1">
          {/* Small label */}
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <BookOpen className="h-4 w-4" />
            Explore & Learn
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold leading-snug md:text-2xl">
            <Link
              to={`/courses/${course.id}`}
              className="transition-colors hover:text-primary"
            >
              {title}
            </Link>
          </h3>

          {/* Description */}
          {summary && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {summary}
            </p>
          )}

          {/* Course info */}
          {!!course.num_classes && (
            <div className="mt-5">
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-xl bg-primary/[0.06]
                  px-3 py-2 text-sm font-medium
                "
              >
                <Layers className="h-4 w-4 text-primary" />

                <span>
                  {course.num_classes}{" "}
                  {course.num_classes === 1 ? "Class" : "Classes"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* =========================
            ACTION
        ========================== */}
        <div className="mt-6 border-t border-border/70 pt-5">
          <Button
            variant="premium"
            className="w-full rounded-xl"
            asChild
          >
            <Link
              to={`/courses/${course.id}`}
              aria-label={`Explore course: ${title}`}
            >
              Explore Course

              <ArrowRight
                className="
                  ml-2 h-4 w-4
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-card">
      <div className="aspect-[16/10] animate-pulse bg-muted" />

      <div className="space-y-4 p-6">
        <div className="h-3 w-28 animate-pulse rounded bg-muted" />

        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-9 w-28 animate-pulse rounded-xl bg-muted" />

        <div className="border-t pt-4">
          <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}