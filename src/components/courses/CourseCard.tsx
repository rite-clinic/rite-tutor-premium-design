import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, GraduationCap, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseBadge } from "./CourseBadge";
import { CoursePricingSummary } from "./CoursePricing";
import { instructorName } from "@/lib/courseUtils";
import type { Course } from "@/services/courseService";
import placeholder from "@/assets/course-placeholder.jpg";

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const title = course.title?.trim() || "Untitled Course";
  const summary = course.subtitle?.trim() || course.intro?.trim() || "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-premium transition-shadow duration-300 hover:shadow-premium-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={course.image || placeholder}
          alt={title}
          loading="lazy"
          width={1024}
          height={640}
          onError={(event) => {
            const img = event.currentTarget;
            if (img.src !== placeholder) img.src = placeholder;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <CourseBadge course={course} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-xl font-bold leading-snug">
          <Link to={`/courses/${course.id}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>

        {summary && <p className="line-clamp-3 text-sm text-muted-foreground">{summary}</p>}

        <ul className="mt-auto space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="truncate">{instructorName(course)}</span>
          </li>
          {course.duration && (
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{course.duration}</span>
            </li>
          )}
          {!!course.num_classes && (
            <li className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>{course.num_classes} classes</span>
            </li>
          )}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm font-semibold">
            <CoursePricingSummary course={course} />
          </p>
          <Button variant="premium" size="sm" asChild>
            <Link to={`/courses/${course.id}`} aria-label={`View course: ${title}`}>
              View Course
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[16/10] animate-pulse bg-muted" />
      <div className="space-y-4 p-6">
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-9 w-32 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
